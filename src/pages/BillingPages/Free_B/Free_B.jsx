import React from "react";
import Image1 from "./FreeB.svg";
import Hero3 from "../components/Hero3/Hero3";

export default function Free_B() {
 return (
 <>
 <Hero3
 btnClr="#F4AE52"
 bgColor="#FFF7C5"
 title="Swordnex Free Billing Solution"
 heading="Streamline your client billing workflows without paying a penny."
 description="Unlock a completely free tier of professional billing software. Automatically generate invoices, monitor incoming customer balances, calculate complex local taxes, and record standard business payments with zero hidden fees."
 primaryBtn="ACCESS FREE BILLING"
 secondaryBtn="VIEW ALL FEATURES"
 leftImage={Image1} // Ensure you import your free billing software screen asset
 />


 </>
 )
}