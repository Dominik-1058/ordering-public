import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
    const { user } = useAuth();

    console.log('user', user);

    if (!user) {
        return <Navigate to={'/login'} />;
    }

    return <Outlet />;
}

export default ProtectedRoute;