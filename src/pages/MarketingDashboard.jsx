import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
 LayoutDashboard, Megaphone, BarChart3, Menu, X, LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const MarketingDashboard = () => {
 const { tab } = useParams();
 const navigate = useNavigate();
 const { logout } = useAuth();
 const activeTab = tab || 'overview';
 const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 const [isProfileOpen, setIsProfileOpen] = useState(false);

 const sidebarItems = [
 { id: 'overview', label: 'Overview', icon: LayoutDashboard },
 { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
 { id: 'analytics', label: 'Analytics', icon: BarChart3 },
 ];

 const handleLogout = async () => {
 await logout();
 navigate('/signin', { replace: true });
 };

 return (
 <div className="flex min-h-screen bg-slate-50">
 {/* Sidebar */}
 <motion.aside
 initial={false}
 animate={{ width: isSidebarOpen ? 260 : 80 }}
 className="fixed left-0 top-0 h-full bg-slate-900 text-white z-50 flex flex-col transition-all duration-300 shadow-2xl"
 >
 <div className="p-6 flex items-center justify-between border-b border-slate-800">
 {isSidebarOpen && <span className="font-bold text-xl tracking-tight text-blue-400">SwordNex Marketing</span>}
 <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
 {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
 </button>
 </div>

 <nav className="flex-grow p-4 space-y-2 mt-4">
 {sidebarItems.map((item) => (
 <button
 key={item.id}
 onClick={() => navigate(`/marketing-dashboard/${item.id}`)}
 className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${activeTab === item.id
 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
 : 'text-slate-400 hover:bg-slate-800 hover:text-white'
 }`}
 >
 <item.icon size={22} />
 {isSidebarOpen && <span className="font-medium">{item.label}</span>}
 </button>
 ))}
 </nav>

 <div className="p-4 border-t border-slate-800">
 <div className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-lg">M</div>
 {isSidebarOpen && (
 <div className="overflow-hidden">
 <p className="font-semibold text-sm truncate">Marketing Team</p>
 <p className="text-xs text-slate-500">marketing@swordnex.com</p>
 </div>
 )}
 </div>
 </div>
 </motion.aside>

 {/* Main Content */}
 <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
 <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-8 py-4 flex items-center justify-between shadow-sm">
 <h1 className="text-2xl font-bold text-slate-900 capitalize">{activeTab}</h1>
 <div className="flex items-center gap-4">
 <div className="relative">
 <button onClick={() => setIsProfileOpen(!isProfileOpen)}
 className="flex items-center gap-3 p-1.5 rounded-xl transition-all border border-transparent hover:border-slate-200">
 <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">M</div>
 {isSidebarOpen && <span className="text-sm font-medium text-slate-700">Marketing</span>}
 </button>
 {isProfileOpen && (
 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
 <button onClick={handleLogout}
 className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
 <LogOut size={16} /> Sign Out
 </button>
 </div>
 )}
 </div>
 </div>
 </header>

 <div className="p-8 max-w-7xl mx-auto">
 {activeTab === 'overview' && (
 <div className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {[
 { label: 'Active Campaigns', value: '0', color: 'blue' },
 { label: 'Leads Generated', value: '0', color: 'green' },
 { label: 'Conversion Rate', value: '0%', color: 'purple' },
 ].map((stat, i) => (
 <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
 <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
 <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
 </div>
 ))}
 </div>
 <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
 <Megaphone className="w-16 h-16 text-slate-300 mx-auto mb-4" />
 <h2 className="text-xl font-bold text-slate-800 mb-2">Marketing Dashboard</h2>
 <p className="text-slate-500">Campaign management and analytics features coming soon.</p>
 </div>
 </div>
 )}
 {activeTab === 'campaigns' && (
 <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
 <Megaphone className="w-16 h-16 text-slate-300 mx-auto mb-4" />
 <h2 className="text-xl font-bold text-slate-800 mb-2">Campaigns</h2>
 <p className="text-slate-500">Campaign management coming soon.</p>
 </div>
 )}
 {activeTab === 'analytics' && (
 <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
 <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
 <h2 className="text-xl font-bold text-slate-800 mb-2">Analytics</h2>
 <p className="text-slate-500">Marketing analytics coming soon.</p>
 </div>
 )}
 </div>
 </main>
 </div>
 );
};

export default MarketingDashboard;
