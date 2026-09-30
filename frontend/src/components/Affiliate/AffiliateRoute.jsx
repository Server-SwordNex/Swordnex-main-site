import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AffiliateRoute = ({ children }) => {
 const { currentUser, userRole, loading } = useAuth();

 if (loading) {
 return (
 <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
 </div>
 );
 }

 if (!currentUser) return <Navigate to="/affiliate/login" replace />;
 if (userRole !== 'affiliate') return <Navigate to="/" replace />;

 return children;
};

export default AffiliateRoute;
