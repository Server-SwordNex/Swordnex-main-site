import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../config/apiConfig';
import {
 Users,
 LayoutDashboard,
 Search,
 Filter,
 Eye,
 Mail,
 Phone,
 Briefcase,
 Calendar,
 ChevronRight,
 Menu,
 X,
 Clock,
 Download,
 User,
 LogOut,
 ChevronDown,
 Edit3,
 MessageSquare,
 Save,
 MapPin,
 FolderOpen,
 DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from '../UI/Toast';

const ApplicantDrawer = ({ isOpen, onClose, applicant, isFetching, onUpdate }) => {
 const [status, setStatus] = useState('');
 const [remarks, setRemarks] = useState('');
 const [isUpdating, setIsUpdating] = useState(false);

 useEffect(() => {
 if (applicant) {
 setStatus(applicant.status || 'Pending');
 setRemarks(applicant.remarks || '');
 }
 }, [applicant]);

 if (!applicant && !isFetching) return null;

 const handleSave = async () => {
 if (!remarks.trim()) {
 alert("Please enter internal remarks.");
 return;
 }
 setIsUpdating(true);
 try {
 await onUpdate(applicant.id, { status, remarks });
 } catch (error) {
 console.error("Failed to update applicant:", error);
 } finally {
 setIsUpdating(false);
 }
 };

 return (
 <AnimatePresence>
 {isOpen && (
 <>
 {/* Backdrop */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={onClose}
 className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
 />

 {/* Drawer */}
 <motion.div
 initial={{ x: '100%' }}
 animate={{ x: 0 }}
 exit={{ x: '100%' }}
 transition={{ type: 'spring', damping: 25, stiffness: 200 }}
 className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-[70] flex flex-col"
 >
 <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10">
 <h2 className="font-bold text-slate-900">Application Details</h2>
 <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
 <X className="w-5 h-5" />
 </button>
 </div>

 <div className="flex-1 overflow-y-auto p-5 bg-slate-50 space-y-4 custom-scrollbar">
 {isFetching ? (
 <div className="space-y-4 animate-pulse">
 <div className="bg-white rounded-xl border border-slate-200 p-4 h-24"></div>
 <div className="bg-white rounded-xl border border-slate-200 p-4 h-64"></div>
 </div>
 ) : (
 <>
 {/* Profile Header */}
 <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
 <div className="flex items-center gap-4">
 <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-600/20">
 {applicant.name?.charAt(0)}
 </div>
 <div>
 <h3 className="font-bold text-slate-900 text-lg">{applicant.name}</h3>
 <p className="text-sm text-slate-500">{applicant.email}</p>
 <div className="mt-2">
 <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${applicant.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
 applicant.status === 'Review' ? 'bg-amber-100 text-amber-700' :
 applicant.status === 'Interview On going' ? 'bg-purple-100 text-purple-700' :
 applicant.status === 'Selected' ? 'bg-emerald-100 text-emerald-700' :
 applicant.status === 'Rejected' ? 'bg-red-100 text-red-700' :
 'bg-slate-100 text-slate-700'
 }`}>
 {applicant.status}
 </span>
 </div>
 </div>
 </div>
 </div>

 {/* Action Shortcuts */}
 <div className="grid grid-cols-2 gap-2">
 <a href={`mailto:${applicant.email}`} className="flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-bold transition-all border border-blue-100">
 <Mail size={14} /> Email
 </a>
 <a href={`tel:${applicant.phone}`} className="flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold transition-all border border-slate-200">
 <Phone size={14} /> Call
 </a>
 </div>

 {/* Detailed Information */}
 <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Detailed Information</h4>
 <div className="grid grid-cols-1 gap-5">
 {[
 { label: 'Role Applied', value: applicant.role, icon: Briefcase },
 { label: 'Location', value: applicant.location, icon: Clock },
 { label: 'Mobile Number', value: applicant.phone, icon: Phone },
 { label: 'Applied On', value: applicant.date, icon: Calendar },
 ].map((info, i) => (
 <div key={i} className="flex items-start gap-3">
 <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
 <info.icon size={16} />
 </div>
 <div>
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{info.label}</p>
 <p className="text-sm font-semibold text-slate-900">{info.value || 'N/A'}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Evaluation Section */}
 <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Feedback & Status</h4>

 <div className="space-y-2">
 <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
 <Edit3 size={12} /> Application Status
 </label>
 <div className="relative">
 <select
 value={status}
 onChange={(e) => setStatus(e.target.value)}
 className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-semibold text-slate-700 appearance-none cursor-pointer"
 >
 <option value="Review">Review</option>
 <option value="Interview On going">Interview On going</option>
 <option value="Selected">Selected</option>
 <option value="Rejected">Rejected</option>
 </select>
 <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
 </div>
 </div>

 <div className="space-y-2">
 <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
 <MessageSquare size={12} /> Internal Remarks <span className="text-red-500 font-bold ml-1">*</span>
 </label>
 <textarea
 value={remarks}
 onChange={(e) => setRemarks(e.target.value)}
 placeholder="Add internal notes about this candidate..."
 className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-600 min-h-[100px] resize-none"
 />
 </div>

 <button
 onClick={handleSave}
 disabled={isUpdating}
 className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20"
 >
 {isUpdating ? (
 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
 ) : (
 <>
 <Save size={18} /> Save Changes
 </>
 )}
 </button>
 </div>
 </>
 )}
 </div>

 <div className="p-4 border-t border-slate-200 bg-white">
 <button
 onClick={onClose}
 className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
 >
 Close Details
 </button>
 </div>
 </motion.div>
 </>
 )}
 </AnimatePresence>
 );
};

const JobDetailDrawer = ({ isOpen, onClose, job, isFetching }) => {
 if (!job && !isFetching) return null;

 return (
 <AnimatePresence>
 {isOpen && (
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
 className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-[70] flex flex-col"
 >
 <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10">
 <h2 className="font-bold text-slate-900">Job Details</h2>
 <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
 <X className="w-5 h-5" />
 </button>
 </div>

 <div className="flex-1 overflow-y-auto p-5 bg-slate-50 space-y-4 custom-scrollbar">
 {isFetching ? (
 <div className="space-y-4 animate-pulse">
 <div className="bg-white rounded-xl border border-slate-200 p-4 h-24"></div>
 <div className="bg-white rounded-xl border border-slate-200 p-4 h-64"></div>
 </div>
 ) : (
 <>
 <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
 <div className="flex items-start justify-between">
 <div>
 <h3 className="font-bold text-slate-900 text-xl leading-tight">{job.title}</h3>
 <div className="flex items-center gap-2 mt-2">
 <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${job.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
 }`}>
 {job.status}
 </span>
 <span className="text-xs text-slate-400 font-medium">• Posted: {job.createdAt}</span>
 </div>
 </div>
 <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
 <Briefcase size={24} />
 </div>
 </div>
 </div>

 <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Information</h4>
 <div className="grid grid-cols-2 gap-4">
 {[
 { label: 'Location', value: job.location, icon: MapPin },
 { label: 'Experience', value: job.experience, icon: Clock },
 { label: 'Category', value: job.category, icon: FolderOpen },
 { label: 'Salary', value: job.salary || 'Competitive', icon: DollarSign },
 ].map((info, i) => (
 <div key={i} className="flex flex-col">
 <div className="flex items-center gap-1.5 text-slate-400 mb-1">
 <info.icon size={14} />
 <span className="text-[10px] font-bold uppercase tracking-wider">{info.label}</span>
 </div>
 <p className="text-sm font-semibold text-slate-900">{info.value || 'N/A'}</p>
 </div>
 ))}
 </div>
 </div>

 <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Job Description</h4>
 <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{job.description}</p>
 </div>

 {job.responsibilities && (
 <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Responsibilities</h4>
 <ul className="space-y-2">
 {job.responsibilities.split('\n').filter(r => r.trim()).map((r, i) => (
 <li key={i} className="text-sm text-slate-600 flex gap-2">
 <span className="text-blue-500 font-bold">•</span>
 <span>{r.trim()}</span>
 </li>
 ))}
 </ul>
 </div>
 )}

 {job.requirements && (
 <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Requirements</h4>
 <ul className="space-y-2">
 {job.requirements.split('\n').filter(r => r.trim()).map((r, i) => (
 <li key={i} className="text-sm text-slate-600 flex gap-2">
 <span className="text-blue-500 font-bold">•</span>
 <span>{r.trim()}</span>
 </li>
 ))}
 </ul>
 </div>
 )}
 </>
 )}
 </div>

 <div className="p-4 border-t border-slate-200 bg-white">
 <button
 onClick={onClose}
 className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
 >
 Close Details
 </button>
 </div>
 </motion.div>
 </>
 )}
 </AnimatePresence>
 );
};

const HrDashboard = () => {
 const { tab } = useParams();
 const navigate = useNavigate();
 const { userData, logout } = useAuth();
 const activeTab = tab || 'overview';

 const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 const [isProfileOpen, setIsProfileOpen] = useState(false);
 const [applications, setApplications] = useState([]);
 const [jobs, setJobs] = useState([]);
 const [loading, setLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState('');
 const [filterStatus, setFilterStatus] = useState('All');
 const [selectedApplicant, setSelectedApplicant] = useState(null);
 const [selectedJob, setSelectedJob] = useState(null);
 const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 const [isJobDrawerOpen, setIsJobDrawerOpen] = useState(false);
 const [isFetching, setIsFetching] = useState(false);

 const handleLogout = async () => {
 try {
 await logout();
 navigate('/signin');
 } catch (error) {
 console.error("Logout failed:", error);
 }
 };

 // Redirect to overview if no tab is provided
 useEffect(() => {
 if (!tab) {
 navigate('/hr-dashboard/overview', { replace: true });
 }
 }, [tab, navigate]);

 const openJobDrawer = async (jobId) => {
 setIsJobDrawerOpen(true);
 setIsFetching(true);
 try {
 const docRef = doc(db, 'jobs', jobId);
 const docSnap = await getDoc(docRef);
 if (docSnap.exists()) {
 setSelectedJob({ id: docSnap.id, ...docSnap.data() });
 }
 } catch (error) {
 console.error("Error fetching job details:", error);
 } finally {
 setIsFetching(false);
 }
 };

 const openDrawer = async (applicantId) => {
 setIsDrawerOpen(true);
 setIsFetching(true);
 try {
 const response = await fetch(`${API_BASE_URL}/api/careers/${applicantId}`);
 if (response.ok) {
 const data = await response.json();
 setSelectedApplicant({
 ...data,
 id: data.id,
 name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
 email: data.email,
 phone: data.phone,
 role: data.role || (data.selectedRoles || []).join(', '),
 location: data.location || 'Applied Online',
 status: data.status || 'Review',
 date: data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A',
 resumeUrl: data.resumeUrl,
 remarks: data.remarks || '',
 });
 }
 } catch (error) {
 console.error("Error fetching applicant details:", error);
 } finally {
 setIsFetching(false);
 }
 };

 const updateApplicant = async (applicantId, updates) => {
 try {
 const response = await fetch(`${API_BASE_URL}/api/careers/${applicantId}`, {
 method: 'PUT',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(updates)
 });

 if (!response.ok) throw new Error('Failed to update');

 const updatedData = await response.json();

 // Update local state
 setApplications(prev => prev.map(app =>
 app.id === applicantId ? { ...app, ...updates } : app
 ));

 // Update selected applicant if open
 if (selectedApplicant?.id === applicantId) {
 setSelectedApplicant(prev => ({ ...prev, ...updates }));
 }

 // Show success toast
 setShowToast(true);
 } catch (error) {
 console.error("Error updating applicant:", error);
 throw error;
 }
 };

 useEffect(() => {
 const fetchData = async () => {
 setLoading(true);
 try {
 // Fetch Applications
 const appResponse = await fetch(`${API_BASE_URL}/api/careers`);
 const appData = await appResponse.json();
 const apps = appData.map(data => {
 return {
 id: data.id,
 name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
 email: data.email,
 phone: data.phone,
 role: data.role || (data.selectedRoles || []).join(', '),
 location: data.location || 'Applied Online',
 status: data.status || 'Review',
 date: data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A',
 resumeUrl: data.resumeUrl,
 };
 });
 setApplications(apps);

 // Fetch Jobs
 const jobResponse = await fetch(`${API_BASE_URL}/api/jobs`);
 const jobsData = await jobResponse.json();
 const jobList = jobsData.map(job => ({
 id: job.id,
 ...job,
 createdAt: job.createdAt ? new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'
 }));
 setJobs(jobList);
 } catch (error) {
 console.error('Failed to load data:', error);
 } finally {
 setLoading(false);
 }
 };
 fetchData();
 }, []);

 const filteredApps = applications.filter(app => {
 const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
 app.email.toLowerCase().includes(searchQuery.toLowerCase());
 const matchesFilter = filterStatus === 'All' || app.status === filterStatus;
 return matchesSearch && matchesFilter;
 });

 const [showToast, setShowToast] = useState(false);

 const sidebarItems = [
 { id: 'overview', label: 'Overview', icon: LayoutDashboard },
 { id: 'applicants', label: 'Applicants', icon: Users, count: applications.length },
 { id: 'jobs', label: 'Jobs', icon: Briefcase, count: jobs.length },
 ];

 const filteredJobs = jobs.filter(job => {
 const matchesSearch = job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
 job.location?.toLowerCase().includes(searchQuery.toLowerCase());
 const matchesFilter = filterStatus === 'All' || job.status === filterStatus;
 return matchesSearch && matchesFilter;
 });

 return (
 <div className="flex min-h-screen bg-slate-50">
 {/* Sidebar */}
 <motion.aside
 initial={false}
 animate={{ width: isSidebarOpen ? 260 : 80 }}
 className="fixed left-0 top-0 h-full bg-slate-900 text-white z-50 flex flex-col transition-all duration-300 shadow-2xl"
 >
 <div className="p-6 flex items-center justify-between border-b border-slate-800">
 {isSidebarOpen && <span className="font-bold text-xl tracking-tight text-blue-400">SwordNex HR</span>}
 <button
 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
 className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
 >
 {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
 </button>
 </div>

 <nav className="flex-grow p-4 space-y-2 mt-4">
 {sidebarItems.map((item) => (
 <button
 key={item.id}
 onClick={() => navigate(`/hr-dashboard/${item.id}`)}
 className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${activeTab === item.id
 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
 : 'text-slate-400 hover:bg-slate-800 hover:text-white'
 }`}
 >
 <item.icon size={22} className={activeTab === item.id ? 'text-white' : 'group-hover:text-white'} />
 {isSidebarOpen && <span className="font-medium">{item.label}</span>}
 </button>
 ))}
 </nav>

 <div className="p-4 border-t border-slate-800">
 <div className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-lg">
 HR
 </div>
 {isSidebarOpen && (
 <div className="overflow-hidden">
 <p className="font-semibold text-sm truncate">HR Department</p>
 <p className="text-xs text-slate-500">hr@swordnex.com</p>
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
 {/* Profile Dropdown */}
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
 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Signed in as</p>
 <p className="text-sm font-bold text-slate-900 truncate mt-1">{userData?.email}</p>
 </div>

 <button
 onClick={handleLogout}
 className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-sm font-bold"
 >
 <LogOut size={18} />
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
 {activeTab === 'applicants' ? (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="space-y-6"
 >
 {/* ... (Existing Applicants Header & Table) ... */}
 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <h2 className="text-lg font-bold text-slate-900">Applicant List</h2>
 <p className="text-slate-500 text-sm">Review all incoming job applications</p>
 </div>

 <div className="flex flex-wrap items-center gap-3">
 <div className="relative">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
 <input
 type="text"
 placeholder="Search name or email..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm w-64"
 />
 </div>

 <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
 <Filter className="text-slate-400" size={16} />
 <select
 value={filterStatus}
 onChange={(e) => setFilterStatus(e.target.value)}
 className="bg-transparent outline-none text-sm font-medium text-slate-700 cursor-pointer"
 >
 <option value="All">All Status</option>
 <option value="Pending">Pending</option>
 <option value="Review">Review</option>
 <option value="Interview On going">Interview On going</option>
 <option value="Selected">Selected</option>
 <option value="Rejected">Rejected</option>
 </select>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-left">
 <thead>
 <tr className="bg-slate-50 border-b border-slate-100">
 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate</th>
 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role & Location</th>
 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Applied Date</th>
 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Resume</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {loading ? (
 [...Array(5)].map((_, i) => (
 <tr key={i} className="animate-pulse">
 <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-32 mb-2"></div><div className="h-3 bg-slate-50 rounded w-48"></div></td>
 <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-24"></div></td>
 <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-20"></div></td>
 <td className="px-6 py-4"><div className="h-6 bg-slate-100 rounded-full w-20"></div></td>
 <td className="px-6 py-4 text-right"><div className="h-8 bg-slate-100 rounded w-8 ml-auto"></div></td>
 </tr>
 ))
 ) : filteredApps.length > 0 ? (
 filteredApps.map((app) => (
 <tr
 key={app.id}
 onClick={() => openDrawer(app.id)}
 className=" /50 transition-colors group cursor-pointer"
 >
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100 uppercase">
 {app.name.charAt(0)}
 </div>
 <div>
 <p className="font-bold text-slate-900 leading-tight">{app.name}</p>
 <div className="flex items-center gap-2 mt-1 text-slate-500 text-xs">
 <Mail size={12} />
 <span>{app.email}</span>
 </div>
 </div>
 </div>
 </td>
 <td className="px-6 py-4">
 <div className="flex flex-col gap-1">
 <div className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
 <Briefcase size={14} className="text-slate-400" />
 <span>{app.role}</span>
 </div>
 <div className="flex items-center gap-1.5 text-slate-400 text-xs">
 <span>{app.location}</span>
 </div>
 </div>
 </td>
 <td className="px-6 py-4">
 <div className="flex items-center gap-1.5 text-slate-600 text-sm">
 <Clock size={14} className="text-slate-400" />
 <span>{app.date}</span>
 </div>
 </td>
 <td className="px-6 py-4">
 <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${app.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
 app.status === 'Review' ? 'bg-amber-100 text-amber-700' :
 app.status === 'Interview On going' ? 'bg-purple-100 text-purple-700' :
 app.status === 'Selected' ? 'bg-emerald-100 text-emerald-700' :
 app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
 'bg-slate-100 text-slate-700'
 }`}>
 <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'Pending' ? 'bg-blue-600' :
 app.status === 'Review' ? 'bg-amber-600' :
 app.status === 'Interview On going' ? 'bg-purple-600' :
 app.status === 'Selected' ? 'bg-emerald-600' :
 app.status === 'Rejected' ? 'bg-red-600' :
 'bg-slate-600'
 }`}></span>
 {app.status}
 </span>
 </td>
 <td className="px-6 py-4 text-right">
 {app.resumeUrl ? (
 <a
 href={app.resumeUrl}
 target="_blank"
 rel="noopener noreferrer"
 onClick={(e) => e.stopPropagation()}
 className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-bold bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all"
 >
 <Download size={14} />
 <span>Resume</span>
 </a>
 ) : (
 <span className="text-slate-400 text-xs font-medium italic">Not provided</span>
 )}
 </td>
 </tr>
 ))
 ) : (
 <tr>
 <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">No applicants found</td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 </div>
 </motion.div>
 ) : activeTab === 'jobs' ? (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="space-y-6"
 >
 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <h2 className="text-lg font-bold text-slate-900">Job Vacancies</h2>
 <p className="text-slate-500 text-sm">Manage and review open job positions</p>
 </div>

 <div className="flex flex-wrap items-center gap-3">
 <div className="relative">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
 <input
 type="text"
 placeholder="Search title or location..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm w-64"
 />
 </div>

 <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
 <Filter className="text-slate-400" size={16} />
 <select
 value={filterStatus}
 onChange={(e) => setFilterStatus(e.target.value)}
 className="bg-transparent outline-none text-sm font-medium text-slate-700 cursor-pointer"
 >
 <option value="All">All Status</option>
 <option value="Active">Active</option>
 <option value="Closed">Closed</option>
 </select>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-left">
 <thead>
 <tr className="bg-slate-50 border-b border-slate-100">
 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Job Vacancy</th>
 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Experience</th>
 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Posted</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {loading ? (
 [...Array(5)].map((_, i) => (
 <tr key={i} className="animate-pulse">
 <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-48"></div></td>
 <td className="px-6 py-4"><div className="h-3 bg-slate-100 rounded w-24"></div></td>
 <td className="px-6 py-4"><div className="h-3 bg-slate-100 rounded w-20"></div></td>
 <td className="px-6 py-4"><div className="h-3 bg-slate-100 rounded w-24"></div></td>
 <td className="px-6 py-4"><div className="h-6 bg-slate-100 rounded-full w-20"></div></td>
 <td className="px-6 py-4"><div className="h-3 bg-slate-100 rounded w-16"></div></td>
 </tr>
 ))
 ) : filteredJobs.length > 0 ? (
 filteredJobs.map((job) => (
 <tr
 key={job.id}
 onClick={() => openJobDrawer(job.id)}
 className=" /50 transition-colors group cursor-pointer"
 >
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
 <Briefcase size={20} />
 </div>
 <p className="font-bold text-slate-900 leading-tight">{job.title}</p>
 </div>
 </td>
 <td className="px-6 py-4 text-sm font-semibold text-slate-600">{job.category}</td>
 <td className="px-6 py-4 text-sm text-slate-500">{job.experience}</td>
 <td className="px-6 py-4 text-sm text-slate-500">{job.location}</td>
 <td className="px-6 py-4">
 <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${job.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
 }`}>
 <span className={`w-1.5 h-1.5 rounded-full ${job.status === 'Active' ? 'bg-emerald-600' : 'bg-slate-600'
 }`}></span>
 {job.status}
 </span>
 </td>
 <td className="px-6 py-4 text-sm text-slate-400">{job.createdAt}</td>
 </tr>
 ))
 ) : (
 <tr>
 <td colSpan="6" className="px-6 py-12 text-center text-slate-400 italic">No job postings found</td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 </div>
 </motion.div>
 ) : (
 <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center shadow-sm">
 <LayoutDashboard size={48} className="mx-auto text-slate-200 mb-4" />
 <h2 className="text-xl font-bold text-slate-900">Dashboard Overview</h2>
 <p className="text-slate-500 mt-2">Welcome to the HR Dashboard. Select "Applicants" or "Jobs" from the sidebar to manage your workflow.</p>
 </div>
 )}
 </div>
 </main>

 <ApplicantDrawer
 isOpen={isDrawerOpen}
 onClose={() => setIsDrawerOpen(false)}
 applicant={selectedApplicant}
 isFetching={isFetching}
 onUpdate={updateApplicant}
 />

 <Toast
 message="Status Updated Successfully"
 isVisible={showToast}
 onClose={() => setShowToast(false)}
 />

 <JobDetailDrawer
 isOpen={isJobDrawerOpen}
 isFetching={isFetching}
 job={selectedJob}
 onClose={() => setIsJobDrawerOpen(false)}
 />
 </div>
 );
};

export default HrDashboard;
