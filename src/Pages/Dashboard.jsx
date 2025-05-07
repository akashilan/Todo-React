// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Checkbox, IconButton, Grid, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TodoForm from '../components/TodoForm';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('currentUser');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    setTasks(savedTasks);
  }, [currentUser]);

  const updateLocalStorage = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(updatedTasks));
  };

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    updateLocalStorage(newTasks);
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    updateLocalStorage(updated);
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    updateLocalStorage(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <Box p={3}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Hello, {currentUser}</Typography>
        <Button onClick={handleLogout} variant="outlined">Logout</Button>
      </Grid>

      <Box mt={3}>
        <Card sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" mb={1}>Add a Task</Typography>
          <TodoForm addTask={addTask} />
        </Card>

        <Typography variant="h6" mb={2}>Your Tasks</Typography>
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index} sx={{ bgcolor: '#f5f5f5', mb: 1, borderRadius: 1 }}>
              <Checkbox checked={task.completed} onChange={() => toggleComplete(index)} />
              <ListItemText
                primary={task.title}
                secondary={task.description}
                sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              />
              <IconButton onClick={() => deleteTask(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Dashboard;
