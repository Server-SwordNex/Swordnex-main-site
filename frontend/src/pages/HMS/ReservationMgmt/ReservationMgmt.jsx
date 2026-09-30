import React from "react";
import Image1 from "./OnlineBook.svg";
import Image2 from "./manage3.svg";

import SecHeader from "../components/SecHeader/SecHeader";
import Feature2 from "../Components/Feature2/Feature2";
import Feature5 from "../Components/Feature5/Feature5";
import InfoSplit from "../Components/InfoSplit/InfoSplit";
import Hero2 from "../Components/Hero2/Hero2";

export default function ReservationMgmt() {

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
 {
 title: "Guest Information Management",
 des1: "Centralized guest profiles",
 des2: "Access booking and stay history",
 des3: "Maintain contact information securely",
 },
 {
 title: "Reservation Billing",
 des1: "Generate booking invoices instantly",
 des2: "Track payments and balances",
 des3: "Maintain complete transaction records",
 },
 {
 title: "Reservation Reports",
 des1: "Monitor occupancy trends",
 des2: "Track booking performance",
 des3: "Analyze reservation activity",
 }
 ];

 return (
 <>
 <SecHeader
 badgeClr="#2e8f0e"
 badge="Reservation Management"
 title="Streamline room bookings, guest check-ins, and live inventory tracking"
 description="Optimize occupancy rates, automate reservation workflows, manage check-ins, and prevent double-bookings with Swordnex Hotel Management Software."
 />


 <Feature5
 title="Reservation Management Features"
 description="Everything you need to manage bookings, guests, room availability, and reservation operations efficiently."
 featureTwo={Feature5Data}
 />

 <InfoSplit
 image={Image1}
 bgColor="#F6FFDC"
 title="Turn every reservation into a better guest experience"
 description="Manage bookings, room assignments, guest information, and reservation activities from one platform while reducing manual work and improving operational efficiency."
 points={[
 "Reduce booking conflicts",
 "Improve occupancy visibility",
 "Streamline front desk operations",
 "Maintain complete reservation records",
 ]}
 />

 <Hero2
 img={Image2}
 before={"Manage Every"}
 highlight={"Reservation"}
 highLightClr="#54c42f"
 btnClr="#3aa815"
 after={"With Confidence"}
 description={"From room allocation and booking management to guest check-ins and reservation tracking, SwordNex HMS helps hotels operate more efficiently and serve guests better."}
 primaryBtn={"Get Started"}
 secondaryBtn={"Request Demo"}
 />
 </>
 )
}