import React from "react";
import Image1 from "./B_Security2.png";

import Security from "../components/Security/Security";
import Cards from "../components/Cards/Cards";
import TrialBoxTwo from "../components/TrialBoxTwo/TrialBoxTwo";
import Steps from "../components/StepsSection/Steps";
import CTA2 from "../Components/CTA2/CTA2";

export default function B_Security() {

 const StepsData = [
 {
 title: "Secure Cloud Infrastructure",
 description:
 "Run your billing operations on reliable cloud infrastructure with secure data storage, controlled access, and regular system monitoring.",
 icon: "fa-solid fa-server",
 },
 {
 title: "Role-Based User Access",
 description:
 "Control who can create invoices, manage customers, edit products, or view reports using configurable user permissions.",
 icon: "fa-solid fa-user-lock",
 },
 {
 title: "Activity Tracking",
 description:
 "Maintain visibility over important billing actions such as invoice creation, payment updates, customer modifications, and system activities.",
 icon: "fa-solid fa-clock-rotate-left",
 },
 ];

 const SecurityData = [
 {
 title: "Encrypted Data Transmission",
 description:
 "All communication between users and the platform is protected using secure HTTPS connections and modern encryption protocols.",
 icon: "fa-solid fa-lock",
 },
 {
 title: "Protected User Accounts",
 description:
 "User authentication and access controls help prevent unauthorized access to business and customer information.",
 icon: "fa-solid fa-user-shield",
 },
 {
 title: "System Activity Logs",
 description:
 "Track key billing activities and account actions to improve transparency and simplify operational reviews.",
 icon: "fa-solid fa-file-shield",
 },
 ];

 const CardsData = [
 {
 title: "Secure Login Management",
 description:
 "Protect access to your billing platform with authenticated user accounts and controlled permission settings.",
 icon: "fa-solid fa-key",
 },
 {
 title: "Encrypted Connections",
 description:
 "Sensitive business information is transmitted through secure encrypted connections to reduce security risks.",
 icon: "fa-solid fa-lock",
 },
 {
 title: "Regular Data Backups",
 description:
 "Business records, invoices, and customer information are backed up regularly to help prevent accidental data loss.",
 icon: "fa-solid fa-cloud-arrow-up",
 },
 {
 title: "Role-Based Permissions",
 description:
 "Assign different levels of access to employees based on their responsibilities within the organization.",
 icon: "fa-solid fa-users-gear",
 },
 {
 title: "Invoice & Payment Tracking",
 description:
 "Monitor invoice activities, payment updates, and transaction records through a centralized dashboard.",
 icon: "fa-solid fa-file-invoice-dollar",
 },
 {
 title: "Data Privacy Commitment",
 description:
 "Customer and business information remains private and is used only for providing and improving platform services.",
 icon: "fa-solid fa-eye-slash",
 },
 ];



 return (
 <>

 <Security
 reverse={true}
 badge="Security and privacy at Swordnex"
 title="Built on industry-leading compliance and security frameworks"
 image={Image1}
 features={SecurityData}
 />

 <Steps
 title="Swordnex Billing helps you protect financial data with no compromises"
 steps={StepsData}
 />

 <Cards
 bgClr="#FFF7C5"
 title="Explore the course benefits"
 cards={CardsData}
 />

 {/* <TrialBoxTwo
 title="Ready to secure your business billing?"
 description="Protect your financial ledger, enforce strict client data privacy, and automate professional invoicing workflows with Swordnex Billing."
 primaryBtn="START FREE TRIAL"
 secondaryBtn="REQUEST A DEMO"
 /> */}
 <CTA2
 bgClr="#f8fafc"
 btnClr="#D97A2B"
 title="Ready to secure your billing operations?"
 subtitle="Protect sensitive financial data, guarantee enterprise-grade encryption, and maintain strict compliance with global security standards."
 primaryText="Start Secure Trial"
 primaryLink="/billing/signup"
 secondaryText="Contact Sales"
 secondaryLink="/billing/contact"
 />

 </>
 )
}