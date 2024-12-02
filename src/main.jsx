import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,  // Enable startTransition
        v7_relativeSplatPath: true // Enable relative splat path resolution
      }}
    >
      <AuthProvider>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <App />
        </SnackbarProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
