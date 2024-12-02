// src/pages/RegisterPage.jsx
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../utils/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useSnackbar } from 'notistack';

function RegisterPage() {
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('/user/register', values);
        console.log('Registration response:', response);

        // Check for token in response
        const token = response.data.accessToken || response.data.token;
        if (token) {
          setAuthToken(token);
          enqueueSnackbar('Registration successful!', { variant: 'success' });
          navigate('/'); // Navigate to the main page or dashboard
        } else {
          const errorMessage = response.data.message || 'Registration failed. Please try again.';
          enqueueSnackbar(errorMessage, { variant: 'error' });
          setErrors({ general: errorMessage });
        }
      } catch (error) {
        let errorMessage = 'Registration failed. Please try again.';

        if (error.response && error.response.data) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
          errorMessage = 'No response from server. Please try again later.';
        } else {
          errorMessage = error.message;
        }

        enqueueSnackbar(errorMessage, { variant: 'error' });
        setErrors({ general: errorMessage });
        console.error('Registration Error:', error);
      } finally {
        setSubmitting(false); // Moved setSubmitting(false) to finally block
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          {formik.errors.general && <Alert severity="error">{formik.errors.general}</Alert>}
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            error={formik.touched.password && Boolean(formik.errors.password)}
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
            {formik.isSubmitting ? 'Registering...' : 'Register'}
          </Button>
          <Typography variant="body2" align="center">
            Already have an account? <Link to="/login">Login here</Link>.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;
