// EventDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';

const EventDetailPage = () => {
 const { id, eventId } = useParams();
 const currentId = id || eventId;
 const [event, setEvent] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const fetchEvent = async () => {
 try {
 const res = await fetch(`${API_BASE_URL}/api/events/slug/${currentId}`);
 if (!res.ok) throw new Error('Event not found');
 const data = await res.json();
 setEvent(data);
 } catch {
 setEvent(null);
 } finally {
 setLoading(false);
 }
 };
 fetchEvent();
 }, [currentId]);

 if (loading) {
 return (
 <div className="min-h-screen bg-gray-50 flex items-center justify-center">
 <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
 </div>
 );
 }

 if (!event) {
 return (
 <div className="min-h-screen bg-gray-50 flex items-center justify-center">
 <div className="text-center max-w-md px-6">
 <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
 <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 </div>
 <h2 className="text-2xl font-bold text-slate-900 mb-2">Event Not Found</h2>
 <p className="text-slate-500 mb-6">The event you're looking for doesn't exist or has been removed.</p>
 <Link to="/events" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
 ← Back to Events
 </Link>
 </div>
 </div>
 );
 }

 const highlights = event.highlightPoints ? event.highlightPoints.split('\n').filter(h => h.trim()) : [];
 const eventPhotos = event.galleryPhotos || [];
 const registerPath = `/event/${event.slug || event.id}/register`;

 return (
 <div className="min-h-screen bg-gray-50 font-sans">

 {/* Header */}
 <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-10 px-6 md:px-12 lg:px-24 relative overflow-hidden">
 <div className="absolute inset-0 bg-black/5"></div>
 <div className="relative z-10 max-w-6xl mx-auto">
 <Link to="/events" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors">
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
 Back to Events
 </Link>
 <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
 <div>
 {event.badge && (
 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-3 bg-white/20 text-white">
 {event.badge}
 </span>
 )}
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{event.title}</h1>
 <p className="text-blue-100 mt-2 text-base md:text-lg">{event.category || 'Event'}{event.venue ? ` · ${event.venue}` : ''}</p>
 </div>
 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0 mt-2 md:mt-0">
 {event.date && (
 <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold text-white whitespace-nowrap shadow-sm border border-white/10">
 <svg className="w-4 h-4 opacity-80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
 <span>{event.date}</span>
 </div>
 )}
 {event.time && (
 <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold text-white whitespace-nowrap shadow-sm border border-white/10">
 <svg className="w-4 h-4 opacity-80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
 <span>{event.time}</span>
 </div>
 )}
 </div>
 </div>
 </div>
 </header>

 {/* Description */}
 <section className="py-16 px-6 md:px-12 lg:px-24 bg-white border-b border-gray-100">
 <div className="max-w-6xl mx-auto">
 <div className="mb-8">
 <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">About the Event</span>
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Event Details</h2>
 <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
 </div>
 <div className="grid md:grid-cols-3 gap-10">
 <div className="md:col-span-2">
 <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{event.description}</p>
 </div>
 <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-7 rounded-2xl shadow-xl">
 <h3 className="text-lg font-bold mb-6">Quick Details</h3>
 <div className="space-y-5">
 {[
 { label: 'Date', value: event.date, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
 { label: 'Time', value: event.time, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
 { label: 'Venue', value: event.venue, icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
 { label: 'Category', value: event.category, icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
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
 <h3 className="text-center text-white text-2xl font-bold mb-10">Event Highlights</h3>
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
 <h3 className="text-xl font-bold text-gray-900 mb-1">{event.venue}</h3>
 <p className="text-gray-500 text-sm">{event.locationDetails || 'Contact us for detailed directions'}</p>
 </div>
 <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 space-y-3">
 {[
 { label: 'Date', value: event.date, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
 { label: 'Time', value: event.time, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
 { label: 'Address', value: event.locationDetails || event.venue, icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
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
 src={`https://maps.google.com/maps?q=${encodeURIComponent(event.venue + ' ' + (event.locationDetails || ''))}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
 allowFullScreen loading="lazy" title="Event Location"
 />
 </div>
 </div>
 </div>
 </section>

 {/* Gallery */}
 {eventPhotos.length > 0 && (
 <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
 <div className="max-w-6xl mx-auto">
 <div className="text-center mb-10">
 <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">Gallery</span>
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Event Moments</h2>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {eventPhotos.map((src, index) => (
 <div key={index} className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
 <img src={src} alt={`Event moment ${index + 1}`} className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )}

 {/* CTA Section */}
 <section className="py-20 px-6 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 relative overflow-hidden">
 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
 <div className="relative z-10 max-w-3xl mx-auto text-center">
 <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-200 bg-white/10 px-4 py-1.5 rounded-full mb-5">Don't miss out</span>
 <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
 Ready to Join <span className="text-blue-200">{event.title}</span>?
 </h2>
 <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
 Secure your spot today.{event.date ? ` The event is on ${event.date}` : ''}{event.venue ? ` at ${event.venue}` : ''}.
 </p>
 <Link
 to={registerPath}
 className="inline-flex items-center gap-3 px-10 py-4 bg-white text-blue-700 font-extrabold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
 >
 <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
 </svg>
 Register Now
 </Link>
 </div>
 </section>

 {/* <footer className="bg-gray-900 text-gray-400 text-center py-8 px-6 text-sm">
 <div className="flex items-center justify-center gap-3 mb-3">
 <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs">SN</div>
 <span className="font-bold text-white">SwordNex Technologies</span>
 </div>
 <p>© 2026 SwordNex Technologies · All rights reserved</p>
 </footer> */}
 </div>
 );
};

export default EventDetailPage;