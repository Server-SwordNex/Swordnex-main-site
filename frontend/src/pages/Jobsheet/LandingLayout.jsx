import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer2/Footer'

export default function LandingLayout() {
 return (
 <>
 <Navbar />
 <main>
 <Outlet />
 </main>
 <Footer />
 </>
 );
}
