import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { affiliateService } from '../../services/affiliateService';

const AffiliateSignup = () => {
 const navigate = useNavigate();
 const [form, setForm] = useState({
 firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '',
 paymentMethod: 'UPI', paymentDetails: '',
 });
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [error, setError] = useState('');
 const [loading, setLoading] = useState(false);

 const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
 e.preventDefault();
 setError('');

 if (form.password !== form.confirmPassword) {
 setError('Passwords do not match');
 return;
 }
 if (form.password.length < 6) {
 setError('Password must be at least 6 characters');
 return;
 }

 setLoading(true);

 const result = await affiliateService.register({
 firstName: form.firstName,
 lastName: form.lastName,
 email: form.email,
 phone: form.phone,
 password: form.password,
 paymentMethod: form.paymentMethod,
 paymentDetails: form.paymentDetails,
 });

 if (!result.success) {
 setError(result.error || 'Registration failed');
 setLoading(false);
 return;
 }

 navigate('/affiliate/login');
 };

 return (
 <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4">
 <div className="w-full max-w-lg">
 <div className="text-center mb-8">
 <Link to="/" className="inline-block mb-6">
 <img src="/assets/Logo.png" alt="SwordNex" className="h-10 mx-auto" />
 </Link>
 <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Join the Affiliate Program</h1>
 <p className="text-gray-500 dark:text-gray-400 mt-2">Start earning 10% commission on every referral</p>
 </div>

 <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 space-y-5">
 {error && (
 <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">{error}</div>
 )}

 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
 <input name="firstName" value={form.firstName} onChange={handleChange} required
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
 <input name="lastName" value={form.lastName} onChange={handleChange} required
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
 </div>
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
 <input name="email" type="email" value={form.email} onChange={handleChange} required
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
 <input name="phone" type="tel" value={form.phone} onChange={handleChange} required
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
 <div className="relative">
 <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} required minLength={6}
 className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
 <button type="button" onClick={() => setShowPassword(!showPassword)}
 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
 <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility' : 'visibility_off'}</span>
 </button>
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
 <div className="relative">
 <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} required minLength={6}
 className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
 <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
 <span className="material-symbols-outlined text-xl">{showConfirmPassword ? 'visibility' : 'visibility_off'}</span>
 </button>
 </div>
 </div>
 </div>

 <div className="border-t border-gray-100 dark:border-gray-700 pt-5">
 <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Payout Details</h3>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Payment Method</label>
 <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
 <option value="UPI">UPI</option>
 <option value="Bank Transfer">Bank Transfer</option>
 <option value="PayPal">PayPal</option>
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">UPI ID / Account Details</label>
 <input name="paymentDetails" value={form.paymentDetails} onChange={handleChange} placeholder="yourname@upi"
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
 </div>
 </div>
 </div>

 <button type="submit" disabled={loading}
 className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
 {loading ? 'Creating Account...' : 'Create Affiliate Account'}
 </button>

 <p className="text-center text-sm text-gray-500 dark:text-gray-400">
 Already have an account?{' '}
 <Link to="/affiliate/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Sign in</Link>
 </p>
 </form>
 </div>
 </div>
 );
};

export default AffiliateSignup;
