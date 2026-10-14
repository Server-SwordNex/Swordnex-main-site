import React, { useEffect, useRef, useState, useCallback } from 'react';
import './InteractiveEarth.css';

// Continent boundary polygons (lon, lat)
const CONTINENT_POLYGONS = [
  // North America & Central America
  [[-168,65],[-140,70],[-130,70],[-80,70],[-60,60],[-65,45],[-70,42],[-75,35],[-80,25],[-82,28],[-90,30],[-97,26],[-95,17],[-85,13],[-78,8],[-105,20],[-110,23],[-115,30],[-120,35],[-124,45],[-130,55],[-145,60],[-165,60]],
  // South America
  [[-77,8],[-65,11],[-50,0],[-35,-5],[-38,-13],[-45,-23],[-55,-35],[-65,-45],[-68,-55],[-74,-45],[-72,-30],[-77,-12],[-81,-5]],
  // Africa
  [[-5,35],[10,37],[25,32],[32,31],[43,12],[51,10],[45,0],[40,-10],[35,-20],[32,-28],[20,-34],[18,-34],[12,-20],[9,0],[2,6],[-15,12],[-17,15],[-10,28]],
  // Eurasia (Europe + Asia)
  [[15,55],[10,60],[25,71],[30,65],[0,50],[-9,43],[-9,36],[0,38],[15,40],[25,38],[35,36],[35,32],[45,30],[55,25],[50,15],[40,20],[35,30],[68,24],[72,18],[77,8],[85,20],[90,22],[98,15],[105,10],[103,1],[108,12],[108,20],[120,23],[122,31],[120,38],[129,40],[135,45],[145,55],[160,60],[170,65],[170,70],[110,75],[70,73],[40,68],[30,60]],
  // Australia
  [[130,-12],[142,-11],[150,-23],[153,-28],[150,-37],[140,-38],[130,-32],[115,-34],[114,-22],[122,-18]],
  // Greenland
  [[-50,60],[-30,65],[-20,75],[-30,83],[-55,80],[-55,70]],
  // Antarctica
  [[-180,-85],[180,-85],[180,-70],[120,-66],[60,-67],[0,-70],[-60,-65],[-120,-72],[-180,-70]],
  // Japan
  [[130,32],[135,35],[141,43],[140,36]],
  // UK & Ireland
  [[-10,51],[2,51],[0,58],[-10,58]],
  // Madagascar
  [[44,-12],[50,-15],[47,-25],[44,-25]],
  // Indonesia & Malaysia
  [[95,5],[118,5],[120,-8],[100,-8]],
  // New Zealand
  [[166,-46],[178,-38],[175,-35],[170,-44]]
];

function isPointInPolygon(point, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    const intersect = ((yi > point[1]) !== (yj > point[1])) &&
      (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function checkIsLand(lon, lat) {
  for (let poly of CONTINENT_POLYGONS) {
    if (isPointInPolygon([lon, lat], poly)) return true;
  }
  return false;
}

// Convert geographic (lat, lon) to 3D unit sphere vector (North is +Y, East is +X)
function latLonToVector(lat, lon) {
  const phi = (lat * Math.PI) / 180;
  const lambda = (lon * Math.PI) / 180;
  const cosPhi = Math.cos(phi);
  return {
    x: Math.sin(lambda) * cosPhi,
    y: Math.sin(phi),
    z: Math.cos(lambda) * cosPhi
  };
}

// Great-circle spherical linear interpolation between two 3D unit vectors
function slerpVector(v0, v1, t) {
  let dot = v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
  dot = Math.max(-1, Math.min(1, dot));
  const theta = Math.acos(dot);
  if (theta < 0.001) return { ...v0, angle: 0 };
  const sinTheta = Math.sin(theta);
  const w0 = Math.sin((1 - t) * theta) / sinTheta;
  const w1 = Math.sin(t * theta) / sinTheta;
  return {
    x: v0.x * w0 + v1.x * w1,
    y: v0.y * w0 + v1.y * w1,
    z: v0.z * w0 + v1.z * w1,
    angle: theta
  };
}

// Major global connection destinations from Tamil Nadu, India
const WORLD_DESTINATIONS = [
  { name: 'Silicon Valley', lat: 37.77, lon: -122.42, speed: 0.28, offset: 0.0 },
  { name: 'New York', lat: 40.71, lon: -74.01, speed: 0.32, offset: 0.2 },
  { name: 'London', lat: 51.51, lon: -0.13, speed: 0.38, offset: 0.45 },
  { name: 'Frankfurt', lat: 50.11, lon: 8.68, speed: 0.40, offset: 0.65 },
  { name: 'Dubai', lat: 25.20, lon: 55.27, speed: 0.52, offset: 0.1 },
  { name: 'Singapore', lat: 1.35, lon: 103.82, speed: 0.58, offset: 0.35 },
  { name: 'Tokyo', lat: 35.68, lon: 139.69, speed: 0.35, offset: 0.75 },
  { name: 'Sydney', lat: -33.87, lon: 151.21, speed: 0.30, offset: 0.55 },
  { name: 'Cape Town', lat: -33.92, lon: 18.42, speed: 0.33, offset: 0.25 },
  { name: 'São Paulo', lat: -23.55, lon: -46.63, speed: 0.26, offset: 0.85 }
];

// Variable projectile bursts: sometimes 1, sometimes 2, sometimes 3
const PROJECTILE_BURST_WAVES = [
  { destIndices: [5], count: 1 },        // Wave 1: 1 projectile (Singapore)
  { destIndices: [2, 4], count: 2 },     // Wave 2: 2 projectiles (London & Dubai)
  { destIndices: [6], count: 1 },        // Wave 3: 1 projectile (Tokyo)
  { destIndices: [0, 3, 7], count: 3 },  // Wave 4: 3 projectiles (Silicon Valley, Frankfurt & Sydney)
  { destIndices: [1, 8], count: 2 },     // Wave 5: 2 projectiles (New York & Cape Town)
  { destIndices: [9], count: 1 },        // Wave 6: 1 projectile (São Paulo)
  { destIndices: [2, 4, 6], count: 3 },  // Wave 7: 3 projectiles (London, Dubai & Tokyo)
  { destIndices: [0, 5], count: 2 }      // Wave 8: 2 projectiles (Silicon Valley & Singapore)
];

// Services revolving around the earth
const SERVICES = [
  { name: 'Business', icon: 'trending_up', angleOffset: 0 },
  { name: 'Marketing', icon: 'campaign', angleOffset: (2 * Math.PI) / 5 },
  { name: 'Development', icon: 'terminal', angleOffset: (4 * Math.PI) / 5 },
  { name: 'Management', icon: 'hub', angleOffset: (6 * Math.PI) / 5 },
  { name: 'Service', icon: 'design_services', angleOffset: (8 * Math.PI) / 5 }
];
// Origin: Kumbakonam, Tamil Nadu, India
const TN_ORIGIN = { lat: 10.96, lon: 79.38 };
const TN_VECTOR = latLonToVector(TN_ORIGIN.lat, TN_ORIGIN.lon);

// Generate uniform Fibonacci sphere dots with correct North/South orientation
function generateSpherePoints(count = 2100) {
  const points = [];
  const phi = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < count; i++) {
    // y goes from +1 (North) down to -1 (South)
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * 2 * Math.PI * i;

    const lat = Math.asin(y) * (180 / Math.PI);
    let lon = ((theta % (2 * Math.PI)) * (180 / Math.PI));
    if (lon > 180) lon -= 360;

    const latRad = (lat * Math.PI) / 180;
    const lonRad = (lon * Math.PI) / 180;
    const cosLat = Math.cos(latRad);

    const x = Math.sin(lonRad) * cosLat;
    const z = Math.cos(lonRad) * cosLat;

    const isLand = checkIsLand(lon, lat);

    points.push({
      x,
      y,
      z,
      lat,
      lon,
      isLand,
      // Lands: prominent dots; Oceans: fine dots
      baseRadius: isLand ? 2.1 : 1.2,
      baseAlpha: isLand ? 0.95 : 0.45,
    });
  }
  return points;
}

export const InteractiveEarth = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const serviceRefs = useRef([]);
  const orbitAngleRef = useRef(0);
  const orbitHoverRef = useRef(false);

  // Interaction & Animation state
  const stateRef = useRef({
    points: [],
    destinations: [],
    rotationX: 0.22, // Natural slight tilt forward (Northern hemisphere comfortably visible)
    rotationY: 1.15, // Starts facing Indian Ocean / South Asia
    velocityX: 0,
    velocityY: 0,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    mousePos: { x: -9999, y: -9999 },
    currentBump: { x: -9999, y: -9999 },
    isHovering: false,
    bumpStrength: 0,
    sphereRadius: 160,
    center: { x: 200, y: 200 },
    lastFrameTime: performance.now(),
    pulseTime: 0
  });

  // Initialize sphere points and connection vectors once
  useEffect(() => {
    stateRef.current.points = generateSpherePoints(2250);
    stateRef.current.destinations = WORLD_DESTINATIONS.map((dest) => ({
      ...dest,
      vec: latLonToVector(dest.lat, dest.lon),
    }));
  }, []);

  // Main Render & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = (time) => {
      const state = stateRef.current;
      const dt = Math.min((time - state.lastFrameTime) / 1000, 0.1);
      state.lastFrameTime = time;
      state.pulseTime += dt;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width, height) * 0.40;

      state.center = { x: cx, y: cy };
      state.sphereRadius = R;

      // Constant natural rotation (spins continuously and naturally)
      const naturalSpinSpeed = 0.003;

      if (state.isDragging) {
        state.rotationY += state.velocityY;
        state.rotationX += state.velocityX;
        // Clamp tilt so earth doesn't flip upside down
        state.rotationX = Math.max(-0.65, Math.min(0.65, state.rotationX));
        state.velocityX = 0;
        state.velocityY = 0;
      } else {
        // Momentum decay + constant natural spin
        state.rotationY += state.velocityY + naturalSpinSpeed;
        state.rotationX += state.velocityX;
        state.rotationX = Math.max(-0.65, Math.min(0.65, state.rotationX));
        state.velocityX *= 0.92;
        state.velocityY *= 0.92;
      }

      // Smooth bump transition (lerp)
      const targetStrength = state.isHovering ? 1 : 0;
      state.bumpStrength += (targetStrength - state.bumpStrength) * 0.14;

      state.currentBump.x += (state.mousePos.x - state.currentBump.x) * 0.2;
      state.currentBump.y += (state.mousePos.y - state.currentBump.y) * 0.2;

      // Clear Canvas to remain 100% transparent and match page background
      ctx.clearRect(0, 0, width, height);

      // Subtle Outer Sphere Outline (delicate boundary)
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.14)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // Precompute rotation sines/cosines
      const cosY = Math.cos(state.rotationY);
      const sinY = Math.sin(state.rotationY);
      const cosX = Math.cos(state.rotationX);
      const sinX = Math.sin(state.rotationX);

      // Precompute Cursor Normal on Sphere (Screen Y is inverted relative to 3D Y!)
      const relMx = (state.currentBump.x - cx) / R;
      const relMy = -(state.currentBump.y - cy) / R; // Note the negation for right-side-up 3D!
      const curDistSq = relMx * relMx + relMy * relMy;

      let cnx = relMx;
      let cny = relMy;
      let cnz = 0;

      if (curDistSq < 1.0) {
        cnz = Math.sqrt(Math.max(0, 1.0 - curDistSq));
      } else {
        const len = Math.sqrt(curDistSq);
        cnx /= len;
        cny /= len;
        cnz = 0;
      }

      // Refined spike radius & height (reduced radius and subtle bump)
      const bumpInfluence = 0.28; // Reduced radius of spike influence
      const maxSpikeHeight = 18;  // Subtle, refined bump height in pixels

      // Arrays for back and front dots to ensure proper depth sorting
      const backDots = [];
      const frontDots = [];

      const points = state.points;
      const len = points.length;

      for (let i = 0; i < len; i++) {
        const pt = points[i];

        // Rotate around Y (vertical spin)
        const x1 = pt.x * cosY + pt.z * sinY;
        const y1 = pt.y;
        const z1 = -pt.x * sinY + pt.z * cosY;

        // Rotate around X (axial tilt)
        const rx = x1;
        const ry = y1 * cosX - z1 * sinX;
        const rz = y1 * sinX + z1 * cosX;

        // Check cursor distance for 3D Spike / Bump
        let spikeOffset = 0;
        let bumpRatio = 0;

        if (state.bumpStrength > 0.01 && rz > -0.1) {
          const d3D = Math.sqrt((rx - cnx) ** 2 + (ry - cny) ** 2 + (rz - cnz) ** 2);
          if (d3D < bumpInfluence) {
            const normDist = d3D / bumpInfluence;
            // Smoothstep curve for natural organic bump
            const smooth = (1 - normDist) ** 2 * (3 - 2 * (1 - normDist));
            bumpRatio = smooth * state.bumpStrength;
            spikeOffset = maxSpikeHeight * bumpRatio;
          }
        }

        const effectiveRadius = R + spikeOffset;
        const projX = cx + rx * effectiveRadius;
        // Invert Y in screen projection so North (+Y) is at the TOP of the screen!
        const projY = cy - ry * effectiveRadius;

        if (rz < 0) {
          // Back hemisphere
          backDots.push({
            x: projX,
            y: projY,
            z: rz,
            isLand: pt.isLand,
            radius: pt.baseRadius * 0.65,
            alpha: pt.baseAlpha * 0.22 * (1 + rz),
          });
        } else {
          // Front hemisphere
          frontDots.push({
            x: projX,
            y: projY,
            z: rz,
            isLand: pt.isLand,
            bumpRatio,
            radius: (pt.baseRadius * (0.8 + 0.3 * rz)) * (1 + 1.15 * bumpRatio),
            alpha: Math.min(1, pt.baseAlpha + 0.35 * bumpRatio),
          });
        }
      }

      // 1. Render Back Hemisphere Dots (Subtle, transparent depth)
      const backLen = backDots.length;
      for (let i = 0; i < backLen; i++) {
        const dot = backDots[i];
        ctx.fillStyle = dot.isLand
          ? `rgba(37, 99, 235, ${dot.alpha * 0.3})` // Back land: faint blue
          : `rgba(15, 23, 42, ${dot.alpha * 0.18})`; // Back ocean: faint black/slate

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render Front Hemisphere Dots
      frontDots.sort((a, b) => a.z - b.z);
      const frontLen = frontDots.length;

      for (let i = 0; i < frontLen; i++) {
        const dot = frontDots[i];
        const bump = dot.bumpRatio;

        if (bump > 0.15) {
          // Spiked / Bumped dots: Lifted & highlighted
          if (dot.isLand) {
            ctx.shadowColor = 'rgba(37, 99, 235, 0.75)';
            ctx.shadowBlur = 8 * bump;
            ctx.fillStyle = '#1d4ed8'; // Vibrant royal blue in spike
          } else {
            ctx.shadowColor = 'rgba(15, 23, 42, 0.4)';
            ctx.shadowBlur = 4 * bump;
            ctx.fillStyle = '#000000'; // Deep black in spike
          }
        } else {
          ctx.shadowBlur = 0;
          if (dot.isLand) {
            // Lands: Blue dots!
            ctx.fillStyle = `rgba(37, 99, 235, ${dot.alpha})`;
          } else {
            // Oceans: Black dots!
            ctx.fillStyle = `rgba(15, 23, 42, ${dot.alpha * 0.65})`;
          }
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // 3. Render Worldwide Connection Projectiles from Tamil Nadu
      // Variable bursts: sometimes 1, sometimes 2, sometimes 3
      const destinations = state.destinations;
      const WAVE_INTERVAL = 4.5;
      const flightDuration = 2.8;
      const totalCycleDuration = PROJECTILE_BURST_WAVES.length * WAVE_INTERVAL;
      const cycleTime = (state.pulseTime % totalCycleDuration + totalCycleDuration) % totalCycleDuration;

      const waveIndex = Math.floor(cycleTime / WAVE_INTERVAL);
      const waveDt = cycleTime - waveIndex * WAVE_INTERVAL;
      const currentWave = PROJECTILE_BURST_WAVES[waveIndex];

      const isFlightActive = waveDt <= flightDuration;
      const isLanding = waveDt >= flightDuration - 0.25 && waveDt <= flightDuration + 0.75;

      // Precompute rotated coordinates for 3D point helper
      const project3DPoint = (vec, altRadius) => {
        const x1 = vec.x * cosY + vec.z * sinY;
        const y1 = vec.y;
        const z1 = -vec.x * sinY + vec.z * cosY;

        const rx = x1;
        const ry = y1 * cosX - z1 * sinX;
        const rz = y1 * sinX + z1 * cosX;

        return {
          sx: cx + rx * altRadius,
          sy: cy - ry * altRadius,
          rz
        };
      };

      // Projectiles and connection lines ONLY form when emitted during active flight or landing
      if (isFlightActive || isLanding) {
        const destCount = currentWave.destIndices.length;
        for (let b = 0; b < destCount; b++) {
          const destIdx = currentWave.destIndices[b];
          const dest = destinations[destIdx];
          if (!dest) continue;

          // Micro-burst timing offset (0ms, 80ms, 160ms) for natural salvo feel
          const burstOffset = b * 0.08;
          const effectiveDt = Math.max(0, waveDt - burstOffset);
          const activeProgress = isFlightActive ? Math.min(1.0, effectiveDt / flightDuration) : 1.0;

          const slerpMid = slerpVector(TN_VECTOR, dest.vec, 0.5);
          const arcAngle = slerpMid.angle || 1.0;
          const maxArcHeight = R * 0.22 * Math.sin(arcAngle / 2);

          // Connection line dynamically forms from Tamil Nadu up to the projectile
          const TOTAL_SEGMENTS = 28;
          const currentSegments = Math.max(1, Math.round(TOTAL_SEGMENTS * activeProgress));

          let started = false;
          ctx.beginPath();
          for (let s = 0; s <= currentSegments; s++) {
            const t = Math.min(activeProgress, s / TOTAL_SEGMENTS);
            const arcVec = slerpVector(TN_VECTOR, dest.vec, t);
            const alt = Math.sin(t * Math.PI) * maxArcHeight;
            const pt3D = project3DPoint(arcVec, R + alt);

            if (pt3D.rz > -R * 0.15) {
              if (!started) {
                ctx.moveTo(pt3D.sx, pt3D.sy);
                started = true;
              } else {
                ctx.lineTo(pt3D.sx, pt3D.sy);
              }
            } else {
              started = false;
            }
          }

          // Dynamic line alpha: glowing while flying, dissolving cleanly after arrival
          let lineAlpha = 0.45;
          if (isLanding) {
            const arrivalFactor = (effectiveDt - (flightDuration - 0.25)) / 1.0;
            lineAlpha = Math.max(0, 0.45 * (1 - arrivalFactor));
          }

          ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Render Flying Projectile during active flight
          if (isFlightActive && effectiveDt > 0) {
            const projVec = slerpVector(TN_VECTOR, dest.vec, activeProgress);
            const projAlt = Math.sin(activeProgress * Math.PI) * maxArcHeight;
            const projPt = project3DPoint(projVec, R + projAlt);

            if (projPt.rz > -R * 0.1) {
              // 1. Tapered trailing comet tail
              const TAIL_STEPS = 6;
              for (let step = 1; step <= TAIL_STEPS; step++) {
                const tailProgress = Math.max(0, activeProgress - step * 0.02);
                const tailVec = slerpVector(TN_VECTOR, dest.vec, tailProgress);
                const tailAlt = Math.sin(tailProgress * Math.PI) * maxArcHeight;
                const tailPt = project3DPoint(tailVec, R + tailAlt);

                if (tailPt.rz > -R * 0.1) {
                  const tailAlpha = (1 - step / TAIL_STEPS) * 0.65;
                  ctx.fillStyle = `rgba(56, 189, 248, ${tailAlpha})`;
                  ctx.beginPath();
                  ctx.arc(tailPt.sx, tailPt.sy, 2.2 * (1 - step / (TAIL_STEPS + 1)), 0, Math.PI * 2);
                  ctx.fill();
                }
              }

              // 2. Glowing Projectile Head
              ctx.shadowColor = '#38bdf8';
              ctx.shadowBlur = 8;
              ctx.fillStyle = '#2563eb';
              ctx.beginPath();
              ctx.arc(projPt.sx, projPt.sy, 2.8, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = '#ffffff';
              ctx.beginPath();
              ctx.arc(projPt.sx, projPt.sy, 1.4, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }

          // Destination Node: Lights up and ripples on projectile arrival
          const destPt = project3DPoint(dest.vec, R);
          if (destPt.rz > 0.05) {
            if (isLanding) {
              ctx.shadowColor = '#38bdf8';
              ctx.shadowBlur = 8;
              ctx.fillStyle = '#38bdf8';
              ctx.beginPath();
              ctx.arc(destPt.sx, destPt.sy, 3.2, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0;

              // Arrival ripple when projectile lands
              const arrivalFactor = (effectiveDt - (flightDuration - 0.25)) / 1.0;
              ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0, 1 - arrivalFactor)})`;
              ctx.lineWidth = 1.2;
              ctx.beginPath();
              ctx.arc(destPt.sx, destPt.sy, 2 + arrivalFactor * 7, 0, Math.PI * 2);
              ctx.stroke();
            } else {
              ctx.fillStyle = 'rgba(37, 99, 235, 0.75)';
              ctx.beginPath();
              ctx.arc(destPt.sx, destPt.sy, 2.0, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // 4. Central Pulse Indicator for Tamil Nadu, India (Origin Beacon)
      const tnPt = project3DPoint(TN_VECTOR, R);
      if (tnPt.rz > 0.02) {
        const pulse = (Math.sin(state.pulseTime * 4) + 1) / 2;
        const pulse2 = (Math.sin(state.pulseTime * 4 + Math.PI / 2) + 1) / 2;

        // Outer expanding glowing ripple 1
        ctx.strokeStyle = `rgba(37, 99, 235, ${0.85 - pulse * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(tnPt.sx, tnPt.sy, 4 + pulse * 9, 0, Math.PI * 2);
        ctx.stroke();

        // Expanding glowing ripple 2
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.7 - pulse2 * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(tnPt.sx, tnPt.sy, 3 + pulse2 * 6, 0, Math.PI * 2);
        ctx.stroke();

        // Core Beacon Marker
        ctx.fillStyle = '#2563eb';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(tnPt.sx, tnPt.sy, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tnPt.sx, tnPt.sy, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Update 3D Revolving Services Orbit
      const orbitSpeed = orbitHoverRef.current ? 0.05 : 0.22; // rad/s (~28s full revolution)
      orbitAngleRef.current += orbitSpeed * dt;

      const Rx = R * 1.34;
      const Ry = R * 0.48;
      const tiltAngle = -0.26; // ~ -15 deg inclination
      const cosTilt = Math.cos(tiltAngle);
      const sinTilt = Math.sin(tiltAngle);

      for (let i = 0; i < SERVICES.length; i++) {
        const el = serviceRefs.current[i];
        if (!el) continue;

        const angle = orbitAngleRef.current + SERVICES[i].angleOffset;
        const rawX = Math.cos(angle) * Rx;
        const rawY = Math.sin(angle) * Ry;

        const rotX = rawX * cosTilt - rawY * sinTilt;
        const rotY = rawX * sinTilt + rawY * cosTilt;

        const posX = cx + rotX;
        const posY = cy - rotY;

        // Depth along viewer's Z-axis: sin(angle)
        // When sin(angle) > 0, it is in front of the earth!
        // When sin(angle) < 0, it is behind the earth!
        const zDepth = Math.sin(angle);

        // Smooth perspective scale & opacity
        const scale = 0.86 + 0.22 * ((zDepth + 1) / 2); // 0.86 (back) to 1.08 (front)
        const opacity = zDepth > 0
          ? 0.90 + 0.10 * zDepth
          : 0.35 + 0.35 * (1 + zDepth);

        const zIndex = zDepth > 0 ? 12 : 2;

        el.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = opacity;
        el.style.zIndex = zIndex;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse & Touch Interaction Handlers
  const handlePointerDown = (clientX, clientY) => {
    const state = stateRef.current;
    state.isDragging = true;
    state.lastMouseX = clientX;
    state.lastMouseY = clientY;
    state.velocityX = 0;
    state.velocityY = 0;
  };

  const handlePointerMove = (clientX, clientY) => {
    const state = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;

    state.mousePos = { x: localX, y: localY };

    // Check if cursor is on or near the globe
    const dx = localX - state.center.x;
    const dy = localY - state.center.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    state.isHovering = dist < state.sphereRadius * 1.25;

    if (state.isDragging) {
      const deltaX = clientX - state.lastMouseX;
      const deltaY = clientY - state.lastMouseY;

      state.velocityY = deltaX * 0.0065;
      // Vertical dragging follows cursor naturally
      state.velocityX = deltaY * 0.0065;

      state.lastMouseX = clientX;
      state.lastMouseY = clientY;
    }
  };

  const handlePointerUp = () => {
    const state = stateRef.current;
    state.isDragging = false;
  };

  const handlePointerLeave = () => {
    const state = stateRef.current;
    state.isDragging = false;
    state.isHovering = false;
    state.mousePos = { x: -9999, y: -9999 };
  };

  return (
    <div
      ref={containerRef}
      className={`interactive-earth-wrapper ${className}`}
      onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
      onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerLeave}
      onTouchStart={(e) => {
        if (e.touches.length > 0) {
          handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
          handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onTouchMove={(e) => {
        if (e.touches.length > 0) {
          handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onTouchEnd={handlePointerUp}
    >
      {/* 100% Transparent Canvas seamlessly matching page background */}
      <canvas ref={canvasRef} className="interactive-earth-canvas" />

      {/* 3D Orbiting Services Layer with Glitchy but Readable Typography */}
      <div className="orbiting-services-container pointer-events-none" aria-hidden="true">
        {SERVICES.map((service, index) => (
          <div
            key={service.name}
            ref={(el) => (serviceRefs.current[index] = el)}
            className="orbiting-service-item pointer-events-auto"
            onMouseEnter={() => (orbitHoverRef.current = true)}
            onMouseLeave={() => (orbitHoverRef.current = false)}
          >
            <div className="orbiting-service-badge">
              <span className="service-led-dot" />
              <span className="material-symbols-outlined service-icon">
                {service.icon}
              </span>
              <span className="glitch-text" data-text={service.name}>
                {service.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveEarth;
