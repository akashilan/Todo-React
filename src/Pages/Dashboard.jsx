// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TodoForm from '../Components/TodoForm';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('currentUser');
  const [tasks, setTasks] = useState([]);

  // Load user-specific tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    setTasks(savedTasks);
  }, [currentUser]);

  // Save tasks to localStorage
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
    <Box maxWidth={600} mx="auto" mt={5}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Welcome, {currentUser}</Typography>
        <Button onClick={handleLogout} variant="outlined">Logout</Button>
      </Box>

      <TodoForm addTask={addTask} />

      <List>
        {tasks.map((task, index) => (
          <ListItem key={index} sx={{ bgcolor: '#f1f1f1', my: 1 }}>
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
  );
};

export default Dashboard;
