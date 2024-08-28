import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Search from "../../../utils/Search";
import StatBox from "../../../components/Common/StatBox";
import { Grid, Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { mockUpDataJobs } from "../../../data/mockData";
import Footer from "../../../components/Layouts/Footer";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Topbar from "../../../components/Layouts/Topbar";

const JobList = () => {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8001/api/job-list/')
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error fetching freelancers data:", error));
  }, []);

  


  const handleSearch = (filteredData) => {
    setFilteredData(filteredData);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleJobClick = (jobId) => {
    navigate(`/employee/job-detail/${jobId}`);
  };

  return (
    <div>
      <Topbar />
      <Box m="50px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Search
            data={jobs}
            setData={handleSearch}
            placeholder="Search jobs..."
            searchKeys={["title", "job_type", "education"]}
          />
        </Box>
        <Grid container spacing={2}>
          {currentItems.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <StatBox
                  jobTitle={data.title}
                  employmentType={data.job_type}
                  salary={`${data.min_budget} - ${data.max_budget}`}
                  employerName={data.comapanyName}
                  onClick={() => handleJobClick(data.id)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Stack
          spacing={2}
          sx={{ mt: 2 }}
          direction="row"
          justifyContent="center"
        >
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </Box>
      <Footer />
    </div>
  );
};

export default JobList;