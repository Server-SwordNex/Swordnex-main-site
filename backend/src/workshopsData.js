const { db } = require("./firebaseConfig");

const COLLECTION_NAME = "swordnex-workshops";

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
async function addWorkshop(data) {
    try {
        const slug = generateSlug(data.title || 'workshop');
        const docRef = await db.collection(COLLECTION_NAME).add({
            ...data,
            slug,
            createdAt: new Date().toISOString()
        });
        return { id: docRef.id, slug, ...data };

    } catch (error) {
        console.error("Error adding workshop:", error);
        throw error;
    }
}

// --- READ (All) ---
async function getAllWorkshops() {
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
        console.error("Error fetching all workshops:", error);
        throw error;
    }
}

// --- READ (Single) ---
async function getWorkshopById(id) {
    try {
        const doc = await db.collection(COLLECTION_NAME).doc(id).get();
        if (!doc.exists) {
            throw new Error("Workshop not found");
        }
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        console.error("Error fetching workshop by ID:", error);
        throw error;
    }
}

// --- UPDATE ---
async function updateWorkshop(id, data) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).update({
            ...data,
            updatedAt: new Date().toISOString()
        });
        return { id, ...data };
    } catch (error) {
        console.error("Error updating workshop:", error);
        throw error;
    }
}

// --- DELETE ---
async function deleteWorkshop(id) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).delete();
        return { message: "Workshop successfully deleted", id };
    } catch (error) {
        console.error("Error deleting workshop:", error);
        throw error;
    }
}

// --- READ (Single by Slug) ---
async function getWorkshopBySlug(slug) {
    try {
        const querySnapshot = await db.collection(COLLECTION_NAME)
            .where("slug", "==", slug)
            .limit(1)
            .get();
        if (querySnapshot.empty) {
            // Fallback: try to get by Firestore doc ID in case it's an id
            const doc = await db.collection(COLLECTION_NAME).doc(slug).get();
            if (!doc.exists) throw new Error("Workshop not found");
            return { id: doc.id, ...doc.data() };
        }
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        console.error("Error fetching workshop by slug:", error);
        throw error;
    }
}

module.exports = {
    addWorkshop,
    getAllWorkshops,
    getWorkshopById,
    getWorkshopBySlug,
    updateWorkshop,
    deleteWorkshop
};
