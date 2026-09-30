import React from "react";
import Image1 from "./B_Small_B2.png";
import Image2 from "./B_Small_B3.png";
import Image3 from "./B_Small_B4.png";

import CTASection from "../components/CTASection/CTASection";
import Feature5 from "../components/Feature5/Feature5";
import InfoSplit from "../components/InfoSplit/InfoSplit";
import Security from "../components/Security/Security";
import Feature from "../components/Feature/Feature";
import Hero2 from "../components/Hero2/Hero2";

export default function B_Small_B() {

 const Feature5Data = [
 {
 title: "Advanced GST Billing",
 des1: "Generate professional GST invoices instantly",
 des2: "Flexible invoice numbering configuration",
 des3: "Quick POS billing for faster checkout",
 },
 {
 title: "Online Payment Collection",
 des1: "Integrated Razorpay payment gateway",
 des2: "Secure digital payment processing",
 des3: "Instant payment confirmation tracking",
 },
 {
 title: "Smart Inventory Control",
 des1: "Live stock availability monitoring",
 des2: "Automatic barcode creation for products",
 des3: "Product-wise inventory movement history",
 },
 {
 title: "Customer Credit Management",
 des1: "Track pending customer balances easily",
 des2: "Maintain complete due payment records",
 des3: "Monitor credit and return transactions",
 },
 {
 title: "Business Record Management",
 des1: "Store supplier and purchase information",
 des2: "Access billing and return records anytime",
 des3: "Organize customer transaction histories",
 },
 {
 title: "Financial Insights & Reports",
 des1: "Detailed monthly cashbook summaries",
 des2: "Expense breakdown and transaction analysis",
 // des3: "Custom business performance reports",
 }
 ];

 const FeatureData = [
 {
 title: "Smart GST Invoicing",
 description:
 "Generate accurate GST invoices instantly with automatic tax calculations, invoice numbering, and billing management.",
 icon: "fa-solid fa-file-invoice-dollar",
 },
 {
 title: "Integrated Razorpay Payments",
 description:
 "Accept secure online payments directly through Razorpay and simplify customer payment collection with ease.",
 icon: "fa-solid fa-credit-card",
 },
 {
 title: "Inventory & Barcode Management",
 description:
 "Track stock levels in real time and generate automatic barcodes for products to improve billing accuracy.",
 icon: "fa-solid fa-barcode",
 },
 {
 title: "Customer Due & Cashbook Tracking",
 description:
 "Monitor due customers, transaction history, expenses, and complete cash flow records from a single dashboard.",
 icon: "fa-solid fa-wallet",
 },
 ];


 return (
 <>
 <CTASection
 bgClr="#FFF7C5"
 badgeColor="#f4ae520c"
 badgeTextColor="#fff"
 pColor="#454040"
 btnBg="#F4AE52"
 btnTxtColor="#fff"
 hColor="#F4AE52"
 title="Take control of your cash flow with Swordnex Billing"
 description="Automate professional invoice creation, eliminate calculation errors, and get client payments deposited directly into your account on time."
 primaryBtn="Start Free Trial"
 secondaryBtn="Watch Demo"
 />


 <InfoSplit
 image={Image1}
 reverse={true}
 bgColor="#f8c194"
 title="Why businesses choose Swordnex Billing Software"
 description="Manage billing, inventory, GST invoices, customer dues, and financial records from one powerful platform designed for modern businesses."
 points={[
 "Fast GST billing and POS invoicing",
 "Real-time inventory and stock tracking",
 "Automatic barcode generation for products",
 "Cashbook and expense management system",
 ]}
 />


 <Feature5 featureTwo={Feature5Data} bgColor="#FFF7C5" />


 <Feature
 title="Everything required to run error-free business billing"
 features={FeatureData}
 />

 <Hero2
 highLightClr="#F4AE52"
 btnClr="#F4AE52"
 img={Image3} // Ensure you import your final small business billing asset
 before={"The Simplest"}
 highlight={"Billing Software"}
 after={"for Growing Businesses"}
 description={"Ready to accelerate your cash flow? Stop chasing manual calculations and get paid on time with automated professional invoicing and secure online checkouts."}
 primaryBtn={"Start Free Trial"}
 secondaryBtn={"Watch 2-Min Demo"}
 />

 </>
 )
}