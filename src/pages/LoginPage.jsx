import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../utils/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
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
        const token = response.data.accessToken || response.data.token || response.data.jwt;
        if (token) {
          setAuthToken(token);
          enqueueSnackbar('Login successful!', { variant: 'success' });
          navigate('/');
        } else {
          enqueueSnackbar('Login failed. Token not found.', { variant: 'error' });
          setErrors({ general: 'Login failed. Please try again.' });
        }
      } catch (error) {
        let errorMessage = 'Login failed. Please try again.';
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
        backgroundImage: 'url(https://watermark.lovepik.com/photo/40169/8241.jpg_wh1200.jpg)',
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
              maxWidth: '90%', // Max width for mobile
            },
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ letterSpacing: '3px', textAlign: 'center' }}
          >
            Login
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
              {formik.isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
            <Typography variant="body1" align="center">
              Don't have an account?{' '}
              <Link
                to="/register"
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
                Register here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
