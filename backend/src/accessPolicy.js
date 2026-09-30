/**
 * Who may call each API route. The authorize middleware denies any /api route
 * that is not listed here.
 *
 * access values:
 *   'public'         anyone (website content and public form submissions)
 *   'webhook'        server-to-server; needs the x-affiliate-secret header
 *   'affiliate-self' a logged-in affiliate acting on their own affiliateId
 *   [roles]          logged-in staff with one of these roles (Admin always allowed)
 *   (req) => access  decided per request
 */

const HR = ['HR'];
const SUPPORT = ['Support'];
const MARKETING = ['Marketing'];
const FINANCE = ['Finance'];
const EVENTS_STAFF = ['HR', 'Marketing'];
const ADMIN = [];

const rules = [
    // --- Website content (public reads) ---
    ['GET', '/api/workshops', 'public'],
    ['GET', '/api/workshops/slug/:slug', 'public'],
    ['GET', '/api/workshops/:id', 'public'],
    ['GET', '/api/events', 'public'],
    ['GET', '/api/events/slug/:slug', 'public'],
    ['GET', '/api/events/:id', 'public'],
    ['GET', '/api/blogs', (req) => (req.query.published === 'true' ? 'public' : MARKETING)],
    ['GET', '/api/blogs/slug/:slug', 'public'],
    ['GET', '/api/blogs/:id', MARKETING],
    ['GET', '/api/partners', 'public'],
    ['GET', '/api/jobs', 'public'],
    ['GET', '/api/roles', 'public'],

    // --- Public form submissions ---
    ['POST', '/api/contacts', 'public'],
    ['POST', '/api/careers', 'public'],
    ['POST', '/api/jobfair', 'public'],
    ['POST', '/api/appointments', 'public'],
    ['POST', '/api/chatbot-leads', 'public'],
    ['POST', '/api/service-enquiries', 'public'],
    ['POST', '/api/course-enquiries', 'public'],
    ['POST', '/api/event-registrations', 'public'],
    ['POST', '/api/workshops/:workshopId/register', 'public'],
    ['POST', '/api/events/:eventId/register', 'public'],
    ['POST', '/api/affiliate/register', 'public'],

    // --- HR: applications, jobs, job fair, interviews ---
    ['GET', '/api/careers', HR],
    ['GET', '/api/careers/:id', HR],
    ['PUT', '/api/careers/:id', HR],
    ['DELETE', '/api/careers/:id', HR],
    ['POST', '/api/jobs', HR],
    ['PUT', '/api/jobs/:id', HR],
    ['DELETE', '/api/jobs/:id', HR],
    ['GET', '/api/jobfair', HR],
    ['GET', '/api/jobfair/:id', HR],
    ['GET', '/api/jobfair/:id/file/:fileType', HR],
    ['GET', '/api/jobfair/:id/files', HR],
    ['PUT', '/api/jobfair/:id', HR],
    ['DELETE', '/api/jobfair/:id', HR],
    ['GET', '/api/interviews', HR],
    ['GET', '/api/interviews/:id', HR],
    ['POST', '/api/interviews', HR],
    ['PUT', '/api/interviews/:id', HR],
    ['DELETE', '/api/interviews/:id', HR],
    ['POST', '/api/trigger-email', HR],

    // --- Support: enquiries and leads ---
    ['GET', '/api/contacts', SUPPORT],
    ['DELETE', '/api/contacts/:id', SUPPORT],
    ['GET', '/api/appointments', SUPPORT],
    ['GET', '/api/appointments/:id', SUPPORT],
    ['PUT', '/api/appointments/:id', SUPPORT],
    ['DELETE', '/api/appointments/:id', SUPPORT],
    ['GET', '/api/chatbot-leads', SUPPORT],
    ['PUT', '/api/chatbot-leads/:id', SUPPORT],
    ['DELETE', '/api/chatbot-leads/:id', SUPPORT],
    ['GET', '/api/service-enquiries', SUPPORT],
    ['GET', '/api/service-enquiries/:id', SUPPORT],
    ['PUT', '/api/service-enquiries/:id', SUPPORT],
    ['DELETE', '/api/service-enquiries/:id', SUPPORT],
    ['GET', '/api/course-enquiries', SUPPORT],
    ['DELETE', '/api/course-enquiries/:id', SUPPORT],

    // --- Marketing: site content ---
    ['POST', '/api/workshops', MARKETING],
    ['PUT', '/api/workshops/:id', MARKETING],
    ['DELETE', '/api/workshops/:id', MARKETING],
    ['POST', '/api/events', MARKETING],
    ['PUT', '/api/events/:id', MARKETING],
    ['DELETE', '/api/events/:id', MARKETING],
    ['POST', '/api/blogs', MARKETING],
    ['PUT', '/api/blogs/:id', MARKETING],
    ['DELETE', '/api/blogs/:id', MARKETING],
    ['POST', '/api/partners/upload', MARKETING],
    ['DELETE', '/api/partners/:id', MARKETING],

    // --- Event and workshop registrations (contain applicant data) ---
    ['GET', '/api/workshops/:workshopId/registrations', EVENTS_STAFF],
    ['GET', '/api/events/:eventId/registrations', EVENTS_STAFF],
    ['DELETE', '/api/events/:eventId/registrations/:registrationId', EVENTS_STAFF],
    ['GET', '/api/event-registrations', EVENTS_STAFF],
    ['GET', '/api/event-registrations/event/:eventId', EVENTS_STAFF],
    ['DELETE', '/api/event-registrations/:id', EVENTS_STAFF],

    // --- Affiliates ---
    ['GET', '/api/affiliate/dashboard', 'affiliate-self'],
    ['POST', '/api/affiliate/generate-code', 'affiliate-self'],
    ['GET', '/api/affiliate/codes', 'affiliate-self'],
    ['GET', '/api/affiliate/clicks', 'affiliate-self'],
    ['GET', '/api/affiliate/commissions', 'affiliate-self'],
    ['POST', '/api/affiliate/request-payout', 'affiliate-self'],
    ['GET', '/api/affiliate/payouts', 'affiliate-self'],
    ['PUT', '/api/affiliate/settings', 'affiliate-self'],
    ['GET', '/api/affiliate/profile', 'affiliate-self'],
    ['POST', '/api/affiliate/record-conversion', 'webhook'],

    // --- Affiliate administration ---
    ['GET', '/api/admin/affiliates', FINANCE],
    ['GET', '/api/admin/affiliate-payouts', FINANCE],
    ['PUT', '/api/admin/affiliate-payouts/:id', FINANCE],
    ['PUT', '/api/admin/affiliate-commissions/:id', FINANCE],
    ['PUT', '/api/admin/affiliates/:id/status', ADMIN],
    ['DELETE', '/api/admin/affiliates/:id', ADMIN],

    // --- Staff user management ---
    ['GET', '/api/users', ADMIN],
    ['POST', '/api/users/create', ADMIN],
    ['DELETE', '/api/users/:id', ADMIN],
];

const compiled = rules.map(([method, pattern, access]) => ({
    method,
    segments: pattern.split('/').filter(Boolean),
    access,
}));

function matches(segments, pathSegments) {
    if (segments.length !== pathSegments.length) return false;
    return segments.every((seg, i) => seg.startsWith(':') || seg === pathSegments[i]);
}

function findPolicy(method, path) {
    const pathSegments = path.split('/').filter(Boolean);
    // Literal segments win over parameters, e.g. /api/workshops/slug/:slug before /api/workshops/:id/...
    return compiled
        .filter((rule) => rule.method === method && matches(rule.segments, pathSegments))
        .sort((a, b) => countParams(a.segments) - countParams(b.segments))[0] || null;
}

function countParams(segments) {
    return segments.filter((seg) => seg.startsWith(':')).length;
}

module.exports = { findPolicy, rules };
