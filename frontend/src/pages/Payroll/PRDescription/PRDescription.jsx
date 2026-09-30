import React from "react";
import Image1 from "./Smart.png";
import Image2 from "./PayrollW.png";
import SecHeader from "../components/SecHeader/SecHeader";
import FeatureTwo from "../components/FeatureTwo/FeatureTwo";
import HeroTwo from "../components/HeroTwo/HeroTwo";
import InfoSplit from "../components/InfoSplit/InfoSplit";

export default function PRDescription() {

 const PayrollFeatures = [
 {
 title: "Automated Salary Processing",
 des1: "One-click direct deposits",
 des2: "Automated gross-to-net math",
 des3: "Custom recurring cycles",
 },
 {
 title: "Payslip Generation",
 des1: "Instant PDF pay stubs",
 des2: "Itemized tax breakdowns",
 des3: "Automated email delivery",
 },
 {
 title: "Bank Transfers",
 des1: "Direct bank gateway routing",
 des2: "Bulk ACH & wire files",
 des3: "Real-time transfer tracking",
 },
 {
 title: "Tax & Compliance Management",
 des1: "Automatic local tax calculations",
 des2: "Statutory filings preparation",
 des3: "Year-end tax form generation",
 },
 {
 title: "Employee Self-Service",
 des1: "Secure portal for history tracking",
 des2: "On-demand document downloads",
 des3: "Profile and bank detail updates",
 },
 {
 title: "Time & Attendance Sync",
 des1: "Direct shift and hour integration",
 des2: "Overtime multiplier processing",
 des3: "Automated unpaid leave cuts",
 }
 ];



 return (
 <>
 <SecHeader
 badge="Payroll Software"
 badgeClr="#ff3b3b"
 title="Manage employee compensation, taxes, and automatic salary payouts"
 description="Payroll is the process of compensating employees for their work. It involves calculating salaries, wages, deductions, and taxes to ensure employees are paid accurately and on time."
 />

 <FeatureTwo featureTwo={PayrollFeatures} />

 <InfoSplit
 reverse={true}
 bgColor="#ff8282"
 image={Image2} // Ensure you import your payroll overview asset
 title="Master your workforce distribution with Swordnex Payroll"
 description="Understand the absolute core of payroll: transforming raw employee tracking, hours worked, and local legal regulations into direct deposits smoothly."
 points={[
 "End-to-end processing pipelines",
 "Error-free calculation engines",
 "Unified compliance integrations",
 "Instant employee financial visibility",
 ]}
 />


 <HeroTwo
 reverse={true}
 img={Image1} // Ensure you import your payroll asset
 before={"Smart"}
 btnClr="#ff3b3b"
 highLightClr="#ff3b3b"
 highlight={"Automated Payroll"}
 after={"Processing System"}
 description={"Calculate earnings, automate tax compliance, and process instant bank direct deposits — all in one powerful platform."}
 primaryBtn={"Start Processing Now"}
 secondaryBtn={"Watch Demo"}
 />

 </>
 )
}