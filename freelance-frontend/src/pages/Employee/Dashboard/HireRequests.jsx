// import React, { useState } from "react";
// import Search from "../../../utils/Search";
// import StatBox from "../../../components/Common/StatBox";
// import { Grid, Box, useTheme } from "@mui/material";
// import { tokens } from "../../../theme";
// import { mockUpDataJobs } from "../../../data/mockData";
// import Footer from "../../../components/Layouts/Footer";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import { DataGrid } from "@mui/x-data-grid";

// // import { mockUpDataJobs } from "../../../data/mockData";

// const HireRequests = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const itemsPerPage = 9;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filteredData, setFilteredData] = useState(mockUpData);

//   const handleSearch = (searchQuery) => {
//     const filtered = mockUpData.filter((item) =>
//       item.employer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.request_date.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredData(filtered);
//     setCurrentPage(1);
//   };

//   const handleAccept = (id, jobTitle, freelancerName) => {
//     // Handle accept logic here
//     console.log(`Accepted: ${id}, ${jobTitle}, ${freelancerName}`);
//   };

//   const handleDecline = (id, jobTitle, freelancerName) => {
//     // Handle decline logic here
//     console.log(`Declined: ${id}, ${jobTitle}, ${freelancerName}`);
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const columns = [
//     { field: 'employer_name', headerName: 'Candidate', width: 200 },
//     { field: 'request_date', headerName: 'Date Applied', width: 200 },
//     {
//       field: 'accept',
//       headerName: 'Accept',
//       width: 150,
//       renderCell: (params) => (
//         <Button
//           onClick={() => handleAccept(params.row.id, params.row.job_title, params.row.freelancer_name)}
//           variant="contained"
//           color="success"
//           style={{ textTransform: 'none' }}
//         >
//           Accept
//         </Button>
//       ),
//     },
//     {
//       field: 'decline',
//       headerName: 'Decline',
//       width: 150,
//       renderCell: (params) => (
//         <Button
//           onClick={() => handleDecline(params.row.id, params.row.job_title, params.row.freelancer_name)}
//           variant="contained"
//           color="error"
//           style={{ textTransform: 'none' }}
//         >
//           Decline
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <Box m="50px">
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Search
//           data={filteredData}
//           setData={setFilteredData}
//           placeholder="Search request..."
//           searchKeys={['employer_name', 'request_date']}
//           onSearch={handleSearch}
//         />
//       </Box>
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           '& .MuiDataGrid-root': {
//             border: 'none',
//           },
//           '& .MuiDataGrid-cell': {
//             borderBottom: 'none',
//           },
//           '& .name-column--cell': {
//             color: colors.greenAccent[300],
//           },
//           '& .MuiDataGrid-columnHeaders': {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: 'none',
//           },
//           '& .MuiDataGrid-virtualScroller': {
//             backgroundColor: colors.primary[400],
//           },
//           '& .MuiDataGrid-footerContainer': {
//             borderTop: 'none',
//             backgroundColor: colors.blueAccent[700],
//           },
//           '& .MuiCheckbox-root': {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//           '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
//             color: `${colors.grey[100]} !important`,
//           },
//         }}
//       >
//         <DataGrid rows={currentItems} columns={columns} pageSize={itemsPerPage} />
//       </Box>
//     </Box>
//   );
// };

// export default HireRequests;
