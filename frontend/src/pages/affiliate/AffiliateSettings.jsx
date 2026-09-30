import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { affiliateService } from '../../services/affiliateService';
import AffiliateLayout from '../../components/Affiliate/AffiliateLayout';

const AffiliateSettings = () => {
 const { currentUser, userData } = useAuth();
 const [form, setForm] = useState({
 firstName: '', lastName: '', phone: '', paymentMethod: 'UPI', paymentDetails: '',
 });
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [success, setSuccess] = useState('');
 const [error, setError] = useState('');

 useEffect(() => {
 if (currentUser?.uid) loadProfile();
 }, [currentUser?.uid]);

 const loadProfile = async () => {
 const result = await affiliateService.getProfile(currentUser.uid);
 if (result.success) {
 const d = result.data;
 setForm({
 firstName: d.firstName || '',
 lastName: d.lastName || '',
 phone: d.phone || '',
 paymentMethod: d.paymentMethod || 'UPI',
 paymentDetails: d.paymentDetails || '',
 });
 }
 setLoading(false);
 };

 const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
 e.preventDefault();
 setError('');
 setSuccess('');
 setSaving(true);

 const result = await affiliateService.updateSettings(userData.uid, form);
 if (result.success) {
 setSuccess('Settings updated successfully');
 } else {
 setError(result.error || 'Update failed');
 }
 setSaving(false);
 };

 return (
 <AffiliateLayout>
 <div className="max-w-2xl space-y-6">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
 <p className="text-gray-500 dark:text-gray-400 mt-1">Update your profile and payout information.</p>
 </div>

 {loading ? (
 <div className="flex justify-center py-12">
 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 shadow-sm space-y-6">
 {success && (
 <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-xl text-sm">{success}</div>
 )}
 {error && (
 <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">{error}</div>
 )}

 <div>
 <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h2>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
 <input name="firstName" value={form.firstName} onChange={handleChange} required
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
 <input name="lastName" value={form.lastName} onChange={handleChange} required
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
 </div>
 </div>
 <div className="mt-4">
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
 <input name="phone" type="tel" value={form.phone} onChange={handleChange} required
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
 </div>
 </div>

 <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
 <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payout Details</h2>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Payment Method</label>
 <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition">
 <option value="UPI">UPI</option>
 <option value="Bank Transfer">Bank Transfer</option>
 <option value="PayPal">PayPal</option>
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">UPI ID / Account Details</label>
 <input name="paymentDetails" value={form.paymentDetails} onChange={handleChange}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
 </div>
 </div>
 </div>

 <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
 <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Referral Code</h2>
 <code className="text-lg font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl">
 {userData?.referralCode || 'N/A'}
 </code>
 </div>

 <button type="submit" disabled={saving}
 className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg transition-all disabled:opacity-50">
 {saving ? 'Saving...' : 'Save Changes'}
 </button>
 </form>
 )}
 </div>
 </AffiliateLayout>
 );
};

export default AffiliateSettings;
