import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  });

  // Handle Form Submission
  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Login failed');

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      alert('Login Successful!');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh">
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: '400px' }}>
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form>
              {['email', 'password'].map((field) => (
                <Box mb={2} key={field}>
                  <Field
                    as={TextField}
                    label={field.replace(/^\w/, (c) => c.toUpperCase())}
                    name={field}
                    type={field === 'password' ? 'password' : 'text'}
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[field]}
                  />
                  <Typography variant="body2" color="error">
                    <ErrorMessage name={field} />
                  </Typography>
                </Box>
              ))}
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Login'}
              </Button>
              <Box mt={2} textAlign="center">
                <Typography variant="body2">
                  Not registered yet?{' '}
                  <Link to="/signup" style={{ textDecoration: 'none', color: 'blue' }}>
                    Create an account
                  </Link>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default LoginForm;
