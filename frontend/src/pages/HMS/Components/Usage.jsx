import React from "react";

import Image1 from "./manage2.svg";

import Box2 from "./Box2/Box2";
import Cards from "./Cards/Cards";
import Checklist from "./CheckList/CheckList";
import Box from "./Box/Box";
import CTA from "./CTA/CTA";
import CTA2 from "./CTA2/CTA2";
import Feature from "./Feature/Feature";
import CTASection from "./CTASection/CTASection";
import Feature2 from "./Feature2/Feature2";
import Feature3 from "./Feature3/Feature3";
import Feature4 from "./Feature4/Feature4";
import Feature5 from "./Feature5/Feature5";
import Feature6 from "./Feature6/Feature6";
import Feature7 from "./Feature7/Feature7";

export default function Usage() {

 const CardsData = [
 {
 title: "Reservation Management",
 description:
 "Manage bookings, cancellations, modifications, and room allocations from a centralized reservation dashboard.",
 icon: "fa-solid fa-calendar-check",
 },
 {
 title: "Room Availability Tracking",
 description:
 "Monitor available, occupied, reserved, and maintenance rooms in real time to maximize occupancy.",
 icon: "fa-solid fa-bed",
 },
 {
 title: "Guest Check-In & Check-Out",
 description:
 "Speed up front desk operations with streamlined guest registration, room assignment, and departure workflows.",
 icon: "fa-solid fa-key",
 },
 {
 title: "Guest Record Management",
 description:
 "Maintain complete guest profiles, stay history, contact information, and booking records securely.",
 icon: "fa-solid fa-users",
 },
 {
 title: "Hotel Billing & Payments",
 description:
 "Generate invoices, track guest payments, manage transactions, and maintain accurate financial records.",
 icon: "fa-solid fa-file-invoice-dollar",
 },
 {
 title: "Housekeeping Coordination",
 description:
 "Track room cleaning status, assign housekeeping tasks, and ensure rooms are ready for incoming guests.",
 icon: "fa-solid fa-broom",
 },
 ];

 const BoxData = [
 {
 icon: "fa-solid fa-user-plus",
 title: "Add Employees",
 description: "Create employee profiles.",
 },
 {
 icon: "fa-solid fa-user",
 title: "Track Attendance",
 description: "Record attendance and leave data.",
 },
 ];

 const Box2Data = [
 {
 icon: "fa-solid fa-book-open",
 title: "Knowledge Base",
 description:
 "Access detailed guides for reservations, room inventory, housekeeping, billing and reporting.",
 },
 {
 icon: "fa-solid fa-graduation-cap",
 title: "Training Academy",
 description:
 "Help hotel staff quickly learn HMS workflows through structured tutorials.",
 },
 {
 icon: "fa-solid fa-headset",
 title: "24/7 Support",
 description:
 "Reach our hospitality experts whenever you need assistance.",
 },
 {
 icon: "fa-solid fa-user",
 title: "Implementation Services",
 description:
 "Get help migrating data and configuring your property setup.",
 },
 ];

 const FeatureData = [
 {
 title: "Smart Room Management",
 description:
 "Track room availability, occupancy status, housekeeping updates, and room assignments from a single dashboard.",
 icon: "fa-solid fa-bed",
 },
 {
 title: "Quick Guest Check-In & Check-Out",
 description:
 "Speed up front desk operations with streamlined guest registration, check-in, and check-out workflows.",
 icon: "fa-solid fa-key",
 },
 {
 title: "Reservation Management",
 description:
 "Manage bookings, reservations, cancellations, and guest schedules efficiently without manual paperwork.",
 icon: "fa-solid fa-calendar-days",
 },
 {
 title: "Guest Records & Stay History",
 description:
 "Maintain complete guest profiles, booking history, preferences, and contact information for better service.",
 icon: "fa-solid fa-users",
 },
 ];

 const Feature2Data = [
 {
 tab: "Reservations",
 image: Image1,
 heading: "Smart Reservation Management",
 description:
 "Manage bookings from walk-ins, direct channels, and OTAs from a single dashboard.",
 points: [
 "Real-time room availability",
 "OTA integrations",
 "Quick reservation creation",
 "Booking calendar view",
 ],
 },
 {
 tab: "Housekeeping",
 image: Image1,
 heading: "Efficient Housekeeping Operations",
 description:
 "Track room status and housekeeping tasks in real time to improve guest satisfaction.",
 points: [
 "Room cleaning schedules",
 "Task assignment",
 "Live room status updates",
 "Maintenance tracking",
 ],
 },
 {
 tab: "Billing",
 image: Image1,
 heading: "Fast & Accurate Billing",
 description:
 "Generate invoices, manage payments, and track guest balances effortlessly.",
 points: [
 "GST-compliant invoices",
 "Multiple payment methods",
 "Folio management",
 "Detailed billing reports",
 ],
 },
 ];

 const Feature3Data = [
 {
 title: "Reservation Management",
 description:
 "Handle bookings from multiple channels with real-time room availability and instant confirmations.",
 image: Image1,
 },
 {
 title: "Housekeeping Tracking",
 description:
 "Monitor room status, assign cleaning tasks, and ensure rooms are always guest-ready.",
 image: Image1,
 },
 {
 title: "Guest Management",
 description:
 "Maintain guest profiles, preferences, and stay history to deliver personalized experiences.",
 image: Image1,
 },
 ];

 const Feature4Data = [
 {
 title: "Centralized Operations",
 description:
 "Manage reservations, guest records, housekeeping, and billing from a single platform.",
 image: Image1,
 },
 {
 title: "Real-Time Room Availability",
 description:
 "Track room occupancy and availability instantly.",
 image: Image1,
 },
 {
 title: "Faster Check-Ins",
 description:
 "Reduce front desk workload with streamlined guest check-in and checkout processes.",
 image: Image1,
 },
 {
 title: "Automated Billing & Finance",
 description:
 "Generate professional invoices, automate room charges, and split bills effortlessly during checkout.",
 image: Image1,
 },
 ];

 const Feature5Data = [
 {
 title: "Reservation Management",
 des1: "Create and manage bookings instantly",
 des2: "Track reservation status in real time",
 des3: "Handle modifications and cancellations",
 },
 {
 title: "Room Availability Tracking",
 des1: "Live room occupancy updates",
 des2: "Prevent double-booking conflicts",
 des3: "Instant availability visibility",
 },
 {
 title: "Guest Check-In & Check-Out",
 des1: "Quick guest registration process",
 des2: "Seamless room assignment workflows",
 des3: "Fast departure and billing completion",
 },
 ];

 const Feature6Data = [
 {
 image: Image1,
 category: "Getting Started",
 title:
 "How to Set Up Rooms, Properties, and Hotel Information",
 onClick: () =>
 navigate("/help/room-property-setup"),
 },

 {
 image: Image1,
 category: "Reservations & Guests",
 title:
 "How to Manage Bookings, Check-Ins, and Check-Outs",
 onClick: () =>
 navigate("/help/reservations-checkin-checkout"),
 },

 {
 image: Image1,
 category: "Operations & Billing",
 title:
 "Understanding Room Billing, Payments, and Hotel Reports",
 onClick: () =>
 navigate("/help/hotel-billing-reports"),
 },
 ]

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
 ];

 return (
 <>

 <div style={{ display: "flex", justifyContent: "center" }}> <h2>Box</h2> </div>
 <Box
 badge="Payroll Workflow"
 title="Payroll Process"
 description="A simple payroll workflow."
 steps={BoxData}
 />

 <div style={{ display: "flex", justifyContent: "center" }}> <h2>Box2</h2> </div>
 <Box2
 badge="Customer Success"
 cardBg='#F6FFDC'
 badgeBg='#F6FFDC'
 badgeTxtClr='#54c42f'
 btnClr='#54c42f'
 iconBg='#54c42fcb'
 title="Support That Keeps Your Hotel Running" description="From onboarding new properties and configuring room inventories to optimizing reservations, guest management, billing workflows, and daily hotel operations, our hospitality experts are available to provide guidance, training, and dedicated assistance whenever your team needs support."
 primaryBtn="Contact Support"
 secondaryBtn="Browse Resources"
 options={Box2Data}
 />

 <div style={{ display: "flex", justifyContent: "center" }}> <h2>Cards</h2> </div>
 <Cards
 bgClr="#F6FFDC"
 title="Key features that simplify hotel management"
 cards={CardsData} />

 <div style={{ display: "flex", justifyContent: "center" }}> <h2>Checklist</h2> </div>
 <Checklist
 title="Features designed to enhance every guest arrival experience"
 bgClr="#F6FFDC"
 features={[
 "Reduce guest waiting times",
 "Manage arrivals from a single dashboard",
 "Track room readiness instantly",
 "Access guest records in real time",
 "Simplify reservation management",
 "Improve front desk productivity",
 ]}
 />

 <div style={{ display: "flex", justifyContent: "center" }}> <h2>CTA</h2> </div>
 <CTA
 title="Ready to bill smarter?"
 description="Create GST invoices, manage customers, and track payments from a single platform."
 primaryText="Start Free Trial"
 primaryLink="/signup"
 secondaryText="Book a Demo"
 secondaryLink="/contact"
 />

 <div style={{ display: "flex", justifyContent: "center" }}> <h2>CTA2</h2> </div>
 <CTA2
 bgClr="#f8fafc"
 title="Ready to streamline your hotel operations?"
 subtitle="Manage reservations, guest check-ins, housekeeping, billing, and reports from a single platform."
 primaryText="Start Free Trial"
 primaryLink="https://www.hms.swordnex.com/signup"
 secondaryText="Book a Demo"
 secondaryLink="/products/hms/support"
 />

 <div style={{ display: "flex", justifyContent: "center" }}> <h2>CTASection</h2> </div>
 <CTASection
 bgClr="#F6FFDC"
 hColor="#174607"
 btnTxtColor="#fff"
 badgeColor="#54c42f13"
 btnBg="#54c42f"
 pColor="#292e28af"
 title="Modern hotel management software built for exceptional guest experiences"
 description="Streamline bookings, room management, guest services, housekeeping, and billing with a powerful cloud-based hotel management solution."
 primaryBtn="Start Free Trial"
 secondaryBtn="Book Demo"
 />

 <div style={{ display: "flex", justifyContent: "center" }}> <h2>Feature</h2> </div>
 <Feature
 title={"Everything required to manage your hotel efficiently"}
 features={FeatureData}
 />

 <div style={{ display: "flex", justifyContent: "center" }}> <h2>Feature2</h2> </div>
 <Feature2
 title="Hotel Management Features"
 subtitle="Everything you need to run your hotel efficiently"
 bgColor="#f8fafc"
 features={Feature2Data}
 />

 <div style={{ display: "flex", justifyContent: "center" }}> <h2>Feature3</h2> </div>
 <Feature3
 title="Powerful Features for"
 highlight="Modern Hotel Management"
 description="Everything you need to manage reservations, guests, housekeeping, and billing from a single platform."
 bgColor="#0f172a"
 highlightClr="#f59e0b"
 hTextClr="#ffffff"
 pColor="#cbd5e1"
 features={Feature3Data}
 />

 <div style={{ display: "flex", justifyContent: "center" }}> <h2>Feature4</h2> </div>
 <Feature4
 title="Why Hotels Choose SwordNex HMS"
 bgColor="#f8fafc"
 cardClr="#ffffff"
 features={Feature4Data}
 />

 <Feature5
 title="Reservation Management Features"
 description="Everything you need to manage bookings, guests, room availability, and reservation operations efficiently."
 featureTwo={Feature5Data}
 />

 <Feature6
 title="SwordNex HMS Help Center"
 description="Explore setup guides, reservation management tutorials, guest service resources, and troubleshooting articles to get the most out of SwordNex HMS."
 viewAllText="View All Help Articles"
 onViewAll={() => navigate("/hms/help")}
 contain={true}
 resources={Feature6Data}
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

 </>
 )
}