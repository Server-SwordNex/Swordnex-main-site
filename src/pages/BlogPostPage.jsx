import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API_BASE_URL from '../config/apiConfig';
import {
 faArrowLeft, faCalendarAlt, faClock, faShareAlt, faBookmark, faUser
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

const categoryGradients = {
 Payroll: 'from-green-500 to-emerald-600',
 HRM: 'from-purple-500 to-indigo-600',
 'React Development': 'from-cyan-500 to-blue-600',
 'Digital Marketing': 'from-orange-500 to-red-600',
 'Case Study': 'from-pink-500 to-rose-600',
 Billing: 'from-yellow-500 to-amber-600',
};

const defaultGradient = 'from-blue-500 to-blue-600';

const BlogPostPage = () => {
 const { slug } = useParams();
 const navigate = useNavigate();
 const [post, setPost] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [copied, setCopied] = useState(false);

 const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
 const shareText = post ? `${post.title} — SwordNex Tech Insights` : '';

 const shareOnTwitter = () => {
 window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
 };

 const shareOnLinkedIn = () => {
 window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
 };

 const shareOnFacebook = () => {
 window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
 };

 const handleShare = async () => {
 if (navigator.share) {
 try {
 await navigator.share({ title: shareText, url: shareUrl });
 } catch { /* user cancelled */ }
 } else {
 try {
 await navigator.clipboard.writeText(shareUrl);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 } catch { /* clipboard unavailable */ }
 }
 };

 useEffect(() => {
 const fetchPost = async () => {
 try {
 setLoading(true);
 const response = await fetch(`${API_BASE_URL}/api/blogs/slug/${slug}`);
 if (!response.ok) throw new Error('Blog post not found');
 const data = await response.json();
 setPost(data);
 } catch (err) {
 setError(err.message);
 } finally {
 setLoading(false);
 }
 };
 fetchPost();
 }, [slug]);

 if (loading) {
 return (
 <div className="min-h-screen flex items-center justify-center bg-gray-50">
 <div className="text-center">
 <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
 <p className="text-gray-600">Loading post...</p>
 </div>
 </div>
 );
 }

 if (error || !post) {
 return (
 <div className="min-h-screen flex items-center justify-center bg-gray-50">
 <div className="text-center max-w-md mx-auto p-8">
 <h2 className="text-2xl font-bold text-gray-900 mb-3">Post Not Found</h2>
 <p className="text-gray-600 mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
 <button
 onClick={() => navigate('/blogpage')}
 className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
 >
 <FontAwesomeIcon icon={faArrowLeft} />
 Back to Blog
 </button>
 </div>
 </div>
 );
 }

 const gradient = categoryGradients[post.category] || defaultGradient;
 const hasImage = post.image && post.image.trim() !== '';

 return (
 <div className="min-h-screen bg-gray-50">
 <article>
 {/* Cover Image / Header */}
 <div className={`relative w-full ${hasImage ? 'aspect-[21/9]' : `bg-gradient-to-br ${gradient} h-48 md:h-56 lg:h-64`}`}>
 {hasImage ? (
 <img
 src={post.image}
 alt={post.title}
 className="w-full h-full object-cover"
 onError={(e) => {
 e.target.style.display = 'none';
 e.target.parentElement.classList.add(`bg-gradient-to-br`, ...gradient.split(' '));
 }}
 />
 ) : null}
 <div className="absolute inset-0 bg-black/40" />
 <div className="absolute inset-0 flex items-end p-6 md:p-10 lg:p-14">
 <div className="max-w-4xl mx-auto w-full">
 <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${hasImage ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-white/20 text-white'}`}>
 {post.category}
 </span>
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
 {post.title}
 </h1>
 <div className="flex flex-wrap items-center gap-4 mt-4 text-white/80 text-sm">
 <span className="flex items-center gap-1.5">
 <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5" />
 SwordNex Team
 </span>
 <span className="flex items-center gap-1.5">
 <FontAwesomeIcon icon={faCalendarAlt} className="w-3.5 h-3.5" />
 {post.date}
 </span>
 <span className="flex items-center gap-1.5">
 <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5" />
 {post.readTime}
 </span>
 </div>
 </div>
 </div>
 </div>

 {/* Back Button */}
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
 <button
 onClick={() => navigate('/blogpage')}
 className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
 >
 <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
 Back to Blog
 </button>
 </div>

 {/* Content */}
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
 <div className="bg-white rounded-3xl shadow-xl -mt-6 relative z-10 p-6 md:p-10 lg:p-12">
 {/* Excerpt */}
 <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-medium border-l-4 border-blue-500 pl-4">
 {post.excerpt}
 </p>

 {/* Overview */}
 {post.fullContent?.overview && (
 <div className="mb-8">
 <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
 <div className="text-gray-700 leading-relaxed whitespace-pre-line">
 {post.fullContent.overview}
 </div>
 </div>
 )}

 {/* Key Features */}
 {post.fullContent?.features && post.fullContent.features.length > 0 && (
 <div className="mb-8">
 <h2 className="text-xl font-bold text-gray-900 mb-4">Key Features</h2>
 <ul className="space-y-3">
 {post.fullContent.features.map((feature, idx) => (
 <li key={idx} className="flex items-start gap-3">
 <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
 {idx + 1}
 </span>
 <span className="text-gray-700">{feature}</span>
 </li>
 ))}
 </ul>
 </div>
 )}

 {/* Why Choose */}
 {post.fullContent?.whyChoose && (
 <div className="mb-8">
 <h2 className="text-xl font-bold text-gray-900 mb-4">Why Choose SwordNex?</h2>
 <p className="text-gray-700 leading-relaxed">{post.fullContent.whyChoose}</p>
 </div>
 )}

 {/* Full Content (plain text fallback) */}
 {post.fullContent && typeof post.fullContent === 'string' && (
 <div className="mb-8">
 <div className="text-gray-700 leading-relaxed whitespace-pre-line">
 {post.fullContent}
 </div>
 </div>
 )}

 {/* Share */}
 <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-gray-200">
 <div className="flex items-center gap-3">
 <span className="text-sm font-medium text-gray-600">Share this post:</span>
 <button onClick={shareOnTwitter} className="w-9 h-9 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full flex items-center justify-center transition-colors" title="Share on Twitter">
 <FontAwesomeIcon icon={faTwitter} />
 </button>
 <button onClick={shareOnLinkedIn} className="w-9 h-9 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full flex items-center justify-center transition-colors" title="Share on LinkedIn">
 <FontAwesomeIcon icon={faLinkedin} />
 </button>
 <button onClick={shareOnFacebook} className="w-9 h-9 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full flex items-center justify-center transition-colors" title="Share on Facebook">
 <FontAwesomeIcon icon={faFacebook} />
 </button>
 </div>
 <button onClick={handleShare} className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" title="Copy link or share">
 <FontAwesomeIcon icon={faShareAlt} />
 {copied ? 'Link Copied!' : 'Share'}
 </button>
 </div>
 </div>
 </div>
 </article>
 </div>
 );
};

export default BlogPostPage;
