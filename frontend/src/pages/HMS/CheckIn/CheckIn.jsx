import React from "react";
import Image1 from "./checkin3.svg";
import Header3 from "../Components/Header3/Header3";
import Hero2 from "../Components/Hero2/Hero2";
import Checklist from "../Components/CheckList/CheckList";

export default function CheckIn() {
 return (
 <>
 <Header3
 tag="Guest Check-In Software"
 title="Streamline guest arrivals, room assignments & front desk operations"
 description="Deliver faster check-ins, reduce waiting times, and manage guest information efficiently with a centralized hotel check-in management system."
 primaryBtn="START FREE TRIAL"
 secondaryBtn="BOOK DEMO"
 cardColor="#66b340"
 btnColor="#3fb916"
 badgeBg="#ebffe2"

 leftCard={{
 icon: "fa-solid fa-key",
 title: "Simplify every guest check-in experience",
 description:
 "Manage arrivals, room assignments, guest records, reservations, and front desk activities from one easy-to-use platform.",
 stats: [
 {
 value: "24/7",
 label: "Access to guest information",
 },
 {
 value: "100%",
 label: "Centralized guest records",
 },
 {
 value: "1",
 label: "Platform for check-ins & reservations",
 },
 {
 value: "∞",
 label: "Scalable for hotels of any size",
 },
 ],
 }}
 rightCards={[
 {
 icon: "fa-solid fa-user-check",
 title: "Fast Guest Check-Ins",
 description:
 "Register guests quickly and reduce front desk waiting times.",
 },
 {
 icon: "fa-solid fa-bed",
 title: "Room Assignment",
 description:
 "Assign available rooms instantly with real-time availability visibility.",
 },
 {
 icon: "fa-solid fa-id-card",
 title: "Guest Information",
 description:
 "Maintain guest profiles, contact details, and stay history securely.",
 },
 {
 icon: "fa-solid fa-calendar-check",
 title: "Reservation Integration",
 description:
 "Connect reservations directly with check-in workflows for smoother operations.",
 },
 ]}
 />

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
 "Coordinate check-ins and check-outs efficiently",
 "Deliver consistent hospitality experiences",
 "Streamlined front desk operations",
 "Faster check-out and billing workflows",
 ]}
 />

 <Hero2
 highLightClr="#54c42f"
 btnClr="#34c006"
 img={Image1}
 reverse={true}
 before={"Transform Every"}
 highlight={"Guest Arrival"}
 after={"Into a Great Experience"}
 description={"Empower your front desk team with faster check-ins, centralized guest information, and seamless reservation management that helps your hotel operate more efficiently."}
 primaryBtn={"Get Started Today"}
 secondaryBtn={"Request Demo"}
 />

 </>
 )
}