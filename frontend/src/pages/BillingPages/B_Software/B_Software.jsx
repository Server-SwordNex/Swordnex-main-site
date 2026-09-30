import React from "react";
import Image1 from "./B_Software.png";

import Hero2 from "../components/Hero2/Hero2";
import Feature4 from "../components/Feature4/Feature4";
import TrialBox from "../components/TrialBox/TrialBox";
import Checklist from "../components/CheckList/CheckList";
import TrialBox3 from "../components/TrialBox3/TrialBox3";
import SecHeader from "../components/SecHeader/SecHeader";

export default function B_Software() {

 const Feature4Data = [
 {
 title: "Multi-Industry POS Billing",
 description:
 "Run retail or service operations seamlessly. Generate GST bills, create invoices instantly, and complete high-speed POS billing.",
 icon: "fa-solid fa-cash-register",
 },
 {
 title: "Smart Inventory & Barcodes",
 description:
 "Automate your stock management system with automatic barcode generation for products to speed up checkouts.",
 icon: "fa-solid fa-barcode",
 },
 {
 title: "Comprehensive Records Hub",
 description:
 "Keep clean data trails for Buy Details, Billing, Credit, GST Invoices, Customers, Returns, and Suppliers in one place.",
 icon: "fa-solid fa-folder-open",
 },
 {
 title: "Cashbook & Expense Breakdown",
 description:
 "Monitor financial transactions with monthly overviews, detailed expense breakdowns, and options to add new tracking features.",
 icon: "fa-solid fa-wallet",
 },
 {
 title: "Due Customer Tracking Ledger",
 description:
 "Monitor balances effortlessly with explicit columns for Customer ID, Name, Phone, Product, Total, Credit, Balance, and Status.",
 icon: "fa-solid fa-users-viewfinder",
 },
 {
 title: "Admin & Subuser Control",
 description:
 "Enforce role-based access. Allow admins to handle secure settings, update invoices numbers, modify profiles, and create subuser accounts.",
 icon: "fa-solid fa-user-gear",
 },
 ];

 return (
 <>
 <SecHeader
 badgeClr="#F4AE52"
 badge="Billing Software"
 title="Automate professional invoicing, payment tracking, and client billing"
 description="Simplify invoice creation, recurring subscription billing, tax itemization, and secure payment collection with Swordnex Billing Software."
 />

 <Feature4
 bgColor="#FFF7C5"
 cardClr="#fff"
 title={"Everything you need to send professional, automated invoices"}
 features={Feature4Data}
 />

 <Hero2
 btnClr="#F4AE52"
 highLightClr="#F4AE52"
 reverse={true}
 img={Image1} // Ensure you import your final billing product graphic
 before={"The Ultimate"}
 highlight={"Billing & Invoicing"}
 after={"Enterprise Solution"}
 description={"Ready to optimize your financial operations? Unify branded invoicing, weekly chart analytics, role-based access, and secure admin controls into a single dashboard today."}
 primaryBtn={"Start Enterprise Trial"}
 secondaryBtn={"Request a Demo"}
 />




 <Checklist
 bgClr="#FFF7C5"
 title="Powerful billing software features for smarter business management"
 features={[
 "GST billing and invoice generation",
 "Fast and accurate POS billing system",
 "Automatic barcode generation for products",
 "Inventory and stock management",
 "Create and manage professional invoices",
 "Customer and supplier record management",
 "Track credit sales and due customers",
 "Cashbook with transaction history",
 "Monthly financial overview and expense breakdown",
 "Dynamic business and sales reports",
 "Returns and purchase management",
 "Role-based access for admins and subusers",
 ]}
 />

 <TrialBox3
 tag="Swordnex Billing"
 title="Accelerate your revenue cycles with automated billing"
 description="Manage professional invoicing, recurring subscriptions, client payment gateways, localized tax calculations, estimates, and financial cash flow reports from a single cloud platform."
 primaryBtn="START FREE TRIAL"
 secondaryBtn="BOOK LIVE DEMO"
 stats={[
 {
 number: "14 Days",
 label: "Average reduction in accounts receivable aging",
 },
 {
 number: "2.5x",
 label: "Faster client payment collection velocity",
 },
 {
 number: "100%",
 label: "Automated invoice calculation accuracy",
 },
 {
 number: "5 mins",
 label: "Average time to configure your first automated invoice",
 },

 ]}
 />



 </>
 )
}