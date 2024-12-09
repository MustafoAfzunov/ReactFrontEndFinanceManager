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
        const token = response.data.accessToken || response.data.token;
        if (token) {
          setAuthToken(token);
          enqueueSnackbar('Registration successful!', { variant: 'success' });
          navigate('/');
        } else {
          enqueueSnackbar('Registration failed. Token not found.', { variant: 'error' });
          setErrors({ general: 'Registration failed. Please try again.' });
        }
      } catch (error) {
        let errorMessage = 'Registration failed. Username or Email exists!';
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message || errorMessage;
        }
        enqueueSnackbar(errorMessage, { variant: 'error' });
        setErrors({ general: errorMessage });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: 'url(https://mrwallpaper.com/images/hd/finance-digital-blue-graph-3rpv84d278m83dx1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(93, 83, 80, 0.8)',
            borderRadius: '24px',
            boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.3)',
            padding: '3rem',
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
            '@media (max-width:600px)': {
              padding: '1.5rem',
              maxWidth: '90%',
            },
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ letterSpacing: '3px', textAlign: 'center' }}
          >
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
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: 'rgba(93, 83, 80, 0.8)',
                  borderRadius: '10px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  padding: '10px 12px',
                },
              }}
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
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: 'rgba(93, 83, 80, 0.8)',
                  borderRadius: '10px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  padding: '10px 12px',
                },
              }}
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
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: 'rgba(93, 83, 80, 0.8)',
                  borderRadius: '10px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  padding: '10px 12px',
                },
              }}
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
              Already have an account? <Link
                to="/login"
                style={{
                  color: '#1976d2',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  marginLeft: '5px',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.color = '#1565c0'}
                onMouseLeave={(e) => e.target.style.color = '#1976d2'}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default RegisterPage;
