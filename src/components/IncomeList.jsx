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
          <ListItem
            key={income.id || `income-${index}`}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)', // Optional: Background for each item
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '8px',
            }}
          >
            <ListItemText
              primary={`Description: ${income.source}`}
              secondary={
                <>
                  <Typography variant="body2" component="span">
                    Amount: ${income.amount}
                  </Typography>
                  <br />
                  <Typography variant="body2" component="span">
                    Date: {income.date || 'N/A'}
                  </Typography>
                </>
              }
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

export default IncomeList;
