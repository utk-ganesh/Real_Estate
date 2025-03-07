import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Link, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  });

  // Handle Form Submission (API Call)
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account Created Successfully!");
        navigate("/login"); // Redirect to login page
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: '400px' }}>
        <Typography variant="h4" gutterBottom align="center">
          Create an Account
        </Typography>
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values, isSubmitting }) => (
            <Form>
              <Box mb={2}>
                <TextField
                  label="First Name"
                  name="firstName"
                  fullWidth
                  variant="outlined"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Typography variant="body2" color="error">
                  <ErrorMessage name="firstName" />
                </Typography>
              </Box>
              <Box mb={2}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  variant="outlined"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Typography variant="body2" color="error">
                  <ErrorMessage name="lastName" />
                </Typography>
              </Box>
              <Box mb={2}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Typography variant="body2" color="error">
                  <ErrorMessage name="email" />
                </Typography>
              </Box>
              <Box mb={2}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Typography variant="body2" color="error">
                  <ErrorMessage name="password" />
                </Typography>
              </Box>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </Button>

              {/* Already have an account? Link */}
              <Box mt={2} textAlign="center">
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link href="/login" underline="hover" color="primary">
                    Log in
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

export default RegisterForm;
