import CatalogImg from "./image1.jpg";
import SmartImg from "./smart.png";
import LifecycleImg from "./Image3.png";
import RevenueImg from "./payment.jpg";
import AnalyticsImg from "./analytics2.jpg";
import SecurityImg from "./security.jpg";


export const AllFeaturesData = [
 {
 id: "product-catalog",
 category: "PRODUCT HUB",
 title: 'Streamline your product catalog',

 description: "With Swordnex Billing, effortlessly manage a clean, organized catalog designed for fast growth and seamless market expansion.",
 image: CatalogImg,

 ctaText: "Transform your billing experience",
 ctaLink: "/b-software",

 items: [
 {
 title: "Organize Every Product Effortlessly",
 description: "Whether single items or bundled offerings, Swordnex Billing helps you create, update, and manage all products seamlessly in one place."
 },
 {
 title: "Maximize Your Revenue Potential",
 description: "Experiment with flat, volume, or tiered pricing models to discover new revenue opportunities and grow your business smartly",
 // link: "#",
 // linkText: "Check out pricing models"
 },
 {
 title: "Dynamic Pricing, No Compromise",
 description: "Easily adjust product prices and create custom price lists for customers without losing demand or cluttering your catalog."
 },
 {
 title: "Flexible Discounts Made Simple",
 description: "Create one-time, recurring, or time-limited coupons to attract customers, customize discounts per product, and control redemption effortlessly."
 }
 ]
 },
 {
 id: "billing",
 category: "Billing",
 title: "Effortless payment management",

 description: "Swordnex Billing streamlines your finances by bringing invoicing, expense tracking, project billing, and recurring payments together making payment management simple, fast, and stress-free.",
 image: SmartImg,

 ctaText: "Transform your billing experience",
 ctaLink: "/b-software",

 items: [
 {
 title: "Smart Invoicing, Simplified",
 description: "Automate your invoices with accurate tax calculations, custom branding, and consolidated billing. Expand globally with multi-currency and multilingual support, ensuring your invoicing is precise, professional, and effortless."
 },
 {
 title: "Seamless Expense Tracking",
 description: "Turn billable expenses into invoices instantly and keep your clients updated. Track your team’s mileage, convert billable miles into reimbursements, and simplify the expense management process for your business.",
 // link: "#",
 // linkText: "Expense management"
 },
 {
 title: "Project Billing That Maximizes Profits",
 description: "Monitor hours spent on projects and generate accurate client bills. Keep budgets in check with real-time tracking of project expenses and work hours, all through a centralized, easy-to-use dashboard.",
 // link: "#",
 // linkText: "Explore timesheets"
 },
 {
 title: "Usage-Based Billing, Fully Automated",
 description: "Charge clients based on usage or add extra fees to a base plan. Create subscriptions, define usage components, and set billing frequencies to automate metered billing workflows entirely",
 // link: "#",
 // linkText: "Metered billing"
 },
 // {
 // title: "Recurring Billing Made Flexible",
 // description: "Automate recurring payments with flexible configurations that match your business rules. Support plan purchases and renewals on yearly, monthly, or custom schedules, streamlining recurring billing effortlessly.",
 // // link: "#",
 // // linkText: "Recurring billing"
 // },
 ]
 },
 {
 id: "customer-lifecycle",
 category: "Lifecycle Management",
 title: "Manage the entire customer lifecycle",

 description:
 "Handle quotations, customer onboarding, subscriptions, renewals, trials, upgrades, and cancellations from a single platform.",

 image: LifecycleImg,

 ctaText: "Optimize customer journeys",
 ctaLink: "/b-software",

 items: [
 {
 title: "Quote Management, Made Effortless",
 description: "Customize quotes using templates and client-specific currency options. Convert accepted quotes into invoices seamlessly, ensuring a smooth transition from quote to payment without any manual hassle",
 link: "/billing/support",
 // linkText: "Check out quotes"
 },
 {
 title: "Seamless Subscriber Lifecycle Control",
 description: "Create, manage, pause, cancel, reactivate, or extend subscriptions with just a single click. Handle upgrades and downgrades at any point in the billing cycle, giving you complete control over subscriber management."
 },
 {
 title: "Streamlined Trial Management",
 description: "Set up, customize, and extend free trials easily. Keep prospects engaged and maximize conversion opportunities by automating reminder emails and monitoring trial progress efficiently",
 // linkText: "Trial management"
 },
 {
 title: "Automated Invoicing & Global Taxation",
 description: "Generate compliant tax invoices automatically for local and international customers. Stay aligned with changing regional tax regulations and effortlessly track payment statuses in real-time.",
 link: "/billing/invoices",
 // linkText: "Explore invoicing"
 }
 ]
 },
 {
 id: "collections",
 category: "Collections",
 title: "Boost Payment Recovery & Retention",

 description: "Simplify the payment process for your customers while minimizing failed transactions. Recover lost revenue efficiently, reduce involuntary churn, and create a seamless collection workflow for maximum results.",
 image: RevenueImg,

 ctaText: "Maximize revenue collections",
 ctaLink: "/b-software",

 items: [
 {
 title: "Accept Payments Anytime, Anywhere",
 description: "Accept global payments through more than 10 integrated payment gateways for both one-time and recurring transactions, including credit and debit cards, online banking, and ACH, ensuring seamless collection from all your customers."
 },
 {
 title: "Global Payments, Multi-Currency Ready",
 description: "Accept payments in your customers' preferred currency, record multi-currency transactions, get automatic exchange rate updates, and generate detailed reports for full visibility across your international business operations."
 },
 {
 title: "Revenue Recovery Made Easy",
 description: "Offer a smooth checkout experience without creating complex compliance webpages. Use Swordnex Billing's PCI-compliant hosted pages to let customers select products or services and pay effortlessly."
 },
 {
 title: "Get Paid Faster, Reduce DSO",
 description: "Prevent payment declines by automating dunning management, reminders, card updates, expiration alerts, and failed payment notifications, helping you reduce Days Sales Outstanding and accelerate cash flow."
 },
 // {
 // title: "Insightful Dunning Performance Tracking",
 // description: "Monitor recovery rates, revenue recovered, and customers saved from involuntary churn with clear, actionable metrics, enabling smarter decisions and more effective payment collection strategies."
 // }
 ]
 },
 {
 id: "analytics",
 category: "Reporting & Analytics",
 title: "Complete Financial Insights",

 description: "Unlock detailed reports and in-depth metrics to drive smarter decisions. Receive timely insights directly in your inbox, stay informed about your financial health, and maintain full control over your business performance.",
 image: AnalyticsImg,

 ctaText: "Gain complete insight",
 ctaLink: "/b-software",

 items: [
 {
 title: "Powerful Accounts Receivable Insights",
 description: "Generate aging reports and gain a consolidated view of customer transactions, unpaid invoices, overdue amounts, and payment due dates. Access over 50 custom reports, role-specific dashboards, and shareable reports for complete financial oversight"
 },
 {
 title: "In-Depth Subscription Analytics",
 description: "Monitor essential subscription metrics such as net revenue, MRR, churn rate, activations, and cancellations. Generate detailed reports on trials, aging, cash flow projections, collections, and more to optimize your business strategy."
 },
 {
 title: "Fully Customizable Reporting",
 description: "Tailor reports for specific products or time periods and include data from multiple modules. Easily access, print, or export reports in various formats on the fly for quick and informed decision-making."
 },
 {
 title: "Automated Report Delivery & Compliance",
 description: "Schedule automated report exports directly to your stakeholder inboxes on a daily, weekly, or monthly basis. Maintain audit-ready financial records that comply with international accounting standards effortlessly."
 }
 ]
 },
 {
 id: "security",
 category: "Security & Compliance",
 title: "Trusted Security & Regulatory Compliance",

 description:"Swordnex Billing safeguards your business and customer data with industry-leading security protocols and full compliance, giving you peace of mind while managing sensitive financial information.",
 image: SecurityImg,

 ctaText: "Explore security features",
 ctaLink: "/b-software",

 items: [
 {
 title: "Secure Access with Role-Based Permissions",
 description: "Create customized roles and assign users, define permissions, and protect sensitive data by controlling access to information within Swordnex Billing, ensuring that the right people have the right access at all times."
 },
 {
 title: "GDPR-Compliant Data Handling",
 description: "Operate on a highly secure architecture to prevent unauthorized access while collecting, storing, and processing customers’ personal data, fully adhering to EU GDPR regulations for maximum privacy compliance."
 },
 {
 title: "PCI-DSS Level 1 Certified Security",
 description: "Swordnex Billing encrypts and safeguards your customers’ sensitive personal and payment information, ensuring full compliance with PCI-DSS Level 1 standards for secure payment processing."
 },
 {
 title: "HIPAA-Compliant Protection of ePHI",
 description: "Maintain the security and confidentiality of electronic protected health information (ePHI) with Swordnex Billing’s HIPAA-compliant features, ensuring your healthcare data is safe and fully compliant."
 }
 ]
 },
];