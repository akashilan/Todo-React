// src/pages/Signup.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { Button, Card, CardContent, Typography, Box, Grid } from '@mui/material';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Too short!').required('Required')
});

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (values, { setFieldError }) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existing = users.find(user => user.email === values.email);

    if (existing) {
      setFieldError('email', 'User already exists');
      return;
    }

    users.push(values);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', values.email);
    navigate('/dashboard');
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Card sx={{ width: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>Sign Up</Typography>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
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
                <Box mt={2}>
                  <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
                    Sign Up
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Signup;
