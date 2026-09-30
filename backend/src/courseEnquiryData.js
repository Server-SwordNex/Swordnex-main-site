const { db } = require("./firebaseConfig");

const COLLECTION_NAME = "swordnex-courseenquiry";

// --- CREATE ---
async function addCourseEnquiry(data) {
    try {
        const docData = {
            ...data,
            createdAt: new Date().toISOString(),
            status: 'Review'
        };
        const docRef = await db.collection(COLLECTION_NAME).add(docData);
        return { id: docRef.id, ...docData };
    } catch (error) {
        console.error("Error adding course enquiry:", error);
        throw error;
    }
}

// --- READ (All) ---
async function getAllCourseEnquiries() {
    try {
        const querySnapshot = await db.collection(COLLECTION_NAME).orderBy('createdAt', 'desc').get();
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching all course enquiries:", error);
        throw error;
    }
}

// --- READ (Single) ---
async function getCourseEnquiryById(id) {
    try {
        const docSnap = await db.collection(COLLECTION_NAME).doc(id).get();
        if (docSnap.exists) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("Course enquiry not found");
        }
    } catch (error) {
        console.error("Error fetching course enquiry by ID:", error);
        throw error;
    }
}

// --- DELETE ---
async function deleteCourseEnquiry(id) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).delete();
        return { message: "Course enquiry successfully deleted", id };
    } catch (error) {
        console.error("Error deleting course enquiry:", error);
        throw error;
    }
}

module.exports = {
    addCourseEnquiry,
    getAllCourseEnquiries,
    getCourseEnquiryById,
    deleteCourseEnquiry
};
