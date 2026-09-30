const { db } = require('./firebaseConfig');

const COMMISSION_RATE = 0.10;
const MIN_PAYOUT = 1000;
const PRODUCT_URLS = {
  billing: 'https://products.billing.swordnex.com/',
  payroll: 'https://products.payroll.swordnex.com/',
  hms: 'https://products.hms.swordnex.com/',
  jobsheet: 'https://www.swordnex.com/products',
  invoice: 'https://www.swordnex.com/products',
};

function generateReferralCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'SNX-';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

async function generateUniqueCode() {
  let code = generateReferralCode();
  for (let attempt = 0; attempt < 20; attempt++) {
    const existing = await db.collection('affiliate_codes').where('code', '==', code).get();
    if (existing.empty) return code;
    code = generateReferralCode();
  }
  return generateReferralCode(8);
}

function nowISO() {
  return new Date().toISOString();
}

async function registerAffiliate(data) {
  try {
    const { firstName, lastName, email, phone, password, paymentMethod, paymentDetails } = data;

    const admin = require('firebase-admin');
    let userRecord;
    try {
      userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
      });
    } catch (authError) {
      return { success: false, error: authError.message };
    }

    const referralCode = await generateUniqueCode();
    const ts = nowISO();

    await db.collection('affiliates').doc(userRecord.uid).set({
      firstName,
      lastName,
      email,
      phone,
      paymentMethod: paymentMethod || null,
      paymentDetails: paymentDetails || null,
      referralCode,
      status: 'active',
      totalClicks: 0,
      totalConversions: 0,
      totalEarned: 0,
      totalPaid: 0,
      balance: 0,
      createdAt: ts,
      updatedAt: ts,
    });

    await db.collection('users').doc(userRecord.uid).set({
      firstName,
      lastName,
      email,
      role: 'affiliate',
      mobileNumber: phone,
      createdAt: ts,
    });

    await db.collection('affiliate_codes').add({
      affiliateId: userRecord.uid,
      code: referralCode,
      product: 'all',
      label: 'Master Link',
      clicks: 0,
      conversions: 0,
      createdAt: ts,
    });

    return { success: true, uid: userRecord.uid, referralCode };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getDashboard(affiliateId) {
  try {
    const affiliateDoc = await db.collection('affiliates').doc(affiliateId).get();
    if (!affiliateDoc.exists) return { success: false, error: 'Affiliate not found' };

    const affiliate = affiliateDoc.data();

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const clicksSnap = await db.collection('affiliate_clicks')
      .where('affiliateId', '==', affiliateId)
      .where('timestamp', '>=', thirtyDaysAgo)
      .orderBy('timestamp', 'desc')
      .get();

    const recentClicks = [];
    const clicksByDate = {};
    clicksSnap.forEach(doc => {
      const d = doc.data();
      if (recentClicks.length < 10) recentClicks.push({ ...d, id: doc.id });
      const dateKey = d.timestamp ? d.timestamp.substring(0, 10) : 'unknown';
      clicksByDate[dateKey] = (clicksByDate[dateKey] || 0) + 1;
    });

    const commissionsSnap = await db.collection('affiliate_commissions')
      .where('affiliateId', '==', affiliateId)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    const recentCommissions = [];
    let pendingCommissions = 0;
    commissionsSnap.forEach(doc => {
      const d = doc.data();
      recentCommissions.push({ ...d, id: doc.id });
      if (d.status === 'pending') pendingCommissions += d.commission;
    });

    return {
      success: true,
      data: {
        stats: {
          totalClicks: affiliate.totalClicks || 0,
          totalConversions: affiliate.totalConversions || 0,
          totalEarned: affiliate.totalEarned || 0,
          totalPaid: affiliate.totalPaid || 0,
          balance: affiliate.balance || 0,
          pendingCommissions,
        },
        referralCode: affiliate.referralCode,
        recentClicks,
        recentCommissions,
        clicksByDate,
      },
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function generateCode(affiliateId, product, label) {
  try {
    const code = await generateUniqueCode();
    await db.collection('affiliate_codes').add({
      affiliateId,
      code,
      product: product || 'all',
      label: label || `${product || 'General'} Link`,
      clicks: 0,
      conversions: 0,
      createdAt: nowISO(),
    });
    return { success: true, code };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getCodes(affiliateId) {
  try {
    const snap = await db.collection('affiliate_codes')
      .where('affiliateId', '==', affiliateId)
      .orderBy('createdAt', 'desc')
      .get();

    const codes = [];
    snap.forEach(doc => codes.push({ id: doc.id, ...doc.data() }));
    return { success: true, data: codes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getClicks(affiliateId, period) {
  try {
    let startDate;
    const now = Date.now();
    switch (period) {
      case '7d': startDate = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString(); break;
      case '30d': startDate = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString(); break;
      case '90d': startDate = new Date(now - 90 * 24 * 60 * 60 * 1000).toISOString(); break;
      default: startDate = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();
    }

    const snap = await db.collection('affiliate_clicks')
      .where('affiliateId', '==', affiliateId)
      .where('timestamp', '>=', startDate)
      .orderBy('timestamp', 'desc')
      .get();

    const clicks = [];
    snap.forEach(doc => clicks.push({ id: doc.id, ...doc.data() }));
    return { success: true, data: clicks };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getCommissions(affiliateId) {
  try {
    const snap = await db.collection('affiliate_commissions')
      .where('affiliateId', '==', affiliateId)
      .orderBy('createdAt', 'desc')
      .get();

    const commissions = [];
    snap.forEach(doc => commissions.push({ id: doc.id, ...doc.data() }));
    return { success: true, data: commissions };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function requestPayout(affiliateId, amount) {
  try {
    const affiliateDoc = await db.collection('affiliates').doc(affiliateId).get();
    if (!affiliateDoc.exists) return { success: false, error: 'Affiliate not found' };

    const affiliate = affiliateDoc.data();

    if (affiliate.balance < amount) {
      return { success: false, error: 'Insufficient balance' };
    }
    if (amount < MIN_PAYOUT) {
      return { success: false, error: `Minimum payout amount is ₹${MIN_PAYOUT}` };
    }

    await db.collection('affiliate_payouts').add({
      affiliateId,
      amount,
      method: affiliate.paymentMethod || null,
      details: affiliate.paymentDetails || null,
      status: 'requested',
      requestedAt: nowISO(),
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getPayouts(affiliateId) {
  try {
    const snap = await db.collection('affiliate_payouts')
      .where('affiliateId', '==', affiliateId)
      .orderBy('requestedAt', 'desc')
      .get();

    const payouts = [];
    snap.forEach(doc => payouts.push({ id: doc.id, ...doc.data() }));
    return { success: true, data: payouts };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function trackClick(code, product, ip, userAgent, referrer) {
  try {
    const codeSnap = await db.collection('affiliate_codes')
      .where('code', '==', code)
      .limit(1)
      .get();

    if (codeSnap.empty) {
      return { success: false, error: 'Invalid referral code', redirect: 'https://www.swordnex.com/products' };
    }

    const codeDoc = codeSnap.docs[0];
    const codeData = codeDoc.data();
    const productKey = product || 'all';

    await db.collection('affiliate_clicks').add({
      affiliateId: codeData.affiliateId,
      code,
      product: productKey,
      ip: ip || null,
      userAgent: userAgent || null,
      referrer: referrer || null,
      converted: false,
      timestamp: nowISO(),
    });

    const currentClicks = (codeData.clicks || 0) + 1;
    await codeDoc.ref.update({ clicks: currentClicks });

    const affDoc = await db.collection('affiliates').doc(codeData.affiliateId).get();
    if (affDoc.exists) {
      const affData = affDoc.data();
      await affDoc.ref.update({ totalClicks: (affData.totalClicks || 0) + 1 });
    }

    const redirectUrl = PRODUCT_URLS[productKey] || 'https://www.swordnex.com/products';
    const separator = redirectUrl.includes('?') ? '&' : '?';
    return { success: true, redirect: `${redirectUrl}${separator}ref=${code}` };
  } catch (error) {
    return { success: false, error: error.message, redirect: 'https://www.swordnex.com/products' };
  }
}

async function recordConversion(code, customerEmail, product, amount) {
  try {
    const codeSnap = await db.collection('affiliate_codes')
      .where('code', '==', code)
      .limit(1)
      .get();

    if (codeSnap.empty) return { success: false, error: 'Invalid referral code' };

    const codeDoc = codeSnap.docs[0];
    const codeData = codeDoc.data();
    const commission = Math.round(amount * COMMISSION_RATE * 100) / 100;

    await db.collection('affiliate_commissions').add({
      affiliateId: codeData.affiliateId,
      code,
      product: product || 'all',
      customerEmail,
      amount,
      commission,
      rate: COMMISSION_RATE,
      status: 'pending',
      createdAt: nowISO(),
    });

    const currentConversions = (codeData.conversions || 0) + 1;
    await codeDoc.ref.update({ conversions: currentConversions });

    const affDoc = await db.collection('affiliates').doc(codeData.affiliateId).get();
    if (affDoc.exists) {
      const affData = affDoc.data();
      await affDoc.ref.update({
        totalConversions: (affData.totalConversions || 0) + 1,
        totalEarned: (affData.totalEarned || 0) + commission,
        balance: (affData.balance || 0) + commission,
      });
    }

    const clickSnap = await db.collection('affiliate_clicks')
      .where('code', '==', code)
      .where('converted', '==', false)
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get();

    if (!clickSnap.empty) {
      await clickSnap.docs[0].ref.update({ converted: true });
    }

    return { success: true, commission };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function updateSettings(affiliateId, data) {
  try {
    const updates = {};
    if (data.firstName) updates.firstName = data.firstName;
    if (data.lastName) updates.lastName = data.lastName;
    if (data.phone) updates.phone = data.phone;
    if (data.paymentMethod) updates.paymentMethod = data.paymentMethod;
    if (data.paymentDetails) updates.paymentDetails = data.paymentDetails;
    updates.updatedAt = nowISO();

    await db.collection('affiliates').doc(affiliateId).update(updates);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getAffiliateByUid(uid) {
  try {
    const doc = await db.collection('affiliates').doc(uid).get();
    if (!doc.exists) return { success: false, error: 'Not found' };
    return { success: true, data: { id: doc.id, ...doc.data() } };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getAllAffiliates() {
  try {
    const snap = await db.collection('affiliates')
      .orderBy('createdAt', 'desc')
      .get();
    const affiliates = [];
    snap.forEach(doc => affiliates.push({ id: doc.id, ...doc.data() }));
    return { success: true, data: affiliates };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getAllPayouts() {
  try {
    const snap = await db.collection('affiliate_payouts')
      .orderBy('requestedAt', 'desc')
      .get();
    const payouts = [];
    snap.forEach(doc => payouts.push({ id: doc.id, ...doc.data() }));
    return { success: true, data: payouts };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function updatePayoutStatus(payoutId, status) {
  try {
    const payoutDoc = await db.collection('affiliate_payouts').doc(payoutId).get();
    if (!payoutDoc.exists) return { success: false, error: 'Payout not found' };

    const payoutData = payoutDoc.data();
    await payoutDoc.ref.update({
      status,
      processedAt: nowISO(),
    });

    if (status === 'paid') {
      const affDoc = await db.collection('affiliates').doc(payoutData.affiliateId).get();
      if (affDoc.exists) {
        const affData = affDoc.data();
        await affDoc.ref.update({
          totalPaid: (affData.totalPaid || 0) + payoutData.amount,
          balance: (affData.balance || 0) - payoutData.amount,
        });
      }

      const commissionSnap = await db.collection('affiliate_commissions')
        .where('affiliateId', '==', payoutData.affiliateId)
        .where('status', '==', 'approved')
        .get();
      commissionSnap.forEach(doc => {
        doc.ref.update({ status: 'paid' });
      });
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function updateCommissionStatus(commissionId, status) {
  try {
    const commissionDoc = await db.collection('affiliate_commissions').doc(commissionId).get();
    if (!commissionDoc.exists) return { success: false, error: 'Commission not found' };

    const commissionData = commissionDoc.data();
    await commissionDoc.ref.update({ status });

    if (status === 'cancelled') {
      const affDoc = await db.collection('affiliates').doc(commissionData.affiliateId).get();
      if (affDoc.exists) {
        const affData = affDoc.data();
        await affDoc.ref.update({
          totalEarned: Math.max(0, (affData.totalEarned || 0) - commissionData.commission),
          balance: Math.max(0, (affData.balance || 0) - commissionData.commission),
        });
      }
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function updateAffiliateStatus(affiliateId, status) {
  try {
    await db.collection('affiliates').doc(affiliateId).update({
      status,
      updatedAt: nowISO(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function deleteAffiliate(affiliateId) {
  try {
    const admin = require('firebase-admin');
    try {
      await admin.auth().deleteUser(affiliateId);
    } catch (authErr) {
      if (!authErr.message.includes('NOT_FOUND')) {
        return { success: false, error: authErr.message };
      }
    }

    // Clean up Firestore data
    await db.collection('affiliates').doc(affiliateId).delete();
    await db.collection('users').doc(affiliateId).delete();

    const codesSnap = await db.collection('affiliate_codes')
      .where('affiliateId', '==', affiliateId).get();
    const batch = db.batch();
    codesSnap.forEach(doc => batch.delete(doc.ref));

    const clicksSnap = await db.collection('affiliate_clicks')
      .where('affiliateId', '==', affiliateId).get();
    clicksSnap.forEach(doc => batch.delete(doc.ref));

    const commissionsSnap = await db.collection('affiliate_commissions')
      .where('affiliateId', '==', affiliateId).get();
    commissionsSnap.forEach(doc => batch.delete(doc.ref));

    const payoutsSnap = await db.collection('affiliate_payouts')
      .where('affiliateId', '==', affiliateId).get();
    payoutsSnap.forEach(doc => batch.delete(doc.ref));

    await batch.commit();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = {
  registerAffiliate,
  getDashboard,
  generateCode,
  getCodes,
  getClicks,
  getCommissions,
  requestPayout,
  getPayouts,
  trackClick,
  recordConversion,
  updateSettings,
  getAffiliateByUid,
  getAllAffiliates,
  getAllPayouts,
  updatePayoutStatus,
  updateCommissionStatus,
  updateAffiliateStatus,
  deleteAffiliate,
};
