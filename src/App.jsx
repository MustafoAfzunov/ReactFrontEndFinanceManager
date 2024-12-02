// src/App.jsx
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard'; // Corrected import
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/register"
        element={!user ? <RegisterPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/" replace />}
      />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        {/* Add other protected routes here */}
      </Route>

      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
