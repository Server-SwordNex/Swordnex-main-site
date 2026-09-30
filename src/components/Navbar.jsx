import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
 const { currentUser, userRole } = useAuth();
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const [isDesktopEventOpen, setIsDesktopEventOpen] = useState(false);
 const [isMobileEventOpen, setIsMobileEventOpen] = useState(false);

 const desktopEventRef = useRef(null);
 const location = useLocation();

 const isActive = (path) => {
 if (path === '/') return location.pathname === '/';
 return location.pathname.toLowerCase().startsWith(path.toLowerCase());
 };

 const getDesktopLinkClass = (path) => {
 return `transition ${isActive(path) ? 'text-blue-700 font-bold' : 'hover:text-blue-700'}`;
 };

 const getMobileLinkClass = (path) => {
 return `block py-3 px-4 rounded-lg transition ${isActive(path) ? 'bg-blue-50 text-blue-700 font-bold' : ' '}`;
 };

 useEffect(() => {
 const handleClickOutside = (event) => {
 if (desktopEventRef.current && !desktopEventRef.current.contains(event.target)) {
 setIsDesktopEventOpen(false);
 }
 };

 document.addEventListener('mousedown', handleClickOutside);
 return () => {
 document.removeEventListener('mousedown', handleClickOutside);
 };
 }, []);

 const toggleMobileMenu = () => {
 setIsMobileMenuOpen(!isMobileMenuOpen);
 setIsMobileEventOpen(false);
 };

 const getDashboardPath = () => {
 if (userRole === 'Admin') return '/admin';
 if (userRole === 'HR') return '/hr-dashboard';
 if (userRole === 'Support') return '/support-dashboard';
 if (userRole === 'affiliate') return '/affiliate/dashboard';
 return '/';
 };

 return (
 <nav className="bg-white shadow-lg sticky top-0 z-50">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex justify-between items-center py-4 md:py-5">

 {/* LOGO */}
 <Link to="/" className="flex-shrink-0">
 <img
 src="/assets/Logo.png"
 alt="SwordNex Technologies"
 className="w-[150px] md:w-[150px] h-auto object-contain"
 />
 </Link>

 {/* DESKTOP MENU */}
 <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
 <Link to="/about" className={getDesktopLinkClass('/about')}>About</Link>
 <Link to="/services" className={getDesktopLinkClass('/services')}>Services</Link>
 <Link to="/products" className={getDesktopLinkClass('/products')}>Products</Link>
 <Link to="/career" className={getDesktopLinkClass('/career')}>Career</Link>
 <Link to="/affiliate" className={getDesktopLinkClass('/affiliate')}>Affiliate</Link>

 {/* DESKTOP EVENT DROPDOWN */}
 <div className="relative" ref={desktopEventRef}>
 <button
 type="button"
 onClick={() => setIsDesktopEventOpen(!isDesktopEventOpen)}
 className={`flex items-center gap-1 transition ${isActive('/events') || isActive('/Workshopslist') ? 'text-blue-700 font-bold' : 'hover:text-blue-700'}`}
 >
 Event
 <span
 className={`transform transition-transform duration-300 ${isDesktopEventOpen ? 'rotate-180' : ''
 }`}
 >
 ▾
 </span>
 </button>

 {isDesktopEventOpen && (
 <div
 className="absolute top-full mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
 >
 <Link
 to="/events"
 onClick={() => setIsDesktopEventOpen(false)}
 className={`block px-4 py-3 text-sm transition ${isActive('/events') ? 'bg-blue-50 text-blue-700 font-bold' : ' hover:text-blue-700'}`}
 >
 Events
 </Link>

 <Link
 to="/Workshopslist"
 onClick={() => setIsDesktopEventOpen(false)}
 className={`block px-4 py-3 text-sm transition ${isActive('/Workshopslist') ? 'bg-blue-50 text-blue-700 font-bold' : ' hover:text-blue-700'}`}
 >
 Workshops
 </Link>

 </div>
 )}
 </div>

 </div>

 {/* DESKTOP CTA */}
 <div className="hidden md:flex items-center space-x-6">
 {/* {!currentUser ? (
 <>
 <Link to="/signin" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Sign In</Link>
 <Link to="/signup" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Sign Up</Link>
 </>
 ) : (
 <Link to={getDashboardPath()} className="text-sm font-medium text-blue-600 hover:text-blue-700 transition">Dashboard</Link>
 )} */}
 <Link
 to="/contact"
 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow transition"
 >
 Contact Us
 </Link>
 </div>

 {/* MOBILE MENU BUTTON */}
 <button
 onClick={toggleMobileMenu}
 className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 rounded-lg hover:bg-gray-100 transition"
 >
 <span className={`block w-6 h-0.5 bg-gray-700 transition ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
 <span className={`block w-6 h-0.5 bg-gray-700 transition ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
 <span className={`block w-6 h-0.5 bg-gray-700 transition ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
 </button>
 </div>
 </div>

 {/* MOBILE MENU */}
 {isMobileMenuOpen && (
 <div className="md:hidden bg-white border-t shadow-lg">
 <div className="px-4 pt-4 pb-6 space-y-3">
 <Link to="/about" onClick={toggleMobileMenu} className={getMobileLinkClass('/about')}>About</Link>
 <Link to="/services" onClick={toggleMobileMenu} className={getMobileLinkClass('/services')}>Services</Link>
 <Link to="/products" onClick={toggleMobileMenu} className={getMobileLinkClass('/products')}>Products</Link>
 <Link to="/career" onClick={toggleMobileMenu} className={getMobileLinkClass('/career')}>Career</Link>
 <Link to="/affiliate" onClick={toggleMobileMenu} className={getMobileLinkClass('/affiliate')}>Affiliate</Link>

 {/* MOBILE EVENT DROPDOWN */}
 <div>
 <button
 onClick={() => setIsMobileEventOpen(!isMobileEventOpen)}
 className={`w-full flex justify-between items-center py-3 px-4 rounded-lg transition ${isActive('/events') || isActive('/Workshopslist') ? 'bg-blue-50 text-blue-700 font-bold' : ' '}`}
 >
 <span className="font-medium">Event</span>
 <span
 className={`transform transition-transform duration-300 ${isMobileEventOpen ? 'rotate-180' : ''
 }`}
 >
 ▾
 </span>
 </button>

 <div
 className={`overflow-hidden transition-all duration-300 ease-out
 ${isMobileEventOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
 `}
 >
 <Link to="/Events" onClick={toggleMobileMenu} className={`block py-2 px-6 text-sm transition ${isActive('/Events') ? 'bg-blue-50 text-blue-700 font-bold' : ' '}`}>
 Events
 </Link>
 <Link to="/Workshopslist" onClick={toggleMobileMenu} className={`block py-2 px-6 text-sm transition ${isActive('/Workshopslist') ? 'bg-blue-50 text-blue-700 font-bold' : ' '}`}>
 Workshops
 </Link>

 </div>
 </div>

 {/* {!currentUser ? (
 <>
 <Link to="/signin" onClick={toggleMobileMenu} className="block py-3 px-4 rounded-lg uppercase font-bold text-xs tracking-widest text-slate-400">Sign In</Link>
 <Link to="/signup" onClick={toggleMobileMenu} className="block py-3 px-4 rounded-lg uppercase font-bold text-xs tracking-widest text-slate-400">Sign Up</Link>
 </>
 ) : (
 <Link to={getDashboardPath()} onClick={toggleMobileMenu} className="block py-3 px-4 rounded-lg uppercase font-bold text-xs tracking-widest text-blue-600">Dashboard</Link>
 )} */}

 <Link
 to="/contact"
 onClick={toggleMobileMenu}
 className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center font-semibold shadow"
 >
 Contact Us
 </Link>
 </div>
 </div>
 )}
 </nav>
 );
};

export default Navbar;
