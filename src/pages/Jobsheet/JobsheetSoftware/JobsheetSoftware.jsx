import React, { useState } from "react";
import { 
 FileText, 
 Users, 
 Calculator, 
 Clock, 
 FileDown, 
 Settings, 
 Activity, 
 Check, 
 ArrowRight,
 TrendingUp,
 X,
 ShieldCheck,
 ChevronRight
} from "lucide-react";
import styles from "./JobsheetSoftware.module.css";

export default function JobsheetSoftware() {
 // Simulator 1: Dynamic Jobsheet Mockup
 const [jobsheetCount, setJobsheetCount] = useState(1);
 const [customerName, setCustomerName] = useState("Amit Sharma");
 const [deviceModel, setDeviceModel] = useState("iPhone 14");
 const [faultText, setFaultText] = useState("Battery degradation / Quick discharge");

 // Simulator 2: Interactive Cost Estimator
 const [totalServiceCost, setTotalServiceCost] = useState(2000);
 const [discount, setDiscount] = useState(200);
 const [additionalCharges, setAdditionalCharges] = useState(100);

 const finalTotal = Math.max(0, Number(totalServiceCost) - Number(discount) + Number(additionalCharges));

 const incrementJobsheet = () => {
 setJobsheetCount(prev => prev + 1);
 };

 return (
 <div className={styles.jobsheetPageWrapper}>
 
 {/* 1. HERO SECTION */}
 <section className={styles.section}>
 <div className={styles.heroGrid}>
 <div className={styles.heroContent}>
 <div className={styles.badge}>
 <span>🎯 Custom Prefix Numbering Ready</span>
 </div>
 <h1 className={styles.heroTitle}>
 Lock In <span className={styles.gradientText}>Professional Estimates</span> & Service Jobsheets
 </h1>
 <p className={styles.heroSub}>
 SwordNex helps repair operators generate sequential service records, configure labor costing rates, allocate tasks to specialized technicians, and print branded PDF customer receipts.
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

 {/* Interactive Live Jobsheet Mockup */}
 <div className={styles.mockupWidget}>
 <div className={styles.mockHeader}>
 <span className={styles.mockTitle}>
 <FileText size={16} style={{ color: "var(--accent)" }} />
 Jobsheet Intake Workspace
 </span>
 <span style={{ fontSize: "11px", fontWeight: "700", background: "var(--accent-soft)", color: "var(--accent)", padding: "3px 8px", borderRadius: "4px" }}>
 JS-2026-00{jobsheetCount}
 </span>
 </div>

 <div className={styles.formGrid} style={{ marginBottom: "16px" }}>
 <div className={styles.formField}>
 <label>Customer Name</label>
 <input 
 type="text" 
 value={customerName} 
 onChange={(e) => setCustomerName(e.target.value)} 
 />
 </div>
 <div className={styles.formField}>
 <label>Device Model</label>
 <input 
 type="text" 
 value={deviceModel} 
 onChange={(e) => setDeviceModel(e.target.value)} 
 />
 </div>
 </div>

 <div className={styles.formField} style={{ marginBottom: "18px" }}>
 <label>Diagnostic Fault Statement</label>
 <input 
 type="text" 
 value={faultText} 
 onChange={(e) => setFaultText(e.target.value)} 
 />
 </div>

 <button 
 onClick={incrementJobsheet}
 className={styles.btnPrimary} 
 style={{ width: "100%", justifyContent: "center", padding: "10px 18px", fontSize: "13px" }}
 >
 Generate Next Jobsheet (JS-00{jobsheetCount + 1}) <ChevronRight size={14} />
 </button>
 </div>
 </div>
 </section>

 {/* 2. DYNAMIC PRICING ESTIMATOR SIMULATOR */}
 <section className={styles.section} style={{ backgroundColor: "var(--accent-soft)" }}>
 <div className={styles.featHead}>
 <span className={styles.badge}>ESTIMATOR SIMULATOR</span>
 <h2>Automate Custom Pricing Totals</h2>
 <p style={{ color: "rgba(30, 27, 75, 0.6)" }}>
 Experiment with our interactive estimator builder. Drag range parameters to see how total service cost, loyalty discounts, and additional charges calculate dynamically.
 </p>
 </div>

 <div className={styles.builderBox}>
 <div className={styles.builderInputs}>
 <h3>Adjust Billing Sliders</h3>

 <div className={styles.builderGroup}>
 <label>
 Total Service Cost (₹): <span>₹ {totalServiceCost}</span>
 </label>
 <input 
 type="range" 
 min="100" 
 max="15000" 
 step="100"
 value={totalServiceCost}
 onChange={(e) => setTotalServiceCost(Number(e.target.value))}
 className={styles.builderRange}
 />
 </div>

 <div className={styles.builderGroup}>
 <label>
 Discount (₹): <span>₹ {discount}</span>
 </label>
 <input 
 type="range" 
 min="0" 
 max="2000" 
 step="50"
 value={discount}
 onChange={(e) => setDiscount(Number(e.target.value))}
 className={styles.builderRange}
 />
 </div>

 <div className={styles.builderGroup}>
 <label>
 Additional Charges (₹): <span>₹ {additionalCharges}</span>
 </label>
 <input 
 type="range" 
 min="0" 
 max="2000" 
 step="50"
 value={additionalCharges}
 onChange={(e) => setAdditionalCharges(Number(e.target.value))}
 className={styles.builderRange}
 />
 </div>
 </div>

 <div className={styles.builderPanel}>
 <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(30, 27, 75, 0.5)", textTransform: "uppercase", marginBottom: "16px", letterSpacing: "0.5px" }}>
 Dynamic Billing Receipt
 </div>

 <div className={styles.calcRow}>
 <span>Total Service Cost (Incl. Parts & Labor)</span>
 <strong>₹ {totalServiceCost.toLocaleString("en-IN")}</strong>
 </div>

 <div className={styles.calcRow} style={{ color: "var(--accent)" }}>
 <span>Discount Deductions</span>
 <strong>- ₹ {discount.toLocaleString("en-IN")}</strong>
 </div>

 <div className={styles.calcRow}>
 <span>Additional Charges</span>
 <strong>+ ₹ {additionalCharges.toLocaleString("en-IN")}</strong>
 </div>

 <div className={styles.calcDivider} />

 <div className={`${styles.calcRow} ${styles.calcRowActive}`}>
 <span style={{ fontSize: "15px" }}>Calculated Net Cost</span>
 <strong style={{ fontSize: "20px" }}>₹ {finalTotal.toLocaleString("en-IN")}</strong>
 </div>
 </div>
 </div>
 </section>

 {/* 3. CAPABILITIES GRID */}
 <section className={styles.section}>
 <div className={styles.featHead}>
 <span className={styles.badge}>KEY CAPABILITIES</span>
 <h2>Everything Built For Efficient Service</h2>
 <p style={{ color: "rgba(30, 27, 75, 0.6)" }}>
 Eliminate traditional service logs and excel spreadsheets. Manage operations using our tailor-made features.
 </p>
 </div>

 <div className={styles.featGrid}>
 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <FileText size={22} />
 </div>
 <h3>Structured Intake Forms</h3>
 <p>Input unique client details, device metadata, faults, and serial numbers. Save partial drafts to complete later.</p>
 </div>

 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <Users size={22} />
 </div>
 <h3>Technician Assignments</h3>
 <p>Allocate tasks to specific department experts based on workload schedules and specialization metrics.</p>
 </div>

 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <Calculator size={22} />
 </div>
 <h3>Cost Estimation Logs</h3>
 <p>Document estimates clearly before initiating repairs. Log total service costs, apply discounts, and factor in additional charges.</p>
 </div>

 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <Clock size={22} />
 </div>
 <h3>Real-Time Statuses</h3>
 <p>Update ticket records to Initiated, In-Progress, Completed, or Cancelled to automatically notify team members.</p>
 </div>

 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <FileDown size={22} />
 </div>
 <h3>PDF/CSV Generators</h3>
 <p>Download clean, branded PDF summaries for customer receipts and export complete logs to CSV databases.</p>
 </div>

 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <Settings size={22} />
 </div>
 <h3>Admin Controls</h3>
 <p>Lock numbering formats, manage permission credentials, and secure sensitive financial reporting datasets.</p>
 </div>
 </div>
 </section>

 {/* 4. COMPARISON MATRIX */}
 <section className={styles.section} style={{ backgroundColor: "var(--accent-soft)" }}>
 <div className={styles.featHead}>
 <span className={styles.badge}>COMPARISON MATRIX</span>
 <h2>Ditch Excel Spreadsheets For SwordNex</h2>
 <p style={{ color: "rgba(30, 27, 75, 0.6)" }}>
 See how manual paper entries compare against our cloud-based Jobsheet Database engine.
 </p>
 </div>

 <div className={styles.tableWrapper}>
 <table className={styles.matrixTable}>
 <thead>
 <tr>
 <th>System Capabilities</th>
 <th>Manual / Excel Sheets</th>
 <th>SwordNex Jobsheet</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className={styles.matrixFeature}>Sequential Auto-Numbering</td>
 <td className={styles.matrixCross}>❌ High Error Rates</td>
 <td className={styles.matrixCheck}>✅ 100% Locked & Automated</td>
 </tr>
 <tr>
 <td className={styles.matrixFeature}>Technician Agenda Calendars</td>
 <td className={styles.matrixCross}>❌ Manual Tracking Required</td>
 <td className={styles.matrixCheck}>✅ Live Agenda Workspace Views</td>
 </tr>
 <tr>
 <td className={styles.matrixFeature}>Comprehensive Cost Estimates</td>
 <td className={styles.matrixCross}>❌ Hand-written Computations</td>
 <td className={styles.matrixCheck}>✅ Auto-Calculated Service Totals</td>
 </tr>
 <tr>
 <td className={styles.matrixFeature}>Branded Customer Handover PDFs</td>
 <td className={styles.matrixCross}>❌ Hard-copy carbon papers</td>
 <td className={styles.matrixCheck}>✅ Dynamic 1-Click Generated PDF</td>
 </tr>
 <tr>
 <td className={styles.matrixFeature}>Operator Role Permission Access</td>
 <td className={styles.matrixCross}>❌ Easily Tampered Files</td>
 <td className={styles.matrixCheck}>✅ Encrypted Credentials Security</td>
 </tr>
 </tbody>
 </table>
 </div>
 </section>

 {/* 5. CHECKLIST GRID */}
 <section className={styles.section}>
 <div className={styles.featHead}>
 <span className={styles.badge}>DASHBOARD CHECKLIST</span>
 <h2>Complete Support Specifications</h2>
 <p style={{ color: "rgba(30, 27, 75, 0.6)" }}>
 Verify all specific functions packed inside our Jobsheet software module.
 </p>
 </div>

 <div className={styles.checkGrid}>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Jobsheet generation and tracking</span>
 </div>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Technician allocation and workload status</span>
 </div>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Calendar scheduler view of active tickets</span>
 </div>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Problem specifications and fault logs</span>
 </div>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Total service cost, discount, and additional charges configuration</span>
 </div>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Role credentials permissions for staff</span>
 </div>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Auto-saving drafts cache to prevent data losses</span>
 </div>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Export database registries to CSV ledgers</span>
 </div>
 </div>
 </section>

 {/* 6. GLOWING CALL TO ACTION */}
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
