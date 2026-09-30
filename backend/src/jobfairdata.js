const { db } = require("./firebaseConfig");

const COLLECTION_NAME = "swordnex-jobfair";

// --- CREATE ---
async function addJobFairData(data) {
    try {
        const docRef = await db.collection(COLLECTION_NAME).add(data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding job fair data:", error);
        throw error;
    }
}

// --- READ (All) ---
async function getAllJobFairData() {
    try {
        const querySnapshot = await db.collection(COLLECTION_NAME).get();
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching all job fair data:", error);
        throw error;
    }
}

// --- READ (Single) ---
async function getJobFairDataById(id) {
    try {
        const docSnap = await db.collection(COLLECTION_NAME).doc(id).get();

        if (docSnap.exists) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("Document not found");
        }
    } catch (error) {
        console.error("Error fetching job fair data by ID:", error);
        throw error;
    }
}

// --- UPDATE ---
async function updateJobFairData(id, updatedData) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).update(updatedData);
        return { id, ...updatedData };
    } catch (error) {
        console.error("Error updating job fair data:", error);
        throw error;
    }
}

// --- DELETE ---
async function deleteJobFairData(id) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).delete();
        return { message: "Document successfully deleted", id };
    } catch (error) {
        console.error("Error deleting job fair data:", error);
        throw error;
    }
}

module.exports = {
    addJobFairData,
    getAllJobFairData,
    getJobFairDataById,
    updateJobFairData,
    deleteJobFairData
};
