import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';

const Workshop = () => {
 const { id } = useParams();
 const [workshop, setWorkshop] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const fetchWorkshop = async () => {
 try {
 const res = await fetch(`${API_BASE_URL}/api/workshops/${id}`);
 if (!res.ok) throw new Error('Workshop not found');
 const data = await res.json();
 setWorkshop(data);
 } catch {
 setWorkshop(null);
 } finally {
 setLoading(false);
 }
 };
 fetchWorkshop();
 }, [id]);

 if (loading) {
 return (
 <div className="min-h-screen bg-gray-50 flex items-center justify-center">
 <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
 </div>
 );
 }

 if (!workshop) {
 return (
 <div className="min-h-screen bg-gray-50 flex items-center justify-center">
 <div className="text-center max-w-md px-6">
 <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
 <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 </div>
 <h2 className="text-2xl font-bold text-slate-900 mb-2">Workshop Not Found</h2>
 <p className="text-slate-500 mb-6">The workshop you're looking for doesn't exist or has been removed.</p>
 <Link to="/Workshopslist" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
 ← Back to Workshops
 </Link>
 </div>
 </div>
 );
 }

 const highlights = workshop.highlightPoints ? workshop.highlightPoints.split('\n').filter(h => h.trim()) : [];
 const workshopPhotos = workshop.galleryPhotos || [];

 const format12Hr = (timeStr) => {
 if (!timeStr) return '';
 if (timeStr.toLowerCase().includes('am') || timeStr.toLowerCase().includes('pm')) return timeStr;
 const parts = timeStr.split(':');
 if (parts.length < 2) return timeStr;
 let [hh, mm] = parts;
 let hours = parseInt(hh, 10);
 const ampm = hours >= 12 ? 'PM' : 'AM';
 hours = hours % 12;
 hours = hours ? hours : 12;
 return `${hours}:${mm} ${ampm}`;
 };

 return (
 <div className="min-h-screen bg-gray-50 font-sans">
 {/* Header */}
 <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-10 px-6 md:px-12 lg:px-24 relative overflow-hidden">
 <div className="absolute inset-0 bg-black/5"></div>
 <div className="relative z-10 max-w-6xl mx-auto">
 <Link to="/Workshopslist" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors">
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
 Back to Workshops
 </Link>
 <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
 <div>
 {workshop.badge && (
 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-3 bg-white/20 text-white">
 {workshop.badge}
 </span>
 )}
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{workshop.title}</h1>
 <p className="text-blue-100 mt-2 text-base md:text-lg">{workshop.category || 'Workshop'}{workshop.venue ? ` · ${workshop.venue}` : ''}</p>
 </div>
 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0 mt-2 md:mt-0">
 {workshop.date && (
 <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold text-white whitespace-nowrap shadow-sm border border-white/10">
 <svg className="w-4 h-4 opacity-80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
 <span>{workshop.date}</span>
 </div>
 )}
 {workshop.time && (
 <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold text-white whitespace-nowrap shadow-sm border border-white/10">
 <svg className="w-4 h-4 opacity-80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
 <span>{format12Hr(workshop.time)}</span>
 </div>
 )}
 <Link 
 to={`/workshops/register/${id}`}
 className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-2.5 rounded-full text-sm font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
 >
 Register Now
 </Link>
 </div>
 </div>
 </div>
 </header>

 {/* Description */}
 <section className="py-16 px-6 md:px-12 lg:px-24 bg-white border-b border-gray-100">
 <div className="max-w-6xl mx-auto">
 <div className="mb-8">
 <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">About the Workshop</span>
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Workshop Details</h2>
 <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
 </div>
 <div className="grid md:grid-cols-3 gap-10">
 <div className="md:col-span-2">
 <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{workshop.description}</p>
 </div>
 <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-7 rounded-2xl shadow-xl">
 <h3 className="text-lg font-bold mb-6">Quick Details</h3>
 <div className="space-y-5">
 {[
 { label: 'Date', value: workshop.date, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
 { label: 'Time', value: format12Hr(workshop.time), icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
 { label: 'Venue', value: workshop.venue, icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
 { label: 'Category', value: workshop.category, icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
 ].map((item, i) => item.value ? (
 <div key={i} className="flex items-center gap-4">
 <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
 </div>
 <div>
 <p className="text-sm opacity-70">{item.label}</p>
 <p className="font-semibold">{item.value}</p>
 </div>
 </div>
 ) : null)}
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Highlights */}
 {highlights.length > 0 && (
 <section className="py-12 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
 <div className="max-w-6xl mx-auto">
 <h3 className="text-center text-white text-2xl font-bold mb-10">Workshop Highlights</h3>
 <div className={`grid gap-6 ${highlights.length <= 2 ? 'grid-cols-2 max-w-2xl mx-auto' : highlights.length === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
 {highlights.map((point, index) => (
 <div key={index} className="text-center text-white py-4">
 <div className="w-14 h-14 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
 <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
 </div>
 <p className="text-lg font-bold">{point.trim()}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )}

 {/* Location */}
 <section className="py-16 px-6 md:px-12 lg:px-24 bg-white border-b border-gray-100">
 <div className="max-w-6xl mx-auto">
 <div className="mb-8">
 <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">Venue</span>
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Location &amp; Directions</h2>
 <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
 </div>
 <div className="grid md:grid-cols-2 gap-8 items-stretch">
 <div className="space-y-6">
 <div>
 <h3 className="text-xl font-bold text-gray-900 mb-1">{workshop.venue}</h3>
 <p className="text-gray-500 text-sm">{workshop.locationDetails || 'Contact us for detailed directions'}</p>
 </div>
 <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 space-y-3">
 {[
 { label: 'Date', value: workshop.date, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
 { label: 'Time', value: format12Hr(workshop.time), icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
 { label: 'Address', value: workshop.locationDetails || workshop.venue, icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
 ].map((item, i) => item.value ? (
 <div key={i} className="flex items-center gap-3">
 <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
 <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
 </div>
 <div>
 <p className="text-sm text-gray-500">{item.label}</p>
 <p className="font-bold text-gray-900">{item.value}</p>
 </div>
 </div>
 ) : null)}
 </div>
 </div>
 <div className="bg-slate-100 rounded-2xl overflow-hidden min-h-[320px]">
 <iframe
 className="w-full h-full min-h-[320px] rounded-2xl"
 src={`https://maps.google.com/maps?q=${encodeURIComponent(workshop.venue + ' ' + (workshop.locationDetails || ''))}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
 allowFullScreen loading="lazy" title="Workshop Location"
 />
 </div>
 </div>
 </div>
 </section>

 {/* Gallery */}
 {workshopPhotos.length > 0 && (
 <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
 <div className="max-w-6xl mx-auto">
 <div className="text-center mb-10">
 <h2 className="text-3xl font-bold text-gray-900">Workshop Gallery</h2>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {workshopPhotos.map((photo, index) => (
 <div key={index} className="aspect-square bg-gray-200 rounded-2xl overflow-hidden group cursor-pointer relative shadow-sm">
 {photo && typeof photo === 'string' && photo.startsWith('http') ? (
 <img src={photo} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
 ) : (
 <div className="w-full h-full bg-slate-200 flex items-center justify-center">
 <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
 </div>
 )}
 </div>
 ))}
 </div>
 </div>
 </section>
 )}

 {/* Footer Form CTA */}
 <section className="py-16 md:py-20 px-6 bg-gray-900 text-white text-center">
 <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Join?</h2>
 <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">Please contact us or fill out our enquiry form to reserve your spot.</p>
 <Link to={`/workshops/register/${id}`} className="inline-flex items-center gap-2 justify-center bg-blue-600 0 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
 Register Now
 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
 </Link>
 </section>
 </div>
 );
};

export default Workshop;
