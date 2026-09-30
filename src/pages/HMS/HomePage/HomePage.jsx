import React from "react";

import Image1 from "./Images/management.svg";
import ReserveImg from "./Images/mgmt.jpg";
import CheckinImg from "./Images/checkin.jpg";
import PaymentImg from "./Images/payment2.jpg";
import InsightImg from "./Images/insights.jpg";
import BookingImg from "./Images/BookingOnline.svg";
import MgmtImg from "./Images/manage2.svg";
import CheckImg from "./Images/selfCheck.svg";
import TrackImg from "./Images/tracking2.svg";
import WorkImg from "./Images/work.svg";

import Hero4 from "../Components/Hero4/Hero4";
import TrustBox from "../Components/TrustBox/TrustBox";
import Feature7 from "../Components/Feature7/Feature7";
import Feature8 from "../Components/Feature8/Feature8";
import TrialBox3 from "../Components/TrialBox3/TrialBox3";
import CTA2 from "../Components/CTA2/CTA2";
import Hero2 from "../Components/Hero2/Hero2";
import TrialBox from "../Components/TrialBox/TrialBox";
import Footer from "../Footer/Footer";
import Header4 from "../Components/Header4/Header4";

export default function HomePage() {

 const Feature7Data = [
 {
 icon: "◈",
 label: "Operations",
 title: "Real-Time Housekeeping Tracker",
 description:
 "Assign, monitor and close housekeeping tasks across every floor in real time.",

 linkText: "Explore Housekeeping",
 link: "#housekeeping",
 },

 {
 icon: "◎",
 label: "Distribution",
 title: "Multi-Channel Channel Manager",
 description:
 "Sync rates and availability across Booking.com, Expedia and Airbnb.",

 linkText: "Explore Distribution",
 link: "#distribution",
 },

 {
 icon: "◉",
 label: "Guest Experience",
 title: "Automated Guest Check-Ins",
 description:
 "Allow guests to check in digitally before arriving.",

 linkText: "Explore Check-ins",
 link: "#checkin",
 },

 {
 icon: "◆",
 label: "Revenue Intelligence",
 title: "Dynamic Pricing Engine",
 description:
 "Automatically adjust rates based on demand and occupancy.",

 linkText: "Explore Pricing",
 link: "#pricing",
 },

 {
 icon: "◇",
 label: "Analytics",
 title: "Unified Analytics Dashboard",
 description:
 "Track ADR, occupancy, revenue and guest satisfaction KPIs.",

 linkText: "Explore Analytics",
 link: "#analytics",
 },

 {
 icon: "▣",
 label: "Maintenance",
 title: "Predictive Maintenance Alerts",
 description:
 "Schedule preventive maintenance before issues impact guests.",

 linkText: "Explore Maintenance",
 link: "#maintenance",
 },
 ];

 const tabs = [
 {
 id: "reservations",
 title: "Reservations",
 heading: "Centralized Reservation Management",
 description:
 "Manage bookings from direct channels, OTAs, travel agents, and walk-ins through a single dashboard while maintaining real-time room availability.",
 image: ReserveImg,
 },

 {
 id: "frontdesk",
 title: "Front Desk",
 heading: "Faster Check-Ins & Check-Outs",
 description:
 "Simplify guest arrivals and departures with quick room assignments, digital registration, guest profiles, and automated check-out workflows.",
 image: CheckinImg,
 },

 // {
 // id: "channel-manager",
 // title: "Channel Manager",
 // heading: "Synchronize Inventory Across All Channels",
 // description:
 // "Keep room availability, rates, and reservations synchronized across Booking.com, Expedia, Airbnb, and other distribution platforms.",
 // image: Image1,
 // },

 {
 id: "billing",
 title: "Billing",
 heading: "Automated Billing & Payment Processing",
 description:
 "Generate invoices automatically, manage guest charges, process payments securely, and maintain accurate financial records.",
 image: PaymentImg,
 },

 {
 id: "analytics",
 title: "Analytics",
 heading: "Data-Driven Insights for Better Decisions",
 description:
 "Track occupancy, ADR, RevPAR, revenue performance, guest trends, and operational KPIs through powerful visual reports.",
 image: InsightImg,
 },
 ];

 const Feature8Data = [
 {
 title: "Online Booking Engine",
 category: "Reservations",
 image: BookingImg,
 description:
 "Accept direct bookings from your website and reduce dependency on third-party channels.",
 link: "#",
 },

 {
 title: "Housekeeping Management",
 category: "Operations",
 image: MgmtImg,
 description:
 "Track room cleaning status in real time and improve staff productivity.",
 link: "#",
 },

 {
 title: "Guest Self Check-In",
 category: "Guest Experience",
 image: CheckImg,
 description:
 "Enable guests to check in digitally and reduce front desk waiting times.",
 link: "#",
 },

 {
 title: "Maintenance Tracking",
 category: "Facility Management",
 image: TrackImg,
 description:
 "Create work orders, monitor asset health, and prevent service disruptions.",
 link: "#",
 },
 ];

 const roomData = [
 {
 type: "Suite",
 title: "Ocean Suite",
 price: "$420 / night",
 gradient:
 "linear-gradient(135deg,#1e3a5f,#3b6fa0,#5cbdb9)"
 },

 {
 type: "Villa",
 title: "Garden Villa",
 price: "$680 / night",
 gradient:
 "linear-gradient(135deg,#4a6741,#87a878,#e8c07a)"
 },

 {
 type: "Deluxe",
 title: "Skyline Deluxe",
 price: "$310 / night",
 gradient:
 "linear-gradient(135deg,#5c2018,#9b4423,#d4842a)"
 },

 {
 type: "Classic",
 title: "Heritage Room",
 price: "$190 / night",
 gradient:
 "linear-gradient(135deg,#0d0d0d,#1a1a1a,#c9a84c)"
 }
 ];

 const TrustBoxData = [
 {
 icon: "◈",
 value: "99.9%",
 label: "System Availability",
 subLabel: "Reliable cloud infrastructure",
 },

 {
 icon: "◉",
 value: "100%",
 label: "Real-Time Visibility",
 subLabel: "Across all hotel departments",
 },

 {
 icon: "◎",
 value: "24/7",
 label: "Operational Access",
 subLabel: "Anytime, anywhere",
 },

 {
 icon: "◆",
 value: "10+",
 label: "Integrated Modules",
 subLabel: "One platform for all operations",
 },
 ];

 const Header4Data = [
 {
 title: "Accept reservations",
 description:
 "Manage incoming bookings and keep room inventory updated automatically.",
 },
 {
 title: "Check in guests",
 description:
 "Register guests quickly, assign rooms efficiently, and maintain detailed guest records in one place.",
 },
 {
 title: "Run hotel operations",
 description:
 "Track room status, generate bills, and monitor daily hotel performance from one platform.",
 },
 ];

 return (
 <div>

 <Hero4
 badgeTxt="Hotel Management Software"
 badgeTxtClr="#468432"
 hText="One Platform For Every"
 highText="Hotel Operation"
 highlightClr="#54c42f"
 description="Manage reservations, guest check-ins, housekeeping, billing, channel distribution, revenue optimization and analytics from a single cloud-based platform."
 bgColor="#F6FFDC"
 btnClr="#3aca0a"
 activeBg="#D1FAE5"
 activeClr="#065F46"
 tabs={tabs}
 />

 <Feature7
 badge="Built for Hospitality"
 badgeBg="#D1FAE5"
 title="Every Module Your Hotel Needs"
 description="Designed from the ground up for modern hotels, resorts, serviced apartments, and hospitality groups."
 columns={3}
 features={Feature7Data}
 bgColor="#FFFFFF"
 cardBg="#F6FFDC"
 highlightClr="#468432"
 />

 <Header4
 badge="How SwordNex HMS Works"
 title="Manage your hotel operations in just a few simple steps"
 description="Handle reservations, guest check-ins, room availability, billing, and daily hotel operations from a single centralized platform."
 image={WorkImg}
 steps={Header4Data}
 bgColor="#F6FFDC"
 indexBg="#468432"
 />

 <Feature8
 // bgColor="#F5F5F5"
 cardBg="#F6FFDC"
 rooms={Feature8Data}
 />

 <TrustBox
 title="Built for Modern Hospitality Operations"
 description="SwordNex HMS empowers hotels with centralized reservations, guest management, billing automation, housekeeping coordination, and actionable business insights."

 stats={TrustBoxData}
 bgColor="#F6FFDC"

 logos={[
 "Reservations",
 "Check-In & Check-Out",
 "Housekeeping",
 "Guest Billing",
 "Analytics",
 "Channel Management",
 ]}
 />

 {/* <TrialBox3
 tag="SwordNex HMS"
 title="Transform hotel operations with one powerful platform"
 description="Manage reservations, front desk operations, housekeeping, billing, channel distribution, and guest experiences from a single cloud-based hotel management system."
 primaryBtn="START FREE TRIAL"
 secondaryBtn="BOOK LIVE DEMO"
 stats={[
 {
 number: "99.9%",
 label: "Platform uptime for uninterrupted hotel operations",
 },
 {
 number: "24/7",
 label: "Access your property from anywhere, anytime",
 },
 {
 number: "10K+",
 label: "Rooms managed through SwordNex HMS",
 },
 {
 number: "500+",
 label: "Hotels and resorts trust our platform",
 },
 ]}
 /> */}

 <Hero2
 img={Image1}
 highLightClr="#54c42f"
 btnClr="#4fdd20"
 before="The Complete"
 highlight="Hotel Management"
 after="Platform"
 description="Ready to elevate your hotel operations? Manage reservations, front desk activities, housekeeping, billing, guest experiences, and revenue performance from a single cloud-based platform."
 primaryBtn="Start Free Trial"
 secondaryBtn="Book Live Demo"
 />

 </div>
 )
}