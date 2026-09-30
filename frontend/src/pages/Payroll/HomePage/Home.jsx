import React from "react";

import Features2Img from "./Images/Features.png";
import AnywhereImg from "./Images/Anywhere.png";
import InstantImg from "./Images/Instant.png";
import DigitalImg from "./Images/Digital.png";
import CommunicationImg from "./Images/Communication.png";
import PersonalizeImg from "./Images/Personalize.png";
import PaymentImg from "./Images/Payment.png";
import ManagementImg from "./Images/Management.png";
import MultiLevelImg from "./Images/MultiLevel.png";
import AnalyticsImg from "./Images/Analytics.png";

import Hero from "./Hero/Hero";
import Features from "./Features/Features";
import Benefits from "./Benefits/Benefits";
import CTA from "./CTA/CTA";
import EmpTab from "./EmpTab/EmpTab";
import Features2 from "./Features2/Features2";
import Features3 from "./Features3/Features3";
import SecHeader from "../components/SecHeader/SecHeader";
import CTASection from "../components/CTASection/CTASection";

export default function Home() {

 const Feature2Data = [
 {
 icon: "fa-solid fa-calculator",
 title: "Formula-Based Earnings",
 description:
 "Configure flexible salary structures with custom formulas for accurate payroll processing.",
 },
 {
 icon: "fa-solid fa-user-shield",
 title: "Employee Self-Service",
 description:
 "Allow employees to download payslips, submit declarations, claim reimbursements, and update information.",
 },
 {
 icon: "fa-solid fa-calendar-check",
 title: "Attendance & Leave Management",
 description:
 "Automatically calculate salaries using attendance, leave, and loss-of-pay records.",
 },
 {
 icon: "fa-solid fa-money-bill-transfer",
 title: "Off-Cycle Pay Runs",
 description:
 "Run special payrolls for bonuses, incentives, arrears, and salary adjustments anytime.",
 },
 {
 icon: "fa-solid fa-chart-line",
 title: "20+ Payroll Reports",
 description:
 "Access payroll, statutory, deduction, and employee reports to stay audit-ready at all times.",
 },
 ];

 return (
 <div style={{ fontFamily: "DM Sans", textAlign: "left" }}>

 <CTASection
 hColor="#d12222"
 pColor="#da5a5a"
 btnColor="#f8f8f8"
 btnBg="#ff3b3b"
 badgeColor="#ffc3c349"
 bgClr="#ffefef"
 title="Simplify payroll and HR management with Swordnex"
 description="Automate employee payroll, attendance, leave tracking, compliance, and salary processing from one platform."
 primaryBtn="Start Free Trial"
 secondaryBtn="Book Demo"
 />
 <Hero />
 <Features />

 <Features2
 title="Advanced Features"
 subtitle="Powerfully engineered to back your unique processes"
 illustration={Features2Img}
 bgColor="#ffefef"
 features={Feature2Data}
 />

 <EmpTab
 // bgClr="#ffefef"
 tag="EMPLOYEE SELF-SERVICE PORTAL"
 title="Give your team a modern payroll experience"
 tabs={[
 {
 tab: "Employee Self-Service",
 heading: "Empower employees with ESS",
 description:
 "Allow employees to download payslips, submit IT declarations, claim reimbursements, and manage payroll-related requests.",
 image: AnywhereImg,
 bgColor: "#ffc2c2",
 },
 {
 tab: "Payroll Processing",
 heading: "Automate salary calculations",
 description:
 "Process payroll accurately with automated earnings, deductions, taxes, and statutory compliance calculations.",
 image: InstantImg,
 bgColor: "#ffc2c2",
 },
 {
 tab: "Attendance Integration",
 heading: "Connect attendance with payroll",
 description:
 "Calculate salaries based on attendance, leave records, and loss-of-pay entries without manual intervention.",
 image: DigitalImg,
 bgColor: "#ffc2c2",
 },
 {
 tab: "Reports & Compliance",
 heading: "Stay audit-ready always",
 description:
 "Generate payroll, deduction, statutory, and employee reports to simplify compliance and audits.",
 image: CommunicationImg,
 // bgColor: "#F6C544",
 bgColor: "#ffc2c2",
 },
 ]}
 />

 <Features3
 title="Effortless Payroll"
 subtitle="Software that makes payroll processing simple and enjoyable"
 features={[
 {
 title: "Personalize Salary Components",
 description: "Create unlimited earnings and deductions.",
 image: PersonalizeImg,
 bgColor: "#f3dfb6",
 layout: "largeLeft",
 },

 {
 title: "Deliver Salaries Online",
 description: "Transfer salaries directly through banks.",
 image: PaymentImg,
 bgColor: "#e0e0d7",
 layout: "largeRight",
 },

 {
 title: "Contractor Management",
 description: "Manage contractors and employees together.",
 image: ManagementImg,
 bgColor: "#F5F5F2",
 layout: "full",
 },

 {
 title: "Multi Level Approvals",
 description: "Approve payroll with complete control.",
 image: MultiLevelImg,
 bgColor: "#b0efff",
 layout: "wideLeft",
 },

 {
 title: "Reports & Analytics",
 description: "Generate payroll reports instantly.",
 image: AnalyticsImg,
 bgColor: "#ff765e",
 textColor: "#fff",
 layout: "wideRight",
 },
 ]}
 />

 <Benefits />

 <CTA bgClr="#ffefef" />

 </div>
 )
}