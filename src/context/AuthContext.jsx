// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const existingToken = localStorage.getItem('authToken');
  const [authToken, setAuthTokenState] = useState(existingToken);
  const [user, setUser] = useState(
    existingToken ? jwt_decode(existingToken) : null
  );

  const setAuthToken = (token) => {
    if (token) {
      console.log('Setting auth token in AuthContext:', token);
      localStorage.setItem('authToken', token);
      setAuthTokenState(token);
      try {
        const decodedUser = jwt_decode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error('Error decoding token in setAuthToken:', error);
        setUser(null);
      }
    } else {
      console.log('Clearing auth token');
      localStorage.removeItem('authToken');
      setAuthTokenState(null);
      setUser(null);
    }
  };

  const logout = () => {
    setAuthToken(null);
    navigate('/login');
  };

  // useEffect(() => {
  //   console.log('Auth token changed:', authToken);
  //   if (authToken) {
  //     try {
  //       const decoded = jwt_decode(authToken);
  //       console.log('Decoded token:', decoded);
  //       console.log('Token expiration time:', decoded.exp * 1000);
  //       console.log('Current time:', Date.now());
  //       if (decoded.exp * 1000 < Date.now()) {
  //         console.warn('Token expired');
  //         logout();
  //       } else {
  //         console.log('Token is valid');
  //         setUser(decoded);
  //       }
  //     } catch (error) {
  //       console.error('Error decoding token in useEffect:', error);
  //       logout();
  //     }
  //   } else {
  //     console.log('No auth token found');
  //   }
  // }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
