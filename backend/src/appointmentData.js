const { db } = require("./firebaseConfig");

const COLLECTION_NAME = "swordnex-appointment";

// --- CREATE ---
async function addAppointment(data) {
    try {
        const docRef = await db.collection(COLLECTION_NAME).add(data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding appointment:", error);
        throw error;
    }
}

// --- READ (All) ---
async function getAllAppointments() {
    try {
        const querySnapshot = await db.collection(COLLECTION_NAME).get();
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching all appointments:", error);
        throw error;
    }
}

// --- READ (Single) ---
async function getAppointmentById(id) {
    try {
        const docSnap = await db.collection(COLLECTION_NAME).doc(id).get();

        if (docSnap.exists) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("Appointment not found");
        }
    } catch (error) {
        console.error("Error fetching appointment by ID:", error);
        throw error;
    }
}

// --- UPDATE ---
async function updateAppointment(id, updatedData) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).update(updatedData);
        return { id, ...updatedData };
    } catch (error) {
        console.error("Error updating appointment:", error);
        throw error;
    }
}

// --- DELETE ---
async function deleteAppointment(id) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).delete();
        return { message: "Appointment successfully deleted", id };
    } catch (error) {
        console.error("Error deleting appointment:", error);
        throw error;
    }
}

module.exports = {
    addAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
