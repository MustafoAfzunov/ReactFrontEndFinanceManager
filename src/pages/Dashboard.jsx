// src/pages/Dashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import BalanceDisplay from '../components/BalanceDisplay';
import IncomeList from '../components/IncomeList';
import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';
import AddIncomeForm from '../components/AddIncomeForm'; // Import the missing component
import { Container, Typography, Box, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from '../utils/axiosConfig';

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(null);

  const fetchIncomes = () => {
    axios.get('/incomes/list-incomes')
      .then(response => setIncomes(response.data.incomes || response.data))
      .catch(error => console.error('Error fetching incomes:', error));
  };

  const fetchExpenses = () => {
    axios.get('/expenses/list-expenses')
      .then(response => setExpenses(response.data.expenses || response.data))
      .catch(error => console.error('Error fetching expenses:', error));
  };

  const fetchBalance = () => {
    axios.get('/balance/get-balance')
      .then(response => setBalance(response.data.balance || response.data))
      .catch(error => console.error('Error fetching balance:', error));
  };

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
    fetchBalance();
  }, []);

    return (
      <Box
        sx={{
          height: '100%',
          backgroundImage: 'url(https://w0.peakpx.com/wallpaper/8/305/HD-wallpaper-finance-concepts-charts-background-with-graphs-stock-exchanges-money-business-concepts-finance.jpg)', // Replace with your desired image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          padding: '2rem 0',
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent dark background for the container
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.5)',
            color: 'white',
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              mb: 6,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', letterSpacing: '2px', color: '#f5f5f5' }}
            >
              Welcome to the Dashboard
            </Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </Box>
  
          {/* Balance Display */}
          <Box
            sx={{
              mb: 6,
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly translucent white background
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                letterSpacing: '1px',
                mb: 2,
                color: 'white',
              }}
            >
              Your Balance
            </Typography>
            <BalanceDisplay balance={balance} />
          </Box>
  
          {/* Income and Expense Lists */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 4,
              mb: 6,
            }}
          >
            <Box
              sx={{
                flex: '1 1 48%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '2rem',
                color: 'white',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Income
              </Typography>
              <IncomeList incomes={incomes} />
            </Box>
            <Box
              sx={{
                flex: '1 1 48%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '2rem',
                color: 'white',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Expenses
              </Typography>
              <ExpenseList expenses={expenses} />
            </Box>
          </Box>
  
          {/* Add Income and Add Expense Forms */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            <Box
              sx={{
                flex: '1 1 48%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '2rem',
                color: 'white',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Add Income
              </Typography>
              <AddIncomeForm fetchIncomes={fetchIncomes} fetchBalance={fetchBalance} />
            </Box>
            <Box
              sx={{
                flex: '1 1 48%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '2rem',
                color: 'white',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Add Expense
              </Typography>
              <AddExpenseForm fetchExpenses={fetchExpenses} fetchBalance={fetchBalance} />
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }

export default Dashboard;
