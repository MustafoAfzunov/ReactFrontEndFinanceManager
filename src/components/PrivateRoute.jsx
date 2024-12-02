// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute() {
  const { authToken } = useContext(AuthContext);

  return authToken ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
