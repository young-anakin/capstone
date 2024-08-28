import React, { useState, useEffect } from "react";
import Search from "../../../utils/Search";
import StatBox from "../../../components/Common/StatBox";
import { Grid, Box, useTheme, Button } from "@mui/material"; // Import Button
import { tokens } from "../../../theme";
import { mockUpDataJobs } from "../../../data/mockData";
import Footer from "../../../components/Layouts/Footer";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../../components/Common/ConfirmationModal";


const HireRequests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastMessageErr, setToastMessageErr] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [decline, setDecline] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      setToastMessage(""); // Reset the toast message after displaying
    }
  }, [toastMessage]);

  useEffect(() => {
    if (toastMessageErr) {
      toast.error(toastMessageErr);
      setToastMessageErr(""); // Reset the toast message after displaying
    }
  }, [toastMessageErr]);

  useEffect(() => {
    fetch('http://localhost:8002/api/freelancers/employer/', {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`  // Replace with your actual secret key
      },
    })
      .then(response => response.json())
      .then(data => setFilteredData(data))
      .catch(error => console.error("Error fetching hire requests:", error));
  }, [token]);

  const handleSearch = (searchQuery) => {
    const filtered = filteredData.filter((item) =>
      item.job_title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleAccept = (id, job, candidate) => {
    setSelectedJob({ id, job, candidate });
    setConfirmationOpen(true);
  };

  const handleDecline = (id, job, candidate) => {
    setSelectedJob({ id, job, candidate });
    setDecline(true);
    setConfirmationOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:8002/api/accept-freelancer/${selectedJob.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Assuming you are storing the token in localStorage
        },
        body: JSON.stringify({ application_status: 'accepted' })
      });

      if (response.ok) {
        const updatedData = await response.json();
        setToastMessage(`You have accepted the application for ${selectedJob.candidate} for ${selectedJob.job}`);
        // Optionally, update the state to reflect the changes
        setFilteredData(prevData => prevData.map(item => item.id === selectedJob.id ? updatedData : item));
      } else {
        const errorData = await response.json();
        setToastMessageErr(`Error: ${errorData.msg || 'Could not update application status'}`);
      }
    } catch (error) {
      console.error("Error accepting application:", error);
      setToastMessageErr('An unexpected error occurred');
    }

    setConfirmationOpen(false);
  };

  const handleDeclineConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:8002/api/decline-freelancer/${selectedJob.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you are storing the token in localStorage
        },
        body: JSON.stringify({ application_status: 'declined' })
      });

      if (response.ok) {
        const updatedData = await response.json();
        setToastMessageErr(`You have declined the application for ${selectedJob.freelancer_name} for ${selectedJob.job_title}`);
        // Update the state to reflect the changes
        setFilteredData(prevData =>
          prevData.map(item => (item.id === selectedJob.id ? updatedData : item))
        );
      } else {
        const errorData = await response.json();
        setToastMessageErr(`Error: ${errorData.error || 'Failed to decline the application.'}`);
      }
    } catch (error) {
      setToastMessageErr(`Error: ${error.message || 'Failed to decline the application.'}`);
    } finally {
      setConfirmationOpen(false);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    { field: "freelancer_name", headerName: "Candidate", width: 200 },
    { field: "job_title", headerName: "Job", width: 200 },
    { field: "dateApplied", headerName: "Date Applied", width: 200 },
    {
      field: "accept",
      headerName: "Accept",
      width: 150,
      renderCell: (params) => (
        <Button
          onClick={() =>
            handleAccept(params.row.id, params.row.job_title, params.row.freelancer_name)
          }
          variant="contained"
          color="success"
          style={{ textTransform: "none" }}
        >
          Accept
        </Button>
      ),
    },
    {
      field: "decline",
      headerName: "Decline",
      width: 150,
      renderCell: (params) => (
        <Button
          onClick={() => handleDecline(params.row.id, params.row.job_title, params.row.freelancer_name)}
          variant="contained"
          color="error"
          style={{ textTransform: "none" }}
        >
          Decline
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Box m="50px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Search
            data={filteredData}
            setData={setFilteredData}
            placeholder="Search jobs..."
            searchKeys={["job_title", "dateApplied", "application_status"]}
          />
        </Box>
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={currentItems}
            columns={columns}
            pageSize={itemsPerPage}
            getRowId={(row, index) => index}
            onPageChange={(params) => setCurrentPage(params.page + 1)}
            pagination
          />
        </Box>
      </Box>
      <ToastContainer />
      <ConfirmationModal
        open={confirmationOpen}
        onClose={handleCloseConfirmation}
        onConfirm={decline ? handleDeclineConfirm : handleConfirm}
        title="Confirm Action"
        content={
          decline
            ? `Are you sure you want to decline the request by ${
                selectedJob ? selectedJob.candidate : ""
              }`
            : `Are you sure you want to accept the request by ${
                selectedJob ? selectedJob.candidate : ""
              }?`
        }
      />
    </div>
  );
};

export default HireRequests;