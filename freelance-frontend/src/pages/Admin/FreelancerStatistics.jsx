import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StatRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(3, 4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  letterSpacing: '-0.025em',
  fontWeight: 600,
}));

const StatValue = styled('div')(({ theme }) => ({
  ...theme.typography.h3,
}));

const StatUnit = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

const Stat = ({ value, unit }) => (
  <StatRoot>
    <StatValue>{value}</StatValue>
    <StatUnit>{unit}</StatUnit>
  </StatRoot>
);

const FreelancerStatistics = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8002/api/freelancer-statistics/')
      .then(response => {
        setStatistics(response.data);
      })
      .catch(error => {
        console.error('Error fetching freelancer statistics:', error);
      });
  }, []);

  if (!statistics) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      <h1 style={{ textAlign: 'center', marginTop: '50px', paddingBottom: '50px' }}>Freelancer Statistics</h1>
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        <Stat value={statistics.total_freelancers} unit="Total Freelancers" />
        <Stat value={statistics.available_freelancers} unit="Available Freelancers" />
        <Stat value={statistics.avg_experience.toFixed(2)} unit="Avg. Experience (Years)" />
        {/* Add more statistics as needed */}
      </Stack>
    </div>
  );
};

export default FreelancerStatistics;
