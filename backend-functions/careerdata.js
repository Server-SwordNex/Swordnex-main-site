const { db } = require("./firebaseConfig");

const COLLECTION_NAME = "swordnex-careers";

// --- CREATE ---
async function addCareerApplication(data) {
    try {
        const docRef = await db.collection(COLLECTION_NAME).add(data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding career application:", error);
        throw error;
    }
}

// --- READ (All) ---
async function getAllCareerApplications() {
    try {
        const snapshot = await db.collection(COLLECTION_NAME).orderBy("createdAt", "desc").get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching career applications:", error);
        throw error;
    }
}

// --- DELETE ---
async function deleteCareerApplication(id) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).delete();
        return { message: "Application deleted", id };
    } catch (error) {
        console.error("Error deleting career application:", error);
        throw error;
    }
}

module.exports = { addCareerApplication, getAllCareerApplications, deleteCareerApplication };
