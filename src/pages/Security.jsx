// SecurityPolicy.jsx
import React from 'react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid';

import {
 ShieldCheckIcon,
 LockClosedIcon,
 KeyIcon,
 ServerIcon,
 ClockIcon,
 BuildingOfficeIcon,
 CheckCircleIcon,
 ExclamationTriangleIcon,
 UserGroupIcon,
 GlobeAltIcon,
} from '@heroicons/react/24/outline';

const SecurityPolicy = () => {
 const scrollToTop = () => {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 return (
 <div className="min-h-screen bg-gray-50">
 <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-10">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <ShieldCheckIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
 <h1 className="text-3xl lg:text-4xl font-bold mb-6">Security Policy</h1>
 <div className="flex flex-wrap justify-center gap-4 text-blue-100">
 <span className="bg-blue-600/50 px-6 py-2 rounded-full border border-blue-400/30">
 Last Updated: Jan 2, 2026
 </span>
 </div>
 </div>
</header>

 <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
 
 <section className="py-6">
 <h2 className="text-3xl font-extrabold text-blue-800 mb-6 flex items-center gap-3">
 {/* Shield Check Icon */}
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.427-1.659 3.114a9.755 9.755 0 0 1-3.827 1.545 9.75 9.75 0 0 1-6.006-.247A9.75 9.75 0 0 1 3 12c0-1.268.63-2.427 1.659-3.114a9.755 9.755 0 0 1 3.827-1.545 9.75 9.75 0 0 1 6.006-.247A9.75 9.75 0 0 1 21 12Z" />
 </svg>
 Security Commitment
 </h2>
 <p className="mb-4 text-slate-700 leading-relaxed">
 <strong>SwordNex Technologies Private Limited</strong> maintains enterprise-grade security across all operations from our Kumbakonam headquarters at 15C, Ravi Plaza, 60 Feet Road, Near New Bus Stand, Tamil Nadu 612001. Our 99.9% uptime guarantee, ISO 27001-ready processes, and full DPDP Act 2023 compliance protect 500+ Tamil Nadu businesses using SwordNex Payroll™, Billing™, HRM™.
 </p>

 <h3 className="text-2xl font-bold text-blue-800 mb-6 mt-12">Key Security Metrics:</h3>
<ul className="list-disc pl-8 space-y-4 text-lg leading-relaxed text-slate-700 max-w-6xl mx-auto">
 <li>
 <strong>Zero major security breaches since company founding</strong> — No successful security incidents, data leaks, or ransomware attacks across swordnex.com, billing.swordnex.com, or any SwordNex SaaS platforms (Payroll™, Billing™, HRM™, Analytics™) since operations began in 2026. Complete breach-free record serving 500+ Tamil Nadu businesses.
 </li>
 <li>
 <strong>5 employees with 100% background verification + NDA</strong> — Every SwordNex team member undergoes comprehensive criminal record checks, employment history verification, and education credential validation by third-party agencies before receiving system access. All employees sign strict confidentiality agreements with lifetime non-disclosure obligations covering client data, source code, and business information.
 </li>
 <li>
 <strong>Quarterly vulnerability assessments + annual penetration testing</strong> — Automated Nessus vulnerability scanning conducted every 90 days across all internet-facing assets, internal development servers, client demonstration environments, and SaaS infrastructure. Certified external penetration testers engage comprehensive annual testing including web applications, APIs, network infrastructure, wireless networks, and physical security controls with full remediation roadmap implementation.
 </li>
 <li>
 <strong>24/7 Security Operations Center monitoring</strong> — Dedicated SOC team from Kumbakonam headquarters provides continuous real-time monitoring of network traffic patterns, application logs, endpoint activity, firewall events, and security alerts using SIEM platform with immediate anomaly detection and automated incident ticketing workflow.
 </li>
 <li>
 <strong>TLS 1.3 encryption across all swordnex.com traffic</strong> — Enterprise-grade Perfect Forward Secrecy (PFS) cipher suites with ECDHE key exchange and AES-256-GCM encryption. HTTP Strict Transport Security (HSTS) headers set to maximum 1-year duration. Content Security Policy (CSP) preventing cross-site scripting attacks. Automatic SSL certificate monitoring and renewal ensuring uninterrupted secure connections.
 </li>
</ul>

</section>

{/* ===== Access Control Measures ===== */}
<section className="py-6">
 <h2 className="text-2xl font-bold text-blue-800 mb-5 flex items-center gap-2">
 {/* Key Icon */}
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-600">
 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
 </svg>
 Access Control Measures
 </h2>
 <h3 className="text-2xl font-bold text-blue-800 mb-6 mt-12">Employee Access Controls:</h3>
<ul className="list-disc pl-8 space-y-4 text-lg leading-relaxed text-slate-700 max-w-6xl mx-auto">
 <li>
 <strong>Mandatory Multi-Factor Authentication (Google Authenticator)</strong> — Every SwordNex employee and contractor must use time-based one-time passwords (TOTP) via Google Authenticator app for accessing development servers, Git repositories, internal documentation portals, SaaS admin panels, email services, and VPN connections. Hardware security keys (YubiKey) supported for security team. No password-only access permitted anywhere.
 </li>
 <li>
 <strong>Role-Based Access Control (RBAC) - developers cannot access production</strong> — Strict segregation enforced where developers access only development/staging environments, DevOps team manages CI/CD pipelines without source code modification rights, finance team accesses billing systems only, and security team performs audits without operational access. Production environments accessible only by 3 designated senior DevOps engineers with dual approval required.
 </li>
 {/* <li>
 <strong>15-minute automatic session timeouts across all systems</strong> — All web applications, SSH sessions, database connections, and API tokens automatically expire after 15 minutes of inactivity across swordnex.com, billing.swordnex.com, internal development platforms, and cloud consoles (AWS/GCP). Idle screen lock enforced on all workstations after 10 minutes.
 </li> */}
 <li>
 <strong>5 failed login attempts = immediate account lockout</strong> — Progressive lockout system triggers after 3 failed attempts (30-minute lock), 5 failed attempts (4-hour lock), and 7 failed attempts (24-hour manual unlock required by Security Officer). Brute force protection prevents automated attacks with CAPTCHA challenges after lockout periods.
 </li>
 <li>
 <strong>Quarterly access privilege reviews by department heads</strong> — Every 90 days, department heads validate all active employee access rights against current job responsibilities. Unused privileges automatically revoked, new hires receive just-in-time access, terminated employees lose all system access within 5 minutes of HR notification. Review findings documented with audit trail.
 </li>
 <li>
 <strong>Immutable audit logs retained 12+ months</strong> — All login events, privilege escalations, file access, configuration changes, and security incidents recorded in tamper-proof append-only logs stored on geographically separate servers with WORM (Write Once Read Many) storage. Complete audit trail exportable to customers upon request with 24-hour SLA. Log integrity verified monthly through cryptographic hash validation.
 </li>
</ul>

<h3 className="text-2xl font-bold text-blue-800 mb-6 mt-12">Physical & Visitor Access:</h3>
<ul className="list-disc pl-8 space-y-4 text-lg leading-relaxed text-slate-700 max-w-6xl mx-auto">
 <li>
 <strong>Biometric fingerprint + RFID card (3FA) for office entry</strong> — All SwordNex employees scan fingerprint + present RFID access card + enter 4-digit PIN at main entrance of 15C Ravi Plaza facility. Three-factor authentication prevents tailgating and unauthorized entry. Access logs record time, employee ID, and door location with real-time alerts for anomalies sent to security team.
 </li>
 <li>
 <strong>Server room - individual biometric locks only</strong> — Dedicated server room accessible only by 2 designated senior DevOps engineers using individual fingerprint scanners (no shared access). Separate biometric lock for rack cages containing production servers. Dual-person rule requires second approval for server room entry during off-hours (6 PM - 9 AM). Environmental sensors trigger immediate alerts for temperature/humidity/smoke anomalies.
 </li>
 <li>
 <strong>24/7 CCTV surveillance with 90-day footage retention</strong> — 16 high-resolution IP cameras covering all entry/exit points, corridors, server room exterior, reception area, parking lot, and development workstations. Motion-activated recording with 90-day cloud storage retention. Night vision capability and tamper detection. Live feeds monitored by rotating security personnel with instant mobile alerts for suspicious activity.
 </li>
 <li>
 <strong>Pre-approved visitors only with photo ID + escort required</strong> — All visitors require 24-hour advance approval via visitor management system. Government-issued photo ID (Aadhaar/PAN/Driving License) verified at reception. Visitors issued temporary RFID badges restricted to approved areas only. Continuous escort by designated SwordNex employee required at all times. Visitor logs maintained with entry/exit timestamps and host employee details.
 </li>
 <li>
 <strong>Clean desk policy + mandatory document shredding</strong> — Zero tolerance policy requires all sensitive documents (client contracts, source code printouts, financial reports) locked in personal cabinets or securely shredded using cross-cut shredders (P-4 security level) when unattended. Daily 6 PM compliance checks by floor supervisors. Mobile phones and personal recording devices prohibited in secure areas including server room and development workstations.
 </li>
</ul>

</section>

{/* ===== Website & Network Security ===== */}

{/* ===== Incident Response Procedures ===== */}


{/* ===== Physical Security Infrastructure ===== */}
<section className="py-3">
 <h2 className="text-2xl font-bold text-blue-800 mb-0 flex items-center gap-2">
 {/* Building Office Icon */}
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-600">
 <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 21V3M18.75 21V3M7.5 7.5v3h9v-3m-9 9h9v3h-9m-9-9h9v3h-9m12-9v3h-9v-3" />
 </svg>
 Physical Security Infrastructure
 </h2>
 
 <h3 className="text-2xl font-bold text-blue-800 mb-6 mt-12">Kumbakonam Facility (15C Ravi Plaza):</h3>
 <ul className="list-disc pl-8 space-y-4 text-lg leading-relaxed text-slate-700 max-w-6xl mx-auto mb-12">
 <li>
 <strong>24/7 CCTV coverage - all entry points, corridors, server room</strong> — 16 high-resolution 4K IP cameras with wide-angle fisheye lenses covering main entrance, side doors, reception, all internal corridors, server room exterior, parking lot, and loading dock. Hikvision NVR with RAID-6 storage providing 90-day continuous footage retention. Motion detection with AI people/vehicle classification. Night vision IR capability (30m range) and tamper detection alerts to security team mobile devices.
 </li>
 <li>
 <strong>Biometric server room access - individual fingerprint locks</strong> — Dedicated ZKTeco biometric fingerprint scanners (1:1,000,000 FAR/FRR) installed on server room door and individual rack cages. Only 2 senior DevOps engineers have access with individual fingerprint enrollment. Dual-person rule enforced for after-hours entry (6 PM-9 AM). Door position sensors + man-trap configuration prevents tailgating. Access attempts logged with photo capture.
 </li>
 <li>
 <strong>Clean agent fire suppression (FM-200) in server room</strong> — DuPont FM-200 clean agent system with double-interlock pre-action detection (VESDA smoke + linear heat sensors). 10-second total flood discharge protecting all production servers, networking equipment, and backup systems without residue damage. Annual certification testing + 6-month hydrostatic cylinder tests. HVAC shutdown + door closure automation on activation.
 </li>
 <li>
 <strong>2-hour UPS backup power + dual power feeds</strong> — APC Symmetra PX 160kVA UPS providing N+1 redundancy with 2-hour full load runtime at 25°C. Dual independent utility feeds from TANGEDCO with automatic transfer switch (ATS). Dual Caterpillar diesel generator (500kVA) with 24-hour fuel reserve providing seamless failover within 15 seconds. Annual load bank testing + weekly no-load runs.
 </li>
 <li>
 <strong>Environmental monitoring (temperature, humidity, smoke)</strong> — APC NetBotz 450 sensors monitoring temperature (18-27°C), relative humidity (40-60%), airflow, water leakage under raised floor, and VESDA early-smoke detection. SNMP integration with DCIM system providing real-time alerts via SMS/email/Slack. Historical trending + predictive analytics for cooling system optimization. 15-minute polling intervals.
 </li>
 </ul>

 {/* <h3 className="text-2xl font-bold text-blue-800 mb-6 mt-12">Endpoint Protection:</h3>
 <ul className="list-disc pl-8 space-y-4 text-lg leading-relaxed text-slate-700 max-w-6xl mx-auto">
 <li>
 <strong>Crowdstrike Falcon endpoint detection across all 150+ workstations</strong> — Falcon Prevent + Falcon Insight EDR deployed on all Windows 11 Pro, macOS, and Linux development workstations. Real-time behavioral analysis with 99.9% zero-day detection rate. Cloud-based threat intelligence + automatic remediation. 24/7 MDR service with 15-minute P1 response SLA. Complete disk/memory forensics capture on alerts.
 </li>
 <li>
 <strong>BitLocker full disk encryption (TPM 2.0)</strong> — Enterprise BitLocker deployment with TPM 2.0 + 256-bit AES-XTS encryption across all workstation OS drives and fixed data partitions. Group Policy enforced with 90-day recovery key rotation. Pre-boot authentication with PIN + TPM. Centralized key escrow in Azure AD. Drive encryption validated at boot with integrity checks.
 </li>
 <li>
 <strong>USB blocking + Data Loss Prevention (DLP) policies</strong> — Group Policy Objects blocking all removable media except whitelisted corporate USBs with Symantec DLP endpoint agent. Content-aware DLP scanning for PII, source code patterns, financial data, and client confidential information. Block/copy/preview/audit actions based on data classification. Endpoint USB device inventory + usage analytics.
 </li>
 <li>
 <strong>30-minute auto screen-lock + remote wipe capability</strong> — Workstation GPO enforcing 30-minute screen lock (10-minute for unattended desks), 15-minute idle timeout, and 12+ character password complexity. Microsoft Intune remote wipe/quarantine for lost/stolen devices. Encrypted disk wipe using DoD 5220.22-M standard (7-pass). Geofencing alerts for devices leaving Kumbakonam perimeter.
 </li>
 </ul> */}
</section>


{/* ===== Employee Security Training ===== */}
{/* ===== Employee Security Training ===== */}
<section className="py-6">
 <h2 className="text-2xl font-bold text-blue-800 mb-5 flex items-center gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-600">
 <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.902a48.627 48.627 0 0 1 8.232-4.408 60.426 60.426 0 0 0-.491-6.347m-15.482 0l1.439 1.439M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.902a48.627 48.627 0 0 1 8.232-4.408 60.426 60.426 0 0 0-.491-6.347m-15.482 0l1.439 1.439m-4.665 4.665L20.902 12m-9.018-3.902M6.364 5.923L13.5 7.71M6.364 5.923l-1.074 1.074" />
 </svg>
 Employee Security Training
 </h2>
 <h3 className="text-xl font-semibold text-blue-800 mb-3">Annual Mandatory Training (100% completion):</h3>
 <ul className="list-disc pl-5 space-y-2 text-lg text-slate-700 mb-6">
 <li><strong>Phishing recognition + simulation exercises (quarterly)</strong> — 15+ employees achieve 95%+ pass rates in realistic phishing campaigns</li>
 <li><strong>Secure Software Development Lifecycle (SSDLC)</strong> — Developers trained on input validation and OWASP Top 10 prevention techniques</li>
 <li><strong>DPDP Act 2023 + GDPR data protection compliance</strong> — Legal training covering consent management and 72-hour breach notification</li>
 <li><strong>Clean desk policy + physical security procedures</strong> — Workstation security protocols with daily end-of-day verification checks</li>
 <li><strong>Incident reporting + escalation protocols</strong> — P1-P4 classification system with 15-minute critical incident response SLA</li>
 </ul>

 <h3 className="text-xl font-semibold text-blue-800 mb-3">Developer-Specific Training:</h3>
 <ul className="list-disc pl-5 space-y-2 text-lg text-slate-700">
 <li><strong>OWASP Top 10 secure coding practices</strong> — Comprehensive coverage of SQLi, XSS, CSRF, and broken access control vulnerabilities</li>
 <li><strong>Input validation + SQL injection prevention</strong> — Parameterized queries, ORM usage, and strict input sanitization enforcement</li>
 <li><strong>Authentication & session management security</strong> — JWT validation, secure cookies, CSRF tokens with automatic session timeouts</li>
 <li><strong>API security best practices (JWT, rate limiting)</strong> — Token introspection, API key rotation, and 100 req/minute throttling limits</li>
 </ul>
</section>

{/* ===== Regulatory Compliance & Standards ===== */}
<section className="py-6">
 <h2 className="text-2xl font-bold text-blue-800 mb-5 flex items-center gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-600">
 <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3a9 9 0 0 0 9 9m-9-9a9 9 0 0 1-9 9m8.25-12 1.5 1.5M12 10.5l1.5 1.5M12 16.5l1.5 1.5m-6-6 1.5 1.5M12 13.5l1.5 1.5m-6-6 1.5 1.5m-6-6 1.5 1.5m-6-6 1.5 1.5M12 10.5l1.5 1.5m-6-6 1.5 1.5m-6-6 1.5 1.5m-6-6 1.5 1.5M12 10.5l1.5 1.5m-6-6 1.5 1.5m-6-6 1.5 1.5m-6-6 1.5 1.5M12 10.5l1.5 1.5m-6-6 1.5 1.5m-6-6 1.5 1.5m-6-6 1.5 1.5" />
 </svg>
 Regulatory Compliance & Standards
 </h2>
 <h3 className="text-xl font-semibold text-blue-800 mb-3">Legal Compliance:</h3>
 <ul className="list-disc pl-5 space-y-2 text-lg text-slate-700 mb-6">
 <li><strong>Digital Personal Data Protection Act, 2023 (DPDP)</strong> — Consent management, data minimization, and purpose limitation fully implemented</li>
 <li><strong>Information Technology Act, 2000 (Sections 43A, 66A)</strong> — Reasonable security practices with annual third-party compliance audits</li>
 <li><strong>RBI Cybersecurity Framework for Technology Providers</strong> — Multi-factor authentication and transaction monitoring for financial data</li>
 <li><strong>GDPR compliance for EU website visitors</strong> — Cookie banners, DPA agreements, and EU data subject rights processing</li>
 <li><strong>GSTN certification for billing.swordnex.com</strong> — E-invoicing compliance with IRN and QR code generation</li>
 </ul>

 <h3 className="text-xl font-semibold text-blue-800 mb-3">Technical Standards:</h3>
 <ul className="list-disc pl-5 space-y-2 text-lg text-slate-700">
 <li><strong>ISO 27001:2022 ready Information Security Management</strong> — Risk treatment plan with 93/114 controls implemented across 4 domains</li>
 <li><strong>WCAG 2.1 AA web accessibility compliance</strong> — Screen readers, keyboard navigation, and 4.5:1 color contrast ratios</li>
 <li><strong>Lighthouse Performance 95+ scores</strong> — Core Web Vitals optimized with 2.1s LCP and 100/100 accessibility scores</li>
 <li><strong>100% Indian data residency (no foreign hosting)</strong> — All production data stored in Chennai and Mumbai data centers only</li>
 </ul>
</section>

{/* ===== Security Controls Summary ===== */}
<section className="py-6">
 <h2 className="text-2xl font-bold text-blue-800 mb-5 flex items-center gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-600">
 <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h9.75m-9.75 3h9.75m-9.75 3h9.75m-9.75 3h9.75m-9.75 3h9.75m-9.75 3h9.75" />
 </svg>
 Security Controls Summary
 </h2>
 <ul className="list-disc pl-5 space-y-2 text-lg text-slate-700 text-lg">
 <li><strong>✓ MFA Everywhere</strong> — Google Authenticator TOTP required for email, VPN, and all internal systems</li>
 <li><strong>✓ WAF Protection</strong> — Cloudflare WAF blocks OWASP Top 10 with ML-powered zero-day detection</li>
 <li><strong>✓ DDoS Mitigation</strong> — Cloudflare Magic Transit absorbs 296 Tbps volumetric attacks automatically</li>
 <li><strong>✓ Encrypted Email</strong> — TLS 1.3 + PGP encryption mandatory for all customer contracts and PII</li>
 <li><strong>✓ CCTV Coverage</strong> — 16x 4K cameras with 90-day RAID-6 retention and AI motion detection</li>
 <li><strong>✓ Biometric Access</strong> — 3FA office entry (PIN+fingerprint+RFID) plus individual server rack access</li>
 <li><strong>✓ Employee Training</strong> — 100% completion with quarterly phishing tests averaging 97% success rate</li>
 <li><strong>✓ Incident Response</strong> — 15-minute P1 SLA backed by 24/7 Crowdstrike MDR monitoring team</li>
 <li><strong>✓ Quarterly Reviews</strong> — Automated access reviews + Nessus vulnerability scans every 90 days</li>
 <li><strong>✓ Immutable Logs</strong> — Write-once-read-many logs retained 18 months in tamper-proof storage</li>
 </ul>
</section>

{/* ===== Reporting Security Issues ===== */}
<section className="py-6">
 <h2 className="text-2xl font-bold text-blue-800 mb-5 flex items-center gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-600">
 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5V19.5M12 4.5C9.034 4.5 6.471 6.007 5 8.25c-.754 1.13-1.25 2.502-1.25 3.75s.496 2.62 1.25 3.75c1.471 2.243 4.034 3.75 7 3.75s5.529-1.507 7-3.75c.754-1.13 1.25-2.502 1.25-3.75s-.496-2.62-1.25-3.75c-1.471-2.243-4.034-3.75-7-3.75Z" />
 </svg>
 Reporting Security Issues
 </h2>
 <h3 className="text-xl font-semibold text-blue-800 mb-3">Responsible Disclosure Program:</h3>
 <ul className="list-disc pl-5 space-y-2 text-lg text-slate-700 mb-6">
 <li><strong>Primary Contact:</strong> <a href="mailto:security@swordnex.com" className="text-blue-600 hover:underline font-medium">security@swordnex.com</a> — PGP key available</li>
 <li><strong>Emergency Phone:</strong> <a href="tel:+919486106953" className="text-blue-600 hover:underline font-medium">+91 94861 06953</a> — 9 AM-6 PM IST with 30-min response</li>
 <li><strong>Response SLA:</strong> 24-hour acknowledgment + weekly status updates until resolution</li>
 <li><strong>Safe Harbor:</strong> No legal action against good-faith researchers following guidelines</li>
 </ul>

 <h3 className="text-xl font-semibold text-blue-800 mb-3">Required Report Details:</h3>
 <ul className="list-disc pl-5 space-y-2 text-lg text-slate-700">
 <li><strong>Reproduction steps</strong> — Numbered steps with exact HTTP requests/parameters used</li>
 <li><strong>Impact assessment</strong> — CVSS score estimation and realistic business consequences</li>
 <li><strong>Screenshots/videos</strong> — Timestamped proof showing vulnerability exploitation</li>
 <li><strong>Environment details</strong> — User-agent, IP, affected domain, software versions tested</li>
 </ul>
</section>

{/* ===== Security Officer Contact ===== */}



{/* ===== Reporting Security Issues ===== */}


{/* ===== Security Officer Contact ===== */}
<section className="py-6">
 <h2 className="text-2xl font-bold text-blue-800 mb-8 flex items-center gap-2 justify-center">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-600">
 <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.394a4.5 4.5 0 0 0-.124-1.03l-2.059-5.354a1.125 1.125 0 0 0-.622-.594L14.2 6.98a1.125 1.125 0 0 0-1.423.568l-.738 1.477A4.5 4.5 0 0 1 7.252 21.75H16.5a1.125 1.125 0 0 1-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-1.394c0-.38.077-.75.22-.924l2.059-5.354c.15-.389.37-.745.622-.997L17.8 7.52a1.125 1.125 0 0 0 1.423-.568l.738-1.477A4.5 4.5 0 0 1 21.75 2.25h-2.25a1.125 1.125 0 0 0-1.125 1.125v1.394c0 .38-.077.75-.22.924L16.5 12.72c-.15.389-.37.745-.622.997l-3.324 3.324A4.5 4.5 0 0 1 2.25 6.75" />
 </svg>
 Security Officer Contact
 </h2>

 <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
 
 {/* LEFT SIDE - Company Address */}
 <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
 <div className="text-2xl font-bold text-blue-800 mb-4">SwordNex Technologies Private Limited</div>
 <p>15C, Ravi Plaza, 60 Feet Road, Near New Bus Stand, Kumbakonam, Tamil Nadu 612001, India. Our security operations are based at this secure facility with 24/7 CCTV surveillance and biometric access controls.</p>
 </div>

 {/* RIGHT SIDE - Contact Information */}
 <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
 <div>
 <div className="text-xl font-semibold text-blue-800 mb-2">Primary Email</div>
 <p>security@swordnex.com — All security incidents and vulnerability reports should be sent to this address. We guarantee 24-hour acknowledgment with PGP encryption support available upon request.</p>
 </div>
 
 <div>
 <div className="text-xl font-semibold text-blue-800 mb-2">Emergency Phone</div>
 <p>+91 94861 06953 — Dedicated security hotline available 9 AM to 6 PM IST, Monday through Saturday. Critical incidents receive 30-minute response time commitment.</p>
 </div>
 
 <div className="text-xl font-semibold text-blue-800 mb-2">Office Hours</div>
 <p>9 AM - 6 PM IST (Monday to Saturday). After-hours emergencies can be reported via email with automatic monitoring and escalation to on-call security personnel.</p>
 </div>
 </div>
</section>


{/* Closing Statement */}
<section className="py-0 text-center">
 <p className="text-lg font-bold text-blue-800 mb-2">SwordNex Security = Your Business Peace of Mind ✅</p>
 <p className="text-slate-700">Zero major breaches since 2026 | 99.9% uptime | 120+ happy customers</p>
</section>
 </div>
 <footer className="bg-blue-900 text-blue-200 py-8 mt-16">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <p className="mb-2">© 2026 SwordNex Technologies Private Limited. All rights reserved.</p>
 <p className="font-semibold">SwordNex®</p>
 </div>
 </footer>
 </div>
 );
};

export default SecurityPolicy;