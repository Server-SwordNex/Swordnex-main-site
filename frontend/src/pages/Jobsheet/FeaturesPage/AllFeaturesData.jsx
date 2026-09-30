import CatalogImg from "./image1.jpg";
import SmartImg from "./smart.png";
import LifecycleImg from "./Image3.png";
import RevenueImg from "./payment.jpg";
import AnalyticsImg from "./analytics2.jpg";
import SecurityImg from "./security.jpg";

export const AllFeaturesData = [
 {
 id: "jobsheet-management",
 category: "JOBSHEET HUB",
 title: "Streamline your jobsheet workflow",
 description: "With SwordNex Jobsheet, effortlessly create, update, and manage job sheets and service orders for fast service delivery and client satisfaction.",
 image: CatalogImg,
 ctaText: "Explore jobsheet management",
 ctaLink: "/jobsheet-software",
 items: [
 {
 title: "Create Job Sheets Instantly",
 description: "Enter customer, product parameters, categories list, technician details, and problem statements in seconds. Automatically generate document numbers."
 },
 {
 title: "Service Costing & Pricing",
 description: "Experiment with estimated repair rates, add discounts, and configure additional charges fields with automatic total calculations."
 },
 {
 title: "Technician Assignment",
 description: "Allocate repair jobs and maintenance tasks to designated technicians from your team directory and avoid manual distribution."
 },
 {
 title: "Custom Terms & Conditions",
 description: "Include custom shop guidelines, warranty policies, or terms and conditions directly on every generated jobsheet."
 }
 ]
 },
 {
 id: "lifecycle-tracking",
 category: "TRACKING",
 title: "Track jobs from start to finish",
 description: "Monitor every stage of repair or service with clear status indicators, helping your team collaborate and stay on track.",
 image: SmartImg,
 ctaText: "Track repair services",
 ctaLink: "/jobsheet-software",
 items: [
 {
 title: "Standard Repair Statuses",
 description: "Enforce consistent workflows with status categories: Initiated, In-Progress, Completed, and Cancelled."
 },
 {
 title: "Real-Time Log Updates",
 description: "Follow the lifecycle of any job sheet, documenting part updates, repair notes, and status changes instantly."
 },
 {
 title: "Drafts & Auto-Saving",
 description: "Save half-completed jobsheets as drafts securely, ensuring technicians can resume editing from where they left off."
 },
 {
 title: "Detailed Problem Profiles",
 description: "Document exact product symptoms, customer complaints, diagnostic notes, and repair findings on a central registry."
 }
 ]
 },
 {
 id: "inventory-database",
 category: "DATABASE",
 title: "Organize your service products & categories",
 description: "Maintain a structured registry of repair items, service categories, and brands to eliminate errors and speed up data entry.",
 image: LifecycleImg,
 ctaText: "Optimize service directory",
 ctaLink: "/jobsheet-software",
 items: [
 {
 title: "Product Categorization",
 description: "Group service items under custom categories (e.g., Electronics, Home Appliances, Automobiles) for fast registry lookups."
 },
 {
 title: "Serial & Model Number Registry",
 description: "Track unique product models and serial numbers, maintaining a clear repair history database for every device."
 },
 {
 title: "Service Type Classifications",
 description: "Classify jobs by repair, maintenance, installation, inspection, or demonstration types to match specific business rules."
 },
 {
 title: "Technician Mapping",
 description: "Check which technicians are assigned to specific product categories, ensuring jobs go to the right expert."
 }
 ]
 },
 {
 id: "digital-sharing",
 category: "DIGITAL SHARING",
 title: "Export and share jobsheets digitally",
 description: "Deliver professional, print-ready jobsheet PDFs to customers and export service data for your office records.",
 image: RevenueImg,
 ctaText: "Manage exports and shares",
 ctaLink: "/jobsheet-software",
 items: [
 {
 title: "Instant PDF Generator",
 description: "Generate professional, branded jobsheet PDFs in a click. Ready for printing, messaging, or email sharing."
 },
 {
 title: "Export to CSV Ledger",
 description: "Download filtered jobsheet lists as clean CSV spreadsheets for accounting, analysis, or off-line reporting."
 },
 {
 title: "Robust Search & Filter",
 description: "Locate any service ticket by searching jobsheet numbers, customer names, serial numbers, dates, or technician names."
 },
 {
 title: "Customer Contact Ledger",
 description: "Access customer directories, mobile numbers, city, state, and previous service history log in a centralized register."
 }
 ]
 },
 {
 id: "reporting-analytics",
 category: "REPORTS",
 title: "Gain insights into service operations",
 description: "Unlock real-time operational insights, weekly trends, revenue statements, and technician performance metrics.",
 image: AnalyticsImg,
 ctaText: "Gain operational insights",
 ctaLink: "/jobsheet-software",
 items: [
 {
 title: "Revenue & Discount Summaries",
 description: "Monitor total service earnings, additional charges, and discount statistics over custom date ranges."
 },
 {
 title: "Weekly Volume Trends",
 description: "Track the number of service tickets created weekly to align staff staffing levels and predict peak workloads."
 },
 {
 title: "Status Overview Charts",
 description: "View dynamic pie-chart summaries of pending, in-progress, completed, or cancelled jobsheets."
 },
 {
 title: "Technician Metrics",
 description: "Compare total assigned jobs, pending backlogs, and completion ratios across all service technicians."
 }
 ]
 },
 {
 id: "security-access",
 category: "SECURITY",
 title: "Secure access control & privacy",
 description: "SwordNex Jobsheet safeguards company settings and repair registries with robust security policies and administrative controls.",
 image: SecurityImg,
 ctaText: "Explore security features",
 ctaLink: "/jobsheet-security",
 items: [
 {
 title: "Granular Role Permissions",
 description: "Create distinct roles for admins and technicians, preventing regular staff from editing critical company settings."
 },
 {
 title: "Tamper-Proof Audit Logging",
 description: "Record creation and amendment timestamps, identifying which user created a jobsheet or updated a status."
 },
 {
 title: "Data Backups & Encryption",
 description: "Secure client contact numbers, device serial numbers, and financials with enterprise-grade cloud backups."
 },
 {
 title: "Protected Job Number Formats",
 description: "Lock jobsheet prefixes, suffixes, and counters under admin controls to keep document structures uniform."
 }
 ]
 }
];