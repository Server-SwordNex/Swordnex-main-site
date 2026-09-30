const { db } = require("./firebaseConfig");

const COLLECTION_NAME = "swordnex-jobs";

// --- CREATE ---
async function addJob(jobData) {
    try {
        const docRef = await db.collection(COLLECTION_NAME).add({
            ...jobData,
            createdAt: new Date().toISOString()
        });
        return { id: docRef.id, ...jobData };
    } catch (error) {
        console.error("Error adding job:", error);
        throw error;
    }
}

// --- READ (All) ---
async function getAllJobs() {
    try {
        const querySnapshot = await db.collection(COLLECTION_NAME).orderBy('createdAt', 'desc').get();
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching all jobs:", error);
        throw error;
    }
}

// --- READ (Single) ---
async function getJobById(id) {
    try {
        const docSnap = await db.collection(COLLECTION_NAME).doc(id).get();
        if (docSnap.exists) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("Job not found");
        }
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        throw error;
    }
}

// --- UPDATE ---
async function updateJob(id, updates) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).update({
            ...updates,
            updatedAt: new Date().toISOString()
        });
        return { id, ...updates };
    } catch (error) {
        console.error("Error updating job:", error);
        throw error;
    }
}

// --- DELETE ---
async function deleteJob(id) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).delete();
        return { message: "Job successfully deleted", id };
    } catch (error) {
        console.error("Error deleting job:", error);
        throw error;
    }
}

module.exports = {
    addJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
};
