const crypto = require('crypto');
const { admin, db } = require('../firebaseConfig');
const { findPolicy } = require('../accessPolicy');

const STAFF_ROLES = ['Admin', 'HR', 'Support', 'Marketing', 'Finance'];

/**
 * Verifies the Firebase ID token in "Authorization: Bearer <token>" and loads
 * the caller's role from users/{uid}. Returns null when there is no valid token.
 */
async function getCaller(req) {
    const header = req.headers.authorization || '';
    const match = header.match(/^Bearer (.+)$/);
    if (!match) return null;

    try {
        const decoded = await admin.auth().verifyIdToken(match[1]);
        const snap = await db.collection('users').doc(decoded.uid).get();
        const role = snap.exists ? snap.data().role || null : null;
        return { uid: decoded.uid, email: decoded.email || null, role };
    } catch (error) {
        return null;
    }
}

function secretMatches(provided, expected) {
    if (!provided || !expected) return false;
    const a = Buffer.from(String(provided));
    const b = Buffer.from(String(expected));
    return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/**
 * Enforces accessPolicy for every /api request. Routes not listed in the
 * policy are denied, so a new route stays private until it is classified.
 */
async function authorize(req, res, next) {
    if (req.method === 'OPTIONS' || !req.path.startsWith('/api/')) return next();

    const policy = findPolicy(req.method, req.path);
    if (!policy) return res.status(404).json({ error: 'Not found' });

    const access = typeof policy.access === 'function' ? policy.access(req) : policy.access;

    if (access === 'public') return next();

    if (access === 'webhook') {
        if (secretMatches(req.headers['x-affiliate-secret'], process.env.AFFILIATE_WEBHOOK_SECRET)) return next();
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const caller = await getCaller(req);
    if (!caller) return res.status(401).json({ error: 'Login required' });
    req.user = caller;

    if (access === 'affiliate-self') {
        const affiliateId = req.query.affiliateId || (req.body && req.body.affiliateId);
        if (caller.role === 'Admin' || (caller.role === 'affiliate' && affiliateId === caller.uid)) return next();
        return res.status(403).json({ error: 'Forbidden' });
    }

    // access is a list of staff roles; Admin can always act.
    if (caller.role === 'Admin' || access.includes(caller.role)) return next();
    return res.status(403).json({ error: 'Forbidden' });
}

module.exports = { authorize, STAFF_ROLES };
