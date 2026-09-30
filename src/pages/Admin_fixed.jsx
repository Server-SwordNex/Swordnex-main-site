import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';
import {
 MessageCircle, Mail, Phone, FileText, Trash2, Menu, X,
 Calendar, Briefcase, Users, Download, Plus, Filter,
 MapPin, Search, Eye, ChevronRight, MoreHorizontal,
 Building, Clock, Star, TrendingUp, Bell, Award, BookOpen, Edit2, LogOut
} from 'lucide-react';
import AdminEventRegistrations from './AdminEventRegistrations';

const SwordNexDashboard = () => {
 // --- State ---
 const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const [selectedItem, setSelectedItem] = useState(null);
 const [drawerType, setDrawerType] = useState(null);
 const { tab } = useParams();
 const navigate = useNavigate();
 const activeTab = tab || 'overview';
 const setActiveTab = (newTab) => navigate(`/admin/${newTab}`);
 const [isJobModalOpen, setIsJobModalOpen] = useState(false);
 const [isEventModalOpen, setIsEventModalOpen] = useState(false);
 const [editingEvent, setEditingEvent] = useState(null); // null = create, object = edit
 const [searchQuery, setSearchQuery] = useState('');

 const [partners, setPartners] = useState([]);
 const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
 const [partnerFiles, setPartnerFiles] = useState([]);
 const [isUploadingPartners, setIsUploadingPartners] = useState(false);

 // --- Workshops State ---
 const [workshops, setWorkshops] = useState([]);
 const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false);
 const [editingWorkshop, setEditingWorkshop] = useState(null);
 const [newWorkshop, setNewWorkshop] = useState({
 title: '',
 subtitle: '',
 date: '',
 time: '',
 venue: '',
 category: '',
 badge: '',
 description: '',
 highlightPoints: '',
 locationDetails: '',
 });

 const [registrationStats, setRegistrationStats] = useState({ events: 0, workshops: 0, jobFair: 0 });
 const [events, setEvents] = useState([]);

 const [newEvent, setNewEvent] = useState({
 title: '',
 subtitle: '',
 date: '',
 time: '',
 venue: '',
 category: '',
 badge: '',
 description: '',
 highlightPoints: '',
 locationDetails: '',
 });
 const [jobs, setJobs] = useState([
 { id: 1, title: 'Senior React Developer', location: 'Remote', experience: '3-5 Years', status: 'Active', applicants: 12, createdAt: 'Jan 15, 2025' },
 { id: 2, title: 'UI/UX Designer', location: 'Chennai', experience: '2-4 Years', status: 'Active', applicants: 8, createdAt: 'Jan 10, 2025' },
 ]);

 useEffect(() => {
 const savedJobs = localStorage.getItem('swornex_jobs');
 if (savedJobs) {
 try {
 setJobs(JSON.parse(savedJobs));
 } catch (e) {
 console.error('Error parsing jobs from localStorage:', e);
 }
 }
 }, []);

 const [newJob, setNewJob] = useState({
 title: '',
 location: '',
 experience: '',
 summary: '',
 type: 'Full-time',
 salary: '',
 skills: '',
 responsibilities: '',
 qualifications: ''
 });

 // --- Dynamic Data ---
 const [applications, setApplications] = useState([]);

 useEffect(() => {
 const fetchApplications = async () => {
 try {
 const response = await fetch(`${API_BASE_URL}/api/careers`);
 if (!response.ok) throw new Error('Failed to fetch applications');
 const data = await response.json();

 // Sort by createdAt descending (latest first)
 data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

 // Map API data to component state structure
 const formattedApps = data.map(app => ({
 id: app.id,
 name: app.fullName || app.name || `${app.firstName || ''} ${app.lastName || ''}`.trim(),
 email: app.email,
 phone: app.phone || app.contact,
 role: app.roleOfInterest || 'Applicant',
 location: app.currentLocation || 'N/A',
 status: app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : 'New', // Capitalize status
 date: new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
 resumeUrl: app.resumeURL
 }));

 setApplications(formattedApps);
 } catch (error) {
 console.error("Error loading applications:", error);
 // Fallback to empty or localStorage if needed, but for now just empty
 setApplications([]);
 }
 };

 fetchApplications();
 }, []);

 const [contacts, setContacts] = useState([]);

 useEffect(() => {
 const fetchContacts = async () => {
 try {
 const response = await fetch(`${API_BASE_URL}/api/contacts`);
 if (!response.ok) throw new Error('Failed to fetch contacts');
 const data = await response.json();

 // Sort by createdAt descending (latest first)
 data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

 // Map API data to component state structure
 const formatted = data.map((item) => ({
 id: item.id,
 name: item.firstname && item.lastname ? `${item.firstname} ${item.lastname}` : (item.name || 'Unknown'),
 email: item.email || '—',
 phone: item.phone || '—',
 subject: item.enquirytype || item.subject || '—',
 status: 'New', // Default status as API might not return it yet
 date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Today',
 }));

 setContacts(formatted);
 } catch (error) {
 console.error("Error loading contacts:", error);
 setContacts([]);
 }
 };
 fetchContacts();
 }, []);

 const [demos, setDemos] = useState([]);

 useEffect(() => {
 const fetchDemos = async () => {
 try {
 const response = await fetch(`${API_BASE_URL}/api/appointments`);
 if (!response.ok) throw new Error('Failed to fetch appointments');
 const data = await response.json();

 // Sort by availabledate or createdAt descending
 data.sort((a, b) => new Date(b.availabledate || b.createdAt || 0) - new Date(a.availabledate || a.createdAt || 0));

 // Map API data to component state structure
 const formatted = data.map((item) => ({
 id: item.id,
 name: item.name || 'Unknown',
 email: item.email || '—',
 phone: item.phonenumber || '—',
 product: 'Consultation', // Defaulting to Consultation as per original logic
 date: item.availabledate || '—',
 time: '—', // Time is not in the appointment data structure provided earlier
 status: 'New',
 message: item.message
 }));

 setDemos(formatted);
 } catch (error) {
 console.error("Error loading demos:", error);
 setDemos([]);
 }
 };
 fetchDemos();
 }, []);

 const [courseEnquiries, setCourseEnquiries] = useState([]);
 const [enquiries, setEnquiries] = useState([]);

 useEffect(() => {
 const fetchCourseEnquiries = async () => {
 try {
 const response = await fetch(`${API_BASE_URL}/api/course-enquiries`);
 if (!response.ok) throw new Error('Failed to fetch course enquiries');
 const data = await response.json();

 // Sort by createdAt descending
 data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

 const formatted = data.map(item => ({
 ...item,
 id: item.id,
 name: item.name || item.fullName || 'Unknown',
 course: item.courseInterested || item.course || '—',
 location: item.location || '—',
 mobile: item.mobile || item.phonenumber || item.phone || '—',
 date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—',
 status: item.status || 'Review'
 }));
 setCourseEnquiries(formatted);
 } catch (error) {
 console.error("Error loading course enquiries:", error);
 setCourseEnquiries([]);
 }
 };
 fetchCourseEnquiries();
 }, []);

 useEffect(() => {
 const fetchEnquiries = async () => {
 try {
 const response = await fetch(`${API_BASE_URL}/api/service-enquiries`);
 if (!response.ok) throw new Error('Failed to fetch enquiries');
 const data = await response.json();

 // Sort by createdAt descending
 data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

 // Map API data to component state structure
 const formatted = data.map((item) => ({
 id: item.id,
 name: item.company || (item.firstname && item.lastname ? `${item.firstname} ${item.lastname}` : 'Unknown'),
 email: item.email || '—',
 phone: item.phonenumber || '—',
 service: item.service || '—',
 budget: '—', // Budget is not readily available in the new structure unless added
 status: 'New',
 date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Today',
 }));
 setEnquiries(formatted);
 } catch (error) {
 console.error("Error loading enquiries:", error);
 setEnquiries([]);
 }
 };
 fetchEnquiries();
 }, []);

 const [chatbotLeads, setChatbotLeads] = useState([]);

 useEffect(() => {
 const fetchChatbotLeads = async () => {
 try {
 const response = await fetch(`${API_BASE_URL}/api/chatbot-leads`);
 if (!response.ok) throw new Error('Failed to fetch chatbot leads');
 const data = await response.json();

 // Sort by createdAt descending
 data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

 // Map to structure expected by DataTable
 const formatted = data.map(lead => ({
 ...lead,
 id: lead.id,
 name: lead.firstName || lead.name || 'Unknown',
 date: lead.date || (lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '—')
 }));

 setChatbotLeads(formatted);
 } catch (error) {
 console.error("Error loading chatbot leads:", error);
 setChatbotLeads([]);
 }
 };
 fetchChatbotLeads();
 }, []);

 useEffect(() => {
 const fetchEvents = async () => {
 try {
 const response = await fetch(`${API_BASE_URL}/api/events`);
 if (!response.ok) throw new Error('Failed to fetch events');
 const data = await response.json();
 
 // Sort by date or createdAt descending
 data.sort((a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0));
 
 setEvents(data);
 } catch (error) {
 console.error('Error loading events:', error);
 setEvents([]);
 }
 };
 fetchEvents();
 }, []);

 useEffect(() => {
 const fetchWorkshops = async () => {
 try {
 const response = await fetch(`${API_BASE_URL}/api/workshops`);
 if (!response.ok) throw new Error('Failed to fetch workshops');
 const data = await response.json();
 setWorkshops(data.data || []);
 } catch (error) {
 console.error('Error loading workshops:', error);
 setWorkshops([]);
 }
 };
 fetchWorkshops();
 }, []);

 useEffect(() => {
 const fetchPartners = async () => {
 try {
 const response = await fetch(`${API_BASE_URL}/api/partners`);
 if (!response.ok) throw new Error('Failed to fetch partners');
 const data = await response.json();
 setPartners(data);
 } catch (error) {
 console.error('Error loading partners:', error);
 setPartners([]);
 }
 };
 fetchPartners();
 }, []);

 // --- Registration Stats Fetching ---
 useEffect(() => {
 const fetchRegistrationStats = async () => {
 try {
 // 1. Fetch Job Fair Registrations
 const jobFairRes = await fetch(`${API_BASE_URL}/api/jobfair`);
 let jobFairCount = 0;
 if (jobFairRes.ok) {
 const jobFairData = await jobFairRes.json();
 jobFairCount = Array.isArray(jobFairData) ? jobFairData.length : 0;
 }

 // 2. Fetch Event Registrations
 const evRes = await fetch(`${API_BASE_URL}/api/events`);
 let totalEventRegs = 0;
 if (evRes.ok) {
 const eventsData = await evRes.json();
 const eventList = Array.isArray(eventsData) ? eventsData : [];
 
 const eventPromises = eventList.map(async (ev) => {
 try {
 const res = await fetch(`${API_BASE_URL}/api/events/${ev.id}/registrations`);
 if (res.ok) {
 const regs = await res.json();
 return Array.isArray(regs) ? regs.length : 0;
 }
 } catch (_) {}
 return 0;
 });
 const eventCounts = await Promise.all(eventPromises);
 totalEventRegs = eventCounts.reduce((acc, count) => acc + count, 0);
 }

 // 3. Fetch Workshop Registrations
 const wsRes = await fetch(`${API_BASE_URL}/api/workshops`);
 let totalWorkshopRegs = 0;
 if (wsRes.ok) {
 const raw = await wsRes.json();
 const wsList = Array.isArray(raw) ? raw : (raw.data || []);
 
 const workshopPromises = wsList.map(async (ws) => {
 let count = 0;
 try {
 // Try ID
 const resId = await fetch(`${API_BASE_URL}/api/workshops/${ws.id}/registrations`);
 if (resId.ok) {
 const regsId = await resId.json();
 count += Array.isArray(regsId) ? regsId.length : 0;
 }
 // Try Slug if different
 if (ws.slug && ws.slug !== ws.id) {
 const resSlug = await fetch(`${API_BASE_URL}/api/workshops/${ws.slug}/registrations`);
 if (resSlug.ok) {
 const regsSlug = await resSlug.json();
 const slugRegs = Array.isArray(regsSlug) ? regsSlug : [];
 // Very rough way to avoid duplicates if we don't have IDs to check here
 // But for count it might be okay or we just take the max if we're worried
 count += slugRegs.length; 
 }
 }
 } catch (_) {}
 return count;
 });
 
 // Legacy flat collection
 let legacyCount = 0;
 try {
 const legacyRes = await fetch(`${API_BASE_URL}/api/workshop-registrations`);
 if (legacyRes.ok) {
 const legacyRegs = await legacyRes.json();
 legacyCount = Array.isArray(legacyRegs) ? legacyRegs.length : 0;
 }
 } catch (_) {}

 const workshopCounts = await Promise.all(workshopPromises);
 totalWorkshopRegs = workshopCounts.reduce((acc, count) => acc + count, 0) + legacyCount;
 }

 setRegistrationStats({
 events: totalEventRegs,
 workshops: totalWorkshopRegs,
 jobFair: jobFairCount
 });
 } catch (error) {
 console.error("Error fetching registration stats:", error);
 }
 };

 fetchRegistrationStats();
 }, []);

 // --- Stats ---
 const stats = [
 { label: 'Applications', value: applications.length, change: '+12%', icon: Users, color: 'blue' },
 { label: 'Chatbot Leads', value: chatbotLeads.length, change: '+18%', icon: MessageCircle, color: 'indigo' },
 { label: 'Open Jobs', value: jobs.length, change: '+5%', icon: Briefcase, color: 'green' },
 { label: 'Demo Bookings', value: demos.length, change: '+8%', icon: Calendar, color: 'purple' },
 { label: 'Enquiries', value: enquiries.length, change: '+15%', icon: Mail, color: 'orange' },
 { label: 'Course Enquiries', value: courseEnquiries.length, change: '+5%', icon: BookOpen, color: 'blue' },
 ];

 // --- Handlers ---
 const openDrawer = (item, type) => {
 setSelectedItem(item);
 setDrawerType(type);
 setIsDrawerOpen(true);
 setIsMobileMenuOpen(false);
 };

 const closeDrawer = () => {
 setIsDrawerOpen(false);
 setSelectedItem(null);
 setDrawerType(null);
 };

 const handleCreateJob = (e) => {
 e.preventDefault();
 if (newJob.title && newJob.location) {
 const jobToAdd = {
 id: Date.now(),
 ...newJob,
 status: 'Active',
 applicants: 0,
 createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
 };
 const updatedJobs = [jobToAdd, ...jobs];
 setJobs(updatedJobs);
 localStorage.setItem('swornex_jobs', JSON.stringify(updatedJobs));
 setIsJobModalOpen(false);
 setNewJob({
 title: '',
 location: '',
 experience: '',
 summary: '',
 type: 'Full-time',
 salary: '',
 skills: '',
 responsibilities: '',
 qualifications: ''
 });
 }
 };

 const handleCreateEvent = async (e) => {
 e.preventDefault();
 if (!newEvent.title) return;
 try {
 if (editingEvent) {
 // UPDATE
 const response = await fetch(`${API_BASE_URL}/api/events/${editingEvent.id}`, {
 method: 'PUT',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(newEvent),
 });
 if (!response.ok) throw new Error('Failed to update event');
 setEvents(prev => prev.map(ev => ev.id === editingEvent.id ? { ...ev, ...newEvent } : ev));
 } else {
 // CREATE
 const response = await fetch(`${API_BASE_URL}/api/events`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(newEvent),
 });
 if (!response.ok) throw new Error('Failed to create event');
 const result = await response.json();
 setEvents(prev => [result.data, ...prev]);
 }
 setIsEventModalOpen(false);
 setEditingEvent(null);
 setNewEvent({
 title: '', subtitle: '', date: '', time: '',
 venue: '', category: '', badge: '',
 description: '', highlightPoints: '', locationDetails: '',
 });
 } catch (error) {
 console.error('Error saving event:', error);
 alert('Failed to save event. Please try again.');
 }
 };

 const handleCreateWorkshop = async (e) => {
 e.preventDefault();
 try {
 if (editingWorkshop) {
 const response = await fetch(`${API_BASE_URL}/api/workshops/${editingWorkshop.id}`, {
 method: 'PUT',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(newWorkshop),
 });
 if (!response.ok) throw new Error('Failed to update workshop');
 const result = await response.json();
 setWorkshops(prev => prev.map(ws => ws.id === editingWorkshop.id ? { ...ws, ...newWorkshop } : ws));
 } else {
 const response = await fetch(`${API_BASE_URL}/api/workshops`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(newWorkshop),
 });
 if (!response.ok) throw new Error('Failed to create workshop');
 const result = await response.json();
 setWorkshops(prev => [result.data, ...prev]);
 }
 setIsWorkshopModalOpen(false);
 setEditingWorkshop(null);
 setNewWorkshop({
 title: '', subtitle: '', date: '', time: '',
 venue: '', category: '', badge: '',
 description: '', highlightPoints: '', locationDetails: '',
 });
 } catch (error) {
 console.error('Error saving workshop:', error);
 alert('Failed to save workshop. Please try again.');
 }
 };

 const openEditWorkshopModal = (ws) => {
 setEditingWorkshop(ws);
 setNewWorkshop({
 title: ws.title || '',
 subtitle: ws.subtitle || '',
 date: ws.date || '',
 time: ws.time || '',
 venue: ws.venue || '',
 category: ws.category || '',
 badge: ws.badge || '',
 description: ws.description || '',
 highlightPoints: ws.highlightPoints || '',
 locationDetails: ws.locationDetails || '',
 });
 setIsWorkshopModalOpen(true);
 };

 const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null, type: null });

 const handleDelete = (id, type) => {
 setDeleteConfirm({ show: true, id, type });
 };

 const confirmDelete = async () => {
 const { id, type } = deleteConfirm;
 setDeleteConfirm({ show: false, id: null, type: null });

 if (!id || !type) return;

 if (type === 'application') {
 try {
 const response = await fetch(`${API_BASE_URL}/api/careers/${id}`, { method: 'DELETE' });
 if (response.ok) {
 const updated = applications.filter(item => item.id !== id);
 setApplications(updated);
 } else {
 alert("Failed to delete application");
 }
 } catch (error) {
 console.error("Error deleting application:", error);
 }
 } else if (type === 'chatbot') {
 try {
 const response = await fetch(`${API_BASE_URL}/api/chatbot-leads/${id}`, { method: 'DELETE' });
 if (response.ok) {
 const updated = chatbotLeads.filter(item => item.id !== id);
 setChatbotLeads(updated);
 } else {
 alert("Failed to delete chatbot lead");
 }
 } catch (error) {
 console.error("Error deleting chatbot lead:", error);
 }
 } else if (type === 'job') {
 const updated = jobs.filter(item => item.id !== id);
 setJobs(updated);
 localStorage.setItem('swornex_jobs', JSON.stringify(updated));
 } else if (type === 'contact') {
 try {
 const response = await fetch(`${API_BASE_URL}/api/contacts/${id}`, { method: 'DELETE' });
 if (response.ok) {
 const updated = contacts.filter(item => item.id !== id);
 setContacts(updated);
 } else {
 alert("Failed to delete contact");
 }
 } catch (error) {
 console.error("Error deleting contact:", error);
 }
 } else if (type === 'demo') {
 try {
 const response = await fetch(`${API_BASE_URL}/api/appointments/${id}`, { method: 'DELETE' });
 if (response.ok) {
 const updated = demos.filter(item => item.id !== id);
 setDemos(updated);
 } else {
 alert("Failed to delete demo booking");
 }
 } catch (error) {
 console.error("Error deleting demo booking:", error);
 }
 } else if (type === 'enquiry') {
 try {
 const response = await fetch(`${API_BASE_URL}/api/service-enquiries/${id}`, { method: 'DELETE' });
 if (response.ok) {
 const updated = enquiries.filter(item => item.id !== id);
 setEnquiries(updated);
 } else {
 alert("Failed to delete enquiry");
 }
 } catch (error) {
 console.error("Error deleting enquiry:", error);
 }
 } else if (type === 'event') {
 try {
 const response = await fetch(`${API_BASE_URL}/api/events/${id}`, { method: 'DELETE' });
 if (response.ok) {
 const updated = events.filter(item => item.id !== id);
 setEvents(updated);
 } else {
 alert('Failed to delete event');
 }
 } catch (error) {
 console.error('Error deleting event:', error);
 }
 } else if (type === 'workshop') {
 try {
 const response = await fetch(`${API_BASE_URL}/api/workshops/${id}`, { method: 'DELETE' });
 if (response.ok) {
 const updated = workshops.filter(item => item.id !== id);
 setWorkshops(updated);
 } else {
 alert('Failed to delete workshop');
 }
 } catch (error) {
 console.error('Error deleting workshop:', error);
 }
 } else if (type === 'partner') {
 try {
 const response = await fetch(`${API_BASE_URL}/api/partners/${id}`, { method: 'DELETE' });
 if (response.ok) {
 const updated = partners.filter(item => item.id !== id);
 setPartners(updated);
 } else {
 alert('Failed to delete partner');
 }
 } catch (error) {
 console.error('Error deleting partner:', error);
 }
 } else if (type === 'course-enquiry') {
 try {
 const response = await fetch(`${API_BASE_URL}/api/course-enquiries/${id}`, { method: 'DELETE' });
 if (response.ok) {
 const updated = courseEnquiries.filter(item => item.id !== id);
 setCourseEnquiries(updated);
 } else {
 alert("Failed to delete course enquiry");
 }
 } catch (error) {
 console.error("Error deleting course enquiry:", error);
 }
 }
 closeDrawer();
 };

 const getFilteredData = (data) => {
 if (!searchQuery) return data;
 const lowerQuery = searchQuery.toLowerCase();
 return data.filter(item =>
 Object.values(item).some(val =>
 val && String(val).toLowerCase().includes(lowerQuery)
 )
 );
 };

 const getStatusColor = (status) => {
 const colors = {
 'New': 'bg-blue-100 text-blue-700',
 'Interview': 'bg-purple-100 text-purple-700',
 'Shortlisted': 'bg-green-100 text-green-700',
 'Rejected': 'bg-red-100 text-red-700',
 'Scheduled': 'bg-green-100 text-green-700',
 'Pending': 'bg-yellow-100 text-yellow-700',
 'Replied': 'bg-green-100 text-green-700',
 'Review': 'bg-yellow-100 text-yellow-700',
 'Contacted': 'bg-blue-100 text-blue-700',
 'Active': 'bg-green-100 text-green-700',
 };
 return colors[status] || 'bg-slate-100 text-slate-700';
