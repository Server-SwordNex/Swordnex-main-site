import React, { useRef, useState } from "react";
import CourseEnquiryForm from "../../components/CourseEnquiryForm";
import CourseLinks from "../../components/CourseLinks";
// ===================== THEME =====================
const BRAND = {
 primary: "#2563EB", // blue-600
 primaryDark: "#1D4ED8", // blue-700
 ink: "#0B1220",
 muted: "#5B667A",
 bg: "#F3F7FF",
 card: "#FFFFFF",
};

// ===================== STYLES =====================
const styles = {
 page: {
 fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
 color: BRAND.ink,
 backgroundColor: BRAND.bg,
 minHeight: "100vh",
 },

 // ---------- Hero Section ----------
 hero: {
 background: `linear-gradient(135deg, ${BRAND.primaryDark} 0%, ${BRAND.primary} 55%, #0EA5E9 100%)`,
 color: "#fff",
 textAlign: "center",
 padding: "100px 20px 80px",
 },
 heroTitle: {
 fontSize: "3rem",
 fontWeight: 900,
 marginBottom: "15px",
 letterSpacing: "-0.5px",
 },
 heroSub: {
 fontSize: "1.15rem",
 maxWidth: "760px",
 margin: "0 auto 30px",
 opacity: 0.92,
 lineHeight: 1.7,
 },
 heroBadge: {
 display: "inline-block",
 background: "rgba(255,255,255,0.18)",
 padding: "8px 22px",
 borderRadius: "999px",
 fontSize: "0.95rem",
 fontWeight: 700,
 marginBottom: "20px",
 border: "1px solid rgba(255,255,255,0.28)",
 },
 heroBtn: {
 padding: "15px 40px",
 fontSize: "1.05rem",
 fontWeight: 800,
 backgroundColor: "#fff",
 color: BRAND.primaryDark,
 border: "none",
 borderRadius: "999px",
 cursor: "pointer",
 transition: "transform 0.25s",
 boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
 },

 // ---------- Stats ----------
 statsSection: {
 display: "flex",
 justifyContent: "center",
 gap: "50px",
 padding: "40px 20px",
 backgroundColor: "#fff",
 flexWrap: "wrap",
 borderBottom: "1px solid rgba(2,6,23,0.06)",
 },
 statBox: { textAlign: "center" },
 statNum: {
 fontSize: "2.5rem",
 fontWeight: 900,
 color: BRAND.primary,
 },
 statLabel: { fontSize: "0.95rem", color: BRAND.muted, marginTop: "5px" },

 // ---------- Section Common ----------
 sectionTitle: {
 textAlign: "center",
 fontSize: "2.2rem",
 fontWeight: 900,
 marginBottom: "10px",
 color: BRAND.ink,
 letterSpacing: "-0.4px",
 },
 sectionSub: {
 textAlign: "center",
 color: BRAND.muted,
 marginBottom: "50px",
 fontSize: "1.02rem",
 },

 // ---------- Internship Cards ----------
 internshipSection: { padding: "80px 60px" },
 cardGrid: {
 display: "grid",
 gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
 gap: "30px",
 maxWidth: "1200px",
 margin: "0 auto",
 },
 card: {
 backgroundColor: BRAND.card,
 borderRadius: "16px",
 padding: "35px 30px",
 boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
 transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
 cursor: "default",
 border: "2px solid transparent",
 display: "flex",
 flexDirection: "column",
 minHeight: 360,
 },
 cardIcon: { fontSize: "2.5rem", marginBottom: "15px" },
 cardTitle: { fontSize: "1.3rem", fontWeight: 800, marginBottom: "8px" },
 cardDuration: {
 fontSize: "0.9rem",
 color: BRAND.primaryDark,
 fontWeight: 800,
 marginBottom: "12px",
 },
 cardDesc: {
 color: BRAND.muted,
 lineHeight: 1.6,
 fontSize: "0.95rem",
 marginBottom: "15px",
 },
 cardFeatures: { listStyle: "none", padding: 0, margin: "0 0 18px 0" },
 cardFeatureItem: { padding: "4px 0", fontSize: "0.92rem", color: "#334155" },
 cardApplyBtn: {
 marginTop: "auto",
 width: "100%",
 padding: "13px 14px",
 borderRadius: "12px",
 border: "1.5px solid rgba(37,99,235,0.25)",
 background: `linear-gradient(135deg, ${BRAND.primaryDark}, ${BRAND.primary})`,
 color: "#fff",
 fontWeight: 900,
 cursor: "pointer",
 boxShadow: "0 10px 22px rgba(37,99,235,0.22)",
 },

 // ---------- What You Get ----------
 benefitsSection: { padding: "80px 60px", backgroundColor: "#fff" },
 benefitGrid: {
 display: "grid",
 gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
 gap: "30px",
 maxWidth: "1100px",
 margin: "0 auto",
 },
 benefitCard: {
 textAlign: "center",
 padding: "30px 20px",
 borderRadius: "14px",
 backgroundColor: "#F1F7FF",
 border: "1px solid rgba(37,99,235,0.12)",
 },
 benefitIcon: { fontSize: "2.2rem", marginBottom: "12px" },
 benefitTitle: { fontWeight: 900, fontSize: "1.1rem", marginBottom: "8px" },
 benefitDesc: { color: BRAND.muted, fontSize: "0.92rem", lineHeight: 1.6 },

 // ---------- Pricing Plans ----------
 pricingSection: { padding: "80px 60px", backgroundColor: BRAND.bg },
 pricingGrid: {
 display: "grid",
 gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
 gap: "30px",
 maxWidth: "980px",
 margin: "0 auto",
 },
 pricingCard: {
 backgroundColor: "#fff",
 borderRadius: "16px",
 padding: "40px 30px",
 textAlign: "center",
 boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
 position: "relative",
 overflow: "hidden",
 border: "1px solid rgba(2,6,23,0.06)",
 },
 pricingPopular: {
 background: `linear-gradient(135deg, ${BRAND.primaryDark}, ${BRAND.primary})`,
 color: "#fff",
 borderRadius: "16px",
 padding: "40px 30px",
 textAlign: "center",
 boxShadow: "0 18px 40px rgba(37,99,235,0.22)",
 position: "relative",
 overflow: "hidden",
 transform: "scale(1.05)",
 border: "1px solid rgba(255,255,255,0.18)",
 },
 popularBadge: {
 position: "absolute",
 top: "15px",
 right: "-30px",
 backgroundColor: "#FF6B6B",
 color: "#fff",
 padding: "5px 40px",
 fontSize: "0.75rem",
 fontWeight: 900,
 transform: "rotate(45deg)",
 },
 pricingName: { fontSize: "1.3rem", fontWeight: 900, marginBottom: "8px" },
 pricingPrice: { fontSize: "2.6rem", fontWeight: 950, margin: "15px 0 5px" },
 pricingDuration: { fontSize: "0.95rem", opacity: 0.85, marginBottom: "25px" },
 pricingFeatures: {
 listStyle: "none",
 padding: 0,
 margin: "0 0 30px 0",
 textAlign: "left",
 },
 pricingFeatureItem: {
 padding: "8px 0",
 fontSize: "0.95rem",
 borderBottom: "1px solid rgba(0,0,0,0.06)",
 },
 pricingBtn: {
 padding: "13px 35px",
 fontSize: "1rem",
 fontWeight: 900,
 border: `2px solid ${BRAND.primary}`,
 borderRadius: "999px",
 cursor: "pointer",
 transition: "all 0.25s",
 backgroundColor: "transparent",
 color: BRAND.primaryDark,
 },
 pricingBtnPopular: {
 padding: "13px 35px",
 fontSize: "1rem",
 fontWeight: 900,
 border: "2px solid rgba(255,255,255,0.95)",
 borderRadius: "999px",
 cursor: "pointer",
 transition: "all 0.25s",
 backgroundColor: "#fff",
 color: BRAND.primaryDark,
 },

 // ---------- Application Form ----------
 formSection: { padding: "80px 60px", backgroundColor: "#fff" },
 formContainer: {
 maxWidth: "920px",
 margin: "0 auto",
 backgroundColor: "#F1F7FF",
 borderRadius: "20px",
 padding: "40px 36px",
 boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
 border: "1px solid rgba(37,99,235,0.12)",
 },
 formRow: {
 display: "grid",
 gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
 gap: "24px",
 marginBottom: "20px",
 alignItems: "start",
 },
 formGroup: { display: "flex", flexDirection: "column", marginBottom: "20px" },
 formLabel: {
 fontSize: "0.9rem",
 fontWeight: 800,
 marginBottom: "6px",
 color: "#0f172a",
 },
 formInput: {
 padding: "12px 16px",
 borderRadius: "10px",
 border: "1.5px solid rgba(2,6,23,0.12)",
 fontSize: "0.95rem",
 outline: "none",
 backgroundColor: "#fff",
 },
 formSelect: {
 padding: "12px 16px",
 borderRadius: "10px",
 border: "1.5px solid rgba(2,6,23,0.12)",
 fontSize: "0.95rem",
 outline: "none",
 backgroundColor: "#fff",
 },
 formTextarea: {
 padding: "12px 16px",
 borderRadius: "10px",
 border: "1.5px solid rgba(2,6,23,0.12)",
 fontSize: "0.95rem",
 outline: "none",
 minHeight: "120px",
 resize: "vertical",
 backgroundColor: "#fff",
 },
 formSubmitBtn: {
 width: "100%",
 padding: "15px",
 fontSize: "1.05rem",
 fontWeight: 950,
 background: `linear-gradient(135deg, ${BRAND.primaryDark}, ${BRAND.primary})`,
 color: "#fff",
 border: "none",
 borderRadius: "12px",
 cursor: "pointer",
 marginTop: "10px",
 boxShadow: "0 12px 25px rgba(37,99,235,0.20)",
 },

 // ---------- Testimonials ----------
 testimonialSection: { padding: "80px 60px", backgroundColor: BRAND.bg },
 testimonialGrid: {
 display: "grid",
 gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
 gap: "30px",
 maxWidth: "1100px",
 margin: "0 auto",
 },
 testimonialCard: {
 backgroundColor: "#fff",
 borderRadius: "16px",
 padding: "30px",
 boxShadow: "0 10px 28px rgba(2,6,23,0.06)",
 border: "1px solid rgba(2,6,23,0.06)",
 },
 testimonialText: {
 fontStyle: "italic",
 color: "#334155",
 lineHeight: 1.7,
 marginBottom: "20px",
 fontSize: "0.95rem",
 },
 testimonialAuthor: { fontWeight: 900, color: BRAND.ink },
 testimonialCollege: { fontSize: "0.85rem", color: "#64748b" },
 stars: { color: "#F59E0B", marginBottom: "12px", fontSize: "1.1rem" },

 // ---------- FAQ ----------
 faqSection: { padding: "80px 60px", backgroundColor: "#fff" },
 faqContainer: { maxWidth: "750px", margin: "0 auto" },
 faqItem: { borderBottom: "1px solid rgba(2,6,23,0.08)", padding: "20px 0" },
 faqQuestion: {
 fontWeight: 900,
 fontSize: "1.05rem",
 cursor: "pointer",
 display: "flex",
 justifyContent: "space-between",
 alignItems: "center",
 color: BRAND.ink,
 },
 faqAnswer: { color: BRAND.muted, lineHeight: 1.7, marginTop: "12px", fontSize: "0.95rem" },

 // ---------- Footer ----------
 footer: { backgroundColor: "#071126", color: "#A7B3C7", padding: "50px 60px 30px" },
 footerGrid: {
 display: "grid",
 gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
 gap: "30px",
 maxWidth: "1100px",
 margin: "0 auto 40px",
 },
 footerTitle: { color: "#fff", fontWeight: 900, marginBottom: "15px", fontSize: "1.1rem" },
 footerLink: {
 display: "block",
 color: "#A7B3C7",
 textDecoration: "none",
 marginBottom: "8px",
 fontSize: "0.9rem",
 },
 footerBottom: {
 textAlign: "center",
 borderTop: "1px solid rgba(255,255,255,0.10)",
 paddingTop: "25px",
 fontSize: "0.85rem",
 },
};

// ===================== DATA =====================
// NOTE: card-la amount show pannala, but pricing/plans la use pannura amounts update panniten.
const internships = [
 {
 icon: "💻",
 title: "Web Development",
 duration: "4 Weeks / 8 Weeks",
 description:
 "Learn HTML, CSS, JavaScript, React.js and build real-world projects with industry mentors.",
 features: ["✅ React.js & Node.js", "✅ 3+ Live Projects", "✅ GitHub Portfolio", "✅ Certificate of Completion"],
 },
 {
 icon: "📊",
 title: "Data Analyst",
 duration: "4 Weeks / 8 Weeks",
 description:
 "Learn Excel, SQL, Python basics and dashboards to analyze real datasets and present insights.",
 features: ["✅ Excel + SQL", "✅ Python Basics", "✅ Power BI Dashboards", "✅ Certificate of Completion"],
 },
 {
 icon: "🤖",
 title: "AI & Machine Learning",
 duration: "6 Weeks / 8 Weeks",
 description:
 "Dive into Python, TensorFlow, Pandas and build AI models with hands-on datasets.",
 features: ["✅ Python & TensorFlow", "✅ 3+ ML Projects", "✅ Kaggle Practice", "✅ Certificate of Completion"],
 },
 {
 icon: "🎨",
 title: "UI/UX Design",
 duration: "4 Weeks / 6 Weeks",
 description:
 "Master Figma, wireframing, prototyping, and user research fundamentals.",
 features: ["✅ Figma", "✅ 3+ Design Projects", "✅ Portfolio", "✅ Certificate of Completion"],
 },
 {
 icon: "📈",
 title: "Data Science & Analytics",
 duration: "6 Weeks / 8 Weeks",
 description:
 "Learn SQL, Python, Power BI, and perform data analysis on industry-style datasets.",
 features: ["✅ SQL & Power BI", "✅ Python Analytics", "✅ Dashboard Projects", "✅ Certificate of Completion"],
 },
 {
 icon: "📣",
 title: "Digital Marketing",
 duration: "4 Weeks / 8 Weeks",
 description:
 "Learn SEO, social media, content strategy and performance tracking with practical tasks.",
 features: ["✅ SEO Fundamentals", "✅ Social Media Strategy", "✅ Content Calendar", "✅ Certificate of Completion"],
 },
];

const benefits = [
 { icon: "🏆", title: "Industry Certificate", desc: "Get a verified certificate to boost your resume and profile." },
 { icon: "👨‍💻", title: "Live Projects", desc: "Work on real-world tasks and build portfolio-ready projects." },
 { icon: "🎓", title: "Expert Mentors", desc: "Learn from industry professionals with strong practical guidance." },
 { icon: "📝", title: "Letter of Recommendation", desc: "Top performers receive a personalized LOR." },
 { icon: "🤝", title: "Placement Assistance", desc: "Resume building, mock interviews, and partner referrals." },
 { icon: "📹", title: "Recorded Sessions", desc: "Access recorded content anytime; learn at your pace." },
];

// Pricing update as requested:
const pricingPlans = [
 {
 name: "Basic",
 price: "₹2,499",
 duration: "4 Weeks",
 features: [
 "✅ 1 Internship Domain",
 "✅ Certificate",
 "✅ Recorded Sessions",
 "✅ Email Support",
 "❌ LOR",
 "❌ Placement Assistance",
 ],
 popular: false,
 },
 {
 name: "Pro",
 price: "₹4,999",
 duration: "8 Weeks",
 features: [
 "✅ 1 Internship Domain",
 "✅ Certificate",
 "✅ Live + Recorded Sessions",
 "✅ Priority Support",
 "✅ Letter of Recommendation",
 "❌ Placement Assistance",
 ],
 popular: true,
 },
 {
 name: "Premium",
 price: "₹9,999",
 duration: "12 Weeks",
 features: [
 "✅ 2 Internship Domains",
 "✅ Certificate",
 "✅ Live + Recorded Sessions",
 "✅ 24/7 Mentor Support",
 "✅ Letter of Recommendation",
 "✅ Placement Assistance",
 ],
 popular: false,
 },
];

const testimonials = [
 {
 text: "This internship was amazing! I built projects and improved my resume a lot. Totally worth it!",
 name: "Arun Kumar",
 college: "Anna University, Chennai",
 stars: 5,
 },
 {
 text: "Mentors were super helpful. I learned from scratch and now I can build projects confidently.",
 name: "Priya Sharma",
 college: "VIT, Vellore",
 stars: 5,
 },
 {
 text: "The structure + feedback helped me stay consistent. Good for college students.",
 name: "Mohammed Faizan",
 college: "SRM University, Chennai",
 stars: 5,
 },
];

const faqs = [
 {
 q: "Who can apply for this internship?",
 a: "Any college student (UG/PG) from any branch can apply. Beginner-friendly tracks are available.",
 },
 {
 q: "Is this an online or offline internship?",
 a: "This is a fully online/remote internship. You can learn from anywhere.",
 },
 {
 q: "Will I get a certificate?",
 a: "Yes! Students receive a Certificate of Completion. Top performers may also get an LOR (as per plan).",
 },
 {
 q: "What is the refund policy?",
 a: "Refund policy depends on onboarding and batch start rules. Details will be shared during enrollment.",
 },
 {
 q: "How are the sessions conducted?",
 a: "Live sessions via Meet/Zoom + recorded videos + tasks and reviews.",
 },
 {
 q: "Can I do this along with my college classes?",
 a: "Yes. Flexible schedule designed for students (around 8–10 hours/week).",
 },
];

// ===================== COMPONENT =====================
const InternshipProgramDetail = () => {
 const applyRef = useRef(null);

 const [formData, setFormData] = useState({
 fullName: "",
 email: "",
 phone: "",
 college: "",
 year: "",
 domain: "",
 plan: "",
 message: "",
 });

 const [openFaq, setOpenFaq] = useState(null);
 const [submitted, setSubmitted] = useState(false);

 const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

 const scrollToApply = () => applyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

 const handleApplyForDomain = (domainTitle) => {
 setFormData((p) => ({ ...p, domain: domainTitle }));
 // slight delay so state set aagum
 setTimeout(scrollToApply, 50);
 };

 const handleSubmit = (e) => {
 e.preventDefault();
 console.log("Application Submitted:", formData);
 setSubmitted(true);
 setTimeout(() => setSubmitted(false), 4000);

 setFormData({
 fullName: "",
 email: "",
 phone: "",
 college: "",
 year: "",
 domain: "",
 plan: "",
 message: "",
 });
 };

 return (
 <div style={styles.page}>
 {/* ========== HERO ========== */}
 <section style={styles.hero}>
 <div style={styles.heroBadge}>🎯 Batch Starting Soon — Limited Seats!</div>
 <h1 style={styles.heroTitle}>Launch Your Tech Career</h1>
 <p style={styles.heroSub}>
 Hands-on internship program for college students. Learn from mentors, build real projects,
 and get certified — fully online.
 </p>

 <button
 style={styles.heroBtn}
 onClick={scrollToApply}
 onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
 onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
 >
 Apply Now
 </button>
 </section>

 {/* ========== STATS ========== */}
 <section style={styles.statsSection}>
 {[
 { num: "10,000+", label: "Students Trained" },
 { num: "500+", label: "College Partners" },
 { num: "95%", label: "Satisfaction Rate" },
 { num: "50+", label: "Industry Mentors" },
 ].map((stat, i) => (
 <div key={i} style={styles.statBox}>
 <div style={styles.statNum}>{stat.num}</div>
 <div style={styles.statLabel}>{stat.label}</div>
 </div>
 ))}
 </section>

 {/* ========== INTERNSHIP DOMAINS ========== */}
 <section id="internships" style={styles.internshipSection}>
 <h2 style={styles.sectionTitle}>🎯 Internship Domains</h2>
 <p style={styles.sectionSub}>Choose your track and start building your career today</p>

 <div style={styles.cardGrid}>
 {internships.map((item, i) => (
 <div
 key={i}
 style={styles.card}
 onMouseEnter={(e) => {
 e.currentTarget.style.transform = "translateY(-5px)";
 e.currentTarget.style.boxShadow = "0 16px 40px rgba(37,99,235,0.12)";
 e.currentTarget.style.borderColor = "rgba(37,99,235,0.35)";
 }}
 onMouseLeave={(e) => {
 e.currentTarget.style.transform = "translateY(0)";
 e.currentTarget.style.boxShadow = "0 10px 30px rgba(2,6,23,0.06)";
 e.currentTarget.style.borderColor = "transparent";
 }}
 >
 <div style={styles.cardIcon}>{item.icon}</div>
 <div style={styles.cardTitle}>{item.title}</div>
 <div style={styles.cardDuration}>⏱ {item.duration}</div>
 <div style={styles.cardDesc}>{item.description}</div>

 <ul style={styles.cardFeatures}>
 {item.features.map((f, j) => (
 <li key={j} style={styles.cardFeatureItem}>
 {f}
 </li>
 ))}
 </ul>

 {/* Only Apply button at bottom */}
 <button
 style={styles.cardApplyBtn}
 onClick={() => handleApplyForDomain(item.title)}
 >
 Apply Now
 </button>
 </div>
 ))}
 </div>
 </section>

 {/* ========== BENEFITS ========== */}
 <section id="benefits" style={styles.benefitsSection}>
 <h2 style={styles.sectionTitle}>🎁 What You Get</h2>
 <p style={styles.sectionSub}>More than just an internship — it's a career accelerator</p>

 <div style={styles.benefitGrid}>
 {benefits.map((b, i) => (
 <div key={i} style={styles.benefitCard}>
 <div style={styles.benefitIcon}>{b.icon}</div>
 <div style={styles.benefitTitle}>{b.title}</div>
 <div style={styles.benefitDesc}>{b.desc}</div>
 </div>
 ))}
 </div>
 </section>

 {/* ========== PRICING ========== */}
 <section id="pricing" style={styles.pricingSection}>
 <h2 style={styles.sectionTitle}>💰 Pricing Plans</h2>
 <p style={styles.sectionSub}>Affordable plans designed for college students</p>

 <div style={styles.pricingGrid}>
 {pricingPlans.map((plan, i) => (
 <div key={i} style={plan.popular ? styles.pricingPopular : styles.pricingCard}>
 {plan.popular && <div style={styles.popularBadge}>POPULAR</div>}

 <div style={{ ...styles.pricingName, color: plan.popular ? "#fff" : BRAND.ink }}>
 {plan.name}
 </div>

 <div style={styles.pricingPrice}>{plan.price}</div>
 <div style={styles.pricingDuration}>{plan.duration}</div>

 <ul style={styles.pricingFeatures}>
 {plan.features.map((f, j) => (
 <li
 key={j}
 style={{
 ...styles.pricingFeatureItem,
 borderBottom: plan.popular
 ? "1px solid rgba(255,255,255,0.16)"
 : "1px solid rgba(0,0,0,0.06)",
 }}
 >
 {f}
 </li>
 ))}
 </ul>

 <button
 style={plan.popular ? styles.pricingBtnPopular : styles.pricingBtn}
 onClick={() => {
 setFormData((p) => ({ ...p, plan: `${plan.name} - ${plan.price} (${plan.duration})` }));
 scrollToApply();
 }}
 >
 Get Started
 </button>
 </div>
 ))}
 </div>
 </section>

 {/* ========== TESTIMONIALS ========== */}
 <section style={styles.testimonialSection}>
 <h2 style={styles.sectionTitle}>💬 Student Reviews</h2>
 <p style={styles.sectionSub}>Hear from our past interns</p>

 <div style={styles.testimonialGrid}>
 {testimonials.map((t, i) => (
 <div key={i} style={styles.testimonialCard}>
 <div style={styles.stars}>{"⭐".repeat(t.stars)}</div>
 <div style={styles.testimonialText}>"{t.text}"</div>
 <div style={styles.testimonialAuthor}>{t.name}</div>
 <div style={styles.testimonialCollege}>{t.college}</div>
 </div>
 ))}
 </div>
 </section>

 {/* ========== APPLICATION FORM ========== */}
 <section id="apply" style={styles.formSection} ref={applyRef}>
 <h2 style={styles.sectionTitle}>📝 Apply Now</h2>
 <p style={styles.sectionSub}>Fill in your details and secure your seat today!</p>

 <div style={styles.formContainer}>
 {submitted && (
 <div
 style={{
 backgroundColor: "#DCFCE7",
 color: "#14532D",
 padding: "15px 20px",
 borderRadius: "10px",
 marginBottom: "25px",
 fontWeight: 800,
 textAlign: "center",
 border: "1px solid rgba(34,197,94,0.25)",
 }}
 >
 🎉 Application submitted successfully! We'll contact you within 24 hours.
 </div>
 )}

 <form onSubmit={handleSubmit}>
 <div style={styles.formRow}>
 <div>
 <label style={styles.formLabel}>Full Name *</label>
 <input
 type="text"
 name="fullName"
 value={formData.fullName}
 onChange={handleChange}
 placeholder="Enter your full name"
 style={styles.formInput}
 required
 />
 </div>

 <div>
 <label style={styles.formLabel}>Email Address *</label>
 <input
 type="email"
 name="email"
 value={formData.email}
 onChange={handleChange}
 placeholder="you@email.com"
 style={styles.formInput}
 required
 />
 </div>
 </div>

 <div style={styles.formRow}>
 <div>
 <label style={styles.formLabel}>Phone Number *</label>
 <input
 type="tel"
 name="phone"
 value={formData.phone}
 onChange={handleChange}
 placeholder="+91 XXXXX XXXXX"
 style={styles.formInput}
 required
 />
 </div>

 <div>
 <label style={styles.formLabel}>College Name *</label>
 <input
 type="text"
 name="college"
 value={formData.college}
 onChange={handleChange}
 placeholder="Your college name"
 style={styles.formInput}
 required
 />
 </div>
 </div>

 <div style={styles.formRow}>
 <div>
 <label style={styles.formLabel}>Year of Study *</label>
 <select
 name="year"
 value={formData.year}
 onChange={handleChange}
 style={styles.formSelect}
 required
 >
 <option value="">Select Year</option>
 <option value="1st Year">1st Year</option>
 <option value="2nd Year">2nd Year</option>
 <option value="3rd Year">3rd Year</option>
 <option value="4th Year">4th Year</option>
 <option value="PG">Post Graduate</option>
 </select>
 </div>

 <div>
 <label style={styles.formLabel}>Internship Domain *</label>
 <select
 name="domain"
 value={formData.domain}
 onChange={handleChange}
 style={styles.formSelect}
 required
 >
 <option value="">Select Domain</option>
 <option value="Web Development">Web Development</option>
 <option value="Data Analyst">Data Analyst</option>
 <option value="AI & Machine Learning">AI & Machine Learning</option>
 <option value="UI/UX Design">UI/UX Design</option>
 <option value="Data Science & Analytics">Data Science & Analytics</option>
 <option value="Digital Marketing">Digital Marketing</option>
 </select>
 </div>
 </div>

 <div style={styles.formGroup}>
 <label style={styles.formLabel}>Preferred Plan *</label>
 <select
 name="plan"
 value={formData.plan}
 onChange={handleChange}
 style={styles.formSelect}
 required
 >
 <option value="">Select Plan</option>
 <option value="Basic - ₹2499 (4 Weeks)">Basic — ₹2,499 (4 Weeks)</option>
 <option value="Pro - ₹4999 (8 Weeks)">Pro — ₹4,999 (8 Weeks) ⭐ Popular</option>
 <option value="Premium - ₹9999 (12 Weeks)">Premium — ₹9,999 (12 Weeks)</option>
 </select>
 </div>

 <div style={styles.formGroup}>
 <label style={styles.formLabel}>Why do you want to join? (Optional)</label>
 <textarea
 name="message"
 value={formData.message}
 onChange={handleChange}
 placeholder="Tell us about yourself and your goals..."
 style={styles.formTextarea}
 />
 </div>

 <button
 type="submit"
 style={styles.formSubmitBtn}
 onMouseEnter={(e) =>
 (e.target.style.filter = "brightness(0.95)")
 }
 onMouseLeave={(e) =>
 (e.target.style.filter = "brightness(1)")
 }
 >
 🚀 Submit Application
 </button>
 </form>
 </div>
 </section>

 {/* ========== FAQ ========== */}
 <section id="faq" style={styles.faqSection}>
 <h2 style={styles.sectionTitle}>❓ Frequently Asked Questions</h2>
 <p style={styles.sectionSub}>Got questions? We've got answers!</p>

 <div style={styles.faqContainer}>
 {faqs.map((faq, i) => (
 <div key={i} style={styles.faqItem}>
 <div
 style={styles.faqQuestion}
 onClick={() => setOpenFaq(openFaq === i ? null : i)}
 >
 <span>{faq.q}</span>
 <span>{openFaq === i ? "−" : "+"}</span>
 </div>
 {openFaq === i && <div style={styles.faqAnswer}>{faq.a}</div>}
 </div>
 ))}
 </div>
 </section>
 </div>
 );
};

export default InternshipProgramDetail;
