import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AffiliateLogin = () => {
 const navigate = useNavigate();
 const { login, logout } = useAuth();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [showPassword, setShowPassword] = useState(false);
 const [error, setError] = useState('');
 const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
 e.preventDefault();
 setError('');
 setLoading(true);

 const result = await login(email, password);
 if (result.error) {
 setError(result.error);
 setLoading(false);
 return;
 }

 if (result.userData?.role !== 'affiliate') {
 setError('This account is not registered as an affiliate');
 await logout();
 setLoading(false);
 return;
 }

 navigate('/affiliate/dashboard');
 };

 return (
 <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4">
 <div className="w-full max-w-md">
 <div className="text-center mb-8">
 <Link to="/" className="inline-block mb-6">
 <img src="/assets/Logo.png" alt="SwordNex" className="h-10 mx-auto" />
 </Link>
 <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Affiliate Sign In</h1>
 <p className="text-gray-500 dark:text-gray-400 mt-2">Access your affiliate dashboard</p>
 </div>

 <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 space-y-5">
 {error && (
 <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">{error}</div>
 )}

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
 <div className="relative">
 <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required
 className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
 <button type="button" onClick={() => setShowPassword(!showPassword)}
 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
 <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility' : 'visibility_off'}</span>
 </button>
 </div>
 </div>

 <button type="submit" disabled={loading}
 className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
 {loading ? 'Signing In...' : 'Sign In'}
 </button>

 <p className="text-center text-sm text-gray-500 dark:text-gray-400">
 Not an affiliate yet?{' '}
 <Link to="/affiliate/signup" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Join now</Link>
 </p>
 </form>
 </div>
 </div>
 );
};

export default AffiliateLogin;
