import React from 'react';
import Image1 from "./FeaturesSection.png";
import TrialBox4 from '../components/TrialBox4/TrialBox4';
import Cards from "../components/Cards/Cards";
import HeroTwo from "../components/HeroTwo/HeroTwo";
import Checklist from "../components/CheckList/CheckList";
import TrialBox from "../components/TrialBox/TrialBox";

export default function Features() {

 const CardsData = [
 {
 title: "Formula-Based Salary Structures",
 description:
 "Configure custom earnings, deductions, allowances, and salary components to match your payroll policies.",
 icon: "fa-solid fa-calculator",
 },
 {
 title: "Statutory Compliance",
 description:
 "Manage PF, ESI, PT, TDS, and other statutory deductions with accurate payroll calculations.",
 icon: "fa-solid fa-scale-balanced",
 },
 {
 title: "Payslip Generation",
 description:
 "Generate detailed employee payslips with complete salary, deduction, and tax information.",
 icon: "fa-solid fa-file-invoice-dollar",
 },
 {
 title: "Payroll Reports",
 description:
 "Access payroll, deduction, statutory, and employee reports to improve visibility and simplify audits.",
 icon: "fa-solid fa-chart-column",
 },
 {
 title: "Reimbursements & Claims",
 description:
 "Manage employee reimbursement requests efficiently and include approved claims in payroll processing.",
 icon: "fa-solid fa-money-bill-transfer",
 },
 {
 title: "Employee Self-Service",
 description:
 "Allow employees to download payslips, submit IT declarations, and access payroll information online.",
 icon: "fa-solid fa-user-tie",
 },
 ];

 return (
 <>
 <TrialBox4
 smallTitleClr='#ff3b3b'
 smallTitle="SwordNex Payroll"
 btnClr='#ff3b3b'
 title="Modern payroll software built for growing businesses"
 description="Automate salary processing, generate payslips, manage statutory compliance, track attendance, and simplify payroll operations from a single platform."
 features={[
 "Automated payroll calculations",
 "PF, ESI, PT & TDS compliance",
 "Employee self-service portal",
 ]}
 primaryBtn="START FREE TRIAL"
 secondaryBtn="REQUEST DEMO"
 image={Image1}
 />

 <Cards
 bgClr="#ffefef"
 title="Powerful payroll features for modern businesses"
 cards={CardsData}
 />

 <HeroTwo
 reverse={true}
 img={Image1}
 before={"Built for"}
 highlight={"Accurate Payroll"}
 highLightClr='#ff7474'
 btnClr="#ff3b3b"
 after={"and Compliance"}
 description={"From salary calculations and statutory deductions to payslip generation and payroll reporting, SwordNex Payroll provides the tools businesses need to process payroll with confidence."}
 primaryBtn={"Start Free Trial"}
 secondaryBtn={"Request Demo"}
 />

 <Checklist
 title="More features to simplify payroll management"
 bgClr='#ffefef'
 features={[
 "Automated salary calculations",
 "Formula-based earnings and deductions",
 "PF, ESI, PT, and TDS compliance",
 "Professional payslip generation",
 "Attendance-integrated payroll processing",
 "Employee self-service portal access",
 "Reimbursement and claim management",
 "Detailed payroll and statutory reports",
 ]}
 />

 <TrialBox
 smallText="Discover everything SwordNex Payroll can do"
 title="Simplify salary processing, compliance, and employee payroll management"
 primaryBtn="EXPLORE PAYROLL"
 secondaryBtn="REQUEST A DEMO"
 />

 </>
 )
}