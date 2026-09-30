import React from 'react';
import Teach from "./how4.svg";
import Process from "./how3.svg";
import Reports from "./understand2.svg";
import Feature6 from '../Components/Feature6/Feature6';
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
 "Explore detailed guides for invoicing, GST billing, inventory management, customer records, and reporting.",
 },
 {
 icon: "fa-solid fa-graduation-cap",
 title: "Learning Center",
 description:
 "Master invoice creation, payment tracking, and business management through practical tutorials.",
 },
 {
 icon: "fa-solid fa-headset",
 title: "Dedicated Support",
 description:
 "Reach our billing specialists whenever you need assistance with your account or workflows.",
 },
 {
 icon: "fa-solid fa-user-gear",
 title: "Setup Assistance",
 description:
 "Get help configuring business information, invoice settings, users, and billing processes.",
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
 bgClr="#fff"
 hColor="#582a0e"
 btnTxtColor="#fff"
 badgeColor="#F6850C13"
 btnBg="#F6850C"
 pColor="#292e28af"
 title="Get the most out of your invoicing and billing workflow"
 description="Learn how to create invoices, manage customers, track payments, handle GST billing, and generate business reports with SwordNex Invoice."
 primaryBtn="Contact Support"
 secondaryBtn="Browse Help Center"
 />

 <Box2
 badge="Customer Success"
 cardBg="#fff6dc"
 badgeBg="#FFF4E5"
 badgeTxtClr="#F6850C"
 btnClr="#F6850C"
 iconBg="#ffae62"
 title="Support That Keeps Your Billing Operations Running Smoothly"
 description="From setting up your business profile and invoice numbering to managing customers, GST invoices, inventory records, payments, and reports, our experts are available to provide guidance, training, and dedicated assistance whenever you need support."
 primaryBtn="Contact Support"
 secondaryBtn="Browse Resources"
 options={supportOptions}
 />

 <Feature6
 title="SwordNex Invoice Help Center"
 description="Explore setup guides, invoicing tutorials, GST billing resources, and troubleshooting articles to get the most out of SwordNex Invoice."
 viewAllText="View All Help Articles"
 onViewAll={() => navigate("/invoice/help")}
 contain={true}
 resources={[
 {
 image: Teach,
 category: "Getting Started",
 title: "How to Set Up Business Information, Customers, and Invoice Settings",
 readMore: "/products/invoice/faq",
 },

 {
 image: Process,
 category: "Billing & Invoicing",
 title: "How to Create GST Invoices and Manage Customer Payments",
 readMore: "/products/invoice/faq",
 },

 {
 image: Reports,
 category: "Reports & Analytics",
 title: "Understanding Sales Reports, Cashbook Tracking, and Business Insights",
 readMore: "/products/invoice/faq",
 },
 ]}
 />
 </>
 )
}