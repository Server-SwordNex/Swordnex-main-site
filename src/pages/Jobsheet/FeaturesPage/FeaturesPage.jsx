import React, { useState, useEffect } from "react";
import { 
 FileText, 
 Clock, 
 BarChart3, 
 Users, 
 Check, 
 Percent, 
 Wrench, 
 CalendarDays,
 Shield, 
 Laptop, 
 TrendingUp, 
 Database,
 ArrowRightLeft
} from "lucide-react";
import styles from "./FeaturesPage.module.css";

export default function FeaturesPage() {
 // Simulator 1: Cost Calculator
 const [totalServiceCost, setTotalServiceCost] = useState(2000);
 const [discount, setDiscount] = useState(200);
 const [additionalCharges, setAdditionalCharges] = useState(100);
 const totalCost = Math.max(0, Number(totalServiceCost) - Number(discount) + Number(additionalCharges));

 // Simulator 2: Status Lifecycle
 const [activeStatus, setActiveStatus] = useState("initiated");
 const [logs, setLogs] = useState([
 { time: "10:15 AM", type: "system", text: "Jobsheet JS-2026 created successfully" },
 { time: "10:16 AM", type: "system", text: "Customer details registered: Amit Sharma" }
 ]);

 const handleStatusChange = (status) => {
 setActiveStatus(status);
 const now = new Date();
 const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
 let newLog = {};

 switch(status) {
 case "initiated":
 newLog = { time: timeStr, type: "initiated", text: "Workflow reset. Status set to Initiated." };
 break;
 case "in-progress":
 newLog = { time: timeStr, type: "in-progress", text: "Technician Rohan assigned. Repairs started." };
 break;
 case "completed":
 newLog = { time: timeStr, type: "completed", text: "Repairs complete. PDF Jobsheet compiled & ready." };
 break;
 case "cancelled":
 newLog = { time: timeStr, type: "cancelled", text: "Job suspended. Reason: Waiting for parts confirmation." };
 break;
 default:
 break;
 }
 setLogs(prev => [newLog, ...prev]);
 };

 // Simulator 3: BI Dashboard Analytics
 const [selectedSegment, setSelectedSegment] = useState("completed");
 const chartData = {
 initiated: { count: 8, color: "#8B8FA3", percent: "18%" },
 "in-progress": { count: 12, color: "#F59E0B", percent: "27%" },
 completed: { count: 22, color: "#10B981", percent: "50%" },
 cancelled: { count: 2, color: "#F20519", percent: "5%" }
 };

 // Simulator 4: Technician Workloads
 const [selectedTech, setSelectedTech] = useState(0);
 const techniciansData = [
 {
 name: "Rohan Verma",
 role: "Hardware & Chip Level Specialist",
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
 role: "OS & Software Diagnostic Expert",
 initials: "SP",
 status: "Active",
 jobsCount: 1,
 jobs: [
 { id: "JS-203", device: "Lenovo ThinkPad (OS Reinstallation & Driver Fix)" }
 ]
 },
 {
 name: "Amit Sen",
 role: "Quality & Final Inspection Lead",
 initials: "AS",
 status: "Busy",
 jobsCount: 5,
 jobs: [
 { id: "JS-199", device: "Asus ROG (Liquid Cooling Service)" },
 { id: "JS-202", device: "iPad Pro Screen Fix validation" },
 { id: "JS-205", device: "Epson Printer Cartridge Setup" }
 ]
 }
 ];

 return (
 <div className={styles.featuresPageContainer}>
 <div className={styles.featuresPage}>
 {/* Hero Header */}
 <header className={styles.heroHeader}>
 <div className={styles.badge}>Platform Tour</div>
 <h1 className={styles.heroTitle}>
 Built for <span>Service Centers</span> & Technicians
 </h1>
 <p className={styles.heroDesc}>
 SwordNex Jobsheet organizes your workflow from service order intake to billing. Eliminate manual dispatch delays, track task status instantly, and share digital receipts effortlessly.
 </p>
 </header>

 {/* Pillars Grid */}
 <section className={styles.overviewGrid}>
 <div className={styles.pillarCard}>
 <div className={styles.pillarIcon}>
 <FileText size={20} />
 </div>
 <h3>Jobsheet Generator</h3>
 <p>Instantly compile customer metadata, diagnostic faults, assigned specialists, parts used, and payment outlines into a clean database record.</p>
 </div>

 <div className={styles.pillarCard}>
 <div className={styles.pillarIcon}>
 <Clock size={20} />
 </div>
 <h3>Real-Time Lifecycles</h3>
 <p>Track the progress of any repair or service request with visual status changes, from initial diagnostic evaluation to completion.</p>
 </div>

 <div className={styles.pillarCard}>
 <div className={styles.pillarIcon}>
 <BarChart3 size={20} />
 </div>
 <h3>Performance Insights</h3>
 <p>Understand your business health with total revenue calculations, discount lists, weekly volume trends, and staff performance charts.</p>
 </div>

 <div className={styles.pillarCard}>
 <div className={styles.pillarIcon}>
 <Users size={20} />
 </div>
 <h3>Team Collaboration</h3>
 <p>Allocate jobs to specific technicians, balance department workloads, monitor backlogs, and enforce custom roles and controls.</p>
 </div>
 </section>

 {/* Detailed Showcases */}
 <div className={styles.showcasesContainer}>
 
 {/* Showcase 1: Jobsheet Pricing & Costing */}
 <section className={styles.showcaseRow}>
 <div className={styles.showcaseText}>
 <span className={styles.showcaseCat}>Jobsheet Intake</span>
 <h2>Complete Service Costing & Pricing Details</h2>
 <p>
 Avoid manual billing mistakes. Document total service cost (including parts and labor), apply discounts, and factor in additional charges directly within the jobsheet creator. All calculations update instantly for transparency.
 </p>
 <div className={styles.featureList}>
 <div className={styles.featureItem}>
 <Check size={18} className={styles.checkIcon} />
 <div className={styles.featureItemText}>
 <h4>Auto Calculations</h4>
 <p>Estimates and totals calculate dynamically as you adjust the values.</p>
 </div>
 </div>
 <div className={styles.featureItem}>
 <Check size={18} className={styles.checkIcon} />
 <div className={styles.featureItemText}>
 <h4>Flexible Charge Inputs</h4>
 <p>Configure total service costs, apply custom discounts, and add additional charges easily.</p>
 </div>
 </div>
 </div>

 </div>

 <div className={styles.showcaseVisual}>
 <div className={styles.mockWidget}>
 <div className={styles.mockHeader}>
 <span className={styles.mockTitle}>
 <FileText size={16} style={{ color: "var(--accent)" }} />
 New Jobsheet: Cost Setup
 </span>
 <span style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", fontWeight: "600" }}>JS-2026</span>
 </div>
 <div className={styles.mockBody}>
 <div className={styles.calcForm}>
 <div className={styles.formGroup}>
 <label>Total Service Cost (Incl. Parts & Labor) (₹)</label>
 <div className={styles.inputWrap}>
 <span className={styles.inputPrefix}>₹</span>
 <input 
 type="number" 
 value={totalServiceCost} 
 onChange={(e) => setTotalServiceCost(e.target.value)} 
 placeholder="Total service cost"
 />
 </div>
 </div>
 <div className={styles.formGroup}>
 <label>Discount Amount (₹)</label>
 <div className={styles.inputWrap}>
 <span className={styles.inputPrefix}>₹</span>
 <input 
 type="number" 
 value={discount} 
 onChange={(e) => setDiscount(e.target.value)} 
 placeholder="Discount"
 />
 </div>
 </div>
 <div className={styles.formGroup}>
 <label>Additional Charges (₹)</label>
 <div className={styles.inputWrap}>
 <span className={styles.inputPrefix}>₹</span>
 <input 
 type="number" 
 value={additionalCharges} 
 onChange={(e) => setAdditionalCharges(e.target.value)} 
 placeholder="Additional charges"
 />
 </div>
 </div>
 <div className={styles.calcTotalBox}>
 <span className={styles.calcTotalLabel}>Calculated Total Estimate:</span>
 <span className={styles.calcTotalVal}>₹ {totalCost.toLocaleString('en-IN')}</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Showcase 2: Status Lifecycles */}
 <section className={styles.showcaseRow}>
 <div className={styles.showcaseText}>
 <span className={styles.showcaseCat}>Workflow Tracking</span>
 <h2>Track service status from start to finish</h2>
 <p>
 Maintain a detailed log of every device repair. As jobs move from diagnostics to client delivery, statuses keep technicians aligned and customers informed in real-time.
 </p>
 <div className={styles.featureList}>
 <div className={styles.featureItem}>
 <Check size={18} className={styles.checkIcon} />
 <div className={styles.featureItemText}>
 <h4>Standardized Workflows</h4>
 <p>Enforce clean states: Initiated, In-Progress, Completed, and Cancelled.</p>
 </div>
 </div>
 <div className={styles.featureItem}>
 <Check size={18} className={styles.checkIcon} />
 <div className={styles.featureItemText}>
 <h4>Detailed Timeline Audit</h4>
 <p>Track exactly when statuses change and who made the modification.</p>
 </div>
 </div>
 </div>

 </div>

 <div className={styles.showcaseVisual}>
 <div className={styles.mockWidget}>
 <div className={styles.mockHeader}>
 <span className={styles.mockTitle}>
 <Clock size={16} style={{ color: "var(--accent)" }} />
 Interactive Status Log
 </span>
 <span style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", fontWeight: "600" }}>Active Tracking</span>
 </div>
 <div className={styles.mockBody}>
 <div className={styles.timelineHeader}>
 {["initiated", "in-progress", "completed", "cancelled"].map((status) => (
 <button
 key={status}
 className={`${styles.statusPillBtn} ${
 activeStatus === status ? styles.statusPillBtnActive : ""
 }`}
 onClick={() => handleStatusChange(status)}
 style={
 activeStatus === status 
 ? {
 background: 
 status === "initiated" ? "#8B8FA3" : 
 status === "in-progress" ? "#F59E0B" : 
 status === "completed" ? "#10B981" : "#F20519",
 }
 : {}
 }
 >
 <span 
 style={{ 
 width: 8, 
 height: 8, 
 borderRadius: "50%", 
 background: 
 status === "initiated" ? "#8B8FA3" : 
 status === "in-progress" ? "#F59E0B" : 
 status === "completed" ? "#10B981" : "#F20519" 
 }} 
 />
 {status}
 </button>
 ))}
 </div>
 <div className={styles.logArea}>
 {logs.map((log, index) => (
 <div key={index} className={styles.logRow}>
 <span className={styles.logTime}>[{log.time}]</span>
 <span className={styles.logText}>
 {log.text}
 </span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Showcase 3: BI Dashboard Analytics */}
 <section className={styles.showcaseRow}>
 <div className={styles.showcaseText}>
 <span className={styles.showcaseCat}>Operational Intelligence</span>
 <h2>Business analytics for smart decisions</h2>
 <p>
 Monitor your shop's health in one place. See monthly repair volumes, discount summaries, outstanding collections, and status distributions on an interactive dashboard.
 </p>
 <div className={styles.featureList}>
 <div className={styles.featureItem}>
 <Check size={18} className={styles.checkIcon} />
 <div className={styles.featureItemText}>
 <h4>Financial Metrics</h4>
 <p>Track revenues, spare part investments, and discount rates instantly.</p>
 </div>
 </div>
 <div className={styles.featureItem}>
 <Check size={18} className={styles.checkIcon} />
 <div className={styles.featureItemText}>
 <h4>Status Percentages</h4>
 <p>Identify bottlenecked or pending jobs immediately using pie charts.</p>
 </div>
 </div>
 </div>

 </div>

 <div className={styles.showcaseVisual}>
 <div className={styles.mockWidget}>
 <div className={styles.mockHeader}>
 <span className={styles.mockTitle}>
 <BarChart3 size={16} style={{ color: "var(--accent)" }} />
 Dashboard Snapshot
 </span>
 <span style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", fontWeight: "600" }}>Live KPI</span>
 </div>
 <div className={styles.mockBody}>
 <div className={styles.chartWrap}>
 <div className={styles.chartGrid}>
 <div className={styles.mockChartCard}>
 <span className={styles.chartCardTitle}>Total Jobsheets</span>
 <span className={styles.statVal}>44</span>
 <span className={styles.statLabel}>+12% this week</span>
 </div>
 <div className={styles.mockChartCard}>
 <span className={styles.chartCardTitle}>Total Revenue</span>
 <span className={styles.statVal}>₹48,200</span>
 <span className={styles.statLabel} style={{ color: "#6366F1" }}>Net Profit</span>
 </div>
 </div>

 <div style={{ display: "flex", gap: "24px", alignItems: "center", width: "100%", justifyContent: "space-around" }}>
 <svg width="100" height="100" viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
 <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ddd" strokeWidth="3.5" />
 {/* Completed Segment (50%) - green */}
 <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="4.2" strokeDasharray="50 100" strokeDashoffset="0" style={{ cursor: "pointer", opacity: selectedSegment === "completed" ? 1 : 0.6 }} onClick={() => setSelectedSegment("completed")} />
 {/* In progress Segment (27%) - orange */}
 <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F59E0B" strokeWidth="4.2" strokeDasharray="27 100" strokeDashoffset="-50" style={{ cursor: "pointer", opacity: selectedSegment === "in-progress" ? 1 : 0.6 }} onClick={() => setSelectedSegment("in-progress")} />
 {/* Initiated Segment (18%) - gray */}
 <circle cx="18" cy="18" r="15.915" fill="none" stroke="#8B8FA3" strokeWidth="4.2" strokeDasharray="18 100" strokeDashoffset="-77" style={{ cursor: "pointer", opacity: selectedSegment === "initiated" ? 1 : 0.6 }} onClick={() => setSelectedSegment("initiated")} />
 {/* Cancelled Segment (5%) - red */}
 <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F20519" strokeWidth="4.2" strokeDasharray="5 100" strokeDashoffset="-95" style={{ cursor: "pointer", opacity: selectedSegment === "cancelled" ? 1 : 0.6 }} onClick={() => setSelectedSegment("cancelled")} />
 </svg>

 <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
 {Object.keys(chartData).map((key) => (
 <div 
 key={key} 
 onClick={() => setSelectedSegment(key)}
 style={{ 
 display: "flex", 
 alignItems: "center", 
 gap: "8px", 
 cursor: "pointer",
 opacity: selectedSegment === key ? 1 : 0.5,
 fontWeight: selectedSegment === key ? "700" : "500",
 fontSize: "12px"
 }}
 >
 <span style={{ width: 8, height: 8, borderRadius: "50%", background: chartData[key].color }} />
 <span style={{ textTransform: "capitalize" }}>{key}:</span>
 <span>{chartData[key].count} ({chartData[key].percent})</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Showcase 4: Team Allocation & Scheduling */}
 <section className={styles.showcaseRow}>
 <div className={styles.showcaseText}>
 <span className={styles.showcaseCat}>Team Operations</span>
 <h2>Assign tasks and balance workloads</h2>
 <p>
 Distribute jobs sheets evenly among technicians. Check individual load metrics to avoid bottlenecks, track task completion timelines, and update roles with custom permissions.
 </p>
 <div className={styles.featureList}>
 <div className={styles.featureItem}>
 <Check size={18} className={styles.checkIcon} />
 <div className={styles.featureItemText}>
 <h4>Specialization Matching</h4>
 <p>Assign hardware vs software tasks to the right technical specialists.</p>
 </div>
 </div>
 <div className={styles.featureItem}>
 <Check size={18} className={styles.checkIcon} />
 <div className={styles.featureItemText}>
 <h4>Backlog Monitoring</h4>
 <p>Instantly see how many pending tickets each team member holds.</p>
 </div>
 </div>
 </div>

 </div>

 <div className={styles.showcaseVisual}>
 <div className={styles.mockWidget}>
 <div className={styles.mockHeader}>
 <span className={styles.mockTitle}>
 <Users size={16} style={{ color: "var(--accent)" }} />
 Technician Scheduling
 </span>
 <span style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", fontWeight: "600" }}>Workloads</span>
 </div>
 <div className={styles.mockBody}>
 <div className={styles.calendarWidget}>
 <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.5)", fontWeight: "600", marginBottom: "8px" }}>SELECT A TECHNICIAN TO VIEW QUEUE</p>
 
 <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
 {techniciansData.map((tech, idx) => (
 <div 
 key={idx} 
 className={styles.techRow}
 onClick={() => setSelectedTech(idx)}
 style={selectedTech === idx ? { borderColor: "var(--accent-light)", background: "var(--accent-soft)" } : {}}
 >
 <div className={styles.techInfo}>
 <div className={styles.techAvatar}>{tech.initials}</div>
 <div>
 <span className={styles.techName}>{tech.name}</span>
 <span className={styles.techRole}>{tech.role}</span>
 </div>
 </div>
 <div className={styles.techStatus}>
 <span 
 className={styles.techBadge} 
 style={{ 
 background: tech.status === "Active" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
 color: tech.status === "Active" ? "var(--success)" : "var(--accent-warm)" 
 }}
 >
 {tech.status}
 </span>
 <span className={styles.techJobsCount}>{tech.jobsCount} jobs</span>
 </div>
 </div>
 ))}
 </div>

 <div style={{ marginTop: "12px", borderTop: "1px dashed rgba(30, 27, 75, 0.1)", paddingTop: "12px" }}>
 <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.5)", fontWeight: "600", marginBottom: "8px" }}>
 ACTIVE QUEUE FOR {techniciansData[selectedTech].name.toUpperCase()}
 </p>
 <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
 {techniciansData[selectedTech].jobs.map((job) => (
 <div 
 key={job.id} 
 style={{ 
 display: "flex", 
 alignItems: "center", 
 justifyContent: "between", 
 background: "#fff", 
 border: "1px solid rgba(30, 27, 75, 0.05)", 
 borderRadius: "6px", 
 padding: "8px 12px", 
 fontSize: "12px" 
 }}
 >
 <span style={{ fontWeight: "700", color: "var(--accent)", marginRight: "12px" }}>{job.id}</span>
 <span style={{ color: "var(--dark)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{job.device}</span>
 </div>
 ))}
 </div>
 </div>

 </div>
 </div>
 </div>
 </div>
 </section>

 </div>

 </div>
 </div>
);
}