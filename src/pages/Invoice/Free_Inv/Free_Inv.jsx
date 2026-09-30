import React from "react";
import Image1 from "./Free_Inv.png";
import Hero3 from "../Components/Hero3/Hero3";
import Box2 from "../Components/Box2/Box2";

export default function Free_Inv() {

 const supportOptions = [
 {
 icon: "fa-solid fa-book-open",
 title: "Invoice Knowledge Base",
 description:
 "Access detailed guides on invoice creation, GST billing, customer management, and payment tracking.",
 },
 {
 icon: "fa-solid fa-graduation-cap",
 title: "Billing Training Center",
 description:
 "Learn how to create professional invoices, manage records, and streamline your billing workflow.",
 },
 {
 icon: "fa-solid fa-headset",
 title: "Dedicated Support",
 description:
 "Get assistance with invoicing, GST calculations, billing questions, and account configuration.",
 },
 {
 icon: "fa-solid fa-user-gear",
 title: "Setup Assistance",
 description:
 "Receive guidance on configuring business details, invoice numbering, products, and customer records.",
 },
 ];

 return (
 <>
 <Hero3
 title="SwordNex Free Invoice Generator"
 heading="Create professional GST-ready invoices for free in minutes."
 description="Generate accurate invoices, add customer details, include products and services, calculate taxes automatically, and download professional invoice documents without any complexity."
 primaryBtn="CREATE FREE INVOICE"
 secondaryBtn="VIEW SAMPLE INVOICES"
 leftImage={Image1}
 bgColor="#fff"
 btnClr="#F6850C"
 />

 {/* <Header3
 tag="Free Invoice Generator"
 title="Create professional invoices and manage billing with ease"
 description="Generate GST-ready invoices, maintain customer records, track payments, and streamline your billing process with a simple and efficient invoice management platform."
 primaryBtn="CREATE FREE INVOICE"
 secondaryBtn="WATCH DEMO"
 cardColor="#F6850C"
 btnColor="#F6850C"
 badgeBg="#FFF4E5"

 leftCard={{
 icon: "fa-solid fa-file-invoice-dollar",
 title: "Everything you need to create invoices faster",
 description:
 "Manage invoices, customers, products, taxes, and payment records from a centralized billing dashboard designed for growing businesses.",
 stats: [
 {
 value: "100%",
 label: "GST-ready invoice generation",
 },
 {
 value: "24/7",
 label: "Access to billing records",
 },
 {
 value: "1",
 label: "Platform for billing & invoicing",
 },
 {
 value: "∞",
 label: "Invoices for businesses of any size",
 },
 ],
 }}

 rightCards={[
 {
 icon: "fa-solid fa-file-circle-plus",
 title: "Instant Invoice Creation",
 description:
 "Generate professional invoices within minutes using a simple workflow.",
 },
 {
 icon: "fa-solid fa-receipt",
 title: "GST Tax Calculation",
 description:
 "Automatically calculate taxes and create GST-compliant invoices.",
 },
 {
 icon: "fa-solid fa-users",
 title: "Customer Management",
 description:
 "Store customer information and maintain complete billing histories.",
 },
 {
 icon: "fa-solid fa-chart-line",
 title: "Payment Tracking",
 description:
 "Monitor paid, pending, and overdue invoices from a single dashboard.",
 },
 ]}
 /> */}

 <Box2
 badge="Invoice Support"
 cardBg="#FFF4E5"
 badgeBg="#FFF4E5"
 badgeTxtClr="#F6850C"
 btnClr="#F6850C"
 iconBg="#FF9D23"
 title="Support That Helps You Create Invoices With Confidence"
 description="Whether you're creating your first invoice, managing customer billing records, understanding GST requirements, or tracking payments, our team is available to provide guidance, resources, and assistance whenever you need help."
 primaryBtn="Contact Support"
 secondaryBtn="Browse Resources"
 options={supportOptions}
 />

 </>
 )
}