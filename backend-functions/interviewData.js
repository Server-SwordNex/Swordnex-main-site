const { db } = require("./firebaseConfig");

const COLLECTION_NAME = "swordnex-interviews";

// --- CREATE ---
async function addInterviewData(data) {
    try {
        const docRef = await db.collection(COLLECTION_NAME).add(data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding interview data:", error);
        throw error;
    }
}

// --- READ (All) ---
async function getAllInterviewData() {
    try {
        const querySnapshot = await db.collection(COLLECTION_NAME).get();
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching all interview data:", error);
        throw error;
    }
}

// --- READ (Single by ID) ---
async function getInterviewDataById(id) {
    try {
        const docSnap = await db.collection(COLLECTION_NAME).doc(id).get();

        if (docSnap.exists) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("Document not found");
        }
    } catch (error) {
        console.error("Error fetching interview data by ID:", error);
        throw error;
    }
}

// --- READ (By Interview Code) ---
async function getInterviewDataByCode(interviewCode) {
    try {
        const querySnapshot = await db.collection(COLLECTION_NAME)
            .where("interviewCode", "==", interviewCode)
            .get();
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching interview data by code:", error);
        throw error;
    }
}

// --- UPDATE ---
async function updateInterviewData(id, updatedData) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).update(updatedData);
        return { id, ...updatedData };
    } catch (error) {
        console.error("Error updating interview data:", error);
        throw error;
    }
}

// --- DELETE ---
async function deleteInterviewData(id) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).delete();
        return { message: "Document successfully deleted", id };
    } catch (error) {
        console.error("Error deleting interview data:", error);
        throw error;
    }
}

// --- DELETE by interviewCode ---
async function deleteInterviewDataByCode(interviewCode) {
    try {
        const querySnapshot = await db.collection(COLLECTION_NAME)
            .where("interviewCode", "==", interviewCode)
            .get();

        const deletePromises = [];
        querySnapshot.forEach((doc) => {
            deletePromises.push(doc.ref.delete());
        });

        await Promise.all(deletePromises);
        return { message: "Interview data deleted successfully for code " + interviewCode };
    } catch (error) {
        console.error("Error deleting interview data by code:", error);
        throw error;
    }
}

module.exports = {
    addInterviewData,
    getAllInterviewData,
    getInterviewDataById,
    getInterviewDataByCode,
    updateInterviewData,
    deleteInterviewData,
    deleteInterviewDataByCode
};
