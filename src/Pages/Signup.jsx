// src/pages/Signup.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
import { Button, Box, Typography, Link } from '@mui/material';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Too Short!').required('Required'),
});

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, helpers) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.find(u => u.email === values.email);
    if (userExists) {
      helpers.setFieldError('email', 'User already exists');
      return;
    }

    users.push({ email: values.email, password: values.password });
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', values.email);
    navigate('/dashboard');
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h5" mb={3}>Sign Up</Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              name="email"
              label="Email"
              fullWidth
              margin="normal"
            />
            <Field
              component={TextField}
              name="password"
              type="password"
              label="Password"
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>

      <Typography mt={2} textAlign="center">
        Already have an account?{' '}
        <Link component="button" onClick={() => navigate('/login')}>
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default Signup;
