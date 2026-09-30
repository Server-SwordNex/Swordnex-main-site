import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../config/apiConfig';

const WorkshopsList = () => {
 const [workshops, setWorkshops] = useState([]);

 useEffect(() => {
 const fetchWorkshops = async () => {
 try {
 const response = await fetch(`${API_BASE_URL}/api/workshops`);
 if (response.ok) {
 const data = await response.json();
 setWorkshops(data.data || []);
 }
 } catch (error) {
 console.error('Failed to fetch workshops:', error);
 }
 };
 fetchWorkshops();
 }, []);

 const format12Hr = (timeStr) => {
 if (!timeStr) return '';
 if (timeStr.toLowerCase().includes('am') || timeStr.toLowerCase().includes('pm')) return timeStr;
 const parts = timeStr.split(':');
 if (parts.length < 2) return timeStr;
 let hours = parseInt(parts[0], 10);
 const minutes = parts[1];
 const ampm = hours >= 12 ? 'PM' : 'AM';
 hours = hours % 12;
 hours = hours ? hours : 12;
 return `${hours}:${minutes} ${ampm}`;
 };

 return (
 <div className="min-h-screen bg-gray-50">

 {/* PAGE HEADER */}
 <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-600 py-20 px-6 text-center text-white">
 <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full mb-4">
 Workshops
 </span>
 <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
 Upcoming Workshops
 </h1>
 <p className="max-w-2xl mx-auto text-white/90 text-base">
 Explore skill-based workshops and hands-on training programs.
 </p>
 </div>

 {/* CONTENT */}
 <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

 {workshops.length === 0 ? (
 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-lg mx-auto">
 <Calendar className="w-10 h-10 text-blue-500 mx-auto mb-4" />
 <h3 className="text-lg font-bold text-gray-900 mb-2">No Workshops Scheduled</h3>
 <p className="text-gray-500 text-sm">
 New workshops will be announced soon. Stay tuned.
 </p>
 </div>
 ) : (
 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
 {workshops.map((workshop) => (
 <div
 key={workshop.id}
 className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
 >

 {/* CARD HEADER */}
 <div className="h-40 bg-gradient-to-br from-blue-600 to-indigo-700 p-4 flex flex-col justify-end">
 <div className="flex justify-between items-center mb-1">
 {workshop.category && (
 <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-md uppercase font-semibold">
 {workshop.category}
 </span>
 )}
 {workshop.badge && (
 <span className="bg-white text-blue-600 text-[10px] px-2 py-0.5 rounded font-bold">
 {workshop.badge}
 </span>
 )}
 </div>
 <h3 className="text-xl font-bold text-white leading-snug">
 {workshop.title}
 </h3>
 </div>

 {/* CARD BODY */}
 <div className="p-4 flex flex-col flex-grow">
 <div className="space-y-2 text-sm text-gray-600 mb-4">
 <div className="flex items-center">
 <Calendar className="w-4 h-4 mr-2 text-blue-500" />
 {workshop.date}
 </div>
 <div className="flex items-center">
 <Clock className="w-4 h-4 mr-2 text-blue-500" />
 {format12Hr(workshop.time)}
 </div>
 <div className="flex items-center">
 <MapPin className="w-4 h-4 mr-2 text-blue-500" />
 {workshop.venue}
 </div>
 </div>

 <p className="text-gray-500 text-xs line-clamp-2 mb-4">
 {workshop.description}
 </p>

 <Link
 to={`/workshops/${workshop.slug || workshop.id}`}
 className="mt-auto inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 font-semibold text-sm py-2 rounded-lg transition"
 >
 View Details
 <ArrowRight className="w-4 h-4" />
 </Link>
 </div>

 </div>
 ))}
 </div>
 )}
 </div>
 </div>
 );
};

export default WorkshopsList;
