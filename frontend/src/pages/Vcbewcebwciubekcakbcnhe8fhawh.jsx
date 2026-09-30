import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/apiConfig';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const JobFairPanel = () => {
 // Load candidates from localStorage
 const [candidates, setCandidates] = useState([]);

 // Company list
 const companies = [
 { code: 'COMP001', name: 'Tech Solutions Ltd' },
 { code: 'COMP002', name: 'Digital Innovations' },
 { code: 'COMP003', name: 'Global Systems Inc' },
 { code: 'COMP004', name: 'Future Tech Corp' },
 { code: 'COMP005', name: 'Smart Solutions' },
 { code: 'COMP006', name: 'CloudNine Systems' },
 { code: 'COMP007', name: 'DataFlow Analytics' },
 { code: 'COMP008', name: 'CyberSecure Inc' },
 ];

 // State management
 const [activePanel, setActivePanel] = useState('hr');
 const [selectedCandidate, setSelectedCandidate] = useState(null);
 const [interviews, setInterviews] = useState([]); // All interview records from DB
 const [jobFairData, setJobFairData] = useState([]); // Full candidate details including files
 const [uniqueCandidates, setUniqueCandidates] = useState([]); // Unique candidates for list
 const [formData, setFormData] = useState({ companyCode: '', round: '' });
 const [notification, setNotification] = useState({ show: false, message: '', type: '' });
 const [searchQuery, setSearchQuery] = useState('');
 const [hrSearchQuery, setHrSearchQuery] = useState('');

 const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });

 // Load data from API
 useEffect(() => {
 fetchData();
 }, []);

 const fetchData = async () => {
 try {
 const [interviewRes, jobFairRes] = await Promise.all([
 fetch(`${API_BASE_URL}/api/interviews`),
 fetch(`${API_BASE_URL}/api/jobfair`)
 ]);

 if (interviewRes.ok && jobFairRes.ok) {
 const interviewData = await interviewRes.json();
 const jobFairDetails = await jobFairRes.json();

 setInterviews(interviewData);
 setJobFairData(jobFairDetails);

 // Extract unique candidates based on interviewCode
 const unique = [];
 const seen = new Set();
 interviewData.forEach(item => {
 if (!seen.has(item.interviewCode)) {
 seen.add(item.interviewCode);
 unique.push(item);
 }
 });
 setUniqueCandidates(unique);
 } else {
 showNotification("Some data failed to load", "warning");
 }
 } catch (error) {
 console.error("Error fetching data:", error);
 showNotification("Failed to load data", "error");
 }
 };

 const fetchInterviews = () => fetchData(); // Alias for compatibility

 // Show notification
 const showNotification = (message, type) => {
 setNotification({ show: true, message, type });
 setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
 };

 // Handle candidate row click
 const handleCandidateClick = (candidate) => {
 setSelectedCandidate(selectedCandidate?.interviewCode === candidate.interviewCode ? null : candidate);
 setFormData({ companyCode: '', round: '' });
 };

 // Handle form input changes
 const handleInputChange = (field, value) => {
 setFormData(prev => ({ ...prev, [field]: value }));
 };

 // Submit decision
 const handleSubmitDecision = async (status) => {
 if (!selectedCandidate) return showNotification('Select a candidate first!', 'error');
 if (!formData.companyCode) return showNotification('Enter company code!', 'error');
 if (!formData.round) return showNotification('Select a round!', 'error');

 const companyCode = formData.companyCode.toUpperCase();
 const roundKey = formData.round.toLowerCase().replace(" ", ""); // round1, round2, round3

 // Check if entry exists for this candidate + company
 const existingEntry = interviews.find(
 i => i.interviewCode === selectedCandidate.interviewCode &&
 i.companyCode === companyCode
 );

 try {
 if (existingEntry) {
 // UPDATE existing entry
 const updateData = {
 [roundKey]: status
 };

 const response = await fetch(`${API_BASE_URL}/api/interviews/${existingEntry.id}`, {
 method: 'PUT',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(updateData)
 });

 if (response.ok) {
 showNotification(`Updated ${formData.round} to ${status}`, 'success');
 fetchInterviews(); // Refresh data
 } else {
 showNotification('Failed to update status', 'error');
 }

 } else {
 // CREATE new entry
 const newEntry = {
 interviewCode: selectedCandidate.interviewCode,
 name: selectedCandidate.name,
 companyCode: companyCode,
 round1: "Pending",
 round2: "Pending",
 round3: "Pending",
 [roundKey]: status // Set the current round status
 };

 const response = await fetch(`${API_BASE_URL}/api/interviews`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(newEntry)
 });

 if (response.ok) {
 showNotification(`Created new entry for ${companyCode}`, 'success');
 fetchInterviews(); // Refresh data
 } else {
 showNotification('Failed to create entry', 'error');
 }
 }
 } catch (error) {
 console.error("Error saving decision:", error);
 showNotification('Network error', 'error');
 }

 setFormData({ companyCode: '', round: '' });
 };

 // Get status badge style
 const getStatusBadgeStyle = (status) => {
 const base = {
 padding: '6px 14px',
 borderRadius: '20px',
 fontSize: '0.75rem',
 fontWeight: '700',
 textTransform: 'uppercase',
 letterSpacing: '0.5px',
 display: 'inline-block',
 };
 switch (status) {
 case 'Selected': return { ...base, background: '#10B981', color: '#fff' };
 case 'Rejected': return { ...base, background: '#EF4444', color: '#fff' };
 case 'Waiting': return { ...base, background: '#F59E0B', color: '#fff' };
 default: return { ...base, background: '#6B7280', color: '#fff' };
 }
 };

 // Status counts (calculated from API data)
 const statusCounts = {
 total: interviews.length,
 selected: interviews.filter(r =>
 r.round1 === 'Selected' || r.round2 === 'Selected' || r.round3 === 'Selected'
 ).length,
 rejected: interviews.filter(r =>
 r.round1 === 'Rejected' || r.round2 === 'Rejected' || r.round3 === 'Rejected'
 ).length,
 waiting: interviews.filter(r =>
 r.round1 === 'Waiting' || r.round2 === 'Waiting' || r.round3 === 'Waiting'
 ).length,
 };

 // Delete confirmation state (Moved to top state block)

 // Trigger delete confirmation popup
 // Trigger delete confirmation popup
 const confirmDelete = (id) => {
 setDeleteConfirm({ show: true, id });
 };

 // Execute delete logic
 const executeDelete = async () => {
 if (!deleteConfirm.id) return;
 const id = deleteConfirm.id;
 setDeleteConfirm({ show: false, id: null });

 try {
 const response = await fetch(`${API_BASE_URL}/api/interviews/${id}`, {
 method: 'DELETE',
 });

 if (response.ok) {
 showNotification("Record deleted successfully", "success");
 fetchData(); // Refresh data
 if (selectedCandidate?.id === id) {
 setSelectedCandidate(null);
 }
 } else {
 showNotification("Failed to delete record", "error");
 }
 } catch (error) {
 console.error("Error deleting record:", error);
 showNotification("Network error during delete", "error");
 }
 };

 // Cancel delete
 const cancelDelete = () => {
 setDeleteConfirm({ show: false, id: null });
 };

 // Filter results by search query (Admin Panel)
 // Filter results by search query (Admin Panel)
 const filteredResults = interviews.filter(r => {
 // Only show if company code exists and is valid
 if (!r.companyCode || r.companyCode.trim() === "" || r.companyCode === "undefined" || r.companyCode === "null") return false;
 // Exclude "NA" or "N/A"
 if (r.companyCode.toUpperCase() === "NA" || r.companyCode.toUpperCase() === "N/A") return false;

 const query = searchQuery.toLowerCase();
 return (
 (r.interviewCode && r.interviewCode.toLowerCase().includes(query)) ||
 (r.name && r.name.toLowerCase().includes(query)) ||
 (r.companyCode && r.companyCode.toLowerCase().includes(query))
 );
 });

 // Export to Excel
 const exportToExcel = () => {
 if (filteredResults.length === 0) return showNotification("No data to export", "error");

 const worksheet = XLSX.utils.json_to_sheet(filteredResults.map(r => ({
 "Interview Code": r.interviewCode,
 "Candidate Name": r.name,
 "Company Code": r.companyCode,
 "Round 1": r.round1 || "Pending",
 "Round 2": r.round2 || "Pending",
 "Round 3": r.round3 || "Pending",
 "Recent Update": r.updatedAt ? new Date(r.updatedAt).toLocaleString() : new Date(r.createdAt).toLocaleString()
 })));

 const workbook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(workbook, worksheet, "Interview Results");
 XLSX.writeFile(workbook, "Interview_Results.xlsx");
 showNotification("Excel exported successfully", "success");
 };

 // Export to ZIP

 const exportToZip = async () => {
 if (filteredResults.length === 0) return showNotification("No data to export", "error");


 const zip = new JSZip();

 // 1. Add Excel Report
 const worksheet = XLSX.utils.json_to_sheet(filteredResults.map(r => ({
 "Interview Code": r.interviewCode,
 "Candidate Name": r.name,
 "Company Code": r.companyCode,
 "Round 1": r.round1 || "Pending",
 "Round 2": r.round2 || "Pending",
 "Round 3": r.round3 || "Pending",
 "Created At": new Date(r.createdAt).toLocaleString()
 })));
 const workbook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
 const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
 zip.file("Interview_Results.xlsx", excelBuffer);

 // 2. Add Candidate Files
 const candidatesFolder = zip.folder("Candidates_Documents");

 // Helper to fetch blob
 const fetchBlob = async (url) => {
 if (!url) return null;
 try {
 const resp = await fetch(url);
 if (!resp.ok) throw new Error("Failed");
 return await resp.blob();
 } catch (e) { return null; }
 };

 // Iterate through unique candidates in the filtered results to avoid duplicate downloads
 const processedCodes = new Set();

 for (const result of filteredResults) {
 if (processedCodes.has(result.interviewCode)) continue;
 processedCodes.add(result.interviewCode);

 // Find matching job fair data to get file URLs
 const candidateData = jobFairData.find(j => j.interviewCode === result.interviewCode);
 if (!candidateData) continue;

 const candidateFolder = candidatesFolder.folder(`${result.interviewCode}_${result.name.replace(/[^a-zA-Z0-9]/g, '_')}`);

 // Download and add files (checking keys from server mapping: resume, profilephoto, aadhaarcard, lastsemestermarksheet)
 if (candidateData.resume) {
 const blob = await fetchBlob(candidateData.resume);
 if (blob) candidateFolder.file("Resume.pdf", blob);
 }
 if (candidateData.profilephoto) {
 const blob = await fetchBlob(candidateData.profilephoto);
 if (blob) candidateFolder.file("Profile_Photo.jpg", blob);
 }
 if (candidateData.aadhaarcard) {
 const blob = await fetchBlob(candidateData.aadhaarcard);
 if (blob) candidateFolder.file("Aadhaar.pdf", blob);
 }
 if (candidateData.lastsemestermarksheet) {
 const blob = await fetchBlob(candidateData.lastsemestermarksheet);
 if (blob) candidateFolder.file("Marksheet.pdf", blob);
 }
 }

 // Generate ZIP
 const content = await zip.generateAsync({ type: "blob" });
 saveAs(content, "Interview_Results_Package.zip");
 showNotification("ZIP downloaded successfully", "success");
 };

 // View Files Helper
 const viewCandidateFiles = (interviewCode) => {
 const data = jobFairData.find(j => j.interviewCode === interviewCode);
 if (!data) return showNotification("No documents found for this candidate.", "error");

 // Open Profile and Resume if available
 let opened = false;
 if (data.resume) { window.open(data.resume, '_blank'); opened = true; }
 if (data.profilephoto) { window.open(data.profilephoto, '_blank'); opened = true; }

 if (!opened) showNotification("No files uploaded.", "error");
 };

 // Filter candidates by search query (HR Panel)
 const filteredCandidates = uniqueCandidates.filter(c =>
 c.name?.toLowerCase().includes(hrSearchQuery.toLowerCase()) ||
 c.interviewCode?.toLowerCase().includes(hrSearchQuery.toLowerCase())
 );

 // Blue & White Theme Styles
 const styles = {
 container: {
 minHeight: '100vh',
 fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
 background: 'linear-gradient(135deg, #EBF4FF 0%, #E0EAFC 50%, #CFDEF3 100%)',
 color: '#1E3A5F',
 padding: '0',
 },
 header: {
 background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
 padding: '25px 20px',
 textAlign: 'center',
 boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
 },
 headerTitle: {
 fontSize: '2rem',
 fontWeight: '800',
 margin: 0,
 letterSpacing: '2px',
 color: '#fff',
 textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
 },
 toggleSection: {
 display: 'flex',
 justifyContent: 'center',
 gap: '0',
 padding: '25px 20px',
 background: '#fff',
 boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
 },
 toggleBtn: {
 padding: '14px 40px',
 fontSize: '1rem',
 fontWeight: '700',
 border: 'none',
 cursor: 'pointer',
 transition: 'all 0.3s ease',
 textTransform: 'uppercase',
 letterSpacing: '1px',
 },
 toggleBtnLeft: {
 borderRadius: '50px 0 0 50px',
 },
 toggleBtnRight: {
 borderRadius: '0 50px 50px 0',
 },
 toggleBtnActive: {
 background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
 color: '#fff',
 boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
 },
 toggleBtnInactive: {
 background: '#E5E7EB',
 color: '#6B7280',
 },
 panelContainer: {
 padding: '20px',
 maxWidth: '1200px',
 margin: '0 auto',
 },
 panelTitle: {
 fontSize: '1.5rem',
 marginBottom: '20px',
 paddingBottom: '15px',
 borderBottom: '3px solid #3B82F6',
 display: 'flex',
 alignItems: 'center',
 gap: '10px',
 color: '#1E3A8A',
 },
 table: {
 width: '100%',
 borderCollapse: 'separate',
 borderSpacing: '0',
 background: '#fff',
 borderRadius: '16px',
 overflow: 'hidden',
 boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
 },
 th: {
 background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
 padding: '16px 20px',
 textAlign: 'left',
 fontWeight: '700',
 textTransform: 'uppercase',
 letterSpacing: '1px',
 fontSize: '0.85rem',
 color: '#fff',
 },
 td: {
 padding: '16px 20px',
 borderBottom: '1px solid #E5E7EB',
 color: '#1E3A5F',
 },
 searchContainer: {
 marginBottom: '20px',
 display: 'flex',
 gap: '10px',
 flexWrap: 'wrap',
 },
 searchInput: {
 flex: '1',
 minWidth: '250px',
 padding: '14px 20px',
 borderRadius: '12px',
 border: '2px solid #BFDBFE',
 background: '#fff',
 color: '#1E3A5F',
 fontSize: '1rem',
 outline: 'none',
 transition: 'all 0.3s ease',
 },
 dropdownPanel: {
 background: '#F0F9FF',
 padding: '25px',
 borderRadius: '0 0 16px 16px',
 border: '2px solid #BFDBFE',
 borderTop: 'none',
 },
 formGroup: {
 marginBottom: '20px',
 },
 formLabel: {
 display: 'block',
 fontWeight: '700',
 color: '#1E3A8A',
 textTransform: 'uppercase',
 fontSize: '0.8rem',
 letterSpacing: '1px',
 marginBottom: '10px',
 },
 select: {
 width: '100%',
 padding: '14px 18px',
 borderRadius: '10px',
 border: '2px solid #BFDBFE',
 background: '#fff',
 color: '#1E3A5F',
 fontSize: '1rem',
 cursor: 'pointer',
 outline: 'none',
 transition: 'all 0.3s ease',
 },
 input: {
 width: '100%',
 padding: '14px 18px',
 borderRadius: '10px',
 border: '2px solid #BFDBFE',
 background: '#fff',
 color: '#1E3A5F',
 fontSize: '1rem',
 outline: 'none',
 transition: 'all 0.3s ease',
 boxSizing: 'border-box',
 },
 radioGroup: {
 display: 'flex',
 gap: '12px',
 flexWrap: 'wrap',
 },
 radioLabel: {
 flex: '1',
 minWidth: '100px',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: '8px',
 cursor: 'pointer',
 padding: '12px 16px',
 borderRadius: '10px',
 background: '#fff',
 border: '2px solid #BFDBFE',
 transition: 'all 0.3s ease',
 fontWeight: '600',
 color: '#1E3A5F',
 },
 radioLabelSelected: {
 background: '#DBEAFE',
 border: '2px solid #3B82F6',
 color: '#1E3A8A',
 },
 actionButtonsVertical: {
 display: 'flex',
 flexDirection: 'column',
 gap: '12px',
 marginTop: '20px',
 },
 actionBtn: {
 padding: '14px 24px',
 border: 'none',
 borderRadius: '10px',
 fontSize: '1rem',
 fontWeight: '700',
 cursor: 'pointer',
 transition: 'all 0.3s ease',
 textTransform: 'uppercase',
 letterSpacing: '1px',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: '10px',
 },
 selectBtn: {
 background: 'linear-gradient(135deg, #10B981, #34D399)',
 color: '#fff',
 },
 rejectBtn: {
 background: 'linear-gradient(135deg, #EF4444, #F87171)',
 color: '#fff',
 },
 waitingBtn: {
 background: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
 color: '#fff',
 },
 statsContainer: {
 display: 'grid',
 gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
 gap: '15px',
 marginBottom: '25px',
 },
 statCard: {
 background: '#fff',
 borderRadius: '16px',
 padding: '20px',
 textAlign: 'center',
 border: '2px solid #E5E7EB',
 transition: 'all 0.3s ease',
 boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
 },
 notification: {
 position: 'fixed',
 top: '20px',
 right: '20px',
 padding: '16px 24px',
 borderRadius: '12px',
 color: '#fff',
 fontWeight: '700',
 zIndex: 1000,
 boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
 animation: 'slideIn 0.3s ease',
 },
 emptyState: {
 textAlign: 'center',
 padding: '60px 20px',
 color: '#6B7280',
 },
 candidateRow: {
 cursor: 'pointer',
 transition: 'all 0.2s ease',
 },
 selectedRow: {
 background: '#DBEAFE',
 },
 interviewBadge: {
 display: 'inline-flex',
 alignItems: 'center',
 gap: '5px',
 padding: '4px 10px',
 borderRadius: '12px',
 fontSize: '0.75rem',
 fontWeight: '600',
 marginLeft: '8px',
 },
 candidateInfo: {
 background: '#fff',
 padding: '15px',
 borderRadius: '12px',
 marginBottom: '20px',
 border: '1px solid #E5E7EB',
 },
 infoGrid: {
 display: 'grid',
 gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
 gap: '12px',
 },
 infoItem: {
 padding: '8px 0',
 },
 infoLabel: {
 fontSize: '0.75rem',
 color: '#6B7280',
 textTransform: 'uppercase',
 letterSpacing: '0.5px',
 },
 infoValue: {
 fontSize: '0.95rem',
 fontWeight: '600',
 color: '#1E3A5F',
 marginTop: '2px',
 },
 };

 return (
 <div style={styles.container}>
 {/* ... (keep existing notification & header code) ... */}
 {/* Notification */}
 {notification.show && (
 <div
 style={{
 ...styles.notification,
 background: notification.type === 'success'
 ? 'linear-gradient(135deg, #10B981, #34D399)'
 : 'linear-gradient(135deg, #EF4444, #F87171)',
 }}
 >
 {notification.type === 'success' ? '✓' : '✗'} {notification.message}
 </div>
 )}

 {/* Header */}
 <header style={styles.header}>
 <h1 style={styles.headerTitle}>📋 JOBFAIR PANEL</h1>
 </header>

 {/* Toggle Section */}
 <section style={{
 display: 'flex',
 justifyContent: 'center',
 gap: '0',
 padding: '25px 20px',
 background: '#fff',
 boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
 }}>
 {/* HR Panel */}
 <button
 onClick={() => setActivePanel('hr')}
 style={{
 ...styles.toggleBtn,
 ...styles.toggleBtnLeft,
 background: activePanel === 'hr' ? 'linear-gradient(135deg, #1E3A8A, #3B82F6)' : '#E5E7EB',
 color: activePanel === 'hr' ? '#fff' : '#1E3A8A',
 boxShadow: activePanel === 'hr' ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: '8px',
 borderRadius: '50px 0 0 50px',
 zIndex: activePanel === 'hr' ? 10 : 1,
 position: 'relative',
 }}
 >
 👥 HR Panel
 </button>



 {/* Admin Panel */}
 <button
 onClick={() => setActivePanel('admin')}
 style={{
 ...styles.toggleBtn,
 ...styles.toggleBtnRight,
 background: activePanel === 'admin' ? 'linear-gradient(135deg, #1E3A8A, #3B82F6)' : '#E5E7EB',
 color: activePanel === 'admin' ? '#fff' : '#1E3A8A',
 boxShadow: activePanel === 'admin' ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: '8px',
 borderRadius: '0 50px 50px 0',
 zIndex: activePanel === 'admin' ? 10 : 1,
 position: 'relative',
 }}
 >
 ⚙️ Admin Panel
 </button>
 </section>


 {/* Panel Container */}
 <div style={styles.panelContainer}>
 {/* HR Panel */}
 {activePanel === 'hr' && (
 <div>
 <h2 style={styles.panelTitle}>
 📝 <span>Candidate Management</span>
 </h2>

 {/* HR Search Bar */}
 <div style={styles.searchContainer}>
 <input
 type="text"
 placeholder="🔍 Search by Name, Code, Email, Phone, College, Qualification..."
 value={hrSearchQuery}
 onChange={(e) => setHrSearchQuery(e.target.value)}
 style={styles.searchInput}
 onFocus={(e) => {
 e.target.style.borderColor = '#3B82F6';
 e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
 }}
 onBlur={(e) => {
 e.target.style.borderColor = '#BFDBFE';
 e.target.style.boxShadow = 'none';
 }}
 />
 {hrSearchQuery && (
 <button
 onClick={() => setHrSearchQuery('')}
 style={{
 padding: '14px 20px',
 background: '#EF4444',
 color: '#fff',
 border: 'none',
 borderRadius: '12px',
 cursor: 'pointer',
 fontWeight: '600',
 }}
 >
 ✗ Clear
 </button>
 )}
 </div>

 {/* Search Results Info */}
 {hrSearchQuery && (
 <div style={{ marginBottom: '15px', color: '#6B7280' }}>
 Found {filteredCandidates.length} candidate(s) for "{hrSearchQuery}"
 </div>
 )}

 {uniqueCandidates.length === 0 ? (
 <div style={styles.emptyState}>
 <div style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.3 }}>📋</div>
 <h3 style={{ marginBottom: '10px', color: '#1E3A5F' }}>No Candidates Registered</h3>
 <p>Candidates will appear here once they register through the form.</p>
 </div>
 ) : filteredCandidates.length === 0 ? (
 <div style={styles.emptyState}>
 <div style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.3 }}>🔍</div>
 <h3 style={{ marginBottom: '10px', color: '#1E3A5F' }}>No Candidates Found</h3>
 <p>No candidates match "{hrSearchQuery}"</p>
 </div>
 ) : (
 <div style={{ overflowX: 'auto' }}>
 <table style={styles.table}>
 <thead>
 <tr>
 <th style={styles.th}>Candidate Name</th>
 <th style={styles.th}>Interview Code</th>
 </tr>
 </thead>
 <tbody>
 {filteredCandidates.map((candidate) => (
 <React.Fragment key={candidate.id}>
 <tr
 onClick={() => handleCandidateClick(candidate)}
 style={{
 ...styles.candidateRow,
 ...(selectedCandidate?.id === candidate.id ? styles.selectedRow : {}),
 }}
 onMouseEnter={(e) => {
 if (selectedCandidate?.id !== candidate.id) {
 e.currentTarget.style.background = '#F0F9FF';
 }
 }}
 onMouseLeave={(e) => {
 if (selectedCandidate?.id !== candidate.id) {
 e.currentTarget.style.background = 'transparent';
 }
 }}
 >
 <td style={styles.td}>
 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
 <div style={{
 width: '45px',
 height: '45px',
 borderRadius: '50%',
 background: 'linear-gradient(135deg, #1E3A8A, #3B82F6)',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 color: '#fff',
 fontWeight: '700',
 fontSize: '1.1rem',
 }}>
 {candidate.name?.charAt(0).toUpperCase() || '?'}
 </div>
 <div>
 <div style={{ fontWeight: '600', fontSize: '1rem' }}>{candidate.name}</div>
 <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
 {candidate.qualification} • {candidate.course}
 </div>
 </div>
 </div>
 </td>
 <td style={styles.td}>
 <span style={{
 fontFamily: 'monospace',
 fontWeight: '700',
 background: '#DBEAFE',
 padding: '10px 16px',
 borderRadius: '8px',
 letterSpacing: '2px',
 color: '#1E3A8A',
 fontSize: '1rem',
 border: '1px solid #93C5FD',
 }}>
 {candidate.interviewCode || candidate.code}
 </span>
 </td>
 </tr>

 {/* Dropdown Panel */}
 {selectedCandidate?.id === candidate.id && (
 <tr>
 <td colSpan="2" style={{ padding: 0 }}>
 <div style={styles.dropdownPanel}>
 {/* Step 1: Company Code */}
 <div style={styles.formGroup}>
 <label style={styles.formLabel}>Step 1: Enter Company Code</label>
 <input
 type="text"
 placeholder="Enter Company Code (e.g., COMP001)"
 value={formData.companyCode}
 onChange={(e) => handleInputChange('companyCode', e.target.value)}
 style={styles.input}
 onFocus={(e) => {
 e.target.style.borderColor = '#3B82F6';
 e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
 }}
 onBlur={(e) => {
 e.target.style.borderColor = '#BFDBFE';
 e.target.style.boxShadow = 'none';
 }}
 />
 </div>

 {/* Step 2: Round Selection */}
 {formData.companyCode && (
 <div style={styles.formGroup}>
 <label style={styles.formLabel}>Step 2: Select Interview Round (Mandatory)</label>
 <div style={styles.radioGroup}>
 {['Round 1', 'Round 2', 'Round 3'].map((round) => (
 <label
 key={round}
 style={{
 ...styles.radioLabel,
 ...(formData.round === round ? styles.radioLabelSelected : {}),
 }}
 onClick={() => handleInputChange('round', round)}
 >
 <input
 type="radio"
 name="round"
 value={round}
 checked={formData.round === round}
 onChange={() => { }}
 style={{ display: 'none' }}
 />
 <span style={{
 width: '20px',
 height: '20px',
 borderRadius: '50%',
 border: `2px solid ${formData.round === round ? '#3B82F6' : '#BFDBFE'}`,
 background: formData.round === round ? '#3B82F6' : '#fff',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 }}>
 {formData.round === round && (
 <span style={{
 width: '8px',
 height: '8px',
 borderRadius: '50%',
 background: '#fff',
 }} />
 )}
 </span>
 {round}
 </label>
 ))}
 </div>
 </div>
 )}

 {/* Step 3: Decision Buttons */}
 {formData.companyCode && formData.round && (
 <div style={styles.formGroup}>
 <label style={styles.formLabel}>Step 3: Make Decision</label>
 <div style={styles.actionButtonsVertical}>
 <button
 onClick={() => handleSubmitDecision('Selected')}
 style={{ ...styles.actionBtn, ...styles.selectBtn }}
 onMouseEnter={(e) => {
 e.currentTarget.style.transform = 'translateY(-2px)';
 e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
 }}
 onMouseLeave={(e) => {
 e.currentTarget.style.transform = 'translateY(0)';
 e.currentTarget.style.boxShadow = 'none';
 }}
 >
 ✓ SELECT CANDIDATE
 </button>
 <button
 onClick={() => handleSubmitDecision('Rejected')}
 style={{ ...styles.actionBtn, ...styles.rejectBtn }}
 onMouseEnter={(e) => {
 e.currentTarget.style.transform = 'translateY(-2px)';
 e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
 }}
 onMouseLeave={(e) => {
 e.currentTarget.style.transform = 'translateY(0)';
 e.currentTarget.style.boxShadow = 'none';
 }}
 >
 ✗ REJECT CANDIDATE
 </button>
 <button
 onClick={() => handleSubmitDecision('Waiting')}
 style={{ ...styles.actionBtn, ...styles.waitingBtn }}
 onMouseEnter={(e) => {
 e.currentTarget.style.transform = 'translateY(-2px)';
 e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.4)';
 }}
 onMouseLeave={(e) => {
 e.currentTarget.style.transform = 'translateY(0)';
 e.currentTarget.style.boxShadow = 'none';
 }}
 >
 ⏳ KEEP IN WAITING
 </button>
 </div>
 </div>
 )}

 {/* Delete Button in Dropdown */}
 <div style={{ marginTop: '20px', borderTop: '1px solid #E5E7EB', paddingTop: '15px' }}>
 <button
 onClick={() => confirmDelete(candidate.id)}
 style={{
 padding: '10px 20px',
 background: '#FCA5A5',
 color: '#7F1D1D',
 border: 'none',
 borderRadius: '8px',
 cursor: 'pointer',
 fontWeight: '600',
 width: '100%',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: '8px'
 }}
 >
 🗑️ DELETE RECORD
 </button>
 </div>

 </div>
 </td>
 </tr>
 )}
 </React.Fragment>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </div>
 )}



 {/* Admin Panel */}
 {activePanel === 'admin' && (
 <div>
 <h2 style={styles.panelTitle}>
 📊 <span>Interview Results Dashboard</span>
 </h2>

 {/* Stats Cards */}
 <div style={styles.statsContainer}>
 <div style={{ ...styles.statCard, borderColor: '#3B82F6' }}>
 <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#3B82F6' }}>
 {statusCounts.total}
 </h3>
 <p style={{ margin: '5px 0 0', color: '#6B7280', fontSize: '0.85rem', textTransform: 'uppercase' }}>
 Total Interviews
 </p>
 </div>
 <div style={{ ...styles.statCard, borderColor: '#10B981' }}>
 <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#10B981' }}>
 {statusCounts.selected}
 </h3>
 <p style={{ margin: '5px 0 0', color: '#6B7280', fontSize: '0.85rem', textTransform: 'uppercase' }}>
 Selected
 </p>
 </div>
 <div style={{ ...styles.statCard, borderColor: '#EF4444' }}>
 <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#EF4444' }}>
 {statusCounts.rejected}
 </h3>
 <p style={{ margin: '5px 0 0', color: '#6B7280', fontSize: '0.85rem', textTransform: 'uppercase' }}>
 Rejected
 </p>
 </div>
 <div style={{ ...styles.statCard, borderColor: '#F59E0B' }}>
 <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#F59E0B' }}>
 {statusCounts.waiting}
 </h3>
 <p style={{ margin: '5px 0 0', color: '#6B7280', fontSize: '0.85rem', textTransform: 'uppercase' }}>
 Waiting
 </p>
 </div>
 </div>

 {/* Search Box */}
 <div style={styles.searchContainer}>
 <input
 type="text"
 placeholder="🔍 Search by Interview Code, Name, or Company..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 style={styles.searchInput}
 onFocus={(e) => {
 e.target.style.borderColor = '#3B82F6';
 e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
 }}
 onBlur={(e) => {
 e.target.style.borderColor = '#BFDBFE';
 e.target.style.boxShadow = 'none';
 }}
 />
 {searchQuery && (
 <button
 onClick={() => setSearchQuery('')}
 style={{
 padding: '14px 20px',
 background: '#EF4444',
 color: '#fff',
 border: 'none',
 borderRadius: '12px',
 cursor: 'pointer',
 fontWeight: '600',
 }}
 >
 ✗ Clear
 </button>
 )}
 </div>

 {/* Export Buttons */}
 <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
 <button
 onClick={exportToExcel}
 style={{
 padding: '12px 20px',
 background: '#10B981',
 color: '#fff',
 border: 'none',
 borderRadius: '10px',
 cursor: 'pointer',
 fontWeight: '600',
 display: 'flex',
 alignItems: 'center',
 gap: '8px',
 boxShadow: '0 4px 10px rgba(16, 185, 129, 0.2)'
 }}
 >
 📊 Export Excel
 </button>
 <button
 onClick={exportToZip}
 style={{
 padding: '12px 20px',
 background: '#6366F1',
 color: '#fff',
 border: 'none',
 borderRadius: '10px',
 cursor: 'pointer',
 fontWeight: '600',
 display: 'flex',
 alignItems: 'center',
 gap: '8px',
 boxShadow: '0 4px 10px rgba(99, 102, 241, 0.2)'
 }}
 >
 📦 Export ZIP
 </button>
 </div>

 {/* Results Info */}
 {searchQuery && (
 <div style={{ marginBottom: '15px', color: '#6B7280' }}>
 Found {filteredResults.length} result(s) for "{searchQuery}"
 </div>
 )}

 {/* Results Table */}
 {filteredResults.length > 0 ? (
 <div style={{ overflowX: 'auto' }}>
 <table style={styles.table}>
 <thead>
 <tr>
 <th style={styles.th}>Interview Code</th>
 <th style={styles.th}>Candidate Name</th>
 <th style={styles.th}>Company</th>
 <th style={styles.th}>Round 1</th>
 <th style={styles.th}>Round 2</th>
 <th style={styles.th}>Round 3</th>
 <th style={styles.th}>Created At</th>
 <th style={styles.th}>Documents</th>
 <th style={styles.th}>Action</th>
 </tr>
 </thead>
 <tbody>
 {filteredResults.map((result) => (
 <tr key={result.id}>
 <td style={styles.td}>
 <span style={{
 fontFamily: 'monospace',
 fontWeight: '700',
 background: '#DBEAFE',
 padding: '8px 14px',
 borderRadius: '6px',
 letterSpacing: '1px',
 color: '#1E3A8A',
 }}>
 {result.interviewCode}
 </span>
 </td>
 <td style={styles.td}>
 <div style={{ fontWeight: '600' }}>{result.name}</div>
 </td>
 <td style={styles.td}>
 <div style={{ fontWeight: '600' }}>{result.companyCode}</div>
 </td>
 <td style={styles.td}>
 <span style={getStatusBadgeStyle(result.round1)}>
 {result.round1 || "Pending"}
 </span>
 </td>
 <td style={styles.td}>
 <span style={getStatusBadgeStyle(result.round2)}>
 {result.round2 || "Pending"}
 </span>
 </td>
 <td style={styles.td}>
 <span style={getStatusBadgeStyle(result.round3)}>
 {result.round3 || "Pending"}
 </span>
 </td>
 <td style={styles.td}>
 <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>
 {new Date(result.createdAt).toLocaleString()}
 </div>
 </td>
 <td style={styles.td}>
 <button
 onClick={() => viewCandidateFiles(result.interviewCode)}
 style={{
 background: '#3B82F6',
 color: '#fff',
 border: 'none',
 borderRadius: '6px',
 padding: '6px 12px',
 cursor: 'pointer',
 fontSize: '0.8rem',
 fontWeight: '600',
 display: 'flex',
 alignItems: 'center',
 gap: '5px'
 }}
 >
 📂 View
 </button>
 </td>
 <td style={styles.td}>
 <button
 onClick={() => confirmDelete(result.id)}
 style={{
 background: '#EF4444',
 color: '#fff',
 border: 'none',
 borderRadius: '6px',
 padding: '6px 12px',
 cursor: 'pointer',
 fontSize: '0.8rem',
 fontWeight: '600',
 }}
 >
 Delete
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 ) : (
 <div style={styles.emptyState}>
 <div style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.3 }}>
 {searchQuery ? '🔍' : '📊'}
 </div>
 <h3 style={{ color: '#1E3A5F', marginBottom: '10px' }}>
 {searchQuery ? 'No Results Found' : 'No Results Yet'}
 </h3>
 <p>
 {searchQuery
 ? `No candidates match "${searchQuery}"`
 : 'Process candidates in HR Panel to see results here'}
 </p>
 </div>
 )}
 </div>
 )}
 </div>

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
 <svg style={{ width: '40px', height: '40px', color: '#EF4444' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
 </svg>
 </div>

 <h3 style={{ fontSize: '1.5rem', color: '#1F2937', marginBottom: '10px', fontWeight: '800' }}>Delete Record?</h3>
 <p style={{ color: '#6B7280', marginBottom: '25px', lineHeight: '1.6', fontSize: '1.05rem' }}>
 Are you sure you want to delete this interview record? <br />
 <span style={{ color: '#EF4444', fontWeight: 'bold' }}>This action cannot be undone.</span>
 </p>

 <div style={{ display: 'flex', gap: '15px' }}>
 <button
 onClick={cancelDelete}
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
 onClick={executeDelete}
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

 {/* CSS Animation */}
 <style>
 {`
 @keyframes fadeIn {
 from { opacity: 0; }
 to { opacity: 1; }
 }
 
 @keyframes popupScale {
 0% { opacity: 0; transform: scale(0.8); }
 100% { opacity: 1; transform: scale(1); }
 }
 
 @keyframes bounceIn {
 0% { opacity: 0; transform: scale(0.3); }
 50% { opacity: 1; transform: scale(1.05); }
 70% { transform: scale(0.9); }
 100% { transform: scale(1); }
 }

 @keyframes slideIn {
 from {
 opacity: 0;
 transform: translateX(100px);
 }
 to {
 opacity: 1;
 transform: translateX(0);
 }
 }
 
 * {
 box-sizing: border-box;
 }
 
 input::placeholder {
 color: #9CA3AF;
 }
 
 @media (max-width: 768px) {
 .stats-grid {
 grid-template-columns: repeat(2, 1fr) !important;
 }
 }
 `}
 </style>
 </div>
 );
};

export default JobFairPanel;