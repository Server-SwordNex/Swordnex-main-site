import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/FirebaseConfig';

// Heroicons (outline)
import {
 AcademicCapIcon,
 HeartIcon,
 ClockIcon,
 ArrowTrendingUpIcon, // replace TrendingUpIcon
 FaceSmileIcon, // replace FaceSmileIcon
 ChevronDownIcon,
 GlobeAltIcon // replace GlobeIcon
} from '@heroicons/react/24/outline';
// import { GlobeAltIcon } from "@heroicons/react/24/solid";

// Lucide icons (rename if needed to avoid conflicts)
import {
 Users as UsersIcon,
 Briefcase as BriefcaseIcon,
 Rocket as RocketIcon,
 Sparkles as SparklesIcon,
 Code as CodeIcon,
 X as XMarkIcon,
 Plus as PlusIcon,
 Send as PaperAirplaneIcon,
 FileText as FileTextIcon
} from 'lucide-react';


// --- Utility Components (Animation Hook & Wrapper) ---
const useIntersectionObserver = (ref, options = {}) => {
 const [isVisible, setIsVisible] = useState(false);
 useEffect(() => {
 const observer = new IntersectionObserver(([entry]) => {
 if (entry.isIntersecting) {
 setIsVisible(true);
 observer.unobserve(entry.target);
 }
 }, { threshold: 0.1, ...options });

 if (ref.current) observer.observe(ref.current);
 return () => ref.current && observer.unobserve(ref.current);
 }, [ref, options]);
 return isVisible;
};

const AnimatedSection = ({ children, className = '', delay = 0 }) => {
 const ref = useRef(null);
 const isVisible = useIntersectionObserver(ref);
 return (
 <div
 ref={ref}
 className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
 } ${className}`}
 style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
 >
 {children}
 </div>
 );
};

// --- Benefit Card Component (Moved to top level to resolve ReferenceError) ---
const benefits = [
 { icon: AcademicCapIcon, title: 'Learning & Growth', description: 'Get an annual learning budget of ₹50,000+ to upskill yourself. Access premium online courses, attend conferences, and get mentorship from industry experts.', color: 'bg-purple-700 text-white', borderColor: 'border-purple-800' },
 { icon: HeartIcon, title: 'Health & Wellness', description: 'We provide comprehensive health insurance covering medical, dental, and vision care for you and your family. Additionally, we offer wellness programs, gym memberships, and mental health support.', color: 'bg-red-700 text-white', borderColor: 'border-red-800' },
 { icon: ClockIcon, title: 'Work-Life Balance', description: 'Enjoy flexible working hours, remote work options, and 25+ days of paid leave annually. We believe in sustainable productivity and your personal well-being.', color: 'bg-blue-700 text-white', borderColor: 'border-blue-800' },
 { icon: GlobeAltIcon, title: 'Global Exposure', description: 'Work with international clients across 15+ countries. Collaborate with top-tier brands and stay updated with cutting-edge technologies and practices.', color: 'bg-green-700 text-white', borderColor: 'border-green-800' },
 { icon: ArrowTrendingUpIcon, title: 'Fast Career Growth', description: 'Clear career progression with quarterly reviews. Promotions based on merit, with opportunities to lead teams and take on challenging projects.', color: 'bg-yellow-700 text-white', borderColor: 'border-yellow-800' },
 { icon: FaceSmileIcon, title: 'Fun Culture', description: 'Regular team outings, celebration of milestones, sports tournaments, and a vibrant office environment. We believe work should be enjoyable!', color: 'bg-pink-700 text-white', borderColor: 'border-pink-800' },
];

// BenefitCard component
const BenefitCard = ({ benefit, index }) => {
 const [showPopup, setShowPopup] = useState(false);
 const IconComponent = benefit.icon;

 return (
 <>
 <AnimatedSection delay={index * 100}>
 <button
 onClick={() => setShowPopup(true)}
 className={`bg-white rounded-2xl p-6 border ${benefit.borderColor} shadow-md hover:shadow-xl hover:border-slate-400 transition-all duration-300 transform hover:scale-105 text-left w-full cursor-pointer group`}
 >
 <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${benefit.color} group-hover:scale-110 transition-transform duration-300`}>
 <IconComponent className="w-7 h-7" />
 </div>
 <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
 {benefit.title}
 </h3>
 <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
 <div className="mt-4 text-blue-600 font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
 Learn more <ChevronDownIcon className="w-4 h-4" />
 </div>
 </button>
 </AnimatedSection>

 {showPopup && (
 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
 <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 animate-slideUp">
 <div className={`flex items-center gap-4 p-6 rounded-t-2xl ${benefit.color}`}>
 <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${benefit.color}`}>
 <IconComponent className="w-7 h-7" />
 </div>
 <h2 className="text-xl font-bold text-slate-00">{benefit.title}</h2>
 </div>

 <div className="p-6">
 <p className="text-gray-700 leading-relaxed mb-6">{benefit.description}</p>
 <button
 onClick={() => setShowPopup(false)}
 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
 >
 Close
 </button>
 </div>
 </div>
 </div>
 )}
 </>
 );
};


// ------------------------------
// Main Career Page Component
// ------------------------------
const CareerPage = () => {
 const navigate = useNavigate();
 const [selectedRoles, setSelectedRoles] = useState([]);
 const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
 const [skills, setSkills] = useState([]);
 const [skillInput, setSkillInput] = useState('');
 const [formData, setFormData] = useState({
 firstName: '',
 lastName: '',
 email: '',
 phone: '',
 linkedin: '',
 portfolio: '',
 resumeFile: null,
 experience: '',
 expectedSalary: '',
 noticePeriod: '',
 coverLetter: '',
 howDidYouHear: '',
 currentCompany: '',
 currentRole: '',
 education: '',
 referralCode: ''
 });
 const [isSubmitting, setIsSubmitting] = useState(false);

 // --- Data Definitions ---
 const roles = [
 // Engineering & Development Roles
 { id: 'software-engineer', title: 'Software Engineer', department: 'Engineering & Development' },
 { id: 'senior-software-engineer', title: 'Senior Software Engineer', department: 'Engineering & Development' },
 { id: 'principal-software-engineer', title: 'Principal Software Engineer', department: 'Engineering & Development' },
 { id: 'staff-software-engineer', title: 'Staff Software Engineer', department: 'Engineering & Development' },
 { id: 'frontend-developer', title: 'Frontend Developer', department: 'Engineering & Development' },
 { id: 'backend-developer', title: 'Backend Developer', department: 'Engineering & Development' },
 { id: 'full-stack-developer', title: 'Full Stack Developer', department: 'Engineering & Development' },
 { id: 'web-developer', title: 'Web Developer', department: 'Engineering & Development' },
 { id: 'mobile-app-developer-android', title: 'Mobile App Developer (Android)', department: 'Engineering & Development' },
 { id: 'mobile-app-developer-ios', title: 'Mobile App Developer (iOS)', department: 'Engineering & Development' },
 { id: 'react-developer', title: 'React Developer', department: 'Engineering & Development' },
 { id: 'angular-developer', title: 'Angular Developer', department: 'Engineering & Development' },
 { id: 'vue-js-developer', title: 'Vue.js Developer', department: 'Engineering & Development' },
 { id: 'node-js-developer', title: 'Node.js Developer', department: 'Engineering & Development' },
 { id: 'java-developer', title: 'Java Developer', department: 'Engineering & Development' },
 { id: 'python-developer', title: 'Python Developer', department: 'Engineering & Development' },
 { id: 'net-developer', title: '.NET Developer', department: 'Engineering & Development' },
 { id: 'php-developer', title: 'PHP Developer', department: 'Engineering & Development' },
 { id: 'golang-developer', title: 'Golang Developer', department: 'Engineering & Development' },
 { id: 'ruby-on-rails-developer', title: 'Ruby on Rails Developer', department: 'Engineering & Development' },

 // Data & AI Roles
 { id: 'data-analyst', title: 'Data Analyst', department: 'Data & AI' },
 { id: 'senior-data-analyst', title: 'Senior Data Analyst', department: 'Data & AI' },
 { id: 'data-engineer', title: 'Data Engineer', department: 'Data & AI' },
 { id: 'big-data-engineer', title: 'Big Data Engineer', department: 'Data & AI' },
 { id: 'bi-developer', title: 'Business Intelligence (BI) Developer', department: 'Data & AI' },
 { id: 'data-scientist', title: 'Data Scientist', department: 'Data & AI' },
 { id: 'machine-learning-engineer', title: 'Machine Learning Engineer', department: 'Data & AI' },
 { id: 'ai-engineer', title: 'AI Engineer', department: 'Data & AI' },
 { id: 'nlp-engineer', title: 'NLP Engineer', department: 'Data & AI' },
 { id: 'computer-vision-engineer', title: 'Computer Vision Engineer', department: 'Data & AI' },

 // Cloud, DevOps & Infrastructure
 { id: 'devops-engineer', title: 'DevOps Engineer', department: 'Cloud, DevOps & Infrastructure' },
 { id: 'sre', title: 'Site Reliability Engineer (SRE)', department: 'Cloud, DevOps & Infrastructure' },
 { id: 'cloud-engineer', title: 'Cloud Engineer', department: 'Cloud, DevOps & Infrastructure' },
 { id: 'aws-engineer', title: 'AWS Engineer', department: 'Cloud, DevOps & Infrastructure' },
 { id: 'azure-engineer', title: 'Azure Engineer', department: 'Cloud, DevOps & Infrastructure' },
 { id: 'google-cloud-engineer', title: 'Google Cloud Engineer', department: 'Cloud, DevOps & Infrastructure' },
 { id: 'infrastructure-engineer', title: 'Infrastructure Engineer', department: 'Cloud, DevOps & Infrastructure' },
 { id: 'platform-engineer', title: 'Platform Engineer', department: 'Cloud, DevOps & Infrastructure' },
 { id: 'build-release-engineer', title: 'Build & Release Engineer', department: 'Cloud, DevOps & Infrastructure' },
 { id: 'systems-engineer', title: 'Systems Engineer', department: 'Cloud, DevOps & Infrastructure' },

 // Cybersecurity & Compliance
 { id: 'cybersecurity-engineer', title: 'Cybersecurity Engineer', department: 'Cybersecurity & Compliance' },
 { id: 'application-security-engineer', title: 'Application Security Engineer', department: 'Cybersecurity & Compliance' },
 { id: 'cloud-security-engineer', title: 'Cloud Security Engineer', department: 'Cybersecurity & Compliance' },
 { id: 'security-analyst', title: 'Security Analyst', department: 'Cybersecurity & Compliance' },
 { id: 'penetration-tester', title: 'Penetration Tester (Ethical Hacker)', department: 'Cybersecurity & Compliance' },
 { id: 'soc-analyst', title: 'SOC Analyst', department: 'Cybersecurity & Compliance' },
 { id: 'grc-analyst', title: 'GRC Analyst', department: 'Cybersecurity & Compliance' },
 { id: 'iam-engineer', title: 'IAM Engineer', department: 'Cybersecurity & Compliance' },
 { id: 'security-architect', title: 'Security Architect', department: 'Cybersecurity & Compliance' },
 { id: 'information-security-manager', title: 'Information Security Manager', department: 'Cybersecurity & Compliance' },

 // Quality Assurance & Testing
 { id: 'qa-engineer', title: 'QA Engineer', department: 'Quality Assurance & Testing' },
 { id: 'manual-test-engineer', title: 'Manual Test Engineer', department: 'Quality Assurance & Testing' },
 { id: 'automation-test-engineer', title: 'Automation Test Engineer', department: 'Quality Assurance & Testing' },
 { id: 'sdet', title: 'SDET (Software Development Engineer in Test)', department: 'Quality Assurance & Testing' },
 { id: 'performance-test-engineer', title: 'Performance Test Engineer', department: 'Quality Assurance & Testing' },
 { id: 'load-stress-test-engineer', title: 'Load & Stress Test Engineer', department: 'Quality Assurance & Testing' },
 { id: 'mobile-app-tester', title: 'Mobile App Tester', department: 'Quality Assurance & Testing' },
 { id: 'api-test-engineer', title: 'API Test Engineer', department: 'Quality Assurance & Testing' },
 { id: 'qa-lead', title: 'QA Lead', department: 'Quality Assurance & Testing' },
 { id: 'test-manager', title: 'Test Manager', department: 'Quality Assurance & Testing' },

 // UI/UX, Design & Creative
 { id: 'ui-designer', title: 'UI Designer', department: 'UI/UX, Design & Creative' },
 { id: 'ux-designer', title: 'UX Designer', department: 'UI/UX, Design & Creative' },
 { id: 'product-designer', title: 'Product Designer', department: 'UI/UX, Design & Creative' },
 { id: 'interaction-designer', title: 'Interaction Designer', department: 'UI/UX, Design & Creative' },
 { id: 'visual-designer', title: 'Visual Designer', department: 'UI/UX, Design & Creative' },
 { id: 'motion-graphics-designer', title: 'Motion Graphics Designer', department: 'UI/UX, Design & Creative' },
 { id: 'graphic-designer', title: 'Graphic Designer', department: 'UI/UX, Design & Creative' },
 { id: 'design-systems-engineer', title: 'Design Systems Engineer', department: 'UI/UX, Design & Creative' },
 { id: 'ux-researcher', title: 'UX Researcher', department: 'UI/UX, Design & Creative' },
 { id: 'accessibility-specialist', title: 'Accessibility Specialist', department: 'UI/UX, Design & Creative' },

 // Product & Project Management
 { id: 'product-manager', title: 'Product Manager', department: 'Product & Project Management' },
 { id: 'associate-product-manager', title: 'Associate Product Manager', department: 'Product & Project Management' },
 { id: 'technical-product-manager', title: 'Technical Product Manager', department: 'Product & Project Management' },
 { id: 'product-owner', title: 'Product Owner', department: 'Product & Project Management' },
 { id: 'project-manager', title: 'Project Manager', department: 'Product & Project Management' },
 { id: 'program-manager', title: 'Program Manager', department: 'Product & Project Management' },
 { id: 'delivery-manager', title: 'Delivery Manager', department: 'Product & Project Management' },
 { id: 'scrum-master', title: 'Scrum Master', department: 'Product & Project Management' },
 { id: 'agile-coach', title: 'Agile Coach', department: 'Product & Project Management' },
 { id: 'business-analyst', title: 'Business Analyst', department: 'Product & Project Management' },

 // Sales, Marketing & Growth
 { id: 'digital-marketing-specialist', title: 'Digital Marketing Specialist', department: 'Sales, Marketing & Growth' },
 { id: 'growth-marketer', title: 'Growth Marketer', department: 'Sales, Marketing & Growth' },
 { id: 'performance-marketing-manager', title: 'Performance Marketing Manager', department: 'Sales, Marketing & Growth' },
 { id: 'seo-specialist', title: 'SEO Specialist', department: 'Sales, Marketing & Growth' },
 { id: 'content-strategist', title: 'Content Strategist', department: 'Sales, Marketing & Growth' },
 { id: 'technical-content-writer', title: 'Technical Content Writer', department: 'Sales, Marketing & Growth' },
 { id: 'social-media-manager', title: 'Social Media Manager', department: 'Sales, Marketing & Growth' },
 { id: 'sdr', title: 'Sales Development Representative (SDR)', department: 'Sales, Marketing & Growth' },
 { id: 'account-executive', title: 'Account Executive', department: 'Sales, Marketing & Growth' },
 { id: 'customer-success-manager', title: 'Customer Success Manager', department: 'Sales, Marketing & Growth' },

 // Operations, Support & Leadership
 { id: 'technical-support-engineer', title: 'Technical Support Engineer', department: 'Operations, Support & Leadership' },
 { id: 'customer-support-specialist', title: 'Customer Support Specialist', department: 'Operations, Support & Leadership' },
 { id: 'it-support-engineer', title: 'IT Support Engineer', department: 'Operations, Support & Leadership' },
 { id: 'solutions-architect', title: 'Solutions Architect', department: 'Operations, Support & Leadership' },
 { id: 'pre-sales-engineer', title: 'Pre-Sales Engineer', department: 'Operations, Support & Leadership' },
 { id: 'engineering-manager', title: 'Engineering Manager', department: 'Operations, Support & Leadership' },
 { id: 'director-of-engineering', title: 'Director of Engineering', department: 'Operations, Support & Leadership' },
 { id: 'cto', title: 'Chief Technology Officer (CTO)', department: 'Operations, Support & Leadership' },
 { id: 'cpo', title: 'Chief Product Officer (CPO)', department: 'Operations, Support & Leadership' },
 { id: 'ceo', title: 'Chief Executive Officer (CEO)', department: 'Operations, Support & Leadership' },
 ];

 const experienceOptions = ["Fresher", "0-1", "1-2", "2-4", "4+"];
 const noticePeriodOptions = ["Immediate", "15 Days", "30 Days", "60 Days", "90 Days"];
 const suggestedSkills = ['React', 'Python', 'SQL', 'Cloud', 'Agile', 'Communication'];
 const benefits = [
 { icon: HeartIcon, title: 'Health & Wellness', description: 'Comprehensive health insurance for you and your family', color: 'bg-red-50 text-red-600 border-red-100' },
 { icon: AcademicCapIcon, title: 'Learning & Growth', description: 'Annual learning budget and access to premium courses', color: 'bg-purple-50 text-purple-600 border-purple-100' },
 { icon: ClockIcon, title: 'Work-Life Balance', description: 'Flexible working hours and remote work options', color: 'bg-green-50 text-green-600 border-green-100' }
 ];

 // --- Handlers ---
 const toggleRole = (roleId) => {
 setSelectedRoles(prev => prev.includes(roleId) ? prev.filter(id => id !== roleId) : [...prev, roleId]);
 };

 const removeRole = (roleId) => setSelectedRoles(prev => prev.filter(id => id !== roleId));
 const addSkill = (skill) => skill && !skills.includes(skill) && (setSkills(prev => [...prev, skill]), setSkillInput(''));
 const removeSkill = (skill) => setSkills(prev => prev.filter(s => s !== skill));
 const handleKeyPress = (e) => e.key === 'Enter' && addSkill(skillInput.trim());

 const handleFileChange = (e) => {
 setFormData(prev => ({ ...prev, resumeFile: e.target.files[0] }));
 };

 const handleInputChange = (e) => {
 const { name, value } = e.target;
 setFormData(prev => ({ ...prev, [name]: value }));
 };

 // Helper: convert File to data URL for persistence
 const fileToDataUrl = (file) => {
 return new Promise((resolve, reject) => {
 const reader = new FileReader();
 reader.onload = () => resolve(reader.result);
 reader.onerror = reject;
 reader.readAsDataURL(file);
 });
 };

 // In CareerPage.jsx - Update handleSubmit function

 const handleSubmit = async (e) => {
 e.preventDefault();

 if (selectedRoles.length === 0) return alert("Please select at least one role you're interested in.");
 if (skills.length === 0) return alert('Please add at least one skill.');
 if (!formData.resumeFile) return alert('Please upload your resume.');
 if (!formData.linkedin) return alert('Please provide your LinkedIn profile URL.');

 setIsSubmitting(true);

 // Upload resume to Firebase Storage
 let resumeUrl = '';
 try {
 if (formData.resumeFile) {
 if (formData.resumeFile.size > 5 * 1024 * 1024) {
 alert('Resume file is too large. Max 5MB allowed.');
 setIsSubmitting(false);
 return;
 }
 const timestamp = Date.now();
 const storageRef = ref(storage, `resumes/${timestamp}_${formData.resumeFile.name}`);
 const snapshot = await uploadBytes(storageRef, formData.resumeFile);
 resumeUrl = await getDownloadURL(snapshot.ref);
 }
 } catch (err) {
 console.error('Failed to upload resume:', err);
 alert('Failed to upload resume. Please try again.');
 setIsSubmitting(false);
 return;
 }

 // Construct payload matching backend expectation
 const payload = {
 // Personal ID
 id: Date.now(),

 // Personal Info
 firstName: formData.firstName,
 lastName: formData.lastName,
 // Backend constructs fullName, but we send it too
 fullName: `${formData.firstName} ${formData.lastName}`.trim(),
 email: formData.email,
 phone: formData.phone,
 contact: formData.phone, // Send as contact as well

 // Professional
 linkedin: formData.linkedin,
 portfolio: formData.portfolio,
 currentCompany: formData.currentCompany,
 currentEmployer: formData.currentCompany, // Backend alias
 currentRole: formData.currentRole,
 experience: formData.experience,
 experienceInYears: formData.experience, // Backend alias
 education: formData.education,
 expectedCTC: formData.expectedSalary,
 noticePeriod: formData.noticePeriod,

 // Application Info
 roleOfInterest: selectedRoles.map(getRoleTitle).join(', '),
 skillsArray: skills,
 skillSet: skills.join(', '),
 howDidYouKnow: formData.howDidYouHear, // Backend alias
 referralCode: formData.referralCode,
 message: formData.coverLetter, // Map cover letter to message

 // Resume
 resumeURL: resumeUrl, // Send Data URL
 resumeFileName: formData.resumeFile.name,
 resumeFileSize: formData.resumeFile.size,
 resumeFileType: formData.resumeFile.type,

 // Meta
 status: 'New',
 submittedAt: new Date().toISOString(),
 source: 'web_career_page'
 };

 try {
 const response = await fetch(`${API_BASE_URL}/api/careers`, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify(payload),
 });

 const data = await response.json();

 if (response.ok) {
 // Success handling
 await new Promise(resolve => setTimeout(resolve, 1500));
 navigate('/Job', { state: { application: payload } });
 } else {
 console.error("Server Error:", data);
 alert(`Failed to submit application: ${data.error || data.message || "Unknown error"}`);
 }
 } catch (error) {
 console.error("Error submitting application:", error);
 alert(`Submission failed: ${error.message || "Network error. Please try again later."}`);
 } finally {
 setIsSubmitting(false);
 }
 };

 const scrollToForm = () => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
 const getRoleTitle = (roleId) => roles.find(r => r.id === roleId)?.title || roleId;

 // --- Custom Animations CSS ---
 const customStyles = (
 <style>{`
 @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
 @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
 @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

 .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
 .animate-slideUp { animation: slideUp 0.5s ease-out; }
 .animate-float { animation: float 3s ease-in-out infinite; }
 `}</style>
 );

 return (
 <div className="min-h-screen bg-white">
 {customStyles}

 {/* Hero Section */}
 <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20">
 <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
 <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
 <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>

 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-5 py-2 mb-8 animate-slideUp" style={{ animationDelay: '0ms' }}>
 <span className="relative flex h-2 w-2">
 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
 </span>
 <span className="text-white text-sm font-medium">We're Hiring</span>
 </div>

 <h1 className="text-4xl sm:text-5xl lg:text-6xl max-w-6xl font-bold text-white mb-6 leading-tight animate-slideUp" style={{ animationDelay: '100ms' }}>
 Careers at SwordNex – <span className="text-blue-200"> Build the Future </span>
 </h1>

 <p className="text-lg text-blue-100 mb-10 max-w-4xl mx-auto leading-relaxed animate-slideUp" style={{ animationDelay: '200ms' }}>
 Join SwordNex Technologies and work on innovative software solutions that power
 modern businesses. We're hiring talented professionals passionate about web,
 mobile, cloud, and digital transformation.
 </p>

 <button
 onClick={scrollToForm}
 className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slideUp hover:scale-105 transform"
 style={{ animationDelay: '300ms' }}
 >
 Apply Now
 <PaperAirplaneIcon className="w-5 h-5" />
 </button>
 </div>
 </section>

 {/* Why Choose SwordNex */}
 <section className="py-16 bg-gray-50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedSection>
 <div className="text-center mb-12">
 <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose SwordNex?</h2>
 <p className="text-gray-600 max-w-2xl mx-auto">We offer more than just a job – we offer a career with purpose</p>
 </div>
 </AnimatedSection>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
 {benefits.map((benefit, index) => (
 <BenefitCard key={index} benefit={benefit} index={index} />
 ))}
 </div>
 </div>
 </section>

 {/* Application Form */}
 <section id="application-form" className="py-16 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedSection>
 <div className="text-center mb-12">
 <h2 className="text-3xl font-bold text-gray-900 mb-3">Apply to Join Our Team</h2>
 <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
 </div>
 </AnimatedSection>

 <form onSubmit={handleSubmit} className="space-y-8">
 {/* Personal Information */}
 <AnimatedSection delay={50}>
 <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
 <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
 <UsersIcon className="w-4 h-4 text-blue-600" />
 </div>
 Personal Information
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
 <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="John" />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
 <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Doe" />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
 <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="john@example.com" />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
 <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="+91 9876543210" />
 </div>
 </div>
 </div>
 </AnimatedSection>

 {/* Professional Details */}
 <AnimatedSection delay={100}>
 <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
 <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
 <BriefcaseIcon className="w-4 h-4 text-blue-600" />
 </div>
 Professional Details
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Current Company</label>
 <input type="text" name="currentCompany" value={formData.currentCompany} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Company Name" />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
 <input type="text" name="currentRole" value={formData.currentRole} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your current designation" />
 </div>

 {/* Experience - Button Group */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Total Experience <span className="text-red-500">*</span></label>
 <div className="flex flex-wrap gap-2">
 {experienceOptions.map(opt => (
 <button
 type="button"
 key={opt}
 onClick={() => setFormData(prev => ({ ...prev, experience: opt }))}
 className={`px-3 py-2 rounded-lg text-sm transition-colors ${formData.experience === opt ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'}`}
 >
 {opt === "Fresher" ? opt : `${opt} yrs`}
 </button>
 ))}
 </div>
 </div>

 {/* Education - Button Group */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Highest Education</label>
 <div className="flex flex-wrap gap-2">
 {['High School', 'Bachelor\'s', 'Master\'s', 'PhD'].map(opt => (
 <button
 type="button"
 key={opt}
 onClick={() => setFormData(prev => ({ ...prev, education: opt }))}
 className={`px-3 py-2 rounded-lg text-sm transition-colors ${formData.education === opt ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'}`}
 >
 {opt}
 </button>
 ))}
 </div>
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Expected Salary (LPA)</label>
 <input type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., 8-10" />
 </div>

 {/* Notice Period - Button Group */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Notice Period</label>
 <div className="flex flex-wrap gap-2">
 {noticePeriodOptions.map(opt => (
 <button
 type="button"
 key={opt}
 onClick={() => setFormData(prev => ({ ...prev, noticePeriod: opt }))}
 className={`px-3 py-2 rounded-lg text-sm transition-colors ${formData.noticePeriod === opt ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'}`}
 >
 {opt}
 </button>
 ))}
 </div>
 </div>
 </div>
 </div>
 </AnimatedSection>

 {/* Professional Links */}
 <AnimatedSection delay={150}>
 <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
 <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
 <GlobeAltIcon className="w-4 h-4 text-blue-600" />
 </div>
 Professional Links
 </h3>
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
 {/* Resume Upload */}
 <div className="lg:col-span-3">
 <label className="block text-sm font-medium text-gray-700 mb-2">
 Resume / CV Upload <span className="text-red-500">*</span>
 </label>
 <input
 type="file"
 name="resumeFile"
 accept=".pdf,.doc,.docx"
 onChange={handleFileChange}
 required
 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
 />
 </div>

 {/* LinkedIn */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile <span className="text-red-500">*</span></label>
 <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="https://linkedin.com/in/yourprofile" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
 </div>

 {/* Portfolio / GitHub */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio / GitHub</label>
 <input type="url" name="portfolio" value={formData.portfolio} onChange={handleInputChange} placeholder="https://github.com/username" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
 </div>

 {/* Referral Code */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Referral Code (Optional)</label>
 <input type="text" name="referralCode" value={formData.referralCode} onChange={handleInputChange} placeholder="Enter referral code if any" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
 </div>
 </div>
 </div>
 </AnimatedSection>


 {/* Roles Selection */}
 <AnimatedSection delay={200} className="relative z-30">
 <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
 <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
 <SparklesIcon className="w-4 h-4 text-blue-600" />
 </div>
 Roles You're Interested In <span className="text-red-500">*</span>
 </h3>

 {/* Selected Roles Tags */}
 {selectedRoles.length > 0 && (
 <div className="flex flex-wrap gap-2 mb-4">
 {selectedRoles.map(roleId => (
 <span
 key={roleId}
 className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium"
 >
 {getRoleTitle(roleId)}
 <button
 type="button"
 onClick={() => removeRole(roleId)}
 className="hover:text-blue-900"
 >
 <XMarkIcon className="w-4 h-4" />
 </button>
 </span>
 ))}
 </div>
 )}

 {/* Dropdown Trigger */}
 <div className="relative">
 <button
 type="button"
 onClick={() => setIsRoleDropdownOpen(prev => !prev)}
 className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-400 transition"
 >
 Select roles {selectedRoles.length > 0 && `(${selectedRoles.length} selected)`}
 <ChevronDownIcon className={`w-5 h-5 transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
 </button>

 {/* Role Dropdown List */}
 {isRoleDropdownOpen && (
 <div className="absolute mt-3 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto z-50">
 {roles.map(role => {
 const isSelected = selectedRoles.includes(role.id);
 return (
 <button
 key={role.id}
 type="button"
 onClick={() => toggleRole(role.id)}
 className={`w-full px-4 py-3 text-left text-sm flex justify-between items-center transition-colors
 ${isSelected ? 'bg-blue-50 font-semibold text-blue-700' : 'text-gray-700'}`}
 >
 <div>
 <div>{role.title}</div>
 <div className="text-xs text-gray-400">{role.department}</div>
 </div>
 {isSelected && <span className="text-blue-600 font-bold">✓</span>}
 </button>
 );
 })}
 </div>
 )}
 </div>
 </div>
 </AnimatedSection>

 {/* Skills Section */}
 <AnimatedSection delay={250} className="relative z-20">
 <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
 <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
 <CodeIcon className="w-4 h-4 text-blue-600" />
 </div>
 Skills <span className="text-red-500">*</span>
 </h3>

 {skills.length > 0 && (
 <div className="flex flex-wrap gap-2 mb-4">
 {skills.map((skill, index) => (
 <span key={index} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium">
 {skill}
 <button type="button" onClick={() => removeSkill(skill)} className="hover:text-blue-900 transition-colors">
 <XMarkIcon className="w-4 h-4" />
 </button>
 </span>
 ))}
 </div>
 )}

 <div className="flex gap-2 mb-4">
 <input
 type="text"
 value={skillInput}
 onChange={(e) => setSkillInput(e.target.value)}
 onKeyPress={handleKeyPress}
 className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
 placeholder="Type a skill and press Enter"
 />
 <button type="button" onClick={() => addSkill(skillInput.trim())} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition-colors">
 <PlusIcon className="w-5 h-5" />
 </button>
 </div>

 <div>
 <p className="text-sm text-gray-500 mb-2">Suggested skills:</p>
 <div className="flex flex-wrap gap-2">
 {suggestedSkills.filter(s => !skills.includes(s)).slice(0, 15).map((skill, index) => (
 <button key={index} type="button" onClick={() => addSkill(skill)} className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm hover:border-blue-300 hover:text-blue-600 transition-colors">
 + {skill}
 </button>
 ))}
 </div>
 </div>
 </div>
 </AnimatedSection>

 {/* Additional Information */}
 <AnimatedSection delay={300}>
 <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
 <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
 <PaperAirplaneIcon className="w-4 h-4 text-blue-600" />
 </div>
 Additional Information
 </h3>
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <div className="lg:col-span-2">
 <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to join SwordNex?</label>
 <textarea name="coverLetter" value={formData.coverLetter} onChange={handleInputChange} rows={4} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="Tell us about yourself, your motivations, and what makes you a great fit..."></textarea>
 </div>

 {/* How did you hear - Button Group */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us?</label>
 <div className="flex flex-wrap gap-2">
 {['LinkedIn', 'Indeed', 'Referral', 'Instagram', 'Naukri', 'Other'].map(opt => (
 <button
 type="button"
 key={opt}
 onClick={() => setFormData(prev => ({ ...prev, howDidYouHear: opt }))}
 className={`px-3 py-2 rounded-lg text-sm transition-colors ${formData.howDidYouHear === opt
 ? 'bg-blue-600 text-white'
 : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
 }`}
 >
 {opt}
 </button>
 ))}
 </div>
 </div>

 </div>
 </div>
 </AnimatedSection>

 {/* Submit Button */}
 <AnimatedSection delay={350}>
 <div className="pt-4">
 <button
 type="submit"
 disabled={isSubmitting}
 className={`w-full inline-flex items-center justify-center gap-3 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
 } text-white`}
 >
 {isSubmitting ? (
 <>
 <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
 </svg>
 Processing...
 </>
 ) : (
 <>
 <PaperAirplaneIcon className="w-5 h-5" />
 Submit & View Openings
 </>
 )}
 </button>
 <p className="text-center text-sm text-gray-500 mt-4">
 By submitting, you agree to our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
 </p>
 </div>
 </AnimatedSection>
 </form>
 </div>
 </section>
 </div>
 );
};

export default CareerPage;
