import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';
import {
 MessageCircle, Mail, Phone, FileText, Trash2, Menu, X,
 Calendar, Briefcase, Users, Download, Plus, Filter,
 MapPin, Search, Eye, ChevronRight, MoreHorizontal,
 Building, Clock, Star, TrendingUp, Bell, Award, BookOpen, Edit2, LogOut, Newspaper, Shield,
 RefreshCw
} from 'lucide-react';
import AdminEventRegistrations from './AdminEventRegistrations';
import * as XLSX from 'xlsx';
import { apiFetch } from "../services/apiClient";

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
 const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
 const [selectedJobApplicants, setSelectedJobApplicants] = useState([]);
 const [selectedJobTitle, setSelectedJobTitle] = useState('');
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

 const[registrationStats, setRegistrationStats] = useState([]);

 // --- Events State ---
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

 const [blogs, setBlogs] = useState([]);
 const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
 const [editingBlog, setEditingBlog] = useState(null);
 const [newBlog, setNewBlog] = useState({
 title: '',
 category: '',
 excerpt: '',
 fullContent: '',
 readTime: '',
 image: '',
 slug: '',
 published: true,
 });

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
 const response = await apiFetch(`${API_BASE_URL}/api/careers`);
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
 date: new Date(app.createdAt || app.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
 resumeUrl: app.resumeURL,
 rawData: app
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
 const response = await apiFetch(`${API_BASE_URL}/api/contacts`);
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
 const response = await apiFetch(`${API_BASE_URL}/api/appointments`);
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
 const response = await apiFetch(`${API_BASE_URL}/api/course-enquiries`);
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
 const response = await apiFetch(`${API_BASE_URL}/api/service-enquiries`);
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

 const refreshBlogs = async () => {
 try {
 const response = await apiFetch(`${API_BASE_URL}/api/blogs`);
 if (!response.ok) throw new Error('Failed to fetch blogs');
 const data = await response.json();

 data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
 setBlogs(data);
 } catch (error) {
 console.error('Error loading blogs:', error);
 setBlogs([]);
 }
 };

 useEffect(() => {
 refreshBlogs();
 }, []);

 const [chatbotLeads, setChatbotLeads] = useState([]);

 useEffect(() => {
 const fetchChatbotLeads = async () => {
 try {
 const response = await apiFetch(`${API_BASE_URL}/api/chatbot-leads`);
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
 const response = await apiFetch(`${API_BASE_URL}/api/events`);
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
 const response = await apiFetch(`${API_BASE_URL}/api/workshops`);
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
 const response = await apiFetch(`${API_BASE_URL}/api/partners`);
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

 const [affiliates, setAffiliates] = useState([]);
 const [affiliatePayouts, setAffiliatePayouts] = useState([]);

 useEffect(() => {
 const fetchAffiliates = async () => {
 try {
 const res = await apiFetch(`${API_BASE_URL}/api/admin/affiliates`);
 if (res.ok) {
 const data = await res.json();
 if (data.success) setAffiliates(data.data);
 }
 } catch (error) {
 console.error('Error loading affiliates:', error);
 }
 };
 const fetchPayouts = async () => {
 try {
 const res = await apiFetch(`${API_BASE_URL}/api/admin/affiliate-payouts`);
 if (res.ok) {
 const data = await res.json();
 if (data.success) setAffiliatePayouts(data.data);
 }
 } catch (error) {
 console.error('Error loading affiliate payouts:', error);
 }
 };
 fetchAffiliates();
 fetchPayouts();
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
 const response = await apiFetch(`${API_BASE_URL}/api/events/${editingEvent.id}`, {
 method: 'PUT',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(newEvent),
 });
 if (!response.ok) throw new Error('Failed to update event');
 setEvents(prev => prev.map(ev => ev.id === editingEvent.id ? { ...ev, ...newEvent } : ev));
 } else {
 // CREATE
 const response = await apiFetch(`${API_BASE_URL}/api/events`, {
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
 const response = await apiFetch(`${API_BASE_URL}/api/workshops/${editingWorkshop.id}`, {
 method: 'PUT',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(newWorkshop),
 });
 if (!response.ok) throw new Error('Failed to update workshop');
 const result = await response.json();
 setWorkshops(prev => prev.map(ws => ws.id === editingWorkshop.id ? { ...ws, ...newWorkshop } : ws));
 } else {
 const response = await apiFetch(`${API_BASE_URL}/api/workshops`, {
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

 const handleExportExcel = async () => {
 try {
 const response = await apiFetch(`${API_BASE_URL}/api/careers`);
 if (!response.ok) throw new Error('Failed to fetch applications');
 const data = await response.json();

 const rows = data.map((app, i) => ({
 'S.No': i + 1,
 'Full Name': app.fullName || `${app.firstName || ''} ${app.lastName || ''}`.trim(),
 'Email': app.email || '',
 'Phone': app.phone || app.contact || '',
 'Role of Interest': app.roleOfInterest || '',
 'Experience (Years)': app.experienceInYears || app.experience || '',
 'Current Employer': app.currentEmployer || '',
 'Current CTC': app.currentCTC || '',
 'Expected CTC': app.expectedCTC || '',
 'Notice Period': app.noticePeriod || '',
 'Current Location': app.currentLocation || '',
 'Preferred Location': app.preferredLocation || '',
 'Skills': app.skillSet || '',
 'Gender': app.gender || '',
 'Year of Graduation': app.yearOfGraduation || '',
 'Portfolio': app.portfolio || '',
 'Message': app.message || '',
 'Status': app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : 'New',
 'Submitted Date': app.createdAt ? new Date(app.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''
 }));

 if (!rows.length) {
 alert("No applications to export.");
 return;
 }

 const ws = XLSX.utils.json_to_sheet(rows);
 const wb = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, 'Applications');
 XLSX.writeFile(wb, `Applications_${new Date().toISOString().slice(0, 10)}.xlsx`);
 } catch (error) {
 console.error('Error exporting applications:', error);
 alert('Failed to export applications. Please try again.');
 }
 };

 const showJobApplicants = (job) => {
 const matching = applications.filter(a =>
 a.rawData?.roleOfInterest?.toLowerCase().includes(job.title.toLowerCase())
 );
 setSelectedJobApplicants(matching);
 setSelectedJobTitle(job.title);
 setIsApplicantsModalOpen(true);
 };

 const confirmDelete = async () => {
 const { id, type } = deleteConfirm;
 setDeleteConfirm({ show: false, id: null, type: null });

 if (!id || !type) return;

 if (type === 'application') {
 try {
 const response = await apiFetch(`${API_BASE_URL}/api/careers/${id}`, { method: 'DELETE' });
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
 const response = await apiFetch(`${API_BASE_URL}/api/chatbot-leads/${id}`, { method: 'DELETE' });
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
 const response = await apiFetch(`${API_BASE_URL}/api/contacts/${id}`, { method: 'DELETE' });
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
 const response = await apiFetch(`${API_BASE_URL}/api/appointments/${id}`, { method: 'DELETE' });
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
 const response = await apiFetch(`${API_BASE_URL}/api/service-enquiries/${id}`, { method: 'DELETE' });
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
 const response = await apiFetch(`${API_BASE_URL}/api/events/${id}`, { method: 'DELETE' });
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
 const response = await apiFetch(`${API_BASE_URL}/api/workshops/${id}`, { method: 'DELETE' });
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
 const response = await apiFetch(`${API_BASE_URL}/api/partners/${id}`, { method: 'DELETE' });
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
 const response = await apiFetch(`${API_BASE_URL}/api/course-enquiries/${id}`, { method: 'DELETE' });
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
 };

 // --- Navigation Items ---
 const navItems = [
 { id: 'overview', label: 'Overview', icon: TrendingUp },
 { id: 'applications', label: 'Applications', icon: Users, count: applications.length },
 { id: 'chatbot', label: 'Chatbot Leads', icon: MessageCircle, count: chatbotLeads.length },
 { id: 'jobs', label: 'Jobs', icon: Briefcase, count: jobs.length },
 { id: 'contact', label: 'Contacts', icon: Mail, count: contacts.length },
 { id: 'demos', label: 'Demo Bookings', icon: Calendar, count: demos.length },
 { id: 'course_enquiries', label: 'Course Enquiries', icon: FileText, count: courseEnquiries.length },
 { id: 'enquiries', label: 'Enquiries', icon: FileText, count: enquiries.length },
 { id: 'events', label: 'Events', icon: Award, count: events.length },
 { id: 'partners', label: 'Our Partners', icon: Star, count: partners.length },
 { id: 'workshops', label: 'Workshops', icon: Calendar, count: workshops.length },
 { id: 'blog', label: 'Blog', icon: Newspaper, count: blogs.length },
 { id: 'registrations', label: 'Registrations', icon: FileText },
 { id: 'users', label: 'Users', icon: Shield },
 { id: 'affiliates', label: 'Affiliates', icon: Users, count: affiliates.length },
 ];

 // --- Render Content --- 
 const renderContent = () => {
 switch (activeTab) {
 case 'overview':
 return <OverviewSection />;
 case 'applications':
 return (
 <div className="space-y-4">
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-xl font-semibold text-slate-900">Applications</h2>
 <p className="text-sm text-slate-500">{applications.length} total</p>
 </div>
 <button
 onClick={handleExportExcel}
 className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
 >
 <Download size={16} /> Export Excel
 </button>
 </div>
 <DataTable data={getFilteredData(applications)} type="application" columns={['Name', 'Role', 'Location', 'Date', 'Status']} />
 </div>
 );
 case 'chatbot':
 return <DataTable data={getFilteredData(chatbotLeads)} type="chatbot" columns={['Name', 'Service', 'Email', 'Date', 'Status']} />;
 case 'jobs':
 return <JobsGrid />;
 case 'contact':
 return <DataTable data={getFilteredData(contacts)} type="contact" columns={['Name', 'Subject', 'Date', 'Status']} />;
 case 'demos':
 return <DataTable data={getFilteredData(demos)} type="demo" columns={['Company', 'Product', 'Date', 'Time', 'Status']} />;
 case 'enquiries':
 return <DataTable data={getFilteredData(enquiries)} type="enquiry" columns={['Company', 'Service', 'Budget', 'Status']} />;
 case 'events':
 return renderEventsGrid();
 case 'workshops':
 return renderWorkshopsGrid();
 case 'course_enquiries':
 return <DataTable data={getFilteredData(courseEnquiries)} type="course-enquiry" columns={['Name', 'Course', 'Location', 'Mobile', 'Status']} />;
 case 'partners':
 return <PartnersGrid />;
 case 'blog':
 return <BlogAdminSection />;
 case 'registrations':
 case 'registrations-events':
 case 'registrations-workshop':
 const regType = activeTab === 'registrations' ? 'events' : activeTab.split('-')[1];
 return <AdminEventRegistrations isEmbedded={true} initialTab={regType} />;
 case 'users':
 return <UsersSection />;
 case 'affiliates':
 return <AffiliatesSection />;
 default:
 return <PlaceholderSection title={activeTab} />;
 }
 };

 // --- Overview Section ---
 const OverviewSection = () => (
 <div className="space-y-6">
 {/* Stats Cards */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
 {stats.map((stat, i) => (
 <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
 <div className="flex items-center justify-between mb-3">
 <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
 stat.color === 'green' ? 'bg-green-100 text-green-600' :
 stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
 'bg-orange-100 text-orange-600'
 }`}>
 <stat.icon className="w-5 h-5" />
 </div>
 <span className="text-xs font-semibold text-green-600">{stat.change}</span>
 </div>
 <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
 <p className="text-sm text-slate-500">{stat.label}</p>
 </div>
 ))}
 </div>

 {/* Recent Activity */}
 <div className="grid lg:grid-cols-2 gap-6">
 {/* Recent Applications */}
 <div className="bg-white rounded-xl border border-slate-200">
 <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
 <h3 className="font-semibold text-slate-900">Recent Applications</h3>
 <button onClick={() => setActiveTab('applications')} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
 View all <ChevronRight className="w-4 h-4" />
 </button>
 </div>
 <div className="divide-y divide-slate-100">
 {applications.slice(0, 3).map(app => (
 <div key={app.id} className="px-5 py-3 flex items-center justify-between cursor-pointer" onClick={() => openDrawer(app, 'application')}>
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
 {app.name.split(' ').map(n => n[0]).join('')}
 </div>
 <div>
 <p className="font-medium text-slate-900 text-sm">{app.name}</p>
 <p className="text-xs text-slate-500">{app.role}</p>
 </div>
 </div>
 <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${getStatusColor(app.status)}`}>
 {app.status}
 </span>
 </div>
 ))}
 </div>
 </div>

 {/* Recent Demos */}
 <div className="bg-white rounded-xl border border-slate-200">
 <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
 <h3 className="font-semibold text-slate-900">Upcoming Demos</h3>
 <button onClick={() => setActiveTab('demos')} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
 View all <ChevronRight className="w-4 h-4" />
 </button>
 </div>
 <div className="divide-y divide-slate-100">
 {demos.slice(0, 3).map(demo => (
 <div key={demo.id} className="px-5 py-3 flex items-center justify-between cursor-pointer" onClick={() => openDrawer(demo, 'demo')}>
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold text-sm">
 {demo.name.split(' ').map(n => n[0]).join('')}
 </div>
 <div>
 <p className="font-medium text-slate-900 text-sm">{demo.name}</p>
 <p className="text-xs text-slate-500">{demo.date} at {demo.time}</p>
 </div>
 </div>
 <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${getStatusColor(demo.status)}`}>
 {demo.status}
 </span>
 </div>
 ))}
 </div>
 </div>

 {/* Recent Course Enquiries */}
 <div className="bg-white rounded-xl border border-slate-200 lg:col-span-2">
 <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
 <h3 className="font-semibold text-slate-900">Recent Course Enquiries</h3>
 <button onClick={() => setActiveTab('course_enquiries')} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
 View all <ChevronRight className="w-4 h-4" />
 </button>
 </div>
 <div className="divide-y divide-slate-100">
 {courseEnquiries.length === 0 ? (
 <div className="p-8 text-center text-slate-500 text-sm italic">No recent enquiries found</div>
 ) : (
 courseEnquiries.slice(0, 3).map(ce => (
 <div key={ce.id} className="px-5 py-3 flex items-center justify-between cursor-pointer" onClick={() => openDrawer(ce, 'course-enquiry')}>
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-semibold text-sm">
 {ce.name?.[0] || 'C'}
 </div>
 <div>
 <p className="font-medium text-slate-900 text-sm">{ce.name}</p>
 <p className="text-xs text-slate-500">{ce.course} • {ce.location}</p>
 </div>
 </div>
 <div className="text-right">
 <p className="text-xs font-medium text-slate-900">{ce.mobile}</p>
 <p className="text-[10px] text-slate-400">{ce.date}</p>
 </div>
 </div>
 ))
 )}
 </div>
 </div>
 </div>
 </div>
 );

 // --- Jobs Grid ---
 const JobsGrid = () => {
 const filteredJobs = getFilteredData(jobs);
 return (
 <div className="space-y-4">
 <div className="flex justify-end">
 <button
 onClick={() => setIsJobModalOpen(true)}
 className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <Plus className="w-4 h-4" /> Add Job
 </button>
 </div>
 {filteredJobs.length === 0 ? (
 <EmptyState icon={Briefcase} title="No Jobs" description="Create your first job posting" action={() => setIsJobModalOpen(true)} />
 ) : (
 <div className="grid md:grid-cols-2 gap-4">
 {filteredJobs.map(job => (
 <div key={job.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer" onClick={() => openDrawer(job, 'job')}>
 <div className="flex items-start justify-between mb-3">
 <div>
 <h3 className="font-semibold text-slate-900">{job.title}</h3>
 <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
 <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
 <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.experience}</span>
 </div>
 </div>
 <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${getStatusColor(job.status)}`}>
 {job.status}
 </span>
 </div>
 <div className="flex items-center justify-between pt-3 border-t border-slate-100">
 <span className="text-xs text-slate-500">Posted: {job.createdAt}</span>
 <span
 onClick={(e) => { e.stopPropagation(); showJobApplicants(job); }}
 className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
 >
 {applications.filter(a => a.rawData?.roleOfInterest?.toLowerCase().includes(job.title.toLowerCase())).length} applicants
 </span>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 );
 };

 const slugify = (text) =>
 text?.toString().toLowerCase().trim()
 .replace(/\s+/g, '-')
 .replace(/[^a-z0-9-]/g, '')
 .replace(/^-+|-+$/g, '') || '';

 const handleOpenBlogModal = (blog = null) => {
 if (blog) {
 setEditingBlog(blog);
 setNewBlog({
 title: blog.title || '',
 category: blog.category || '',
 excerpt: blog.excerpt || '',
 fullContent: blog.fullContent?.overview || blog.fullContent || '',
 readTime: blog.readTime || '',
 image: blog.image || '',
 slug: blog.slug || '',
 published: blog.published === true,
 });
 } else {
 setEditingBlog(null);
 setNewBlog({
 title: '',
 category: '',
 excerpt: '',
 fullContent: '',
 readTime: '',
 image: '',
 slug: '',
 published: true,
 });
 }
 setIsBlogModalOpen(true);
 };

 const handleSaveBlog = async (e) => {
 e.preventDefault();
 if (!newBlog.title || !newBlog.category || !newBlog.excerpt) {
 alert('Title, category, and excerpt are required.');
 return;
 }

 const payload = {
 title: newBlog.title,
 category: newBlog.category,
 excerpt: newBlog.excerpt,
 fullContent: { overview: newBlog.fullContent || newBlog.excerpt },
 readTime: newBlog.readTime || '5 min',
 image: newBlog.image || '',
 slug: newBlog.slug ? slugify(newBlog.slug) : slugify(newBlog.title),
 published: newBlog.published,
 };

 try {
 const url = editingBlog ? `${API_BASE_URL}/api/blogs/${editingBlog.id}` : `${API_BASE_URL}/api/blogs`;
 const method = editingBlog ? 'PUT' : 'POST';
 const response = await apiFetch(url, {
 method,
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(payload),
 });

 if (!response.ok) {
 const errorData = await response.json();
 throw new Error(errorData.error || 'Failed to save blog');
 }

 await refreshBlogs();
 setIsBlogModalOpen(false);
 setEditingBlog(null);
 setNewBlog({
 title: '', category: '', excerpt: '', fullContent: '', readTime: '', image: '', slug: '', published: true,
 });
 } catch (error) {
 console.error('Blog save error:', error);
 alert('Could not save the blog post. Please try again.');
 }
 };

 const handleDeleteBlog = async (id) => {
 if (!window.confirm('Delete this blog post? This cannot be undone.')) return;
 try {
 const response = await apiFetch(`${API_BASE_URL}/api/blogs/${id}`, { method: 'DELETE' });
 if (!response.ok) {
 const errorData = await response.json();
 throw new Error(errorData.error || 'Failed to delete blog');
 }
 await refreshBlogs();
 } catch (error) {
 console.error('Blog delete error:', error);
 alert('Could not delete the blog post. Please try again.');
 }
 };

 const handleToggleBlogPublished = async (blog) => {
 try {
 const response = await apiFetch(`${API_BASE_URL}/api/blogs/${blog.id}`, {
 method: 'PUT',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ published: !blog.published }),
 });
 if (!response.ok) {
 const errorData = await response.json();
 throw new Error(errorData.error || 'Failed to update publish status');
 }
 await refreshBlogs();
 } catch (error) {
 console.error('Toggle publish error:', error);
 alert('Could not change publish state. Please try again.');
 }
 };

 const BlogAdminSection = () => {
 const filteredBlogs = getFilteredData(blogs);

 return (
 <div className="space-y-6">
 <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
 <div>
 <h2 className="text-xl font-semibold text-slate-900">Blog Posts</h2>
 <p className="text-sm text-slate-500 mt-1">Create, publish, and manage your blog content from one place.</p>
 </div>
 <button
 onClick={() => handleOpenBlogModal()}
 className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <Plus className="w-4 h-4" /> New Blog Post
 </button>
 </div>

 {filteredBlogs.length === 0 ? (
 <EmptyState icon={Newspaper} title="No Blog Posts" description="Start publishing blog content to make it available on the frontend." action={() => handleOpenBlogModal()} />
 ) : (
 <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left text-slate-600">
 <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] tracking-[0.12em]">
 <tr>
 <th className="px-5 py-4">Title</th>
 <th className="px-5 py-4">Category</th>
 <th className="px-5 py-4">Status</th>
 <th className="px-5 py-4">Date</th>
 <th className="px-5 py-4 text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {filteredBlogs.map(blog => (
 <tr key={blog.id} className=" transition-colors">
 <td className="px-5 py-4 w-1/3">
 <div className="font-medium text-slate-900 line-clamp-1">{blog.title}</div>
 <div className="text-xs text-slate-500 line-clamp-1">{blog.excerpt}</div>
 </td>
 <td className="px-5 py-4 text-slate-600">{blog.category}</td>
 <td className="px-5 py-4">
 <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${blog.published ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
 {blog.published ? 'Published' : 'Draft'}
 </span>
 </td>
 <td className="px-5 py-4 text-slate-600">{blog.date || new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
 <td className="px-5 py-4 text-right">
 <div className="flex flex-wrap justify-end gap-2">
 <button
 onClick={() => handleOpenBlogModal(blog)}
 className="px-3 py-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
 >
 Edit
 </button>
 <button
 onClick={() => handleToggleBlogPublished(blog)}
 className={`px-3 py-2 text-xs font-semibold rounded-lg ${blog.published ? 'text-slate-700 bg-slate-100 hover:bg-slate-200' : 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200'}`}
 >
 {blog.published ? 'Unpublish' : 'Publish'}
 </button>
 <button
 onClick={() => handleDeleteBlog(blog.id)}
 className="px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
 >
 Delete
 </button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}

 </div>
 );
 };

 // --- Workshops Grid ---
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

 const renderWorkshopsGrid = () => {
 const filteredWorkshops = getFilteredData(workshops);
 return (
 <div className="space-y-4">
 <div className="flex justify-end">
 <button
 onClick={() => {
 setEditingWorkshop(null);
 setNewWorkshop({
 title: '', subtitle: '', date: '', time: '',
 venue: '', category: '', badge: '',
 description: '', highlightPoints: '', locationDetails: '',
 });
 setIsWorkshopModalOpen(true);
 }}
 className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <Plus className="w-4 h-4" /> Add Workshop
 </button>
 </div>
 {filteredWorkshops.length === 0 ? (
 <EmptyState icon={BookOpen} title="No Workshops" description="Create your first workshop" action={() => setIsWorkshopModalOpen(true)} />
 ) : (
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
 {filteredWorkshops.map(ws => (
 <div key={ws.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
 <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-4">
 <h3 className="font-bold text-white text-base leading-snug">{ws.title}</h3>
 </div>
 <div className="p-4 flex flex-col gap-2 flex-1">
 <div className="flex flex-wrap gap-2 text-xs">
 {ws.date && (
 <span className="flex items-center gap-1 px-2 py-1 bg-teal-50 text-teal-700 rounded-full">
 <Calendar className="w-3 h-3" />{ws.date}
 </span>
 )}
 {ws.time && (
 <span className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">
 <Clock className="w-3 h-3" />{format12Hr(ws.time)}
 </span>
 )}
 </div>
 {ws.venue && (
 <p className="text-xs text-slate-500 flex items-center gap-1">
 <MapPin className="w-3 h-3" />{ws.venue}
 </p>
 )}
 {ws.description && (
 <p className="text-sm text-slate-600 line-clamp-2 mt-1">{ws.description}</p>
 )}
 <div className="mt-auto pt-3 flex justify-end gap-2">
 <button
 onClick={() => openEditWorkshopModal(ws)}
 className="p-2 text-blue-400 hover:text-blue-600 rounded-lg transition-colors"
 title="Edit Workshop"
 >
 <Edit2 className="w-4 h-4" />
 </button>
 <button
 onClick={() => handleDelete(ws.id, 'workshop')}
 className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
 title="Delete Workshop"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 );
 };

 // --- Events Grid ---
 const renderEventsGrid = () => {
 const filteredEvents = getFilteredData(events);
 return (
 <div className="space-y-4">
 <div className="flex justify-end">
 <button
 onClick={() => { setEditingEvent(null); setNewEvent({ title: '', subtitle: '', date: '', time: '', venue: '', category: '', badge: '', description: '', highlightPoints: '', locationDetails: '' }); setIsEventModalOpen(true); }}
 className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <Plus className="w-4 h-4" /> Create Event
 </button>
 </div>
 {filteredEvents.length === 0 ? (
 <EmptyState icon={Award} title="No Events" description="Create your first event" action={() => { setEditingEvent(null); setIsEventModalOpen(true); }} />
 ) : (
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
 {filteredEvents.map(ev => (
 <div key={ev.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
 {ev.badge && (
 <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 text-white mb-2">{ev.badge}</span>
 )}
 <h3 className="font-bold text-white text-base leading-snug">{ev.title}</h3>
 {ev.subtitle && <p className="text-blue-100 text-xs mt-1">{ev.subtitle}</p>}
 </div>
 <div className="p-4 flex flex-col gap-2 flex-1">
 <div className="flex flex-wrap gap-2 text-xs">
 {ev.date && (
 <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
 <Calendar className="w-3 h-3" />{ev.date}
 </span>
 )}
 {ev.time && (
 <span className="flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">
 <Clock className="w-3 h-3" />{ev.time}
 </span>
 )}
 {ev.category && (
 <span className="flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
 {ev.category}
 </span>
 )}
 </div>
 {ev.venue && (
 <p className="text-xs text-slate-500 flex items-center gap-1">
 <MapPin className="w-3 h-3" />{ev.venue}
 </p>
 )}
 {ev.description && (
 <p className="text-sm text-slate-600 line-clamp-2 mt-1">{ev.description}</p>
 )}
 {ev.slug && (
 <p className="text-xs text-slate-400 flex items-center gap-1 font-mono">/event/{ev.slug}</p>
 )}
 <div className="mt-auto pt-3 flex gap-2">
 <button
 onClick={() => {
 setEditingEvent(ev);
 setNewEvent({
 title: ev.title || '',
 subtitle: ev.subtitle || '',
 date: ev.date || '',
 time: ev.time || '',
 venue: ev.venue || '',
 category: ev.category || '',
 badge: ev.badge || '',
 description: ev.description || '',
 highlightPoints: ev.highlightPoints || '',
 locationDetails: ev.locationDetails || '',
 });
 setIsEventModalOpen(true);
 }}
 className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
 >
 Edit
 </button>
 <button
 onClick={() => handleDelete(ev.id, 'event')}
 className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
 title="Delete Event"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 );
 };

 // --- Partners Grid ---
 const PartnersGrid = () => {
 const filteredPartners = getFilteredData(partners);
 return (
 <div className="space-y-4">
 <div className="flex justify-end">
 <button
 onClick={() => { setPartnerFiles([]); setIsPartnerModalOpen(true); }}
 className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <Plus className="w-4 h-4" /> Add Partners
 </button>
 </div>
 {filteredPartners.length === 0 ? (
 <EmptyState icon={Star} title="No Partners" description="Upload your first partner logo" action={() => { setPartnerFiles([]); setIsPartnerModalOpen(true); }} />
 ) : (
 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
 {filteredPartners.map(partner => (
 <div key={partner.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow relative group">
 <div className="w-full aspect-square bg-slate-50 flex items-center justify-center p-4">
 <img src={partner.imageUrl} alt={partner.originalName} className="mix-blend-multiply dark:mix-blend-normal" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
 </div>
 <div className="p-3 border-t border-slate-100 flex justify-between items-center">
 <p className="text-xs text-slate-500 truncate" title={partner.originalName}>{partner.originalName}</p>
 <button
 onClick={() => handleDelete(partner.id, 'partner')}
 className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
 title="Delete Partner"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 );
 };

 // --- Affiliates Section ---
 const AffiliatesSection = () => {
 const [subTab, setSubTab] = useState('affiliates');

 const handleApproveCommission = async (id) => {
 try {
 const res = await apiFetch(`${API_BASE_URL}/api/admin/affiliate-commissions/${id}`, {
 method: 'PUT', headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ status: 'approved' }),
 });
 if (res.ok) {
 const refreshed = await apiFetch(`${API_BASE_URL}/api/admin/affiliates`);
 if (refreshed.ok) { const d = await refreshed.json(); if (d.success) setAffiliates(d.data); }
 }
 } catch (e) { console.error(e); }
 };

 const handleRejectCommission = async (id) => {
 try {
 const res = await apiFetch(`${API_BASE_URL}/api/admin/affiliate-commissions/${id}`, {
 method: 'PUT', headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ status: 'cancelled' }),
 });
 if (res.ok) {
 const refreshed = await apiFetch(`${API_BASE_URL}/api/admin/affiliates`);
 if (refreshed.ok) { const d = await refreshed.json(); if (d.success) setAffiliates(d.data); }
 }
 } catch (e) { console.error(e); }
 };

 const handlePayoutAction = async (id, status) => {
 try {
 const res = await apiFetch(`${API_BASE_URL}/api/admin/affiliate-payouts/${id}`, {
 method: 'PUT', headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ status }),
 });
 if (res.ok) {
 const [affRes, payoutRes] = await Promise.all([
 apiFetch(`${API_BASE_URL}/api/admin/affiliates`),
 apiFetch(`${API_BASE_URL}/api/admin/affiliate-payouts`),
 ]);
 if (affRes.ok) { const d = await affRes.json(); if (d.success) setAffiliates(d.data); }
 if (payoutRes.ok) { const d = await payoutRes.json(); if (d.success) setAffiliatePayouts(d.data); }
 }
 } catch (e) { console.error(e); }
 };

 const handleToggleStatus = async (id, currentStatus) => {
 const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
 try {
 const res = await apiFetch(`${API_BASE_URL}/api/admin/affiliates/${id}/status`, {
 method: 'PUT', headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ status: newStatus }),
 });
 if (res.ok) {
 const refreshed = await apiFetch(`${API_BASE_URL}/api/admin/affiliates`);
 if (refreshed.ok) { const d = await refreshed.json(); if (d.success) setAffiliates(d.data); }
 }
 } catch (e) { console.error(e); }
 };

 const handleDeleteAffiliate = async (id) => {
 if (!window.confirm('Delete this affiliate permanently? This will remove all their data including referral codes, clicks, commissions, and payouts. This cannot be undone.')) return;
 try {
 const res = await apiFetch(`${API_BASE_URL}/api/admin/affiliates/${id}`, { method: 'DELETE' });
 if (res.ok) {
 setAffiliates(prev => prev.filter(a => a.id !== id));
 } else {
 const d = await res.json();
 alert(d.error || 'Failed to delete affiliate');
 }
 } catch (e) { console.error(e); }
 };

 const activePayouts = affiliatePayouts.filter(p => p.status === 'requested');

 return (
 <div className="space-y-6">
 <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
 <button onClick={() => setSubTab('affiliates')}
 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${subTab === 'affiliates' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 '}`}>
 All Affiliates ({affiliates.length})
 </button>
 <button onClick={() => setSubTab('payouts')}
 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${subTab === 'payouts' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 '}`}>
 Payout Requests
 {activePayouts.length > 0 && (
 <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{activePayouts.length}</span>
 )}
 </button>
 </div>

 {subTab === 'affiliates' && (
 <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
 {affiliates.length === 0 ? (
 <EmptyState icon={Users} title="No Affiliates" description="No affiliates have registered yet" />
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-slate-50 text-left text-slate-500">
 <th className="px-4 py-3 font-medium">Affiliate</th>
 <th className="px-4 py-3 font-medium">Code</th>
 <th className="px-4 py-3 font-medium">Clicks</th>
 <th className="px-4 py-3 font-medium">Conversions</th>
 <th className="px-4 py-3 font-medium">Earned</th>
 <th className="px-4 py-3 font-medium">Balance</th>
 <th className="px-4 py-3 font-medium">Paid</th>
 <th className="px-4 py-3 font-medium">Status</th>
 <th className="px-4 py-3 font-medium">Joined</th>
 <th className="px-4 py-3 font-medium">Actions</th>
 </tr>
 </thead>
 <tbody>
 {getFilteredData(affiliates).map((a) => (
 <tr key={a.id} className="border-t border-slate-100 ">
 <td className="px-4 py-3">
 <div className="font-medium text-slate-900">{a.firstName} {a.lastName}</div>
 <div className="text-xs text-slate-400">{a.email}</div>
 {a.phone && <div className="text-xs text-slate-400">{a.phone}</div>}
 </td>
 <td className="px-4 py-3"><code className="text-blue-600 font-mono text-xs">{a.referralCode}</code></td>
 <td className="px-4 py-3 text-slate-900">{a.totalClicks || 0}</td>
 <td className="px-4 py-3 text-slate-900">{a.totalConversions || 0}</td>
 <td className="px-4 py-3 text-green-600 font-medium">₹{(a.totalEarned || 0).toLocaleString('en-IN')}</td>
 <td className="px-4 py-3 text-blue-600 font-medium">₹{(a.balance || 0).toLocaleString('en-IN')}</td>
 <td className="px-4 py-3 text-slate-900">₹{(a.totalPaid || 0).toLocaleString('en-IN')}</td>
 <td className="px-4 py-3">
 <span className={`px-2 py-1 rounded-full text-xs font-medium ${a.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
 {a.status || 'active'}
 </span>
 </td>
 <td className="px-4 py-3 text-slate-400 text-xs">
 {a.createdAt ? new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
 </td>
 <td className="px-4 py-3">
 <div className="flex items-center gap-2">
 <button onClick={() => handleToggleStatus(a.id, a.status)}
 className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${a.status === 'active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
 {a.status === 'active' ? 'Suspend' : 'Activate'}
 </button>
 <button onClick={() => handleDeleteAffiliate(a.id)}
 className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
 Delete
 </button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </div>
 )}

 {subTab === 'payouts' && (
 <div className="space-y-4">
 {affiliatePayouts.length === 0 ? (
 <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
 <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
 <h3 className="text-lg font-semibold text-slate-900 mb-2">No Payout Requests</h3>
 <p className="text-slate-500">No payout requests from affiliates yet.</p>
 </div>
 ) : (
 <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-slate-50 text-left text-slate-500">
 <th className="px-4 py-3 font-medium">Date</th>
 <th className="px-4 py-3 font-medium">Affiliate</th>
 <th className="px-4 py-3 font-medium">Amount</th>
 <th className="px-4 py-3 font-medium">Method</th>
 <th className="px-4 py-3 font-medium">Details</th>
 <th className="px-4 py-3 font-medium">Status</th>
 <th className="px-4 py-3 font-medium">Actions</th>
 </tr>
 </thead>
 <tbody>
 {affiliatePayouts.map((p) => {
 const aff = affiliates.find(a => a.id === p.affiliateId);
 return (
 <tr key={p.id} className="border-t border-slate-100 ">
 <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
 {p.requestedAt ? new Date(p.requestedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
 </td>
 <td className="px-4 py-3">
 <div className="font-medium text-slate-900">{aff?.firstName} {aff?.lastName || 'Unknown'}</div>
 <div className="text-xs text-slate-400">{aff?.email}</div>
 </td>
 <td className="px-4 py-3 font-medium text-slate-900">₹{p.amount}</td>
 <td className="px-4 py-3 text-slate-600">{p.method || '-'}</td>
 <td className="px-4 py-3 text-xs text-slate-500 max-w-[150px] truncate">{p.details || '-'}</td>
 <td className="px-4 py-3">
 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
 p.status === 'paid' ? 'bg-green-100 text-green-700' :
 p.status === 'rejected' ? 'bg-red-100 text-red-700' :
 'bg-yellow-100 text-yellow-700'
 }`}>{p.status}</span>
 </td>
 <td className="px-4 py-3">
 {p.status === 'requested' && (
 <div className="flex gap-2">
 <button onClick={() => handlePayoutAction(p.id, 'paid')}
 className="px-3 py-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 text-xs font-medium">Mark Paid</button>
 <button onClick={() => handlePayoutAction(p.id, 'rejected')}
 className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-medium">Reject</button>
 </div>
 )}
 {p.status === 'paid' && <span className="text-xs text-green-600 font-medium">Processed</span>}
 {p.status === 'rejected' && <span className="text-xs text-red-600 font-medium">Rejected</span>}
 </td>
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>
 </div>
 )}
 </div>
 )}
 </div>
 );
 };

 // --- Generic Data Table ---
 const DataTable = ({ data, type, columns }) => (
 <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
 {data.length === 0 ? (
 <EmptyState icon={FileText} title="No Data" description="No records found" />
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead>
 <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
 {columns.map((col, i) => (
 <th key={i} className="px-5 py-3 text-left font-semibold">{col}</th>
 ))}
 <th className="px-5 py-3 text-right font-semibold">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {data.map(item => (
 <tr key={item.id} className=" cursor-pointer transition-colors" onClick={() => openDrawer(item, type)}>
 {type === 'application' && (
 <>
 <td className="px-5 py-4">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-xs">
 {item.name.split(' ').map(n => n[0]).join('')}
 </div>
 <div>
 <p className="font-medium text-slate-900 text-sm">{item.name}</p>
 <p className="text-xs text-slate-500">{item.email}</p>
 </div>
 </div>
 </td>
 <td className="px-5 py-4 text-sm text-slate-600">{item.role}</td>
 <td className="px-5 py-4 text-sm text-slate-600">{item.location}</td>
 <td className="px-5 py-4 text-sm text-slate-500">{item.date}</td>
 <td className="px-5 py-4">
 <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${getStatusColor(item.status)}`}>{item.status}</span>
 </td>
 </>
 )}
 {type === 'chatbot' && (
 <>
 <td className="px-5 py-4">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold text-xs">
 {item.firstName?.[0] || '?'}
 </div>
 <div>
 <p className="font-medium text-slate-900 text-sm">{item.firstName}</p>
 <p className="text-xs text-slate-500">{item.contact}</p>
 </div>
 </div>
 </td>
 <td className="px-5 py-4 text-sm text-slate-600">{item.service}</td>
 <td className="px-5 py-4 text-sm text-slate-600">{item.email}</td>
 <td className="px-5 py-4 text-sm text-slate-500">{item.date}</td>
 <td className="px-5 py-4">
 <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${getStatusColor(item.status)}`}>{item.status}</span>
 </td>
 </>
 )}
 {type === 'contact' && (
 <>
 <td className="px-5 py-4">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-semibold text-xs">
 {item.name.split(' ').map(n => n[0]).join('')}
 </div>
 <div>
 <p className="font-medium text-slate-900 text-sm">{item.name}</p>
 <p className="text-xs text-slate-500">{item.email}</p>
 </div>
 </div>
 </td>
 <td className="px-5 py-4 text-sm text-slate-600">{item.subject}</td>
 <td className="px-5 py-4 text-sm text-slate-500">{item.date}</td>
 <td className="px-5 py-4">
 <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${getStatusColor(item.status)}`}>{item.status}</span>
 </td>
 </>
 )}
 {type === 'demo' && (
 <>
 <td className="px-5 py-4">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold text-xs">
 {item.name.split(' ').map(n => n[0]).join('')}
 </div>
 <div>
 <p className="font-medium text-slate-900 text-sm">{item.name}</p>
 <p className="text-xs text-slate-500">{item.email}</p>
 </div>
 </div>
 </td>
 <td className="px-5 py-4 text-sm text-slate-600">{item.product}</td>
 <td className="px-5 py-4 text-sm text-slate-500">{item.date}</td>
 <td className="px-5 py-4 text-sm text-slate-500">{item.time}</td>
 <td className="px-5 py-4">
 <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${getStatusColor(item.status)}`}>{item.status}</span>
 </td>
 </>
 )}
 {type === 'enquiry' && (
 <>
 <td className="px-5 py-4">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-xs">
 {item.name.split(' ').map(n => n[0]).join('')}
 </div>
 <div>
 <p className="font-medium text-slate-900 text-sm">{item.name}</p>
 <p className="text-xs text-slate-500">{item.email}</p>
 </div>
 </div>
 </td>
 <td className="px-5 py-4 text-sm text-slate-600">{item.service}</td>
 <td className="px-5 py-4 text-sm text-slate-600">{item.budget}</td>
 <td className="px-5 py-4">
 <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${getStatusColor(item.status)}`}>{item.status}</span>
 </td>
 </>
 )}
 {type === 'course-enquiry' && (
 <>
 <td className="px-5 py-4">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-xs">
 {item.name?.[0] || 'C'}
 </div>
 <div>
 <p className="font-medium text-slate-900 text-sm">{item.name}</p>
 <p className="text-xs text-slate-500">{item.email}</p>
 </div>
 </div>
 </td>
 <td className="px-5 py-4 text-sm text-slate-600">{item.course}</td>
 <td className="px-5 py-4 text-sm text-slate-600">{item.location}</td>
 <td className="px-5 py-4 text-sm text-slate-600">{item.mobile}</td>
 <td className="px-5 py-4">
 <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${getStatusColor(item.status)}`}>{item.status}</span>
 </td>
 </>
 )}
 <td className="px-5 py-4 text-right">
 <div className="flex justify-end gap-2">
 <button
 onClick={(e) => { e.stopPropagation(); openDrawer(item, type); }}
 className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md transition-colors"
 title="View Details"
 >
 <Eye className="w-4 h-4" />
 </button>
 <button
 onClick={(e) => { e.stopPropagation(); handleDelete(item.id, type); }}
 className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
 title="Delete"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </div>
 );

 // --- Empty State ---
 const EmptyState = ({ icon, title, description, action }) => (
 <div className="text-center py-12">
 <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
 {icon && React.createElement(icon, { className: "w-7 h-7" })}
 </div>
 <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
 <p className="text-sm text-slate-500 mb-4">{description}</p>
 {action && (
 <button onClick={action} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
 <Plus className="w-4 h-4" /> Create New
 </button>
 )}
 </div>
 );

 // --- Users Section ---
 const UsersSection = () => {
 const [users, setUsers] = useState([]);
 const [loading, setLoading] = useState(true);
 const [fetchError, setFetchError] = useState('');
 const [showCreateModal, setShowCreateModal] = useState(false);
 const [createForm, setCreateForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'HR', mobileNumber: '' });
 const [createError, setCreateError] = useState('');
 const [createLoading, setCreateLoading] = useState(false);

 const fetchUsers = async () => {
 setLoading(true);
 setFetchError('');
 try {
 const res = await apiFetch(`${API_BASE_URL}/api/users`);
 if (!res.ok) {
 const data = await res.json().catch(() => ({}));
 throw new Error(data.error || `Request failed (${res.status})`);
 }
 const data = await res.json();
 setUsers(data.users || []);
 } catch (e) {
 setFetchError(e.message);
 console.error('Failed to fetch users:', e);
 } finally {
 setLoading(false);
 }
 };

 useEffect(() => { fetchUsers(); }, []);

 const handleCreate = async (e) => {
 e.preventDefault();
 setCreateError('');
 setCreateLoading(true);
 try {
 const res = await apiFetch(`${API_BASE_URL}/api/users/create`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(createForm),
 });
 const data = await res.json();
 if (!res.ok) return setCreateError(data.error);
 setShowCreateModal(false);
 setCreateForm({ firstName: '', lastName: '', email: '', password: '', role: 'HR', mobileNumber: '' });
 fetchUsers();
 } catch (e) {
 setCreateError(e.message);
 } finally {
 setCreateLoading(false);
 }
 };

 const handleDelete = async (id) => {
 if (!window.confirm('Delete this user?')) return;
 try {
 const res = await apiFetch(`${API_BASE_URL}/api/users/${id}`, {
 method: 'DELETE',
 });
 if (!res.ok) return alert('Failed to delete user');
 setUsers(prev => prev.filter(u => u.id !== id));
 } catch (e) {
 alert(e.message);
 }
 };

 return (
 <div className="space-y-6">
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-xl font-semibold text-slate-900">Users</h2>
 <p className="text-sm text-slate-500 mt-1">{users.length} total</p>
 </div>
 <button onClick={() => setShowCreateModal(true)}
 className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
 <Plus className="w-4 h-4" /> Create User
 </button>
 </div>

  {loading ? (
  <div className="flex items-center justify-center h-48">
  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
  </div>
  ) : fetchError ? (
  <div className="bg-white rounded-xl border border-red-200 p-12 text-center">
  <Shield className="w-12 h-12 text-red-300 mx-auto mb-3" />
  <h3 className="text-lg font-semibold text-red-700">Failed to Load Users</h3>
  <p className="text-sm text-red-500 mt-1 mb-4">{fetchError}</p>
  <button onClick={fetchUsers}
  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
  <RefreshCw className="w-4 h-4" /> Retry
  </button>
  </div>
  ) : users.length === 0 ? (
  <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
  <Shield className="w-12 h-12 text-slate-300 mx-auto mb-3" />
  <h3 className="text-lg font-semibold text-slate-700">No Users</h3>
  <p className="text-sm text-slate-500 mt-1">Create your first user to get started.</p>
  </div>
  ) : (
 <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left text-slate-600">
 <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] tracking-[0.12em]">
 <tr>
 <th className="px-5 py-4">Name</th>
 <th className="px-5 py-4">Email</th>
 <th className="px-5 py-4">Role</th>
 <th className="px-5 py-4">Mobile</th>
 <th className="px-5 py-4">Created</th>
 <th className="px-5 py-4 text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {users.map(u => (
 <tr key={u.id} className=" transition-colors">
 <td className="px-5 py-4 font-medium text-slate-900">{u.firstName} {u.lastName}</td>
 <td className="px-5 py-4">{u.email}</td>
 <td className="px-5 py-4">
 <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700">{u.role}</span>
 </td>
 <td className="px-5 py-4">{u.mobileNumber || '—'}</td>
 <td className="px-5 py-4">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
 <td className="px-5 py-4 text-right">
 <button onClick={() => handleDelete(u.id)}
 className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
 <Trash2 className="w-4 h-4" />
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}

 {/* Create User Modal */}
 {showCreateModal && (
 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
 <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
 <h2 className="text-lg font-bold text-slate-900">Create User</h2>
 <button onClick={() => setShowCreateModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
 <X className="w-5 h-5" />
 </button>
 </div>
 <form onSubmit={handleCreate} className="p-6 space-y-4">
 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
 <input value={createForm.firstName} onChange={e => setCreateForm(p => ({ ...p, firstName: e.target.value }))}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
 <input value={createForm.lastName} onChange={e => setCreateForm(p => ({ ...p, lastName: e.target.value }))}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
 <input type="email" value={createForm.email} onChange={e => setCreateForm(p => ({ ...p, email: e.target.value }))}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
 <input type="password" value={createForm.password} onChange={e => setCreateForm(p => ({ ...p, password: e.target.value }))}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
 <select value={createForm.role} onChange={e => setCreateForm(p => ({ ...p, role: e.target.value }))}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
 <option value="HR">HR</option>
 <option value="Support">Support</option>
 <option value="Marketing">Marketing</option>
 <option value="Finance">Finance</option>
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
 <input value={createForm.mobileNumber} onChange={e => setCreateForm(p => ({ ...p, mobileNumber: e.target.value }))}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
 </div>
 {createError && (
 <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">{createError}</div>
 )}
 <div className="flex gap-3 pt-2">
 <button type="button" onClick={() => setShowCreateModal(false)}
 className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-colors">Cancel</button>
 <button type="submit" disabled={createLoading}
 className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
 {createLoading ? 'Creating...' : 'Create User'}
 </button>
 </div>
 </form>
 </div>
 </div>
 )}
 </div>
 );
 };

 // --- Placeholder Section ---
 const PlaceholderSection = ({ title }) => (
 <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
 <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
 <Building className="w-7 h-7" />
 </div>
 <h2 className="text-xl font-bold text-slate-800 mb-2 capitalize">SwordNex {title}</h2>
 <p className="text-slate-500">This module is coming soon.</p>
 </div>
 );


 // (EventModal is now rendered inline in the JSX return to fix the single-char input bug
 // — inner components re-mount on every parent re-render caused by state updates)

 // --- Job Modal ---
 const JobModal = () => (
 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
 <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
 <h2 className="text-lg font-bold text-slate-900">Create Job</h2>
 <button onClick={() => setIsJobModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
 <X className="w-5 h-5" />
 </button>
 </div>
 <form onSubmit={handleCreateJob} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
 <input type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Frontend Developer" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
 <input type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Remote" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., 2-4 Years" value={newJob.experience} onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })} />
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
 <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newJob.type} onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}>
 <option value="Full-time">Full-time</option>
 <option value="Part-time">Part-time</option>
 <option value="Contract">Contract</option>
 <option value="Internship">Internship</option>
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Salary</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., ₹6-12 LPA" value={newJob.salary} onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })} />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Skills (comma separated)</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="React, Node.js, MongoDB..." value={newJob.skills} onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Summary / Overview</label>
 <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" rows="3" placeholder="Brief job description..." value={newJob.summary} onChange={(e) => setNewJob({ ...newJob, summary: e.target.value })} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Responsibilities (comma separated)</label>
 <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" rows="3" placeholder="List responsibilities..." value={newJob.responsibilities} onChange={(e) => setNewJob({ ...newJob, responsibilities: e.target.value })} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Qualifications (comma separated)</label>
 <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" rows="3" placeholder="List qualifications..." value={newJob.qualifications} onChange={(e) => setNewJob({ ...newJob, qualifications: e.target.value })} />
 </div>
 <div className="flex justify-end gap-3 pt-4">
 <button type="button" onClick={() => setIsJobModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
 <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">Create Job</button>
 </div>
 </form>
 </div>
 </div>
 );

 // --- Applicants Modal ---
 const ApplicantsModal = () => (
 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4" onClick={() => setIsApplicantsModalOpen(false)}>
 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
 <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
 <h2 className="text-lg font-bold text-slate-900">Applicants for: {selectedJobTitle}</h2>
 <button onClick={() => setIsApplicantsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
 <X className="w-5 h-5" />
 </button>
 </div>
 <div className="overflow-y-auto p-6">
 {selectedJobApplicants.length === 0 ? (
 <div className="text-center py-12 text-slate-500">
 <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
 <p className="font-medium">No applicants found</p>
 <p className="text-sm mt-1">No applications match this job title yet.</p>
 </div>
 ) : (
 <table className="w-full" style={{ tableLayout: 'fixed' }}>
 <colgroup>
 <col className="w-[28%]" />
 <col className="w-[28%]" />
 <col className="w-[18%]" />
 <col className="w-[12%]" />
 <col className="w-[14%]" />
 </colgroup>
 <thead>
 <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
 <th className="px-3 py-2.5 text-left font-semibold">Name</th>
 <th className="px-3 py-2.5 text-left font-semibold">Email</th>
 <th className="px-3 py-2.5 text-left font-semibold">Phone</th>
 <th className="px-3 py-2.5 text-left font-semibold">Status</th>
 <th className="px-3 py-2.5 text-left font-semibold">Date</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {selectedJobApplicants.map((app, i) => (
 <tr key={app.id || i} className=" cursor-pointer transition-colors" onClick={() => { setIsApplicantsModalOpen(false); openDrawer(app, 'application'); }}>
 <td className="px-3 py-2.5">
 <div className="flex items-center gap-2">
 <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-xs shrink-0">
 {app.name.split(' ').map(n => n[0]).join('')}
 </div>
 <span className="text-sm font-medium text-slate-900 truncate">{app.name}</span>
 </div>
 </td>
 <td className="px-3 py-2.5 text-sm text-slate-600 truncate">{app.email}</td>
 <td className="px-3 py-2.5 text-sm text-slate-600 truncate">{app.phone}</td>
 <td className="px-3 py-2.5">
 <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${getStatusColor(app.status)}`}>{app.status}</span>
 </td>
 <td className="px-3 py-2.5 text-sm text-slate-500 truncate">{app.date}</td>
 </tr>
 ))}
 </tbody>
 </table>
 )}
 </div>
 <div className="px-6 py-4 border-t border-slate-200 flex justify-end shrink-0">
 <button
 onClick={() => setIsApplicantsModalOpen(false)}
 className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
 >
 Close
 </button>
 </div>
 </div>
 </div>
 );

 // --- Detail Drawer ---
 const DetailDrawer = () => {
 if (!selectedItem || !drawerType) return null;

 const getTitle = () => {
 switch (drawerType) {
 case 'application': return 'Application Details';
 case 'chatbot': return 'Chatbot Lead Details';
 case 'job': return 'Job Details';
 case 'contact': return 'Contact Details';
 case 'demo': return 'Demo Booking';
 case 'enquiry': return 'Enquiry Details';
 case 'course-enquiry': return 'Course Enquiry Details';
 default: return 'Details';
 }
 };

 return (
 <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-[70] flex flex-col transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
 <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
 <h2 className="font-bold text-slate-900">{getTitle()}</h2>
 <button onClick={closeDrawer} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
 <X className="w-5 h-5" />
 </button>
 </div>

 <div className="flex-1 overflow-y-auto p-5 bg-slate-50 space-y-4">
 {/* Header Card */}
 <div className="bg-white rounded-xl border border-slate-200 p-4">
 <div className="flex items-center gap-3">
 <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${drawerType === 'application' ? 'bg-blue-100 text-blue-600' :
 drawerType === 'demo' ? 'bg-purple-100 text-purple-600' :
 drawerType === 'contact' ? 'bg-teal-100 text-teal-600' :
 drawerType === 'enquiry' ? 'bg-orange-100 text-orange-600' :
 drawerType === 'course-enquiry' ? 'bg-blue-100 text-blue-600' :
 'bg-slate-100 text-slate-600'
 }`}>
 {selectedItem.name?.split(' ').map(n => n[0]).join('') || selectedItem.title?.[0] || selectedItem.firstName?.[0] || '?'}
 </div>
 <div>
 <h3 className="font-bold text-slate-900">{selectedItem.name || selectedItem.title || selectedItem.firstName}</h3>
 <p className="text-sm text-slate-500">{selectedItem.email || selectedItem.location}</p>
 </div>
 </div>
 </div>

 {/* Info Card */}
 <div className="bg-white rounded-xl border border-slate-200 p-4">
 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Information</h4>
 <div className="grid grid-cols-2 gap-4">
 {selectedItem.email && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Email</span>
 <span className="text-sm font-medium text-slate-900 break-all">{selectedItem.email}</span>
 </div>
 )}
 {selectedItem.phone && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Phone</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.phone}</span>
 </div>
 )}
 {selectedItem.role && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Role</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.role}</span>
 </div>
 )}
 {selectedItem.location && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Location</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.location}</span>
 </div>
 )}
 {selectedItem.status && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Status</span>
 <div><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedItem.status)}`}>{selectedItem.status}</span></div>
 </div>
 )}
 {selectedItem.date && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Date</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.date}</span>
 </div>
 )}

 {/* Application extra fields from rawData */}
 {drawerType === 'application' && selectedItem.rawData && (<>
 {selectedItem.rawData.currentRole && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Current Role</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.rawData.currentRole}</span>
 </div>
 )}
 {selectedItem.rawData.currentCompany && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Current Company</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.rawData.currentCompany}</span>
 </div>
 )}
 {selectedItem.rawData.linkedin && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">LinkedIn</span>
 <a href={selectedItem.rawData.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 truncate hover:underline">{selectedItem.rawData.linkedin}</a>
 </div>
 )}
 {selectedItem.rawData.portfolio && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Portfolio</span>
 <a href={selectedItem.rawData.portfolio} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 truncate hover:underline">{selectedItem.rawData.portfolio}</a>
 </div>
 )}
 {(selectedItem.rawData.experience || selectedItem.rawData.experienceInYears) && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Experience</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.rawData.experience || selectedItem.rawData.experienceInYears}</span>
 </div>
 )}
 {selectedItem.rawData.education && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Education</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.rawData.education}</span>
 </div>
 )}
 {selectedItem.rawData.expectedCTC && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Expected CTC</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.rawData.expectedCTC}</span>
 </div>
 )}
 {selectedItem.rawData.noticePeriod && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Notice Period</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.rawData.noticePeriod}</span>
 </div>
 )}
 {selectedItem.rawData.skillSet && (
 <div className="flex flex-col gap-1 col-span-2">
 <span className="text-xs text-slate-500">Skills</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.rawData.skillSet}</span>
 </div>
 )}
 {selectedItem.rawData.howDidYouKnow && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">How Did You Know</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.rawData.howDidYouKnow}</span>
 </div>
 )}
 {selectedItem.rawData.referralCode && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Referral Code</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.rawData.referralCode}</span>
 </div>
 )}
 {selectedItem.rawData.message && (
 <div className="flex flex-col gap-1 col-span-2">
 <span className="text-xs text-slate-500">Cover Letter / Message</span>
 <span className="text-sm font-medium text-slate-900 whitespace-pre-wrap">{selectedItem.rawData.message}</span>
 </div>
 )}
 {selectedItem.rawData.resumeFileName && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Resume File</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.rawData.resumeFileName}</span>
 </div>
 )}
 {selectedItem.rawData.submittedAt && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Submitted At</span>
 <span className="text-sm font-medium text-slate-900">{new Date(selectedItem.rawData.submittedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
 </div>
 )}
 {selectedItem.rawData.source && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Source</span>
 <span className="text-sm font-medium text-slate-900 capitalize">{selectedItem.rawData.source.replace(/_/g, ' ')}</span>
 </div>
 )}
 </>)}
 {selectedItem.product && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Product</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.product}</span>
 </div>
 )}
 {selectedItem.budget && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Budget</span>
 <span className="text-sm font-medium text-emerald-600">{selectedItem.budget}</span>
 </div>
 )}
 {selectedItem.service && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Service</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.service}</span>
 </div>
 )}
 {selectedItem.course && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Course Interested</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.course}</span>
 </div>
 )}
 {selectedItem.mobile && (
 <div className="flex flex-col gap-1">
 <span className="text-xs text-slate-500">Mobile Number</span>
 <span className="text-sm font-medium text-slate-900">{selectedItem.mobile}</span>
 </div>
 )}
 </div>
 </div>
 </div>

 {/* Actions */}
 <div className="p-4 border-t border-slate-200 bg-white">
 {drawerType === 'application' ? (
 <div className="grid grid-cols-2 gap-2">
 {/* Resume */}
 {selectedItem.resumeUrl &&
 selectedItem.resumeUrl !== 'https://placeholder.com/resume.pdf' &&
 !selectedItem.resumeUrl.includes('placeholder.com') ? (
 <a
 href={selectedItem.resumeUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <Download className="w-4 h-4" />
 Resume
 </a>
 ) : (
 <button disabled className="flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-400 rounded-lg text-sm font-medium cursor-not-allowed">
 <Download className="w-4 h-4" />
 No Resume
 </button>
 )}

 {/* Email */}
 {selectedItem.email ? (
 <a
 href={`mailto:${selectedItem.email}`}
 className="flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <Mail className="w-4 h-4" /> Email
 </a>
 ) : (
 <button
 className="flex items-center justify-center gap-2 py-2.5 bg-blue-300 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed"
 aria-disabled="true"
 >
 <Mail className="w-4 h-4" /> Email
 </button>
 )}

 {/* WhatsApp & Call */}
 {selectedItem.phone ? (
 <>
 <a
 href={`https://wa.me/${selectedItem.phone.replace(/\D/g, '')}`}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <MessageCircle className="w-4 h-4" /> WhatsApp
 </a>
 <a
 href={`tel:${selectedItem.phone}`}
 className="flex items-center justify-center gap-2 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <Phone className="w-4 h-4" /> Call
 </a>
 </>
 ) : (
 <>
 <button
 className="flex items-center justify-center gap-2 py-2.5 bg-green-300 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed"
 aria-disabled="true"
 >
 <MessageCircle className="w-4 h-4" /> WhatsApp
 </button>
 <button
 className="flex items-center justify-center gap-2 py-2.5 bg-purple-300 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed"
 aria-disabled="true"
 >
 <Phone className="w-4 h-4" /> Call
 </button>
 </>
 )}

 {/* Delete */}
 <button
 onClick={() => handleDelete(selectedItem.id, 'application')}
 className="col-span-2 flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <Trash2 className="w-4 h-4" /> Delete
 </button>
 </div>
 ) : ['demo', 'contact', 'enquiry'].includes(drawerType) ? (
 <div className="grid grid-cols-2 gap-2">
 {/* WhatsApp */}
 {selectedItem.phone ? (
 <a
 href={`https://wa.me/${selectedItem.phone.replace(/\D/g, '')}`}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <MessageCircle className="w-4 h-4" /> WhatsApp
 </a>
 ) : (
 <button
 className="flex items-center justify-center gap-2 py-2.5 bg-green-300 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed"
 aria-disabled="true"
 >
 <MessageCircle className="w-4 h-4" /> WhatsApp
 </button>
 )}
 {/* Email */}
 {selectedItem.email ? (
 <a
 href={`mailto:${selectedItem.email}`}
 className="flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <Mail className="w-4 h-4" /> Email
 </a>
 ) : (
 <button
 className="flex items-center justify-center gap-2 py-2.5 bg-blue-300 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed"
 aria-disabled="true"
 >
 <Mail className="w-4 h-4" /> Email
 </button>
 )}
 {/* Call */}
 {selectedItem.phone ? (
 <a
 href={`tel:${selectedItem.phone}`}
 className="flex items-center justify-center gap-2 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <Phone className="w-4 h-4" /> Call
 </a>
 ) : (
 <button
 className="flex items-center justify-center gap-2 py-2.5 bg-purple-300 text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed"
 aria-disabled="true"
 >
 <Phone className="w-4 h-4" /> Call
 </button>
 )}
 {/* Delete */}
 <button
 onClick={() => handleDelete(selectedItem.id, drawerType)}
 className="flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <Trash2 className="w-4 h-4" /> Delete
 </button>
 </div>
 ) : (
 <div className="grid grid-cols-2 gap-2">
 {selectedItem.phone && (
 <>
 <a href={`https://wa.me/${selectedItem.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
 <MessageCircle className="w-4 h-4" /> WhatsApp
 </a>
 <a href={`tel:${selectedItem.phone}`} className="flex items-center justify-center gap-2 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
 <Phone className="w-4 h-4" /> Call
 </a>
 </>
 )}
 {selectedItem.email && (
 <a href={`mailto:${selectedItem.email}`} className={`flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors ${!selectedItem.phone ? 'col-span-2' : ''}`}>
 <Mail className="w-4 h-4" /> Email
 </a>
 )}
 <button onClick={() => handleDelete(selectedItem.id, drawerType)} className="col-span-2 flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
 <Trash2 className="w-4 h-4" /> Delete
 </button>
 </div>
 )}
 </div>
 </div>
 );
 };

 return (
 <>
 <style>{`
 :root { --primary: #2563eb; }
 body { font-family: 'Inter', system-ui, sans-serif; background-color: #f8fafc; }
 .custom-scrollbar::-webkit-scrollbar { width: 4px; }
 .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
 `}</style>

 <div className="min-h-screen flex">
 {/* Sidebar */}
 <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:sticky md:top-0 h-screen`}>
 <div className="p-5 border-b border-slate-100 flex items-center justify-between">
 <div className="flex items-center gap-2">
 <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
 <Star className="w-4 h-4 text-white" />
 </div>
 <span className="text-lg font-bold text-slate-900">SwordNex</span>
 </div>
 <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg">
 <X className="w-5 h-5" />
 </button>
 </div>

 <nav className="flex-1 p-3 overflow-y-auto custom-scrollbar">
 <div className="space-y-1">
 {navItems.map(item => (
 <React.Fragment key={item.id}>
 <button
 onClick={() => {
 if (item.subItems) {
 // Toggle if already active or open sub-menu
 setActiveTab(activeTab.startsWith(item.id) && activeTab !== item.id ? item.id : item.id);
 } else {
 setActiveTab(item.id);
 setIsMobileMenuOpen(false);
 }
 }}
 className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id || (item.subItems && activeTab.startsWith(item.id)) ? 'bg-blue-50 text-blue-600' : 'text-slate-600 '}`}
 >
 <div className="flex items-center gap-3">
 <item.icon className="w-4 h-4" />
 <span>{item.label}</span>
 </div>
 <div className="flex items-center gap-2">
 {item.count !== undefined && (
 <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${activeTab === item.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>{item.count}</span>
 )}
 {item.subItems && (
 <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab.startsWith(item.id) ? 'rotate-90' : ''}`} />
 )}
 </div>
 </button>
 {item.subItems && activeTab.startsWith(item.id) && (
 <div className="mt-1 ml-4 pl-4 border-l border-slate-100 space-y-1">
 {item.subItems.map(sub => (
 <button
 key={sub.id}
 onClick={() => { setActiveTab(sub.id); setIsMobileMenuOpen(false); }}
 className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeTab === sub.id ? 'bg-blue-50 text-blue-600' : 'text-slate-500 '}`}
 >
 <span>{sub.label}</span>
 {sub.count !== undefined && (
 <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[9px]">{sub.count}</span>
 )}
 </button>
 ))}
 </div>
 )}
 </React.Fragment>
 ))}
 </div>

 {/* <div className="mt-6 pt-4 border-t border-slate-100">
 <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Products</p>
 {productItems.map(item => (
 <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 '}`}>
 <item.icon className="w-4 h-4" />
 <span>{item.label}</span>
 </button>
 ))}
 </div> */}

 {/* <div className="mt-4 pt-4 border-t border-slate-100">
 <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Events</p>
 <button
 onClick={() => { setActiveTab('events'); setIsMobileMenuOpen(false); }}
 className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'events' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 '}`}
 >
 <div className="flex items-center gap-3">
 <Award className="w-4 h-4" />
 <span>Events</span>
 </div>
 {events.length > 0 && (
 <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${activeTab === 'events' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
 {events.length}
 </span>
 )}
 </button>
 <button
 onClick={() => { setIsEventModalOpen(true); setIsMobileMenuOpen(false); }}
 className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <Plus className="w-4 h-4" /> Create Event
 </button>
 </div> */}

 {/* <div className="mt-4 pt-4 border-t border-slate-100">
 <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Workshops</p>
 <button
 onClick={() => { setActiveTab('workshops'); setIsMobileMenuOpen(false); }}
 className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'workshops' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 '}`}
 >
 <div className="flex items-center gap-3">
 <BookOpen className="w-4 h-4" />
 <span>Workshops</span>
 </div>
 {workshops.length > 0 && (
 <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${activeTab === 'workshops' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
 {workshops.length}
 </span>
 )}
 </button>
 <button
 onClick={() => { setIsWorkshopModalOpen(true); setIsMobileMenuOpen(false); }}
 className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors"
 >
 <Plus className="w-4 h-4" /> Add Workshop
 </button>
 </div>

 <button onClick={() => { setIsJobModalOpen(true); setIsMobileMenuOpen(false); }} className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
 <Plus className="w-4 h-4" /> Create Job
 </button> */}
 </nav>

 <div className="p-4 border-t border-slate-100">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">A</div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-semibold text-slate-900 truncate">Admin User</p>
 <p className="text-xs text-slate-500">admin@swordnex.com</p>
 </div>
 </div>
 </div>
 </aside>

 {/* Main */}
 <main className="flex-1 flex flex-col min-h-screen">
 <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 md:px-6 py-3 flex items-center justify-between gap-4">
 <div className="flex items-center gap-4 flex-1">
 <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
 <Menu className="w-5 h-5" />
 </button>
 <div className="relative flex-1 max-w-md hidden sm:block">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
 <input className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
 </div>
 </div>
 <div className="flex items-center gap-2">
 <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg relative">
 <Bell className="w-5 h-5" />
 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
 </button>

 <div className="h-8 w-px bg-slate-200 mx-1"></div>

 <div className="flex items-center gap-2">
 <button className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors">
 <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">A</div>
 <span className="hidden lg:inline">Profile</span>
 </button>
 <button
 onClick={() => {
 localStorage.removeItem('swordnex_auth');
 window.location.href = '/signin';
 }}
 className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
 >
 <LogOut className="w-4 h-4" />
 <span className="hidden lg:inline">Sign Out</span>
 </button>
 </div>
 </div>
 </header>

 <div className="flex-1 p-4 md:p-6 overflow-auto">
 <div className="mb-6">
 <h1 className="text-2xl font-bold text-slate-900 capitalize">{activeTab === 'overview' ? 'Dashboard' : activeTab}</h1>
 <p className="text-sm text-slate-500 mt-1">Welcome back! Here's what's happening.</p>
 </div>
 {renderContent()}
 </div>
 </main>

 {/* Modals & Drawers */}
 {isJobModalOpen && <JobModal />}
 {isApplicantsModalOpen && <ApplicantsModal />}

 {/* Event Modal — rendered inline (NOT as inner component) to prevent input focus loss */}
 {isEventModalOpen && (
 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
 <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
 <h2 className="text-lg font-bold text-slate-900">{editingEvent ? 'Edit Event' : 'Create Event'}</h2>
 <button onClick={() => { setIsEventModalOpen(false); setEditingEvent(null); }} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
 <X className="w-5 h-5" />
 </button>
 </div>
 <form onSubmit={handleCreateEvent} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Event Title *</label>
 <input type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Annual Tech Summit" value={newEvent.title} onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Short tagline or subtitle" value={newEvent.subtitle} onChange={e => setNewEvent(prev => ({ ...prev, subtitle: e.target.value }))} />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., March 15, 2026" value={newEvent.date} onChange={e => setNewEvent(prev => ({ ...prev, date: e.target.value }))} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., 10:00 AM" value={newEvent.time} onChange={e => setNewEvent(prev => ({ ...prev, time: e.target.value }))} />
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Venue</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Chennai Convention Center" value={newEvent.venue} onChange={e => setNewEvent(prev => ({ ...prev, venue: e.target.value }))} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Workshop, Conference" value={newEvent.category} onChange={e => setNewEvent(prev => ({ ...prev, category: e.target.value }))} />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Badge Label</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., LIVE, NEW, FREE" value={newEvent.badge} onChange={e => setNewEvent(prev => ({ ...prev, badge: e.target.value }))} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
 <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" rows="3" placeholder="Describe the event..." value={newEvent.description} onChange={e => setNewEvent(prev => ({ ...prev, description: e.target.value }))} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Highlight Points (one per line)</label>
 <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" rows="3" placeholder={`Networking Opportunities\nExpert Talks\nHands-on Workshops`} value={newEvent.highlightPoints} onChange={e => setNewEvent(prev => ({ ...prev, highlightPoints: e.target.value }))} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Location / Address Details</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Full address for map" value={newEvent.locationDetails} onChange={e => setNewEvent(prev => ({ ...prev, locationDetails: e.target.value }))} />
 </div>
 <div className="flex justify-end gap-3 pt-4">
 <button type="button" onClick={() => { setIsEventModalOpen(false); setEditingEvent(null); }} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
 <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">{editingEvent ? 'Update Event' : 'Create Event'}</button>
 </div>
 </form>
 </div>
 </div>
 )}

 {/* Blog Modal — rendered inline (NOT as inner component) to prevent input focus loss */}
 {isBlogModalOpen && (
 <div className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
 <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
 <div>
 <h2 className="text-xl font-bold text-slate-900">{editingBlog ? 'Edit Blog Post' : 'Create Blog Post'}</h2>
 <p className="text-sm text-slate-500">Published posts appear automatically on the frontend blog page.</p>
 </div>
 <button onClick={() => setIsBlogModalOpen(false)} className="text-slate-400 hover:text-slate-600 rounded-full p-2">
 <X className="w-5 h-5" />
 </button>
 </div>
 <form onSubmit={handleSaveBlog} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
 <div className="grid gap-4 md:grid-cols-2">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
 <input value={newBlog.title} onChange={(e) => setNewBlog(prev => ({ ...prev, title: e.target.value }))} type="text" required className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Post title" />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
 <input value={newBlog.category} onChange={(e) => setNewBlog(prev => ({ ...prev, category: e.target.value }))} type="text" required className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Payroll, HRM, React..." />
 </div>
 </div>

 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt *</label>
 <textarea value={newBlog.excerpt} onChange={(e) => setNewBlog(prev => ({ ...prev, excerpt: e.target.value }))} required rows={3} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Short summary for listing pages" />
 </div>

 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Full Content</label>
 <textarea value={newBlog.fullContent} onChange={(e) => setNewBlog(prev => ({ ...prev, fullContent: e.target.value }))} rows={5} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Detailed post content or overview" />
 </div>

 <div className="grid gap-4 md:grid-cols-3">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Read Time</label>
 <input value={newBlog.readTime} onChange={(e) => setNewBlog(prev => ({ ...prev, readTime: e.target.value }))} type="text" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., 7 min" />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
 <input value={newBlog.image} onChange={(e) => setNewBlog(prev => ({ ...prev, image: e.target.value }))} type="url" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Optional image URL" />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
 <input value={newBlog.slug} onChange={(e) => setNewBlog(prev => ({ ...prev, slug: e.target.value }))} type="text" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Optional URL slug" />
 </div>
 </div>

 <div className="flex items-center gap-3">
 <label className="inline-flex items-center gap-2 text-sm text-slate-700">
 <input type="checkbox" checked={newBlog.published} onChange={(e) => setNewBlog(prev => ({ ...prev, published: e.target.checked }))} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
 Publish immediately
 </label>
 </div>

 <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-slate-200">
 <button type="button" onClick={() => setIsBlogModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
 Cancel
 </button>
 <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
 {editingBlog ? 'Save Changes' : 'Publish Post'}
 </button>
 </div>
 </form>
 </div>
 </div>
 )}

 {/* Workshop Modal */}
 {isWorkshopModalOpen && (
 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
 <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
 <h2 className="text-lg font-bold text-slate-900">{editingWorkshop ? 'Edit Workshop' : 'Add Workshop'}</h2>
 <button onClick={() => setIsWorkshopModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
 <X className="w-5 h-5" />
 </button>
 </div>
 <form onSubmit={handleCreateWorkshop} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Workshop Title *</label>
 <input type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Python Bootcamp" value={newWorkshop.title} onChange={e => setNewWorkshop(prev => ({ ...prev, title: e.target.value }))} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Short tagline or subtitle" value={newWorkshop.subtitle} onChange={e => setNewWorkshop(prev => ({ ...prev, subtitle: e.target.value }))} />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
 <input type="date" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newWorkshop.date} onChange={e => setNewWorkshop(prev => ({ ...prev, date: e.target.value }))} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Time *</label>
 <input type="time" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newWorkshop.time} onChange={e => setNewWorkshop(prev => ({ ...prev, time: e.target.value }))} />
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Venue</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Main Auditorium" value={newWorkshop.venue} onChange={e => setNewWorkshop(prev => ({ ...prev, venue: e.target.value }))} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Coding, Design" value={newWorkshop.category} onChange={e => setNewWorkshop(prev => ({ ...prev, category: e.target.value }))} />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Badge Label</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., LIVE, NEW, FREE" value={newWorkshop.badge} onChange={e => setNewWorkshop(prev => ({ ...prev, badge: e.target.value }))} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
 <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" rows="3" placeholder="Describe the workshop..." value={newWorkshop.description} onChange={e => setNewWorkshop(prev => ({ ...prev, description: e.target.value }))} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Highlight Points (one per line)</label>
 <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" rows="3" placeholder={`Hands-on Projects\nExpert Review\nLive Q&A`} value={newWorkshop.highlightPoints} onChange={e => setNewWorkshop(prev => ({ ...prev, highlightPoints: e.target.value }))} />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Location / Address Details</label>
 <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Full address for map" value={newWorkshop.locationDetails} onChange={e => setNewWorkshop(prev => ({ ...prev, locationDetails: e.target.value }))} />
 </div>
 <div className="flex justify-end gap-3 pt-4">
 <button type="button" onClick={() => setIsWorkshopModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">Cancel</button>
 <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">{editingWorkshop ? 'Update Workshop' : 'Create Workshop'}</button>
 </div>
 </form>
 </div>
 </div>
 )}

 {isDrawerOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" onClick={closeDrawer} />}
 <DetailDrawer />

 {/* Delete Confirmation Popup */}
 {deleteConfirm.show && (
 <div style={{
 position: 'fixed',
 top: 0,
 left: 0,
 right: 0,
 bottom: 0,
 background: 'rgba(0, 0, 0, 0.6)',
 backdropFilter: 'blur(5px)',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 zIndex: 2000,
 animation: 'fadeIn 0.3s ease'
 }}>
 <div style={{
 background: '#fff',
 borderRadius: '24px',
 padding: '32px',
 maxWidth: '400px',
 width: '90%',
 textAlign: 'center',
 boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
 transform: 'scale(1)',
 animation: 'popupScale 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
 }}>
 <div style={{
 width: '80px',
 height: '80px',
 background: '#FEE2E2',
 borderRadius: '50%',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 margin: '0 auto 20px auto',
 animation: 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s both'
 }}>
 <Trash2 className="w-10 h-10 text-red-500" />
 </div>

 <h3 style={{ fontSize: '1.5rem', color: '#1F2937', marginBottom: '10px', fontWeight: '800' }}>Delete Record?</h3>
 <p style={{ color: '#6B7280', marginBottom: '25px', lineHeight: '1.6', fontSize: '1.05rem' }}>
 Are you sure you want to delete this record? <br />
 <span style={{ color: '#EF4444', fontWeight: 'bold' }}>This action cannot be undone.</span>
 </p>

 <div style={{ display: 'flex', gap: '15px' }}>
 <button
 onClick={() => setDeleteConfirm({ show: false, id: null, type: null })}
 style={{
 flex: 1,
 padding: '14px',
 borderRadius: '14px',
 border: '2px solid #E5E7EB',
 background: '#fff',
 color: '#374151',
 fontWeight: '700',
 cursor: 'pointer',
 fontSize: '1rem',
 transition: 'all 0.2s ease',
 }}
 onMouseOver={(e) => e.target.style.background = '#F3F4F6'}
 onMouseOut={(e) => e.target.style.background = '#fff'}
 >
 Cancel
 </button>
 <button
 onClick={confirmDelete}
 style={{
 flex: 1,
 padding: '14px',
 borderRadius: '14px',
 border: 'none',
 background: 'linear-gradient(135deg, #EF4444, #DC2626)',
 color: '#fff',
 fontWeight: '700',
 cursor: 'pointer',
 fontSize: '1rem',
 boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
 transition: 'transform 0.2s ease, box-shadow 0.2s ease',
 }}
 onMouseOver={(e) => {
 e.target.style.transform = 'translateY(-2px)';
 e.target.style.boxShadow = '0 6px 15px rgba(239, 68, 68, 0.5)';
 }}
 onMouseOut={(e) => {
 e.target.style.transform = 'translateY(0)';
 e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
 }}
 >
 Yes, Delete
 </button>
 </div>
 </div>
 </div>
 )}

 {/* Partner Upload Modal */}
 {isPartnerModalOpen && (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" style={{ animation: 'fadeIn 0.3s ease' }}>
 <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl" style={{ animation: 'popupScale 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
 <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
 <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Building className="w-5 h-5 text-blue-600" /> Add Partners</h2>
 <button disabled={isUploadingPartners} onClick={() => setIsPartnerModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
 <X className="w-5 h-5" />
 </button>
 </div>
 <div className="p-6">
 <div className="mb-4">
 <label className="block text-sm font-medium text-slate-700 mb-1">Select Images (One or multiple)</label>
 <input
 type="file"
 multiple
 accept="image/*"
 onChange={(e) => setPartnerFiles([...e.target.files])}
 className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-slate-200 rounded-xl"
 disabled={isUploadingPartners}
 />
 </div>

 {partnerFiles.length > 0 && (
 <div className="mt-4 mb-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
 <p className="text-sm font-semibold text-slate-700 mb-2">{partnerFiles.length} file(s) selected:</p>
 <ul className="text-xs text-slate-500 max-h-32 overflow-y-auto space-y-2">
 {partnerFiles.map((file, i) => (
 <li key={i} className="truncate flex items-center gap-2">
 <Star className="w-3 h-3 text-slate-400" />
 {file.name}
 </li>
 ))}
 </ul>
 </div>
 )}

 <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-slate-100">
 <button
 type="button"
 onClick={() => setIsPartnerModalOpen(false)}
 disabled={isUploadingPartners}
 className="px-5 py-2.5 text-sm font-semibold text-slate-600 rounded-xl transition-colors border border-slate-200"
 >
 Cancel
 </button>
 <button
 onClick={async () => {
 if (partnerFiles.length === 0) return;
 setIsUploadingPartners(true);
 try {
 // Convert files to base64 mapped objects
 const base64Images = await Promise.all(
 partnerFiles.map(file => {
 return new Promise((resolve, reject) => {
 const reader = new FileReader();
 reader.readAsDataURL(file);
 reader.onload = () => resolve({
 name: file.name,
 type: file.type,
 base64: reader.result
 });
 reader.onerror = error => reject(error);
 });
 })
 );

 const response = await apiFetch(`${API_BASE_URL}/api/partners/upload`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ images: base64Images })
 });

 const result = await response.json();
 if (!response.ok) throw new Error(result.error || "Upload failed");

 setPartners(prev => [...result.data, ...prev]);
 setIsPartnerModalOpen(false);
 setPartnerFiles([]);
 } catch (err) {
 console.error("Error uploading partners:", err);
 alert("Upload failed. Please try again.");
 } finally {
 setIsUploadingPartners(false);
 }
 }}
 disabled={isUploadingPartners || partnerFiles.length === 0}
 className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shadow-md shadow-blue-500/20"
 >
 {isUploadingPartners ? 'Uploading...' : 'Upload Partners'}
 </button>
 </div>
 </div>
 </div>
 </div>
 )}

 {/* Global Styles for Keyframes */}
 <style>{`
 @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
 @keyframes popupScale { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }
 @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { opacity: 1; transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); } }
 `}</style>
 </div>
 </>
 );
};

export default SwordNexDashboard;
// >
// Cancel
// </button >
// <button
// onClick={async () => {
// if (partnerFiles.length === 0) return;
// setIsUploadingPartners(true);
// try {
// // Convert files to base64 mapped objects
// const base64Images = await Promise.all(
// partnerFiles.map(file => {
// return new Promise((resolve, reject) => {
// const reader = new FileReader();
// reader.readAsDataURL(file);
// reader.onload = () => resolve({
// name: file.name,
// type: file.type,
// base64: reader.result
// });
// reader.onerror = error => reject(error);
// });
// })
// );

// const response = await apiFetch(`${API_BASE_URL}/api/partners/upload`, {
// method: 'POST',
// headers: { 'Content-Type': 'application/json' },
// body: JSON.stringify({ images: base64Images })
// });

// const result = await response.json();
// if (!response.ok) throw new Error(result.error || "Upload failed");

// setPartners(prev => [...result.data, ...prev]);
// setIsPartnerModalOpen(false);
// setPartnerFiles([]);
// } catch (err) {
// console.error("Error uploading partners:", err);
// alert("Upload failed. Please try again.");
// } finally {
// setIsUploadingPartners(false);
// }
// }}
// disabled={isUploadingPartners || partnerFiles.length === 0}
// className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shadow-md shadow-blue-500/20"
// >
// {isUploadingPartners ? 'Uploading...' : 'Upload Partners'}
// </button>
// </div >
// </div >
// </div >
// </div >
// )}

// {/* Global Styles for Keyframes */ }
// <style>{`
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes popupScale { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }
// @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { opacity: 1; transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); } }
// `}</style>
// </div >
// </>
// );
// };

// export default SwordNexDashboard;
