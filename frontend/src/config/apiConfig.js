// API Configuration
// When deployed to Firebase, we use relative paths thanks to firebase.json rewrites.
// For local development, we point to the local server or emulator.

const API_BASE_URL = import.meta.env.MODE === 'production'
 ? '' // In production, /api calls will be handled by Firebase Hosting rewrites
 : 'http://localhost:5000/swordnex-sites/us-central1/api'; // In dev, use the local emulator path

export default API_BASE_URL;
