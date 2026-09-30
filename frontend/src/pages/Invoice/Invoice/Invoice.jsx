import React from "react";
import Image1 from "./Invoice.svg";
import SecHeader from "../Components/SecHeader/SecHeader";
import Hero3 from "../Components/Hero3/Hero3";
import Cards from "../Components/Cards/Cards";
import Checklist from "../Components/CheckList/CheckList";
import TrialBox from "../Components/TrialBox/TrialBox";

export default function Invoice() {

 const Hero3Data = [
 {
 label: "Payment Speed",
 value: "3x Faster",
 position: "topLeft",
 },
 {
 label: "Invoices Sent",
 value: "10M+",
 position: "topRight",
 },
 {
 label: "Active Clients",
 value: "80K+",
 position: "bottomLeft",
 },
 {
 label: "Global Currencies",
 value: "135+",
 position: "bottomRight",
 },
 ]

 const CardData = [
 {
 title: "Manual-Free Invoicing",
 description:
 "Ditch recurring manual work. Generate professional bills, attach company logos, and display custom signatures automatically.",
 icon: "fa-solid fa-file-invoice-dollar",
 },
 {
 title: "Admin & Subuser Control",
 description:
 "Manage your team with role-based access control, subuser creation, and detailed admin-only activity tracking logs.",
 icon: "fa-solid fa-users-gear",
 },
 {
 title: "Client Portal & Support",
 description:
 "Reduce support requests. Let clients log in to view payment histories, download receipts, and access support facilities.",
 icon: "fa-solid fa-headset",
 },
 {
 title: "Customer Transaction History",
 description:
 "Businesses can use invoices to maintain a complete history of purchases, payments, and customer interactions.",
 icon: "fa-solid fa-users",
 },
 {
 title: "Professional Business Image",
 description:
 "Well-designed invoices improve credibility, build customer trust, and create a more professional billing experience.",
 icon: "fa-solid fa-building",
 },
 {
 title: "Accurate Financial Records",
 description:
 "Maintaining invoices helps businesses track revenue, monitor cash flow, and keep organized accounting records.",
 icon: "fa-solid fa-book",
 },
 ];

 return (
 <>
 <SecHeader
 badge="Invoice Guide"
 title="What is an invoice and why is it important for your business?"
 description="Learn how invoices help businesses record sales, request payments, maintain financial records, and manage customer transactions accurately and professionally."
 />

 {/* <Hero5
 tag="AI-Powered Invoicing"
 title="Streamlined billing for modern businesses"
 description="Create professional invoices, automate payment reminders, track expenses, and manage client billing on one intelligent cloud platform."
 primaryBtn="START FREE TRIAL"
 secondaryBtn="BOOK DEMO"
 image={Image1}
 miniCards={Hero3Data}
 /> */}

 <Hero3
 title="Swordnex Payslip Designer"
 heading="Professional, brand aligned payslip templates in seconds."
 description="Customize and generate clean, compliance-ready pay stubs automatically. Choose from beautiful layouts that clearly break down earnings, deductions, and tax contributions for your workforce."
 primaryBtn="CHOOSE A TEMPLATE"
 secondaryBtn="SEE LIVE EXAMPLES"
 leftImage={Image1} // Ensure you import your payslip graphic asset
 bgColor="#fff"
 btnClr="#F6850C"
 />

 <Cards
 title="Explore the Invoice benefits"
 cards={CardData}
 cardsBg="#fff4c5"
 />

 <Checklist
 title="More awesome features that make billing and invoicing smooth"
 bgClr="#fff"
 features={[
 "Recurring invoice scheduling",
 "Global tax support",
 // "Automated late fee application",
 "Customizable templates with brand logos",
 "Expense tracking and receipt attachment",
 // "Billable hours tracking integration",
 // "Partial payments and deposit collection",
 // "Real-time invoice status tracking",
 "Automated payment receipt generation",
 "Client-facing self-service portal",
 "Comprehensive cash-flow reports",
 "Secure payment gateway integrations",
 ]}
 />

 <TrialBox
 bgClr="#fff"
 btnClr="#F6850C"
 smallText="Thinking of ways to overcome the headaches of manual billing?"
 title="Think Swordnex Invoicing"
 primaryBtn="SWITCH TO SWORDNEX INVOICING"
 secondaryBtn="REQUEST A DEMO"
 />



 </>
 )
}