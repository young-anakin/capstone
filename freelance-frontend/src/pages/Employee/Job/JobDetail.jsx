import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Footer from "../../../components/Layouts/Footer";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import EmployersLogo from "../../../assets/EmployersLogo.png";
import {
  mediumTypographyProps,
  salaryTypographyProps,
  smallTypographyProps,
} from "../../../Constants";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Topbar from "../../../components/Layouts/Topbar";
import { useNavigate } from 'react-router-dom';

const JobDetail = () => {
  const { jobId } = useParams();
  const [jobDetail, setJobDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch job details from the backend
    fetch(`http://localhost:8001/api/jobs/${jobId}/`)
      .then(response => response.json())
      .then(data => setJobDetail(data))
      .catch(error => console.error('Error fetching job details:', error));
  }, [jobId]);

  if (!jobDetail) {
    return <div>Loading...</div>;
  }
  
  const handleApply = () => {
    navigate(`/employee/job-detail/apply/${jobId}`);
  };

  return (
    <div>
      <Topbar />
      <Box m="50px">
        <Box maxWidth="1320px" mx="auto">
          <Grid container spacing={2}>
            {/* First Grid item */}
            <Grid item xs={12} md={9}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                gap="12px"
                mb={4}
              >
                <img
                  src={'/path/to/your/employers/logo.png'} // replace with actual logo path
                  alt="EmployersLogo"
                  style={{
                    padding: "12px",
                    borderRadius: "4px",
                    background: "var(--Gray-50, #EDEFF5)",
                  }}
                />
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {jobDetail.title}
                  </Typography>
                  <Typography variant="subtitle1">at Google</Typography>
                </Box>
              </Box>
            </Grid>

            {/* Second Grid item */}
            <Grid item xs={12} md={3}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                gap="12px"
                mb={4}
              >
                <Box
                  display="flex"
                  padding={1}
                  alignItems="flex-start"
                  gap={10}
                  borderRadius="4px"
                  sx={{ background: "var(--Primary-50, #E7F0FA);" }}
                >
                  <IconButton>
                    <BookmarkIcon />
                  </IconButton>
                </Box>
                <Button variant="contained" onClick={handleApply}>
                  Apply Now
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <Box mb={4}>
                <Typography variant="h6" fontWeight="bold">
                  Job Description
                </Typography>
                <Typography variant="body1">
                  {jobDetail.description}
                </Typography>
                <Divider sx={{ m: "10px" }} />
                <Typography variant="h6" fontWeight="bold">Requirements</Typography>
                <Typography variant="body1">
                  {/* Add specific requirements here if available */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  quis lorem ut libero malesuada feugiat. Nulla porttitor
                  accumsan tincidunt. Donec sollicitudin molestie malesuada.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={1} md={1}>
              <Divider orientation="vertical" flexItem variant="middle" />
            </Grid>

            <Grid item xs={12} md={5}>
              <Box
                width="100%"
                minHeight="200px"
                display="flex"
                padding={32}
                justifyContent="center"
                alignItems="center"
                border="2px solid var(--Primary-50, #E7F0FA)"
                borderRadius="8px"
                bgcolor="var(--Gray-White, #FFF)"
                p={2}
              >
                <Box>
                  <Typography variant="h6" fontWeight="bold">Payment</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    ${jobDetail.min_budget} - ${jobDetail.max_budget}
                  </Typography>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    display: { xs: "none", sm: "block" },
                    margin: "0 32px",
                  }}
                />
                <Box>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                  >
                    <path
                      d="M14.25 27.3125L4.75 29.6875V8.3125L14.25 5.9375"
                      stroke="#0A65CC"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23.75 32.0625L14.25 27.3125V5.9375L23.75 10.6875V32.0625Z"
                      stroke="#0A65CC"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23.75 10.6875L33.25 8.3125V29.6875L23.75 32.0625"
                      stroke="#0A65CC"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Typography variant="h6" fontWeight="bold">Job Location</Typography>
                  <Typography variant="body1">
                    {jobDetail.location}
                  </Typography>
                </Box>
              </Box>

              <Box
                width="100%"
                minHeight="300px"
                display="flex"
                flexDirection="column"
                padding={32}
                border="2px solid var(--Primary-50, #E7F0FA)"
                borderRadius="8px"
                bgcolor="var(--Gray-White, #FFF)"
                p={2}
                mt={4}
              >
                <Box mb={2}>
                  <Typography variant="h6" fontWeight="bold">Job Overview</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Box>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <path
                            d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z"
                            stroke="#0A65CC"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 3V7"
                            stroke="#0A65CC"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 3V7"
                            stroke="#0A65CC"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 11H27"
                            stroke="#0A65CC"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <Typography variant="body2">Job Posted:</Typography>
                        <Typography variant="body1">
                         {jobDetail.posted_at}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Box>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="33"
                          height="32"
                          viewBox="0 0 33 32"
                          fill="none"
                        >
                          <path
                            d="M16.6665 27C22.7416 27 27.6665 22.0751 27.6665 16C27.6665 9.92487 22.7416 5 16.6665 5C10.5914 5 5.6665 9.92487 5.6665 16C5.6665 22.0751 10.5914 27 16.6665 27Z"
                            stroke="#0A65CC"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                          />
                          <path
                            d="M16.6665 16L21.6163 11.0502"
                            stroke="#0A65CC"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.6665 1H19.6665"
                            stroke="#0A65CC"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.6665 31H19.6665"
                            stroke="#0A65CC"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <Typography variant="body2">Job Expire in</Typography>
                        <Typography variant="body1">
                          2024-09-10
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Box>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="33"
                          height="32"
                          viewBox="0 0 33 32"
                          fill="none"
                        >
                          <path
                            d="M17.1665 21.5C20.091 21.5 22.4582 19.1328 22.4582 16.2083C22.4582 13.2838 20.091 10.9166 17.1665 10.9166C14.242 10.9166 11.8748 13.2838 11.8748 16.2083C11.8748 19.1328 14.242 21.5 17.1665 21.5Z"
                            stroke="#0A65CC"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                          />
                          <path
                            d="M17.1665 27.5C23.6542 27.5 28.9582 22.196 28.9582 15.7083C28.9582 9.22068 23.6542 3.91663 17.1665 3.91663C10.6788 3.91663 5.37476 9.22068 5.37476 15.7083C5.37476 22.196 10.6788 27.5 17.1665 27.5Z"
                            stroke="#0A65CC"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                          />
                        </svg>
                        <Typography variant="body2">Job Level:</Typography>
                        <Typography variant="body1">
                          {jobDetail.job_level}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default JobDetail;