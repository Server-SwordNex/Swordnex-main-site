import React from "react";
import Image1 from "./Free_PR.png";
import Hero3 from "../components/Hero3/Hero3";

export default function FreePR() {

 const Hero3Data = [
 {
 label: "Software Cost",
 value: "Free",
 position: "topLeft",
 },
 {
 label: "Companies Trust Us",
 value: "1200+",
 position: "topRight",
 },
 {
 label: "Active Employees",
 value: "50K+",
 position: "bottomLeft",
 },
 {
 label: "Payroll Accuracy",
 value: "99.9%",
 position: "bottomRight",
 },
 ];


 return (
 <>
 <Hero3
 tag="100% Free Payroll"
 title="Next-generation free payroll for growing businesses"
 description="Manage your payroll cycles, tracking, and employee workflows completely free. Ditch spreadsheet errors and run automated pay runs from one intuitive platform."
 primaryBtn="START FREE YET POWERFUL"
 secondaryBtn="BOOK DEMO"
 image={Image1}
 miniCards={Hero3Data}
 />

 </>
 )
}