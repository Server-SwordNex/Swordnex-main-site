import React from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import Features from "../Features/Features";
import Footer from "../Footer/Footer";
import PricingSection from "../PricingSection/PricingSection";
import styles from "./MainPage.module.css"


const MainPage = () => {
 return (
 <div className={styles.container}>

 <div>
 {/* <Navbar /> */}

 <Hero />

 <Features />

 <PricingSection />

 {/* <Footer /> */}
 </div>

 </div>
 );
};

export default MainPage;
