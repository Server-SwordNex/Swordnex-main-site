import React from "react";
import Image from "./HRImg.png";
import Image2 from "./HRImg2.png"
import Image3 from "./HRImg4.png"
import Steps from "../components/StepsSection/Steps";
import Security from "../components/Security/Security";
import HeroTwo from "../components/HeroTwo/HeroTwo";
import SecHeader from "../components/SecHeader/SecHeader";
import InfoSplit from "../components/InfoSplit/InfoSplit";


export default function HRSoftware() {

 const StepsFeatures = [
 {
 title: "Unified Employee Profiles",
 description:
 "Sync attendance, timesheets, and leave data automatically with the payroll calculation engine.",
 icon: "fa-solid fa-user-gear",
 },
 // {
 // title: "Dynamic Allowances Engine",
 // description:
 // "Configure custom bonus structures, overtime multipliers, and tax-exempt reimbursements per department.",
 // icon: "fa-solid fa-sliders",
 // },
 {
 title: "Granular Access & Auditing",
 description:
 "Assign strict role-based permissions to HR managers while maintaining complete audit trails.",
 icon: "fa-solid fa-shield-halved",
 },
 {
 title: "Employee Insights",
 description:
 "Access employee data, workforce trends, and department-wise information from a centralized dashboard.",
 icon: "fa-solid fa-chart-pie"
 },
 ];

 const SecurityFeatures = [
 {
 title: "Protected Employee Data",
 description:
 "Keep employee records, personal details, and organizational information securely managed in one place.",
 icon: "fa-solid fa-building-shield",
 },
 {
 title: "Controlled User Access",
 description:
 "Define access levels for administrators, HR personnel, and managers to safeguard sensitive information.",
 icon: "fa-solid fa-user-lock",
 },
 {
 title: "Reliable Record Management",
 description:
 "Maintain accurate employee records and track important HR activities with confidence.",
 icon: "fa-solid fa-list-check",
 },
 ];

 return (
 <>
 <InfoSplit
 image={Image}
 bgColor="#ffb9b993"
 title="Why enterprises upgrade to Swordnex Payroll"
 description="Bridge the gap between workforce management and core finance by automating lifecycle tracking, complex deductions, and multi-state compliance."
 points={[
 "Unified HR & payroll sync",
 "Configurable allowance engines",
 "Granular access control systems",
 "Comprehensive workforce analytics",
 ]}
 />

 <Steps
 reverse={true}
 title="Swordnex Payroll helps you process payroll with no compromises"
 steps={StepsFeatures}
 />

 <Security
 badge="Security and privacy at Swordnex"
 title="Enterprise-grade security trusted by businesses to run their daily payroll."
 image={Image2}
 features={SecurityFeatures}
 />

 <HeroTwo
 img={Image3} // Ensure you import your final enterprise product graphic
 highLightClr="#ffa1a1"
 btnClr="#ff3b3b"
 before={"The Ultimate"}
 highlight={"HR & Payroll"}
 after={"Enterprise Solution"}
 description={"Ready to optimize your workforce operations? Unify HR compliance, tracking, allowances, and accurate corporate payroll into a single dashboard today."}
 primaryBtn={"Start Enterprise Trial"}
 secondaryBtn={"Book Enterprise Demo"}
 />


 </>
 )
}