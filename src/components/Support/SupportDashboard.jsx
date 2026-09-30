import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
 MessageSquare,
 Calendar,
 Users,
 Mail,
 Search,
 Filter,
 Eye,
 Trash2,
 ChevronRight,
 Menu,
 X,
 User,
 LogOut,
 ChevronDown,
 LayoutDashboard,
 Bot,
 Clock,
 CheckCircle2,
 AlertCircle,
 Phone,
 Edit3,
 Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from '../UI/Toast';
import API_BASE_URL from '../../config/apiConfig';

const SupportDetailDrawer = ({ isOpen, onClose, item, type, onUpdate }) => {
 const [status, setStatus] = useState('');
 const [remarks, setRemarks] = useState('');
 const [isUpdating, setIsUpdating] = useState(false);

 useEffect(() => {
 if (item) {
 setStatus(item.status || 'In Progress');
 setRemarks(item.remarks || '');
 }
 }, [item]);
 const getIcon = () => {
 switch (type) {
 case 'chatbot-leads': return <MessageSquare className="w-5 h-5" />;
 case 'demo-bookings': return <Calendar className="w-5 h-5" />;
 case 'contacts': return <Users className="w-5 h-5" />;
 case 'enquiries': return <Mail className="w-5 h-5" />;
 default: return <Bot className="w-5 h-5" />;
 }
 };

 const renderDetailValue = (label, value) => {
 if (!value) return null;
 return (
 <div className="space-y-1">
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
 <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
 <p className="text-sm font-medium text-slate-700 leading-relaxed">{value}</p>
 </div>
 </div>
 );
 };

 return (
 <AnimatePresence>
 {isOpen && item && (
 <>
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={onClose}
 className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
 />
 <motion.div
 initial={{ x: '100%' }}
 animate={{ x: 0 }}
 exit={{ x: '100%' }}
 transition={{ type: 'spring', damping: 25, stiffness: 200 }}
 className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[70] flex flex-col font-inter"
 >
 <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10">
 <div className="flex items-center gap-3">
 <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
 {getIcon()}
 </div>
 <h2 className="font-black text-slate-900 tracking-tight">Lead Details</h2>
 </div>
 <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
 <X className="w-5 h-5" />
 </button>
 </div>

 <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-left">
 {/* Profile Header */}
 <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-600/20">
 <div className="flex items-center gap-4">
 <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-black">
 {(item.firstName || item.name || item.fullName || item.company || 'A').charAt(0)}
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="font-black text-xl truncate">{item.firstName || item.name || item.fullName || item.company || 'Anonymous'}</h3>
 <p className="text-blue-100 text-sm opacity-80 truncate">{item.email}</p>
 </div>
 </div>

 <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
 <a href={`mailto:${item.email}`} className="flex items-center justify-center gap-2 py-2.5 bg-white text-blue-600 rounded-xl text-xs font-black transition-all shadow-sm">
 <Mail size={14} /> EMAIL
 </a>
 <a href={`tel:${item.phone}`} className="flex items-center justify-center gap-2 py-2.5 bg-white/10 text-white rounded-xl text-xs font-black transition-all border border-white/10">
 <Phone size={14} /> CALL
 </a>
 </div>
 </div>

 {/* Main Details */}
 <div className="space-y-4">
 {renderDetailValue('Full Name', item.firstName || item.name || item.fullName)}
 {renderDetailValue('Organization', item.company)}
 {renderDetailValue('Email Address', item.email)}
 {renderDetailValue('Phone Number', item.phone || item.contact)}
 {renderDetailValue('Subject / Service', item.service || item.subject || item.product)}
 {renderDetailValue('Budget / Budget Range', item.budget)}
 {renderDetailValue('Requirement Details', item.serviceDescription)}
 {renderDetailValue('Date & Time', item.date || item.timestamp)}
 {renderDetailValue('Message', item.message)}
 </div>

 {/* Interaction Log (Specific for Chatbot Leads) */}
 {type === 'chatbot-leads' && item.interactions && item.interactions.length > 0 && (
 <div className="space-y-4 pt-4 border-t border-slate-100">
 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Conversation History</h4>
 <div className="space-y-3">
 {item.interactions.map((msg, i) => (
 <div key={i} className={`p-3 rounded-2xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-blue-50 text-blue-800 ml-4 rounded-tr-none' : 'bg-slate-100 text-slate-700 mr-4 rounded-tl-none'}`}>
 <p className="font-bold mb-1 opacity-50 uppercase text-[9px]">{msg.role === 'user' ? 'Visitor' : 'Assistant'}</p>
 {msg.content}
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Action & Status Section */}
 <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update Lead Progress</h4>

 <div className="space-y-2">
 <label className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
 <Edit3 size={12} /> CURRENT STATUS
 </label>
 <div className="relative">
 <select
 value={status}
 onChange={(e) => setStatus(e.target.value)}
 className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-bold text-slate-700 appearance-none cursor-pointer"
 >
 <option value="In Progress">In Progress</option>
 <option value="Completed">Completed</option>
 </select>
 <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
 </div>
 </div>

 <div className="space-y-2">
 <label className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
 <MessageSquare size={12} /> INTERNAL REMARKS <span className="text-red-500 font-bold ml-1">*</span>
 </label>
 <textarea
 value={remarks}
 onChange={(e) => setRemarks(e.target.value)}
 placeholder="Add internal notes about this lead..."
 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-600 min-h-[120px] resize-none"
 />
 </div>

 <button
 onClick={async () => {
 if (!remarks.trim()) {
 alert("Please enter internal remarks.");
 return;
 }
 setIsUpdating(true);
 try {
 await onUpdate(item, { status, remarks });
 } finally {
 setIsUpdating(false);
 }
 }}
 disabled={isUpdating}
 className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20 uppercase tracking-wider"
 >
 {isUpdating ? (
 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
 ) : (
 <>
 <Save size={18} /> Update Lead
 </>
 )}
 </button>

 <button
 onClick={() => onUpdate(item, { delete: true })}
 className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-all border border-red-100 uppercase tracking-wider mt-2"
 >
 <Trash2 size={16} /> Delete Lead
 </button>
 </div>
 </div>
 </motion.div>
 </>
 )}
 </AnimatePresence>
 );
};

const SupportDashboard = () => {
 const { tab } = useParams();
 const navigate = useNavigate();
 const { userData, logout } = useAuth();
 const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 const [isProfileOpen, setIsProfileOpen] = useState(false);
 const [searchQuery, setSearchQuery] = useState('');
 const [isFetching, setIsFetching] = useState(false);
 const [selectedItem, setSelectedItem] = useState(null);
 const [isDrawerOpen, setIsDrawerOpen] = useState(false);

 // Data states
 const [chatbotLeads, setChatbotLeads] = useState([]);
 const [bookings, setBookings] = useState([]);
 const [contacts, setContacts] = useState([]);
 const [enquiries, setEnquiries] = useState([]);
 const [showToast, setShowToast] = useState(false);

 const activeTab = tab || 'chatbot-leads';

 const navItems = [
 { id: 'chatbot-leads', label: 'Chatbot Leads', icon: MessageSquare },
 { id: 'demo-bookings', label: 'Demo Bookings', icon: Calendar },
 { id: 'contacts', label: 'Contacts', icon: Users },
 { id: 'enquiries', label: 'Enquiries', icon: Mail },
 ];

 useEffect(() => {
 const loadData = async () => {
 setIsFetching(true);
 try {
 // Fetch all data from API in parallel
 const [chatbotRes, bookingsRes, contactsRes, enquiriesRes] = await Promise.all([
 fetch(`${API_BASE_URL}/api/chatbot-leads`),
 fetch(`${API_BASE_URL}/api/appointments`),
 fetch(`${API_BASE_URL}/api/contacts`),
 fetch(`${API_BASE_URL}/api/service-enquiries`)
 ]);

 const chatbotData = await chatbotRes.json();
 const bookingsData = await bookingsRes.json();
 const contactsData = await contactsRes.json();
 const enquiriesData = await enquiriesRes.json();

 setChatbotLeads(Array.isArray(chatbotData) ? chatbotData : chatbotData.data || []);
 setBookings(Array.isArray(bookingsData) ? bookingsData : bookingsData.data || []);
 setContacts(Array.isArray(contactsData) ? contactsData : contactsData.data || []);
 setEnquiries(Array.isArray(enquiriesData) ? enquiriesData : enquiriesData.data || []);
 } catch (error) {
 console.error("Failed to load support data from API:", error);
 
 // Fallback to localStorage if API fails (optional, but good for resilience during transition)
 const storedChatbotLeads = JSON.parse(localStorage.getItem('chatbot_leads')) || [];
 setChatbotLeads(storedChatbotLeads);
 } finally {
 setIsFetching(false);
 }
 };

 loadData();
 }, []);

 const handleLogout = async () => {
 try {
 await logout();
 navigate('/signin');
 } catch (error) {
 console.error("Logout failed:", error);
 }
 };

 const handleTabChange = (tabId) => {
 navigate(`/support-dashboard/${tabId}`);
 setIsDrawerOpen(false);
 };

 const handleViewItem = (item) => {
 setSelectedItem(item);
 setIsDrawerOpen(true);
 };

 const updateSupportItem = async (originalItem, updates) => {
 if (updates.delete) {
 await handleDelete(originalItem.id);
 return;
 }
 try {
 const endpoints = {
 'chatbot-leads': `/api/chatbot-leads/${originalItem.id}`,
 'demo-bookings': `/api/appointments/${originalItem.id}`,
 'contacts': `/api/contacts/${originalItem.id}`,
 'enquiries': `/api/service-enquiries/${originalItem.id}`,
 };

 const endpoint = endpoints[activeTab];
 if (!endpoint) return;

 const response = await fetch(`${API_BASE_URL}${endpoint}`, {
 method: 'PUT',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(updates)
 });

 if (!response.ok) throw new Error("Failed to update item");

 // Refresh local state based on active tab
 if (activeTab === 'chatbot-leads') {
 setChatbotLeads(prev => prev.map(it => it.id === originalItem.id ? { ...it, ...updates } : it));
 } else if (activeTab === 'demo-bookings') {
 setBookings(prev => prev.map(it => it.id === originalItem.id ? { ...it, ...updates } : it));
 } else if (activeTab === 'contacts') {
 setContacts(prev => prev.map(it => it.id === originalItem.id ? { ...it, ...updates } : it));
 } else if (activeTab === 'enquiries') {
 setEnquiries(prev => prev.map(it => it.id === originalItem.id ? { ...it, ...updates } : it));
 }

 // Update selected item
 if (selectedItem) {
 setSelectedItem(prev => ({ ...prev, ...updates }));
 }

 // Show success toast
 setShowToast(true);
 } catch (error) {
 console.error("Error updating support item via API:", error);
 alert("Failed to update status. Please try again.");
 }
 };

 const handleDelete = async (id) => {
 if (!window.confirm("Are you sure you want to delete this lead?")) return;

 try {
 const endpoints = {
 'chatbot-leads': `/api/chatbot-leads/${id}`,
 'demo-bookings': `/api/appointments/${id}`,
 'contacts': `/api/contacts/${id}`,
 'enquiries': `/api/service-enquiries/${id}`,
 };

 const endpoint = endpoints[activeTab];
 const response = await fetch(`${API_BASE_URL}${endpoint}`, {
 method: 'DELETE'
 });

 if (!response.ok) throw new Error("Failed to delete item");

 // Update local state
 if (activeTab === 'chatbot-leads') setChatbotLeads(prev => prev.filter(it => it.id !== id));
 if (activeTab === 'demo-bookings') setBookings(prev => prev.filter(it => it.id !== id));
 if (activeTab === 'contacts') setContacts(prev => prev.filter(it => it.id !== id));
 if (activeTab === 'enquiries') setEnquiries(prev => prev.filter(it => it.id !== id));

 setIsDrawerOpen(false);
 setShowToast(true);
 } catch (error) {
 console.error("Error deleting item via API:", error);
 alert("Failed to delete item. Please try again.");
 }
 };

 const renderContent = () => {
 const filteredData = (data) => {
 if (!searchQuery) return data;
 return data.filter(item =>
 Object.values(item).some(val =>
 String(val).toLowerCase().includes(searchQuery.toLowerCase())
 )
 );
 };

 const EmptyState = ({ message }) => (
 <tr>
 <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
 <div className="flex flex-col items-center gap-2">
 <AlertCircle className="w-8 h-8 opacity-20" />
 <p className="italic text-sm font-medium">{message}</p>
 </div>
 </td>
 </tr>
 );

 switch (activeTab) {
 case 'chatbot-leads':
 return (
 <div className="space-y-4">
 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-[11px] sm:text-sm">
 <table className="w-full text-left">
 <thead className="bg-slate-50 border-b border-slate-200">
 <tr>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none w-48">Lead Name</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell leading-none">Email</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Status</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Service</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell leading-none">Date</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center leading-none">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {filteredData(chatbotLeads).map((lead) => (
 <tr
 key={lead.id}
 className=" /50 transition-colors cursor-pointer group"
 onClick={() => handleViewItem(lead)}
 >
 <td className="px-6 py-4 font-bold text-slate-900 truncate max-w-[200px] group-hover:text-blue-600 transition-colors uppercase">
 {lead.firstName || lead.name || 'Anonymous'}
 </td>
 <td className="px-6 py-4 text-slate-500 hidden sm:table-cell">{lead.email || 'N/A'}</td>
 <td className="px-6 py-4">
 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${lead.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
 }`}>
 {lead.status || 'In Progress'}
 </span>
 </td>
 <td className="px-6 py-4">
 <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">{lead.service || 'Interquiry'}</span>
 </td>
 <td className="px-6 py-4 text-slate-500 hidden md:table-cell">
 {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Just now'}
 </td>
 <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
 <button
 onClick={() => handleViewItem(lead)}
 className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
 >
 <Eye size={16} />
 </button>
 </td>
 </tr>
 ))}
 {filteredData(chatbotLeads).length === 0 && (
 <EmptyState message="No chatbot leads found" />
 )}
 </tbody>
 </table>
 </div>
 </div>
 );
 case 'demo-bookings':
 return (
 <div className="space-y-4">
 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-[11px] sm:text-sm">
 <table className="w-full text-left">
 <thead className="bg-slate-50 border-b border-slate-200">
 <tr>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell">Email</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Message</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {filteredData(bookings).map((booking) => (
 <tr
 key={booking.id}
 className=" /50 transition-colors cursor-pointer group"
 onClick={() => handleViewItem(booking)}
 >
 <td className="px-6 py-4 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{booking.fullName}</td>
 <td className="px-6 py-4 text-slate-500 hidden sm:table-cell">{booking.email}</td>
 <td className="px-6 py-4 text-center">
 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${booking.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
 }`}>
 {booking.status || 'In Progress'}
 </span>
 </td>
 <td className="px-6 py-4 text-slate-500">{booking.date}</td>
 <td className="px-6 py-4 text-slate-500 hidden md:table-cell truncate max-w-[200px]">{booking.message}</td>
 <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
 <button
 onClick={() => handleViewItem(booking)}
 className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
 >
 <Eye size={16} />
 </button>
 </td>
 </tr>
 ))}
 {filteredData(bookings).length === 0 && (
 <EmptyState message="No bookings found" />
 )}
 </tbody>
 </table>
 </div>
 </div>
 );
 case 'contacts':
 return (
 <div className="space-y-4">
 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-[11px] sm:text-sm">
 <table className="w-full text-left">
 <thead className="bg-slate-50 border-b border-slate-200">
 <tr>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell">Email</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Subject</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {filteredData(contacts).map((contact) => (
 <tr
 key={contact.id}
 className=" /50 transition-colors cursor-pointer group"
 onClick={() => handleViewItem(contact)}
 >
 <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap group-hover:text-blue-600 transition-colors">{contact.name || `${contact.firstName} ${contact.lastName}`}</td>
 <td className="px-6 py-4 text-slate-500 hidden sm:table-cell">{contact.email}</td>
 <td className="px-6 py-4">
 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${contact.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
 }`}>
 {contact.status || 'In Progress'}
 </span>
 </td>
 <td className="px-6 py-4 text-slate-500">{contact.phone}</td>
 <td className="px-6 py-4 text-slate-500 hidden md:table-cell">{contact.subject}</td>
 <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
 <button
 onClick={() => handleViewItem(contact)}
 className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
 >
 <Eye size={16} />
 </button>
 </td>
 </tr>
 ))}
 {filteredData(contacts).length === 0 && (
 <EmptyState message="No contact submissions found" />
 )}
 </tbody>
 </table>
 </div>
 </div>
 );
 case 'enquiries':
 return (
 <div className="space-y-4">
 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-[11px] sm:text-sm">
 <table className="w-full text-left">
 <thead className="bg-slate-50 border-b border-slate-200">
 <tr>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Organization/Lead</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell leading-none">Email</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Status</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Service</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell leading-none">Budget</th>
 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center leading-none">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {filteredData(enquiries).map((enq) => (
 <tr
 key={enq.id}
 className=" /50 transition-colors cursor-pointer group"
 onClick={() => handleViewItem(enq)}
 >
 <td className="px-6 py-4 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{enq.company || enq.name}</td>
 <td className="px-6 py-4 text-slate-500 hidden sm:table-cell">{enq.email}</td>
 <td className="px-6 py-4">
 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${enq.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
 }`}>
 {enq.status || 'In Progress'}
 </span>
 </td>
 <td className="px-6 py-4">
 <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold uppercase text-slate-500">{enq.service}</span>
 </td>
 <td className="px-6 py-4 text-slate-500 hidden md:table-cell font-bold">{enq.budget}</td>
 <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
 <button
 onClick={() => handleViewItem(enq)}
 className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
 >
 <Eye size={16} />
 </button>
 </td>
 </tr>
 ))}
 {filteredData(enquiries).length === 0 && (
 <EmptyState message="No enquiries found" />
 )}
 </tbody>
 </table>
 </div>
 </div>
 );
 default:
 return null;
 }
 };

 return (
 <div className="flex min-h-screen bg-slate-50 font-inter">
 {/* Sidebar */}
 <motion.aside
 initial={false}
 animate={{ width: isSidebarOpen ? 260 : 80 }}
 className="fixed left-0 top-0 h-full bg-slate-900 text-white z-50 flex flex-col transition-all duration-300 shadow-2xl"
 >
 <div className="p-6 flex items-center justify-between border-b border-slate-800">
 {isSidebarOpen && <span className="font-bold text-xl tracking-tight text-blue-400">SwordNex Support</span>}
 <button
 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
 className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
 >
 {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
 </button>
 </div>

 <nav className="flex-grow p-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
 {navItems.map((item) => (
 <button
 key={item.id}
 onClick={() => handleTabChange(item.id)}
 className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${activeTab === item.id
 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
 : 'text-slate-400 hover:bg-slate-800 hover:text-white'
 }`}
 >
 <item.icon size={22} className={activeTab === item.id ? 'text-white' : 'group-hover:text-white'} />
 {isSidebarOpen && (
 <div className="flex-grow flex items-center justify-between">
 <span className="font-medium">{item.label}</span>
 <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === item.id
 ? 'bg-white/20 text-white'
 : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
 }`}>
 {item.id === 'chatbot-leads' && chatbotLeads.length}
 {item.id === 'demo-bookings' && bookings.length}
 {item.id === 'contacts' && contacts.length}
 {item.id === 'enquiries' && enquiries.length}
 </span>
 </div>
 )}
 </button>
 ))}
 </nav>

 <div className="p-4 border-t border-slate-800">
 <div className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-lg">
 {userData?.firstName?.charAt(0) || 'S'}
 </div>
 {isSidebarOpen && (
 <div className="overflow-hidden">
 <p className="font-semibold text-sm truncate">{userData?.firstName || 'Support Staff'}</p>
 <p className="text-xs text-slate-500">Support Panel</p>
 </div>
 )}
 </div>
 </div>
 </motion.aside>

 {/* Main Content */}
 <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
 {/* Header */}
 <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-8 py-4 flex items-center justify-between shadow-sm">
 <h1 className="text-2xl font-bold text-slate-900 capitalize">{activeTab.replace('-', ' ')}</h1>

 <div className="flex items-center gap-6">
 <div className="relative hidden md:block w-72">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
 <input
 className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
 placeholder={`Search ${activeTab.replace('-', ' ')}...`}
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 />
 </div>

 <div className="relative">
 <button
 onClick={() => setIsProfileOpen(!isProfileOpen)}
 className="flex items-center gap-3 p-1.5 rounded-xl transition-all border border-transparent hover:border-slate-200"
 >
 <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
 <User size={20} />
 </div>
 <div className="hidden md:block text-left">
 <p className="text-sm font-bold text-slate-900 leading-none">{userData?.firstName || 'User'}</p>
 <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wider">{userData?.role || 'Staff'}</p>
 </div>
 <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
 </button>

 <AnimatePresence>
 {isProfileOpen && (
 <>
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={() => setIsProfileOpen(false)}
 className="fixed inset-0 z-10"
 />
 <motion.div
 initial={{ opacity: 0, y: 10, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 10, scale: 0.95 }}
 className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20"
 >
 <div className="px-4 py-3 border-b border-slate-50 mb-1">
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Signed in as</p>
 <p className="text-sm font-bold text-slate-900 truncate mt-2">{userData?.email}</p>
 </div>

 <button
 onClick={handleLogout}
 className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-sm font-bold"
 >
 <LogOut size={16} />
 <span>Log Out</span>
 </button>
 </motion.div>
 </>
 )}
 </AnimatePresence>
 </div>
 </div>
 </header>

 <div className="p-8 max-w-7xl mx-auto">
 <header className="mb-8">
 <div className="flex items-center gap-3 text-blue-600 mb-2">
 {navItems.find(i => i.id === activeTab)?.icon && React.createElement(navItems.find(i => i.id === activeTab).icon, { size: 20 })}
 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Support Module</span>
 </div>
 <h2 className="text-3xl font-black text-slate-900 tracking-tight">{navItems.find(i => i.id === activeTab)?.label}</h2>
 <p className="text-slate-500 text-sm mt-1">Manage and respond to all your {activeTab.replace('-', ' ')} efficiently.</p>
 </header>

 {renderContent()}
 </div>
 </main>

 <SupportDetailDrawer
 isOpen={isDrawerOpen}
 onClose={() => setIsDrawerOpen(false)}
 item={selectedItem}
 type={activeTab}
 onUpdate={updateSupportItem}
 />

 <Toast
 message="Status Updated Successfully"
 isVisible={showToast}
 onClose={() => setShowToast(false)}
 />

 <style>{`
 @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
 .font-inter { font-family: 'Inter', sans-serif; }
 .custom-scrollbar::-webkit-scrollbar { width: 4px; h: 4px; }
 .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
 .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
 .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
 `}</style>
 </div>
 );
};

export default SupportDashboard;
