import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';

const Performance = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/api/job-posted-time/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching job posted time data:', error);
      });
  }, []);

  return (
    <div>
      <LineChart
        xAxis={[{ data: data.map(item => item.posted_at) }]}
        series={[
          {
            data: data.map(item => item.job_count),
            showMark: ({ index }) => index % 2 === 0,
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default Performance;