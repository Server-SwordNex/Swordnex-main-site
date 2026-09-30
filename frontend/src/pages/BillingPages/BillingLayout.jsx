import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import ScrollToTop from "./ScrollToTop";

export default function BillingLayout() {
 return (
 <div style={{ fontFamily: "DM Sans", margin: "0", padding: "0", boxSizing: "border-box" }}>
 <ScrollToTop />
 <Navbar />

 <main>
 <Outlet />
 </main>

 <Footer />
 </div>
 );
}