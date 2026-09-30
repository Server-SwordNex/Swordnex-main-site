import React from 'react';
import Teach from "./how.svg";
import Process from "./how2.svg";
import Reports from "./understand.svg";
import SecHeader from '../components/SecHeader/SecHeader';
import RoleSec from '../components/RoleSec/RoleSec';
import Feature6 from '../components/Feature6/Feature6';
import Box from '../Components/Box/Box';
import Box2 from '../Components/Box2/Box2';
import CTASection from '../Components/CTASection/CTASection';

export default function Help() {

 const helpCards = [
 {
 icon: "📚",
 title: "Knowledge Base",
 description:
 "Browse detailed guides and tutorials for reservations, housekeeping, billing, and guest management.",
 link: "#",
 },
 {
 icon: "🎥",
 title: "Video Tutorials",
 description:
 "Watch step-by-step walkthroughs to quickly train your hotel staff.",
 link: "#",
 },
 {
 icon: "💬",
 title: "Live Support",
 description:
 "Connect instantly with our hospitality software specialists.",
 link: "#",
 },
 {
 icon: "🛠️",
 title: "Implementation Help",
 description:
 "Get assistance setting up properties, room types, rates, and user permissions.",
 link: "#",
 },
 ];

 const supportOptions = [
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


 const supportJourney = [
 {
 icon: "🏨",
 title: "Property Setup",
 description:
 "Our onboarding specialists help configure properties, room types, rate plans and user permissions.",
 },
 {
 icon: "📚",
 title: "Staff Training",
 description:
 "Provide hotel teams with guided training sessions and learning resources.",
 },
 {
 icon: "🚀",
 title: "Go Live",
 description:
 "Launch confidently with live assistance during your first operational days.",
 },
 {
 icon: "💬",
 title: "Continuous Support",
 description:
 "Receive ongoing help through chat, email and phone whenever needed.",
 },
 ];

 return (
 <>

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
 options={supportOptions}
 />

 <Feature6
 title="SwordNex HMS Help Center"
 description="Explore setup guides, reservation management tutorials, guest service resources, and troubleshooting articles to get the most out of SwordNex HMS."
 viewAllText="View All Help Articles"
 onViewAll={() => navigate("/hms/help")}
 contain={true}
 resources={[
 {
 image: Teach,
 category: "Getting Started",
 title:
 "How to Set Up Rooms, Properties, and Hotel Information",
 onClick: () =>
 navigate("/help/room-property-setup"),
 },

 {
 image: Process,
 category: "Reservations & Guests",
 title:
 "How to Manage Bookings, Check-Ins, and Check-Outs",
 onClick: () =>
 navigate("/help/reservations-checkin-checkout"),
 },

 {
 image: Reports,
 category: "Operations & Billing",
 title:
 "Understanding Room Billing, Payments, and Hotel Reports",
 onClick: () =>
 navigate("/help/hotel-billing-reports"),
 },
 ]}
 />


 </>
 )
}