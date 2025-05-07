import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(4, "Too short!").required("Required"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (values, { setFieldError, setSubmitting }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matched = users.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (matched) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", matched.email);
      navigate("/dashboard");
    } else {
      setFieldError("email", "Invalid email or password");
      setSubmitting(false); // Reset submitting state
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Card sx={{ width: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
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
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              New here? <Link to="/signup">Sign up</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Login;
