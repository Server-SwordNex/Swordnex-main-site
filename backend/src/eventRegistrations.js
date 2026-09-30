const { db } = require("./firebaseConfig");

const COLLECTION_NAME = "swordnex-event-registrations";

// --- CREATE ---
async function addEventRegistration(data) {
    try {
        const docRef = await db.collection(COLLECTION_NAME).add({
            ...data,
            createdAt: new Date().toISOString()
        });
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding event registration:", error);
        throw error;
    }
}

// --- READ (All by eventId) ---
async function getRegistrationsByEvent(eventId) {
    try {
        const querySnapshot = await db.collection(COLLECTION_NAME)
            .where("eventId", "==", eventId)
            .orderBy("createdAt", "desc")
            .get();
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching registrations:", error);
        throw error;
    }
}

// --- READ (All) ---
async function getAllRegistrations() {
    try {
        const querySnapshot = await db.collection(COLLECTION_NAME)
            .orderBy("createdAt", "desc")
            .get();
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching all registrations:", error);
        throw error;
    }
}

// --- DELETE ---
async function deleteEventRegistration(id) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).delete();
        return { message: "Registration successfully deleted", id };
    } catch (error) {
        console.error("Error deleting registration:", error);
        throw error;
    }
}

module.exports = {
    addEventRegistration,
    getRegistrationsByEvent,
    getAllRegistrations,
    deleteEventRegistration
};
