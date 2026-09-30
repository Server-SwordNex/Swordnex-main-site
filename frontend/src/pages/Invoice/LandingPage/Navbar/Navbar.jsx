import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import styles from "./Navbar.module.css";
import logo from "./invoiceLogo.png"

const Navbar = () => {
 const [scrolled, setScrolled] = useState(false);
 const [active, setActive] = useState("features");
 const navigate = useNavigate();

 const menuItems = [
 { name: "Features", id: "features" },
 { name: "Pricing", id: "pricing" },
 { name: "Contact", id: "contact" },
 { name: "Login", id: "login" }
 ];

 // Navbar shadow on scroll
 useEffect(() => {
 const handleScroll = () => {
 setScrolled(window.scrollY > 10);
 };

 window.addEventListener("scroll", handleScroll);

 return () =>
 window.removeEventListener("scroll", handleScroll);
 }, []);

 // Scroll Spy (auto highlight)

useEffect(() => {
 const sections = menuItems
 .map((item) =>
 document.getElementById(item.id)
 )
 .filter(Boolean);

 if (sections.length === 0) return;

 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 setActive(entry.target.id);
 }
 });
 },
 {
 root: null,
 rootMargin: "-80px 0px -50% 0px",
 threshold: 0.1
 }
 );

 sections.forEach((section) =>
 observer.observe(section)
 );

 return () => {
 sections.forEach((section) =>
 observer.unobserve(section)
 );
 };
}, []);

 const scrollToSection = (id) => {
 setActive(id); // immediate highlight on click

 // If Login is clicked → navigate to /login
 if (id === "login") {
 navigate("/login");
 return;
 }

 const element =
 document.getElementById(id);

 if (element) {
 element.scrollIntoView({
 behavior: "smooth",
 block: "start"
 });
 }
 };

 return (
 <nav
 className={`${styles.navbar} ${
 scrolled ? styles.scrolled : ""
 }`}
 >
 <div className={styles.logo}>
 <img src={logo} alt="logo" style={{width: "150px", height: "45px"}} />
 </div>

 <ul className={styles.links}>
 {menuItems.map((item) => (
 <li
 key={item.id}
 onClick={() =>
 scrollToSection(item.id)
 }
 className={
 active === item.id
 ? styles.active
 : ""
 }
 >
 {item.name}
 </li>
 ))}
 </ul>

 <button className={styles.button}>
 Get Started
 </button>
 </nav>
 );
};

export default Navbar;