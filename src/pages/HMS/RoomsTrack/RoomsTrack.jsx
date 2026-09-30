import React from "react";
import Image1 from "./roomtrack.svg";
import Image2 from "./available.svg";
import Header4 from "../Components/Header4/Header4";
import Steps from "../Components/StepsSection/Steps";
import Cards from "../Components/Cards/Cards";
import Hero2 from "../Components/Hero2/Hero2";

export default function RoomsTrack() {

 const Header4Data = [
 {
 title: "Check current room status",
 description:
 "Instantly see which rooms are available for booking and which are occupied or reserved.",
 },
 {
 title: "Manage room assignments",
 description:
 "Allocate rooms efficiently based on reservations, guest preferences, and availability.",
 },
 {
 title: "Keep availability updated",
 description:
 "Synchronize room status with check-ins, check-outs, and housekeeping activities in real time.",
 },
 ];

 const StepsFeatures = [
 {
 title: "Live Availability Updates",
 description:
 "Receive real-time updates whenever room status changes due to reservations, arrivals, departures, or housekeeping activities.",
 icon: "fa-solid fa-arrows-rotate",
 },
 {
 title: "Smarter Room Allocation",
 description:
 "Assign available rooms quickly and reduce booking conflicts with accurate occupancy information.",
 icon: "fa-solid fa-key",
 },
 {
 title: "Improved Occupancy Visibility",
 description:
 "Gain a complete overview of room inventory to maximize utilization and support better planning decisions.",
 icon: "fa-solid fa-eye",
 },
 ];

 const Features = [
 {
 title: "Reduce Booking Conflicts",
 description:
 "Maintain accurate room status updates to avoid double bookings and reservation issues.",
 icon: "fa-solid fa-ban",
 },
 {
 title: "Increase Operational Efficiency",
 description:
 "Coordinate reservations, housekeeping, and front desk activities using a single source of truth.",
 icon: "fa-solid fa-gears",
 },
 {
 title: "Enhance Guest Satisfaction",
 description:
 "Ensure rooms are ready when guests arrive and deliver a smoother hospitality experience.",
 icon: "fa-solid fa-star",
 },
 ];

 return (
 <>
 <Header4
 badge="Room Availability Tracking"
 title="Monitor room occupancy and availability in a few simple steps"
 description="Track available, occupied, reserved, and housekeeping-status rooms in real time to improve room utilization and streamline daily hotel operations."
 image={Image1}
 steps={Header4Data}
 />

 <Steps
 // reverse={true}
 title="SwordNex HMS helps you track room availability with complete visibility..."
 steps={StepsFeatures}
 />

 <Cards
 title="Benefits of real-time room availability tracking"
 cards={Features}
 />

 <Hero2
 highLightClr="#54c42f"
 btnClr="#34c006"
 img={Image2}
 reverse={true}
 before={"Keep Every"}
 highlight={"Room Available"}
 after={"When Guests Need It"}
 description={"Track room occupancy, housekeeping status, and reservations instantly to maximize bookings, improve guest satisfaction, and streamline hotel operations."}
 primaryBtn={"Get Started Today"}
 secondaryBtn={"Request Demo"}
 />
 </>
 )
}