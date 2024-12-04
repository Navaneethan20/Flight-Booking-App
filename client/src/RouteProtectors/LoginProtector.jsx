import React from 'react'
import { Navigate } from 'react-router-dom';

const LoginProtector = ({ children }) => {
    const userType = localStorage.getItem('userType');
  
    if (userType === 'customer') {
      return <Navigate to="/" replace />;
    }
  
    if (userType === 'admin') {
      return <Navigate to="/admin" replace />;
    }

    if (userType === 'operator') {
        return <Navigate to="/operator" replace />;
    }
  
    return children;
  };

export default LoginProtector;