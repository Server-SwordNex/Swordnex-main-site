import React from "react";
import Image1 from "./reports.svg";
import Image2 from "./better.svg";
import CTASection from "../Components/CTASection/CTASection";
import Feature from "../Components/Feature/Feature";
import InfoSplit from "../Components/InfoSplit/InfoSplit";
import TrialBox3 from "../Components/TrialBox3/TrialBox3";
import Feature5 from "../Components/Feature5/Feature5";
import Hero2 from "../Components/Hero2/Hero2";

export default function Inv_Reports() {

 const FeaturesData = [
 {
 title: "Real-Time Revenue Dashboards",
 description:
 "Ditch delayed spreadsheets. Monitor incoming revenue, pending payments, and overall cash flow dynamically.",
 icon: "fa-solid fa-chart-line",
 },
 // {
 // title: "Automated Tax Reporting",
 // description:
 // "Stay audit-ready. Automatically compile federal, state, and local sales taxes collected across all invoices.",
 // icon: "fa-solid fa-calculator",
 // },
 {
 title: "Weekly Analytics Charts",
 description:
 "Visualize your growth instantly. Track the exact number of invoices created per week on a dynamic visual chart.",
 icon: "fa-solid fa-chart-bar",
 },
 {
 title: "Branded & Signed Invoices",
 description:
 "Build client trust. Seamlessly attach your official company logo and display your custom signature right on the invoice.",
 icon: "fa-solid fa-file-signature",
 },
 {
 title: "Client Portal & Support",
 description:
 "Reduce support requests. Let clients log in to view payment histories, download receipts, and access support facilities.",
 icon: "fa-solid fa-headset",
 },
 ];

 const PayrollFeatures = [
 {
 title: "Sales Performance Reports",
 des1: "Daily, weekly, and monthly sales summaries",
 des2: "Revenue trend analysis",
 des3: "Top-selling products tracking",
 },
 {
 title: "GST & Tax Reports",
 des1: "GST invoice summaries",
 des2: "Tax collection breakdowns",
 des3: "Compliance-ready reporting",
 },
 {
 title: "Customer Analytics",
 des1: "Customer purchase histories",
 des2: "Due customer tracking",
 des3: "Repeat customer insights",
 },
 {
 title: "Inventory Reports",
 des1: "Stock movement monitoring",
 des2: "Low-stock alerts",
 des3: "Product performance analysis",
 },
 {
 title: "Cashbook Insights",
 des1: "Transaction history tracking",
 des2: "Expense categorization",
 des3: "Monthly cash flow overview",
 },
 {
 title: "Business Intelligence Dashboard",
 des1: "Real-time performance metrics",
 des2: "Revenue and profit visibility",
 des3: "Actionable business insights",
 }
 ];


 return (
 <>
 <CTASection
 bgClr="#fff"
 hColor="#583510"
 pColor="#755736"
 badgeColor="#fdf5ea"
 btnBg="#F6850C"
 btnTxtColor="#fff"
 title="Master your cash flow with advanced invoicing insights"
 description="Track real-time revenue, analyze payment trends, monitor outstanding balances, and generate instant financial reports from one intelligent dashboard."
 primaryBtn="Start Free Trial"
 secondaryBtn="Book Demo"
 />

 <Feature
 title={"Everything required to gain deep financial visibility"}
 features={FeaturesData}
 />

 <InfoSplit
 bgColor="#FFF7C5"
 image={Image1}
 title="Why businesses rely on Swordnex Reports & Analytics"
 description="Transform raw billing, inventory, customer, and transaction data into meaningful insights that help you track performance, identify trends, and make informed business decisions with confidence."
 points={[
 "Real-time business performance tracking",
 "Comprehensive sales & revenue insights",
 "Detailed GST & financial reporting",
 "Actionable data for smarter decision-making",
 ]}
 />

 <Feature5
 title="Reports & Analytics Features"
 description="Monitor business performance, track sales trends, and analyze customer activity."
 featureTwo={PayrollFeatures}
 />

 {/* <TrialBox3
 tag="Swordnex Invoicing"
 title="Gain complete financial visibility with visual invoice analytics"
 description="Track invoice creation volumes, monitor weekly billing trends, protect sequencing with admin-only controls, and manage subuser access from a secure analytics dashboard."
 primaryBtn="START FREE TRIAL"
 secondaryBtn="BOOK LIVE DEMO"
 stats={[
 {
 number: "100%",
 label: "Visual tracking with weekly invoice volume charts",
 },
 {
 number: "Admin",
 label: "Exclusive control over secure invoice number editing",
 },
 {
 number: "Logs",
 label: "Admin-only visibility into subuser activity tracking",
 },
 {
 number: "Secure",
 label: "Role-based access and custom signature protection",
 },
 ]}
 /> */}

 <Hero2
 img={Image2}
 before={"Transform Your"}
 highlight={"Business Reports"}
 after={"Into Better Decisions"}
 description={"Track sales, monitor revenue, analyze customer trends, manage inventory performance, and gain real-time business insights with powerful reporting and analytics tools."}
 primaryBtn={"Start Free Trial"}
 secondaryBtn={"Book Demo"}
 />


 </>
 )
}