import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Briefcase, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
 const { signup } = useAuth();
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
 firstName: '',
 lastName: '',
 role: '',
 email: '',
 mobileNumber: '',
 password: '',
 confirmPassword: ''
 });

 const [errors, setErrors] = useState({});
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [serverError, setServerError] = useState('');

 const roles = ['HR', 'Support', 'Admin'];

 const validateForm = () => {
 const newErrors = {};
 if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
 if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
 if (!formData.role) newErrors.role = 'Please select a role';

 if (!formData.email.trim()) {
 newErrors.email = 'Email is required';
 } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
 newErrors.email = 'Email is invalid';
 }

 if (!formData.mobileNumber.trim()) {
 newErrors.mobileNumber = 'Mobile number is required';
 } else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
 newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';
 }

 if (!formData.password) {
 newErrors.password = 'Password is required';
 } else if (formData.password.length < 8) {
 newErrors.password = 'Password must be at least 8 characters';
 }

 if (formData.password !== formData.confirmPassword) {
 newErrors.confirmPassword = 'Passwords do not match';
 }

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

 const { user, error } = await signup(formData);

 if (error) {
 setServerError(error);
 setIsSubmitting(false);
 } else {
 setIsSubmitting(false);
 alert('Account created successfully!');
 navigate('/');
 }
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
 <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
 <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
 </div>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="w-full max-w-2xl relative"
 >
 <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
 <div className="mb-8 text-center">
 <motion.h1
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.2 }}
 className="text-4xl font-bold text-white mb-2"
 >
 Create Account
 </motion.h1>
 <p className="text-white/60">Join our premium community today</p>
 </div>

 <form onSubmit={handleSubmit} className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* First Name */}
 <div className="relative">
 <label className={labelClasses}>First Name</label>
 <div className="relative">
 <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
 <input
 type="text"
 name="firstName"
 placeholder="John"
 value={formData.firstName}
 onChange={handleChange}
 className={inputClasses('firstName')}
 />
 </div>
 {errors.firstName && <p className="text-red-400 text-xs mt-1 ml-1">{errors.firstName}</p>}
 </div>

 {/* Last Name */}
 <div className="relative">
 <label className={labelClasses}>Last Name</label>
 <div className="relative">
 <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
 <input
 type="text"
 name="lastName"
 placeholder="Doe"
 value={formData.lastName}
 onChange={handleChange}
 className={inputClasses('lastName')}
 />
 </div>
 {errors.lastName && <p className="text-red-400 text-xs mt-1 ml-1">{errors.lastName}</p>}
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* Role Dropdown */}
 <div className="relative">
 <label className={labelClasses}>Role</label>
 <div className="relative">
 <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 pointer-events-none" />
 <select
 name="role"
 value={formData.role}
 onChange={handleChange}
 className={`${inputClasses('role')} appearance-none cursor-pointer`}
 >
 <option value="" disabled className="bg-slate-900">Select Role</option>
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
 placeholder="john@example.com"
 value={formData.email}
 onChange={handleChange}
 className={inputClasses('email')}
 />
 </div>
 {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* Mobile Number */}
 <div className="relative">
 <label className={labelClasses}>Mobile Number</label>
 <div className="relative">
 <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
 <input
 type="tel"
 name="mobileNumber"
 placeholder="1234567890"
 maxLength={10}
 value={formData.mobileNumber}
 onChange={handleChange}
 className={inputClasses('mobileNumber')}
 />
 </div>
 {errors.mobileNumber && <p className="text-red-400 text-xs mt-1 ml-1">{errors.mobileNumber}</p>}
 </div>

 {/* Space for layout consistency if needed, but we have 7 fields total */}
 <div className="hidden md:block"></div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

 {/* Confirm Password */}
 <div className="relative">
 <label className={labelClasses}>Confirm Password</label>
 <div className="relative">
 <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
 <input
 type={showConfirmPassword ? "text" : "password"}
 name="confirmPassword"
 placeholder="••••••••"
 value={formData.confirmPassword}
 onChange={handleChange}
 className={inputClasses('confirmPassword')}
 />
 <button
 type="button"
 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
 className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
 >
 {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
 </button>
 </div>
 {errors.confirmPassword && <p className="text-red-400 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
 </div>
 </div>

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
 className="w-full bg-blue-600 0 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2 group"
 >
 {isSubmitting ? (
 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
 ) : (
 <>
 <span>Create Account</span>
 <CheckCircle2 className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
 </>
 )}
 </motion.button>
 </form>

 <p className="mt-8 text-center text-white/40 text-sm">
 Already have an account?{' '}
 <a href="/signin" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Sign In</a>
 </p>
 </div>
 </motion.div>
 </div>
 );
};

export default SignUp;
