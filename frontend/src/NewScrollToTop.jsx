import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NewScrollToTop = () => {
 // Extracts the current URL path location object from React Router
 const { pathname } = useLocation();

 useEffect(() => {
 // Instantly resets the browser window viewport to the top left corner
 window.scrollTo({
 top: 0,
 left: 0,
 behavior: "smooth", // Use "smooth" if you prefer a rolling scroll animation
 });
 }, [pathname]); // Fires this hook execution block every single time the path changes

 return null; // This component handles operations entirely in the background; returns no UI markup
};

export default NewScrollToTop;
