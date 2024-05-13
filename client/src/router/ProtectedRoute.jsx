import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ userRole, role, children }) => {

    if (userRole == null) {
        return <Navigate to="/login" replace />;
    }

    if (role == 'admin' && userRole != 1) {
        return <Navigate to="/" replace />;
    }

    return children;

}

export default ProtectedRoute