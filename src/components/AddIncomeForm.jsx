// src/components/AddIncomeForm.jsx
import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useSnackbar } from 'notistack';

function AddIncomeForm({ fetchIncomes, fetchBalance }) {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!source.trim() || !amount) {
      setError('All fields are required.');
      return;
    }

    axios.post('/incomes/add-income', {
      source: source.trim(),
      amount: parseFloat(amount),
    })
      .then(() => {
        if (fetchIncomes) fetchIncomes();
        if (fetchBalance) fetchBalance();
        setSource('');
        setAmount('');
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
    label="Source"
    variant="outlined"
    margin="normal"
    required
    fullWidth
    value={source}
    onChange={(e) => setSource(e.target.value)}
    InputLabelProps={{
      style: { color: 'white' }, // Change label color to white
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        color: 'white', // Change the input text color to white
      },
      '& .MuiInputLabel-root': {
        color: 'white', // Ensure the label color is white
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white', // Change the border color to white
      },
    }}
  />

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
    InputLabelProps={{
      style: { color: 'white' }, // Change label color to white
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        color: 'white', // Change the input text color to white
      },
      '& .MuiInputLabel-root': {
        color: 'white', // Ensure the label color is white
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white', // Change the border color to white
      },
    }}
  />

  <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
    Add Income
  </Button>
</Box>

  );
}

export default AddIncomeForm;
