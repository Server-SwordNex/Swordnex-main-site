import React from 'react';

const JobApplyModal = ({ isOpen, onClose }) => {
 if (!isOpen) return null;

 const handleSubmit = (e) => {
 e.preventDefault();
 alert('Application submitted successfully! (This is a demo)');
 onClose();
 };

 return (
 <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
 {/* Backdrop */}
 <div 
 className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
 onClick={onClose}
 ></div>

 {/* Modal Panel */}
 <div className="relative w-full max-w-lg transform rounded-2xl bg-white dark:bg-card-dark shadow-2xl transition-all">
 {/* Header */}
 <div className="border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
 <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
 Apply for Position
 </h3>
 <button 
 onClick={onClose}
 className="rounded-full p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 transition-colors"
 >
 <span className="material-symbols-outlined text-xl">close</span>
 </button>
 </div>

 {/* Body */}
 <div className="px-6 py-6">
 <form onSubmit={handleSubmit} className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">First Name</label>
 <input type="text" className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required />
 </div>
 <div>
 <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
 <input type="text" className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required />
 </div>
 </div>
 
 <div>
 <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
 <input type="email" className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required />
 </div>

 <div>
 <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
 <input type="tel" className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required />
 </div>

 <div>
 <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Position</label>
 <select className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
 <option>Software Developer</option>
 <option>Frontend Engineer</option>
 <option>Backend Engineer</option>
 <option>UI/UX Designer</option>
 <option>Product Manager</option>
 </select>
 </div>

 <div>
 <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Resume/CV Link</label>
 <input type="url" placeholder="Link to Google Drive / LinkedIn" className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
 </div>

 <div className="pt-2">
 <button type="submit" className="w-full inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary/90 hover:shadow-lg transition-all">
 Submit Application
 <span className="material-symbols-outlined ml-2 text-lg">send</span>
 </button>
 </div>
 </form>
 </div>
 </div>
 </div>
 );
};

export default JobApplyModal;
