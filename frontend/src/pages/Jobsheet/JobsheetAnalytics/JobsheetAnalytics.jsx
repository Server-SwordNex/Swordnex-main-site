import React, { useState, useEffect } from "react";
import { 
 TrendingUp, 
 Clock, 
 Users, 
 Smartphone, 
 CheckCircle, 
 ArrowRight, 
 Zap, 
 ShieldCheck, 
 BarChart2, 
 ChevronRight 
} from "lucide-react";
import { toast } from "react-toastify";
import styles from "./JobsheetAnalytics.module.css";

export default function JobsheetAnalytics() {
 const [activeTab, setActiveTab] = useState("revenue");

 useEffect(() => {
 document.title = "Business Analytics & Reports | SwordNex Jobsheet";
 }, []);

 const handleTabChange = (tabName) => {
 setActiveTab(tabName);
 const labelMap = {
 revenue: "Revenue Stream Data",
 tat: "Turnaround Time (TAT) Metrics",
 techs: "Technician Productivity Scores"
 };
 toast.info(`Switched simulator to ${labelMap[tabName]}`, {
 toastId: tabName, // prevent multiple duplicate toasts
 autoClose: 2000
 });
 };

 return (
 <div className={styles.analyticsPageWrapper}>
 
 {/* 1. HERO SECTION & LIVE BI SIMULATOR */}
 <section className={styles.section}>
 <div className={styles.heroGrid}>
 <div className={styles.heroContent}>
 <div className={styles.badge}>
 <span>📊 Business Intelligence & Reporting</span>
 </div>
 <h1 className={styles.heroTitle}>
 Turn Repair Logs into <span className={styles.gradientText}>Actionable Intelligence</span>
 </h1>
 <p className={styles.heroSub}>
 Gain deep visibility into your workshop operations. Monitor revenue breakdown, technician speeds, and service turnaround times in real time with automated reporting.
 </p>
 <div className={styles.heroActions}>
 <a href="/register" className={styles.btnPrimary}>
 Try Live Reporting <ArrowRight size={18} />
 </a>
 <a href="#features" className={styles.btnSecondary}>
 Explore Analytics Suite
 </a>
 </div>
 <span className={styles.heroMeta}>Fully integrated with dispatching modules • Setup in 2 minutes</span>
 </div>

 {/* Interactive BI Dashboard Simulator */}
 <div className={styles.dashboardSimulator}>
 <div className={styles.simHeader}>
 <div className={styles.simTitle}>
 <span className={styles.simBadge}>Live BI simulator</span>
 <span style={{ fontSize: "11px", fontWeight: "700", color: "rgba(30, 27, 75, 0.4)", textTransform: "uppercase" }}>Real-time updates</span>
 </div>
 <div className={styles.simTabs}>
 <button 
 className={`${styles.simTabBtn} ${activeTab === "revenue" ? styles.simTabBtnActive : ""}`}
 onClick={() => handleTabChange("revenue")}
 >
 Revenue Performance
 </button>
 <button 
 className={`${styles.simTabBtn} ${activeTab === "tat" ? styles.simTabBtnActive : ""}`}
 onClick={() => handleTabChange("tat")}
 >
 Turnaround Time
 </button>
 <button 
 className={`${styles.simTabBtn} ${activeTab === "techs" ? styles.simTabBtnActive : ""}`}
 onClick={() => handleTabChange("techs")}
 >
 Technician Leaderboard
 </button>
 </div>
 </div>

 <div className={styles.simBody}>
 
 {activeTab === "revenue" && (
 <div>
 {/* Overview Stats */}
 <div className={styles.statsOverviewGrid}>
 <div className={styles.statCard}>
 <span className={styles.statLbl}>Total Revenue</span>
 <span className={styles.statVal}>₹2,84,500</span>
 <span className={styles.statTrend}>
 <TrendingUp size={12} /> +14.2% this mo
 </span>
 </div>
 <div className={styles.statCard}>
 <span className={styles.statLbl}>Invoices Filled</span>
 <span className={styles.statVal}>184 Jobs</span>
 <span className={styles.statTrend}>
 <TrendingUp size={12} /> +8.5%
 </span>
 </div>
 <div className={styles.statCard}>
 <span className={styles.statLbl}>Avg. Ticket</span>
 <span className={styles.statVal}>₹1,546</span>
 <span className={styles.statTrend}>
 <TrendingUp size={12} /> +5.3%
 </span>
 </div>
 </div>

 {/* Graphical Visualization */}
 <div className={styles.visualSection}>
 <div className={styles.visualTitle}>Revenue Category Share</div>
 
 <div className={styles.progressBarWrapper}>
 <div className={styles.progressBarHeader}>
 <span>Mobile & Smartphone Repairs</span>
 <span>54% (₹1,53,630)</span>
 </div>
 <div className={styles.progressBarContainer}>
 <div className={styles.progressBarFill} style={{ width: "54%" }}></div>
 </div>
 </div>

 <div className={styles.progressBarWrapper}>
 <div className={styles.progressBarHeader}>
 <span>Laptop & PC Systems</span>
 <span>32% (₹91,040)</span>
 </div>
 <div className={styles.progressBarContainer}>
 <div className={styles.progressBarFill} style={{ width: "32%", background: "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)" }}></div>
 </div>
 </div>

 <div className={styles.progressBarWrapper}>
 <div className={styles.progressBarHeader}>
 <span>Gaming Consoles & Smart Tech</span>
 <span>14% (₹39,830)</span>
 </div>
 <div className={styles.progressBarContainer}>
 <div className={styles.progressBarFill} style={{ width: "14%", background: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)" }}></div>
 </div>
 </div>

 </div>
 </div>
 )}

 {activeTab === "tat" && (
 <div>
 {/* Overview Stats */}
 <div className={styles.statsOverviewGrid}>
 <div className={styles.statCard}>
 <span className={styles.statLbl}>Avg. Completion</span>
 <span className={styles.statVal}>2.1 Hours</span>
 <span className={styles.statTrend}>
 <Clock size={12} style={{ color: "var(--success)" }} /> -18.4% faster
 </span>
 </div>
 <div className={styles.statCard}>
 <span className={styles.statLbl}>Same-Day Fixes</span>
 <span className={styles.statVal}>88.5%</span>
 <span className={styles.statTrend}>
 <TrendingUp size={12} /> +4.2%
 </span>
 </div>
 <div className={styles.statCard}>
 <span className={styles.statLbl}>Current Backlog</span>
 <span className={styles.statVal}>12 Tickets</span>
 <span className={styles.statTrend}>
 <Clock size={12} style={{ color: "var(--success)" }} /> -15.0% backlog
 </span>
 </div>
 </div>

 {/* Graphical Visualization */}
 <div className={styles.visualSection}>
 <div className={styles.visualTitle}>Time To Resolution Distribution</div>

 <div className={styles.progressBarWrapper}>
 <div className={styles.progressBarHeader}>
 <span>Express Repairs (Under 1 hour)</span>
 <span>45% of Jobs</span>
 </div>
 <div className={styles.progressBarContainer}>
 <div className={`${styles.progressBarFill} ${styles.progressBarFillSuccess}`} style={{ width: "45%" }}></div>
 </div>
 </div>

 <div className={styles.progressBarWrapper}>
 <div className={styles.progressBarHeader}>
 <span>Standard Repairs (1 to 3 hours)</span>
 <span>41% of Jobs</span>
 </div>
 <div className={styles.progressBarContainer}>
 <div className={`${styles.progressBarFill} ${styles.progressBarFillWarning}`} style={{ width: "41%" }}></div>
 </div>
 </div>

 <div className={styles.progressBarWrapper}>
 <div className={styles.progressBarHeader}>
 <span>Complex Diagnosis (Over 3 hours)</span>
 <span>14% of Jobs</span>
 </div>
 <div className={styles.progressBarContainer}>
 <div className={styles.progressBarFill} style={{ width: "14%" }}></div>
 </div>
 </div>

 </div>
 </div>
 )}

 {activeTab === "techs" && (
 <div>
 {/* Overview Stats */}
 <div className={styles.statsOverviewGrid}>
 <div className={styles.statCard}>
 <span className={styles.statLbl}>Active Operators</span>
 <span className={styles.statVal}>8 Techs</span>
 <span className={styles.statTrend}>
 <Users size={12} style={{ color: "rgba(30,27,75,0.4)" }} /> Daily logs
 </span>
 </div>
 <div className={styles.statCard}>
 <span className={styles.statLbl}>Peak Speed</span>
 <span className={styles.statVal}>1.6 Hours</span>
 <span className={styles.statTrend}>
 <TrendingUp size={12} /> Aman Kumar
 </span>
 </div>
 <div className={styles.statCard}>
 <span className={styles.statLbl}>Customer Rating</span>
 <span className={styles.statVal}>⭐ 4.85 / 5</span>
 <span className={styles.statTrend}>
 <TrendingUp size={12} /> +2.1% feedback
 </span>
 </div>
 </div>

 {/* Graphical Visualization */}
 <div className={styles.visualSection}>
 <div className={styles.visualTitle}>Technician Performance Leaderboard</div>

 <div className={styles.leaderboardList}>
 
 <div className={styles.leaderboardRow}>
 <div className={styles.techMeta}>
 <span className={`${styles.techRank} ${styles.techRankFirst}`}>1</span>
 <div>
 <div className={styles.techName}>Aman Kumar</div>
 <span className={styles.techSpec}>Lead Specialist</span>
 </div>
 </div>
 <div className={styles.techMetrics}>
 <div className={styles.techMetricItem}>
 <span className={styles.techMetricVal}>52</span>
 <span className={styles.techMetricLabel}>Completed</span>
 </div>
 <div className={styles.techMetricItem}>
 <span className={styles.techMetricVal}>1.6h</span>
 <span className={styles.techMetricLabel}>Avg. TAT</span>
 </div>
 </div>
 </div>

 <div className={styles.leaderboardRow}>
 <div className={styles.techMeta}>
 <span className={styles.techRank}>2</span>
 <div>
 <div className={styles.techName}>Rajesh Patel</div>
 <span className={styles.techSpec}>Senior Tech</span>
 </div>
 </div>
 <div className={styles.techMetrics}>
 <div className={styles.techMetricItem}>
 <span className={styles.techMetricVal}>44</span>
 <span className={styles.techMetricLabel}>Completed</span>
 </div>
 <div className={styles.techMetricItem}>
 <span className={styles.techMetricVal}>1.9h</span>
 <span className={styles.techMetricLabel}>Avg. TAT</span>
 </div>
 </div>
 </div>

 <div className={styles.leaderboardRow}>
 <div className={styles.techMeta}>
 <span className={styles.techRank}>3</span>
 <div>
 <div className={styles.techName}>Sunita Rao</div>
 <span className={styles.techSpec}>Hardware Engineer</span>
 </div>
 </div>
 <div className={styles.techMetrics}>
 <div className={styles.techMetricItem}>
 <span className={styles.techMetricVal}>38</span>
 <span className={styles.techMetricLabel}>Completed</span>
 </div>
 <div className={styles.techMetricItem}>
 <span className={styles.techMetricVal}>2.2h</span>
 <span className={styles.techMetricLabel}>Avg. TAT</span>
 </div>
 </div>
 </div>

 </div>

 </div>
 </div>
 )}

 </div>
 </div>
 </div>
 </section>

 {/* 2. CAPABILITIES GRID */}
 <section id="features" className={styles.section} style={{ backgroundColor: "var(--accent-soft)" }}>
 <div className={styles.featHead}>
 <span className={styles.badge}>ANALYTICS ENGINE</span>
 <h2>A Comprehensive Diagnostic Dashboard</h2>
 <p style={{ color: "rgba(30, 27, 75, 0.6)" }}>
 Unlock operations reporting to streamline intake bottlenecks, improve speeds, and track gross performance.
 </p>
 </div>

 <div className={styles.featGrid}>
 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <BarChart2 size={22} />
 </div>
 <h3>Financial Summary Reports</h3>
 <p>Generate total shop revenue metrics, average ticket size trackers, and itemized spare parts accounting dynamically.</p>
 </div>

 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <Users size={22} />
 </div>
 <h3>Technician Speed Analytics</h3>
 <p>Assess workload distribution, monitor individual ticket completion rates, and identify top performers instantly.</p>
 </div>

 <div className={styles.featCard}>
 <div className={styles.featIcon}>
 <ShieldCheck size={22} />
 </div>
 <h3>Role-Based Security</h3>
 <p>Restrict billing histories, analytics databases, and reports to authorized managers or admins via strict permission locks.</p>
 </div>
 </div>
 </section>



 {/* 4. GLOWING CALL TO ACTION */}
 <section className={styles.section}>
 <div className={styles.ctaWrapper}>
 <div className={styles.ctaGlow} />
 <h2>Ready to Supercharge Workshop Productivity?</h2>
 <p>
 Get access to live dashboards, automated PDF invoices, technician leaderboards, and instant status updates.
 </p>
 <div className={styles.ctaBtnGroup}>
 <a href="/register" className={styles.btnPrimary}>
 Get Started for Free <ArrowRight size={18} />
 </a>
 <a href="/support" className={styles.btnSecondary} style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}>
 Talk to Our Experts
 </a>
 </div>
 </div>
 </section>

 </div>
 );
}
