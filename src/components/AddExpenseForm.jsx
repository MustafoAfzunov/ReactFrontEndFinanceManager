// src/components/AddExpenseForm.jsx
import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useSnackbar } from 'notistack';

function AddExpenseForm({ fetchExpenses, fetchBalance }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!category.trim() || !amount) {
      setError('Please provide both category and amount.');
      return;
    }

    axios.post('/expenses/add-expense', {
      category: category.trim(),
      amount: parseFloat(amount),
    })
      .then(response => {
        enqueueSnackbar('Expense added successfully!', { variant: 'success' });
        setCategory('');
        setAmount('');
        if (fetchExpenses) fetchExpenses();
        if (fetchBalance) fetchBalance();
      })
      .catch(error => {
        setError('Error adding expense.');
        enqueueSnackbar('Error adding expense. Please try again.', { variant: 'error' });
        console.error('Error adding expense:', error);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
    {error && <Alert severity="error">{error}</Alert>}
    
    <TextField
      label="category"
      variant="outlined"
      fullWidth
      required
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      sx={{
        mb: 2,
        '& .MuiOutlinedInput-root': {
          color: 'white', // Input text color
        },
        '& .MuiInputLabel-root': {
          color: 'white', // Label text color
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white', // Outline color
        },
      }}
      InputLabelProps={{
        style: { color: 'white' }, // Additional label styling
      }}
    />
    
    <TextField
      label="Amount"
      variant="outlined"
      type="number"
      fullWidth
      required
      inputProps={{ step: '0.01' }}
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      sx={{
        mb: 2,
        '& .MuiOutlinedInput-root': {
          color: 'white', // Input text color
        },
        '& .MuiInputLabel-root': {
          color: 'white', // Label text color
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white', // Outline color
        },
      }}
      InputLabelProps={{
        style: { color: 'white' }, // Additional label styling
      }}
    />
    
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      sx={{
        mt: 2, // Adds top margin to the button for spacing
        backgroundColor: 'blue', // Customize button color
        '&:hover': {
          backgroundColor: 'darkblue', // Darker color on hover
        },
      }}
    >
      Add Expense
    </Button>
  </Box>
  
  );
}

export default AddExpenseForm;
