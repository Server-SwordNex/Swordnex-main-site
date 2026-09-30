import React from 'react';
import Teach from "./Teach.png";
import Process from "./Process.png";
import Reports from "./Metrics.png";
import SecHeader from '../components/SecHeader/SecHeader';
import RoleSec from '../components/RoleSec/RoleSec';
import Feature6 from '../components/Feature6/Feature6';

export default function Help() {
 return (
 <>
 <SecHeader
 badge="SwordNex Billing Help"
 badgeClr='#ff3b3b'
 title="Expert billing support, right when you need itt"
 description="Whether you're setting up invoices, managing subscriptions, or generating financial reports, our support resources are here to guide you."
 />


 <RoleSec
 title="Tell us about your organisation"
 btnClr='#F4AE52'
 bgColor="#FFF7C5"
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

 <Feature6
 title="SwordNex Billing Help Center"
 description="Explore setup guides, billing tutorials, inventory management resources, and troubleshooting articles to get the most out of SwordNex Billing."
 viewAllText="View All Help Articles"
 onViewAll={() => navigate("/billing/help")}
 resources={[
 {
 image: Teach,
 category: "Getting Started",
 title:
 "How to Set Up Products, Inventory, and Business Information",
 onClick: () =>
 navigate("/help/product-inventory-setup"),
 },

 {
 image: Process,
 category: "Billing & Invoicing",
 title:
 "How to Create GST Invoices and Process POS Billing",
 onClick: () =>
 navigate("/help/gst-invoice-pos-billing"),
 },

 {
 image: Reports,
 category: "Reports & Finance",
 title:
 "Understanding Cashbook, Due Customers, and Business Reports",
 onClick: () =>
 navigate("/help/cashbook-due-customers-reports"),
 },
 ]}
 />


 </>
 )
}