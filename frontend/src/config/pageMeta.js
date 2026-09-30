// Default <title> and description per route. Pages that render their own
// <Helmet> override these. Lookups try the exact path first, then the longest
// matching prefix, so product sub-pages inherit their product's metadata.

const SITE = "SwordNex Technologies";

const DEFAULT = {
 title: "SwordNex Technologies | IT Solutions, SaaS Products & Training Institute Kumbakonam",
 description:
  "SwordNex Technologies Kumbakonam - Custom IT solutions, SaaS product development, Payroll HRM Billing software, UI/UX design & IT training institute with job placement.",
};

const exact = {
 "/about": ["About Us", "Meet the SwordNex Technologies team in Kumbakonam and learn how we build software, SaaS products and IT careers."],
 "/services": ["IT Services", "Application development, digital media, IT infrastructure, HR consulting and IT training services from SwordNex Technologies."],
 "/products": ["Products", "SwordNex SaaS products: Billing, Payroll, HMS, Invoice and Jobsheet software for growing businesses."],
 "/contact": ["Contact Us", "Contact SwordNex Technologies in Kumbakonam for software projects, product demos, training and support."],
 "/testimonials": ["Testimonials", "What clients and students say about working and learning with SwordNex Technologies."],
 "/career": ["Careers", "Explore open roles and grow your career with SwordNex Technologies."],
 "/career-main": ["Careers", "Explore open roles and grow your career with SwordNex Technologies."],
 "/events": ["Events", "Upcoming SwordNex events, job fairs and tech sessions."],
 "/workshopslist": ["Workshops", "Hands-on technology workshops from SwordNex Technologies."],
 "/blogpage": ["Blog", "Articles on software, SaaS, digital marketing and tech careers from the SwordNex team."],
 "/supportpage": ["Support", "Get help with SwordNex products and services."],
 "/faqpage": ["FAQ", "Answers to common questions about SwordNex products, services and training."],
 "/workplace": ["Workplace", "Life and culture at SwordNex Technologies."],
 "/application": ["Apply", "Apply to SwordNex Technologies."],
 "/affiliate": ["Affiliate Program", "Earn commissions by referring businesses to SwordNex products."],
 "/signin": ["Staff Sign In", "Sign in to the SwordNex staff dashboard."],
 "/services/application-development": ["Application Development", "Custom web and mobile application development by SwordNex Technologies."],
 "/services/digital-media": ["Digital Media & Marketing", "Digital marketing, branding and media services by SwordNex Technologies."],
 "/services/hr-consulting": ["HR Consulting", "HR consulting and recruitment services by SwordNex Technologies."],
 "/services/it-training-skill-development": ["IT Training & Skill Development", "Job-oriented IT training and skill development courses in Kumbakonam."],
 "/services/it-infrastructure": ["IT Infrastructure", "IT infrastructure setup and support services by SwordNex Technologies."],
 "/services/job": ["Job Placement", "Job placement support for SwordNex students and candidates."],
 "/course/uiux-design": ["UI/UX Design Course", "Learn UI/UX design with hands-on projects at SwordNex Technologies, Kumbakonam."],
 "/course/data-science": ["Data Science Course", "Data science training with real projects at SwordNex Technologies, Kumbakonam."],
 "/course/app-development": ["App Development Course", "Learn mobile app development at SwordNex Technologies, Kumbakonam."],
 "/course/digital-marketing": ["Digital Marketing Course", "Digital marketing training with live campaigns at SwordNex Technologies, Kumbakonam."],
 "/course/data-analytics": ["Data Analytics Course", "Data analytics training at SwordNex Technologies, Kumbakonam."],
 "/course/fullstack-development": ["Full Stack Development Course", "Full stack web development training at SwordNex Technologies, Kumbakonam."],
 "/course/ai-ml": ["AI & Machine Learning Course", "Artificial intelligence and machine learning training at SwordNex Technologies, Kumbakonam."],
 "/course/internship": ["Internship Program", "Internship program with real projects at SwordNex Technologies."],
 "/course/enquiry": ["Course Enquiry", "Enquire about SwordNex training courses."],
 "/security": ["Security", "How SwordNex Technologies protects your data."],
 "/privacypolicy": ["Privacy Policy", "SwordNex Technologies privacy policy."],
 "/cookiepolicy": ["Cookie Policy", "SwordNex Technologies cookie policy."],
 "/gdprcompliance": ["GDPR Compliance", "SwordNex Technologies GDPR compliance."],
 "/tm-policy": ["Trademark Policy", "SwordNex Technologies trademark policy."],
 "/terms": ["Terms of Service", "SwordNex Technologies terms of service."],
 "/ipr-complaints": ["IPR Complaints", "Report intellectual property concerns to SwordNex Technologies."],
};

const prefixes = [
 ["/products/billing", "SwordNex Billing | GST Billing & Invoicing Software", "Fast GST billing, invoicing, inventory and payment tracking software for retail and small businesses."],
 ["/products/payroll", "SwordNex Payroll | Payroll & HR Software", "Automated payroll, payslips, attendance and HR management software for Indian businesses."],
 ["/products/hms", "SwordNex HMS | Hotel Management Software", "Hotel management software for reservations, check-in, room tracking and housekeeping."],
 ["/products/invoice", "SwordNex Invoice | Online Invoicing Software", "Create GST invoices, track payments and view business reports with SwordNex Invoice."],
 ["/products/jobsheet", "SwordNex Jobsheet | Service Job Tracking Software", "Track service jobs, repairs and status updates for your customers with SwordNex Jobsheet."],
 ["/course/", "IT Courses | SwordNex Technologies", DEFAULT.description],
 ["/career", "Careers | SwordNex Technologies", "Explore open roles and grow your career with SwordNex Technologies."],
 ["/blogpage/", "Blog | SwordNex Technologies", "Articles on software, SaaS, digital marketing and tech careers from the SwordNex team."],
 ["/events/", "Events | SwordNex Technologies", "Upcoming SwordNex events, job fairs and tech sessions."],
 ["/workshops/", "Workshops | SwordNex Technologies", "Hands-on technology workshops from SwordNex Technologies."],
];

export const getPageMeta = (pathname) => {
 const path = pathname.toLowerCase().replace(/\/+$/, "") || "/";
 if (path === "/") return DEFAULT;

 const hit = exact[path];
 if (hit) return { title: `${hit[0]} | ${SITE}`, description: hit[1] };

 const prefix = prefixes.find(([p]) => path.startsWith(p));
 if (prefix) return { title: prefix[1], description: prefix[2] };

 return DEFAULT;
};
