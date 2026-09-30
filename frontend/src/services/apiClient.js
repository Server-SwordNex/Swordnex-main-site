import API_BASE_URL from "../config/apiConfig";
import { auth } from "../config/FirebaseConfig";

const isApiUrl = (url) => {
 const value = String(url);
 return value.startsWith("/api/") || (API_BASE_URL && value.startsWith(`${API_BASE_URL}/api/`));
};

/**
 * fetch() that sends the signed-in user's Firebase ID token to the SwordNex API,
 * which the backend needs for staff and affiliate routes. Other URLs (e.g.
 * Firebase Storage downloads) are fetched unchanged so the token never leaves our API.
 */
export const apiFetch = async (url, options = {}) => {
 const user = auth.currentUser;
 if (!user || !isApiUrl(url)) return fetch(url, options);

 const token = await user.getIdToken();
 const headers = new Headers(options.headers || {});
 headers.set("Authorization", `Bearer ${token}`);
 return fetch(url, { ...options, headers });
};

export default apiFetch;
