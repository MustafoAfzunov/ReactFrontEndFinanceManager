// src/components/AddIncomeForm.jsx
import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useSnackbar } from 'notistack';

function AddIncomeForm({ fetchIncomes, fetchBalance }) {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount) {
      setError('All fields are required.');
      return;
    }

    axios.post('/incomes/add-income', {
      amount: parseFloat(amount),
    })
      .then(() => {
        if (fetchIncomes) fetchIncomes();
        if (fetchBalance) fetchBalance();
        setSource('');
        setAmount('');
        setDate('');
        setError('');
        enqueueSnackbar('Income added successfully!', { variant: 'success' });
      })
      .catch((error) => {
        console.error('Error adding income:', error);
        setError('Failed to add income. Please try again.');
        enqueueSnackbar('Error adding income. Please try again.', { variant: 'error' });
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mb: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Amount"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        type="number"
        inputProps={{ step: '0.01' }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Add Income
      </Button>
    </Box>
  );
}

export default AddIncomeForm;
