import React from "react";
import { useNavigate } from "react-router-dom";
import {
 Users,
 FileText,
 Calculator,
 BarChart3,
 HeadphonesIcon,
 ListChecks,
 Tag,
} from "lucide-react";
import styles from "./Features.module.css";
import AnimateOnScroll from "../../Components/AnimateOnScroll";
import startPic from "./start.png";

const features = [
 {
 icon: Users,
 title: "Sub-User Management",
 description:
 "Create team members with role-based access — admin and staff accounts.",
 details: ["Role-based permissions", "Unlimited team members", "Activity logging"],
 gradient: "linear-gradient(135deg, #667eea, #764ba2)",
 },
 {
 icon: FileText,
 title: "Invoice Drafts",
 description:
 "Save invoices as drafts and resume editing anytime.",
 details: ["Auto-save drafts", "Edit before send", "Template library"],
 gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
 },
 {
 icon: Calculator,
 title: "Auto-GST Computation",
 description:
 "Automatic CGST/SGST/IGST calculation based on seller & buyer states.",
 details: ["All GST slabs supported", "Auto tax breakup", "State-wise logic"],
 gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
 },
 {
 icon: BarChart3,
 title: "Dashboard Charts",
 description:
 "Visual revenue trends and monthly sales analytics at a glance.",
 details: ["Revenue graphs", "Monthly comparisons", "Export reports"],
 gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
 },
 {
 icon: HeadphonesIcon,
 title: "Support Tickets",
 description:
 "Submit queries and track resolution status right inside the app.",
 details: ["Priority support", "Ticket tracking", "Fast resolution"],
 gradient: "linear-gradient(135deg, #fa709a, #fee140)",
 },
 {
 icon: ListChecks,
 title: "Multiple GST Rates",
 description:
 "Choose from 0%, 5%, 12%, 18%, 28% GST rates per line item.",
 details: ["All GST rates", "Per-item configuration", "Auto calculations"],
 gradient: "linear-gradient(135deg, #a18cd1, #fbc2eb)",
 },
 {
 icon: Tag,
 title: "Discounts & Charges",
 description:
 "Add fixed or percentage discounts and extra charges per invoice.",
 details: ["% or fixed discounts", "Shipping charges", "Tax adjustments"],
 gradient: "linear-gradient(135deg, #ffecd2, #fcb69f)",
 },
];

const Features = () => {
 const navigate = useNavigate();
 return (
 <section id="features" className={styles.section}>
 <div className={styles.bgOrnament1} />
 <div className={styles.bgOrnament2} />

 <AnimateOnScroll animation="fadeUp">
 <div className={styles.header}>
 <span className={styles.badge}>Features</span>
 <h2>Everything you need to manage invoices</h2>
 <p>
 Powerful tools designed to streamline your invoicing workflow
 and keep your business running smoothly.
 </p>
 </div>
 </AnimateOnScroll>

 <div className={styles.featuresGrid}>
 {features.map((feature, index) => {
 const IconComponent = feature.icon;
 return (
 <AnimateOnScroll
 key={index}
 animation="fadeUp"
 delay={index * 80}
 >
 <div className={styles.card}>
 <div
 className={styles.illustration}
 style={{ background: feature.gradient }}
 >
 <div className={styles.illustBgShape} />
 <IconComponent size={48} />
 </div>
 <div className={styles.cardBody}>
 <h3>{feature.title}</h3>
 <p>{feature.description}</p>
 <ul className={styles.featureDetails}>
 {feature.details.map((d, i) => (
 <li key={i}>{d}</li>
 ))}
 </ul>
 </div>
 </div>
 </AnimateOnScroll>
 );
 })}
 </div>

 <AnimateOnScroll animation="fadeUp">
 <div className={styles.bottomCta}>
 <div className={styles.ctaContent}>
 <div className={styles.ctaOverlay} />
 <div className={styles.ctaText}>
 <span className={styles.ctaBadge}>Get Started Today</span>
 <h3>Ready to streamline your billing?</h3>
 <p>Join thousands of businesses using SwordNex Invoice to manage, track, and grow their revenue.</p>
 <ul className={styles.ctaBenefits}>
 <li>14-day free trial, no credit card required</li>
 <li>Cancel anytime, no hidden fees</li>
 <li>Dedicated support team</li>
 </ul>
 <button className={styles.ctaButton} onClick={() => navigate("/register")}>Start Free Trial</button>
 </div>
 <div className={styles.ctaImageWrap}>
 <img
 src={startPic}
 alt="Invoice illustration"
 className={styles.ctaIllustration}
 />
 </div>
 </div>
 </div>
 </AnimateOnScroll>
 </section>
 );
};

export default Features;
