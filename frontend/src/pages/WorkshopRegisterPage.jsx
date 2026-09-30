import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';
import { MessageSquare, User, Mail, School, ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';

const WorkshopRegisterPage = () => {
 const { id } = useParams();
 const navigate = useNavigate();

 const [workshop, setWorkshop] = useState(null);
 const [loading, setLoading] = useState(true);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [showSuccess, setShowSuccess] = useState(false);

 const [formData, setFormData] = useState({
 name: '',
 whatsappNo: '',
 email: '',
 collegeName: ''
 });

 useEffect(() => {
 const fetchWorkshop = async () => {
 try {
 const res = await fetch(`${API_BASE_URL}/api/workshops/${id}`);
 if (!res.ok) throw new Error('Workshop not found');
 const data = await res.json();
 setWorkshop(data);
 } catch (err) {
 console.error("Error fetching workshop:", err);
 setWorkshop(null);
 } finally {
 setLoading(false);
 }
 };
 fetchWorkshop();
 }, [id]);

 const handleChange = (e) => {
 const { name, value } = e.target;
 setFormData(prev => ({ ...prev, [name]: value }));
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 setIsSubmitting(true);

 try {
 const payload = {
 ...formData,
 eventId: id,
 eventTitle: workshop?.title || 'Workshop',
 type: 'workshop',
 createdAt: new Date().toISOString()
 };

 const res = await fetch(`${API_BASE_URL}/api/workshops/${id}/register`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(payload)
 });

 if (!res.ok) throw new Error('Registration failed');

 setShowSuccess(true);
 } catch (err) {
 alert('Registration failed. Please try again.');
 console.error(err);
 } finally {
 setIsSubmitting(false);
 }
 };

 if (loading) {
 return (
 <div className="min-h-screen bg-slate-50 flex items-center justify-center">
 <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
 </div>
 );
 }

 if (!workshop) {
 return (
 <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
 <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
 <ArrowLeft size={32} />
 </div>
 <h2 className="text-2xl font-bold text-slate-900 mb-2">Workshop Not Found</h2>
 <p className="text-slate-500 mb-6">The workshop you're looking for doesn't exist.</p>
 <Link to="/Workshopslist" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
 Back to Workshops
 </Link>
 </div>
 );
 }

 if (showSuccess) {
 return (
 <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
 <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-300">
 <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
 <CheckCircle2 size={48} />
 </div>
 <h2 className="text-3xl font-bold text-slate-900 mb-2">Registered Successfully!</h2>
 <p className="text-slate-500 mb-6">
 Thank you for registering for <strong>{workshop.title}</strong>.
 To stay updated with the latest workshop details and announcements, please join our WhatsApp community below.
 </p>

 <a
 href="https://chat.whatsapp.com/DnvcQuoV2kD3YRThrrywSj"
 target="_blank"
 rel="noopener noreferrer"
 className="w-full py-4 mb-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-600/20 flex items-center justify-center gap-2 text-lg"
 >
 <MessageCircle size={24} />
 Join WhatsApp Community
 </a>

 <button
 onClick={() => navigate(`/workshops/${id}`)}
 className="w-full py-3 text-slate-400 font-bold rounded-xl hover:text-blue-600 transition-all"
 >
 Return to Workshop Page
 </button>
 </div>
 </div>
 );
 }

 return (
 <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-6">
 <div className="max-w-2xl w-full">
 <Link to={`/workshops/${id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-8 transition-colors group">
 <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
 Back to Workshop Page
 </Link>

 <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
 <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 text-white">
 <div className="flex items-center gap-3 mb-4">
 <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider">Registration Form</span>
 </div>
 <h1 className="text-3xl font-bold mb-2">{workshop.title}</h1>
 <p className="text-blue-100 text-sm opacity-80">Fill in your details to secure your spot in this workshop.</p>
 </div>

 <form onSubmit={handleSubmit} className="p-8 space-y-6">
 <div className="space-y-2">
 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
 <User size={14} className="text-blue-600" /> Full Name
 </label>
 <input
 required
 name="name"
 value={formData.name}
 onChange={handleChange}
 placeholder="Enter your full name"
 className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
 />
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
 <MessageSquare size={14} className="text-blue-600" /> WhatsApp Number
 </label>
 <input
 required
 type="tel"
 name="whatsappNo"
 value={formData.whatsappNo}
 onChange={handleChange}
 placeholder="Enter your WhatsApp number"
 className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
 <Mail size={14} className="text-blue-600" /> Email Address
 </label>
 <input
 required
 type="email"
 name="email"
 value={formData.email}
 onChange={handleChange}
 placeholder="your@email.com"
 className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
 />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
 <School size={14} className="text-blue-600" /> College / Institution Name
 </label>
 <input
 required
 name="collegeName"
 value={formData.collegeName}
 onChange={handleChange}
 placeholder="Enter your college or institution name"
 className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
 />
 </div>

 <div className="pt-4">
 <button
 type="submit"
 disabled={isSubmitting}
 className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${isSubmitting
 ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
 : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]'
 }`}
 >
 {isSubmitting ? (
 <>
 <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
 Processing...
 </>
 ) : (
 <>Register Now</>
 )}
 </button>
 <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">Secure Registration by SwordNex</p>
 </div>
 </form>
 </div>
 </div>
 </div>
 );
};

export default WorkshopRegisterPage;
