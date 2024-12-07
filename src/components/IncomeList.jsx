import React from 'react';
import { List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';

function IncomeList({ incomes }) {
  if (!incomes) return <CircularProgress />;
  if (incomes.length === 0) return <Typography>No incomes found.</Typography>;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Incomes
      </Typography>
      <List>
        {incomes.map((income, index) => (
          <ListItem key={income.id || `income-${index}`}>
            <ListItemText 
              primary={income.source} 
              secondary={`Amount: $${income.amount}`} 
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default IncomeList;
