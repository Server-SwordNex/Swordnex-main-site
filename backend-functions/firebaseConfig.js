const admin = require('firebase-admin');

// In Firebase Functions, we can initialize without arguments if running in the environment
if (admin.apps.length === 0) {
    try {
        admin.initializeApp();
    } catch (e) {
        console.error('Firebase init error (non-fatal):', e.message);
    }
}

const db = admin.apps.length > 0 ? admin.firestore() : null;

const bucket = (() => {
    try {
        return admin.storage().bucket();
    } catch (e) {
        return null;
    }
})();

module.exports = { db, bucket, admin };

