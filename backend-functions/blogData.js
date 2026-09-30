const { db } = require('./firebaseConfig');

const BLOG_COLLECTION = 'Swordnex-blogs';

async function addBlog(data) {
  try {
    const docRef = await db.collection(BLOG_COLLECTION).add(data);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error('Error adding blog:', error);
    throw error;
  }
}

async function getAllBlogs(publishedOnly = false) {
  try {
    if (!db || typeof db.collection !== 'function') {
      console.error('Firestore not initialized');
      return [];
    }

    let query;
    if (publishedOnly) {
      query = db.collection(BLOG_COLLECTION).where('published', '==', true);
    } else {
      query = db.collection(BLOG_COLLECTION).orderBy('createdAt', 'desc');
    }

    const snapshot = await Promise.race([
      query.get(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Firestore query timed out')), 10000)
      )
    ]);

    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    if (error.message === 'Firestore query timed out') {
      return [];
    }
    throw error;
  }
}

async function getBlogBySlug(slug) {
  try {
    const snapshot = await db.collection(BLOG_COLLECTION)
      .where('slug', '==', slug)
      .get();
    if (snapshot.empty) {
      throw new Error('Blog post not found');
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    throw error;
  }
}

async function getBlogById(id) {
  try {
    const docSnap = await db.collection(BLOG_COLLECTION).doc(id).get();
    if (!docSnap.exists) {
      throw new Error('Blog post not found');
    }
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    throw error;
  }
}

async function updateBlog(id, updates) {
  try {
    const updatedData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await db.collection(BLOG_COLLECTION).doc(id).update(updatedData);
    const docSnap = await db.collection(BLOG_COLLECTION).doc(id).get();
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
}

async function deleteBlog(id) {
  try {
    await db.collection(BLOG_COLLECTION).doc(id).delete();
    return { message: 'Blog deleted successfully' };
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
}

module.exports = {
  addBlog,
  getAllBlogs,
  getBlogBySlug,
  getBlogById,
  updateBlog,
  deleteBlog,
};
