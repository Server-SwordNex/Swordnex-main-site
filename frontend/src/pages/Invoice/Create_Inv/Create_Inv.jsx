import React from "react";
import Image1 from "./free2.svg";
import Image2 from "./free.svg";
import Header4 from "../Components/Header4/Header4";
import TrialBoxTwo from "../Components/TrialBoxTwo/TrialBoxTwo";
import Hero2 from "../Components/Hero2/Hero2";

export default function Create_Inv() {
 return (
 <>
 <Header4
 badge="Invoice Creation Guide"
 title="Create professional invoices in just a few simple steps"
 description="Generate GST-ready invoices, manage clients, add products, calculate taxes automatically, and share invoices instantly with Swordnex."
 image={Image1}
 steps={[
 {
 title: "Add your business details",
 description:
 "Enter your company information including GSTIN, address, and contact details.",
 },
 {
 title: "Select your customer",
 description:
 "Choose existing clients or create new customer profiles easily.",
 },
 {
 title: "Add products and services",
 description:
 "Include items, quantities, tax rates, discounts, and pricing automatically.",
 },
 ]}
 />

 <Hero2
 reverse={true}
 img={Image2}
 before={"Create"}
 highlight={"Professional Invoices"}
 after={"Without the Manual Work"}
 description={"Generate GST-ready invoices, automate calculations, manage customer records, and maintain accurate billing documents from a single platform designed for growing businesses."}
 primaryBtn={"Create Free Invoice"}
 secondaryBtn={"Watch Demo"}
 />

 {/* <TrialBoxTwo
 title="Ready to simplify your invoicing process?"
 description="Automate invoice creation, professional branding, late payment reminders, and global payment collection with Swordnex Invoicing."
 primaryBtn="START FREE TRIAL"
 secondaryBtn="REQUEST A DEMO"
 /> */}

 </>
 )
}