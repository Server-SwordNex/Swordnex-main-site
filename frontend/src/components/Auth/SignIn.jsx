import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Briefcase, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import API_BASE_URL from '../../config/apiConfig';
import { auth } from '../../config/FirebaseConfig';

const SignIn = () => {
 const { login, logout } = useAuth();
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
 role: '',
 email: '',
 password: ''
 });

 const [errors, setErrors] = useState({});
 const [showPassword, setShowPassword] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [serverError, setServerError] = useState('');
 const [resetMessage, setResetMessage] = useState('');
 const [roles, setRoles] = useState(['Admin', 'HR', 'Support']);

 useEffect(() => { logout(); }, []);

 useEffect(() => {
 fetch(`${API_BASE_URL}/api/roles`)
 .then(r => r.json())
 .then(data => {
 if (data.roles && data.roles.length) setRoles(data.roles);
 })
 .catch(() => {});
 }, []);

 const validateForm = () => {
 const newErrors = {};
 if (!formData.role) newErrors.role = 'Please select a role';
 if (!formData.email.trim()) {
 newErrors.email = 'Email is required';
 } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
 newErrors.email = 'Email is invalid';
 }
 if (!formData.password) newErrors.password = 'Password is required';

 return newErrors;
 };

 const handleChange = (e) => {
 const { name, value } = e.target;
 setFormData(prev => ({ ...prev, [name]: value }));
 if (errors[name]) {
 setErrors(prev => ({ ...prev, [name]: '' }));
 }
 if (serverError) setServerError('');
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 const validationErrors = validateForm();
 if (Object.keys(validationErrors).length > 0) {
 setErrors(validationErrors);
 return;
 }

 setIsSubmitting(true);
 setServerError('');

 try {
 const result = await login(formData.email, formData.password);
 
 if (result.error) {
 setServerError(result.error);
 setIsSubmitting(false);
 return;
 }

 setIsSubmitting(false);

 const serverRole = result.userData?.role;

 if (serverRole && serverRole !== formData.role) {
 setServerError(`This account is registered as "${serverRole}". Please select the correct role.`);
 return;
 }

 // Role-based redirection (replace signin in history)
 const redirectMap = {
 Admin: '/admin/overview',
 HR: '/hr-dashboard',
 Support: '/support-dashboard',
 Marketing: '/marketing-dashboard',
 Finance: '/finance-dashboard',
 };
 const path = redirectMap[serverRole || formData.role] || '/';
 navigate(path, { replace: true });
 } catch (error) {
 setServerError('An unexpected error occurred. Please try again.');
 setIsSubmitting(false);
 }
 };

 const handleForgotPassword = async () => {
 if (!/\S+@\S+\.\S+/.test(formData.email)) {
 setErrors(prev => ({ ...prev, email: 'Enter your email address to reset your password' }));
 return;
 }
 try {
 await sendPasswordResetEmail(auth, formData.email.trim());
 } catch (error) {
 // Same message either way so the form does not reveal which emails have accounts.
 }
 setResetMessage('If an account exists for this email, a password reset link has been sent.');
 };

 const inputClasses = (fieldName) => `
 w-full bg-white/10 border ${errors[fieldName] ? 'border-red-500' : 'border-white/20'} 
 rounded-xl px-4 py-3 pl-11 text-white placeholder-white/50 
 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300
 `;

 const labelClasses = "block text-sm font-medium text-white/80 mb-1.5 ml-1";

 return (
 <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 selection:bg-blue-500/30">
 {/* Background Decorative Elements */}
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
 <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
 </div>

 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.5 }}
 className="w-full max-w-md relative"
 >
 <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
 <div className="mb-8 text-center">
 <motion.h1
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-4xl font-bold text-white mb-2"
 >
 Sign In
 </motion.h1>
 <p className="text-white/60">Access your role-based dashboard</p>
 </div>

 <form onSubmit={handleSubmit} className="space-y-6">
 {/* Role Dropdown - First Input */}
 <div className="relative">
 <label className={labelClasses}>Access Role</label>
 <div className="relative">
 <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 pointer-events-none" />
 <select
 name="role"
 value={formData.role}
 onChange={handleChange}
 className={`${inputClasses('role')} appearance-none cursor-pointer`}
 >
 <option value="" disabled className="bg-slate-900">Select Your Role</option>
 {roles.map(role => (
 <option key={role} value={role} className="bg-slate-900">{role}</option>
 ))}
 </select>
 <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
 </div>
 </div>
 {errors.role && <p className="text-red-400 text-xs mt-1 ml-1">{errors.role}</p>}
 </div>

 {/* Email */}
 <div className="relative">
 <label className={labelClasses}>Email Address</label>
 <div className="relative">
 <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
 <input
 type="email"
 name="email"
 placeholder="admin@example.com"
 value={formData.email}
 onChange={handleChange}
 className={inputClasses('email')}
 />
 </div>
 {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
 </div>

 {/* Password */}
 <div className="relative">
 <label className={labelClasses}>Password</label>
 <div className="relative">
 <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
 <input
 type={showPassword ? "text" : "password"}
 name="password"
 placeholder="••••••••"
 value={formData.password}
 onChange={handleChange}
 className={inputClasses('password')}
 />
 <button
 type="button"
 onClick={() => setShowPassword(!showPassword)}
 className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
 >
 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
 </button>
 </div>
 {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>}
 </div>

 <div className="flex items-center justify-between text-sm px-1">
 <label className="flex items-center gap-2 text-white/60 cursor-pointer group">
 <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/10 checked:bg-blue-600 transition-all cursor-pointer" />
 <span className="group-hover:text-white/80 transition-colors">Remember me</span>
 </label>
 <button type="button" onClick={handleForgotPassword} className="text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</button>
 </div>

 {resetMessage && (
 <p className="text-sm text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3">{resetMessage}</p>
 )}

 {serverError && (
 <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 text-red-400 text-sm">
 <AlertCircle className="w-5 h-5 shrink-0" />
 <p>{serverError}</p>
 </div>
 )}

 <motion.button
 whileHover={{ scale: 1.01 }}
 whileTap={{ scale: 0.98 }}
 type="submit"
 disabled={isSubmitting}
 className="w-full bg-blue-600 0 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
 >
 {isSubmitting ? (
 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
 ) : (
 <>
 <LogIn className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
 <span>Sign In</span>
 </>
 )}
 </motion.button>
 </form>

 <p className="mt-8 text-center text-white/40 text-sm">
 Staff accounts are created by your administrator.
 </p>
 </div>
 </motion.div>
 </div>
 );
};

export default SignIn;
