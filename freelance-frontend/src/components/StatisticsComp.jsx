import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import PropTypes from 'prop-types';


const Stat = ({ value, unit, variant }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      padding: '1rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      fontWeight: 600,
      border: variant === 'outlined' ? '2px solid #000000' : 'none',
    }}
  >
    <div style={{ fontSize: '1.5rem' }}>{value}</div>
    <div style={{ fontSize: '1rem', color: '#757575' }}>{unit}</div>
  </div>
);

Stat.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  unit: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['outlined']),
};

const StatFullTemplate = () => {
  const [jobCount, setJobCount] = useState(0);
  const [freelancerCount, setFreelancerCount] = useState(0);
  const [employerCount, setEmployerCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);

  useEffect(() => {
    // Fetch job count
    fetch('http://localhost:8001/api/job-count/')
      .then((response) => response.json())
      .then((data) => setJobCount(data.job_count)) // Adjusted to match backend response structure
      .catch((error) => console.error('Error fetching job count:', error));

    // Fetch freelancer count
    fetch('http://localhost:8002/api/freelancer-count/')
      .then((response) => response.json())
      .then((data) => setFreelancerCount(data.freelancer_count)) // Assuming this is correct
      .catch((error) => console.error('Error fetching freelancer count:', error));

    // Fetch employer count
    fetch('http://localhost:8001/api/postedbyid-count/')
      .then((response) => response.json())
      .then((data) => setEmployerCount(data.employer_count)) // Adjusted to match backend response structure
      .catch((error) => console.error('Error fetching employer count:', error));

    // Fetch feedback count
    fetch('http://localhost:8003/api/feedback-count/')
      .then((response) => response.json())
      .then((data) => setFeedbackCount(data.feedback_count)) // Assuming this is correct
      .catch((error) => console.error('Error fetching feedback count:', error));
  }, []);
  return (
    <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        <Stat value={jobCount} unit="Jobs" />
        <Stat value={freelancerCount} unit="Freelancers" variant="outlined" />
        <Stat value={employerCount} unit="Employers" />
        <Stat value={feedbackCount} unit="Feedbacks" variant="outlined" />
      </Stack>
    </div>
  );
};

export default StatFullTemplate;