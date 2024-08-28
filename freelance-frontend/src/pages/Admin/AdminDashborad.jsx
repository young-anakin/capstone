import React, {useState,useEffect} from 'react';
import StatFullTemplate from '../../components/StatisticsComp';
import Performance from '../../components/Performance';
import TwoLevelPieChart from '../../components/PieChart';



function AdminDashboard() {
    const [userInfo, setUserInfo] = useState(null);
  
    useEffect(() => {
      const token = localStorage.getItem('token'); // Get the token from localStorage
  
      if (token) {
        fetch('http://localhost:8000/api/token/validate/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add the token to the Authorization header
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to validate token');
          }
          return response.json();
        })
        .then(data => setUserInfo(data))
        .catch(error => console.error('Error fetching user info:', error));
      }
    }, []);
    if (!userInfo) {
      return <div>No user information available</div>;
    }
  return (
        <div style={{marginLeft: '50px'}}>
            <h1 style={{ textAlign: 'center', margintop: '50px' }}>Wlecome {userInfo.username}</h1>
            <StatFullTemplate/>
            <h4 style={{ textAlign: 'center', margintop: '50px' }}>System performance</h4>
            <div style={{ display: 'flex'}}>
              <Performance />
              <TwoLevelPieChart />
            </div>
        </div>
  );
}

export default AdminDashboard;
