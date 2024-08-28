import React, { useEffect, useState } from "react";
import Search from "../../../utils/Search";
import StatBox from "../../../components/Common/StatBox";
import { Grid, Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Footer from "../../../components/Layouts/Footer";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Topbar from "../../../components/Layouts/Topbar";
import { useNavigate } from "react-router-dom";

const ClientList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [freelancers, setFreelancers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8002/api/freelancers/")
      .then((response) => response.json())
      .then((data) => {
        setFreelancers(data);
        setFilteredData(data);
      })
      .catch((error) =>
        console.error("Error fetching freelancers data:", error)
      );
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

  const handleFreelancerClick = (freelancerId, userId) => {
    navigate(`/employer/client-detail/${freelancerId}/${userId}`);
  };

  return (
    <div>
      <Topbar />
      <Box m="50px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Search
            data={freelancers}
            setData={handleSearch}
            placeholder="Search freelancers..."
            searchKeys={["name", "profession", "email"]}
          />
        </Box>
        <Grid container spacing={2}>
          {currentItems.map((freelancer) => (
            <Grid item xs={12} sm={6} md={4} key={freelancer.id}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <StatBox
                  jobTitle={freelancer.profession}
                  employmentType={freelancer.employeeType}
                  salary={freelancer.salary_range}
                  employerName={freelancer.name}
                  location={freelancer.location}
                  rating={freelancer.rating} // not sure if you have a value called rating...
                  onClick={() => handleFreelancerClick(freelancer.id, freelancer.user_id)}
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

export default ClientList;
