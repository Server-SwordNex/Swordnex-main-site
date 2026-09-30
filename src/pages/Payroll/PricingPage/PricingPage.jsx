import React from "react";
import SecHeader from "../components/SecHeader/SecHeader";
import Pricing2 from "../../BillingPages/Components/Pricing2/Pricing2";
import CTA2 from "../../BillingPages/Components/CTA2/CTA2";

export default function PricingPage() {

 const yearlyPlans = [
 {
 name: "STANDARD",
 oldPrice: "4499",
 price: "3499",
 billingText: "Billed annually",
 description:
 "Best suited for businesses with one time billing requirements",

 buttonText: "Start your Billing",
 buttonLink: "https://billing.swordnex.com/signup",

 features: [
 "All Basic Features",
 "POS Billing",
 "Inventory Management",
 "Business Analytics",
 "Advanced Reports",
 "Priority Support",
 "Data Export",
 ],
 },

 {
 name: "PREMIUM",
 oldPrice: "4999",
 price: "3999",
 billingText: "Billed annually",
 featured: true,

 description:
 "Best suited for businesses with one time and subscription billing requirements",

 buttonText: "Start your Billing",
 buttonLink: "https://billing.swordnex.com/signup",

 includesText:
 "Includes everything in Standard +",

 features: [
 "Track financial transactions",
 "Generate GST Invoice",
 "Manage Due Customers",
 "24/7 Phone Support",
 "Custom Training",
 ],
 },

 {
 name: "CUSTOM",

 description:
 "Best suited for enterprises with advanced billing requirements",

 buttonText: "Get in Touch",
 buttonLink: "/products/billing/support",

 includesText:
 "Includes everything in Premium +",

 features: [
 "Advanced Billing Capabilities",
 "Cohort Analytics",
 "Revenue Recognition",
 "Scheduled Cancellations",
 "Advanced BI Dashboards",
 "Dedicated Account Manager",
 "Personalized Onboarding",
 ],
 },
 ];

 return (
 <>

 <SecHeader
 badge="Pricing Plans"
 title="Simple, Transparent Pricing for Growing Businesses"
 description="Choose the perfect plan for your business. Scale your billing, tax calculations, and invoice management with zero hidden fees."
 bgColor="#fff"
 badgeClr="#D97A2B"
 badgeBg="#f8f1f1"
 />

 <Pricing2
 yearlyPlans={yearlyPlans}
 threeYearPlans={yearlyPlans}
 />
 
 <CTA2
 bgClr="#f8fafc"
 btnClr="#D97A2B"
 title="Ready to transform your billing operations?"
 subtitle="Generate GST-ready invoices, automate tax calculations, track payments, and maintain accurate records from a single platform."
 primaryText="Start Free Trial"
 primaryLink="/billing/signup"
 secondaryText="Contact Sales"
 secondaryLink="/billing/contact"
 />

 </>
 )
}