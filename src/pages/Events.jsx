import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config/apiConfig";

const EventCard = ({ ev }) => (
 <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 h-full">
 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5">
 {ev.badge && (
 <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 text-white mb-3">{ev.badge}</span>
 )}
 <h3 className="text-xl font-bold text-white leading-snug">{ev.title}</h3>
 {ev.subtitle && <p className="text-blue-100 text-sm mt-1">{ev.subtitle}</p>}
 </div>
 <div className="p-6 flex flex-col gap-2 flex-1">
 <div className="flex flex-wrap gap-2 text-sm">
 {ev.date && <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">{ev.date}</span>}
 {ev.time && <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full font-medium">{ev.time}</span>}
 {ev.category && <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">{ev.category}</span>}
 </div>
 {ev.venue && (
 <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
 <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
 </svg>
 {ev.venue}
 </p>
 )}
 {ev.description && <p className="text-slate-600 mt-2 line-clamp-3 text-sm">{ev.description}</p>}
 <div className="mt-auto pt-4">
 <Link
 to={`/events/${ev.slug || ev.id}`}
 className="inline-flex w-full justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold transition-colors"
 >
 View Details &amp; Register
 </Link>
 </div>
 </div>
 </div>
);

const Events = () => {
 const [events, setEvents] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const load = async () => {
 try {
 const res = await fetch(`${API_BASE_URL}/api/events`);
 const data = await res.json();
 setEvents(data);
 } catch {
 setEvents([]);
 } finally {
 setLoading(false);
 }
 };
 load();
 }, []);

 const now = new Date();
 now.setHours(0, 0, 0, 0);

 const parseCustomDate = (dateStr) => {
 if (!dateStr) return null;
 // Strip out ordinal suffixes (e.g. 1st, 2nd, 3rd, 4th) to help native parse
 let cleanStr = dateStr.replace(/\b(\d+)(st|nd|rd|th)\b/gi, "$1");
 
 // Try native Date parsing first
 let d = new Date(cleanStr);
 if (!isNaN(d.getTime())) return d;

 // Try DD-MM-YYYY or DD/MM/YYYY format parsing
 const parts = cleanStr.split(/[-/.\s]/);
 if (parts.length >= 3) {
 const day = parseInt(parts[0], 10);
 const month = parseInt(parts[1], 10) - 1;
 let year = parseInt(parts[2], 10);
 if (year < 100) year += 2000;
 
 d = new Date(year, month, day);
 if (!isNaN(d.getTime())) return d;
 }
 
 return null;
 };

 const upcomingEvents = events.filter(ev => {
 const eventDate = parseCustomDate(ev.date);
 if (!eventDate) return true; // Default to upcoming if unparseable or no date
 return eventDate >= now;
 });

 const previousEvents = events.filter(ev => {
 const eventDate = parseCustomDate(ev.date);
 if (!eventDate) return false;
 return eventDate < now;
 });

 // Sort upcoming ascending (nearest future first)
 upcomingEvents.sort((a, b) => {
 const da = parseCustomDate(a.date) || new Date(3000, 0, 1);
 const db = parseCustomDate(b.date) || new Date(3000, 0, 1);
 return da - db;
 });
 // Sort previous descending (most recent past first)
 previousEvents.sort((a, b) => {
 const da = parseCustomDate(a.date) || new Date(0);
 const db = parseCustomDate(b.date) || new Date(0);
 return db - da;
 });

 return (
 <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

 {/* Hero Header */}
 <header className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 py-20 px-6 text-center overflow-hidden">
 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
 <div className="relative z-10 max-w-3xl mx-auto">
 <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-200 bg-white/10 px-4 py-1.5 rounded-full mb-5">SwordNex</span>
 <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
 Special Events
 </h1>
 <p className="text-blue-100 text-lg md:text-xl max-w-xl mx-auto">
 Discover and register for our latest workshops, conferences, and community events.
 </p>
 </div>
 <div className="absolute bottom-0 left-0 right-0">
 <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-10 fill-blue-50">
 <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40 Z" />
 </svg>
 </div>
 </header>

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 {loading ? (
 <div className="flex justify-center py-24">
 <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
 </div>
 ) : events.length === 0 ? (
 <div className="text-center py-20">
 <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
 <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
 </svg>
 </div>
 <h2 className="text-2xl font-bold text-slate-700 mb-2">No Events Yet</h2>
 <p className="text-slate-500">Check back soon for upcoming events and workshops.</p>
 </div>
 ) : (
 <div className="space-y-16">
 {upcomingEvents.length > 0 && (
 <section>
 <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
 <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
 Upcoming Events
 </h2>
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {upcomingEvents.map(ev => <EventCard key={ev.id} ev={ev} />)}
 </div>
 </section>
 )}
 
 {previousEvents.length > 0 && (
 <section>
 <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3 opacity-80">
 <span className="w-8 h-1 bg-slate-400 rounded-full"></span>
 Previous Events
 </h2>
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75 grayscale-[30%] hover:grayscale-0 transition-all duration-300">
 {previousEvents.map(ev => <EventCard key={ev.id} ev={ev} />)}
 </div>
 </section>
 )}
 
 {upcomingEvents.length === 0 && previousEvents.length === 0 && (
 <div className="text-center py-20">
 <p className="text-slate-500 text-lg">No events to display.</p>
 </div>
 )}
 </div>
 )}
 </div>
 </div>
 );
};

export default Events;
