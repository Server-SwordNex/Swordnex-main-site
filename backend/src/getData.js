const { db } = require("./firebaseConfig");

async function getSwordnexContacts() {
    try {
        const querySnapshot = await db.collection("Swordnex-contacts").get();
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching Swordnex-contacts:", error);
        throw error;
    }
}

async function getSwordnexCareers() {
    try {
        const querySnapshot = await db.collection("Swordnex-careers").get();
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching Swordnex-careers:", error);
        throw error;
    }
}

async function addContact(data) {
    try {
        const docRef = await db.collection("Swordnex-contacts").add(data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding contact:", error);
        throw error;
    }
}

async function addCareer(data) {
    try {
        const docRef = await db.collection("Swordnex-careers").add(data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding career:", error);
        throw error;
    }
}

async function deleteContact(id) {
    try {
        await db.collection("Swordnex-contacts").doc(id).delete();
        return { message: "Contact deleted successfully" };
    } catch (error) {
        console.error("Error deleting contact:", error);
        throw error;
    }
}

async function deleteCareer(id) {
    try {
        await db.collection("Swordnex-careers").doc(id).delete();
        return { message: "Career application deleted successfully" };
    } catch (error) {
        console.error("Error deleting career:", error);
        throw error;
    }
}

async function getCareerById(id) {
    try {
        const docSnap = await db.collection("Swordnex-careers").doc(id).get();
        if (docSnap.exists) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("Career application not found");
        }
    } catch (error) {
        console.error("Error fetching career by ID:", error);
        throw error;
    }
}

async function updateCareer(id, updates) {
    try {
        await db.collection("Swordnex-careers").doc(id).update({
            ...updates,
            updatedAt: new Date().toISOString()
        });
        const updated = await db.collection("Swordnex-careers").doc(id).get();
        return { id: updated.id, ...updated.data() };
    } catch (error) {
        console.error("Error updating career:", error);
        throw error;
    }
}

module.exports = {
    getSwordnexContacts,
    getSwordnexCareers,
    addContact,
    addCareer,
    deleteContact,
    deleteCareer,
    getCareerById,
    updateCareer
};
