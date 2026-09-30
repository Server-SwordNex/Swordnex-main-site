import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => (
 <div className="min-h-[70vh] flex items-center justify-center px-4 py-24">
 <Helmet>
 <title>Page not found | SwordNex Technologies</title>
 <meta name="robots" content="noindex" />
 </Helmet>
 <div className="text-center max-w-md">
 <p className="text-sm font-semibold text-blue-600 tracking-widest uppercase">404</p>
 <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Page not found</h1>
 <p className="mt-4 text-gray-600">The page you are looking for doesn't exist or has moved.</p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
 <Link to="/" className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">Go to home</Link>
 <Link to="/contact" className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">Contact us</Link>
 </div>
 </div>
 </div>
);

export default NotFound;
