import React from "react";
import Image1 from "./PaySlip.png";
import Hero from "../components/Hero/Hero";
import FeatureGrid from "../components/FeatureGrid/FeatureGrid";

export default function PaySlip() {

 const payslipFeatures = [
 {
 title: "Brand Customization",
 description:
 "Upload your company logo, choose custom hex colors, and match fonts to fit your corporate identity.",
 icon: "fa-solid fa-palette",
 },
 {
 title: "Compliance-Ready Headers",
 description:
 "Pre-structured layouts automatically matching state laws, statutory deductions, and tax declarations.",
 icon: "fa-solid fa-scale-balanced",
 },
 {
 title: "Hourly & Salaried Layouts",
 description:
 "Seamlessly switch formats to clearly show overtime multipliers, flat rates, or project bonuses.",
 icon: "fa-solid fa-border-all",
 },
 {
 title: "Digital Signatures",
 description:
 "Embed authenticated corporate seals or executive signatures directly into generated PDF files.",
 icon: "fa-solid fa-signature",
 },
 ];


 return (
 <>
 <Hero
 title="Swordnex Payslip Designer"
 heading="Professional, brand aligned payslip templates in seconds."
 description="Customize and generate clean, compliance-ready pay stubs automatically. Choose from beautiful layouts that clearly break down earnings, deductions, and tax contributions for your workforce."
 primaryBtn="CHOOSE A TEMPLATE"
 secondaryBtn="SEE LIVE EXAMPLES"
 leftImage={Image1} // Ensure you import your payslip graphic asset
 />

 <FeatureGrid
 title="Everything you need to build clean, compliant payslips"
 features={payslipFeatures}
 />

 </>
 )
}