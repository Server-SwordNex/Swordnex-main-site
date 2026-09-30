import React from 'react';
import Teach from "./Teach.png";
import Process from "./Process.png";
import Reports from "./Metrics.png";
import SecHeader from '../components/SecHeader/SecHeader';
import RoleSec from '../components/RoleSec/RoleSec';
import Feature3 from '../components/Feature3/Feature3';

export default function Help() {
 return (
 <>
 <SecHeader
 badge="SwordNex Payroll Help"
 badgeClr='#ff3b3b'
 title="Get the help you need, when you need it"
 description="Whether you're setting up payroll, managing employees, or generating reports, our support resources are here to guide you."
 />

 <RoleSec
 title="Tell us about your organisation"
 btnClr='#ff3b3b'
 roles={[
 {
 avatar: "fa-solid fa-user-tie",
 role: "Payroll Admin",
 description:
 "Learn how to manage payroll, compliance, employee records and salary processing.",
 buttonText: "View Help",
 highlights: [
 {
 icon: "fa-solid fa-rocket",
 title: "Getting Started",
 },
 {
 icon: "fa-solid fa-calculator",
 title: "Process Pay Runs",
 },
 {
 icon: "fa-solid fa-hand-holding-dollar",
 title: "Configure Benefits",
 },
 ],
 },
 {
 avatar: "fa-solid fa-users",
 role: "Employee",
 description:
 "Learn how to use your employee self-service portal and manage payroll information.",
 buttonText: "View Help",
 highlights: [
 {
 icon: "fa-solid fa-id-card",
 title: "View Profile",
 },
 {
 icon: "fa-solid fa-file-invoice-dollar",
 title: "View Payslips",
 },
 {
 icon: "fa-solid fa-money-check-dollar",
 title: "Salary Details",
 },
 ],
 },
 ]}
 />

 {/* <Feature3
 title="Academy by Swordnex Payroll"
 description="Helpful resources on payroll, compliance, salary processing, employee benefits, and HR management all in one place."
 viewAllText="View All Resources"
 onViewAll={() => navigate("/payroll/academy")}
 resources={[
 {
 image: AdminImg,
 category: "Payroll Administration",
 title:
 "What is a Flexible Benefit Plan and How Does It Work?",
 onClick: () =>
 navigate("/academy/flexible-benefit-plan"),
 },

 {
 image: Taxes,
 category: "Taxes & Compliance",
 title:
 "Employee Provident Fund (EPF): A Complete Guide",
 onClick: () =>
 navigate("/academy/epf-guide"),
 },

 {
 image: Metrics,
 category: "Payroll Metrics",
 title:
 "7 KPIs Every Payroll Team Should Track",
 onClick: () =>
 navigate("/academy/payroll-kpis"),
 },
 ]}
 /> */}

 <Feature3
 title="SwordNex Payroll Help Center"
 description="Browse support articles, setup guides, and troubleshooting resources to get the most out of SwordNex Payroll."
 viewAllText="View All Help Articles"
 onViewAll={() => navigate("/payroll/help")}
 resources={[
 {
 image: Teach,
 category: "Getting Started",
 title:
 "How to Set Up Your Company and Employee Information",
 onClick: () =>
 navigate("/help/company-employee-setup"),
 },

 {
 image: Process,
 category: "Payroll Processing",
 title:
 "How to Run Payroll and Generate Employee Payslips",
 onClick: () =>
 navigate("/help/run-payroll"),
 },

 {
 image: Reports,
 category: "Reports & Compliance",
 title:
 "Understanding Payroll Reports and Statutory Deductions",
 onClick: () =>
 navigate("/help/payroll-reports-compliance"),
 },
 ]}
 />


 </>
 )
}