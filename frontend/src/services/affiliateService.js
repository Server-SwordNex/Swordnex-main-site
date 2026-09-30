import API_BASE_URL from "../config/apiConfig";
import { apiFetch } from "./apiClient";

const BASE = `${API_BASE_URL}/api`;

async function request(url, options = {}) {
 try {
 const res = await apiFetch(url, {
 headers: { "Content-Type": "application/json", ...options.headers },
 ...options,
 });
 return await res.json();
 } catch (error) {
 return { success: false, error: error.message };
 }
}

export const affiliateService = {
 register: (data) =>
 request(`${BASE}/affiliate/register`, {
 method: "POST",
 body: JSON.stringify(data),
 }),

 getDashboard: (affiliateId) =>
 request(`${BASE}/affiliate/dashboard?affiliateId=${affiliateId}`),

 generateCode: (affiliateId, product, label) =>
 request(`${BASE}/affiliate/generate-code`, {
 method: "POST",
 body: JSON.stringify({ affiliateId, product, label }),
 }),

 getCodes: (affiliateId) =>
 request(`${BASE}/affiliate/codes?affiliateId=${affiliateId}`),

 getClicks: (affiliateId, period = "30d") =>
 request(`${BASE}/affiliate/clicks?affiliateId=${affiliateId}&period=${period}`),

 getCommissions: (affiliateId) =>
 request(`${BASE}/affiliate/commissions?affiliateId=${affiliateId}`),

 requestPayout: (affiliateId, amount) =>
 request(`${BASE}/affiliate/request-payout`, {
 method: "POST",
 body: JSON.stringify({ affiliateId, amount }),
 }),

 getPayouts: (affiliateId) =>
 request(`${BASE}/affiliate/payouts?affiliateId=${affiliateId}`),

 updateSettings: (affiliateId, data) =>
 request(`${BASE}/affiliate/settings`, {
 method: "PUT",
 body: JSON.stringify({ affiliateId, ...data }),
 }),

 getProfile: (affiliateId) =>
 request(`${BASE}/affiliate/profile?affiliateId=${affiliateId}`),
};
