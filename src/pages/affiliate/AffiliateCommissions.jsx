import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { affiliateService } from '../../services/affiliateService';
import AffiliateLayout from '../../components/Affiliate/AffiliateLayout';

const statusStyles = {
 pending: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400',
 approved: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
 paid: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
 cancelled: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
};

const AffiliateCommissions = () => {
 const { currentUser } = useAuth();
 const [commissions, setCommissions] = useState([]);
 const [loading, setLoading] = useState(true);
 const [stats, setStats] = useState({ total: 0, pending: 0, paid: 0 });

 useEffect(() => {
 if (currentUser?.uid) loadCommissions();
 }, [currentUser?.uid]);

 const loadCommissions = async () => {
 const result = await affiliateService.getCommissions(currentUser.uid);
 if (result.success) {
 setCommissions(result.data);
 const totals = { total: 0, pending: 0, paid: 0 };
 result.data.forEach((c) => {
 totals.total += c.commission;
 if (c.status === 'pending') totals.pending += c.commission;
 if (c.status === 'paid') totals.paid += c.commission;
 });
 setStats(totals);
 }
 setLoading(false);
 };

 return (
 <AffiliateLayout>
 <div className="space-y-6">
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Commission History</h1>

 <div className="grid grid-cols-3 gap-4">
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
 <p className="text-sm text-gray-500 dark:text-gray-400">Total Earned</p>
 <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{stats.total.toLocaleString('en-IN')}</p>
 </div>
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
 <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
 <p className="text-2xl font-bold text-yellow-600">₹{stats.pending.toLocaleString('en-IN')}</p>
 </div>
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
 <p className="text-sm text-gray-500 dark:text-gray-400">Paid</p>
 <p className="text-2xl font-bold text-green-600">₹{stats.paid.toLocaleString('en-IN')}</p>
 </div>
 </div>

 {loading ? (
 <div className="flex justify-center py-12">
 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
 </div>
 ) : commissions.length === 0 ? (
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-12 text-center shadow-sm">
 <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-gray-600 mb-4">payments</span>
 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No commissions yet</h3>
 <p className="text-gray-500 dark:text-gray-400">Once customers start signing up through your links, commissions will appear here.</p>
 </div>
 ) : (
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-gray-50 dark:bg-gray-800/50 text-left text-gray-500 dark:text-gray-400">
 <th className="px-6 py-4 font-medium">Date</th>
 <th className="px-6 py-4 font-medium">Product</th>
 <th className="px-6 py-4 font-medium">Customer</th>
 <th className="px-6 py-4 font-medium">Sale Amount</th>
 <th className="px-6 py-4 font-medium">Commission</th>
 <th className="px-6 py-4 font-medium">Rate</th>
 <th className="px-6 py-4 font-medium">Status</th>
 </tr>
 </thead>
 <tbody>
 {commissions.map((c, i) => (
 <tr key={c.id || i} className="border-t border-gray-100 dark:border-gray-700 dark:hover:bg-gray-700/30">
 <td className="px-6 py-4 text-gray-900 dark:text-white whitespace-nowrap">
 {c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
 </td>
 <td className="px-6 py-4 text-gray-900 dark:text-white capitalize">{c.product}</td>
 <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{c.customerEmail}</td>
 <td className="px-6 py-4 text-gray-900 dark:text-white">₹{c.amount}</td>
 <td className="px-6 py-4 text-green-600 font-medium">₹{c.commission}</td>
 <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{(c.rate * 100).toFixed(0)}%</td>
 <td className="px-6 py-4">
 <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[c.status] || statusStyles.pending}`}>
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

export default AffiliateCommissions;
