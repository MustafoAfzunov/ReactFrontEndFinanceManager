import React, { useState, useEffect, useContext } from 'react';
import BalanceDisplay from '../components/BalanceDisplay';
import IncomeList from '../components/IncomeList';
import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';
import AddIncomeForm from '../components/AddIncomeForm';
import AnalyticsPage from './AnalyticsPage';
import { Container, Typography, Box, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from '../utils/axiosConfig';

function Dashboard() {
  const { logout, user } = useContext(AuthContext); // Assume user has token if needed
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchIncomes = async () => {
    try {
      const response = await axios.get('/incomes/list-incomes', {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      setIncomes(response.data.incomes || response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('/expenses/list-expenses', {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      setExpenses(response.data.expenses || response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await axios.get('/balance/get-balance', {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      console.log('Fetched balance:', response.data); // Will show a number like 123.45
      setBalance(response.data); 
    } catch (error) {
      console.error('Error fetching balance:', error);
      // Optionally set a fallback or display an error message
      setBalance(0); 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchIncomes(), fetchExpenses(), fetchBalance()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
          color: '#fff',
        }}
      >
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage:'url(https://watermark.lovepik.com/photo/40169/8241.jpg_wh1200.jpg)',
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
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.5)',
          color: 'white',
        }}
      >
        {/* Navigation Toggle */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mb: 4,
          }}
        >
          <Button
            variant={showAnalytics ? 'outlined' : 'contained'}
            color="primary"
            onClick={() => setShowAnalytics(false)}
          >
            Dashboard
          </Button>
          <Button
            variant={!showAnalytics ? 'outlined' : 'contained'}
            color="secondary"
            onClick={() => setShowAnalytics(true)}
          >
            Analytics
          </Button>
        </Box>

        {!showAnalytics ? (
          <>
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

            <Box
              sx={{
                mb: 6,
                backgroundColor: 'rgba(255, 288, 233, 0.2)',
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
                  backgroundColor: 'rgba(255, 288, 233, 0.2)',
                  borderRadius: '16px',
                  padding: '2rem',
                  color: 'white',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                }}
              >
                <IncomeList incomes={incomes} />
              </Box>
              <Box
                sx={{
                  flex: '1 1 48%',
                  backgroundColor: 'rgba(255, 288, 233, 0.2)',
                  borderRadius: '16px',
                  padding: '2rem',
                  color: 'white',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                }}
              >
                <ExpenseList expenses={expenses} />
              </Box>
            </Box>

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
                  backgroundColor: 'rgba(255, 288, 233, 0.2)',
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
                  backgroundColor: 'rgba(255, 288, 233, 0.2)',
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
          </>
        ) : (
          <AnalyticsPage incomes={incomes} expenses={expenses} />
        )}
      </Container>
    </Box>
  );
}

export default Dashboard;
