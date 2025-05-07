// src/pages/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
import { Button, Box, Typography, Link } from '@mui/material';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Too Short!').required('Required')
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, helpers) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = storedUsers.find(
      u => u.email === values.email && u.password === values.password
    );

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', user.email);
      navigate('/dashboard');
    } else {
      helpers.setFieldError('email', 'Invalid credentials');
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h5" mb={3}>Login</Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
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
              Login
            </Button>
          </Form>
        )}
      </Formik>

      <Typography mt={2} textAlign="center">
        Don't have an account?{' '}
        <Link component="button" onClick={() => navigate('/signup')}>
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
