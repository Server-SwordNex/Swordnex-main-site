/**
 * Give an existing Firebase Auth account a staff role.
 *
 * Usage (from backend/):
 *   node scripts/set-role.js someone@swordnex.com Admin
 *
 * The account must already exist (create it in Firebase Console → Authentication).
 * Credentials: set GOOGLE_APPLICATION_CREDENTIALS to a service-account key for
 * swordnex-sites, or run `gcloud auth application-default login` first.
 */
const admin = require('firebase-admin');
const { STAFF_ROLES } = require('../src/middleware/auth');

async function main() {
    const [email, role] = process.argv.slice(2);
    if (!email || !STAFF_ROLES.includes(role)) {
        console.error(`Usage: node scripts/set-role.js <email> <${STAFF_ROLES.join('|')}>`);
        process.exit(1);
    }

    const user = await admin.auth().getUserByEmail(email);
    const ref = admin.firestore().collection('users').doc(user.uid);
    const existing = await ref.get();

    await ref.set(
        {
            email,
            role,
            ...(existing.exists ? {} : { firstName: '', lastName: '', mobileNumber: '', createdAt: new Date().toISOString() }),
            updatedAt: new Date().toISOString(),
        },
        { merge: true }
    );

    console.log(`${email} (${user.uid}) now has role ${role}`);
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
