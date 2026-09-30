const { db, bucket } = require("./firebaseConfig");
const path = require("path");
const crypto = require("crypto");

const PARTNERS_COLLECTION = "swordnex-partners";

// --- Upload file buffer to Firebase Storage ---
// Returns the public download URL
async function uploadPartnerImage(fileBuffer, originalName, mimeType) {
    const ext = path.extname(originalName) || '';
    const fileName = `partners/${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const file = bucket.file(fileName);

    await file.save(fileBuffer, {
        metadata: {
            contentType: mimeType,
            metadata: { firebaseStorageDownloadTokens: crypto.randomUUID() }
        },
        resumable: false,
        public: true, // Make URL public
    });

    // To construct the public download URL when bucket is public
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    return publicUrl;
}

// --- Add a partner to Firestore ---
async function addPartner(data) {
    try {
        const docRef = await db.collection(PARTNERS_COLLECTION).add({
            ...data,
            createdAt: new Date().toISOString(),
        });
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding partner:", error);
        throw error;
    }
}

// --- Get all partners ---
async function getAllPartners() {
    try {
        const snapshot = await db.collection(PARTNERS_COLLECTION)
            .orderBy("createdAt", "desc")
            .get();

        const data = [];
        snapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching partners:", error);
        throw error;
    }
}

// --- Delete a partner ---
async function deletePartner(id) {
    try {
        // Technically, we should also delete from Storage bucket. 
        // We will just delete from Firestore for simplicity as per existing patterns unless URL parsing is easy.
        await db.collection(PARTNERS_COLLECTION).doc(id).delete();
        return { message: "Partner deleted", id };
    } catch (error) {
        console.error("Error deleting partner:", error);
        throw error;
    }
}

module.exports = {
    uploadPartnerImage,
    addPartner,
    getAllPartners,
    deletePartner,
};
