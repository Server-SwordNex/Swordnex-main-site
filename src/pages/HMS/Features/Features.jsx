import React from "react";
import Image1 from "./features2.svg";
import Header from "../Components/Header/Header";
import Feature from "../Components/Feature/Feature";
import InfoSplit from "../Components/InfoSplit/InfoSplit";
import TrialBox3 from "../Components/TrialBox3/TrialBox3";
import Cards from "../Components/Cards/Cards";

export default function Features() {

 const HeaderFeatures = [
 {
 icon: "fa-solid fa-list-check",
 title: "Job Allocation",
 description:
 "Assign tasks to subusers instantly and monitor progress from the admin panel.",
 position: "topLeft",
 },
 {
 icon: "fa-solid fa-satellite-dish",
 title: "Real-Time Tracking",
 description:
 "Log work hours, track subuser activity, and monitor tasks completed per week.",
 position: "topRight",
 },
 {
 icon: "fa-solid fa-user-shield",
 title: "Role-Based Access",
 description:
 "Protect sensitive operational data with strict admin-only editing controls.",
 position: "middleLeft",
 },
 {
 icon: "fa-solid fa-headset",
 title: "Support Facilities",
 description:
 "Resolve customer and team queries faster using integrated helpdesk tools.",
 position: "bottomRight",
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
 title: "Billing & Payment Tracking",
 description:
 "Generate guest invoices, track payments, and maintain accurate transaction records for every stay.",
 icon: "fa-solid fa-file-invoice-dollar",
 },
 {
 title: "Housekeeping Coordination",
 description:
 "Monitor room cleaning status, assign housekeeping tasks, and ensure rooms are ready for arriving guests.",
 icon: "fa-solid fa-broom",
 },
 {
 title: "Guest Records & Stay History",
 description:
 "Maintain complete guest profiles, booking history, preferences, and contact information for better service.",
 icon: "fa-solid fa-users",
 },
 ];

 const Features = [
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

 return (
 <>
 <Header
 bgColor="#F6FFDC"
 badgeBg="#D1FAE5"
 btnColor="#3bac15"
 badge="Smart Hotel Management"
 title="Manage reservations, guests, rooms, and billing from one platform"
 description="Streamline hotel operations with real-time room management, reservation tracking, guest check-ins, housekeeping coordination, and billing tools designed for modern hospitality businesses."
 primaryBtn="START FREE TRIAL"
 secondaryBtn="WATCH DEMO"
 cards={HeaderFeatures}
 />

 <Feature
 title={"Everything required to manage your hotel efficiently"}
 features={FeatureData}
 />

 <InfoSplit
 image={Image1}
 bgColor="#F6FFDC"
 title="Why hotels choose SwordNex HMS"
 description="Simplify daily hotel operations by managing reservations, guest stays, room availability, billing, and housekeeping activities from a single centralized platform."
 points={[
 "Real-time room availability tracking",
 "Faster guest check-in and check-out",
 "Centralized reservation management",
 "Accurate billing and payment monitoring",
 ]}
 />

 <Cards
 bgClr="#F6FFDC"
 title="Key features that simplify hotel management"
 cards={Features} />

 <TrialBox3
 tag="SwordNex HMS"
 title="Manage your hotel operations from one powerful platform"
 description="Streamline reservations, room management, guest records, housekeeping, billing, and daily hotel operations with an easy-to-use cloud-based hotel management system."
 primaryBtn="START FREE TRIAL"
 secondaryBtn="BOOK LIVE DEMO"
 stats={[
 {
 number: "100%",
 label: "Centralized hotel operations management",
 },
 {
 number: "24/7",
 label: "Access your hotel data anytime, anywhere",
 },
 {
 number: "1",
 label: "Unified platform for reservations and billing",
 },
 {
 number: "∞",
 label: "Scalable for hotels of every size",
 },
 ]}
 />
 </>
 )
}