import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
 { path: '/affiliate/dashboard', label: 'Dashboard', icon: 'dashboard' },
 { path: '/affiliate/links', label: 'Referral Links', icon: 'link' },
 { path: '/affiliate/commissions', label: 'Commissions', icon: 'payments' },
 { path: '/affiliate/payouts', label: 'Payouts', icon: 'account_balance' },
 { path: '/affiliate/settings', label: 'Settings', icon: 'settings' },
];

const AffiliateLayout = ({ children }) => {
 const location = useLocation();
 const navigate = useNavigate();
 const { userData, logout } = useAuth();
 const [sidebarOpen, setSidebarOpen] = useState(false);

 const handleLogout = async () => {
 await logout();
 navigate('/affiliate/login');
 };

 return (
 <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
 <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
 <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
 <Link to="/affiliate/dashboard" className="flex items-center gap-2">
 <span className="text-lg font-bold text-gray-900 dark:text-white">SwordNex</span>
 <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">Affiliate</span>
 </Link>
 <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
 <span className="material-symbols-outlined">close</span>
 </button>
 </div>
 <nav className="p-4 space-y-1">
 {navItems.map((item) => {
 const isActive = location.pathname === item.path;
 return (
 <Link
 key={item.path}
 to={item.path}
 className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700/50'}`}
 >
 <span className="material-symbols-outlined text-lg">{item.icon}</span>
 {item.label}
 </Link>
 );
 })}
 </nav>
 <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
 <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg dark:hover:bg-gray-700/50 transition-all">
 <span className="material-symbols-outlined text-lg">arrow_back</span>
 Back to Main Site
 </Link>
 </div>
 </aside>

 <div className="flex-1 flex flex-col min-w-0">
 <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
 <div className="flex items-center gap-3">
 <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
 <span className="material-symbols-outlined">menu</span>
 </button>
 <h2 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
 {navItems.find(n => location.pathname === n.path)?.label || 'Dashboard'}
 </h2>
 </div>
 <div className="flex items-center gap-4">
 <div className="text-right hidden sm:block">
 <p className="text-sm font-medium text-gray-900 dark:text-white">{userData?.firstName} {userData?.lastName}</p>
 <p className="text-xs text-gray-500 dark:text-gray-400">{userData?.referralCode}</p>
 </div>
 <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
 {userData?.firstName?.charAt(0) || 'A'}
 </div>
 <button
 onClick={handleLogout}
 className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
 >
 <span className="material-symbols-outlined">logout</span>
 </button>
 </div>
 </header>
 <main className="flex-1 p-4 lg:p-8 overflow-auto">
 {children}
 </main>
 </div>

 {sidebarOpen && (
 <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
 )}
 </div>
 );
};

export default AffiliateLayout;
