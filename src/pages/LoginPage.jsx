// src/pages/LoginPage.jsx
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../utils/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { useSnackbar } from 'notistack';

function LoginPage() {
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username or Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('/user/login', values);
        console.log('Login response:', response);
        console.log('Response data:', response.data);

        // Adjust the token extraction based on actual response
        const token =
          response.data.accessToken ||
          response.data.token ||
          response.data.jwt;
        console.log('Extracted token:', token);

        if (token) {
          console.log('Setting auth token');
          setAuthToken(token);
          enqueueSnackbar('Login successful!', { variant: 'success' });
          navigate('/');
        } else {
          console.error('Token not found in response:', response.data);
          throw new Error('Login failed: Token not found');
        }
      } catch (error) {
        let errorMessage = 'Login failed. Please try again.';

        if (error.response && error.response.data) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
          errorMessage = 'No response from server. Please try again later.';
        } else {
          errorMessage = error.message;
        }

        enqueueSnackbar(errorMessage, { variant: 'error' });
        setErrors({ general: errorMessage });
        console.error('Login Error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          {formik.errors.general && (
            <Alert severity="error">{formik.errors.general}</Alert>
          )}
          <TextField
            label="Username or Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.username && Boolean(formik.errors.username)
            }
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password && Boolean(formik.errors.password)
            }
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={formik.isSubmitting}
            sx={{ mt: 3, mb: 2 }}
          >
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
          <Typography variant="body2" align="center">
            Don't have an account? <Link to="/register">Register here</Link>.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
