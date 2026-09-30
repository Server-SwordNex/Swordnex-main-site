const { db } = require("./firebaseConfig");

const COLLECTION_NAME = "swordnex-chatbot-leads";

// --- CREATE ---
async function addChatbotLead(data) {
    try {
        const docRef = await db.collection(COLLECTION_NAME).add({
            ...data,
            createdAt: new Date().toISOString()
        });
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding chatbot lead:", error);
        throw error;
    }
}

// --- READ (All) ---
async function getAllChatbotLeads() {
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
        console.error("Error fetching all chatbot leads:", error);
        throw error;
    }
}

// --- UPDATE ---
async function updateChatbotLead(id, updates) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).update({
            ...updates,
            updatedAt: new Date().toISOString()
        });
        return { id, ...updates };
    } catch (error) {
        console.error("Error updating chatbot lead:", error);
        throw error;
    }
}

// --- DELETE ---
async function deleteChatbotLead(id) {
    try {
        await db.collection(COLLECTION_NAME).doc(id).delete();
        return { message: "Document successfully deleted", id };
    } catch (error) {
        console.error("Error deleting chatbot lead:", error);
        throw error;
    }
}

module.exports = {
    addChatbotLead,
    getAllChatbotLeads,
    updateChatbotLead,
    deleteChatbotLead
};
