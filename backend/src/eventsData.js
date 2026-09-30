const { db } = require("./firebaseConfig");

const COLLECTION_NAME = "swordnex-events";

// --- Generate URL slug from title ---
function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

// --- CREATE ---
async function addEvent(data) {
    try {
        const slug = generateSlug(data.title || 'event');
        const docRef = await db.collection(COLLECTION_NAME).add({
            ...data,
            slug,
            createdAt: new Date().toISOString()
        });
        return { id: docRef.id, slug, ...data };

    } catch (error) {
        console.error("Error adding event:", error);
        throw error;
    }
}

// --- READ (All) ---
async function getAllEvents() {
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
        console.error("Error fetching all events:", error);
        throw error;
    }
}

// --- READ (Single) ---
async function getEventById(id) {
    try {
        const doc = await db.collection(COLLECTION_NAME).doc(id).get();
        if (!doc.exists) {
            throw new Error("Event not found");
        }
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        throw error;
    }
}

// --- UPDATE ---
async function updateEvent(id, data) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).update({
            ...data,
            updatedAt: new Date().toISOString()
        });
        return { id, ...data };
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
}

// --- DELETE ---
async function deleteEvent(id) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).delete();
        return { message: "Event successfully deleted", id };
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
}

// --- READ (Single by Slug) ---
async function getEventBySlug(slug) {
    try {
        const querySnapshot = await db.collection(COLLECTION_NAME)
            .where("slug", "==", slug)
            .limit(1)
            .get();
        if (querySnapshot.empty) {
            // Fallback: try to get by Firestore doc ID in case it's an id
            const doc = await db.collection(COLLECTION_NAME).doc(slug).get();
            if (!doc.exists) throw new Error("Event not found");
            return { id: doc.id, ...doc.data() };
        }
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        console.error("Error fetching event by slug:", error);
        throw error;
    }
}

module.exports = {
    addEvent,
    getAllEvents,
    getEventById,
    getEventBySlug,
    updateEvent,
    deleteEvent
};
