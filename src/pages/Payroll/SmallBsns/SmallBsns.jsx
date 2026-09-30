import React from "react";
import Image1 from "./SmallBS.png";
import CTASection from "../components/CTASection/CTASection";
import Feature from "../components/Feature/Feature";
import Steps from "../components/StepsSection/Steps";
import HeroTwo from "../components/HeroTwo/HeroTwo";
import Cards from "../components/Cards/Cards";
import Checklist from "../components/CheckList/CheckList";
import TrialBox from "../components/TrialBox/TrialBox";



export default function SmallBsns() {

 const Features = [
 {
 title: "Simplified Payroll Management",
 description:
 "Manage employee salaries, reimbursements, deductions, and payroll records from a single platform.",
 icon: "fa-solid fa-paper-plane",
 },
 {
 title: "Auto Tax Calculations",
 description:
 "Stay completely legal. Automatically calculate federal, state, and local payroll taxes instantly.",
 icon: "fa-solid fa-scale-balanced",
 },
 {
 title: "Quick Payroll Processing",
 description:
 "Run payroll efficiently with automated salary calculations, deductions, and statutory compliance.",
 icon: "fa-solid fa-paper-plane",
 },
 {
 title: "Self-Service Portal",
 description:
 "Save administrative hours. Let employees log in to securely download their own histories and payslips.",
 icon: "fa-solid fa-user-lock"
 },
 ];

 const StepsFeatures = [
 {
 title: "Setup in Minutes",
 description:
 "Add your team members, enter pay rates, and connect your company bank account with a simple setup wizard.",
 icon: "fa-solid fa-user-plus",
 },
 {
 title: "Review & Approve",
 description:
 "Preview automated calculations for gross pay, net pay, and local tax deductions instantly on a clear screen.",
 icon: "fa-solid fa-file-shield",
 },
 {
 title: "Pay Your Team",
 description:
 "Click one button to trigger secure direct bank deposits and distribute professional digital payslips automatically.",
 icon: "fa-solid fa-circle-check",
 },
 ];



 return (
 <>
 <CTASection
 title="Scale your business, not your payroll spreadsheet"
 description="Automate manual salary calculations, handle local tax compliance, and send direct deposits easily—built specifically for growing small business teams."
 primaryBtn="Start Free Trial"
 secondaryBtn="Talk to an Expert"
 bgClr="#ff3b3b"
 />

 <Steps
 title="Run small business payroll accurately in three simple steps"
 steps={StepsFeatures}
 />

 <Feature
 title={"Built for Small Business"}
 features={Features}
 />

 <HeroTwo
 img={Image1} // Ensure you import your final dashboard mockup asset
 highLightClr="#ff3b3bbb"
 btnClr="#ff3b3b"
 before={"The Easiest"}
 highlight={"Payroll Software"}
 after={"for Small Businesses"}
 description={"Take control of your company financial operations today. Automate employee wages, calculate complex local taxes, and send direct deposits with confidence."}
 primaryBtn={"Start Your Free Trial"}
 secondaryBtn={"Book a 1-on-1 Demo"}
 />

 </>
 )
}