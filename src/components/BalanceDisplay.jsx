// src/components/BalanceDisplay.jsx
import React from 'react';
import { Typography, CircularProgress } from '@mui/material';

function BalanceDisplay({ balance }) {
  if (balance === null) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h6">Current Balance</Typography>
      <Typography variant="h4">${balance}</Typography>
    </div>
  );
}

export default BalanceDisplay;
