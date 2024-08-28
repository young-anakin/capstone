import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import axios from 'axios';

const chartSetting = {
  yAxis: [
    {
      label: 'Total Revenue',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const valueFormatter = (value) => `$${value.toFixed(2)}`;

export default function Revenue() {
  const [dataset, setDataset] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:8004/payment/total-revenue/')
      .then(response => {
        setDataset(response.data.revenue_data);
      })
      .catch(error => {
        console.error('Error fetching revenue data:', error);
      });
  }, []);

  if (!dataset) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: '20px' }}> {/* Adjust margin-top to create space */}
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[{ dataKey: 'revenue', label: 'Total Revenue', valueFormatter }]}
        {...chartSetting}
      />
    </div>
  );
}
