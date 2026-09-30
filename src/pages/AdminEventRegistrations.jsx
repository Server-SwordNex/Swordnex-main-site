import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
 Search, Eye, X, FileText, Download, Image as ImageIcon,
 CheckSquare, Square, FileSpreadsheet, Loader, AlertCircle,
 RefreshCw, Users, Calendar, Briefcase, FolderDown
} from "lucide-react";
import API_BASE_URL from "../config/apiConfig";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const AdminEventRegistrations = ({ isEmbedded = false }) => {
 const { type } = useParams();
 const navigate = useNavigate();
 const [internalTab, setInternalTab] = useState(type === "workshop" ? "workshop" : "events");
 const activeTab = isEmbedded ? internalTab : (type === "workshop" ? "workshop" : "events");

 const [events, setEvents] = useState([]);
 const [workshops, setWorkshops] = useState([]);
 const [jobfairData, setJobfairData] = useState([]);
 const [selectedEventId, setSelectedEventId] = useState("all");
 const [candidates, setCandidates] = useState([]);
 const [loading, setLoading] = useState(false);
 const [searchTerm, setSearchTerm] = useState("");
 const [searchType, setSearchType] = useState("all");
 const [selected, setSelected] = useState(null);
 const [selectedRows, setSelectedRows] = useState([]);
 const [isExporting, setIsExporting] = useState(false);
 const [exportProgress, setExportProgress] = useState({ current: 0, total: 0, status: "", errors: [] });
 const abortRef = useRef(false);

 // ── Navigation ──────────────────────────────────────────────────────────
 const handleTabChange = (newTab) => {
 setSelectedEventId("all");
 setSelectedRows([]);
 if (isEmbedded) {
 setInternalTab(newTab);
 } else {
 navigate(`/admin-event-registrations/${newTab}`);
 }
 };

 // ── Metadata Fetching ───────────────────────────────────────────────────
 useEffect(() => {
 // Events
 fetch(`${API_BASE_URL}/api/events`)
 .then(r => r.json())
 .then(data => setEvents(Array.isArray(data) ? data : []))
 .catch(err => console.error("Error fetching events:", err));

 // Workshops
 fetch(`${API_BASE_URL}/api/workshops`)
 .then(r => r.json())
 .then(data => setWorkshops(Array.isArray(data) ? data : (data.data || [])))
 .catch(err => console.error("Error fetching workshops:", err));

 // Job Fair
 fetch(`${API_BASE_URL}/api/jobfair`)
 .then(r => r.json())
 .then(data => setJobfairData(Array.isArray(data) ? data : []))
 .catch(err => console.error("Error fetching jobfair:", err));
 }, []);

 // ── Normalization ────────────────────────────────────────────────────────
 const formatCandidates = useCallback((data) => {
 return (Array.isArray(data) ? data : []).map(c => ({
 id: c.id || c._id,
 code: c.interviewCode || c.code || "REF-000",
 name: c.name || c.fullName || "Unknown",
 email: c.email || "—",
 phone: c.whatsappNo || c.whatsappno || c.phone || c.phoneNo || c.phonenumber || "—",
 eventTitle: c._eventTitle || c.eventTitle || c.workshopTitle || "General",
 ugCollege: c.collegeName || c.collegename || c.ugCollege || c.ugcollegename || "—",
 ugCourse: c.ugCourse || c.ugcourse || "—",
 ugCgpa: c.ugCgpa || c.ugcgpa || "—",
 hasPG: !!(c.hasPG || c.pgCollege || c.pgcollegename),
 status: c.status || "pending",
 createdAt: c.createdAt || c.timestamp || null,
 // Docs
 resume: c.resume || null,
 profileImage: c.profileImage || c.profilePhoto || c.profilephoto || null,
 aadhaarFile: c.aadhaarFile || c.aadhaarcard || null,
 marksheet: c.marksheet || c.lastSemesterMarksheet || c.lastsemestermarksheet || null,
 // Details
 fatherName: c.fatherName || c.fathername || "—",
 dob: c.dob || c.dateofbirth || "—",
 gender: c.gender || "—",
 skills: c.skills || c.technicalskills || "",
 address: c.address || "—",
 twelfthYear: c.twelfthYear || c.yearofpassing || "—",
 twelfthPercentage: c.twelfthPercentage || c.percentage || "—",
 twelfthSchool: c.twelfthSchool || c.schoolname || "—",
 twelfthBoard: c.twelfthBoard || c.board || "—",
 ugUniversity: c.ugUniversity || c.uguniversityname || "—",
 ugYear: c.ugYear || c.ugpassedoutyear || "—",
 }));
 }, []);

 // ── Data Fetching Logic ───────────────────────────────────────────────
 const fetchAllEvents = useCallback(async () => {
 setLoading(true);
 try {
 const evRes = await fetch(`${API_BASE_URL}/api/events`);
 const eventsData = await evRes.json();
 const allRegs = [];
 for (const ev of (Array.isArray(eventsData) ? eventsData : [])) {
 try {
 const res = await fetch(`${API_BASE_URL}/api/events/${ev.id}/registrations`);
 if (res.ok) {
 const regs = await res.json();
 allRegs.push(...(Array.isArray(regs) ? regs : []).map(r => ({ ...r, _eventTitle: ev.title })));
 }
 } catch (_) { }
 }
 setCandidates(formatCandidates(allRegs));
 } catch (e) {
 console.error(e);
 } finally {
 setLoading(false);
 }
 }, [formatCandidates]);

 const fetchAllWorkshops = useCallback(async () => {
 setLoading(true);
 try {
 const wsRes = await fetch(`${API_BASE_URL}/api/workshops`);
 const raw = await wsRes.json();
 const wsList = Array.isArray(raw) ? raw : (raw.data || []);
 const allRegs = [];

 // Helper to fetch from a specific parent
 const fetchFromParent = async (parentId, title) => {
 try {
 const res = await fetch(`${API_BASE_URL}/api/workshops/${parentId}/registrations`);
 if (res.ok) {
 const regs = await res.json();
 return (Array.isArray(regs) ? regs : []).map(r => ({ ...r, _eventTitle: title }));
 }
 } catch (_) { }
 return [];
 };

 // 1. Subcollections
 for (const ws of wsList) {
 // Try fetching by ID
 const regsById = await fetchFromParent(ws.id, ws.title);
 allRegs.push(...regsById);

 // IMPORTANT: Try fetching by SLUG as well to recover "orphaned" 
 // registrations that were saved using the slug as the parent ID
 if (ws.slug && ws.slug !== ws.id) {
 const regsBySlug = await fetchFromParent(ws.slug, ws.title);
 // Avoid duplicates if ID and Slug happened to return the same docs (unlikely with Firestore IDs)
 const existingIds = new Set(regsById.map(r => r.id));
 allRegs.push(...regsBySlug.filter(r => !existingIds.has(r.id)));
 }
 }

 // 2. Legacy Flat Collection fallback
 try {
 const legacyRes = await fetch(`${API_BASE_URL}/api/workshop-registrations`);
 if (legacyRes.ok) {
 const legacyRegs = await legacyRes.json();
 allRegs.push(...(Array.isArray(legacyRegs) ? legacyRegs : []));
 }
 } catch (_) { }

 setCandidates(formatCandidates(allRegs));
 } catch (e) {
 console.error(e);
 } finally {
 setLoading(false);
 }
 }, [formatCandidates]);

 const fetchByItem = useCallback(async (itemId, itemType) => {
 setLoading(true);
 try {
 // Find the item to get its slug
 let slug = null;
 let title = "General";
 if (itemType === "workshop") {
 const found = workshops.find(w => w.id === itemId);
 if (found) {
 title = found.title;
 slug = found.slug;
 }
 } else {
 const found = events.find(e => e.id === itemId);
 if (found) title = found.title;
 }

 // Fetch from ID
 const resId = await fetch(`${API_BASE_URL}/api/${itemType === "workshop" ? "workshops" : "events"}/${itemId}/registrations`);
 const regsId = resId.ok ? await resId.json() : [];
 const allRegs = (Array.isArray(regsId) ? regsId : []).map(r => ({ ...r, _eventTitle: title }));

 // For workshops, also fetch from slug as fallback/orphan recovery
 if (itemType === "workshop" && slug && slug !== itemId) {
 const resSlug = await fetch(`${API_BASE_URL}/api/workshops/${slug}/registrations`);
 if (resSlug.ok) {
 const regsSlug = await resSlug.json();
 const formattedSlugRegs = (Array.isArray(regsSlug) ? regsSlug : []).map(r => ({ ...r, _eventTitle: title }));

 const existingIds = new Set(allRegs.map(r => r.id));
 allRegs.push(...formattedSlugRegs.filter(r => !existingIds.has(r.id)));
 }
 }

 setCandidates(formatCandidates(allRegs));
 } catch (e) {
 console.error(e);
 } finally {
 setLoading(false);
 }
 }, [events, workshops, formatCandidates]);

 const fetchAllJobfair = useCallback(async () => {
 setLoading(true);
 try {
 const jfRes = await fetch(`${API_BASE_URL}/api/jobfair`);
 const jfData = await jfRes.json();
 const formattedRegs = (Array.isArray(jfData) ? jfData : []).map(r => ({ 
 ...r, 
 _eventTitle: "Maruthupandiyar" 
 }));
 setCandidates(formatCandidates(formattedRegs));
 } catch (e) {
 console.error(e);
 } finally {
 setLoading(false);
 }
 }, [formatCandidates]);

 const fetchAllEventsAndJobfair = useCallback(async () => {
 setLoading(true);
 try {
 // Fetch all events registrations
 const evRes = await fetch(`${API_BASE_URL}/api/events`);
 const eventsData = await evRes.json();
 const allRegs = [];
 
 for (const ev of (Array.isArray(eventsData) ? eventsData : [])) {
 try {
 const res = await fetch(`${API_BASE_URL}/api/events/${ev.id}/registrations`);
 if (res.ok) {
 const regs = await res.json();
 allRegs.push(...(Array.isArray(regs) ? regs : []).map(r => ({ ...r, _eventTitle: ev.title })));
 }
 } catch (_) { }
 }

 // Fetch all job fair data
 try {
 const jfRes = await fetch(`${API_BASE_URL}/api/jobfair`);
 const jfData = await jfRes.json();
 allRegs.push(...(Array.isArray(jfData) ? jfData : []).map(r => ({ ...r, _eventTitle: "Maruthupandiyar" })));
 } catch (_) { }

 setCandidates(formatCandidates(allRegs));
 } catch (e) {
 console.error(e);
 } finally {
 setLoading(false);
 }
 }, [formatCandidates]);

 useEffect(() => {
 if (activeTab === "workshop") {
 if (selectedEventId === "all") fetchAllWorkshops();
 else fetchByItem(selectedEventId, "workshop");
 } else {
 if (selectedEventId === "all") fetchAllEventsAndJobfair();
 else if (selectedEventId === "maruthupandiyar") fetchAllJobfair();
 else fetchByItem(selectedEventId, "event");
 }
 }, [activeTab, selectedEventId, fetchAllEvents, fetchAllWorkshops, fetchAllEventsAndJobfair, fetchAllJobfair, fetchByItem]);

 // ── Search & Filter ─────────────────────────────────────────────────────
 const filtered = candidates.filter(c => {
 const term = searchTerm.toLowerCase();
 if (!term) return true;
 if (searchType === "code") return c.code?.toLowerCase().includes(term);
 if (searchType === "college") return c.ugCollege?.toLowerCase().includes(term);
 if (searchType === "event") return c.eventTitle?.toLowerCase().includes(term);
 return (
 c.code?.toLowerCase().includes(term) ||
 c.name?.toLowerCase().includes(term) ||
 c.ugCollege?.toLowerCase().includes(term) ||
 c.eventTitle?.toLowerCase().includes(term)
 );
 });

 // ── Table Helpers ───────────────────────────────────────────────────────
 const isAllSelected = filtered.length > 0 && selectedRows.length === filtered.length;
 const toggleAll = () => setSelectedRows(isAllSelected ? [] : filtered.map(c => c.id));
 const toggleRow = (id) => setSelectedRows(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

 const exportExcel = () => {
 const toExport = selectedRows.length > 0 ? candidates.filter(c => selectedRows.includes(c.id)) : filtered;
 if (!toExport.length) return alert("No registrations to export.");

 const rows = toExport.map((c, i) => ({
 "S.No": i + 1,
 "Type": activeTab,
 "Reference": c.eventTitle,
 "Code": c.code,
 "Name": c.name,
 "Email": c.email,
 "Phone/WhatsApp": c.phone,
 "College": c.ugCollege,
 "Status": c.status,
 "Registered On": c.createdAt ? new Date(c.createdAt).toLocaleString() : "—",
 }));

 const ws = XLSX.utils.json_to_sheet(rows);
 const wb = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, "Registrations");
 XLSX.writeFile(wb, `${activeTab}_Registrations_${new Date().toISOString().slice(0, 10)}.xlsx`);
 };

 // ── ZIP Export Utilities ─────────────────────────────────────────────────
 const getFullFileUrl = (filePath) => {
 if (!filePath) return null;
 if (filePath.startsWith('data:')) return filePath;
 if (filePath.startsWith('http://') || filePath.startsWith('https://')) return filePath;
 let cleanPath = filePath;
 while (cleanPath.startsWith('/')) { cleanPath = cleanPath.substring(1); }
 return `${API_BASE_URL}/${cleanPath}`;
 };

 const base64ToArrayBuffer = (base64) => {
 try {
 let base64Data = base64;
 if (base64.includes(',')) { base64Data = base64.split(',')[1]; }
 const binaryString = atob(base64Data);
 const bytes = new Uint8Array(binaryString.length);
 for (let i = 0; i < binaryString.length; i++) { bytes[i] = binaryString.charCodeAt(i); }
 return bytes.buffer;
 } catch (error) {
 return null;
 }
 };

 const getFileExtension = (filePath, mimeType = '') => {
 if (filePath && !filePath.startsWith('data:')) {
 const match = filePath.split('?')[0].match(/\.([a-zA-Z0-9]+)$/);
 if (match) return match[1].toLowerCase();
 }
 if (filePath && filePath.startsWith('data:')) {
 const mimeMatch = filePath.match(/data:([^;]+);/);
 if (mimeMatch) mimeType = mimeMatch[1];
 }
 const mimeMap = {
 'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg',
 'image/gif': 'gif', 'image/webp': 'webp',
 'application/pdf': 'pdf',
 'application/msword': 'doc',
 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
 };
 return mimeMap[mimeType] || 'file';
 };

 const fetchFileFromServer = async (candidateId, fileType) => {
 try {
 const url = `${API_BASE_URL}/api/jobfair/${candidateId}/file/${fileType}`;
 const response = await fetch(url);
 if (!response.ok) return null;
 const contentType = response.headers.get('content-type') || '';
 const arrayBuffer = await response.arrayBuffer();
 return { data: arrayBuffer, mimeType: contentType };
 } catch (error) {
 return null;
 }
 };

 const processDocumentForZip = async (folder, docName, filePath, candidateId, fileType) => {
 if (!filePath) return { success: false, reason: 'Not uploaded' };
 try {
 let result = null;
 result = await fetchFileFromServer(candidateId, fileType);
 if (!result && filePath.startsWith('data:')) {
 const arrayBuffer = base64ToArrayBuffer(filePath);
 if (arrayBuffer) {
 const mimeMatch = filePath.match(/data:([^;]+);/);
 result = { data: arrayBuffer, mimeType: mimeMatch ? mimeMatch[1] : '' };
 }
 }
 if (result && result.data && result.data.byteLength > 0) {
 const extension = getFileExtension(filePath, result.mimeType);
 folder.file(`${docName}.${extension}`, result.data);
 return { success: true, fileName: `${docName}.${extension}` };
 }
 return { success: false, reason: result ? 'Empty file content' : 'Failed to fetch' };
 } catch (error) {
 return { success: false, reason: error.message || 'Processing error' };
 }
 };

 const handleCancelExport = () => {
 abortRef.current = true;
 setExportProgress(prev => ({ ...prev, status: "Cancelling..." }));
 };

 const exportToZip = async () => {
 const toExport = selectedRows.length > 0
 ? candidates.filter(c => selectedRows.includes(c.id))
 : filtered;

 if (!toExport.length) return alert("No registrations to export.");

 abortRef.current = false;
 setIsExporting(true);
 const errors = [];
 setExportProgress({ current: 0, total: toExport.length, status: "Starting export...", errors: [] });

 try {
 const zip = new JSZip();

 // Excel
 const excelData = toExport.map((c, i) => ({
 "S.No": i + 1,
 "Code": c.code,
 "Name": c.name,
 "Email": c.email,
 "Phone/WhatsApp": c.phone,
 "College": c.ugCollege,
 "Course": c.ugCourse,
 "CGPA": c.ugCgpa,
 "Status": c.status,
 "Registered On": c.createdAt ? new Date(c.createdAt).toLocaleString() : "—"
 }));

 const ws = XLSX.utils.json_to_sheet(excelData);
 const wb = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, "Candidates");
 const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
 zip.file("Candidates_Data.xlsx", excelBuffer);

 const documentsFolder = zip.folder("Documents");

 for (let i = 0; i < toExport.length; i++) {
 const c = toExport[i];
 setExportProgress({
 current: i + 1, total: toExport.length,
 status: `Processing ${c.name} (${i + 1}/${toExport.length})...`,
 errors: [...errors]
 });

 const candidateFolder = documentsFolder.folder(c.code || `candidate_${i + 1}`);

 // Info text
 const infoText = `
CANDIDATE: ${c.code}
========================
Name: ${c.name}
Email: ${c.email}
Phone: ${c.phone}
College: ${c.ugCollege}
Course: ${c.ugCourse}
CGPA: ${c.ugCgpa}
Status: ${c.status}
Registered: ${c.createdAt ? new Date(c.createdAt).toLocaleString() : "-"}
 `.trim();
 candidateFolder.file("info.txt", infoText);

 // Documents
 const documents = [
 { name: "Profile_Photo", path: c.profileImage, type: "profile" },
 { name: "Resume", path: c.resume, type: "resume" },
 { name: "Aadhaar_Card", path: c.aadhaarFile, type: "aadhaar" },
 { name: "Marksheet", path: c.marksheet, type: "marksheet" }
 ];

 let downloadedDocs = [];
 let failedDocs = [];

 for (const doc of documents) {
 if (doc.path) {
 const result = await processDocumentForZip(candidateFolder, doc.name, doc.path, c.id, doc.type);
 if (result.success) {
 downloadedDocs.push(doc.name);
 } else {
 failedDocs.push(`${doc.name}: ${result.reason}`);
 }
 } else {
 failedDocs.push(`${doc.name}: Not uploaded`);
 }
 }

 if (failedDocs.length > 0) {
 errors.push({
 candidate: `${c.name} (${c.code})`,
 failed: failedDocs,
 allFailed: downloadedDocs.length === 0
 });
 }

 if (abortRef.current) {
 setExportProgress({ current: i + 1, total: toExport.length, status: `Cancelled at ${c.name}.`, errors });
 break;
 }

 await new Promise(resolve => setTimeout(resolve, 50));
 }

 if (abortRef.current) {
 setTimeout(() => {
 setIsExporting(false);
 setExportProgress({ current: 0, total: 0, status: "", errors: [] });
 }, 1500);
 return;
 }

 setExportProgress({ current: toExport.length, total: toExport.length, status: "Generating ZIP...", errors });

 const content = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
 const timestamp = new Date().toISOString().slice(0, 10);
 saveAs(content, `Maruthupandiyar_Export_${timestamp}.zip`);

 setExportProgress({
 current: 0, total: 0,
 status: errors.length > 0 ? `Done! ${errors.length} candidates have some missing documents.` : "Export completed successfully!",
 errors
 });

 setTimeout(() => {
 setIsExporting(false);
 setExportProgress({ current: 0, total: 0, status: "", errors: [] });
 }, 3000);

 } catch (error) {
 console.error("Export error:", error);
 alert("Export failed: " + error.message);
 setIsExporting(false);
 }
 };

 // ── Sub-Components ──────────────────────────────────────────────────────
 const InfoRow = ({ label, value }) => value && value !== "—" ? (
 <p className="text-sm"><b className="text-gray-600">{label}:</b> <span className="text-gray-900">{value}</span></p>
 ) : null;

 const FileLink = ({ label, url }) => {
 if (!url) return <p className="text-gray-400 text-xs px-1">{label}: Not uploaded</p>;
 const isImg = /\.(jpg|jpeg|png|webp|gif)/i.test(url) || url.startsWith("data:image");
 return (
 <div className="flex items-center gap-2 py-1">
 <span className="font-semibold text-gray-700 min-w-[120px] text-xs">{label}:</span>
 <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-800 underline text-xs">
 {isImg ? <ImageIcon size={14} /> : <FileText size={14} />} View
 <Download size={12} />
 </a>
 </div>
 );
 };

 const StatusBadge = ({ status }) => {
 const map = { selected: "bg-green-100 text-green-700", rejected: "bg-red-100 text-red-700", pending: "bg-yellow-100 text-yellow-700" };
 return <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${map[status] || map.pending}`}>{status || "pending"}</span>;
 };

 // ── Render ─────────────────────────────────────────────────────────────
 return (
 <div className={isEmbedded ? "bg-transparent p-0" : "min-h-screen bg-slate-50 p-4 md:p-8"}>

 {/* Tab Switcher */}
 <div className="flex gap-2 mb-8 bg-white/60 p-1.5 rounded-2xl w-fit shadow-sm border border-white">
 <button onClick={() => handleTabChange("events")}
 className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === "events" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-500 hover:bg-white hover:text-blue-600"}`}>
 <Calendar size={18} /> Events
 </button>
 <button onClick={() => handleTabChange("workshop")}
 className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === "workshop" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-slate-500 hover:bg-white hover:text-indigo-600"}`}>
 <Users size={18} /> Workshops
 </button>
 </div>

 {/* Header Card */}
 <div className={`relative rounded-3xl overflow-hidden shadow-2xl mb-8 transition-all duration-500 ${activeTab === "workshop" ? "bg-indigo-700" : "bg-blue-700"}`}>
 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
 <div className="relative z-10 p-8 md:p-10">
 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-white text-center md:text-left">
 <div>
 <h1 className="text-3xl md:text-4xl font-black flex items-center gap-3 justify-center md:justify-start">
 {activeTab === "workshop" ? <Users size={36} /> : <Calendar size={36} />}
 {activeTab === "workshop" ? "Workshop Registrations" : "Event Registrations"}
 </h1>
 <p className="text-blue-100/80 font-medium mt-2">Manage and track all {activeTab} leads from one central dashboard</p>
 <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
 <span className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-2xl text-sm border border-white/5">Total: <b className="text-lg">{candidates.length}</b></span>
 <span className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-2xl text-sm border border-white/5">Filtered: <b className="text-lg">{filtered.length}</b></span>
 <span className="bg-green-400/20 backdrop-blur-md px-5 py-2 rounded-2xl text-sm border border-green-400/20 text-green-300">Selected: <b>{candidates.filter(c => c.status === "selected").length}</b></span>
 </div>
 </div>
 <button onClick={() => selectedEventId === "all" ? (activeTab === "workshop" ? fetchAllWorkshops() : fetchAllEvents()) : fetchByItem(selectedEventId, activeTab)}
 className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-black shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 self-center lg:self-auto">
 <RefreshCw size={22} className={loading ? "animate-spin" : ""} /> Refresh Data
 </button>
 </div>

 {/* Filter Bar */}
 <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
 <select value={selectedEventId} onChange={e => setSelectedEventId(e.target.value)}
 className="col-span-1 lg:col-span-1 px-5 py-4 rounded-2xl bg-white text-slate-800 font-bold focus:ring-4 ring-blue-400/30 outline-none appearance-none cursor-pointer">
 <option value="all">📁 All {activeTab === "workshop" ? "Workshops" : "Events"}</option>
 {activeTab === "workshop" ? (
 workshops.map(item => (
 <option key={item.id} value={item.id}>{item.title}</option>
 ))
 ) : (
 <>
 {events.map(item => (
 <option key={item.id} value={item.id}>{item.title}</option>
 ))}
 <option value="maruthupandiyar">Maruthupandiyar (Job Fair)</option>
 </>
 )}
 </select>
 <select value={searchType} onChange={e => setSearchType(e.target.value)}
 className="px-5 py-4 rounded-2xl bg-white text-slate-800 font-bold focus:ring-4 ring-blue-400/30 outline-none">
 <option value="all">🔍 Search All</option>
 <option value="code">Code Only</option>
 <option value="college">College Only</option>
 <option value="event">{activeTab === "workshop" ? "Workshop Title" : "Event Title"}</option>
 </select>
 <div className="relative col-span-1 md:col-span-2 lg:col-span-2">
 <Search className="absolute left-5 top-5 text-slate-400" size={20} />
 <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
 placeholder={`Find attendees...`} className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white text-slate-800 font-medium focus:ring-4 ring-blue-400/30 outline-none" />
 </div>
 <button onClick={exportExcel} className="bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-lg transition-colors flex items-center justify-center gap-2">
 <FileSpreadsheet size={22} /> Export Excel
 </button>
 {selectedEventId === "maruthupandiyar" && (
 <button onClick={exportToZip} disabled={isExporting}
 className={`font-black py-4 rounded-2xl shadow-lg transition-colors flex items-center justify-center gap-2 ${isExporting ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"} text-white`}>
 <FolderDown size={22} /> {isExporting ? "Exporting..." : "ZIP + Docs"}
 </button>
 )}
 </div>
 </div>
 </div>

 {/* Table Section */}
 <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-200">
 {loading ? (
 <div className="flex flex-col items-center justify-center py-32 gap-6">
 <Loader size={60} className="text-blue-600 animate-spin" />
 <p className="text-slate-400 font-bold text-xl animate-pulse">Retrieving Cloud Data...</p>
 </div>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full text-left">
 <thead className={`${activeTab === "workshop" ? "bg-indigo-600" : "bg-blue-600"} text-white`}>
 <tr>
 <th className="px-6 py-6 text-center w-20">
 <button onClick={toggleAll} className="hover:scale-110 transition-transform">
 {isAllSelected ? <CheckSquare size={24} /> : <Square size={24} />}
 </button>
 </th>
 <th className="px-6 py-6 font-black uppercase text-xs tracking-widest">Code</th>
 <th className="px-6 py-6 font-black uppercase text-xs tracking-widest">Candidate</th>
 <th className="px-6 py-6 font-black uppercase text-xs tracking-widest">{activeTab}</th>
 <th className="px-6 py-6 font-black uppercase text-xs tracking-widest">Institution</th>
 <th className="px-6 py-6 font-black uppercase text-xs tracking-widest">Status</th>
 <th className="px-6 py-6 text-center font-black uppercase text-xs tracking-widest">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {filtered.map((c, idx) => (
 <tr key={c.id || idx} className={`group transition-colors ${selectedRows.includes(c.id) ? "bg-yellow-50/50" : ""}`}>
 <td className="px-6 py-5 text-center">
 <button onClick={() => toggleRow(c.id)} className="text-slate-300 hover:text-blue-600 transition-colors">
 {selectedRows.includes(c.id) ? <CheckSquare size={22} className="text-blue-600" /> : <Square size={22} />}
 </button>
 </td>
 <td className="px-6 py-5 font-mono font-black text-blue-700">{c.code}</td>
 <td className="px-6 py-5">
 <div className="font-bold text-slate-800">{c.name}</div>
 <div className="text-xs text-slate-400">{c.email}</div>
 </td>
 <td className="px-6 py-5">
 <span className={`px-3 py-1 rounded-lg text-xs font-bold ${activeTab === "workshop" ? "bg-indigo-50 text-indigo-700" : (activeTab === "jobfair" ? "bg-orange-50 text-orange-700" : "bg-blue-50 text-blue-700")}`}>{c.eventTitle}</span>
 </td>
 <td className="px-6 py-5 text-slate-600 font-medium text-sm">{c.ugCollege}</td>
 <td className="px-6 py-5"><StatusBadge status={c.status} /></td>
 <td className="px-6 py-5 text-center">
 <button onClick={() => setSelected(c)} className="bg-slate-100 hover:bg-blue-600 hover:text-white p-3 rounded-xl transition-all hover:scale-110 active:scale-90">
 <Eye size={20} />
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 {filtered.length === 0 && (
 <div className="py-32 text-center text-slate-300">
 <AlertCircle size={64} className="mx-auto mb-4 opacity-20" />
 <p className="text-2xl font-black">No registrations match your search</p>
 </div>
 )}
 </div>
 )}
 </div>

 {/* Registration Detail Modal */}
 {selected && (
 <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
 <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">

 {/* Modal Header */}
 <div className={`p-8 flex justify-between items-center text-white ${activeTab === "workshop" ? "bg-indigo-600" : (activeTab === "jobfair" ? "bg-orange-600" : "bg-blue-600")}`}>
 <div>
 <h2 className="text-3xl font-black">Lead Details</h2>
 <p className="text-white/60 font-bold mt-1 uppercase tracking-widest text-xs">{selected.eventTitle}</p>
 </div>
 <button onClick={() => setSelected(null)} className="bg-white/10 p-3 rounded-2xl transition-all">
 <X size={28} />
 </button>
 </div>

 <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10">

 {/* Top Info Grid */}
 <div className="grid md:grid-cols-2 gap-10">
 <div className="space-y-6">
 <div className={`p-6 rounded-[2rem] text-center shadow-lg text-white ${activeTab === "workshop" ? "bg-indigo-500" : (activeTab === "jobfair" ? "bg-orange-500" : "bg-blue-500")}`}>
 <p className="text-xs font-black uppercase tracking-widest opacity-70">Reference Code</p>
 <p className="text-4xl font-mono font-black mt-2">{selected.code}</p>
 </div>
 <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
 <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">👤 Personal Data</h3>
 <div className="space-y-4">
 <InfoRow label="Full Name" value={selected.name} />
 <InfoRow label="Guardian" value={selected.fatherName} />
 <InfoRow label="Email Address" value={selected.email} />
 <InfoRow label={activeTab === "workshop" ? "WhatsApp" : "Mobile"} value={selected.phone} />
 <InfoRow label="Gender" value={selected.gender} />
 <InfoRow label="Born On" value={selected.dob} />
 </div>
 </div>
 </div>

 <div className="space-y-8">
 <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 h-full">
 <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">🎓 Institutional Info</h3>
 <div className="space-y-4">
 <InfoRow label="College" value={selected.ugCollege} />
 <InfoRow label="University" value={selected.ugUniversity} />
 <InfoRow label="Degree/Course" value={selected.ugCourse} />
 <InfoRow label="Batch Year" value={selected.ugYear} />
 <InfoRow label="Performance (CGPA)" value={selected.ugCgpa} />
 </div>
 </div>
 </div>
 </div>

 {/* Secondary Data Sections */}
 <div className="grid md:grid-cols-2 gap-10">
 <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
 <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">📁 Documents</h3>
 <div className="space-y-2">
 <FileLink label="Profile Image" url={selected.profileImage} />
 <FileLink label="Academic Resume" url={selected.resume} />
 <FileLink label="ID Proof (Aadhaar)" url={selected.aadhaarFile} />
 <FileLink label="Recent Marksheet" url={selected.marksheet} />
 </div>
 </div>
 {selected.skills && (
 <div className="bg-orange-50/50 p-8 rounded-[2rem] border border-orange-100">
 <h3 className="text-xl font-black text-orange-800 mb-6">💡 Technical Skills</h3>
 <div className="flex flex-wrap gap-2">
 {selected.skills.split(",").map((s, i) => (
 <span key={i} className="bg-white text-orange-600 px-4 py-1.5 rounded-xl text-xs font-black shadow-sm border border-orange-100">
 {s.trim()}
 </span>
 ))}
 </div>
 </div>
 )}
 </div>

 {/* Address Row */}
 <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
 <h3 className="text-lg font-black mb-2 opacity-50 uppercase tracking-widest px-1">Residential Address</h3>
 <p className="text-lg font-medium leading-relaxed">{selected.address}</p>
 <div className="mt-6 pt-6 border-t border-white/10 text-right text-xs font-bold text-white/40">
 REGISTRATION RECEIVED ON {selected.createdAt ? new Date(selected.createdAt).toLocaleString().toUpperCase() : "UNKNOWN DATE"}
 </div>
 </div>

 </div>
 </div>
 </div>
 )}

 {/* Export Progress Modal */}
 {isExporting && (
 <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]">
 <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl relative">
 <button onClick={handleCancelExport} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
 <X size={20} />
 </button>
 <div className="flex flex-col items-center">
 <Loader className="w-16 h-16 text-blue-600 animate-spin mb-4" />
 <h3 className="text-xl font-bold text-gray-800 mb-2">Exporting Data...</h3>
 <p className="text-gray-600 text-center mb-4">{exportProgress.status}</p>
 {exportProgress.total > 0 && (
 <>
 <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
 <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${(exportProgress.current / exportProgress.total) * 100}%` }}></div>
 </div>
 <p className="text-sm text-gray-500">{exportProgress.current} of {exportProgress.total}</p>
 </>
 )}
 {exportProgress.errors?.length > 0 && (
 <div className="mt-4 w-full bg-yellow-50 border border-yellow-200 rounded-lg p-3">
 <div className="flex items-center gap-2 text-yellow-700 text-sm font-medium">
 <AlertCircle size={16} />
 <span>{exportProgress.errors.length} with missing docs</span>
 </div>
 </div>
 )}
 </div>
 </div>
 </div>
 )}
 </div>
 );
};

export default AdminEventRegistrations;
