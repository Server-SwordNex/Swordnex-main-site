import React, { useState } from "react";
import { 
 ShieldCheck, 
 Users, 
 FileText, 
 Check, 
 Settings,
 TrendingUp,
 ArrowRight,
 ChevronRight,
 Clock,
 Calculator,
 Calendar,
 Layers,
 Sparkles
} from "lucide-react";
import { toast } from "react-toastify";
import styles from "./JobsheetSmallBusiness.module.css";

export default function JobsheetSmallBusiness() {
 // Simulator 1: Technician Dispatch Board
 const [selectedTicketId, setSelectedTicketId] = useState("JS-1025");
 const [tickets, setTickets] = useState([
 { id: "JS-1025", name: "iPhone 14 Screen Repair" },
 { id: "JS-1026", name: "MacBook Air Liquid Diagnostic" },
 { id: "JS-1027", name: "iPad Charging Port Swapping" }
 ]);

 const [techs, setTechs] = useState([
 { id: "sneha", name: "Sneha (Hardware Expert)", workload: 1 },
 { id: "amit", name: "Amit (Software Specialist)", workload: 2 }
 ]);

 const handleSelectTicket = (id) => {
 setSelectedTicketId(id);
 };

 const handleDispatchTicket = (techId) => {
 if (!selectedTicketId) {
 toast.info("Please select a ticket from the unassigned pool first.");
 return;
 }

 const assignedTicket = tickets.find(t => t.id === selectedTicketId);
 if (!assignedTicket) return;

 // Update technician workload
 setTechs(prev => prev.map(t => {
 if (t.id === techId) {
 return { ...t, workload: t.workload + 1 };
 }
 return t;
 }));

 // Remove ticket from pool
 setTickets(prev => prev.filter(t => t.id !== selectedTicketId));
 
 // Clear selection
 const remainingTickets = tickets.filter(t => t.id !== selectedTicketId);
 setSelectedTicketId(remainingTickets.length > 0 ? remainingTickets[0].id : null);

 toast.success(`Successfully dispatched ${assignedTicket.name} to ${techs.find(t => t.id === techId).name}!`);
 };

 // Simulator 2: Unified Pricing Cost Sandbox
 const [totalServiceCost, setTotalServiceCost] = useState(3500);
 const [discount, setDiscount] = useState(500);
 const [additionalCharges, setAdditionalCharges] = useState(300);

 const finalTotal = Math.max(0, Number(totalServiceCost) - Number(discount) + Number(additionalCharges));

 return (
 <div className={styles.smallBPageWrapper}>
 
 {/* 1. HERO SECTION & DISPATCH BOARD */}
 <section className={styles.section}>
 <div className={styles.heroGrid}>
 <div className={styles.heroContent}>
 <div className={styles.badge}>
 <span>📈 Built For Growing Repair Shops</span>
 </div>
 <h1 className={styles.heroTitle}>
 Scale Your Small Business With <span className={styles.gradientText}>Intelligent Workflows</span>
 </h1>
 <p className={styles.heroSub}>
 SwordNex Jobsheet helps small and medium repair centers track device repair progress, allocate jobs to available staff, and manage estimates without Excel clutter.
 </p>
 <div className={styles.heroActions}>
 <a href="/register" className={styles.btnPrimary}>
 Start Free Trial <ArrowRight size={18} />
 </a>
 <a href="/support" className={styles.btnSecondary}>
 Request a Demo
 </a>
 </div>
 <span className={styles.heroMeta}>No complex installations • Access from any device</span>
 </div>

 {/* Interactive Workload Dispatch Sandbox */}
 <div className={styles.mockupWidget}>
 <div className={styles.mockHeader}>
 <span className={styles.mockTitle}>
 <Layers size={16} style={{ color: "var(--accent)" }} />
 Technician Workload Dispatch
 </span>
 <span style={{ fontSize: "11px", fontWeight: "700", background: "var(--accent-soft)", color: "var(--accent)", padding: "3px 8px", borderRadius: "4px" }}>
 Live Sandbox
 </span>
 </div>

 <div className={styles.dispatchSandbox}>
 
 {/* Unassigned Pool */}
 <div>
 <span className={styles.sandboxLabel}>1. Select Unassigned Repair Ticket</span>
 <div className={styles.ticketPool} style={{ marginTop: "6px" }}>
 {tickets.length === 0 ? (
 <div style={{ padding: "16px", textAlign: "center", background: "rgba(30, 27, 75, 0.02)", border: "1px dashed rgba(30, 27, 75, 0.1)", borderRadius: "8px", fontSize: "12.5px", color: "rgba(30, 27, 75, 0.5)" }}>
 🎉 All tickets dispatched successfully!
 </div>
 ) : (
 tickets.map(t => (
 <div 
 key={t.id}
 className={`${styles.ticketCard} ${selectedTicketId === t.id ? styles.ticketCardSelected : ""}`}
 onClick={() => handleSelectTicket(t.id)}
 >
 <div className={styles.ticketInfo}>
 <span className={styles.ticketId}>{t.id}</span>
 <span className={styles.ticketName}>{t.name}</span>
 </div>
 <span style={{ fontSize: "11px", opacity: 0.6 }}>Click to select</span>
 </div>
 ))
 )}
 </div>
 </div>

 {/* Dispatch Action */}
 <div>
 <span className={styles.sandboxLabel}>2. Dispatch to Available Technician</span>
 <div className={styles.techDispatchGrid} style={{ marginTop: "6px" }}>
 {techs.map(tech => (
 <div 
 key={tech.id} 
 className={styles.techCard}
 onClick={() => handleDispatchTicket(tech.id)}
 >
 <div className={styles.techAvatar}>
 {tech.name[0]}
 </div>
 <span className={styles.techName}>{tech.name.split(" ")[0]}</span>
 <span className={styles.techWorkload}>
 Active: {tech.workload} {tech.workload === 1 ? "Job" : "Jobs"}
 </span>
 <button 
 className={styles.btnPrimary} 
 style={{ padding: "6px 10px", fontSize: "10.5px", borderRadius: "4px", width: "100%", justifyContent: "center", marginTop: "4px" }}
 >
 Assign Ticket
 </button>
 </div>
 ))}
 </div>
 </div>

 </div>
 </div>
 </div>
 </section>

 {/* 2. DYNAMIC UNIFIED PRICING SIMULATOR */}
 <section className={styles.section} style={{ backgroundColor: "var(--accent-soft)" }}>
 <div className={styles.featHead}>
 <span className={styles.badge}>ESTIMATOR SANDBOX</span>
 <h2>Consistent & Error-Free Invoicing</h2>
 <p style={{ color: "rgba(30, 27, 75, 0.6)" }}>
 Never double-bill or write incorrect totals. Drag the sliders to see how service charges, discounts, and additional fees automatically calculate customer balances.
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
 min="500" 
 max="20000" 
 step="100"
 value={totalServiceCost}
 onChange={(e) => setTotalServiceCost(Number(e.target.value))}
 className={styles.builderRange}
 />
 </div>

 <div className={styles.builderGroup}>
 <label>
 Discount Deductions (₹): <span>₹ {discount}</span>
 </label>
 <input 
 type="range" 
 min="0" 
 max="3000" 
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
 max="3000" 
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
 <span>Loyalty Deductions</span>
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
 <Calendar size={22} />
 </div>
 <h3>Calendar Agendas</h3>
 <p>Track service timelines & due dates. Visual overview of pending repairs to avoid scheduling conflicts.</p>
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
 <Settings size={22} />
 </div>
 <h3>Admin Controls</h3>
 <p>Lock numbering formats, manage permission credentials, and secure sensitive financial reporting datasets.</p>
 </div>
 </div>
 </section>

 {/* 4. SHOP OPERATIONS CHECKLIST */}
 <section className={styles.section} style={{ backgroundColor: "var(--accent-soft)" }}>
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

 {/* 5. GLOWING CALL TO ACTION */}
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
