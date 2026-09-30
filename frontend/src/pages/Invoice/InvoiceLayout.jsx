import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import NewScrollToTop from "../../NewScrollToTop";

export default function InvoiceLayout() {
 return (
 <div style={{ fontFamily: "DM Sans", margin: "0", padding: "0", boxSizing: "border-box" }}>
 <NewScrollToTop />
 <Navbar />

 <main>
 <Outlet />
 </main>

 <Footer />
 </div>
 );
}