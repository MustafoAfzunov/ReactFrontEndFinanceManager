import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Typography, Container } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function AnalyticsPage({ incomes = [], expenses = [] }) {
  // Generate labels dynamically based on the larger of the two lists
  const maxEntries = Math.max(incomes.length, expenses.length);
  const labels = Array.from({ length: maxEntries }, (_, i) => `Entry ${i + 1}`);

  // Map data for the graph
  const incomeAmounts = incomes.map((income) => income.amount);
  const expenseAmounts = expenses.map((expense) => expense.amount);

  // Ensure datasets align with the labels
  while (incomeAmounts.length < maxEntries) incomeAmounts.push(0);
  while (expenseAmounts.length < maxEntries) expenseAmounts.push(0);

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: 'Incomes',
        data: incomeAmounts,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Expenses',
        data: expenseAmounts,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Income vs Expenses Analysis (${incomes.length} Incomes, ${expenses.length} Expenses)`,
      },
    },
  };

  // Handle no data scenario
  if (!incomes.length && !expenses.length) {
    return (
      <Typography
        variant="h6"
        sx={{ textAlign: 'center', color: 'white', mt: 4 }}
      >
        No data available to display.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1542281286-9e0a16bb7366)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.5)',
          color: 'white',
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
        >
          Analytics
        </Typography>
        <Line data={data} options={options} key={JSON.stringify(data)} />
      </Container>
    </Box>
  );
}

export default AnalyticsPage;
