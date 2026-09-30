import React from 'react';

const Testimonials = () => {
 return (
 <main className="pt-0">
 <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="text-center max-w-3xl mx-auto">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary font-semibold text-sm mb-6 border border-blue-200 dark:border-blue-800">
 <span className="flex h-2 w-2 relative">
 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
 <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
 </span>
 New: Enterprise Dashboard V2.0
 </div>
 <h1 className="text-4xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight">
 Build Amazing <span className="text-primary">Digital Systems</span> for Business
 </h1>
 <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
 SwordNex helps enterprises streamline operations with custom web applications designed for scale, security, and performance.
 </p>
 <div className="flex flex-col sm:flex-row justify-center gap-4">
 <button className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-lg shadow-orange-500/30">
 <span className="material-icons-round">play_circle</span>
 See How It Works
 </button>
 <button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-primary dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 px-8 py-3.5 rounded-full font-bold transition-all shadow-lg">
 <span className="material-icons-round">download</span>
 Download Case Study
 </button>
 </div>
 </div>
 {/* <div className="mt-16 relative mx-auto max-w-4xl">
 <div className="bg-white dark:bg-card-dark rounded-2xl shadow-2xl p-2 border border-gray-100 dark:border-gray-700">
 <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden aspect-[16/9] relative">
 <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900">
 <div className="w-3/4 h-3/4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-4">
 <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-4">
 <div className="w-1/3 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
 <div className="flex gap-2">
 <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900"></div>
 <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900"></div>
 </div>
 </div>
 <div className="grid grid-cols-3 gap-4">
 <div className="h-24 rounded bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800"></div>
 <div className="h-24 rounded bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800"></div>
 <div className="h-24 rounded bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800"></div>
 </div>
 <div className="flex-1 rounded bg-gray-50 dark:bg-gray-700/50 mt-2"></div>
 </div>
 </div>
 </div>
 </div>
 </div> */}
 <div className="mt-16 relative mx-auto max-w-4xl"> 
 <div className="bg-white dark:bg-card-dark rounded-2xl shadow-2xl p-2 border border-gray-100 dark:border-gray-700">
 <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden aspect-[16/9] relative">
 <img 
 src="/assets/TV - 2.png" 
 alt="Business automation dashboard interface"
 className="absolute inset-0 w-full h-full object-cover rounded-xl"
 />
 </div>
 </div>
</div>

 </div>
 </header>

 <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-16">
 <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
 Why market leaders trust <span className="text-primary">SwordNex</span>
 </h2>
 <div className="h-1.5 w-24 bg-primary mx-auto rounded-full flex gap-2 justify-center items-center">
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 </div>
 <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
 We deliver scalable solutions backed by measurable results and unwavering support.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
 <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary mb-6">
 <span className="material-icons-round text-3xl">groups</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">50+</h3>
 <p className="text-gray-600 dark:text-gray-400 font-medium">Long-term Clients</p>
 </div>
 <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-500 mb-6">
 <span className="material-icons-round text-3xl">inventory_2</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">100+</h3>
 <p className="text-gray-600 dark:text-gray-400 font-medium">Projects Delivered</p>
 </div>
 <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 mb-6">
 <span className="material-icons-round text-3xl">cloud_done</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">100%</h3>
 <p className="text-gray-600 dark:text-gray-400 font-medium">Uptime Guarantee</p>
 <p className="text-xs text-gray-400 mt-1">on managed deployments</p>
 </div>
 <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 mb-6">
 <span className="material-icons-round text-3xl">support_agent</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">24/7</h3>
 <p className="text-gray-600 dark:text-gray-400 font-medium">Expert Support</p>
 </div>
 </div>
 </section>

 <section className="relative py-20 lg:py-28 overflow-hidden bg-white dark:bg-slate-900">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
 <span className="block text-primary font-semibold tracking-wider uppercase text-sm mb-3">
 Client Success Stories
 </span>
 <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">
 Loved by Businesses Everywhere
 </h2>
 <p className="text-lg text-slate-500 dark:text-slate-400">
 Don't just take our word for it. See how SwordNex Technologies is transforming operations for businesses across the globe.
 </p>
 </div>
 <div className="relative w-full overflow-hidden mb-20">
 <div className="flex gap-6 w-full flex-wrap lg:flex-nowrap">
 <div className="w-full lg:w-[550px] bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-soft border border-slate-100 dark:border-slate-800 transition-all duration-300">
 <div className="flex items-start gap-4 mb-6">
 <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-primary">
 <span className="material-symbols-outlined text-2xl">format_quote</span>
 </div>
 <div>
 <div className="flex text-yellow-400 text-sm mb-1">
 <span className="material-symbols-outlined text-[18px]">star</span>
 <span className="material-symbols-outlined text-[18px]">star</span>
 <span className="material-symbols-outlined text-[18px]">star</span>
 <span className="material-symbols-outlined text-[18px]">star</span>
 <span className="material-symbols-outlined text-[18px]">star</span>
 </div>
 <h4 className="font-display font-bold text-slate-900 dark:text-white">Invoicing Simplified</h4>
 </div>
 </div>
 <blockquote className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
 "SwordNex Billing cut our invoice time from 2 hours to 20 minutes. It's incredibly intuitive and has saved us so much administrative headache."
 </blockquote>
 <div className="flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-slate-700/50">
 <img alt="Ravi" className="w-10 h-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ4XwJLXM1CZBdZLx2mqKPrPNMDU2waOMlqzuCYn894y9B9_CSQhd8clRHHRe7C6bwKo6P6-m5K8pAdid8HimtIeY0fB_pdW5zKTMPsxFDyXyeTk-ja2SfIq3GXwuoWrpla0BeyYllG-ZKFucKf6mxGRIA3DLZXV8RzYiTnpILM6bWw6qKxL1iUKZRwfx7u1j0Vx4UM6aRHbQfB-Xgw8zhm13oKvbE1wfvJYLKCI8s423w3MFFKmeKzo6Ej6DxbAukv5OgC7-jeZuV" />
 <div>
 <div className="font-semibold text-slate-900 dark:text-white">Ravi</div>
 <div className="text-sm text-slate-500 dark:text-slate-400">Store Owner – Chennai</div>
 </div>
 </div>
 </div>

 <div className="w-full lg:w-[550px] bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-soft border border-slate-100 dark:border-slate-800 transition-all duration-300">
 <div className="flex items-start gap-4 mb-6">
 <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0 text-teal-500">
 <span className="material-symbols-outlined text-2xl">format_quote</span>
 </div>
 <div>
 <div className="flex text-yellow-400 text-sm mb-1">
 <span className="material-symbols-outlined text-[18px]">star</span>
 <span className="material-symbols-outlined text-[18px]">star</span>
 <span className="material-symbols-outlined text-[18px]">star</span>
 <span className="material-symbols-outlined text-[18px]">star</span>
 <span className="material-symbols-outlined text-[18px]">star</span>
 </div>
 <h4 className="font-display font-bold text-slate-900 dark:text-white">Payroll Precision</h4>
 </div>
 </div>
 <blockquote className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
 "Payroll is now on time every month, no manual Excel checks. The automated compliance features give me peace of mind I didn't know I needed."
 </blockquote>
 <div className="flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-slate-700/50">
 <img alt="Anita" className="w-10 h-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMl6q-0P2ZrEnheqFnKvGmBzcmlSUsSYJl9G6h41C3OGDKbO5cDAEuWkW8020l8veG7J3s5teZCU9FLAfGnIdpMwMq7ZFz-TbassPAdpjk-AMLzD_CkGv7t1T8BMWSlAgkQ30WZxSKAZTW2atd-e8ca4LBgydvjZudRv-39_8OVET9IvvgALaZawbdIwGMie_dJLNpgiKXUikp_9TXKctV94bloIhYcxdj-fUCfQ6jsQaa6soa67gMcVRmOtjv4Zn-tKZpVZQo5YuP" />
 <div>
 <div className="font-semibold text-slate-900 dark:text-white">Anita Desai</div>
 <div className="text-sm text-slate-500 dark:text-slate-400">HR Manager – TechFlow</div>
 </div>
 </div>
 </div>

 <div className="w-full lg:w-[550px] bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-soft border border-slate-100 dark:border-slate-800 transition-all duration-300">
 <div className="flex items-start gap-4 mb-6">
 <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 text-purple-600">
 <span className="material-symbols-outlined text-2xl">format_quote</span>
 </div>
 <div>
 <div className="flex text-yellow-400 text-sm mb-1">
 <span className="material-symbols-outlined text-[18px]">star</span>
 <span className="material-symbols-outlined text-[18px]">star</span>
 <span className="material-symbols-outlined text-[18px]">star</span>
 <span className="material-symbols-outlined text-[18px]">star</span>
 <span className="material-symbols-outlined text-[18px]">star_half</span>
 </div>
 <h4 className="font-display font-bold text-slate-900 dark:text-white">Seamless Integration</h4>
 </div>
 </div>
 <blockquote className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
 "We integrated the API into our existing CRM in under a week. The documentation was flawless and support was always available when we needed it."
 </blockquote>
 <div className="flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-slate-700/50">
 <img alt="David" className="w-10 h-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1E7Fbb4OWZCloy6GEPsyl7gMr8M_t7A5rZn05YOJl0fFzkhKfezUuC-r5rR4L1SZek1Kw1I996LrDPybRunJkWURngYp6PuFC3xhShm-6_1PEXIb-Craa8lN5ZMyYGTkr3EdqAwWkgnh_RuKFMkJMTexszGd9ury1k9_QeiANb9Yit9qOa_PbiEpkKVygu2u2HJ6714FwPZJ3HjakOA8MFaRJFkbh4Grh8ceEF8RIgvLqUUkGdqUD_TqO6Jex4CnbZrmtn9T9E9Yt" />
 <div>
 <div className="font-semibold text-slate-900 dark:text-white">David Chen</div>
 <div className="text-sm text-slate-500 dark:text-slate-400">CTO – Nexus Systems</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 </main>
 );
};

export default Testimonials;
