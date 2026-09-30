const { db, bucket } = require("./firebaseConfig");
const path = require("path");
const crypto = require("crypto");


const EVENTS_COLLECTION = "swordnex-events";

// --- Upload file buffer to Firebase Storage ---
// Returns the public download URL
async function uploadFileToStorage(fileBuffer, originalName, mimeType, eventId) {
    const ext = path.extname(originalName) || '';
    const fileName = `event-registrations/${eventId}/${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const file = bucket.file(fileName);

    await file.save(fileBuffer, {
        metadata: {
            contentType: mimeType,
            metadata: { firebaseStorageDownloadTokens: crypto.randomUUID() }
        },
        resumable: false,
        public: true,
    });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    return publicUrl;
}

// --- Add a registration to event's/workshop's subcollection ---
async function addEventSubRegistration(parentId, data, customCollection = EVENTS_COLLECTION) {
    try {
        const docRef = await db
            .collection(customCollection)
            .doc(parentId)
            .collection("registrations")
            .add({
                ...data,
                createdAt: new Date().toISOString(),
            });
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding registration to subcollection:", error);
        throw error;
    }
}

// --- Get all registrations for an item ---
async function getEventSubRegistrations(parentId, customCollection = EVENTS_COLLECTION) {
    try {
        const snapshot = await db
            .collection(customCollection)
            .doc(parentId)
            .collection("registrations")
            .orderBy("createdAt", "desc")
            .get();
 
        const data = [];
        snapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching subcollection registrations:", error);
        throw error;
    }
}

// --- Delete a registration ---
async function deleteEventSubRegistration(parentId, registrationId, customCollection = EVENTS_COLLECTION) {
    try {
        await db
            .collection(customCollection)
            .doc(parentId)
            .collection("registrations")
            .doc(registrationId)
            .delete();
        return { message: "Registration deleted", id: registrationId };
    } catch (error) {
        console.error("Error deleting registration:", error);
        throw error;
    }
}

module.exports = {
    uploadFileToStorage,
    addEventSubRegistration,
    getEventSubRegistrations,
    deleteEventSubRegistration,
};
