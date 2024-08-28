import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import { styled, useThemeProps } from '@mui/material/styles';
import axios from 'axios';

const StatRoot = styled('div', {
  name: 'MuiStat',
  slot: 'root',
})(({ theme, ownerState }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(3, 4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  letterSpacing: '-0.025em',
  fontWeight: 600,
  ...(ownerState.variant === 'outlined' && {
    border: `2px solid ${theme.palette.divider}`,
    boxShadow: 'none',
  }),
}));

const StatValue = styled('div', {
  name: 'MuiStat',
  slot: 'value',
})(({ theme }) => ({
  ...theme.typography.h3,
}));

const StatUnit = styled('div', {
  name: 'MuiStat',
  slot: 'unit',
})(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

const Stat = React.forwardRef(function Stat(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiStat' });
  const { value, unit, variant, ...other } = props;

  const ownerState = { ...props, variant };

  return (
    <StatRoot ref={ref} ownerState={ownerState} {...other}>
      <StatValue ownerState={ownerState}>{value}</StatValue>
      <StatUnit ownerState={ownerState}>{unit}</StatUnit>
    </StatRoot>
  );
});

Stat.propTypes = {
  unit: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  variant: PropTypes.oneOf(['outlined']),
};

export default function JobStatistics() {
  const [statistics, setStatistics] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:8001/api/job-statistics/')
      .then(response => {
        setStatistics(response.data);
      })
      .catch(error => {
        console.error('Error fetching job statistics:', error);
      });
  }, []);

  if (!statistics) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      <h1 style={{ textAlign: 'center', marginTop: '50px', paddingBottom: '50px' }}>Job Statistics</h1>
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        <Stat value={statistics.total_jobs} unit="Total Jobs" />
        <Stat value={statistics.avg_milestones} unit="Avg. Milestones per Job" variant="outlined" />
        {/* Add more statistics as needed */}
      </Stack>
    </div>
  );
}
