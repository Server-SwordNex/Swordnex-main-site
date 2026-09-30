import React from "react";
import { Link } from "react-router-dom";

const courses = [
 { title: "Digital Marketing", path: "/course/digital-marketing" },
 { title: "UI/UX Design", path: "/course/uiux-design" },
 { title: "Data Analytics", path: "/course/data-analytics" },
 { title: "Data Science", path: "/course/data-science" },
 { title: "AI/ML", path: "/course/ai-ml" },
 { title: "App Development", path: "/course/app-development" },
 { title: "Full Stack Development", path: "/course/fullstack-development" },
 { title: "Internship Program", path: "/course/internship" },
];

const CourseLinks = () => {
 return (
 <section className="section light">
 <div className="container" style={{ textAlign: "center" }}>
 <div style={{ marginBottom: 18 }}>
 <span
 style={{
 display: "inline-block",
 padding: "8px 14px",
 borderRadius: 999,
 background: "#eef2ff",
 color: "#2563eb",
 fontWeight: 700,
 letterSpacing: ".04em",
 textTransform: "uppercase",
 fontSize: ".78rem",
 border: "1px solid rgba(37,99,235,.12)",
 }}
 >
 Our Other Courses
 </span>
 <h2
 style={{
 margin: "14px 0 10px",
 fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)",
 lineHeight: 1.15,
 fontWeight: 800,
 color: "#0B5ED7",
 }}
 >
 Explore More Programs
 </h2>
 </div>
 <div
 style={{
 display: "grid",
 gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
 gap: 14,
 maxWidth: 900,
 margin: "0 auto",
 }}
 >
 {courses.map((c) => (
 <Link
 key={c.path}
 to={c.path}
 style={{
 display: "inline-flex",
 alignItems: "center",
 justifyContent: "center",
 padding: "12px 16px",
 borderRadius: 14,
 fontWeight: 700,
 textDecoration: "none",
 border: "1px solid #e5e7eb",
 background: "#fff",
 color: "#0F172A",
 }}
 >
 {c.title}
 </Link>
 ))}
 </div>
 </div>
 </section>
 );
};

export default CourseLinks;

