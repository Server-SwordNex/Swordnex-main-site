import React from "react";

import Image from "./img.jpg";
import Image2 from "./PayrollW.png";
import Image3 from "./Img2.png";

import SecHeader from "../components/SecHeader/SecHeader";
import FeatureGrid from "../components/FeatureGrid/FeatureGrid";
import InfoSplit from "../components/InfoSplit/InfoSplit";
import Hero from "../components/Hero/Hero";
import CTASection from "../components/CTASection/CTASection";
import Feature from "../components/Feature/Feature";
import FeatureTwo from "../components/FeatureTwo/FeatureTwo";
import HeroTwo from "../components/HeroTwo/HeroTwo";
import Security from "../components/Security/Security";
import Steps from "../components/StepsSection/Steps";
import TrialBoxTwo from "../components/TrialBoxTwo/TrialBoxTwo";
// import BenefitsCard from "../../components/BFCards/BenefitsCard";

export default function PRSoftware() {

 const features = [
 {
 title: "Automated Salary Processing",
 description:
 "Generate salaries, deductions, bonuses, and reimbursements automatically.",
 icon: "fa-solid fa-money-check-dollar",
 },
 {
 title: "Tax & Compliance",
 description:
 "Manage PF, ESI, PT, TDS, and statutory filings with ease.",
 icon: "fa-solid fa-percent"
 },
 {
 title: "Payslip Generation",
 description:
 "Generate professional employee payslips instantly.",
 icon: "fa-solid fa-receipt"
 },
 {
 title: "Bank Transfers",
 description:
 "Transfer salaries directly to employee bank accounts.",
 icon: "fa-solid fa-money-bill-transfer"
 },
 ];

 const featureTwo = [
 {
 title: "Salary Architecture",
 des1: "Configure base structures",
 des2: "Set variable components",
 des3: "Handle bonus multipliers",
 },
 {
 title: "Deductions & Compliance",
 des1: "Automated tax withholdings",
 des2: "Statutory contribution math",
 des3: "Local legal rule updates",
 },
 {
 title: "Payout Execution",
 des1: "One-click bank deposits",
 des2: "Instant payslip distribution",
 des3: "Real-time transfer audits",
 }
 ];


 const Features = [
 {
 title: "Automated Gross-to-Net",
 description:
 "Calculate base earnings, shift allowances, complex bonuses, and deduction variables completely error-free.",
 icon: "fa-solid fa-calculator",
 },
 {
 title: "Statutory Tax Filing",
 description:
 "Automate calculations for provincial, federal, and regional tax brackets with built-in legal compliance updates.",
 icon: "fa-solid fa-scale-balanced",
 },
 {
 title: "Direct Gateway Transfers",
 description:
 "Connect directly to commercial banking rails to process secure employee direct deposits simultaneously.",
 icon: "fa-solid fa-building-columns",
 },
 {
 title: "Self-Service Payslips",
 description:
 "Empower workers with an encrypted hub to independently download itemized digital pay stub archives.",
 icon: "fa-solid fa-file-invoice-dollar",
 },
 ];


 return (
 <>

 <SecHeader
 badge="Payroll Software"
 badgeClr="#ff3b3b"
 title="Modern payroll management for growing businesses"
 description="Simplify payroll processing, tax calculations, attendance tracking, and salary distribution with Swordnex Payroll Software."
 />

 {/* <FeatureGrid
 title="Core Payroll Features"
 features={features}
 /> */}

 <Hero
 title="Swordnex Payroll Engine"
 heading="The modern standard for running accurate business payroll."
 description="Take complete control of your company finances. Automate complex salary computations, maintain pristine regulatory tax compliance, and distribute instant bank transfers without spreadsheets."
 primaryBtn="EXPLORE FEATURES"
 secondaryBtn="BOOK LIVE DEMO"
 leftImage={Image2} // Ensure you import your main product dashboard asset
 />


 <Feature
 title={"Everything required to run error free business payroll "}
 features={Features}
 />

 <FeatureTwo featureTwo={featureTwo} />

 <TrialBoxTwo
 title="Ready to simplify your payroll operations?"
 description="Automate payroll processing, employee management, compliance, attendance, and salary workflows with Swordnex Payroll."
 primaryBtn="START FREE TRIAL"
 secondaryBtn="REQUEST A DEMO"
 />

 {/* <HeroTwo
 img={Image2}
 before={"Smart"}
 highlight={"Job Sheet"}
 after={"Management System"}
 description={"Create, assign, track and convert job sheets into invoices — all in one powerful platform."}
 primaryBtn={"Get Started now"}
 secondaryBtn={"Watch Demo"}
 /> */}

 {/* <InfoSplit
 image={Image3}
 title="Why businesses choose Swordnex Payroll"
 description="Reduce manual work, eliminate spreadsheet errors, and automate employee salary management with a centralized payroll platform."
 points={[
 "Automated payroll cycles",
 "Cloud-based employee access",
 "Real-time reports",
 "Statutory compliance management",
 ]}
 /> */}

 {/* <CTASection
 title="Simplify payroll and HR management with Swordnex"
 description="Automate employee payroll, attendance, leave tracking, compliance, and salary processing from one platform."
 primaryBtn="Start Free Trial"
 secondaryBtn="Book Demo"
 />

 <Security
 reverse={true}
 badge="Security and privacy at Swordnex"
 title="Over 100 million users trust Swordnex to run their business."
 image={Image2}
 features={features}
 /> */}

 {/* <Steps
 reverse={true}
 title="Swordnex Payroll helps you process payroll with no compromises"
 steps={features}
 /> */}


 </>
 );
}