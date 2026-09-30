import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { affiliateService } from '../../services/affiliateService';
import AffiliateLayout from '../../components/Affiliate/AffiliateLayout';

const statusStyles = {
 requested: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400',
 processed: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
 paid: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
 rejected: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
};

const AffiliatePayouts = () => {
 const { currentUser } = useAuth();
 const [payouts, setPayouts] = useState([]);
 const [balance, setBalance] = useState(0);
 const [loading, setLoading] = useState(true);
 const [showRequest, setShowRequest] = useState(false);
 const [amount, setAmount] = useState('');
 const [requestError, setRequestError] = useState('');
 const [requesting, setRequesting] = useState(false);
 const MIN_PAYOUT = 1000;

 useEffect(() => {
 if (currentUser?.uid) loadData();
 }, [currentUser?.uid]);

 const loadData = async () => {
 const [dashboardRes, payoutsRes] = await Promise.all([
 affiliateService.getDashboard(currentUser.uid),
 affiliateService.getPayouts(currentUser.uid),
 ]);
 if (dashboardRes.success) setBalance(dashboardRes.data.stats.balance);
 if (payoutsRes.success) setPayouts(payoutsRes.data);
 setLoading(false);
 };

 const handleRequestPayout = async () => {
 const result = await affiliateService.requestPayout(currentUser.uid, amt);
 if (result.success) {
 setShowRequest(false);
 setAmount('');
 await loadData();
 } else {
 setRequestError(result.error || 'Request failed');
 }
 setRequesting(false);
 };

 return (
 <AffiliateLayout>
 <div className="space-y-6">
 <div className="flex items-center justify-between">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payouts</h1>
 <p className="text-gray-500 dark:text-gray-400 mt-1">Request and track your commission payouts.</p>
 </div>
 <button onClick={() => setShowRequest(true)} disabled={balance < MIN_PAYOUT}
 className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white font-medium text-sm shadow-lg transition-all flex items-center gap-2">
 <span className="material-symbols-outlined text-lg">request_quote</span>
 Request Payout
 </button>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
 <p className="text-sm text-gray-500 dark:text-gray-400">Available Balance</p>
 <p className="text-2xl font-bold text-blue-600">₹{balance.toLocaleString('en-IN')}</p>
 </div>
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
 <p className="text-sm text-gray-500 dark:text-gray-400">Minimum Payout</p>
 <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{MIN_PAYOUT.toLocaleString('en-IN')}</p>
 </div>
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
 <p className="text-sm text-gray-500 dark:text-gray-400">Total Payouts</p>
 <p className="text-2xl font-bold text-green-600">{payouts.length}</p>
 </div>
 </div>

 {showRequest && (
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Request Payout</h3>
 {requestError && (
 <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm mb-4">{requestError}</div>
 )}
 <div className="flex items-end gap-4">
 <div className="flex-1">
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Amount (₹)</label>
 <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} min={MIN_PAYOUT} max={balance} placeholder={`Min ₹${MIN_PAYOUT}`}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
 </div>
 <button onClick={handleRequestPayout} disabled={requesting}
 className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow transition disabled:opacity-50">
 {requesting ? 'Requesting...' : 'Submit'}
 </button>
 <button onClick={() => { setShowRequest(false); setRequestError(''); setAmount(''); }}
 className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 transition">Cancel</button>
 </div>
 </div>
 )}

 {loading ? (
 <div className="flex justify-center py-12">
 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
 </div>
 ) : payouts.length === 0 ? (
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-12 text-center shadow-sm">
 <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-gray-600 mb-4">account_balance</span>
 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No payout requests yet</h3>
 <p className="text-gray-500 dark:text-gray-400">When you request a payout, it will appear here.</p>
 </div>
 ) : (
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-gray-50 dark:bg-gray-800/50 text-left text-gray-500 dark:text-gray-400">
 <th className="px-6 py-4 font-medium">Date Requested</th>
 <th className="px-6 py-4 font-medium">Amount</th>
 <th className="px-6 py-4 font-medium">Method</th>
 <th className="px-6 py-4 font-medium">Status</th>
 </tr>
 </thead>
 <tbody>
 {payouts.map((p, i) => (
 <tr key={p.id || i} className="border-t border-gray-100 dark:border-gray-700 dark:hover:bg-gray-700/30">
 <td className="px-6 py-4 text-gray-900 dark:text-white whitespace-nowrap">
 {p.requestedAt ? new Date(p.requestedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
 </td>
 <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">₹{p.amount}</td>
 <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{p.method || 'N/A'}</td>
 <td className="px-6 py-4">
 <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[p.status] || statusStyles.requested}`}>
 {p.status}
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

export default AffiliatePayouts;
