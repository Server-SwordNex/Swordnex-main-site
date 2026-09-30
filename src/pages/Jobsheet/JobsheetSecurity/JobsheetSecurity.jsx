import React, { useState } from "react";
import { 
 ShieldCheck, 
 Lock, 
 ArrowRight, 
 FileText, 
 Check, 
 Users, 
 Settings,
 TrendingUp
} from "lucide-react";
import styles from "./JobsheetSecurity.module.css";

export default function JobsheetSecurity() {
 // Simulator 1: Role Permissions Sandbox
 const [activeRole, setActiveRole] = useState("technician"); // admin, manager, technician

 return (
 <div className={styles.securityPageWrapper}>
 
 {/* 1. HERO SECTION & ROLE SIMULATOR */}
 <section className={styles.section}>
 <div className={styles.heroGrid}>
 <div className={styles.heroContent}>
 <div className={styles.badge}>
 <span>🛡️ Bank-Grade Security Protocol</span>
 </div>
 <h1 className={styles.heroTitle}>
 Enforce Granular Permissions & <span className={styles.gradientText}>Lock Down Service Logs</span>
 </h1>
 <p className={styles.heroSub}>
 SwordNex Jobsheet protects sensitive client metrics and financial ledgers using enterprise-grade databases, granular permission controls, and continuous audit logging.
 </p>
 <div className={styles.heroActions}>
 <a href="/register" className={styles.btnPrimary}>
 Start Secure Trial <ArrowRight size={18} />
 </a>
 <a href="/support" className={styles.btnSecondary}>
 Request a Demo
 </a>
 </div>
 <span className={styles.heroMeta}>Fully compliant with privacy frameworks • Secure cloud nodes</span>
 </div>

 {/* Interactive Role Permissions Simulator */}
 <div className={styles.mockupWidget}>
 <div className={styles.mockHeader}>
 <span className={styles.mockTitle}>
 <ShieldCheck size={16} style={{ color: "var(--accent)" }} />
 Workspace Access Level preview
 </span>
 <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--accent)" }}>
 Role: {activeRole}
 </span>
 </div>

 {/* Role Tabs */}
 <div className={styles.roleSelector}>
 <button 
 onClick={() => setActiveRole("admin")}
 className={`${styles.roleBtn} ${activeRole === "admin" ? styles.roleBtnActive : ""}`}
 >
 Administrator
 </button>
 <button 
 onClick={() => setActiveRole("manager")}
 className={`${styles.roleBtn} ${activeRole === "manager" ? styles.roleBtnActive : ""}`}
 >
 Store Manager
 </button>
 <button 
 onClick={() => setActiveRole("technician")}
 className={`${styles.roleBtn} ${activeRole === "technician" ? styles.roleBtnActive : ""}`}
 >
 Technician
 </button>
 </div>

 {/* Permissions Panel */}
 <div className={styles.permissionsPanel}>
 
 {/* Row 1: Create Jobsheets */}
 <div className={styles.panelRow}>
 <div className={styles.panelRowLeft}>
 <FileText size={16} style={{ color: "var(--dark)" }} />
 <span>Create/Modify Jobsheets</span>
 </div>
 <span className={styles.checkIndicator}>✅ Authorized</span>
 </div>

 {/* Row 2: Configure Workflows */}
 <div className={styles.panelRow}>
 <div className={styles.panelRowLeft}>
 <Settings size={16} style={{ color: "var(--dark)" }} />
 <span>Configure Settings & Prefixes</span>
 </div>
 {activeRole === "technician" ? (
 <span className={styles.lockIndicator}>
 <Lock size={12} /> Redacted
 </span>
 ) : (
 <span className={styles.checkIndicator}>✅ Authorized</span>
 )}
 </div>

 {/* Row 3: Financial metrics */}
 <div className={styles.panelRow}>
 <div className={`${styles.panelRowLeft} ${activeRole === "technician" ? styles.redactedArea : ""}`}>
 <TrendingUp size={16} style={{ color: "var(--dark)" }} />
 <span>View Store Revenue & Estimations</span>
 {activeRole === "technician" && <span className={styles.redactedOverlay}>Access Denied</span>}
 </div>
 {activeRole === "technician" ? (
 <span className={styles.lockIndicator}>
 <Lock size={12} /> Restricted
 </span>
 ) : (
 <span className={styles.checkIndicator}>✅ Authorized</span>
 )}
 </div>

 {/* Row 4: Users configuration */}
 <div className={styles.panelRow}>
 <div className={`${styles.panelRowLeft} ${activeRole !== "admin" ? styles.redactedArea : ""}`}>
 <Users size={16} style={{ color: "var(--dark)" }} />
 <span>Add/Remove Staff Members</span>
 {activeRole !== "admin" && <span className={styles.redactedOverlay}>Access Denied</span>}
 </div>
 {activeRole === "admin" ? (
 <span className={styles.checkIndicator}>✅ Authorized</span>
 ) : (
 <span className={styles.lockIndicator}>
 <Lock size={12} /> Restricted
 </span>
 )}
 </div>

 </div>
 </div>
 </div>
 </section>

 {/* 4. COMPLIANCE CHECKLIST */}
 <section className={styles.section} style={{ backgroundColor: "var(--accent-soft)" }}>
 <div className={styles.featHead}>
 <span className={styles.badge}>DATA PRIVACY STANDARD</span>
 <h2>Compliant Operations Checklist</h2>
 <p style={{ color: "rgba(30, 27, 75, 0.6)" }}>
 Verify the security features that protect client details in accordance with privacy laws.
 </p>
 </div>

 <div className={styles.checkGrid}>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Granular permission controls for staff members</span>
 </div>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Automated encrypted cloud backups across multiple nodes</span>
 </div>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Immutable history log trails for auditing</span>
 </div>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Tokenized logins with automated expiration sessions</span>
 </div>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>GDPR compliance controls for customer profiles</span>
 </div>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Zero selling or sharing of store registries</span>
 </div>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Secure file transfers and dynamic PDF generation</span>
 </div>
 <div className={styles.checkItem}>
 <Check size={18} className={styles.checkIcon} />
 <span>Highly secure data backups across geographical cloud regions</span>
 </div>
 </div>
 </section>

 {/* 5. CTA SECTION */}
 <section className={styles.section}>
 <div className={styles.ctaWrapper}>
 <div className={styles.ctaGlow} />
 <h2>Protect Your Customer & Service Data</h2>
 <p>
 Join thousands of repair shops that trust SwordNex to manage their logs, staff, and estimations securely.
 </p>
 <div className={styles.ctaBtnGroup}>
 <a href="/register" className={styles.btnPrimary}>
 Get Started Today <ArrowRight size={18} />
 </a>
 <a href="/support" className={styles.btnSecondary} style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}>
 Contact Security Expert
 </a>
 </div>
 </div>
 </section>

 </div>
 );
}
