import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';

export default function TwoLevelPieChart() {
  // State to store the project status data
  const [projectStatusData, setProjectStatusData] = useState([]);

  // Fetch project status data from the API
  useEffect(() => {
    axios.get('http://localhost:8002/api/task-status/')
      .then(response => {
        // Extract data from the response
        const data = response.data;
        // Update state with the project status data
        setProjectStatusData(data);
      })
      .catch(error => {
        console.error('Error fetching project status data:', error);
      });
  }, []);

  return (
    <PieChart
      // Define the pie chart series
      series={[
        {
          // Set the inner and outer radius for the pie chart segment
          innerRadius: 0,
          outerRadius: 80,
          // Provide the project status data to be displayed
          data: projectStatusData,
        },
      ]}
      width={400}
      height={300}
      slotProps={{
        legend: { hidden: true },
      }}
    />
  );
}
