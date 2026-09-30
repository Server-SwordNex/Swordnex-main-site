// const { onRequest } = require('firebase-functions/v2/https');
// const { onUserDeleted } = require('firebase-functions/v2/identity');

// const admin = require('firebase-admin');
// if (admin.apps.length === 0) {
//     admin.initializeApp();
// }
// const db = admin.firestore();

// async function deleteAffiliateData(uid) {
//     const batch = admin.firestore().batch();

//     // Delete affiliate profile
//     batch.delete(db.collection('affiliates').doc(uid));
//     // Delete auth-compat user record
//     batch.delete(db.collection('users').doc(uid));

//     // Delete all referral codes
//     const codesSnap = await db.collection('affiliate_codes')
//         .where('affiliateId', '==', uid).get();
//     codesSnap.forEach(doc => batch.delete(doc.ref));

//     // Delete all clicks
//     const clicksSnap = await db.collection('affiliate_clicks')
//         .where('affiliateId', '==', uid).get();
//     clicksSnap.forEach(doc => batch.delete(doc.ref));

//     // Delete all commissions
//     const commissionsSnap = await db.collection('affiliate_commissions')
//         .where('affiliateId', '==', uid).get();
//     commissionsSnap.forEach(doc => batch.delete(doc.ref));

//     // Delete all payouts
//     const payoutsSnap = await db.collection('affiliate_payouts')
//         .where('affiliateId', '==', uid).get();
//     payoutsSnap.forEach(doc => batch.delete(doc.ref));

//     await batch.commit();
//     console.log(`Cleaned up all affiliate data for uid: ${uid}`);
// }

// // Auto-cleanup when an affiliate user is deleted from Firebase Auth Console
// exports.onAffiliateUserDeleted = onUserDeleted(async (event) => {
//     const uid = event.data.uid;
//     try {
//         const affDoc = await db.collection('affiliates').doc(uid).get();
//         if (affDoc.exists) {
//             await deleteAffiliateData(uid);
//         }
//     } catch (error) {
//         console.error(`Error cleaning up affiliate ${uid}:`, error.message);
//     }
// });

// // Create the app only when needed
// exports.api = onRequest({
//     secrets: ["BREVO_API_KEY"],
//     cors: true,
//     timeoutSeconds: 120,
//     memory: '256MiB'
// }, async (req, res) => {
//     const app = require('./src/server');
//     return app(req, res);
// });

// // Also expose the cleanup function as an admin API endpoint for manual use
// exports.deleteAffiliateData = deleteAffiliateData;


const functions = require('firebase-functions');
const { onRequest } = require('firebase-functions/v2/https');

const admin = require('firebase-admin');

if (admin.apps.length === 0) {
    admin.initializeApp();
}

const db = admin.firestore();

/**
 * Deletes all affiliate-related data for a user
 */
async function deleteAffiliateData(uid) {
    try {
        const batch = db.batch();

        // Delete affiliate profile
        batch.delete(db.collection('affiliates').doc(uid));

        // Delete auth-compatible user record
        batch.delete(db.collection('users').doc(uid));

        // Delete referral codes
        const codesSnap = await db
            .collection('affiliate_codes')
            .where('affiliateId', '==', uid)
            .get();

        codesSnap.forEach((doc) => {
            batch.delete(doc.ref);
        });

        // Delete clicks
        const clicksSnap = await db
            .collection('affiliate_clicks')
            .where('affiliateId', '==', uid)
            .get();

        clicksSnap.forEach((doc) => {
            batch.delete(doc.ref);
        });

        // Delete commissions
        const commissionsSnap = await db
            .collection('affiliate_commissions')
            .where('affiliateId', '==', uid)
            .get();

        commissionsSnap.forEach((doc) => {
            batch.delete(doc.ref);
        });

        // Delete payouts
        const payoutsSnap = await db
            .collection('affiliate_payouts')
            .where('affiliateId', '==', uid)
            .get();

        payoutsSnap.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();

        console.log(`Successfully cleaned affiliate data for user ${uid}`);
    } catch (error) {
        console.error(`Failed deleting affiliate data for ${uid}:`, error);
        throw error;
    }
}

/**
 * Trigger when Firebase Auth user is deleted
 */
exports.onAffiliateUserDeleted = functions.auth
    .user()
    .onDelete(async (user) => {
        const uid = user.uid;

        try {
            const affiliateDoc = await db
                .collection('affiliates')
                .doc(uid)
                .get();

            if (affiliateDoc.exists) {
                await deleteAffiliateData(uid);
            }
        } catch (error) {
            console.error(
                `Error processing deleted affiliate ${uid}:`,
                error
            );
        }
    });

/**
 * Main Express API
 */
exports.api = onRequest(
    {
        secrets: ['BREVO_API_KEY'],
        cors: true,
        timeoutSeconds: 120,
        memory: '256MiB',
    },
    async (req, res) => {
        const app = require('./src/server');
        return app(req, res);
    }
);

/**
 * Export helper for manual usage
 */
exports.deleteAffiliateData = deleteAffiliateData;