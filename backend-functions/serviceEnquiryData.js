const { db } = require("./firebaseConfig");

const COLLECTION_NAME = "swordnex-serviceenquiry";

// --- CREATE ---
async function addServiceEnquiry(data) {
    try {
        const docRef = await db.collection(COLLECTION_NAME).add(data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding service enquiry:", error);
        throw error;
    }
}

// --- READ (All) ---
async function getAllServiceEnquiries() {
    try {
        const querySnapshot = await db.collection(COLLECTION_NAME).get();
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching all service enquiries:", error);
        throw error;
    }
}

// --- READ (Single) ---
async function getServiceEnquiryById(id) {
    try {
        const docSnap = await db.collection(COLLECTION_NAME).doc(id).get();

        if (docSnap.exists) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("Service enquiry not found");
        }
    } catch (error) {
        console.error("Error fetching service enquiry by ID:", error);
        throw error;
    }
}

// --- UPDATE ---
async function updateServiceEnquiry(id, updatedData) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).update(updatedData);
        return { id, ...updatedData };
    } catch (error) {
        console.error("Error updating service enquiry:", error);
        throw error;
    }
}

// --- DELETE ---
async function deleteServiceEnquiry(id) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).delete();
        return { message: "Service enquiry successfully deleted", id };
    } catch (error) {
        console.error("Error deleting service enquiry:", error);
        throw error;
    }
}

module.exports = {
    addServiceEnquiry,
    getAllServiceEnquiries,
    getServiceEnquiryById,
    updateServiceEnquiry,
    deleteServiceEnquiry
};
