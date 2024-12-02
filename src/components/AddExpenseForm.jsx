// src/components/AddExpenseForm.jsx
import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useSnackbar } from 'notistack';

function AddExpenseForm({ fetchExpenses, fetchBalance }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!amount) {
      setError('Please provide both description and amount.');
      return;
    }

    axios.post('/expenses/add-expense', { amount: parseFloat(amount) })
      .then(response => {
        enqueueSnackbar('Expense added successfully!', { variant: 'success' });
        setDescription('');
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
        label="Amount"
        variant="outlined"
        type="number"
        fullWidth
        required
        inputProps={{ step: '0.01' }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Expense
      </Button>
    </Box>
  );
}

export default AddExpenseForm;
