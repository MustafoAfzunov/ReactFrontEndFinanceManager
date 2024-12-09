import React from 'react';
import { List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';

function ExpenseList({ expenses }) {
  if (!expenses) return <CircularProgress />;
  if (expenses.length === 0) return <Typography>No expenses found.</Typography>;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Expenses
      </Typography>
      <List>
        {expenses.map((expense, index) => (
          <ListItem
            key={expense.id || `expense-${index}`}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)', // Optional: Background for each item
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '8px',
            }}
          >
            <ListItemText
              primary={`Description: ${expense.category}`}
              secondary={`Amount: $${expense.amount}`}
              sx={{
                '& .MuiTypography-root': {
                  color: 'white',
                },
                '& .MuiListItemText-primary': {
                  fontWeight: 'bold',
                  fontSize: '20px',
                },
                '& .MuiListItemText-secondary': {
                  fontSize: '17px',
                  fontStyle: 'italic',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
  
}

export default ExpenseList;
