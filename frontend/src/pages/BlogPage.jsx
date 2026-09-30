import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API_BASE_URL from '../config/apiConfig';
import {
 faFileInvoiceDollar,
 faUserFriends,
 faChartLine,
 faClipboardList,
 faReceipt,
 faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons';

// Animation Variants
const fadeInUp = {
 hidden: { opacity: 0, y: 30 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.6, ease: "easeOut" }
 }
};

const staggerContainer = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: {
 staggerChildren: 0.1,
 delayChildren: 0.2
 }
 }
};

const scaleIn = {
 hidden: { opacity: 0, scale: 0.95 },
 visible: {
 opacity: 1,
 scale: 1,
 transition: { duration: 0.5, ease: "easeOut" }
 }
};

// Animated Counter Hook
const useCounter = (target, duration = 2000) => {
 const [count, setCount] = useState(0);

 useEffect(() => {
 let start = 0;
 const increment = target / (duration / 16);

 const timer = setInterval(() => {
 start += increment;
 if (start >= target) {
 setCount(target);
 clearInterval(timer);
 } else {
 setCount(Math.floor(start));
 }
 }, 16);

 return () => clearInterval(timer);
 }, [target, duration]);

 return count;
};

// Skeleton Card Component
const SkeletonCard = () => (
 <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
 <div className="h-48 bg-gray-200"></div>
 <div className="p-6">
 <div className="h-5 w-20 bg-gray-200 rounded-full mb-4"></div>
 <div className="space-y-2 mb-4">
 <div className="h-5 bg-gray-200 rounded w-full"></div>
 <div className="h-5 bg-gray-200 rounded w-3/4"></div>
 </div>
 <div className="space-y-2 mb-4">
 <div className="h-3 bg-gray-100 rounded w-full"></div>
 <div className="h-3 bg-gray-100 rounded w-5/6"></div>
 <div className="h-3 bg-gray-100 rounded w-4/6"></div>
 </div>
 <div className="flex justify-between">
 <div className="h-3 w-24 bg-gray-100 rounded"></div>
 <div className="h-3 w-16 bg-gray-100 rounded"></div>
 </div>
 </div>
 </div>
);

// Skeleton Row Component
const SkeletonRow = () => (
 <div className="flex gap-6 p-6 bg-white rounded-2xl shadow-md border border-gray-100 animate-pulse">
 <div className="w-24 h-24 bg-gray-200 rounded-xl flex-shrink-0"></div>
 <div className="flex-1 space-y-2">
 <div className="h-4 w-16 bg-gray-200 rounded-full"></div>
 <div className="h-5 bg-gray-200 rounded w-3/4"></div>
 <div className="h-3 bg-gray-100 rounded w-full"></div>
 <div className="h-3 bg-gray-100 rounded w-2/3"></div>
 </div>
 </div>
);

const BlogPage = () => {
 const { scrollYProgress } = useScroll();
 const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

 const totalPosts = useCounter(42);
 const monthlyReaders = useCounter(12);
 const totalCategories = useCounter(25);

 const [posts, setPosts] = useState([]);
 const [fetchError, setFetchError] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const fetchPosts = async () => {
 setLoading(true);
 setFetchError(null);

 try {
 const response = await fetch(`${API_BASE_URL}/api/blogs?published=true`);

 if (!response.ok) {
 throw new Error(`Server error: ${response.status} ${response.statusText}`);
 }

 const data = await response.json();

 // Support multiple response shapes: array, { blogs: [] }, { posts: [] }, { data: [] }
 const rawPosts = Array.isArray(data)
 ? data
 : data.blogs || data.posts || data.data || [];

 // Normalize fields to match what the UI expects
 const normalized = rawPosts.map((post) => ({
 id: post.id || post._id || Math.random().toString(36),
 title: post.title || "Untitled Post",
 slug: post.slug || post.id || post._id || "",
 category: post.category || post.tag || post.tags?.[0] || "General",
 excerpt: post.excerpt || post.description || post.summary || post.content?.substring(0, 150) || "",
 date: post.date
 ? post.date
 : post.createdAt
 ? new Date(post.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
 : post.created_at
 ? new Date(post.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
 : "",
 readTime: post.readTime || post.read_time || post.reading_time || "5 min read",
 image: post.image || post.coverImage || post.thumbnail || post.featured_image || post.img || "",
 }));

 setPosts(normalized);
 } catch (error) {
 console.error("Blog fetch error:", error);
 setFetchError(error.message);
 setPosts([]);
 } finally {
 setLoading(false);
 }
 };

 fetchPosts();
 }, []);

 const categories = [
 { name: "Payroll", count: 5, slug: "/blog/payroll" },
 { name: "HRM", count: 7, slug: "/blog/hrm" },
 { name: "React Development", count: 4, slug: "/blog/react" },
 { name: "Digital Marketing", count: 6, slug: "/blog/seo" },
 { name: "Case Studies", count: 3, slug: "/blog/case-studies" },
 { name: "Billing", count: 4, slug: "/blog/billing" }
 ];

 const navigate = useNavigate();

 const handleReadMore = (post) => {
 navigate(`/blogpage/${post.slug}`);
 };

 const getCategoryIcon = (category) => {
 switch (category) {
 case "Payroll": return faFileInvoiceDollar;
 case "HRM": return faUserFriends;
 case "React Development": return faReact;
 case "Digital Marketing": return faChartLine;
 case "Case Study": return faClipboardList;
 case "Billing": return faReceipt;
 default: return faClipboardList;
 }
 };

 return (
 <>
 <div className="relative bg-gray-50">
 <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
 <div className="grid lg:grid-cols-4 gap-12">

 {/* Main Content */}
 <main className="lg:col-span-3 space-y-12">

 {/* Global Error Banner */}
 {fetchError && (
 <motion.div
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl shadow-sm"
 >
 <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 <div>
 <p className="font-semibold text-sm">Failed to load blog posts</p>
 <p className="text-xs mt-0.5 text-red-500">{fetchError}</p>
 </div>
 </motion.div>
 )}

 {/* Featured Posts */}
 <section>
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 className="flex items-center gap-4 mb-12"
 >
 <div className="w-1 h-10 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
 <h2 className="text-3xl font-bold text-gray-900">Blog Posts</h2>
 </motion.div>

 {/* Loading Skeletons */}
 {loading && (
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
 {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
 </div>
 )}

 {/* Empty State */}
 {!loading && !fetchError && posts.slice(0, 3).length === 0 && (
 <div className="flex flex-col items-center justify-center py-16 text-center">
 <svg className="w-16 h-16 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
 </svg>
 <p className="text-gray-400 font-medium">No blog posts found.</p>
 <p className="text-gray-300 text-sm mt-1">Check back soon for new content.</p>
 </div>
 )}

 {/* Actual Posts */}
 {!loading && posts.slice(0, 3).length > 0 && (
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "-100px" }}
 variants={staggerContainer}
 className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
 >
 {posts.slice(0, 3).map((post) => (
 <motion.article
 key={post.id}
 variants={scaleIn}
 whileHover={{ y: -8, transition: { duration: 0.3 } }}
 className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500"
 >
 {post.image ? (
 <div className="relative h-48 overflow-hidden">
 <img
 src={post.image}
 alt={post.title}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
 onError={(e) => { e.target.style.display = 'none'; }}
 />
 </div>
 ) : null}
 <div className="p-6">
 <div className="inline-flex px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
 {post.category}
 </div>
 <div className="space-y-3 mb-4">
 <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
 {post.title}
 </h3>
 <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm">
 {post.excerpt}
 </p>
 </div>
 <div className="flex items-center justify-between text-xs text-gray-500">
 <span>{post.date}{post.readTime ? ` • ${post.readTime}` : ""}</span>
 <button
 onClick={() => handleReadMore(post)}
 className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:gap-2 transition-all"
 >
 Read More
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
 </svg>
 </button>
 </div>
 </div>
 </motion.article>
 ))}
 </motion.div>
 )}
 </section>

 {/* Recent Articles */}
 {(loading || posts.slice(3).length > 0) && (
 <section>
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 className="flex items-center gap-4 mb-12"
 >
 <div className="w-1 h-10 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
 <h2 className="text-3xl font-bold text-gray-900">Recent Articles</h2>
 </motion.div>

 {/* Loading Skeletons */}
 {loading && (
 <div className="space-y-6">
 {[1, 2, 3].map((i) => <SkeletonRow key={i} />)}
 </div>
 )}

 {/* Actual Recent Posts */}
 {!loading && (
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "-100px" }}
 variants={staggerContainer}
 className="space-y-6"
 >
 {posts.slice(3).map((post) => (
 <motion.article
 key={post.id}
 variants={fadeInUp}
 whileHover={{ x: 8, transition: { duration: 0.3 } }}
 className="group flex gap-6 p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
 >
 {/* Cover Image / Icon Fallback */}
 {post.image ? (
 <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
 <img
 src={post.image}
 alt={post.title}
 className="w-full h-full object-cover"
 />
 </div>
 ) : (
 <div className="w-24 h-24 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl flex-shrink-0 text-3xl">
 <FontAwesomeIcon icon={getCategoryIcon(post.category)} />
 </div>
 )}

 <div className="flex-1 min-w-0">
 <div className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-2">
 {post.category}
 </div>
 <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
 {post.title}
 </h3>
 <p className="text-gray-700 mb-3 line-clamp-2 text-sm">{post.excerpt}</p>
 <div className="flex items-center justify-between text-xs text-gray-500">
 <span>{post.date}</span>
 <button
 onClick={() => handleReadMore(post)}
 className="text-blue-600 hover:text-blue-700 font-semibold transition-colors flex items-center gap-1"
 >
 Read
 <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
 </button>
 </div>
 </div>
 </motion.article>
 ))}
 </motion.div>
 )}
 </section>
 )}

 </main>

 {/* Sidebar */}
 <aside className="lg:col-span-1 space-y-8 sticky top-24 h-fit">

 {/* Categories */}
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.1 }}
 className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
 >
 <h4 className="text-gray-900 font-bold text-lg mb-6 flex items-center gap-2">
 <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
 Categories
 </h4>
 <ul className="space-y-2">
 {categories.map((category, index) => (
 <motion.li
 key={category.name}
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ delay: index * 0.1 }}
 >
 <Link
 to={category.slug}
 className="group flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-all duration-300"
 >
 <span className="text-gray-700 font-medium group-hover:text-blue-600">{category.name}</span>
 <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">{category.count}</span>
 </Link>
 </motion.li>
 ))}
 </ul>
 </motion.div>

 {/* Tags */}
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
 >
 <h4 className="text-gray-900 font-bold text-lg mb-6">Popular Tags</h4>
 <div className="flex flex-wrap gap-2">
 {['Payroll', 'HRM', 'React', 'Tailwind', 'SEO', 'SaaS', 'GST', 'Kumbakonam', 'TamilNadu'].map((tag, index) => (
 <motion.div
 key={tag}
 initial={{ opacity: 0, scale: 0.8 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ delay: index * 0.05 }}
 whileHover={{ scale: 1.1 }}
 >
 <Link
 to={`/blog/tag/${tag.toLowerCase()}`}
 className="inline-block px-4 py-2 bg-gray-50 text-sm text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-300"
 >
 {tag}
 </Link>
 </motion.div>
 ))}
 </div>
 </motion.div>

 </aside>
 </div>

 {/* CTA Section */}
 <motion.section
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="mt-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl px-10 py-14 text-center shadow-2xl"
 >
 <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 max-w-4xl mx-auto">
 Ready to Transform Your Business?
 </h2>

 <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
 Explore SwordNex Payroll, HRM, and Billing solutions built for Indian SMBs.
 </p>

 <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
 <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
 <Link
 to="/products"
 className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 text-base font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl ring-1 ring-white/30"
 >
 View Products →
 </Link>
 </motion.div>

 <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
 <Link
 to="/services"
 className="inline-flex items-center px-8 py-4 border border-white/70 text-base font-semibold text-white rounded-2xl transition-all duration-300"
 >
 Explore Services
 </Link>
 </motion.div>
 </div>
 </motion.section>

 </div>
 </div>

 <style jsx>{`
 .custom-scrollbar::-webkit-scrollbar { width: 8px; }
 .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
 .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #3b82f6, #6366f1); border-radius: 10px; }
 .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #2563eb, #4f46e5); }
 `}</style>
 </>
 );
};

export default BlogPage;