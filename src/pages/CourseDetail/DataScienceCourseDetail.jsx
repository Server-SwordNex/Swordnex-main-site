import React, { useState } from "react";
import CourseEnquiryForm from "../../components/CourseEnquiryForm";
import CourseLinks from "../../components/CourseLinks";
import { Helmet } from "react-helmet-async";

// --- ASSETS CONFIGURATION ---
const ASSETS = {
 logo: "/assets/swordnex-logo.png",
 heroIllustration:
 "https://img.freepik.com/free-vector/data-scientist-concept-illustration_114360-2834.jpg?w=1200",
 aboutImage:
 "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
 qrCode: "/assets/qr-code.png",
};

// --- DATA ---
const highlights = [
 { icon: "⏰", title: "280+ Hours", sub: "Online Class" },
 { icon: "🤝", title: "1:1 Mentoring", sub: "Personal Guidance" },
 { icon: "🧠", title: "Industry Experts", sub: "AI/ML-Driven Learning" },
 { icon: "✅", title: "90+ Certified", sub: "Learner Outcomes" },
 { icon: "🚀", title: "100% Placement", sub: "Data Science Career Support" },
];

const whoWeAre = [
 {
 title: "Students ↔ Coaches",
 desc: "Enable meaningful connections between students and data science mentors.",
 },
 {
 title: "Colleges ↔ Employers",
 desc: "Coach and train college students and provide employers with ML-ready talent.",
 },
 {
 title: "Students ↔ Employers",
 desc: "Connect data science talent to the right professional opportunities.",
 },
];

const timeline = [
 { week: "1–3", title: "Mathematics & Statistics for Data Science", tags: ["Linear Algebra", "Probability"] },
 { week: "4–7", title: "Python Programming & Data Manipulation", tags: ["Pandas", "NumPy", "Live Project"] },
 { week: "8–11", title: "Exploratory Data Analysis & Visualization", tags: ["Matplotlib", "Seaborn", "Case Study"] },
 { week: "12–16", title: "Machine Learning Fundamentals", tags: ["Scikit-Learn", "Live Project"] },
 { week: "17–20", title: "Advanced ML & Ensemble Methods", tags: ["XGBoost", "Random Forest", "Case Study"] },
 { week: "21–24", title: "Deep Learning & Neural Networks", tags: ["TensorFlow", "Keras", "Live Project"] },
 { week: "25–28", title: "NLP, Computer Vision & MLOps Basics", tags: ["Transformers", "OpenCV"] },
 { week: "29–32", title: "Capstone Projects & Portfolio Building", tags: ["End-to-End ML", "Portfolio Review"] },
];

const whyChoose = [
 {
 icon: "📈",
 title: "Explosive Industry Growth",
 desc: "Data Science is one of the fastest-growing fields with massive demand across all industries.",
 },
 {
 icon: "💰",
 title: "Top-Tier Salary Packages",
 desc: "Data Scientists command premium salaries, often among the highest-paid tech professionals.",
 },
 {
 icon: "💻",
 title: "Remote & Global Opportunities",
 desc: "Work remotely with global companies, research labs, startups, and consulting firms.",
 },
 {
 icon: "👑",
 title: "End-to-End ML Ownership",
 desc: "Own the complete ML pipeline — from data collection to model deployment and monitoring.",
 },
];

const modules = [
 {
 icon: "📐",
 title: "Mathematics, Statistics & Python",
 desc: "Master linear algebra, calculus basics, probability, distributions, hypothesis testing, and Python programming (data types, functions, OOP). Learn Pandas for data manipulation and NumPy for numerical computing.",
 assignment: "Build a complete statistical analysis notebook — perform hypothesis tests, visualize distributions, and present insights on a real-world dataset using Python.",
 },
 {
 icon: "🔍",
 title: "EDA, SQL & Feature Engineering",
 desc: "Learn exploratory data analysis (EDA), data cleaning, missing value treatment, outlier detection, feature scaling, encoding categorical variables, feature selection, and SQL for data extraction from relational databases.",
 assignment: "Perform end-to-end EDA on a complex dataset — clean data, engineer features, write SQL queries, and document insights with visualizations.",
 },
 {
 icon: "🤖",
 title: "Machine Learning & Model Building",
 desc: "Master supervised learning (regression, classification), unsupervised learning (clustering, dimensionality reduction), model evaluation metrics, cross-validation, hyperparameter tuning, and ensemble methods (Random Forest, XGBoost, Gradient Boosting).",
 assignment: "Build and deploy a complete ML pipeline for a real-world prediction problem — from data preprocessing to model selection, tuning, and evaluation.",
 },
 {
 icon: "🧠",
 title: "Deep Learning, NLP & Capstone",
 desc: "Learn neural network fundamentals, CNNs for computer vision, RNNs/LSTMs for sequences, NLP basics (tokenization, embeddings, transformers), transfer learning, model deployment basics, and MLOps fundamentals.",
 assignment: "Create an end-to-end deep learning project — build a neural network model, train on real data, deploy as an API, and present a complete portfolio case study.",
 },
];

const skills = [
 "Linear Algebra & Calculus",
 "Probability & Statistics",
 "Python Programming",
 "Pandas & NumPy",
 "Data Cleaning & Wrangling",
 "Exploratory Data Analysis (EDA)",
 "Feature Engineering",
 "SQL (MySQL / PostgreSQL)",
 "Matplotlib, Seaborn & Plotly",
 "Scikit-Learn",
 "Supervised Learning (Regression & Classification)",
 "Unsupervised Learning (Clustering & PCA)",
 "Ensemble Methods (Random Forest, XGBoost)",
 "Deep Learning (TensorFlow / Keras / PyTorch)",
 "Neural Networks (ANN, CNN, RNN)",
 "Natural Language Processing (NLP)",
 "Computer Vision Basics",
 "Model Deployment & APIs",
 "MLOps Fundamentals",
 "Git & Version Control",
 "Portfolio & Case Study Building",
];

const placementSteps = [
 "Role Clarity",
 "Knowledge Check",
 "Project Assignment",
 "Project Evaluation",
 "Resume Building",
 "Mock Interview",
];

const targetAudience = [
 { icon: "🎓", label: "College Freshers (STEM)" },
 { icon: "💼", label: "0–5 Yrs Experience" },
 { icon: "📊", label: "Data Analysts Upskilling" },
 { icon: "🖥️", label: "Software Engineers Switching" },
];

const toolsUsed = [
 "Python",
 "Pandas",
 "NumPy",
 "Matplotlib",
 "Seaborn",
 "Plotly",
 "Scikit-Learn",
 "TensorFlow",
 "Keras",
 "PyTorch",
 "XGBoost",
 "SQL",
 "Jupyter Notebook",
 "Google Colab",
 "Git & GitHub",
 "Kaggle",
 "Hugging Face",
 "FastAPI",
 "Docker (Basics)",
 "AWS SageMaker (Intro)",
];

// --- CSS (BLUE + WHITE THEME) ---
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

:root{
 --primary:#0B5ED7;
 --primary-700:#0849A6;
 --primary-50:#EAF2FF;
 --ink:#0F172A;
 --muted:#475569;
 --card:#FFFFFF;
 --line:#E5E7EB;
 --shadow: 0 10px 30px rgba(2, 6, 23, 0.08);
 --shadowHover: 0 20px 45px rgba(2, 6, 23, 0.14);
}

*{ box-sizing:border-box; }
body{ margin:0; font-family:Poppins, system-ui, -apple-system, Segoe UI, Roboto, Arial; color:var(--ink); background:#fff; }

a{ color:inherit; }
.container{ width:min(1150px, 92%); margin:0 auto; }

.section{ padding:84px 0; }
.section.soft{ background: linear-gradient(180deg, #FFFFFF 0%, var(--primary-50) 100%); }
.section.light{ background:#F8FAFF; }

.kicker{
 display:inline-flex; align-items:center; gap:10px;
 padding:8px 14px;
 border-radius:999px;
 background:var(--primary-50);
 color:var(--primary);
 font-weight:700;
 letter-spacing:.06em;
 text-transform:uppercase;
 font-size:.78rem;
 border:1px solid rgba(11,94,215,.12);
}

.h2{
 margin:14px 0 10px;
 font-size: clamp(1.8rem, 2.6vw, 2.6rem);
 line-height:1.15;
 font-weight:800;
 color:var(--primary);
}

.p{
 margin:0;
 color:var(--muted);
 line-height:1.75;
 font-size:1rem;
}

.center{ text-align:center; }
.mb-40{ margin-bottom:40px; }
.mt-24{ margin-top:24px; }
.mt-32{ margin-top:32px; }

.btnRow{ display:flex; gap:14px; flex-wrap:wrap; margin-top:26px; }
.btn{
 display:inline-flex; align-items:center; justify-content:center;
 padding:14px 18px;
 border-radius:14px;
 font-weight:700;
 text-decoration:none;
 transition: transform .2s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease, color .2s ease;
 border:1px solid transparent;
}
.btnPrimary{
 background:linear-gradient(135deg, var(--primary), #2F80FF);
 color:#fff;
 box-shadow: 0 12px 26px rgba(11,94,215,.22);
}
.btnPrimary:hover{ transform: translateY(-2px); box-shadow: 0 18px 40px rgba(11,94,215,.26); }
.btnGhost{
 background:#fff;
 color:var(--primary);
 border-color: rgba(11,94,215,.28);
}
.btnGhost:hover{ transform: translateY(-2px); box-shadow: var(--shadow); border-color: rgba(11,94,215,.5); }

.card{
 background:var(--card);
 border:1px solid var(--line);
 border-radius:18px;
 padding:22px;
 box-shadow: 0 8px 20px rgba(2, 6, 23, 0.06);
 transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.card:hover{
 transform: translateY(-10px);
 box-shadow: var(--shadowHover);
 border-color: rgba(11,94,215,.22);
}

.grid2{ display:grid; grid-template-columns: 1.1fr .9fr; gap:44px; align-items:center; }
.grid3{ display:grid; grid-template-columns: repeat(3, 1fr); gap:22px; }
.grid4{ display:grid; grid-template-columns: repeat(4, 1fr); gap:18px; }

.hero{
 padding:92px 0;
 background:
 radial-gradient(1200px 520px at 20% 10%, rgba(11,94,215,.14) 0%, rgba(11,94,215,0) 60%),
 radial-gradient(900px 520px at 90% 15%, rgba(47,128,255,.14) 0%, rgba(47,128,255,0) 58%),
 linear-gradient(180deg, #FFFFFF 0%, #F7FBFF 100%);
}
.heroTitle{
 margin:14px 0 10px;
 font-size: clamp(2.2rem, 4vw, 3.6rem);
 line-height:1.05;
 font-weight:900;
}
.heroSub{
 margin:0;
 color:var(--muted);
 font-size:1.05rem;
 line-height:1.75;
 max-width:52ch;
}
.badges{ display:flex; gap:10px; flex-wrap:wrap; margin-top:18px; }
.badge{
 display:inline-flex; align-items:center;
 padding:8px 12px; border-radius:999px;
 background:#fff;
 border:1px solid rgba(11,94,215,.16);
 color:var(--primary);
 font-weight:700;
 font-size:.86rem;
}

.heroMedia{
 border-radius:22px;
 border:1px solid rgba(11,94,215,.16);
 background:#fff;
 box-shadow: var(--shadow);
 overflow:hidden;
}
.heroMedia img{ width:100%; display:block; }

.aboutImg{
 width:100%;
 border-radius:22px;
 border:1px solid rgba(11,94,215,.14);
 box-shadow: var(--shadow);
}

.highlightIcon{
 width:54px; height:54px;
 border-radius:14px;
 background: var(--primary-50);
 display:flex; align-items:center; justify-content:center;
 font-size:1.65rem;
 border:1px solid rgba(11,94,215,.12);
 margin-bottom:12px;
}
.h3{
 margin:0;
 font-size:1.05rem;
 font-weight:800;
 color:var(--ink);
}
.sub{
 margin:6px 0 0;
 color:var(--muted);
 font-size:.92rem;
}

.timeline{
 display:grid;
 grid-template-columns: 1fr;
 gap:14px;
 width:min(920px, 100%);
 margin:0 auto;
}
.tRow{
 display:grid;
 grid-template-columns: 110px 1fr;
 gap:14px;
 align-items:stretch;
}
.tWeek{
 border-radius:16px;
 background: linear-gradient(135deg, var(--primary), #2F80FF);
 color:#fff;
 font-weight:900;
 display:flex; align-items:center; justify-content:center;
 padding:16px 12px;
 text-align:center;
}
.tCard{
 border-left:6px solid rgba(11,94,215,.85);
 border-radius:16px;
 background:#fff;
 border:1px solid var(--line);
 padding:18px 18px;
 box-shadow: 0 8px 18px rgba(2, 6, 23, 0.06);
 transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.tCard:hover{ transform: translateX(8px); box-shadow: var(--shadowHover); border-color: rgba(11,94,215,.22); }
.tags{ margin-top:10px; display:flex; gap:8px; flex-wrap:wrap; }
.tag{
 font-size:.78rem;
 font-weight:700;
 color:var(--primary);
 background: var(--primary-50);
 border:1px solid rgba(11,94,215,.12);
 padding:6px 10px;
 border-radius:999px;
}

.moduleWrap{
 width:min(980px, 100%);
 margin:0 auto;
 display:grid;
 grid-template-columns: repeat(2, 1fr);
 gap:18px;
}
.module{
 position:relative;
 overflow:hidden;
 padding:24px 22px 20px;
}
.module::before{
 content:"";
 position:absolute;
 inset:0;
 background:
 radial-gradient(600px 260px at 10% 0%, rgba(11,94,215,.10) 0%, rgba(11,94,215,0) 55%),
 radial-gradient(520px 260px at 90% 20%, rgba(47,128,255,.10) 0%, rgba(47,128,255,0) 55%);
 pointer-events:none;
}
.moduleTop{
 position:relative;
 display:flex;
 gap:12px;
 align-items:flex-start;
}
.moduleIcon{
 width:52px; height:52px;
 border-radius:16px;
 display:flex; align-items:center; justify-content:center;
 background: linear-gradient(135deg, var(--primary), #2F80FF);
 color:#fff;
 font-size:1.5rem;
 box-shadow: 0 14px 28px rgba(11,94,215,.22);
}
.moduleTitle{ margin:2px 0 0; font-weight:900; font-size:1.12rem; color:var(--ink); }
.moduleDesc{ position:relative; margin:10px 0 0; color:var(--muted); line-height:1.7; font-size:.95rem; }
.assignment{
 position:relative;
 margin-top:14px;
 padding:12px 12px;
 border-radius:14px;
 background: #F3F8FF;
 border:1px dashed rgba(11,94,215,.28);
 color: #0B2B5B;
 font-weight:600;
 font-size:.92rem;
}

.skillsStats{
 width:min(980px, 100%);
 margin:0 auto 18px;
 display:grid;
 grid-template-columns: repeat(4, 1fr);
 gap:14px;
}
.stat{
 padding:18px;
 border-radius:18px;
 border:1px solid rgba(11,94,215,.14);
 background:#fff;
 box-shadow: 0 8px 18px rgba(2, 6, 23, 0.06);
}
.statK{
 color:var(--primary);
 font-weight:900;
 font-size:1.15rem;
}
.statV{
 margin-top:6px;
 color:var(--muted);
 font-size:.92rem;
 line-height:1.5;
}
.skillPills{
 width:min(980px, 100%);
 margin:0 auto;
 display:flex;
 flex-wrap:wrap;
 gap:10px;
 justify-content:center;
}
.skill{
 padding:10px 14px;
 border-radius:999px;
 border:1px solid rgba(11,94,215,.22);
 background:#fff;
 color:var(--primary);
 font-weight:700;
 font-size:.88rem;
 transition: transform .2s ease, background .2s ease, color .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.skill:hover{
 transform: translateY(-2px);
 background: var(--primary);
 color:#fff;
 border-color: rgba(11,94,215,.65);
 box-shadow: 0 14px 28px rgba(11,94,215,.20);
}

.placementGrid{
 display:grid;
 grid-template-columns: repeat(6, 1fr);
 gap:14px;
}
.step{
 text-align:center;
 padding:18px 12px;
}
.stepNum{
 width:44px; height:44px;
 border-radius:999px;
 margin:0 auto 10px;
 background: var(--primary);
 color:#fff;
 display:flex; align-items:center; justify-content:center;
 font-weight:900;
 box-shadow: 0 0 0 6px rgba(11,94,215,.12);
}
.stepTxt{ font-weight:800; color:var(--ink); font-size:.92rem; }

.cta{
 background: linear-gradient(135deg, var(--primary), #2F80FF);
 color:#fff;
}
.ctaBox{
 width:min(980px, 100%);
 margin:0 auto;
 background:#fff;
 color:var(--ink);
 border-radius:26px;
 border:1px solid rgba(255,255,255,.55);
 box-shadow: var(--shadow);
 padding:28px;
 display:grid;
 grid-template-columns: 1.2fr .8fr;
 gap:20px;
 align-items:center;
}
.qr{
 width:160px; height:160px; object-fit:contain;
 display:block; margin:0 auto;
}
.contactLink{
 display:inline-flex;
 gap:10px;
 align-items:center;
 text-decoration:none;
 font-weight:800;
 color:var(--primary);
}
.contactLink:hover{ color: var(--primary-700); }

.audienceSection{
 margin-top:40px;
 background: var(--ink);
 border-radius:22px;
 padding:36px 30px;
 text-align:center;
}
.audienceGrid{
 display:grid;
 grid-template-columns: repeat(4, 1fr);
 gap:14px;
 margin-top:22px;
}
.audienceCard{
 background: rgba(255,255,255,.08);
 border:1px solid rgba(255,255,255,.12);
 border-radius:16px;
 padding:20px 14px;
 text-align:center;
 transition: background .2s ease;
}
.audienceCard:hover{ background: rgba(255,255,255,.14); }
.audienceIcon{ font-size:2rem; margin-bottom:8px; display:block; }
.audienceLabel{ color:#fff; font-weight:700; font-size:.92rem; }

.toolsSection{
 margin-top:40px;
 text-align:center;
}
.toolsGrid{
 display:flex;
 flex-wrap:wrap;
 gap:12px;
 justify-content:center;
 margin-top:20px;
}
.toolBadge{
 padding:12px 20px;
 border-radius:14px;
 background:#fff;
 border:1px solid var(--line);
 font-weight:700;
 color:var(--ink);
 font-size:.9rem;
 transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
}
.toolBadge:hover{
 transform: translateY(-3px);
 border-color: var(--primary);
 box-shadow: var(--shadow);
}

@media (max-width: 980px){
 .grid2{ grid-template-columns:1fr; }
 .grid4{ grid-template-columns: repeat(2, 1fr); }
 .moduleWrap{ grid-template-columns:1fr; }
 .skillsStats{ grid-template-columns: repeat(2, 1fr); }
 .placementGrid{ grid-template-columns: repeat(3, 1fr); }
 .ctaBox{ grid-template-columns:1fr; text-align:center; }
 .audienceGrid{ grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 540px){
 .grid4{ grid-template-columns:1fr; }
 .skillsStats{ grid-template-columns:1fr; }
 .placementGrid{ grid-template-columns: repeat(2, 1fr); }
 .tRow{ grid-template-columns:1fr; }
 .tWeek{ justify-content:flex-start; padding-left:16px; }
 .audienceGrid{ grid-template-columns:1fr; }
}
`;

function SectionHead({ kicker, title, subtitle }) {
 return (
 <div className="center mb-40">
 {kicker ? <span className="kicker">{kicker}</span> : null}
 <h2 className="h2">{title}</h2>
 {subtitle ? (
 <p className="p" style={{ maxWidth: 820, margin: "0 auto" }}>
 {subtitle}
 </p>
 ) : null}
 </div>
 );
}

export default function DataSciencePage() {
 const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);

 const schemaData = {
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "Course",
 "name": "Advanced Data Science & AI Course in Kumbakonam",
 "description": "Comprehensive Data Science training with SwordNex Technologies. Learn Python, Machine Learning, Deep Learning, Statistics, and Data Visualization with real-world projects.",
 "provider": {
 "@type": "Organization",
 "name": "SwordNex Technologies",
 "url": "https://swordnex.com"
 },
 "url": "https://swordnex.com/course/data-science",
 "educationalLevel": "Intermediate to Advanced",
 "teaches": [
 "Python for Data Science",
 "Applied Statistics & Probability",
 "Machine Learning Algorithms",
 "Deep Learning & Neural Networks",
 "Data Visualization (Matplotlib, Seaborn)",
 "Big Data Handling",
 "Natural Language Processing (NLP)",
 "Model Deployment"
 ],
 "hasCourseInstance": {
 "@type": "CourseInstance",
 "courseMode": ["online", "onsite"],
 "inLanguage": ["en", "ta"]
 }
 },
 {
 "@type": "LocalBusiness",
 "name": "SwordNex Technologies",
 "url": "https://swordnex.com",
 "address": {
 "@type": "PostalAddress",
 "streetAddress": "Your Office Street Address",
 "addressLocality": "Kumbakonam",
 "addressRegion": "Tamil Nadu",
 "postalCode": "612001",
 "addressCountry": "IN"
 },
 "areaServed": [
 "Kumbakonam",
 "Thanjavur",
 "Mayiladuthurai",
 "Papanasam"
 ]
 }
 ]
 };

 return (
 <>
 <Helmet>
 <script type="application/ld+json">
 {JSON.stringify(schemaData)}
 </script>
 </Helmet>
 <style>{styles}</style>

 {/* ===================== HERO ===================== */}
 <section className="hero">
 <div className="container">
 <div className="grid2">
 <div>
 <span className="kicker">SwordNex Technologies</span>
 <h1 className="heroTitle">
 <span style={{ color: "var(--primary)" }}>Data Science</span>
 <br />
 <span style={{ color: "var(--ink)" }}>Learning Path</span>
 </h1>
 <p className="heroSub">
 Become a job-ready Data Scientist with a comprehensive 32-week curriculum covering
 statistics, Python, machine learning, deep learning, NLP, computer vision — with
 live projects, 1:1 mentoring, and placement coaching.
 </p>

 <div className="badges">
 <span className="badge">100% Placement Assistance</span>
 <span className="badge">ML Project-Based Learning</span>
 <span className="badge">Data Science Career Support</span>
 </div>

 <div className="btnRow">
 <a className="btn btnPrimary" href="#contact">
 Enquire Now
 </a>
 <a className="btn btnGhost" href="#modules">
 View Modules
 </a>
 </div>
 </div>

 <div className="heroMedia">
 <img
 src="https://i.pinimg.com/736x/6a/7a/15/6a7a150b675aeb0ed2b1995aa74ceb25.jpg"
 alt="Data Science course by SwordNex"
 />
 </div>
 </div>
 </div>
 </section>

 {/* ===================== HIGHLIGHTS ===================== */}
 <section className="section">
 <div className="container">
 <SectionHead
 kicker="Highlights"
 title="What You'll Get in This Program"
 subtitle="A hands-on roadmap with 280+ hours of data science learning, industry mentors, and career support."
 />

 <div className="grid4">
 {highlights.map((x) => (
 <div key={x.title} className="card">
 <div className="highlightIcon">{x.icon}</div>
 <div className="h3">{x.title}</div>
 <p className="sub">{x.sub}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ===================== ABOUT ===================== */}
 <section className="section light">
 <div className="container">
 <div className="grid2">
 <div>
 <SectionHead
 kicker="About"
 title="About SwordNex"
 subtitle="A full-stack career platform bridging students, coaches, colleges, and employers."
 />
 <p className="p">
 SwordNex Technologies is a forward-thinking IT solutions provider specializing in
 software and app development, digital marketing, creative design, and technology
 training. We operate as a full-stack career platform designed to bridge the gap
 between students, coaches, colleges, and employers.
 </p>
 <p className="p" style={{ marginTop: 14 }}>
 Our Data Science program is built for the real world — combining mathematical
 foundations with hands-on projects using Python, Scikit-Learn, TensorFlow, and
 real-world datasets. Learners graduate with a professional portfolio of ML
 projects ready for job applications and Kaggle competitions.
 </p>

 <div className="mt-24" />

 <div className="grid3">
 {whoWeAre.map((w) => (
 <div key={w.title} className="card">
 <div className="h3" style={{ color: "var(--primary)" }}>
 {w.title}
 </div>
 <p className="sub" style={{ marginTop: 10 }}>
 {w.desc}
 </p>
 </div>
 ))}
 </div>
 </div>

 <div>
 <img
 className="aboutImg"
 src="https://i.pinimg.com/736x/8b/ba/83/8bba83d794f0162a64b31dbddc41d89e.jpg"
 alt="SwordNex data science team and training environment"
 />
 </div>
 </div>
 </div>
 </section>

 {/* ===================== TIMELINE ===================== */}
 <section className="section soft">
 <div className="container">
 <SectionHead
 kicker="Syllabus"
 title="32-Week Learning Timeline"
 subtitle="A comprehensive progression from math foundations to deep learning and capstone projects."
 />

 <div className="timeline">
 {timeline.map((t) => (
 <div className="tRow" key={t.title}>
 <div className="tWeek">
 {t.week}
 <br />
 Week
 </div>
 <div className="tCard">
 <div className="h3">{t.title}</div>
 <div className="tags">
 {t.tags.map((tag) => (
 <span key={tag} className="tag">
 {tag}
 </span>
 ))}
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ===================== WHY CHOOSE ===================== */}
 <section className="section">
 <div className="container">
 <SectionHead
 kicker="Why Data Science"
 title="Why Choose Data Science as a Career?"
 subtitle="Build predictive models, extract insights, and drive strategic decisions across every industry."
 />

 <div className="grid4">
 {whyChoose.map((w) => (
 <div key={w.title} className="card" style={{ textAlign: "center" }}>
 <div
 className="highlightIcon"
 style={{
 width: 70,
 height: 70,
 borderRadius: 18,
 margin: "0 auto 12px",
 fontSize: "2rem",
 }}
 >
 {w.icon}
 </div>
 <div className="h3">{w.title}</div>
 <p className="sub" style={{ marginTop: 10 }}>
 {w.desc}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ===================== MODULES ===================== */}
 <section id="modules" className="section light">
 <div className="container">
 <SectionHead
 kicker="Course in Detail"
 title="Core Chapters with Module-Wise Assignments"
 subtitle="Each module includes hands-on ML practice and an outcome-focused assignment."
 />

 <div className="moduleWrap">
 {modules.map((m, idx) => (
 <div className="card module" key={m.title}>
 <div className="moduleTop">
 <div className="moduleIcon" aria-hidden="true">
 {m.icon}
 </div>
 <div style={{ position: "relative" }}>
 <div
 style={{
 display: "inline-flex",
 alignItems: "center",
 gap: 8,
 fontWeight: 900,
 color: "var(--primary)",
 fontSize: ".82rem",
 letterSpacing: ".06em",
 textTransform: "uppercase",
 }}
 >
 Module {String(idx + 1).padStart(2, "0")}
 </div>
 <div className="moduleTitle">{m.title}</div>
 </div>
 </div>

 <p className="moduleDesc">{m.desc}</p>
 <div className="assignment">
 <strong>Assignment:</strong> {m.assignment}
 </div>
 </div>
 ))}
 </div>

 {/* WHO SHOULD TAKE THIS COURSE */}
 <div className="audienceSection">
 <h2
 style={{
 color: "#fff",
 margin: "0 0 4px",
 fontSize: "1.6rem",
 fontWeight: 800,
 }}
 >
 Who Should Take This Course?
 </h2>
 <p
 style={{
 color: "rgba(255,255,255,.7)",
 margin: 0,
 fontSize: ".95rem",
 }}
 >
 Designed for STEM freshers, data analysts, software engineers, and anyone ready
 to build a career in machine learning and AI.
 </p>
 <div className="audienceGrid">
 {targetAudience.map((a) => (
 <div key={a.label} className="audienceCard">
 <span className="audienceIcon">{a.icon}</span>
 <span className="audienceLabel">{a.label}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* ===================== KEY SKILLS ===================== */}
 <section className="section">
 <div className="container">
 <SectionHead
 kicker="Key Skills"
 title="Key Skills You Will Master"
 subtitle="A complete data science skill stack covering math, programming, ML, deep learning, and deployment."
 />

 {/* Skill summary stats */}
 <div className="skillsStats">
 <div className="stat card">
 <div className="statK">{skills.length}+ Skills</div>
 <div className="statV">
 Covering statistics, Python, ML, deep learning, NLP, and deployment.
 </div>
 </div>
 <div className="stat card">
 <div className="statK">Portfolio Focus</div>
 <div className="statV">
 Every assignment creates a portfolio-ready ML project for interviews.
 </div>
 </div>
 <div className="stat card">
 <div className="statK">ML Pipeline Mastery</div>
 <div className="statV">
 Learn to build, train, evaluate, tune, and deploy machine learning models.
 </div>
 </div>
 <div className="stat card">
 <div className="statK">Industry Tools</div>
 <div className="statV">
 Hands-on with Scikit-Learn, TensorFlow, PyTorch, Kaggle, and cloud platforms.
 </div>
 </div>
 </div>

 {/* Skill pills */}
 <div className="skillPills">
 {skills.map((s) => (
 <span className="skill" key={s}>
 {s}
 </span>
 ))}
 </div>

 {/* Tools Used */}
 <div className="toolsSection">
 <h3
 style={{
 color: "var(--primary)",
 fontWeight: 800,
 fontSize: "1.2rem",
 marginBottom: 8,
 }}
 >
 Tools & Technologies Utilized
 </h3>
 <p className="p">
 Get hands-on experience with the industry's most popular data science and ML tools.
 </p>
 <div className="toolsGrid">
 {toolsUsed.map((tool) => (
 <span className="toolBadge" key={tool}>
 {tool}
 </span>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* ===================== PLACEMENT ===================== */}
 <section className="section soft">
 <div className="container">
 <SectionHead
 kicker="Placement Coaching"
 title="1:1 Placement Coaching Process"
 subtitle="A structured six-step process to make you interview-ready with a strong ML portfolio."
 />

 <div className="placementGrid">
 {placementSteps.map((st, i) => (
 <div key={st} className="card step">
 <div className="stepNum">{i + 1}</div>
 <div className="stepTxt">{st}</div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ===================== CTA ===================== */}
 <section id="contact" className="section cta">
 <div className="container">
 <div className="center mb-40">
 <span
 className="kicker"
 style={{
 background: "rgba(255,255,255,.14)",
 borderColor: "rgba(255,255,255,.22)",
 color: "#fff",
 }}
 >
 Contact
 </span>
 <h2 className="h2" style={{ color: "#fff" }}>
 Ready to Start Your Data Science Journey?
 </h2>
 <p
 className="p"
 style={{
 color: "rgba(255,255,255,.88)",
 maxWidth: 820,
 margin: "0 auto",
 }}
 >
 We're here to guide you from where you are to the data science career you want.
 Talk to our team for course enquiry and career guidance.
 </p>
 </div>

 <div className="ctaBox">
 <div>
 <div className="h3" style={{ fontSize: "1.25rem" }}>
 Still have queries?
 </div>
 <p className="p" style={{ marginTop: 10 }}>
 Whether it's a career transition into data science, your first ML role, or campus
 placement preparation — SwordNex Technologies is your one-stop solution.
 </p>

 <div className="btnRow">
 <a className="btn btnPrimary" href="tel:+919486106953">
 📞 Call for Enquiry
 </a>
 <a
 className="btn btnGhost"
 href="mailto:support@swordnex.com?subject=Data%20Science%20Course%20Enquiry"
 >
 ✉️ Email Us
 </a>
 <a
 className="btn"
 style={{ background: "#16a34a", color: "#fff" }}
 href="https://wa.me/919486106953"
 target="_blank"
 rel="noreferrer"
 >
 💬 WhatsApp
 </a>
 </div>

 <div className="mt-24" />
 <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
 <a className="contactLink" href="mailto:support@swordnex.com">
 ✉️ support@swordnex.com
 </a>
 <a className="contactLink" href="tel:+919486106953">
 📞 +91 94861 06953
 </a>
 </div>
 </div>

 <div className="card" style={{ textAlign: "center" }}>
 <div className="h3" style={{ color: "var(--primary)", marginBottom: 12 }}>
 Ready to Apply?
 </div>
 <button
 className="btn"
 style={{ background: "#2563eb", color: "#fff" }}
 onClick={() => setIsCourseFormOpen(true)}
 >
 Apply Now
 </button>
 <p className="sub">Fill the course enquiry form and we’ll reach out.</p>
 </div>
 </div>
 </div>
 </section>
 <CourseEnquiryForm
 isOpen={isCourseFormOpen}
 onClose={() => setIsCourseFormOpen(false)}
 course="Data Science"
 />
 <CourseLinks />
 </>
 );
}
