import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'Month',
    dataIndex: 'month',
  },
  {
    title: 'Revenue',
    dataIndex: 'revenue',
    align: 'right',
    render: (value) => `$${parseFloat(value).toFixed(2)}`,
  },
];

const mapMonthToString = (month) => {
  switch (month) {
    case 'Jan':
      return 'January';
    case 'Feb':
      return 'February';
    case 'Mar':
      return 'March';
    case 'Apr':
      return 'April';
    case 'May':
      return 'May';
    case 'Jun':
      return 'June';
    case 'Jul':
      return 'July';
    case 'Aug':
      return 'August';
    case 'Sep':
      return 'September';
    case 'Oct':
      return 'October';
    case 'Nov':
      return 'November';
    case 'Dec':
      return 'December';
    default:
      return '';
  }
};

const Revenue = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8004/payment/total-revenue/')
      .then(response => {
        const formattedData = response.data.map(item => ({
          month: mapMonthToString(item.month),
          revenue: item.revenue,
        }));
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching revenue data:', error);
      });
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
    />
  );
};

export default Revenue;