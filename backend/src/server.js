const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Add this: npm install node-fetch@2

const {
    getSwordnexContacts,
    getSwordnexCareers,
    addContact,
    addCareer,
    deleteContact,
    deleteCareer,
    getCareerById,
    updateCareer
} = require('./getData');

const {
    addJob,
    getAllJobs,
    updateJob,
    deleteJob
} = require('./jobsData');

const {
    addCourseEnquiry,
    getAllCourseEnquiries,
    deleteCourseEnquiry
} = require('./courseEnquiryData');

const {
    addJobFairData,
    getAllJobFairData,
    getJobFairDataById,
    updateJobFairData,
    deleteJobFairData
} = require('./jobfairdata');

const {
    addInterviewData,
    getAllInterviewData,
    getInterviewDataById,
    updateInterviewData,
    deleteInterviewData,
    deleteInterviewDataByCode
} = require('./interviewData');

const {
    addAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} = require('./appointmentData');

const {
    addServiceEnquiry,
    getAllServiceEnquiries,
    getServiceEnquiryById,
    updateServiceEnquiry,
    deleteServiceEnquiry
} = require('./serviceEnquiryData');

const {
    addChatbotLead,
    getAllChatbotLeads,
    updateChatbotLead,
    deleteChatbotLead
} = require('./chatbotData');

const {
    addEvent,
    getAllEvents,
    getEventById,
    getEventBySlug,
    updateEvent,
    deleteEvent
} = require('./eventsData');

const {
    addWorkshop,
    getAllWorkshops,
    getWorkshopById,
    getWorkshopBySlug,
    updateWorkshop,
    deleteWorkshop
} = require('./workshopsData');

const {
    addEventRegistration,
    getRegistrationsByEvent,
    getAllRegistrations,
    deleteEventRegistration
} = require('./eventRegistrations');

const {
    uploadFileToStorage,
    addEventSubRegistration,
    getEventSubRegistrations,
    deleteEventSubRegistration,
} = require('./eventSubcollection');

const {
    addBlog,
    getAllBlogs,
    getBlogBySlug,
    getBlogById,
    updateBlog,
    deleteBlog,
} = require('./blogData');

const {
    uploadPartnerImage,
    addPartner,
    getAllPartners,
    deletePartner,
} = require('./partnersData');

const {
    registerAffiliate,
    getDashboard,
    generateCode,
    getCodes,
    getClicks,
    getCommissions,
    requestPayout,
    getPayouts,
    trackClick,
    recordConversion,
    updateSettings,
    getAffiliateByUid,
    getAllAffiliates,
    getAllPayouts,
    updatePayoutStatus,
    updateCommissionStatus,
    updateAffiliateStatus,
    deleteAffiliate,
} = require('./affiliateData');

const { db, admin } = require('./firebaseConfig');
const { authorize, STAFF_ROLES } = require('./middleware/auth');

// --- Multer (memory storage for Firebase Storage uploads) ---
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

// Brevo Setup Helper
const SibApiV3Sdk = require('sib-api-v3-sdk');

function setupBrevo() {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    // Trim the key to avoid "Invalid character in header" errors from trailing newlines
    apiKey.apiKey = process.env.BREVO_API_KEY?.trim() || "";
    return SibApiV3Sdk;
}

const app = express();

// ============================================
// CORS Configuration - IMPORTANT FOR FILE DOWNLOADS
// ============================================
const ALLOWED_ORIGINS = [
    'https://swordnex.com',
    'https://www.swordnex.com',
    'https://swordnex-sites.web.app',
    'https://swordnex-sites.firebaseapp.com',
];

app.use(cors({
    origin(origin, callback) {
        // Same-origin requests and server-to-server calls send no Origin header.
        if (!origin || ALLOWED_ORIGINS.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-affiliate-secret'],
}));

// Partner logo uploads arrive as base64 JSON, so allow more than the default.
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Log method and path only; query strings can carry personal data.
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

app.use(authorize);

// ==================== WORKSHOPS API ENDPOINTS ==================== //

// Get all workshops
app.get('/api/workshops', async (req, res) => {
    try {
        const data = await getAllWorkshops();
        res.status(200).json({ data });
    } catch (error) {
        console.error('Fetch workshops error:', error);
        res.status(500).json({ error: 'Failed to fetch workshops' });
    }
});

// Get a single workshop by ID or Slug
app.get('/api/workshops/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getWorkshopBySlug(id);
        if (!result) {
            return res.status(404).json({ error: 'Workshop not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Fetch workshop error:', error);
        res.status(500).json({ error: 'Failed to fetch workshop' });
    }
});

// Create a new workshop
app.post('/api/workshops', async (req, res) => {
    try {
        const { title, date, time, venue, description } = req.body;
        if (!title || !date || !time) {
            return res.status(400).json({ error: 'Missing required workshop fields' });
        }

        const result = await addWorkshop(req.body);
        res.status(201).json({ message: 'Workshop created successfully', data: result });
    } catch (error) {
        console.error('Create workshop error:', error);
        res.status(500).json({ error: 'Failed to create workshop' });
    }
});

// Update a workshop
app.put('/api/workshops/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await updateWorkshop(id, req.body);
        res.status(200).json({ message: 'Workshop updated successfully', data: result });
    } catch (error) {
        console.error('Update workshop error:', error);
        res.status(500).json({ error: 'Failed to update workshop' });
    }
});

// Delete a workshop
app.delete('/api/workshops/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteWorkshop(id);
        res.status(200).json(result);
    } catch (error) {
        console.error('Delete workshop error:', error);
        res.status(500).json({ error: 'Failed to delete workshop' });
    }
});

// ============================================
// FILE DOWNLOAD ENDPOINTS FOR ZIP EXPORT
// ============================================

// --- Blog Post CRUD Endpoints ---
app.get('/api/blogs', async (req, res) => {
    try {
        const publishedOnly = req.query.published === 'true';
        const data = await getAllBlogs(publishedOnly);
        res.status(200).json(data);
    } catch (error) {
        console.error('Fetch blogs error:', error);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

app.get('/api/blogs/slug/:slug', async (req, res) => {
    try {
        const blog = await getBlogBySlug(req.params.slug);
        res.status(200).json(blog);
    } catch (error) {
        console.error('Fetch blog by slug error:', error);
        res.status(404).json({ error: error.message });
    }
});

app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await getBlogById(req.params.id);
        res.status(200).json(blog);
    } catch (error) {
        console.error('Fetch blog error:', error);
        res.status(404).json({ error: error.message });
    }
});

app.post('/api/blogs', async (req, res) => {
    try {
        const { title, category, excerpt, date, readTime, image, slug, fullContent, published } = req.body;
        if (!title || !excerpt || !category) {
            return res.status(400).json({ error: 'Title, excerpt, and category are required' });
        }

        const newBlog = {
            title,
            category,
            excerpt,
            date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            readTime: readTime || '5 min',
            image: image || '',
            slug: slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
            fullContent: fullContent || { overview: excerpt },
            published: published === true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const result = await addBlog(newBlog);
        res.status(201).json(result);
    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({ error: 'Failed to create blog' });
    }
});

app.put('/api/blogs/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const updates = req.body;
        const updatedBlog = await updateBlog(blogId, updates);
        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error('Update blog error:', error);
        res.status(500).json({ error: 'Failed to update blog' });
    }
});

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const result = await deleteBlog(blogId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Delete blog error:', error);
        res.status(500).json({ error: 'Failed to delete blog' });
    }
});

// Candidate file URLs come from public form submissions, so only fetch from
// Firebase Storage hosts; anything else could point the server at internal addresses.
const STORAGE_HOSTS = ['firebasestorage.googleapis.com', 'storage.googleapis.com'];
function isStorageUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === 'https:' && STORAGE_HOSTS.includes(url.hostname);
    } catch (error) {
        return false;
    }
}

// Endpoint 1: Get file by candidate ID and file type
app.get('/api/jobfair/:id/file/:fileType', async (req, res) => {
    try {
        const { id, fileType } = req.params;

        console.log(`[File Download] Requesting ${fileType} for candidate ${id}`);

        // Get candidate data
        const candidate = await getJobFairDataById(id);

        if (!candidate) {
            console.log(`[File Download] Candidate ${id} not found`);
            return res.status(404).json({ error: 'Candidate not found' });
        }

        // Map file type to field name
        const fileFieldMap = {
            'profile': 'profilephoto',
            'profilephoto': 'profilephoto',
            'resume': 'resume',
            'aadhaar': 'aadhaarcard',
            'aadhaarcard': 'aadhaarcard',
            'marksheet': 'lastsemestermarksheet',
            'lastsemestermarksheet': 'lastsemestermarksheet'
        };

        const fieldName = fileFieldMap[fileType.toLowerCase()];
        if (!fieldName) {
            return res.status(400).json({ error: 'Invalid file type' });
        }

        const fileData = candidate[fieldName];

        if (!fileData) {
            console.log(`[File Download] No ${fileType} found for candidate ${id}`);
            return res.status(404).json({ error: 'File not found' });
        }

        // Check if it's a base64 data URL
        if (fileData.startsWith('data:')) {
            console.log(`[File Download] Serving base64 ${fileType} for candidate ${id}`);

            // Extract MIME type and base64 data
            const matches = fileData.match(/^data:([^;]+);base64,(.+)$/);

            if (!matches) {
                return res.status(400).json({ error: 'Invalid base64 format' });
            }

            const mimeType = matches[1];
            const base64Data = matches[2];
            const buffer = Buffer.from(base64Data, 'base64');

            // Set headers
            res.set({
                'Content-Type': mimeType,
                'Content-Length': buffer.length,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache'
            });

            return res.send(buffer);
        }

        // Check if it's an external URL (like Firebase Storage, Cloudinary, etc.)
        if (fileData.startsWith('http://') || fileData.startsWith('https://')) {
            if (!isStorageUrl(fileData)) {
                return res.status(400).json({ error: 'File is not stored in Firebase Storage' });
            }
            console.log(`[File Download] Proxying external URL for ${fileType} for candidate ${id}`);

            try {
                // Add absolute generic User-Agent to avoid blocks from storage providers
                const response = await fetch(fileData, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SwordNex/1.0'
                    },
                    timeout: 20000 // 20 second timeout
                });

                if (!response.ok) {
                    console.error(`[File Download] External origin returned ${response.status} for ${fileType}`);
                    throw new Error(`External fetch failed: ${response.status} ${response.statusText}`);
                }

                const contentType = response.headers.get('content-type') || 'application/octet-stream';

                // node-fetch v2 returns a Buffer from .buffer()
                const buffer = await response.buffer();

                console.log(`[File Download] Successfully proxied ${fileType} (${buffer.length} bytes)`);

                res.set({
                    'Content-Type': contentType,
                    'Content-Length': buffer.length,
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache',
                    'Content-Disposition': `inline; filename="${fileType}"`
                });

                return res.send(buffer);
            } catch (fetchError) {
                console.error(`[File Download] Proxy fetch error for ${fileType}:`, fetchError.message);
                return res.status(502).json({ error: `Failed to fetch file from storage: ${fetchError.message}` });
            }
        }

        // Unknown format
        return res.status(400).json({ error: 'Unknown file format' });

    } catch (error) {
        console.error('[File Download] Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint 3: Get all files for a candidate as JSON (for debugging)
app.get('/api/jobfair/:id/files', async (req, res) => {
    try {
        const candidate = await getJobFairDataById(req.params.id);

        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        const files = {
            profilephoto: candidate.profilephoto ? {
                exists: true,
                type: candidate.profilephoto.startsWith('data:') ? 'base64' : 'url',
                size: candidate.profilephoto.length,
                preview: candidate.profilephoto.substring(0, 50) + '...'
            } : { exists: false },
            resume: candidate.resume ? {
                exists: true,
                type: candidate.resume.startsWith('data:') ? 'base64' : 'url',
                size: candidate.resume.length,
                preview: candidate.resume.substring(0, 50) + '...'
            } : { exists: false },
            aadhaarcard: candidate.aadhaarcard ? {
                exists: true,
                type: candidate.aadhaarcard.startsWith('data:') ? 'base64' : 'url',
                size: candidate.aadhaarcard.length,
                preview: candidate.aadhaarcard.substring(0, 50) + '...'
            } : { exists: false },
            lastsemestermarksheet: candidate.lastsemestermarksheet ? {
                exists: true,
                type: candidate.lastsemestermarksheet.startsWith('data:') ? 'base64' : 'url',
                size: candidate.lastsemestermarksheet.length,
                preview: candidate.lastsemestermarksheet.substring(0, 50) + '...'
            } : { exists: false }
        };

        res.json({
            candidateId: req.params.id,
            interviewCode: candidate.interviewCode,
            name: candidate.name,
            files
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Main Root for testing
app.get('/', (req, res) => {
    res.send("Server is running! File download endpoints available.");
});

// --- DELETE Routes ---
app.delete('/api/jobfair/:id', async (req, res) => {
    try {
        let interviewCode = null;
        try {
            const jobFairData = await getJobFairDataById(req.params.id);
            if (jobFairData) {
                interviewCode = jobFairData.interviewCode;
            }
        } catch (err) {
            console.warn("Could not fetch job fair data before delete:", err.message);
        }

        const result = await deleteJobFairData(req.params.id);

        if (interviewCode) {
            console.log(`Deleting interview data for code: ${interviewCode}`);
            await deleteInterviewDataByCode(interviewCode);
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: error.message });
    }
});

// --- GET Routes ---

app.get('/api/contacts', async (req, res) => {
    try {
        const data = await getSwordnexContacts();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/careers', async (req, res) => {
    try {
        const data = await getSwordnexCareers();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Job Fair CRUD Routes ---

app.get('/api/jobfair', async (req, res) => {
    try {
        const data = await getAllJobFairData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/jobfair/:id', async (req, res) => {
    try {
        const data = await getJobFairDataById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// --- POST Routes ---

app.post('/api/contacts', async (req, res) => {
    try {
        const { firstname, lastname, company, phone, email, enquirytype, message } = req.body;

        const contactData = {
            firstname: firstname || "",
            lastname: lastname || "",
            company: company || "",
            phone: phone || "",
            email: email || "",
            enquirytype: enquirytype || "",
            message: message || "",
            createdAt: new Date().toISOString()
        };

        const result = await addContact(contactData);
        res.status(201).json({ message: "Contact added successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const result = await deleteContact(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/careers', async (req, res) => {
    try {
        const body = req.body;
        const getValue = (val, defaultVal = "") => (val !== undefined && val !== null ? val : defaultVal);

        const careerData = {
            firstName: getValue(body.firstName),
            lastName: getValue(body.lastName),
            fullName: getValue(body.fullName, `${getValue(body.firstName)} ${getValue(body.lastName)}`.trim()),
            email: getValue(body.email),
            phone: getValue(body.phone, getValue(body.contact)),
            contact: getValue(body.contact, getValue(body.phone)),
            roleOfInterest: getValue(body.roleOfInterest),
            experienceInYears: getValue(body.experienceInYears, "Fresher"),
            experience: getValue(body.experience, getValue(body.experienceInYears, "Fresher")),
            currentEmployer: getValue(body.currentEmployer, "NA"),
            currentCTC: getValue(body.currentCTC, "NA"),
            expectedCTC: getValue(body.expectedCTC, "NA"),
            noticePeriod: getValue(body.noticePeriod, "Immediate"),
            yearOfGraduation: getValue(body.yearOfGraduation),
            gender: getValue(body.gender),
            currentLocation: getValue(body.currentLocation),
            preferredLocation: getValue(body.preferredLocation),
            skillSet: getValue(body.skillSet),
            skillsArray: Array.isArray(body.skillsArray) ? body.skillsArray : [],
            howDidYouKnow: getValue(body.howDidYouKnow),
            resumeURL: getValue(body.resumeURL, getValue(body.resume)),
            resumeFileName: getValue(body.resumeFileName),
            resumeFileSize: getValue(body.resumeFileSize, 0),
            resumeFileType: getValue(body.resumeFileType),
            createdAt: getValue(body.createdAt, new Date().toISOString()),
            submittedAt: getValue(body.submittedAt, new Date().toISOString()),
            source: getValue(body.source, 'api'),
            status: getValue(body.status, 'pending'),
            portfolio: getValue(body.portfolio),
            message: getValue(body.message),
            viewed: false,
            userAgent: getValue(body.userAgent, req.headers['user-agent'] || "Unknown"),
            timestamp: Date.now()
        };

        const result = await addCareer(careerData);
        res.status(201).json({ message: "Career application submitted successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/careers/:id', async (req, res) => {
    try {
        const result = await deleteCareer(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/jobfair', async (req, res) => {
    try {
        const body = req.body;
        const getValue = (val, defaultVal = "") => (val !== undefined && val !== null ? val : defaultVal);

        const jobFairData = {
            name: getValue(body.name),
            fathername: getValue(body.fathername),
            gender: getValue(body.gender),
            dateofbirth: getValue(body.dateofbirth),
            email: getValue(body.email),
            phonenumber: getValue(body.phonenumber),
            alternativenumber: getValue(body.alternativenumber),
            address: getValue(body.address),
            aadharnumber: getValue(body.aadharnumber),
            schoolname: getValue(body.schoolname),
            board: getValue(body.board),
            yearofpassing: getValue(body.yearofpassing),
            stream: getValue(body.stream),
            percentage: getValue(body.percentage),
            ugcollegename: getValue(body.ugcollegename),
            uguniversityname: getValue(body.uguniversityname),
            ugpassedoutyear: getValue(body.ugpassedoutyear),
            ugcourse: getValue(body.ugcourse),
            ugcgpa: getValue(body.ugcgpa),
            pgcollegename: getValue(body.pgcollegename, getValue(body.pfcollegename)),
            pguniversityname: getValue(body.pguniversityname),
            pgpassedoutyear: getValue(body.pgpassedoutyear),
            pgqualification: getValue(body.pgqualification, getValue(body.pfqualification)),
            pgcourse: getValue(body.pgcourse),
            pgcgpa: getValue(body.pgcgpa),
            lastsemestermarksheet: getValue(body.lastsemestermarksheet),
            technicalskills: getValue(body.technicalskills),
            profilephoto: getValue(body.profilephoto),
            resume: getValue(body.resume),
            aadhaarcard: getValue(body.aadhaarcard),
            interviewCode: getValue(body.interviewCode),
            createdAt: new Date().toISOString()
        };

        const result = await addJobFairData(jobFairData);

        if (jobFairData.interviewCode) {
            const interviewEntry = {
                interviewCode: jobFairData.interviewCode,
                name: jobFairData.name,
                companyCode: "NA",
                round1: "Pending",
                round2: "Pending",
                round3: "Pending",
                createdAt: new Date().toISOString()
            };
            await addInterviewData(interviewEntry);

            try {
                console.log("[Brevo] Sending job fair confirmation email");

                await upsertContact(jobFairData.email, {
                    FIRSTNAME: jobFairData.name,
                    EMAIL: jobFairData.email,
                    INTERVIEW_CODE: jobFairData.interviewCode
                });

                const key = process.env.BREVO_API_KEY;
                if (!key) {
                    console.error("[Brevo] Error: BREVO_API_KEY is missing");
                }

                const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
                const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

                sendSmtpEmail.templateId = 9;
                sendSmtpEmail.to = [{ email: jobFairData.email, name: jobFairData.name }];
                sendSmtpEmail.sender = { email: "noreply@swordnex.com", name: "SwordNex Recruitment" };
                sendSmtpEmail.replyTo = { email: "noreply@swordnex.com", name: "SwordNex Recruitment" };

                sendSmtpEmail.params = {
                    first_name: jobFairData.name,
                    email: jobFairData.email,
                    interview_code: jobFairData.interviewCode,
                    FIRST_NAME: jobFairData.name,
                    EMAIL: jobFairData.email,
                    INTERVIEW_CODE: jobFairData.interviewCode,
                    name: jobFairData.name,
                    interviewCode: jobFairData.interviewCode
                };

                const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
                console.log("[Brevo] Job fair confirmation email sent");
            } catch (emailError) {
                console.error("[Brevo] Error sending email:", emailError);
            }
        }

        res.status(201).json({ message: "Job fair data added successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- UPDATE Routes ---

app.put('/api/jobfair/:id', async (req, res) => {
    try {
        const result = await updateJobFairData(req.params.id, req.body);
        res.status(200).json({ message: "Job fair data updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Interview CRUD Routes ---

app.get('/api/interviews', async (req, res) => {
    try {
        const data = await getAllInterviewData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/interviews/:id', async (req, res) => {
    try {
        const data = await getInterviewDataById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.post('/api/interviews', async (req, res) => {
    try {
        const body = req.body;
        const getValue = (val, defaultVal = "") => (val !== undefined && val !== null ? val : defaultVal);

        const interviewData = {
            interviewCode: getValue(body.interviewCode),
            name: getValue(body.name),
            companyCode: getValue(body.companyCode, getValue(body.companycode)),
            round1: getValue(body.round1),
            round2: getValue(body.round2),
            round3: getValue(body.round3),
            createdAt: new Date().toISOString()
        };

        const result = await addInterviewData(interviewData);
        res.status(201).json({ message: "Interview data added successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/interviews/:id', async (req, res) => {
    try {
        const result = await updateInterviewData(req.params.id, req.body);
        res.status(200).json({ message: "Interview data updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/interviews/:id', async (req, res) => {
    try {
        const result = await deleteInterviewData(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Appointment CRUD Routes ---

app.get('/api/appointments', async (req, res) => {
    try {
        const data = await getAllAppointments();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/appointments/:id', async (req, res) => {
    try {
        const data = await getAppointmentById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.post('/api/appointments', async (req, res) => {
    try {
        const body = req.body;
        const getValue = (val, defaultVal = "") => (val !== undefined && val !== null ? val : defaultVal);

        const appointmentData = {
            name: getValue(body.name),
            email: getValue(body.email),
            phonenumber: getValue(body.phonenumber),
            availabledate: getValue(body.availabledate),
            message: getValue(body.message),
            createdAt: new Date().toISOString()
        };

        const result = await addAppointment(appointmentData);
        res.status(201).json({ message: "Appointment added successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/appointments/:id', async (req, res) => {
    try {
        const result = await updateAppointment(req.params.id, req.body);
        res.status(200).json({ message: "Appointment updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/appointments/:id', async (req, res) => {
    try {
        const result = await deleteAppointment(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Chatbot Leads Routes ---

app.get('/api/chatbot-leads', async (req, res) => {
    try {
        const data = await getAllChatbotLeads();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/chatbot-leads', async (req, res) => {
    try {
        const result = await addChatbotLead(req.body);
        res.status(201).json({ message: "Chatbot lead added successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/chatbot-leads/:id', async (req, res) => {
    try {
        const result = await deleteChatbotLead(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/chatbot-leads/:id', async (req, res) => {
    try {
        const result = await updateChatbotLead(req.params.id, req.body);
        res.status(200).json({ message: "Chatbot lead updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Service Enquiry CRUD Routes ---

app.get('/api/service-enquiries', async (req, res) => {
    try {
        const data = await getAllServiceEnquiries();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/service-enquiries/:id', async (req, res) => {
    try {
        const data = await getServiceEnquiryById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.post('/api/service-enquiries', async (req, res) => {
    try {
        const body = req.body;
        const getValue = (val, defaultVal = "") => (val !== undefined && val !== null ? val : defaultVal);

        const enquiryData = {
            firstname: getValue(body.firstname),
            lastname: getValue(body.lastname),
            email: getValue(body.email),
            phonenumber: getValue(body.phonenumber),
            company: getValue(body.company),
            service: getValue(body.service),
            projectdescription: getValue(body.projectdescription),
            createdAt: new Date().toISOString()
        };

        const result = await addServiceEnquiry(enquiryData);
        res.status(201).json({ message: "Service enquiry added successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/service-enquiries/:id', async (req, res) => {
    try {
        const result = await updateServiceEnquiry(req.params.id, req.body);
        res.status(200).json({ message: "Service enquiry updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/service-enquiries/:id', async (req, res) => {
    try {
        const result = await deleteServiceEnquiry(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Helper: Sync Contact to Brevo ---

async function upsertContact(email, attributes) {
    const brevo = setupBrevo();
    const contactsApi = new brevo.ContactsApi();
    const createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email;
    createContact.attributes = attributes;
    createContact.updateEnabled = true;

    try {
        await contactsApi.createContact(createContact);
        console.log("[Brevo] Contact synced");
    } catch (error) {
        console.warn(`[Brevo] Contact sync warning:`, error.message);
    }
}

// Email Trigger Endpoint
app.post('/api/trigger-email', async (req, res) => {
    try {
        const { email, name, interviewCode } = req.body;
        console.log("[Brevo] Manual email trigger");

        const brevo = setupBrevo();

        await upsertContact(email, {
            FIRSTNAME: name,
            EMAIL: email,
            INTERVIEW_CODE: interviewCode,
            INTERVIEWCODE: interviewCode
        });

        const apiInstance = new brevo.TransactionalEmailsApi();
        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.templateId = 9;
        sendSmtpEmail.to = [{ email: email, name: name }];
        sendSmtpEmail.sender = { email: "noreply@swordnex.com", name: "SwordNex Job Fair" };
        sendSmtpEmail.replyTo = { email: "noreply@swordnex.com", name: "SwordNex Recruitment" };

        sendSmtpEmail.params = {
            first_name: name,
            email: email,
            interview_code: interviewCode,
            FIRST_NAME: name,
            EMAIL: email,
            INTERVIEW_CODE: interviewCode,
            name: name,
            interviewCode: interviewCode
        };

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("[Brevo] Manual email sent");
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("[Brevo] Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// --- Events CRUD Routes ---

app.get('/api/events', async (req, res) => {
    try {
        const data = await getAllEvents();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Slug-based route — MUST be before /:id
app.get('/api/events/slug/:slug', async (req, res) => {
    try {
        const data = await getEventBySlug(req.params.slug);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.get('/api/events/:id', async (req, res) => {
    try {
        const data = await getEventById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.post('/api/events', async (req, res) => {
    try {
        const body = req.body;
        const getValue = (val, defaultVal = '') => (val !== undefined && val !== null ? val : defaultVal);

        const eventData = {
            title: getValue(body.title),
            subtitle: getValue(body.subtitle),
            date: getValue(body.date),
            time: getValue(body.time),
            venue: getValue(body.venue),
            category: getValue(body.category),
            badge: getValue(body.badge),
            badgeColor: getValue(body.badgeColor),
            description: getValue(body.description),
            highlightPoints: getValue(body.highlightPoints),
            locationDetails: getValue(body.locationDetails),
        };

        const result = await addEvent(eventData);
        res.status(201).json({ message: 'Event added successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/events/:id', async (req, res) => {
    try {
        const result = await updateEvent(req.params.id, req.body);
        res.status(200).json({ message: 'Event updated successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/events/:id', async (req, res) => {
    try {
        const result = await deleteEvent(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/workshops/slug/:slug', async (req, res) => {
    try {
        const data = await getWorkshopBySlug(req.params.slug);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// --- Workshop Subcollection Registration Routes ---

app.post('/api/workshops/:workshopId/register', async (req, res) => {
    try {
        const { workshopId } = req.params;
        const body = req.body;
        const getValue = (val, defaultVal = '') => (val !== undefined && val !== null ? val : defaultVal);

        // Resolve slug to real ID if necessary
        let finalParentId = workshopId;
        try {
            const workshopData = await getWorkshopBySlug(workshopId);
            if (workshopData && workshopData.id) {
                finalParentId = workshopData.id;
            }
        } catch (err) {
            console.warn(`[Registration] Could not resolve workshop ID/Slug ${workshopId}, using directly.`);
        }

        const regData = {
            eventId: finalParentId,
            workshopId: finalParentId,
            workshopSlug: workshopId,
            eventTitle: getValue(body.eventTitle),
            name: getValue(body.name),
            email: getValue(body.email),
            whatsappNo: getValue(body.whatsappNo),
            collegeName: getValue(body.collegeName),
            type: 'workshop',
            createdAt: new Date().toISOString()
        };

        const result = await addEventSubRegistration(finalParentId, regData, 'swordnex-workshops');
        res.status(201).json({ message: 'Registration successful', data: result });
    } catch (error) {
        console.error('Workshop registration error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/workshops/:workshopId/registrations', async (req, res) => {
    try {
        const data = await getEventSubRegistrations(req.params.workshopId, 'swordnex-workshops');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Event Registrations Routes ---

app.get('/api/event-registrations', async (req, res) => {
    try {
        const data = await getAllRegistrations();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/event-registrations/event/:eventId', async (req, res) => {
    try {
        const data = await getRegistrationsByEvent(req.params.eventId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/event-registrations', async (req, res) => {
    try {
        const body = req.body;
        const getValue = (val, defaultVal = '') => (val !== undefined && val !== null ? val : defaultVal);
        const regData = {
            eventId: getValue(body.eventId),
            eventTitle: getValue(body.eventTitle),
            name: getValue(body.name),
            email: getValue(body.email),
            phone: getValue(body.phone),
            organization: getValue(body.organization),
            message: getValue(body.message),
        };
        const result = await addEventRegistration(regData);
        res.status(201).json({ message: 'Registration submitted successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/event-registrations/:id', async (req, res) => {
    try {
        const result = await deleteEventRegistration(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Event Subcollection Registration Routes ---
// Files are uploaded client-side to Firebase Storage.
// This route receives only JSON with file download URLs.

// POST /api/events/:eventId/register  (JSON body — full candidate data)
app.post('/api/events/:eventId/register', async (req, res) => {
    try {
        const { eventId } = req.params;
        const body = req.body;
        const getValue = (val, defaultVal = '') => (val !== undefined && val !== null ? val : defaultVal);

        const regData = {
            eventId,
            eventTitle: getValue(body.eventTitle),
            interviewCode: getValue(body.interviewCode),

            // Section 1 — Personal Details
            name: getValue(body.name),
            fathername: getValue(body.fathername),
            dateofbirth: getValue(body.dateofbirth),
            gender: getValue(body.gender),
            email: getValue(body.email),
            phonenumber: getValue(body.phonenumber),
            alternativenumber: getValue(body.alternativenumber),
            address: getValue(body.address),

            // Section 2 — 12th Details
            schoolname: getValue(body.schoolname),
            board: getValue(body.board),
            yearofpassing: getValue(body.yearofpassing),
            stream: getValue(body.stream),
            percentage: getValue(body.percentage),

            // Section 3 — UG Details
            ugcollegename: getValue(body.ugcollegename),
            uguniversityname: getValue(body.uguniversityname),
            ugpassedoutyear: getValue(body.ugpassedoutyear),
            ugcourse: getValue(body.ugcourse),
            ugcgpa: getValue(body.ugcgpa),

            // Section 4 — PG Details (optional)
            pgcollegename: getValue(body.pgcollegename),
            pguniversityname: getValue(body.pguniversityname),
            pgpassedoutyear: getValue(body.pgpassedoutyear),
            pgqualification: getValue(body.pgqualification),
            pgcourse: getValue(body.pgcourse),
            pgcgpa: getValue(body.pgcgpa),

            // Section 5 — Skills
            technicalskills: getValue(body.technicalskills),

            // Section 6 — Identity
            aadharnumber: getValue(body.aadharnumber),

            // Section 7 — Document URLs (uploaded to Firebase Storage client-side)
            profilephoto: getValue(body.profilephoto),
            resume: getValue(body.resume),
            aadhaarcard: getValue(body.aadhaarcard),
            lastsemestermarksheet: getValue(body.lastsemestermarksheet),

            createdAt: new Date().toISOString(),
        };

        const result = await addEventSubRegistration(eventId, regData);

        // Send confirmation email if interviewCode provided
        if (regData.interviewCode && regData.email) {
            try {
                const brevo = setupBrevo();
                await upsertContact(regData.email, {
                    FIRSTNAME: regData.name,
                    EMAIL: regData.email,
                    INTERVIEW_CODE: regData.interviewCode
                });
                const apiInstance = new brevo.TransactionalEmailsApi();
                const sendSmtpEmail = new brevo.SendSmtpEmail();
                sendSmtpEmail.templateId = 9;
                sendSmtpEmail.to = [{ email: regData.email, name: regData.name }];
                sendSmtpEmail.sender = { email: 'noreply@swordnex.com', name: 'SwordNex Events' };
                sendSmtpEmail.replyTo = { email: 'noreply@swordnex.com', name: 'SwordNex Events' };
                sendSmtpEmail.params = {
                    first_name: regData.name, FIRST_NAME: regData.name, name: regData.name,
                    email: regData.email, EMAIL: regData.email,
                    interview_code: regData.interviewCode, INTERVIEW_CODE: regData.interviewCode,
                    interviewCode: regData.interviewCode
                };
                await apiInstance.sendTransacEmail(sendSmtpEmail);
                console.log("[Brevo] Event registration email sent");
            } catch (emailErr) {
                console.error('[Brevo] Event registration email error:', emailErr.message);
            }
        }

        res.status(201).json({ message: 'Registration successful', data: result });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: error.message });
    }
});


// GET /api/events/:eventId/registrations
app.get('/api/events/:eventId/registrations', async (req, res) => {
    try {
        const data = await getEventSubRegistrations(req.params.eventId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/events/:eventId/registrations/:registrationId
app.delete('/api/events/:eventId/registrations/:registrationId', async (req, res) => {
    try {
        const result = await deleteEventSubRegistration(req.params.eventId, req.params.registrationId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Partners Routes ---
app.get('/api/partners', async (req, res) => {
    try {
        const data = await getAllPartners();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/partners/upload', async (req, res) => {
    try {
        const { images } = req.body;
        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const uploadedPartners = [];
        for (const file of images) {
            const matches = file.base64.match(/^data:([^;]+);base64,(.+)$/);
            if (!matches) {
                console.warn("Skipping invalid base64 file:", file.name);
                continue;
            }

            const mimeType = matches[1];
            const buffer = Buffer.from(matches[2], 'base64');

            const publicUrl = await uploadPartnerImage(buffer, file.name, mimeType);
            const partnerData = await addPartner({
                imageUrl: publicUrl,
                originalName: file.name,
            });
            uploadedPartners.push(partnerData);
        }

        if (uploadedPartners.length === 0) {
            return res.status(400).json({ error: 'Failed to process any valid files' });
        }

        res.status(201).json({ message: 'Partners uploaded successfully', data: uploadedPartners });
    } catch (error) {
        console.error('Partner upload error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/partners/:id', async (req, res) => {
    try {
        const result = await deletePartner(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== DASHBOARD SYNC API ==================== //

// --- Jobs Routes ---
app.get('/api/jobs', async (req, res) => {
    try {
        const data = await getAllJobs();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/jobs', async (req, res) => {
    try {
        const result = await addJob(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/jobs/:id', async (req, res) => {
    try {
        const result = await updateJob(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/jobs/:id', async (req, res) => {
    try {
        const result = await deleteJob(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/careers/:id', async (req, res) => {
    try {
        const data = await getCareerById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.put('/api/careers/:id', async (req, res) => {
    try {
        const result = await updateCareer(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Course Enquiries Routes ---
app.get('/api/course-enquiries', async (req, res) => {
    try {
        const data = await getAllCourseEnquiries();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/course-enquiries', async (req, res) => {
    try {
        const result = await addCourseEnquiry(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/course-enquiries/:id', async (req, res) => {
    try {
        const result = await deleteCourseEnquiry(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== AFFILIATE API ENDPOINTS ==================== //

app.post('/api/affiliate/register', async (req, res) => {
    try {
        const result = await registerAffiliate(req.body);
        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/affiliate/dashboard', async (req, res) => {
    try {
        const { affiliateId } = req.query;
        if (!affiliateId) return res.status(400).json({ success: false, error: 'affiliateId required' });
        const result = await getDashboard(affiliateId);
        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/affiliate/generate-code', async (req, res) => {
    try {
        const { affiliateId, product, label } = req.body;
        if (!affiliateId) return res.status(400).json({ success: false, error: 'affiliateId required' });
        const result = await generateCode(affiliateId, product, label);
        res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/affiliate/codes', async (req, res) => {
    try {
        const { affiliateId } = req.query;
        if (!affiliateId) return res.status(400).json({ success: false, error: 'affiliateId required' });
        const result = await getCodes(affiliateId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/affiliate/clicks', async (req, res) => {
    try {
        const { affiliateId, period } = req.query;
        if (!affiliateId) return res.status(400).json({ success: false, error: 'affiliateId required' });
        const result = await getClicks(affiliateId, period);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/affiliate/commissions', async (req, res) => {
    try {
        const { affiliateId } = req.query;
        if (!affiliateId) return res.status(400).json({ success: false, error: 'affiliateId required' });
        const result = await getCommissions(affiliateId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/affiliate/request-payout', async (req, res) => {
    try {
        const { affiliateId, amount } = req.body;
        const payoutAmount = Number(amount);
        if (!affiliateId || !Number.isFinite(payoutAmount) || payoutAmount <= 0) {
            return res.status(400).json({ success: false, error: 'affiliateId and a positive amount are required' });
        }
        const result = await requestPayout(affiliateId, payoutAmount);
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/affiliate/payouts', async (req, res) => {
    try {
        const { affiliateId } = req.query;
        if (!affiliateId) return res.status(400).json({ success: false, error: 'affiliateId required' });
        const result = await getPayouts(affiliateId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/r/:code', async (req, res) => {
    try {
        const { code } = req.params;
        const { product } = req.query;
        const result = await trackClick(
            code,
            product,
            req.ip || req.connection?.remoteAddress,
            req.headers['user-agent'],
            req.headers['referer']
        );
        res.redirect(302, result.redirect || 'https://www.swordnex.com/products');
    } catch (error) {
        res.redirect(302, 'https://www.swordnex.com/products');
    }
});

app.post('/api/affiliate/record-conversion', async (req, res) => {
    try {
        const { code, customerEmail, product, amount } = req.body;
        if (!code || !customerEmail || !amount) {
            return res.status(400).json({ success: false, error: 'code, customerEmail, and amount required' });
        }
        const result = await recordConversion(code, customerEmail, product, amount);
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/affiliate/settings', async (req, res) => {
    try {
        const { affiliateId, ...data } = req.body;
        if (!affiliateId) return res.status(400).json({ success: false, error: 'affiliateId required' });
        const result = await updateSettings(affiliateId, data);
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/affiliate/profile', async (req, res) => {
    try {
        const { affiliateId } = req.query;
        if (!affiliateId) return res.status(400).json({ success: false, error: 'affiliateId required' });
        const result = await getAffiliateByUid(affiliateId);
        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ==================== ADMIN AFFILIATE ENDPOINTS ==================== //

app.get('/api/admin/affiliates', async (req, res) => {
    try {
        const result = await getAllAffiliates();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/admin/affiliate-payouts', async (req, res) => {
    try {
        const result = await getAllPayouts();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/admin/affiliate-payouts/:id', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['paid', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Status must be "paid" or "rejected"' });
        }
        const result = await updatePayoutStatus(req.params.id, status);
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/admin/affiliate-commissions/:id', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['approved', 'cancelled'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Status must be "approved" or "cancelled"' });
        }
        const result = await updateCommissionStatus(req.params.id, status);
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/admin/affiliates/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['active', 'suspended'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Status must be "active" or "suspended"' });
        }
        const result = await updateAffiliateStatus(req.params.id, status);
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.delete('/api/admin/affiliates/:id', async (req, res) => {
    try {
        const result = await deleteAffiliate(req.params.id);
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ── User Management & Roles ─────────────────────────────────────────────────
// Access to these routes is checked by middleware/auth.js (Admin only, except /api/roles).

app.get('/api/roles', (req, res) => {
    res.json({ roles: STAFF_ROLES });
});

app.post('/api/users/create', async (req, res) => {
    const { email, password, role, firstName, lastName, mobileNumber } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    if (!STAFF_ROLES.includes(role)) {
        return res.status(400).json({ error: `Role must be one of: ${STAFF_ROLES.join(', ')}` });
    }
    try {
        const userRecord = await admin.auth().createUser({ email, password });
        const uid = userRecord.uid;
        await admin.firestore().collection('users').doc(uid).set({
            firstName: firstName || '',
            lastName: lastName || '',
            email,
            role,
            mobileNumber: mobileNumber || '',
            createdAt: new Date().toISOString(),
        });
        res.json({ success: true, uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const snapshot = await admin.firestore().collection('users').get();
        const users = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(u => STAFF_ROLES.includes(u.role));
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    if (req.params.id === req.user.uid) {
        return res.status(400).json({ error: 'You cannot delete your own account' });
    }
    try {
        await admin.auth().deleteUser(req.params.id);
        await admin.firestore().collection('users').doc(req.params.id).delete();
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Global error handler (must be registered after all routes)
app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    res.status(err.status || 500).json({
        error: true,
        message: err.status && err.status < 500 ? err.message : "Internal Server Error"
    });
});

module.exports = app;

// Allow running standalone for local dev (without Firebase emulator)
if (require.main === module) {
    const mount = require('express')();
    // Mount at root so /api/* works directly
    mount.use(app);
    // Also match Firebase emulator prefix used in apiConfig.js:
    // The frontend fetches: ${API_BASE_URL}/api/... 
    // = http://localhost:5000/swordnex-sites/us-central1/api/api/...
    // The emulator strips /swordnex-sites/us-central1/api (function name),
    // leaving /api/... which matches Express routes.
    mount.use('/swordnex-sites/us-central1/api', app);
    const PORT = process.env.PORT || 5000;
    mount.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`  → http://localhost:${PORT}/api/blogs`);
        console.log(`  → http://localhost:${PORT}/swordnex-sites/us-central1/api/blogs`);
    });
}
