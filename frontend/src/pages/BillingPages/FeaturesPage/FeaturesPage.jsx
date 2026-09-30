import React, { useEffect, useState } from "react";
import styles from "./FeaturesPage.module.css";

import Sidebar from "../Components/Sidebar/Sidebar";
import FeaturesCard from "../Components/FeaturesCard/FeaturesCard";

import { AllFeaturesData } from "./AllFeaturesData";

export default function FeaturesPage() {

 const [activeSection, setActiveSection] = useState("product-catalog");

 const features = [
 {
 id: "product-catalog",
 label: "Product Catalog",
 icon: "fa-solid fa-box-open",
 },
 {
 id: "billing",
 label: "Smart Billing",
 icon: "fa-solid fa-file-invoice-dollar",
 },
 {
 id: "customer-lifecycle",
 label: "Lifecycle Tracker",
 icon: "fa-solid fa-users-gear",
 },
 {
 id: "collections",
 label: "Revenue Collections",
 icon: "fa-solid fa-hand-holding-dollar",
 },
 {
 id: "analytics",
 label: "Reporting & Analytics",
 icon: "fa-solid fa-chart-column",
 },
 {
 id: "security",
 label: "Security & Compliance",
 icon: "fa-solid fa-shield-halved",
 },
 ];

 useEffect(() => {
 const sections = document.querySelectorAll(".feature-card");

 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 setActiveSection(entry.target.id);
 }
 });
 },
 {
 threshold: 0.1,
 }
 );

 sections.forEach((section) => observer.observe(section));

 return () => observer.disconnect();
 }, []);

 return (
 <div className={styles.featuresLayout}>
 <Sidebar
 features={features}
 activeSection={activeSection}
 />

 <div className={styles.content}>
 {AllFeaturesData.map((section) => (
 <FeaturesCard
 bgColor="#fff9d2a1"
 key={section.id}
 {...section}
 />
 ))}
 </div>
 </div>
 );
}