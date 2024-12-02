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
    <Container maxWidth="md">
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="contained" color="secondary" onClick={logout}>
          Logout
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <BalanceDisplay balance={balance} />
      </Box>
      <Box sx={{ mt: 4 }}>
        <IncomeList incomes={incomes} />
      </Box>
      <Box sx={{ mt: 4 }}>
        <ExpenseList expenses={expenses} />
      </Box>
      <Box sx={{ mt: 4 }}>
        <AddIncomeForm fetchIncomes={fetchIncomes} fetchBalance={fetchBalance} />
      </Box>
      <Box sx={{ mt: 4 }}>
        <AddExpenseForm fetchExpenses={fetchExpenses} fetchBalance={fetchBalance} />
      </Box>
      {/* Add other components or charts as needed */}
    </Container>
  );
}

export default Dashboard;
