import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { affiliateService } from '../../services/affiliateService';
import AffiliateLayout from '../../components/Affiliate/AffiliateLayout';

const StatCard = ({ label, value, prefix, suffix, color }) => (
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
 <p className={`text-2xl font-bold ${color || 'text-gray-900 dark:text-white'}`}>
 {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}{suffix}
 </p>
 </div>
);

const AffiliateDashboard = () => {
 const { currentUser, userData } = useAuth();
 const [data, setData] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 if (!currentUser?.uid) return;
 loadDashboard();
 }, [currentUser?.uid]);

 const loadDashboard = async () => {
 const result = await affiliateService.getDashboard(currentUser.uid);
 if (result.success) setData(result.data);
 setLoading(false);
 };

 if (loading) {
 return (
 <AffiliateLayout>
 <div className="flex items-center justify-center h-64">
 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
 </div>
 </AffiliateLayout>
 );
 }

 const stats = data?.stats || {};

 return (
 <AffiliateLayout>
 <div className="space-y-8">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
 <p className="text-gray-500 dark:text-gray-400 mt-1">Here is your affiliate performance overview.</p>
 </div>

 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
 <StatCard label="Total Clicks" value={stats.totalClicks} color="text-blue-600" />
 <StatCard label="Conversions" value={stats.totalConversions} color="text-green-600" />
 <StatCard label="Total Earned" value={stats.totalEarned} prefix="₹" color="text-gray-900 dark:text-white" />
 <StatCard label="Current Balance" value={stats.balance} prefix="₹" color="text-blue-600" />
 </div>

 <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
 <StatCard label="Pending Commission" value={stats.pendingCommissions} prefix="₹" color="text-yellow-600" />
 <StatCard label="Paid Out" value={stats.totalPaid} prefix="₹" color="text-green-600" />
 <StatCard label="Conversion Rate" value={stats.totalClicks > 0 ? ((stats.totalConversions / stats.totalClicks) * 100).toFixed(1) : 0} suffix="%" color="text-purple-600" />
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
 <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Referral Code</h2>
 <div className="flex items-center gap-4">
 <code className="text-2xl font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-6 py-3 rounded-xl border border-blue-100 dark:border-blue-800">
 {data?.referralCode}
 </code>
 <button
 onClick={() => { navigator.clipboard.writeText(data?.referralCode || ''); }}
 className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-sm font-medium"
 >
 Copy
 </button>
 </div>
 </div>

 {data?.recentClicks?.length > 0 && (
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
 <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Clicks</h2>
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
 <th className="pb-3 font-medium">Product</th>
 <th className="pb-3 font-medium">Date</th>
 <th className="pb-3 font-medium">Referrer</th>
 </tr>
 </thead>
 <tbody>
 {data.recentClicks.map((click, i) => (
 <tr key={i} className="border-b border-gray-50 dark:border-gray-700/50">
 <td className="py-3 text-gray-900 dark:text-white capitalize">{click.product || 'all'}</td>
 <td className="py-3 text-gray-500 dark:text-gray-400">{click.timestamp ? new Date(click.timestamp).toLocaleDateString() : 'N/A'}</td>
 <td className="py-3 text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{click.referrer || 'Direct'}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}

 {data?.recentCommissions?.length > 0 && (
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
 <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Commissions</h2>
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
 <th className="pb-3 font-medium">Product</th>
 <th className="pb-3 font-medium">Amount</th>
 <th className="pb-3 font-medium">Commission</th>
 <th className="pb-3 font-medium">Status</th>
 </tr>
 </thead>
 <tbody>
 {data.recentCommissions.map((c, i) => (
 <tr key={i} className="border-b border-gray-50 dark:border-gray-700/50">
 <td className="py-3 text-gray-900 dark:text-white capitalize">{c.product}</td>
 <td className="py-3 text-gray-900 dark:text-white">₹{c.amount}</td>
 <td className="py-3 text-green-600 font-medium">₹{c.commission}</td>
 <td className="py-3">
 <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
 c.status === 'paid' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
 c.status === 'approved' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
 }`}>
 {c.status}
 </span>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}
 </div>
 </AffiliateLayout>
 );
};

export default AffiliateDashboard;
