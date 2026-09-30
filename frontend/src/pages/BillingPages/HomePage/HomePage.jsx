import React from "react";
import ScrollImg from "./Describe.png";
import ClientImg from "./ClientDashboard.svg";
import PayImg from "./OnlinePay.svg";
import DueImg from "./TrackDue.svg";
import BillImg from "./Bill.svg";
import ManageImg from "./manage.svg";
import BarcodeImg from "./home.svg";
import MultiuserImg from "./discuss2.svg";
import RecordsImg from "./database.svg";

import Hero from "../Components/Hero/Hero";
import CTA from "../Components/CTA/CTA";
import ScrollFeatures from "../Components/ScrollFeatures/ScrollFeatures";
import Feature from "../Components/Feature/Feature";
import Feature2 from "../Components/Feature2/Feature2";
import Feature3 from "../Components/Feature3/Feature3";

export default function HomePage() {

 const ScrollFeaturesData = [
 {
 icon: "fa-solid fa-file-invoice-dollar",
 title: "Automated Invoicing",
 description:
 "Generate and send professional, branded invoices automatically based on scheduled dates or milestones.",
 },
 {
 icon: "fa-solid fa-arrows-rotate",
 title: "Subscription & Recurring Billing",
 description:
 "Effortlessly manage weekly, monthly, or custom recurring payment cycles with automated dunning management.",
 },
 {
 icon: "fa-solid fa-scale-balanced",
 title: "Tax & Compliance Engine",
 description:
 "Automatically calculate local taxes, GST, VAT, and sales tax based on client location to stay fully audit-ready.",
 },
 {
 icon: "fa-solid fa-credit-card",
 title: "Multi-Gateway Payments",
 description:
 "Accept instant payments globally via integrated gateways supporting credit cards, UPI, net banking, and wallets.",
 },
 {
 icon: "fa-solid fa-magnifying-glass-chart",
 title: "Revenue Analytics & Reports",
 description:
 "Track critical financial metrics like MRR, ARR, outstanding aging balances, and churn rates in real-time.",
 },
 ];

 const FeatureData = [
 {
 title: "GST Ready Billing",
 description:
 "Generate professional GST invoices with automated tax calculations and customizable invoice numbering.",
 icon: "fa-solid fa-file-invoice",
 },
 {
 title: "Real-Time Inventory Tracking",
 description:
 "Monitor stock availability, product movement, and inventory levels to keep your business running smoothly.",
 icon: "fa-solid fa-boxes-stacked",
 },
 {
 title: "Credit & Due Management",
 description:
 "Track customer credits, outstanding balances, payment status, and overdue invoices from one place.",
 icon: "fa-solid fa-hand-holding-dollar",
 },
 {
 title: "Business Financial Control",
 description:
 "Manage cashbook transactions, expense records, and monthly financial summaries with complete visibility.",
 icon: "fa-solid fa-chart-line",
 },
 ];

 const Feature2Data = [
 {
 tab: "Inventory Management",
 heading: "Keep Complete Control of Your Products and Stock",
 description:
 "Monitor inventory levels, manage product catalogs, and track stock movement in real time. Stay informed about product availability and reduce inventory management complexity.",
 image: ManageImg,
 points: [
 "Live stock tracking",
 "Product management",
 "Inventory visibility",
 ],
 },
 {
 tab: "GST Billing",
 heading: "Create Professional GST Invoices in Minutes",
 description:
 "Generate GST-compliant invoices with automatic tax calculations, customizable invoice numbering, and a streamlined billing workflow designed for businesses of all sizes.",
 image: BillImg,
 points: [
 "GST invoice generation",
 "Automatic tax calculation",
 "Custom invoice numbering",
 ],
 },
 {
 tab: "Customer Dues",
 heading: "Track Outstanding Payments and Customer Credits Easily",
 description:
 "Manage credit sales, monitor pending balances, and maintain complete due customer records. Get a clear view of payment status and customer account activity at any time.",
 image: DueImg,
 points: [
 "Outstanding balance tracking",
 "Credit customer management",
 "Payment status monitoring",
 ],
 },
 {
 tab: "Online Payments",
 heading: "Collect Payments Securely Through Razorpay Integration",
 description:
 "Accept online payments through Razorpay and simplify collections with a secure payment experience. Track payment status and streamline your billing process from invoice to payment.",
 image: PayImg,
 points: [
 "Razorpay integration",
 "Secure transactions",
 "Payment tracking",
 ],
 },
 ];

 const Feature3Data = [
 {
 title: "Barcode Generation",
 description: "Automatically generate and assign unique product barcodes to eliminate manual data entry errors, simplify your real-time inventory tracking, and billing operations.",
 image: BarcodeImg,
 },

 {
 title: "Customer & Supplier Records",
 description:
 "Maintain organized customer, supplier, purchase, return, and billing information from a centralized platform.",

 image: RecordsImg,
 },

 {
 title: "Multi-User Management",
 description:
 "Enable collaboration with admin and subuser accounts while maintaining secure role-based access controls.",

 image: MultiuserImg,
 },
 ];

 return (
 <div style={{ textAlign: "left" }}>
 <Hero
 bgColor="#FFF7C5"
 badgeClr="#F4AE52"
 highlightClr="#F59E0B"
 btnClr="#F59E0B"
 />

 <Feature
 title={"Everything required to simplify billing and business management"}
 features={FeatureData}
 />

 <ScrollFeatures
 reverse={true}
 title="Advanced Billing Capabilities"
 subtitle="Powerfully engineered to accelerate your revenue collections"
 illustration={ScrollImg}
 bgColor="#FFF7C5"
 features={ScrollFeaturesData}
 />

 <Feature2
 bgColor="#FFE97D"
 title="Designed For Growth"
 subtitle="Billing, Your Way"
 features={Feature2Data}
 />

 <Feature3
 title="Elevate Your Brand With"
 highlight="Customer-First Experiences"
 description="From white-labeled billing portals to flexible pricing and effortless checkouts, deliver professional experiences that drive retention and keep customers coming back."
 features={Feature3Data}
 hTextClr="#080808"
 pColor="#857878"
 bgColor="#FFF7C5"
 highlightClr="#F48F68"
 />

 <CTA
 description="Empower your business with enterprise-grade billing automation. Get started in under 5 minutes and see the difference."
 />
 </div>
 )
} 