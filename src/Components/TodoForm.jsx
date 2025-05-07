// src/components/TodoForm.jsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button } from '@mui/material';
import { TextField } from 'formik-mui';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string()
});

const TodoForm = ({ addTask }) => {
  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      validationSchema={TaskSchema}
      onSubmit={(values, { resetForm }) => {
        addTask({ ...values, completed: false });
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            name="title"
            label="Title"
            fullWidth
            margin="normal"
          />
          <Field
            component={TextField}
            name="description"
            label="Description"
            fullWidth
            margin="normal"
          />
          <Box mt={1}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Add Task
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;
