import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { affiliateService } from '../../services/affiliateService';
import AffiliateLayout from '../../components/Affiliate/AffiliateLayout';

const PRODUCTS = [
 { value: 'all', label: 'General (All Products)' },
 { value: 'billing', label: 'SwordNex Billing' },
 { value: 'payroll', label: 'SwordNex Payroll' },
 { value: 'hms', label: 'SwordNex HMS' },
 { value: 'jobsheet', label: 'SwordNex Jobsheet' },
 { value: 'invoice', label: 'SwordNex Invoice' },
];

const AffiliateLinks = () => {
 const { currentUser } = useAuth();
 const [codes, setCodes] = useState([]);
 const [loading, setLoading] = useState(true);
 const [showGenerate, setShowGenerate] = useState(false);
 const [newProduct, setNewProduct] = useState('all');
 const [newLabel, setNewLabel] = useState('');
 const [copyFeedback, setCopyFeedback] = useState(null);

 useEffect(() => {
 if (currentUser?.uid) loadCodes();
 }, [currentUser?.uid]);

 const loadCodes = async () => {
 const result = await affiliateService.getCodes(currentUser.uid);
 if (result.success) setCodes(result.data);
 setLoading(false);
 };

 const handleGenerate = async () => {
 const result = await affiliateService.generateCode(currentUser.uid, newProduct, newLabel || undefined);
 if (result.success) {
 await loadCodes();
 setShowGenerate(false);
 setNewLabel('');
 setNewProduct('all');
 }
 };

 const copyToClipboard = (code) => {
 const url = `${window.location.origin}/r/${code}`;
 navigator.clipboard.writeText(url);
 setCopyFeedback(code);
 setTimeout(() => setCopyFeedback(null), 2000);
 };

 return (
 <AffiliateLayout>
 <div className="space-y-6">
 <div className="flex items-center justify-between">
 <div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Referral Links</h1>
 <p className="text-gray-500 dark:text-gray-400 mt-1">Generate and manage your unique referral links.</p>
 </div>
 <button onClick={() => setShowGenerate(true)}
 className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-lg transition-all flex items-center gap-2">
 <span className="material-symbols-outlined text-lg">add</span>
 New Link
 </button>
 </div>

 {showGenerate && (
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generate New Referral Link</h3>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Product</label>
 <select value={newProduct} onChange={(e) => setNewProduct(e.target.value)}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition">
 {PRODUCTS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Label (optional)</label>
 <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="e.g., Instagram post"
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
 </div>
 <div className="flex items-end gap-2">
 <button onClick={handleGenerate}
 className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow transition">Generate</button>
 <button onClick={() => setShowGenerate(false)}
 className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 transition">Cancel</button>
 </div>
 </div>
 </div>
 )}

 {loading ? (
 <div className="flex justify-center py-12">
 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
 </div>
 ) : codes.length === 0 ? (
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-12 text-center shadow-sm">
 <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-gray-600 mb-4">link</span>
 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No referral links yet</h3>
 <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first referral link to start promoting.</p>
 <button onClick={() => setShowGenerate(true)}
 className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition">Generate Your First Link</button>
 </div>
 ) : (
 <div className="space-y-4">
 {codes.map((item) => (
 <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div className="min-w-0 flex-1">
 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
 <code className="text-lg font-bold text-blue-600 dark:text-blue-400 break-all">{`${window.location.origin}/r/${item.code}`}</code>
 <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
 <span>Product: <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{item.product}</span></span>
 <span>Clicks: <span className="font-medium text-gray-700 dark:text-gray-300">{item.clicks || 0}</span></span>
 <span>Conversions: <span className="font-medium text-gray-700 dark:text-gray-300">{item.conversions || 0}</span></span>
 </div>
 </div>
 <button onClick={() => copyToClipboard(item.code)}
 className={`shrink-0 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
 copyFeedback === item.code
 ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
 : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
 }`}>
 {copyFeedback === item.code ? 'Copied!' : 'Copy Link'}
 </button>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 </AffiliateLayout>
 );
};

export default AffiliateLinks;
