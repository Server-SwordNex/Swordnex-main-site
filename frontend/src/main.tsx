import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
 <HelmetProvider>
 <AuthProvider>
 <App />
 </AuthProvider>
 </HelmetProvider>
);