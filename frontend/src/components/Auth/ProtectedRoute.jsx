import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
 const { currentUser, userRole, loading } = useAuth();
 const location = useLocation();

 if (loading) {
 return (
 <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
 <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
 </div>
 );
 }

 if (!currentUser) {
 // Redirect to signin but save the attempted location
 return <Navigate to="/signin" state={{ from: location }} replace />;
 }

 if (allowedRoles && !allowedRoles.includes(userRole)) {
 // Role not authorized, redirect to home
 return <Navigate to="/" replace />;
 }

 return children;
};

export default ProtectedRoute;
