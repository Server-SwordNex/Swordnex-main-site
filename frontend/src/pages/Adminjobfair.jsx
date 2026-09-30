import React, { useEffect, useState } from "react";
import { Search, Eye, X, FileText, Download, Image as ImageIcon, CheckSquare, Square, FileSpreadsheet, FolderDown, Loader, AlertCircle } from "lucide-react";
import API_BASE_URL from "../config/apiConfig";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const AdminJobFairDashboard = () => {
 const [candidates, setCandidates] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
 const [searchType, setSearchType] = useState("all");
 const [selected, setSelected] = useState(null);
 const [selectedCandidates, setSelectedCandidates] = useState([]);
 const [isExporting, setIsExporting] = useState(false);
 const [exportProgress, setExportProgress] = useState({ current: 0, total: 0, status: "", errors: [] });

 // Base URL for your server
 const BASE_URL = API_BASE_URL;

 useEffect(() => {
 fetchCandidates();
 }, []);

 const fetchCandidates = async () => {
 try {
 const response = await fetch(`${BASE_URL}/api/jobfair`);
 if (!response.ok) throw new Error("Failed to fetch candidates");
 const data = await response.json();

 const formatted = data.map(item => ({
 id: item.id,
 code: item.interviewCode,
 name: item.name,
 fatherName: item.fathername,
 gender: item.gender,
 dob: item.dateofbirth,
 email: item.email,
 phone: item.phonenumber,
 altPhone: item.alternativenumber,
 address: item.address,
 twelfthSchool: item.schoolname,
 twelfthBoard: item.board,
 twelfthYear: item.yearofpassing,
 twelfthStream: item.stream,
 twelfthPercentage: item.percentage,
 ugCollege: item.ugcollegename,
 ugUniversity: item.uguniversityname,
 ugYear: item.ugpassedoutyear,
 ugCourse: item.ugcourse,
 ugQualification: item.ugcourse,
 ugCgpa: item.ugcgpa,
 hasPG: !!item.pgcollegename,
 pgCollege: item.pgcollegename,
 pgUniversity: item.pguniversityname,
 pgYear: item.pgpassedoutyear,
 pgQualification: item.pgqualification,
 pgCourse: item.pgcourse,
 pgCgpa: item.pgcgpa,
 skills: item.technicalskills,
 aadhaar: item.aadharnumber,
 profileImage: item.profilephoto,
 resume: item.resume,
 aadhaarFile: item.aadhaarcard,
 marksheet: item.lastsemestermarksheet,
 status: item.status || "pending",
 createdAt: item.createdAt
 }));

 setCandidates(formatted.reverse());
 } catch (error) {
 console.error("Error loading candidates:", error);
 }
 };

 const updateStatus = async (id, status) => {
 try {
 const candidate = candidates.find(c => c.code === id) || candidates.find(c => c.id === id);
 if (!candidate) return;

 const response = await fetch(`${BASE_URL}/api/jobfair/${candidate.id}`, {
 method: 'PUT',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ status }),
 });

 if (response.ok) {
 setCandidates(prev => prev.map(c => c.id === candidate.id ? { ...c, status } : c));
 if (selected && selected.id === candidate.id) {
 setSelected(prev => ({ ...prev, status }));
 }
 } else {
 alert("Failed to update status");
 }
 } catch (error) {
 console.error("Error updating status:", error);
 alert("Error updating status");
 }
 };

 const filtered = candidates.filter((c) => {
 const term = searchTerm.toLowerCase();
 if (!term) return true;

 if (searchType === "code") {
 return c.code?.toLowerCase().includes(term);
 } else if (searchType === "college") {
 return c.ugCollege?.toLowerCase().includes(term);
 } else {
 return (
 c.code?.toLowerCase().includes(term) ||
 c.ugCollege?.toLowerCase().includes(term) ||
 c.name?.toLowerCase().includes(term)
 );
 }
 });

 const handleSelectAll = () => {
 if (selectedCandidates.length === filtered.length) {
 setSelectedCandidates([]);
 } else {
 setSelectedCandidates(filtered.map((c) => c.code));
 }
 };

 const handleSelectCandidate = (code) => {
 if (selectedCandidates.includes(code)) {
 setSelectedCandidates(selectedCandidates.filter((c) => c !== code));
 } else {
 setSelectedCandidates([...selectedCandidates, code]);
 }
 };

 const isAllSelected = filtered.length > 0 && selectedCandidates.length === filtered.length;

 // =====================================================
 // FILE DOWNLOAD FUNCTIONS - USING SERVER ENDPOINTS
 // =====================================================

 const getFullFileUrl = (filePath) => {
 if (!filePath) return null;
 if (filePath.startsWith('data:')) return filePath;
 if (filePath.startsWith('http://') || filePath.startsWith('https://')) return filePath;

 let cleanPath = filePath;
 while (cleanPath.startsWith('/')) {
 cleanPath = cleanPath.substring(1);
 }
 return `${BASE_URL}/${cleanPath}`;
 };

 // Convert base64 to ArrayBuffer (for base64 data URLs)
 const base64ToArrayBuffer = (base64) => {
 try {
 let base64Data = base64;
 if (base64.includes(',')) {
 base64Data = base64.split(',')[1];
 }
 const binaryString = atob(base64Data);
 const bytes = new Uint8Array(binaryString.length);
 for (let i = 0; i < binaryString.length; i++) {
 bytes[i] = binaryString.charCodeAt(i);
 }
 return bytes.buffer;
 } catch (error) {
 console.error("Base64 conversion error:", error);
 return null;
 }
 };

 // Get extension from file path or MIME type
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
 'image/png': 'png',
 'image/jpeg': 'jpg',
 'image/jpg': 'jpg',
 'image/gif': 'gif',
 'image/webp': 'webp',
 'application/pdf': 'pdf',
 'application/msword': 'doc',
 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
 };

 return mimeMap[mimeType] || 'file';
 };

 // Fetch file using the server endpoint
 const fetchFileFromServer = async (candidateId, fileType) => {
 try {
 const url = `${BASE_URL}/api/jobfair/${candidateId}/file/${fileType}`;
 console.log(`Fetching: ${url}`);

 const response = await fetch(url);

 if (!response.ok) {
 console.log(`Server returned ${response.status} for ${fileType}`);
 return null;
 }

 const contentType = response.headers.get('content-type') || '';
 const arrayBuffer = await response.arrayBuffer();

 console.log(`✓ Fetched ${fileType}: ${arrayBuffer.byteLength} bytes`);
 return { data: arrayBuffer, mimeType: contentType };
 } catch (error) {
 console.error(`Error fetching ${fileType}:`, error);
 return null;
 }
 };

 // Process document for ZIP - tries server endpoint first, then direct base64
 const processDocumentForZip = async (folder, docName, filePath, candidateId, fileType) => {
 if (!filePath) {
 console.log(`Skipping ${docName}: No file path`);
 return { success: false, reason: 'Not uploaded' };
 }

 try {
 console.log(`Processing ${docName}...`);

 let result = null;

 // Method 1: Try server endpoint (works for base64 stored in DB)
 result = await fetchFileFromServer(candidateId, fileType);

 // Method 2: If server endpoint fails and it's a base64 data URL, convert directly
 if (!result && filePath.startsWith('data:')) {
 console.log(`Trying direct base64 conversion for ${docName}`);
 const arrayBuffer = base64ToArrayBuffer(filePath);
 if (arrayBuffer) {
 const mimeMatch = filePath.match(/data:([^;]+);/);
 result = { data: arrayBuffer, mimeType: mimeMatch ? mimeMatch[1] : '' };
 }
 }

 if (result && result.data && result.data.byteLength > 0) {
 // More robust extension detection
 const extension = getFileExtension(filePath, result.mimeType);
 const fileName = `${docName}.${extension}`;

 // Add to candidate's folder in ZIP
 folder.file(fileName, result.data);
 console.log(`✓ Added ${fileName} (${result.data.byteLength} bytes) to ZIP`);
 return { success: true, fileName };
 }

 return { success: false, reason: result ? 'Empty file content' : 'Failed to fetch' };
 } catch (error) {
 console.error(`Error processing ${docName}:`, error);
 return { success: false, reason: error.message || 'Processing error' };
 }
 };

 // =====================================================
 // EXPORT TO ZIP WITH DOCUMENTS
 // =====================================================
 const exportToZip = async () => {
 const candidatesToExport = selectedCandidates.length > 0
 ? candidates.filter((c) => selectedCandidates.includes(c.code))
 : filtered;

 if (candidatesToExport.length === 0) {
 alert("No candidates to export!");
 return;
 }

 setIsExporting(true);
 setExportProgress({
 current: 0,
 total: candidatesToExport.length,
 status: "Starting export...",
 errors: []
 });

 const errors = [];

 try {
 const zip = new JSZip();

 // Excel data
 const excelData = candidatesToExport.map((c, index) => ({
 "S.No": index + 1,
 "Interview Code": c.code,
 "Name": c.name,
 "Father's Name": c.fatherName,
 "Gender": c.gender || "-",
 "Date of Birth": c.dob,
 "Email": c.email,
 "Phone": c.phone,
 "Alternate Phone": c.altPhone || "-",
 "Address": c.address,
 "12th School": c.twelfthSchool || "-",
 "12th Board": c.twelfthBoard || "-",
 "12th Year": c.twelfthYear || "-",
 "12th Stream": c.twelfthStream || "-",
 "12th Percentage": c.twelfthPercentage || "-",
 "UG College": c.ugCollege || "-",
 "UG University": c.ugUniversity || "-",
 "UG Year": c.ugYear || "-",
 "UG Course": c.ugCourse || "-",
 "UG CGPA": c.ugCgpa || "-",
 "Has PG": c.hasPG ? "Yes" : "No",
 "PG College": c.pgCollege || "-",
 "PG University": c.pgUniversity || "-",
 "PG Year": c.pgYear || "-",
 "PG Course": c.pgCourse || "-",
 "PG CGPA": c.pgCgpa || "-",
 "Skills": c.skills || "-",
 "Aadhaar (Last 4)": c.aadhaar ? `****${c.aadhaar.slice(-4)}` : "-",
 "Status": c.status || "pending",
 "Registered On": c.createdAt ? new Date(c.createdAt).toLocaleString() : "-"
 }));

 // Create Excel
 const worksheet = XLSX.utils.json_to_sheet(excelData);
 const workbook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
 const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
 zip.file("Candidates_Data.xlsx", excelBuffer);

 // Documents folder
 const documentsFolder = zip.folder("Documents");

 // Process each candidate
 for (let i = 0; i < candidatesToExport.length; i++) {
 const candidate = candidatesToExport[i];

 setExportProgress({
 current: i + 1,
 total: candidatesToExport.length,
 status: `Processing ${candidate.name} (${i + 1}/${candidatesToExport.length})...`,
 errors: [...errors]
 });

 const candidateFolder = documentsFolder.folder(candidate.code || `candidate_${i + 1}`);

 // Info text file
 const infoText = `
CANDIDATE: ${candidate.code}
========================================
Name: ${candidate.name}
Father's Name: ${candidate.fatherName}
Gender: ${candidate.gender || "-"}
DOB: ${candidate.dob}
Email: ${candidate.email}
Phone: ${candidate.phone}
Address: ${candidate.address}

12th: ${candidate.twelfthSchool || "-"} | ${candidate.twelfthBoard || "-"} | ${candidate.twelfthPercentage || "-"}%

UG: ${candidate.ugCollege || "-"}
 ${candidate.ugCourse || "-"} | CGPA: ${candidate.ugCgpa || "-"}

${candidate.hasPG ? `PG: ${candidate.pgCollege || "-"} | ${candidate.pgCourse || "-"} | CGPA: ${candidate.pgCgpa || "-"}` : "PG: No"}

Skills: ${candidate.skills || "-"}
Status: ${candidate.status || "pending"}
Registered: ${candidate.createdAt ? new Date(candidate.createdAt).toLocaleString() : "-"}
 `.trim();

 candidateFolder.file("info.txt", infoText);

 // Download documents using server endpoint
 const documents = [
 { name: "Profile_Photo", path: candidate.profileImage, type: "profile" },
 { name: "Resume", path: candidate.resume, type: "resume" },
 { name: "Aadhaar_Card", path: candidate.aadhaarFile, type: "aadhaar" },
 { name: "Marksheet", path: candidate.marksheet, type: "marksheet" }
 ];

 let downloadedDocs = [];
 let failedDocs = [];

 for (const doc of documents) {
 if (doc.path) {
 const result = await processDocumentForZip(
 candidateFolder,
 doc.name,
 doc.path,
 candidate.id,
 doc.type
 );
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
 candidate: `${candidate.name} (${candidate.code})`,
 failed: failedDocs,
 allFailed: downloadedDocs.length === 0
 });
 }

 // Small delay to prevent blocking the UI thread
 await new Promise(resolve => setTimeout(resolve, 50));
 }

 setExportProgress({
 current: candidatesToExport.length,
 total: candidatesToExport.length,
 status: "Generating ZIP...",
 errors
 });

 // Generate ZIP
 const content = await zip.generateAsync({
 type: "blob",
 compression: "DEFLATE",
 compressionOptions: { level: 6 }
 });

 const timestamp = new Date().toISOString().slice(0, 10);
 saveAs(content, `JobFair_Export_${timestamp}.zip`);

 setExportProgress({
 current: 0,
 total: 0,
 status: errors.length > 0
 ? `Done! ${errors.length} candidates have some missing documents.`
 : "Export completed successfully!",
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

 // Excel only export
 const exportExcelOnly = () => {
 const candidatesToExport = selectedCandidates.length > 0
 ? candidates.filter((c) => selectedCandidates.includes(c.code))
 : filtered;

 if (candidatesToExport.length === 0) {
 alert("No candidates to export!");
 return;
 }

 const excelData = candidatesToExport.map((c, index) => ({
 "S.No": index + 1,
 "Interview Code": c.code,
 "Name": c.name,
 "Father's Name": c.fatherName,
 "Gender": c.gender || "-",
 "Date of Birth": c.dob,
 "Email": c.email,
 "Phone": c.phone,
 "Alternate Phone": c.altPhone || "-",
 "Address": c.address,
 "12th School": c.twelfthSchool || "-",
 "12th Board": c.twelfthBoard || "-",
 "12th Year": c.twelfthYear || "-",
 "12th Stream": c.twelfthStream || "-",
 "12th Percentage": c.twelfthPercentage || "-",
 "UG College": c.ugCollege || "-",
 "UG University": c.ugUniversity || "-",
 "UG Year": c.ugYear || "-",
 "UG Course": c.ugCourse || "-",
 "UG CGPA": c.ugCgpa || "-",
 "Has PG": c.hasPG ? "Yes" : "No",
 "PG College": c.pgCollege || "-",
 "PG University": c.pgUniversity || "-",
 "PG Year": c.pgYear || "-",
 "PG Course": c.pgCourse || "-",
 "PG CGPA": c.pgCgpa || "-",
 "Skills": c.skills || "-",
 "Aadhaar (Last 4)": c.aadhaar ? `****${c.aadhaar.slice(-4)}` : "-",
 "Status": c.status || "pending",
 "Registered On": c.createdAt ? new Date(c.createdAt).toLocaleString() : "-"
 }));

 const worksheet = XLSX.utils.json_to_sheet(excelData);
 const workbook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");

 const timestamp = new Date().toISOString().slice(0, 10);
 XLSX.writeFile(workbook, `Candidates_${timestamp}.xlsx`);
 };

 // File Preview component
 const FilePreview = ({ label, fileUrl }) => {
 if (!fileUrl) return <p className="text-gray-400">{label}: Not uploaded</p>;

 const fullUrl = getFullFileUrl(fileUrl);
 const isImage = fileUrl.startsWith("data:image/") || /\.(jpg|jpeg|png|webp|gif)$/i.test(fileUrl);
 const isPDF = fileUrl.startsWith("data:application/pdf") || /\.pdf$/i.test(fileUrl);

 return (
 <div className="flex items-center gap-3 pb-3">
 <span className="font-medium min-w-36">{label}:</span>
 <a
 href={fullUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2 text-blue-600 hover:text-blue-800 underline font-medium"
 >
 {isImage && <ImageIcon size={18} />}
 {isPDF && <FileText size={18} />}
 {!isImage && !isPDF && <FileText size={18} />}
 <span>View / Download</span>
 <Download size={16} />
 </a>
 </div>
 );
 };

 const deleteCandidate = async () => {
 if (!selected) return;

 try {
 const response = await fetch(`${BASE_URL}/api/jobfair/${selected.id}`, {
 method: 'DELETE',
 });

 if (response.ok) {
 setCandidates(prev => prev.filter(c => c.id !== selected.id));
 setSelected(null);
 } else {
 console.error("Failed to delete");
 }
 } catch (error) {
 console.error("Delete error:", error);
 }
 };

 return (
 <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 p-6">

 {/* Export Progress Modal */}
 {isExporting && (
 <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]">
 <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
 <div className="flex flex-col items-center">
 <Loader className="w-16 h-16 text-blue-600 animate-spin mb-4" />
 <h3 className="text-xl font-bold text-gray-800 mb-2">Exporting Data...</h3>
 <p className="text-gray-600 text-center mb-4">{exportProgress.status}</p>

 {exportProgress.total > 0 && (
 <>
 <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
 <div
 className="bg-blue-600 h-3 rounded-full transition-all"
 style={{ width: `${(exportProgress.current / exportProgress.total) * 100}%` }}
 ></div>
 </div>
 <p className="text-sm text-gray-500">
 {exportProgress.current} of {exportProgress.total}
 </p>
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

 {/* Header */}
 <div className="relative w-full mb-6 rounded-2xl overflow-hidden shadow-lg">
 <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700"></div>
 <div className="relative z-10 p-6 md:p-8">
 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 text-white">
 <div>
 <h1 className="text-2xl md:text-3xl font-bold">SwordNex Job Fair</h1>
 <p className="text-blue-100 text-sm mt-1">Admin Dashboard</p>
 <div className="mt-3 flex flex-wrap gap-3">
 <span className="bg-white/10 px-4 py-1.5 rounded-full text-sm">
 Total: <b>{candidates.length}</b>
 </span>
 <span className="bg-green-500/30 px-4 py-1.5 rounded-full text-sm">
 Selected: <b>{candidates.filter(c => c.status === "selected").length}</b>
 </span>
 <span className="bg-red-500/30 px-4 py-1.5 rounded-full text-sm">
 Rejected: <b>{candidates.filter(c => c.status === "rejected").length}</b>
 </span>
 </div>
 </div>
 </div>

 {/* Search & Actions */}
 <div className="mt-6 flex flex-col lg:flex-row gap-4">
 <div className="flex-1 flex flex-col sm:flex-row gap-3">
 <select
 value={searchType}
 onChange={(e) => setSearchType(e.target.value)}
 className="px-4 py-3 rounded-xl bg-white/95 text-gray-800 font-medium"
 >
 <option value="all">Search All</option>
 <option value="code">By Code</option>
 <option value="college">By College</option>
 </select>
 <div className="relative flex-1">
 <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
 <input
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 placeholder="Search..."
 className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/95 text-gray-800"
 />
 </div>
 </div>

 <div className="flex flex-wrap gap-3">
 <button
 onClick={handleSelectAll}
 className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold ${isAllSelected ? "bg-yellow-400 text-yellow-900" : "bg-white/20 text-white"
 }`}
 >
 {isAllSelected ? <CheckSquare size={20} /> : <Square size={20} />}
 {isAllSelected ? "Deselect" : "Select All"}
 {selectedCandidates.length > 0 && (
 <span className="bg-white/30 px-2 py-0.5 rounded-full text-sm">
 {selectedCandidates.length}
 </span>
 )}
 </button>

 <button
 onClick={exportExcelOnly}
 className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600"
 >
 <FileSpreadsheet size={20} />
 Excel
 </button>

 <button
 onClick={exportToZip}
 disabled={isExporting}
 className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold ${isExporting ? "bg-gray-400" : "bg-indigo-500 hover:bg-indigo-600"
 } text-white`}
 >
 <FolderDown size={20} />
 {isExporting ? "Exporting..." : "ZIP + Docs"}
 </button>
 </div>
 </div>

 {selectedCandidates.length > 0 && (
 <div className="mt-4 bg-yellow-400/20 px-4 py-2 rounded-xl text-yellow-100 text-sm">
 <b>{selectedCandidates.length}</b> selected
 </div>
 )}
 </div>
 </div>

 {/* Table */}
 <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
 <table className="w-full text-sm">
 <thead className="bg-blue-600 text-white sticky top-0 z-10">
 <tr>
 <th className="px-4 py-4 text-center w-12">
 <button onClick={handleSelectAll}>
 {isAllSelected ? <CheckSquare size={20} /> : <Square size={20} />}
 </button>
 </th>
 <th className="px-4 py-4 text-left">Code</th>
 <th className="px-4 py-4 text-left">Name</th>
 <th className="px-4 py-4 text-left">College</th>
 <th className="px-4 py-4 text-left">Phone</th>
 <th className="px-4 py-4 text-left">Course</th>
 <th className="px-4 py-4 text-center">CGPA</th>
 <th className="px-4 py-4 text-left">PG</th>
 <th className="px-4 py-4 text-center">View</th>
 </tr>
 </thead>
 <tbody>
 {filtered.map((c, i) => (
 <tr
 key={c.id || i}
 className={`border-b cursor-pointer ${selectedCandidates.includes(c.code) ? "bg-yellow-50"
 : c.status === "selected" ? "bg-green-50"
 : c.status === "rejected" ? "bg-red-50"
 : " "
 }`}
 onClick={() => handleSelectCandidate(c.code)}
 >
 <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
 <button onClick={() => handleSelectCandidate(c.code)}>
 {selectedCandidates.includes(c.code)
 ? <CheckSquare size={20} className="text-yellow-600" />
 : <Square size={20} className="text-blue-600" />
 }
 </button>
 </td>
 <td className="px-4 py-4 font-mono font-medium text-blue-700">{c.code}</td>
 <td className="px-4 py-4 font-medium">{c.name}</td>
 <td className="px-4 py-4">{c.ugCollege}</td>
 <td className="px-4 py-4">{c.phone}</td>
 <td className="px-4 py-4">{c.ugQualification}</td>
 <td className="px-4 py-4 text-center font-semibold">{c.ugCgpa}</td>
 <td className="px-4 py-4">
 <span className={`px-2 py-1 rounded-full text-xs ${c.hasPG ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-500"
 }`}>
 {c.hasPG ? "Yes" : "No"}
 </span>
 </td>
 <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
 <button
 onClick={() => setSelected(c)}
 className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg"
 >
 <Eye size={20} />
 </button>
 </td>
 </tr>
 ))}
 {filtered.length === 0 && (
 <tr>
 <td colSpan="9" className="px-6 py-16 text-center text-gray-500">
 No candidates found
 </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>

 <div className="mt-4 text-center text-gray-500 text-sm">
 Showing {filtered.length} of {candidates.length}
 </div>

 {/* Detail Modal */}
 {selected && (
 <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
 <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto">
 <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 flex justify-between items-center sticky top-0 z-10">
 <h2 className="text-2xl font-bold">Candidate Details</h2>
 <button onClick={() => setSelected(null)} className=" p-2 rounded-lg">
 <X size={24} />
 </button>
 </div>

 <div className="p-6 space-y-6">
 {/* Code */}
 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl text-center">
 <p className="text-sm text-blue-100">Interview Code</p>
 <p className="text-3xl font-mono font-bold">{selected.code}</p>
 </div>

 {/* Personal */}
 <div className="border-b pb-6">
 <h3 className="text-lg font-bold text-gray-800 mb-4">👤 Personal Information</h3>
 <div className="grid md:grid-cols-2 gap-4 text-sm">
 <p><b>Name:</b> {selected.name}</p>
 <p><b>Father:</b> {selected.fatherName}</p>
 <p><b>Gender:</b> {selected.gender || "—"}</p>
 <p><b>DOB:</b> {selected.dob}</p>
 <p><b>Email:</b> {selected.email}</p>
 <p><b>Phone:</b> {selected.phone}</p>
 <p><b>Alt Phone:</b> {selected.altPhone || "—"}</p>
 <p className="md:col-span-2"><b>Address:</b> {selected.address}</p>
 </div>
 </div>

 {/* 12th */}
 <div className="border-b pb-6">
 <h3 className="text-lg font-bold text-purple-700 mb-4">📚 12th Standard</h3>
 <div className="grid md:grid-cols-3 gap-4 text-sm bg-purple-50 p-4 rounded-xl">
 <p><b>School:</b> {selected.twelfthSchool || "—"}</p>
 <p><b>Board:</b> {selected.twelfthBoard || "—"}</p>
 <p><b>Year:</b> {selected.twelfthYear || "—"}</p>
 <p><b>Stream:</b> {selected.twelfthStream || "—"}</p>
 <p><b>Percentage:</b> {selected.twelfthPercentage || "—"}</p>
 </div>
 </div>

 {/* UG */}
 <div className="border-b pb-6">
 <h3 className="text-lg font-bold text-blue-700 mb-4">🎓 UG Details</h3>
 <div className="grid md:grid-cols-3 gap-4 text-sm bg-blue-50 p-4 rounded-xl">
 <p><b>College:</b> {selected.ugCollege || "—"}</p>
 <p><b>University:</b> {selected.ugUniversity || "—"}</p>
 <p><b>Year:</b> {selected.ugYear || "—"}</p>
 <p><b>Course:</b> {selected.ugCourse || "—"}</p>
 <p><b>CGPA:</b> <span className="font-bold text-blue-700">{selected.ugCgpa || "—"}</span></p>
 </div>
 </div>

 {/* PG */}
 {selected.hasPG && (
 <div className="border-b pb-6">
 <h3 className="text-lg font-bold text-green-700 mb-4">🎓 PG Details</h3>
 <div className="grid md:grid-cols-3 gap-4 text-sm bg-green-50 p-4 rounded-xl">
 <p><b>College:</b> {selected.pgCollege || "—"}</p>
 <p><b>University:</b> {selected.pgUniversity || "—"}</p>
 <p><b>Year:</b> {selected.pgYear || "—"}</p>
 <p><b>Course:</b> {selected.pgCourse || "—"}</p>
 <p><b>CGPA:</b> <span className="font-bold text-green-700">{selected.pgCgpa || "—"}</span></p>
 </div>
 </div>
 )}

 {/* Skills */}
 <div className="border-b pb-6">
 <h3 className="text-lg font-bold text-orange-700 mb-4">💡 Other Info</h3>
 <div className="grid md:grid-cols-2 gap-4 text-sm">
 <p><b>Skills:</b> {selected.skills || "—"}</p>
 <p><b>Aadhaar:</b> ****{selected.aadhaar?.slice(-4)}</p>
 <p>
 <b>Status:</b>
 <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${selected.status === "selected" ? "bg-green-100 text-green-700"
 : selected.status === "rejected" ? "bg-red-100 text-red-700"
 : "bg-gray-100 text-gray-600"
 }`}>
 {selected.status || "Pending"}
 </span>
 </p>
 <p><b>Registered:</b> {new Date(selected.createdAt).toLocaleString()}</p>
 </div>
 </div>

 {/* Documents */}
 <div>
 <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
 <FileText className="text-blue-600" /> Documents
 </h3>
 <div className="space-y-3 bg-gray-50 p-5 rounded-xl">
 <FilePreview label="Profile Photo" fileUrl={selected.profileImage} />
 <FilePreview label="Resume" fileUrl={selected.resume} />
 <FilePreview label="Aadhaar Card" fileUrl={selected.aadhaarFile} />
 <FilePreview label="Marksheet" fileUrl={selected.marksheet} />
 </div>
 </div>
 </div>

 {/* Actions */}
 <div className="bg-gray-50 p-5 flex flex-wrap justify-end gap-3 border-t sticky bottom-0">
 <button
 onClick={deleteCandidate}
 className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold"
 >
 Delete
 </button>
 <button
 onClick={() => updateStatus(selected.code, "rejected")}
 className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
 >
 Reject
 </button>
 <button
 onClick={() => updateStatus(selected.code, "selected")}
 className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
 >
 Select
 </button>
 <button
 onClick={() => setSelected(null)}
 className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-xl"
 >
 Close
 </button>
 </div>
 </div>
 </div>
 )}
 </div>
 );
};

export default AdminJobFairDashboard;
