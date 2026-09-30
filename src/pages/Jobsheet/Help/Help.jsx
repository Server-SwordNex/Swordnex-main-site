import React, { useState } from "react";
import { 
 Search, 
 FileText, 
 Users, 
 Activity, 
 Calculator, 
 FileDown, 
 Settings, 
 AlertTriangle,
 Mail,
 ArrowRight
} from "lucide-react";
import styles from "./Help.module.css";

export default function Help() {
 const [activeTab, setActiveTab] = useState("getting-started");
 const [searchQuery, setSearchQuery] = useState("");

 const helpArticles = [
 {
 id: "getting-started",
 title: "Getting Started with SwordNex",
 icon: Settings,
 intro: "Welcome to SwordNex Jobsheet! This quick-start guide will help you configure your shop details, brand settings, and lock your customized numbering format rules.",
 sections: [
 {
 title: "1. Lock Company Parameters",
 steps: [
 "Navigate to the Settings tab from the sidebar menu dashboard.",
 "Input your shop's official business name, registered GSTIN, logo, and active support emails.",
 "Click 'Save Configurations' to apply parameters across all created jobsheets."
 ]
 },
 {
 title: "2. Lock Prefix & Numbering Rules",
 steps: [
 "In Settings, scroll to the 'Jobsheet Numbering Format' configuration.",
 "Define your custom prefix (e.g. JS-), suffix (e.g. -2026), and counter start value (e.g., 001).",
 "This locks numbering layout formats globally to ensure uniform auditing across all operators."
 ]
 }
 ]
 },
 {
 id: "jobsheet-management",
 title: "Creating & Editing Jobsheets",
 icon: FileText,
 intro: "Learn how to record service orders, diagnostic symptoms, serial number categories, and device details using intake form fields.",
 sections: [
 {
 title: "1. Fill Intake Metadata",
 steps: [
 "Open 'Create Jobsheet' from the main dashboard navigation drawer.",
 "Enter customer details: Customer Name, Active Mobile Number, City, and State.",
 "Provide repair item parameters: Product Category (e.g., Mobile, Laptop), Brand name, unique Serial Number, and Fault Statement."
 ]
 },
 {
 title: "2. Draft Auto-Saving Rules",
 steps: [
 "If you get interrupted, click the 'Save as Draft' button at the bottom of the intake layout.",
 "This saves half-completed forms securely into the 'Drafts' page registry.",
 "To resume editing, go to the Drafts dashboard, search the customer name, and click 'Resume Edit'."
 ]
 }
 ]
 },
 {
 id: "technician-allocation",
 title: "Technician & Workload Scheduler",
 icon: Users,
 intro: "Balance department loads by assigning diagnostic and micro-soldering tasks to the right specialists.",
 sections: [
 {
 title: "1. Map Jobs to Specialists",
 steps: [
 "In the 'Create Jobsheet' form, locate the 'Assign Specialist' drop-down selector.",
 "Choose a technician (e.g., hardware chips level Specialization vs OS diagnostics expert).",
 "The technician will instantly see the ticket in their active queues."
 ]
 },
 {
 title: "2. Monitor Load Bottlenecks",
 steps: [
 "Navigate to the 'Technicians' directory list from the main drawer menu.",
 "Check active loads: the dashboard displays active jobs metrics for Rohan, Sneha, Amit, etc.",
 "Avoid dispatch delays by shifting new tickets to active technicians with lower task metrics."
 ]
 }
 ]
 },
 {
 id: "status-lifecycles",
 title: "Repair Lifecycles & Status Timeline",
 icon: Activity,
 intro: "Follow repair milestones in real time. Standard status updates automatically write to the audit ledger.",
 sections: [
 {
 title: "1. Enforce Lifecycle States",
 steps: [
 "Initiated: Represents ticket check-in (customer details registered, device specs locked).",
 "In-Progress: Diagnostics, chip level repairs, or motherboard soldering is underway.",
 "Completed: Repair is validated, pricing totals compiled, and ready for handover.",
 "Cancelled: Job is suspended (e.g., waiting for parts authorization or client disapproval)."
 ]
 },
 {
 title: "2. Audit Ledger Timestamps",
 steps: [
 "Every status update automatically registers a history event.",
 "The log documents the time (hour/minute/second), change type, and operator username.",
 "Access the log row history directly on the active jobsheet view."
 ]
 }
 ]
 },
 {
 id: "pricing-calculator",
 title: "Cost Estimations & Total Pricing",
 icon: Calculator,
 intro: "Log total service costs (including parts and labor), discount deductions, and additional charges with dynamic total calculations.",
 sections: [
 {
 title: "1. Cost Field Configs",
 steps: [
 "Total Service Cost: Log the combined cost of replacement parts and technical labor.",
 "Discount: Insert custom loyalty promo deductions or discount percentages.",
 "Additional Charges: Add custom extra charges (e.g., expedited shipping, handling fee)."
 ]
 },
 {
 title: "2. Automatic Estimations",
 steps: [
 "The system auto-calculates totals instantly using the formula: Net Cost = Total Service Cost - Discount + Additional Charges.",
 "Estimates are locked to prevent manual calculation errors during client checkouts."
 ]
 }
 ]
 },
 {
 id: "exports-receipts",
 title: "PDF Receipts & CSV Exports",
 icon: FileDown,
 intro: "Download professional branded receipt copies for customers and CSV ledgers for office analysis.",
 sections: [
 {
 title: "1. Print PDF Receipts",
 steps: [
 "Open the completed jobsheet from the Job Sheets registry database.",
 "Click 'Generate PDF Receipt'. The system compiles brand logo, terms, pricing breakdown, and tech signature.",
 "Download or print the document instantly to share with clients."
 ]
 },
 {
 title: "2. CSV Ledger Database Downloads",
 steps: [
 "Go to the Reports or Job Sheets directory.",
 "Filter the list by date range, technician names, or status category.",
 "Click 'Export CSV Ledger' to download a spreadsheet containing full audit data."
 ]
 }
 ]
 }
 ];

 // Filter tabs/articles by search query
 const filteredArticles = helpArticles.filter(art => 
 art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
 art.intro.toLowerCase().includes(searchQuery.toLowerCase()) ||
 art.sections.some(sec => sec.title.toLowerCase().includes(searchQuery.toLowerCase()))
 );

 const activeArticle = filteredArticles.find(art => art.id === activeTab) || filteredArticles[0] || helpArticles[0];

 const toggleFaq = (index) => {
 // Keep reference structure intact if needed, otherwise noop
 };

 return (
 <div className={styles.helpContainer}>
 
 {/* Page Header */}
 <div className={styles.helpContent}>
 <header className={styles.headerSection}>
 <span className={styles.badge}>Help Directory</span>
 <h1 className={styles.title}>SwordNex Knowledge Base</h1>
 <p className={styles.desc}>
 Explore step-by-step instructions and guides gathered from the entire SwordNex Jobsheet software system.
 </p>
 </header>

 {/* Search Input */}
 <div className={styles.searchWrapper}>
 <Search size={18} className={styles.searchIcon} />
 <input 
 type="text" 
 placeholder="Search help articles (e.g. prefix, draft, status)..." 
 value={searchQuery}
 onChange={(e) => {
 setSearchQuery(e.target.value);
 const firstMatch = helpArticles.find(art => 
 art.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
 art.intro.toLowerCase().includes(e.target.value.toLowerCase())
 );
 if (firstMatch) {
 setActiveTab(firstMatch.id);
 }
 }}
 className={styles.searchInput}
 />
 </div>

 {/* Directory Layout */}
 <div className={styles.layout}>
 
 {/* Sidebar Navigation */}
 <nav className={styles.sidebar}>
 {filteredArticles.map((art) => {
 const IconComp = art.icon;
 return (
 <button
 key={art.id}
 className={`${styles.tabBtn} ${activeTab === art.id ? styles.tabBtnActive : ""}`}
 onClick={() => setActiveTab(art.id)}
 >
 <IconComp size={16} />
 {art.title.replace("Getting Started with ", "").replace("Creating & Editing ", "")}
 </button>
 );
 })}
 {filteredArticles.length === 0 && (
 <span style={{ fontSize: "13px", color: "rgba(30, 27, 75, 0.4)", padding: "10px" }}>
 No matching topics found.
 </span>
 )}
 </nav>

 {/* Main Article Display */}
 <article className={styles.articleWrapper}>
 <h2 className={styles.articleTitle}>
 {activeArticle.title}
 </h2>
 <p className={styles.articleIntro}>
 {activeArticle.intro}
 </p>

 {activeArticle.sections.map((sec, idx) => (
 <div key={idx} className={styles.guideSection}>
 <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accent)" }}>
 {sec.title}
 </h3>
 <div className={styles.guideStepList}>
 {sec.steps.map((step, stepIdx) => (
 <div key={stepIdx} className={styles.guideStepItem}>
 <span className={styles.stepNum}>{stepIdx + 1}</span>
 <span>{step}</span>
 </div>
 ))}
 </div>
 </div>
 ))}

 {/* Warning Callout */}
 <div className={styles.alertBox}>
 <AlertTriangle size={18} className={styles.alertIcon} style={{ flexShrink: 0 }} />
 <div>
 <strong>Important Access Guideline:</strong> Remember that lock configurations (prefixes, numbering counters, and staff user profile lists) require Service Admin or Superadmin role privileges to modify. Regular operators hold view-only permissions.
 </div>
 </div>
 </article>
 </div>

 {/* Bottom Support Callout */}
 <section className={styles.supportSection}>
 <h3>Still need technical assistance?</h3>
 <p>
 Our customer success operators are active Monday - Saturday, 9:30 AM - 7:00 PM IST to help resolve configurations bottlenecks.
 </p>
 <a href="/support" className={styles.tabBtn} style={{ display: "inline-flex", textDecoration: "none", background: "var(--accent)", color: "white", width: "auto", padding: "12px 24px" }}>
 <Mail size={16} style={{ marginRight: "8px" }} />
 Contact Live Support <ArrowRight size={16} style={{ marginLeft: "8px" }} />
 </a>
 </section>
 </div>

 </div>
 );
}