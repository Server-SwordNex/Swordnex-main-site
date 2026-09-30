import React from "react";
import Image1 from "./SmartImg2.svg";
import ReserveImg from "./Booking.svg";
import FrontDeskImg from "./FrontDesk.svg";
import HousekeepImg from "./Housekeep.svg";

import Hero3 from "../components/Hero3/Hero3";
import Feature9 from "../Components/Feature9/Feature9";
import TrialBox from "../Components/TrialBox/TrialBox";

export default function HmsSoftware() {

 const showcaseData = [
 {
 category: "Front Desk",
 title: "Faster Guest Check-In Experience",
 image: FrontDeskImg,

 description:
 "Reduce queues and automate guest registration for a seamless arrival experience.",

 points: [
 "Digital registration cards",
 "ID verification",
 "Contactless check-ins",
 "Instant room assignment",
 ],

 link: "#",
 },
 {
 category: "Reservations",
 title: "Centralized Booking Management",
 image: ReserveImg,
 description:
 "Manage direct bookings, OTA reservations, and walk-ins from one dashboard.",

 points: [
 "Real-time room availability",
 "No overbookings",
 "OTA integrations",
 "Group booking support",
 ],

 link: "#",
 },
 {
 category: "Housekeeping",
 title: "Live Housekeeping Coordination",
 image: HousekeepImg,

 description:
 "Track room cleaning status and assign tasks instantly across departments.",

 points: [
 "Real-time room status",
 "Staff assignment",
 "Maintenance alerts",
 "Mobile housekeeping app",
 ],

 link: "#",
 },

 // {
 // category: "Analytics",
 // title: "Revenue & Occupancy Insights",
 // image: Image1,

 // description:
 // "Monitor hotel performance with powerful operational and financial dashboards.",

 // points: [
 // "Occupancy reports",
 // "ADR & RevPAR tracking",
 // "Revenue forecasting",
 // "Custom dashboards",
 // ],

 // link: "#",
 // },
 ];

 return (
 <>
 <Hero3
 bgColor="#F6FFDC"
 btnClr="#34c006"
 title="What is a Hotel Management System (HMS)?"
 heading="A smarter way to manage reservations, guests, and hotel operations."
 description="Discover how modern hotel management software helps improve guest experiences, increase operational efficiency, reduce manual work, and simplify day-to-day hotel management."
 primaryBtn="DISCOVER HMS"
 secondaryBtn="WATCH DEMO"
 leftImage={Image1}
 />

 <Feature9
 badge="Hotel Management Software"
 title="Everything You Need To Run A Modern Hotel"
 description="Manage reservations, guests, housekeeping, revenue and analytics from one centralized platform."
 features={showcaseData}
 />

 <TrialBox
 btnClr="#2e8f0e"
 smallText="Ready to simplify hotel operations and elevate guest experiences?"
 title="Experience the Future of Hotel Management"
 primaryBtn="START YOUR FREE TRIAL"
 secondaryBtn="BOOK A LIVE DEMO"
 />

 </>
 )
}