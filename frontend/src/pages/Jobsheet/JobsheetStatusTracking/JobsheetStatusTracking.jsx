import React, { useState } from "react";
import { 
 ArrowRight,
 Search,
 Eye
} from "lucide-react";
import { toast } from "react-toastify";
import styles from "./JobsheetStatusTracking.module.css";

export default function JobsheetStatusTracking() {
 // Simulator: Customer Status Lookup
 const [searchQuery, setSearchQuery] = useState("JS-2026-A");
 const [activeJobsheet, setActiveJobsheet] = useState("JS-2026-A"); // JS-2026-A or JS-2026-B

 const handleSearch = (e) => {
 e.preventDefault();
 const query = searchQuery.trim().toUpperCase();
 if (query === "JS-2026-A" || query === "JS-2026-B") {
 setActiveJobsheet(query);
 toast.success(`Jobsheet record ${query} loaded successfully!`);
 } else {
 toast.error("Record code not found. Try searching for 'JS-2026-A' or 'JS-2026-B' in this sandbox.");
 }
 };

 return (
 <div className={styles.statusTrackingPageWrapper}>
 
 {/* 1. HERO SECTION & LOOKUP SIMULATOR */}
 <section className={styles.section}>
 <div className={styles.heroGrid}>
 <div className={styles.heroContent}>
 <div className={styles.badge}>
 <span>⚡ Live Repair Status Updates</span>
 </div>
 <h1 className={styles.heroTitle}>
 Keep Customers Updated With <span className={styles.gradientText}>Live Status Tracking</span>
 </h1>
 <p className={styles.heroSub}>
 SwordNex Jobsheet provides a secure public status tracker portal. Reduce customer follow-up phone calls by sharing SMS, email, or webhook links showing real-time repair progress.
 </p>
 <div className={styles.heroActions}>
 <a href="/register" className={styles.btnPrimary}>
 Start Free Trial <ArrowRight size={18} />
 </a>
 <a href="/support" className={styles.btnSecondary}>
 Request a Demo
 </a>
 </div>
 <span className={styles.heroMeta}>Fully automated triggers • Embed on your website</span>
 </div>

 {/* Interactive Status Lookup Simulator */}
 <div className={styles.mockupWidget}>
 <div className={styles.mockHeader}>
 <span className={styles.mockTitle}>
 <Eye size={16} style={{ color: "var(--accent)" }} />
 Customer Repair Lookup Portal
 </span>
 <span style={{ fontSize: "11px", fontWeight: "700", background: "var(--accent-soft)", color: "var(--accent)", padding: "3px 8px", borderRadius: "4px" }}>
 Status: {activeJobsheet === "JS-2026-A" ? "In Progress" : "Ready"}
 </span>
 </div>

 <form onSubmit={handleSearch} className={styles.searchBox}>
 <input 
 type="text" 
 placeholder="Enter Jobsheet Code (e.g. JS-2026-A)" 
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 />
 <button type="submit" className={styles.btnPrimary} style={{ padding: "8px 16px", fontSize: "12.5px" }}>
 <Search size={14} /> Search
 </button>
 </form>

 <span className={styles.sandboxLabel}>Repair Progress Timeline</span>

 <div className={styles.timeline}>
 <div className={styles.timelineLine} />

 {/* Step 1: Intake */}
 <div className={`${styles.timelineStep} ${styles.stepCompleted}`}>
 <div className={styles.stepIconWrap}>
 <div className={styles.stepCheckDot} />
 </div>
 <div className={styles.stepContent}>
 <span className={styles.stepTitle}>Intake & Registration</span>
 <span className={styles.stepDesc}>Device registered. Diagnostic details and serial number logged.</span>
 </div>
 </div>

 {/* Step 2: Diagnostics */}
 <div className={`${styles.timelineStep} ${styles.stepCompleted}`}>
 <div className={styles.stepIconWrap}>
 <div className={styles.stepCheckDot} />
 </div>
 <div className={styles.stepContent}>
 <span className={styles.stepTitle}>Technical Diagnostics</span>
 <span className={styles.stepDesc}>Hardware issues isolated. Estimate totals confirmed.</span>
 </div>
 </div>

 {/* Step 3: Repairing */}
 <div className={`${styles.timelineStep} ${activeJobsheet === "JS-2026-A" ? styles.stepActive : styles.stepCompleted}`}>
 <div className={styles.stepIconWrap}>
 {activeJobsheet === "JS-2026-A" ? (
 <div className={styles.stepPulseDot} />
 ) : (
 <div className={styles.stepCheckDot} />
 )}
 </div>
 <div className={styles.stepContent}>
 <span className={styles.stepTitle}>Repair In Progress</span>
 <span className={styles.stepDesc}>
 {activeJobsheet === "JS-2026-A" 
 ? "Specialist স্নেহা is replacing charging port components." 
 : "Screen replacement completed successfully."
 }
 </span>
 </div>
 </div>

 {/* Step 4: Testing */}
 <div className={`${styles.timelineStep} ${activeJobsheet === "JS-2026-B" ? styles.stepActive : styles.stepPending}`}>
 <div className={styles.stepIconWrap}>
 {activeJobsheet === "JS-2026-B" ? (
 <div className={styles.stepPulseDot} />
 ) : (
 <div className={styles.stepPendingDot} />
 )}
 </div>
 <div className={styles.stepContent}>
 <span className={styles.stepTitle}>Quality Control Testing</span>
 <span className={styles.stepDesc}>Charge loops, screen touch response, and sensor diagnostic sweeps.</span>
 </div>
 </div>

 {/* Step 5: Ready */}
 <div className={`${styles.timelineStep} ${activeJobsheet === "JS-2026-B" ? styles.stepCompleted : styles.stepPending}`}>
 <div className={styles.stepIconWrap}>
 {activeJobsheet === "JS-2026-B" ? (
 <div className={styles.stepCheckDot} />
 ) : (
 <div className={styles.stepPendingDot} />
 )}
 </div>
 <div className={styles.stepContent}>
 <span className={styles.stepTitle}>Ready For Handover</span>
 <span className={styles.stepDesc}>Customer balance calculated. Receipt PDF compiled and packaged.</span>
 </div>
 </div>

 </div>

 </div>
 </div>
 </section>





 {/* 4. GLOWING CALL TO ACTION */}
 <section className={styles.section}>
 <div className={styles.ctaWrapper}>
 <div className={styles.ctaGlow} />
 <h2>Reduce Store Calls & Keep Clients Informed</h2>
 <p>
 Join thousands of repair service centers that automate status updates. Create your account today.
 </p>
 <div className={styles.ctaBtnGroup}>
 <a href="/register" className={styles.btnPrimary}>
 Start Tracking Now <ArrowRight size={18} />
 </a>
 <a href="/support" className={styles.btnSecondary} style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}>
 Contact Sales Support
 </a>
 </div>
 </div>
 </section>

 {/* Global Footer */}
 <Footer />

 </div>
 );
}
