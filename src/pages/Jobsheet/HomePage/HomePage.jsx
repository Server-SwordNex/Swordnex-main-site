import React, { useState } from "react";
import { 
 FileText, 
 Users, 
 Calculator, 
 Clock, 
 FileDown, 
 Activity, 
 Check, 
 Settings, 
 ArrowRight
} from "lucide-react";
import styles from "./HomePage.module.css";

export default function HomePage() {
 // Simulator 1: Live Jobsheet Simulator
 const [totalServiceCost, setTotalServiceCost] = useState(2000);
 const [discount, setDiscount] = useState(200);
 const [additionalCharges, setAdditionalCharges] = useState(100);
 const [activeStatus, setActiveStatus] = useState("in-progress");
 
 const totalCost = Math.max(0, Number(totalServiceCost) - Number(discount) + Number(additionalCharges));

 // Simulator 2: Step-by-Step Workflow Simulator
 const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
 const workflowSteps = [
 {
 title: "Intake Registration",
 desc: "Log customer metadata, device specs, serial numbers, and diagnostic faults instantly.",
 badge: "Step 1"
 },
 {
 title: "Cost & Estimate Breakdown",
 desc: "Calculate service totals automatically from total service costs, loyalty discounts, and additional charges.",
 badge: "Step 2"
 },
 {
 title: "Dispatch & Technician Allocation",
 desc: "Assign the jobsheet directly to hardware or software specialist technicians in your team directory.",
 badge: "Step 3"
 },
 {
 title: "Real-Time status timeline",
 desc: "Track repairs as they progress from initiated to completed, with automated audit logs.",
 badge: "Step 4"
 },
 {
 title: "PDF Receipt & Export Handover",
 desc: "Download print-ready branded PDF receipts for clients and export logs to CSV databases.",
 badge: "Step 5"
 }
 ];

 // Simulator 3: Technician Workloads Sandbox
 const [selectedTech, setSelectedTech] = useState(0);
 const techniciansData = [
 {
 name: "Rohan Verma",
 role: "Hardware & Chip Specialist",
 initials: "RV",
 status: "Active",
 jobsCount: 3,
 jobs: [
 { id: "JS-201", device: "MacBook Pro M1 (Keyboard Repair)" },
 { id: "JS-204", device: "Dell XPS 15 (Battery Replacement)" },
 { id: "JS-208", device: "HP Pavilion (Motherboard Soldering)" }
 ]
 },
 {
 name: "Sneha Patel",
 role: "OS & Diagnostic Expert",
 initials: "SP",
 status: "Active",
 jobsCount: 1,
 jobs: [
 { id: "JS-203", device: "Lenovo ThinkPad (OS Reinstallation)" }
 ]
 },
 {
 name: "Amit Sen",
 role: "Quality & Inspection Lead",
 initials: "AS",
 status: "Busy",
 jobsCount: 3,
 jobs: [
 { id: "JS-199", device: "Asus ROG (Liquid Cooling Service)" },
 { id: "JS-202", device: "iPad Pro Screen Fix validation" },
 { id: "JS-205", device: "Epson Printer Setup" }
 ]
 }
 ];



 const getStatusColor = (status) => {
 switch (status) {
 case "initiated": return "#8B8FA3";
 case "in-progress": return "#F59E0B";
 case "completed": return "#10B981";
 case "cancelled": return "#F20519";
 default: return "#8B8FA3";
 }
 };

 return (
 <div className={styles.homeContainer}>
 
 {/* 1. HERO SECTION */}
 <section className={styles.section}>
 <div className={styles.heroGrid}>
 <div className={styles.heroContent}>
 <div className={styles.badge}>
 <span>✨ New Version 2.5 Live</span>
 </div>
 <h1 className={styles.heroTitle}>
 Simplify Your <span className={styles.gradientText}>Service Center</span> Workflow Instantly
 </h1>
 <p className={styles.heroSub}>
 SwordNex Jobsheet helps repair shops organize customer entries, assign technicians, track repair lifecycles, and automatically compute service pricing in one seamless app.
 </p>
 <div className={styles.heroActions}>
 <a href="/register" className={styles.btnPrimary}>
 Start Free Trial <ArrowRight size={18} />
 </a>
 <a href="/support" className={styles.btnSecondary}>
 Request a Demo
 </a>
 </div>
 <span className={styles.heroMeta}>No credit card required • Get set up in under 5 minutes</span>
 </div>

 {/* Interactive Live Jobsheet Widget */}
 <div className={styles.simulatorWidget}>
 <div className={styles.simLiveBadge}>
 <span className={styles.pulseDot} />
 <span>Interactive Simulator</span>
 </div>
 
 <div className={styles.simHeader}>
 <span className={styles.simTitle}>
 <FileText size={16} style={{ color: "var(--accent)" }} />
 Jobsheet Draft Preview
 </span>
 <span className={styles.simBadge}>JS-2026</span>
 </div>

 <div className={styles.simStatusRow}>
 {["initiated", "in-progress", "completed", "cancelled"].map((status) => (
 <button
 key={status}
 className={`${styles.simStatusBtn} ${activeStatus === status ? styles.simStatusBtnActive : ""}`}
 onClick={() => setActiveStatus(status)}
 style={activeStatus === status ? { backgroundColor: getStatusColor(status) } : {}}
 >
 <span style={{ 
 width: 6, 
 height: 6, 
 borderRadius: "50%", 
 backgroundColor: activeStatus === status ? "#fff" : getStatusColor(status) 
 }} />
 {status}
 </button>
 ))}
 </div>

 <div className={styles.simRowList}>
 <div className={styles.simRowItem} style={{ marginBottom: "8px" }}>
 <span>Customer Name</span>
 <strong>Amit Sharma</strong>
 </div>
 <div className={styles.simRowItem} style={{ marginBottom: "8px" }}>
 <span>Device/Problem</span>
 <strong>iPhone 14 (Screen Fault)</strong>
 </div>
 <div className={styles.simRowItem} style={{ marginBottom: "8px" }}>
 <span>Total Service Cost (₹)</span>
 <strong style={{ color: "var(--accent)" }}>₹ {Number(totalServiceCost).toLocaleString("en-IN")}</strong>
 </div>
 <div className={styles.simRowItem} style={{ marginBottom: "8px" }}>
 <span>Discount (₹)</span>
 <strong style={{ color: "var(--accent)" }}>- ₹ {Number(discount).toLocaleString("en-IN")}</strong>
 </div>
 <div className={styles.simRowItem}>
 <span>Additional Charges (₹)</span>
 <strong style={{ color: "var(--accent)" }}>+ ₹ {Number(additionalCharges).toLocaleString("en-IN")}</strong>
 </div>
 </div>

 <div className={styles.simTotalBox}>
 <span style={{ fontWeight: "700" }}>Calculated Estimate:</span>
 <span className={styles.simTotalVal}>₹ {totalCost.toLocaleString("en-IN")}</span>
 </div>
 </div>
 </div>
 </section>

 {/* 2. KPI / STATS BAR */}
 <section className={styles.kpiSection}>
 <div className={styles.kpiGrid}>
 <div className={styles.kpiCard}>
 <div className={styles.kpiNum}>15k+</div>
 <div className={styles.kpiLabel}>Jobsheets Generated</div>
 </div>
 <div className={styles.kpiCard}>
 <div className={styles.kpiNum}>8.2 Hours</div>
 <div className={styles.kpiLabel}>Saved Weekly Per Shop</div>
 </div>
 <div className={styles.kpiCard}>
 <div className={styles.kpiNum}>99.4%</div>
 <div className={styles.kpiLabel}>Technician Compliance</div>
 </div>
 <div className={styles.kpiCard}>
 <div className={styles.kpiNum}>₹45M+</div>
 <div className={styles.kpiLabel}>Pricing Invoiced</div>
 </div>
 </div>
 </section>

 {/* 3. STEP-BY-STEP WORKFLOW SIMULATOR */}
 <section className={styles.section}>
 <div className={styles.featHead}>
 <span className={styles.badge}>REPAIR TIMELINE</span>
 <h2>Visualizing the Repair Workflow</h2>
 <p style={{ color: "rgba(30, 27, 75, 0.6)" }}>
 Explore how SwordNex automates the lifetime of a service ticket, from customer check-in to digital PDF delivery.
 </p>
 </div>

 <div className={styles.workflowBox}>
 <div className={styles.workflowStepsList}>
 {workflowSteps.map((step, idx) => (
 <button
 key={idx}
 className={`${styles.workflowStepItem} ${activeWorkflowStep === idx ? styles.workflowStepItemActive : ""}`}
 onClick={() => setActiveWorkflowStep(idx)}
 >
 <div className={`${styles.workflowStepNumber} ${activeWorkflowStep === idx ? styles.workflowStepNumberActive : ""}`}>
 {idx + 1}
 </div>
 <div className={styles.workflowStepContent}>
 <h4>{step.title}</h4>
 <p>{step.desc}</p>
 </div>
 </button>
 ))}
 </div>

 <div className={styles.workflowVisualPanel}>
 <div className={styles.workflowPreviewTitle}>
 <Activity size={14} style={{ color: "var(--accent)" }} />
 Live System Preview: {workflowSteps[activeWorkflowStep].title}
 </div>

 {activeWorkflowStep === 0 && (
 <div className={styles.workflowPreviewCard}>
 <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
 <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", fontWeight: "600" }}>NEW REPAIR DISPATCH</div>
 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
 <div>
 <span style={{ fontSize: "10px", color: "rgba(0,0,0,0.5)", display: "block" }}>Customer</span>
 <strong style={{ fontSize: "12px", color: "var(--dark)" }}>Pooja Nair</strong>
 </div>
 <div>
 <span style={{ fontSize: "10px", color: "rgba(0,0,0,0.5)", display: "block" }}>Phone</span>
 <strong style={{ fontSize: "12px", color: "var(--dark)" }}>+91 98765 43210</strong>
 </div>
 </div>
 <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "8px" }}>
 <span style={{ fontSize: "10px", color: "rgba(0,0,0,0.5)", display: "block" }}>Product / Fault Details</span>
 <strong style={{ fontSize: "12px", color: "var(--dark)" }}>iPad Air (Liquid Spill / No Power)</strong>
 </div>
 </div>
 </div>
 )}

 {activeWorkflowStep === 1 && (
 <div className={styles.workflowPreviewCard}>
 <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
 <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", fontWeight: "600" }}>COST BREAKDOWN & DISCOUNTS</div>
 <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
 <span>Spare Motherboard Chip</span>
 <strong style={{ color: "var(--dark)" }}>₹ 4,500</strong>
 </div>
 <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
 <span>Liquid Diagnostics Fee</span>
 <strong style={{ color: "var(--dark)" }}>₹ 1,200</strong>
 </div>
 <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
 <span>Loyalty Promo Discount</span>
 <strong style={{ color: "var(--accent)" }}>- ₹ 500</strong>
 </div>
 <div style={{ borderTop: "1px dashed rgba(0,0,0,0.1)", paddingTop: "8px", display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "700" }}>
 <span>Calculated Total</span>
 <span style={{ color: "var(--accent)" }}>₹ 5,200</span>
 </div>
 </div>
 </div>
 )}

 {activeWorkflowStep === 2 && (
 <div className={styles.workflowPreviewCard}>
 <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
 <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", fontWeight: "600" }}>DISPATCH TECHNICIAN SELECTOR</div>
 <div style={{ display: "flex", alignItems: "center", justify: "space-between", background: "var(--accent-soft)", border: "1px solid var(--accent-border)", padding: "10px", borderRadius: "6px" }}>
 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
 <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--accent)", color: "white", fontSize: "11px", display: "flex", alignItems: "center", justify: "center", fontWeight: "700" }}>AS</div>
 <div>
 <strong style={{ fontSize: "12px", display: "block", color: "var(--dark)" }}>Amit Sen</strong>
 <span style={{ fontSize: "10px", color: "rgba(0,0,0,0.5)" }}>Micro-Soldering Expert</span>
 </div>
 </div>
 <span style={{ fontSize: "9px", background: "rgba(16,185,129,0.15)", color: "var(--success)", fontWeight: "700", padding: "2px 6px", borderRadius: "4px" }}>SELECTED</span>
 </div>
 </div>
 </div>
 )}

 {activeWorkflowStep === 3 && (
 <div className={styles.workflowPreviewCard}>
 <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
 <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", fontWeight: "600" }}>LIFECYCLE AUDIT LOGS</div>
 <div style={{ fontSize: "11px", display: "flex", flexDirection: "column", gap: "6px" }}>
 <div>
 <span style={{ color: "rgba(0,0,0,0.4)", marginRight: "6px" }}>[02:40 PM]</span>
 <span style={{ color: "var(--dark)", fontWeight: "500" }}>Status changed to <strong style={{ color: "var(--accent-warm)" }}>IN-PROGRESS</strong></span>
 </div>
 <div>
 <span style={{ color: "rgba(0,0,0,0.4)", marginRight: "6px" }}>[02:42 PM]</span>
 <span style={{ color: "var(--dark)", fontWeight: "500" }}>Technician Amit Sen assigned to ticket JS-2028</span>
 </div>
 <div>
 <span style={{ color: "rgba(0,0,0,0.4)", marginRight: "6px" }}>[03:15 PM]</span>
 <span style={{ color: "var(--dark)", fontWeight: "500" }}>Parts replaced: Logic board capacitor</span>
 </div>
 </div>
 </div>
 </div>
 )}

 {activeWorkflowStep === 4 && (
 <div className={styles.workflowPreviewCard} style={{ textAlign: "center" }}>
 <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
 <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", color: "var(--success)", display: "flex", alignItems: "center", justify: "center" }}>
 <Check size={20} />
 </div>
 <div>
 <strong style={{ fontSize: "13px", display: "block", color: "var(--dark)" }}>PDF Jobsheet Generated</strong>
 <span style={{ fontSize: "11px", color: "rgba(0,0,0,0.5)" }}>File size: 142 KB • Ready for dispatch</span>
 </div>
 <a href="#" onClick={(e) => e.preventDefault()} style={{ display: "inline-block", padding: "6px 14px", background: "var(--accent)", color: "white", fontSize: "11px", fontWeight: "600", borderRadius: "4px", textDecoration: "none", marginTop: "4px" }}>
 Download Receipt PDF
 </a>
 </div>
 </div>
 )}
 </div>
 </div>
 </section>

 {/* 4. CORE FEATURES GRID */}
 <section className={styles.section} style={{ backgroundColor: "var(--accent-soft)" }}>
 <div className={styles.featHead}>
 <span className={styles.badge}>SYSTEM FEATURES</span>
 <h2>Everything Built For Service Excellence</h2>
 <p style={{ color: "rgba(30, 27, 75, 0.6)" }}>
 Eliminate traditional service logs and excel spreadsheets. Manage operations using our tailor-made features.
 </p>
 </div>

 <div className={styles.featGrid}>
 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <FileText size={24} />
 </div>
 <h3>Structured Intake Forms</h3>
 <p>Input unique client details, device metadata, faults, and serial numbers. Save partial drafts to complete later.</p>
 </div>

 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <Users size={24} />
 </div>
 <h3>Technician Assignments</h3>
 <p>Allocate tasks to specific department experts based on workload schedules and specialization metrics.</p>
 </div>

 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <Calculator size={24} />
 </div>
 <h3>Cost Estimation Logs</h3>
 <p>Document estimates clearly before initiating repairs. Log total service costs, apply discounts, and factor in additional charges.</p>
 </div>

 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <Clock size={24} />
 </div>
 <h3>Real-Time Statuses</h3>
 <p>Update ticket records to Initiated, In-Progress, Completed, or Cancelled to automatically notify team members.</p>
 </div>

 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <FileDown size={24} />
 </div>
 <h3>PDF/CSV Generators</h3>
 <p>Download clean, branded PDF summaries for customer receipts and export complete logs to CSV databases.</p>
 </div>

 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <Settings size={24} />
 </div>
 <h3>Admin Controls</h3>
 <p>Lock numbering formats, manage permission credentials, and secure sensitive financial reporting datasets.</p>
 </div>
 </div>
 </section>

 {/* 5. INTERACTIVE TECHNICIAN QUEUE SANDBOX */}
 <section className={styles.section}>
 <div className={styles.techSandbox}>
 <div className={styles.techLeft}>
 <span className={styles.badge}>TEAM OVERLOAD CONTROL</span>
 <h2>Balance Workloads Across Your Team</h2>
 <p>
 Technicians work better when queues are clear. Use our live interactive view below to check active jobs allocated to specific technicians. Assign incoming service tickets with precision.
 </p>

 <div className={styles.techList}>
 {techniciansData.map((tech, idx) => (
 <div 
 key={idx}
 className={`${styles.techItem} ${selectedTech === idx ? styles.techItemActive : ""}`}
 onClick={() => setSelectedTech(idx)}
 >
 <div className={styles.techMeta}>
 <div className={`${styles.techInitials} ${selectedTech === idx ? styles.techInitialsActive : ""}`}>
 {tech.initials}
 </div>
 <div>
 <span className={styles.techDetailName}>{tech.name}</span>
 <span className={styles.techDetailRole}>{tech.role}</span>
 </div>
 </div>

 <div className={styles.techMetrics}>
 <span 
 className={styles.techLoadBadge}
 style={{ 
 backgroundColor: tech.status === "Active" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
 color: tech.status === "Active" ? "var(--success)" : "var(--accent-warm)" 
 }}
 >
 {tech.status}
 </span>
 <span className={styles.techJobsText}>{tech.jobsCount} Active Jobs</span>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Active queue display */}
 <div className={styles.techQueueBox}>
 <div className={styles.queueTitle}>
 Active Queue For {techniciansData[selectedTech].name.toUpperCase()}
 </div>
 <div className={styles.queueList}>
 {techniciansData[selectedTech].jobs.map((job) => (
 <div key={job.id} className={styles.queueCard}>
 <span className={styles.queueCardCode}>{job.id}</span>
 <span className={styles.queueCardDevice}>{job.device}</span>
 <span style={{ fontSize: "10px", color: "var(--accent)", fontWeight: "700" }}>ASSIGNED</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>



 {/* 8. GLOWING CALL TO ACTION */}
 <section className={styles.section}>
 <div className={styles.ctaWrapper}>
 <div className={styles.ctaGlow} />
 <h2>Ready to Supercharge Your Shop?</h2>
 <p>
 Get started today with SwordNex Jobsheet. No credit card required. Experience organized repair operations in less than 5 minutes.
 </p>
 <div className={styles.ctaBtnGroup}>
 <a href="/register" className={styles.btnPrimary}>
 Create Free Account <ArrowRight size={18} />
 </a>
 <a href="/support" className={styles.btnSecondary} style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}>
 Contact Sales Support
 </a>
 </div>
 </div>
 </section>

 </div>
 );
}