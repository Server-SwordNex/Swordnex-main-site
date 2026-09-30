import React, { useState } from "react";
import CourseEnquiryForm from "../../components/CourseEnquiryForm";
import CourseLinks from "../../components/CourseLinks";
import { Helmet, HelmetData } from "react-helmet-async";


<Helmet>
 <title>
 AI & Machine Learning Course Online with Placement | SwordNex
 </title>
</Helmet>



// --- ASSETS CONFIGURATION ---
const ASSETS = {
 logo: "/assets/swordnex-logo.png",
 heroIllustration:
 "https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-7135.jpg?w=1200",
 aboutImage:
 "https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&w=1200&q=80",
 qrCode: "/assets/qr-code.png",
};

// --- DATA ---
const highlights = [
 { icon: "⏰", title: "320+ Hours", sub: "Online Class" },
 { icon: "🤝", title: "1:1 Mentoring", sub: "Personal Guidance" },
 { icon: "🤖", title: "Industry Experts", sub: "AI/ML-Led Learning" },
 { icon: "✅", title: "90+ Certified", sub: "Learner Outcomes" },
 { icon: "🚀", title: "100% Placement", sub: "AI/ML Career Support" },
];

const whoWeAre = [
 {
 title: "Students ↔ Coaches",
 desc: "Enable meaningful connections between students and AI/ML mentors.",
 },
 {
 title: "Colleges ↔ Employers",
 desc: "Coach and train college students and provide employers with AI-ready talent.",
 },
 {
 title: "Students ↔ Employers",
 desc: "Connect AI/ML talent to the right professional opportunities.",
 },
];

const timeline = [
 { week: "1–4", title: "Mathematics for AI/ML", tags: ["Linear Algebra", "Calculus", "Probability"] },
 { week: "5–8", title: "Python Programming & Data Foundations", tags: ["Pandas", "NumPy", "Live Project"] },
 { week: "9–12", title: "Machine Learning Fundamentals", tags: ["Scikit-Learn", "Supervised Learning"] },
 { week: "13–16", title: "Advanced ML & Ensemble Methods", tags: ["XGBoost", "Random Forest", "Case Study"] },
 { week: "17–21", title: "Deep Learning & Neural Networks", tags: ["TensorFlow", "Keras", "PyTorch"] },
 { week: "22–26", title: "Computer Vision & CNNs", tags: ["OpenCV", "Image Classification", "Live Project"] },
 { week: "27–31", title: "NLP & Transformers", tags: ["BERT", "GPT", "Hugging Face", "Case Study"] },
 { week: "32–35", title: "Generative AI & LLMs", tags: ["LangChain", "Prompt Engineering", "RAG"] },
 { week: "36–40", title: "MLOps, Deployment & Capstone", tags: ["Docker", "AWS", "Portfolio Review"] },
];

const whyChoose = [
 {
 icon: "🚀",
 title: "Future-Proof Career",
 desc: "AI/ML is transforming every industry. Professionals with these skills are in massive demand globally.",
 },
 {
 icon: "💰",
 title: "Premium Salary Packages",
 desc: "AI/ML engineers command some of the highest salaries in the tech industry worldwide.",
 },
 {
 icon: "🌍",
 title: "Global & Remote Opportunities",
 desc: "Work with global tech giants, research labs, startups, and consulting firms from anywhere.",
 },
 {
 icon: "👑",
 title: "End-to-End AI Ownership",
 desc: "Build intelligent systems from data collection to model deployment and monitoring.",
 },
];

const modules = [
 {
 icon: "📐",
 title: "Mathematics, Statistics & Python",
 desc: "Master linear algebra, calculus, probability, statistics, and Python programming. Learn NumPy for numerical computing, Pandas for data manipulation, and Matplotlib/Seaborn for visualization.",
 assignment: "Build a complete statistical analysis notebook with hypothesis testing, visualizations, and insights on a real-world dataset using Python.",
 },
 {
 icon: "🤖",
 title: "Machine Learning Mastery",
 desc: "Learn supervised learning (linear/logistic regression, decision trees, SVM, KNN), unsupervised learning (K-Means, PCA, DBSCAN), model evaluation, cross-validation, hyperparameter tuning, and ensemble methods (Random Forest, XGBoost, Gradient Boosting).",
 assignment: "Build an end-to-end ML pipeline for a real-world prediction problem — from data preprocessing to model selection, tuning, evaluation, and interpretation.",
 },
 {
 icon: "🧠",
 title: "Deep Learning & Neural Networks",
 desc: "Master neural network fundamentals (perceptrons, activation functions, backpropagation), CNNs for computer vision, RNNs/LSTMs for sequences, transfer learning, and frameworks like TensorFlow, Keras, and PyTorch.",
 assignment: "Build and train a deep learning model for image classification using CNNs — implement data augmentation, transfer learning, and achieve high accuracy on a benchmark dataset.",
 },
 {
 icon: "💬",
 title: "NLP, Generative AI & MLOps",
 desc: "Learn NLP fundamentals (tokenization, embeddings, attention), transformers (BERT, GPT), Hugging Face, generative AI, LangChain, prompt engineering, RAG systems, model deployment (FastAPI, Docker), and MLOps basics (CI/CD, monitoring).",
 assignment: "Create an end-to-end AI application — build a chatbot or text generation system using LLMs, deploy as an API, and present a complete portfolio case study.",
 },
];

const skills = [
 "Linear Algebra & Calculus",
 "Probability & Statistics",
 "Python Programming",
 "Pandas & NumPy",
 "Data Preprocessing & Feature Engineering",
 "Exploratory Data Analysis (EDA)",
 "Supervised Learning",
 "Unsupervised Learning",
 "Ensemble Methods (Random Forest, XGBoost)",
 "Scikit-Learn",
 "Deep Learning Fundamentals",
 "TensorFlow & Keras",
 "PyTorch",
 "Convolutional Neural Networks (CNNs)",
 "Recurrent Neural Networks (RNNs/LSTMs)",
 "Computer Vision (OpenCV)",
 "Natural Language Processing (NLP)",
 "Transformers (BERT, GPT)",
 "Hugging Face",
 "Generative AI & LLMs",
 "LangChain & Prompt Engineering",
 "RAG (Retrieval-Augmented Generation)",
 "Model Deployment (FastAPI, Flask)",
 "Docker & Containerization",
 "MLOps Fundamentals",
 "AWS SageMaker / GCP AI Platform",
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
 { icon: "🎓", label: "STEM Graduates" },
 { icon: "💼", label: "0–5 Yrs Experience" },
 { icon: "📊", label: "Data Professionals Upskilling" },
 { icon: "🖥️", label: "Software Engineers Transitioning" },
];

const toolsUsed = [
 "Python",
 "Pandas",
 "NumPy",
 "Matplotlib",
 "Seaborn",
 "Scikit-Learn",
 "TensorFlow",
 "Keras",
 "PyTorch",
 "XGBoost",
 "OpenCV",
 "NLTK",
 "SpaCy",
 "Hugging Face",
 "LangChain",
 "OpenAI API",
 "FastAPI",
 "Flask",
 "Docker",
 "Jupyter Notebook",
 "Google Colab",
 "Kaggle",
 "Git & GitHub",
 "AWS SageMaker",
 "MLflow",
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

export default function AIMLCourseDetail() {
 const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);

 const schemaData = {
 "@context": "https://schema.org",
 "@type": "Course",
 "name": "Artificial Intelligence & Machine Learning Course",
 "description": "40-week AI and ML course with deep learning, NLP, GenAI and 1:1 placement coaching.",
 "provider": {
 "@type": "Organization",
 "name": "SwordNex",
 "url": "https://swordnex.com"
 },
 "url": "https://www.swordnex.com/course/ai-ml",
 "timeRequired": "P40W",
 "educationalLevel": "Beginner to Advanced",
 "teaches": ["Machine Learning", "Deep Learning", "NLP", "Generative AI", "Python", "MLOps"],
 "hasCourseInstance": {
 "@type": "CourseInstance",
 "courseMode": "online",
 "inLanguage": "en"
 }
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
 <span style={{ color: "var(--primary)" }}>Artificial Intelligence</span>
 <br />
 <span style={{ color: "var(--ink)" }}>&amp; Machine Learning</span>
 </h1>
 <p className="heroSub">
 Become a job-ready AI/ML Engineer with a comprehensive 40-week curriculum covering
 mathematics, machine learning, deep learning, NLP, computer vision, generative AI,
 and MLOps — with live projects, 1:1 mentoring, and placement coaching.
 </p>

 <div className="badges">
 <span className="badge">100% Placement Assistance</span>
 <span className="badge">AI/ML Project-Based Learning</span>
 <span className="badge">Generative AI & LLMs</span>
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
 src="https://i.pinimg.com/736x/df/cd/a7/dfcda71cbc74053d885199b995494c10.jpg"
 alt="AI & ML course by SwordNex"
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
 subtitle="A hands-on roadmap with 320+ hours of AI/ML learning, industry mentors, and career support."
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
 Our AI & ML program is built for the real world — combining mathematical
 foundations with hands-on projects using TensorFlow, PyTorch, Hugging Face,
 LangChain, and real-world datasets. Learners graduate with a professional portfolio
 of AI projects ready for job applications and industry challenges.
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
 src="https://i.pinimg.com/736x/b8/d1/b3/b8d1b346af8e009d7c44b5bd61a032ff.jpg"
 alt="SwordNex AI/ML team and training environment"
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
 title="40-Week Learning Timeline"
 subtitle="A comprehensive progression from math foundations to generative AI, MLOps, and capstone projects."
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
 kicker="Why AI & ML"
 title="Why Choose AI & ML as a Career?"
 subtitle="Build intelligent systems that transform industries — from healthcare and finance to autonomous vehicles and beyond."
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
 subtitle="Each module includes hands-on AI/ML practice and an outcome-focused assignment."
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
 Designed for STEM graduates, data professionals, software engineers, and anyone ready
 to build a career in artificial intelligence and machine learning.
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
 subtitle="A complete AI/ML skill stack covering math, programming, ML, deep learning, NLP, generative AI, and deployment."
 />

 {/* Skill summary stats */}
 <div className="skillsStats">
 <div className="stat card">
 <div className="statK">{skills.length}+ Skills</div>
 <div className="statV">
 Covering math, ML, deep learning, NLP, computer vision, and GenAI.
 </div>
 </div>
 <div className="stat card">
 <div className="statK">Portfolio Focus</div>
 <div className="statV">
 Every assignment creates a portfolio-ready AI project for interviews.
 </div>
 </div>
 <div className="stat card">
 <div className="statK">End-to-End AI Pipeline</div>
 <div className="statV">
 Learn to build, train, evaluate, tune, deploy, and monitor AI systems.
 </div>
 </div>
 <div className="stat card">
 <div className="statK">Industry Tools</div>
 <div className="statV">
 Hands-on with TensorFlow, PyTorch, Hugging Face, LangChain, and cloud platforms.
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
 Get hands-on experience with the industry's most popular AI/ML frameworks and tools.
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
 subtitle="A structured six-step process to make you interview-ready with a strong AI/ML portfolio."
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

 {/* ===================== FAQ ===================== */}
 <section className="section">
 <div className="container">
 <SectionHead
 kicker="FAQ"
 title="Frequently Asked Questions"
 subtitle="Everything you need to know about SwordNex's AI & Machine Learning course."
 />

 <div style={{ maxWidth: 820, margin: "0 auto" }}>
 {[
 {
 q: "Is this AI/ML course suitable for beginners?",
 a: "Yes. SwordNex's AI and Machine Learning course starts from scratch — no prior coding or AI experience needed. We cover mathematics, Python programming, and core ML before advancing to deep learning and GenAI."
 },
 {
 q: "What is the duration of the AI ML course?",
 a: "The course is a comprehensive 40-week (10-month) program with live sessions, weekly assignments, and real-world projects across 8 learning modules."
 },
 {
 q: "Does this course include placement assistance?",
 a: "Yes. SwordNex provides 1:1 placement coaching, resume building, mock interviews, and direct industry referrals to help you land your first AI/ML job."
 },
 {
 q: "What tools and technologies will I learn?",
 a: "Python, TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy, BERT, LangChain, GPT APIs, Docker, AWS, and more — all the tools employers look for in 2025."
 },
 {
 q: "Will I get a certificate after completing the course?",
 a: "Yes. You'll receive an industry-recognized AI & Machine Learning certification from SwordNex upon successful course completion."
 }
 ].map((faq, idx) => (
 <details
 key={idx}
 style={{
 marginBottom: 14,
 border: "1px solid rgba(11,94,215,.14)",
 borderRadius: 14,
 padding: 18,
 cursor: "pointer",
 background: "#fff",
 transition: "all .2s ease"
 }}
 >
 <summary
 style={{
 fontWeight: 800,
 fontSize: "1rem",
 color: "var(--ink)",
 outline: "none"
 }}
 >
 {faq.q}
 </summary>
 <p
 style={{
 marginTop: 12,
 color: "var(--muted)",
 lineHeight: 1.7,
 fontSize: ".95rem"
 }}
 >
 {faq.a}
 </p>
 </details>
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
 Ready to Start Your AI/ML Journey?
 </h2>
 <p
 className="p"
 style={{
 color: "rgba(255,255,255,.88)",
 maxWidth: 820,
 margin: "0 auto",
 }}
 >
 We're here to guide you from where you are to the AI/ML career you want.
 Talk to our team for course enquiry and career guidance.
 </p>
 </div>

 <div className="ctaBox">
 <div>
 <div className="h3" style={{ fontSize: "1.25rem" }}>
 Still have queries?
 </div>
 <p className="p" style={{ marginTop: 10 }}>
 Whether it's a career transition into AI/ML, your first machine learning role, or campus
 placement preparation — SwordNex Technologies is your one-stop solution.
 </p>

 <div className="btnRow">
 <a className="btn btnPrimary" href="tel:+919486106953">
 📞 Call for Enquiry
 </a>
 <a
 className="btn btnGhost"
 href="mailto:support@swordnex.com?subject=AI%20ML%20Course%20Enquiry"
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
 course="AI/ML"
 />
 <CourseLinks />
 </>
 );
}
