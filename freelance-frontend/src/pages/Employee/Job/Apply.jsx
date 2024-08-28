import React, { useState } from "react";
import Topbar from "../../../components/Layouts/Topbar";
import Cv from "./Cv";
import { Box } from "@mui/material";
import Resume from "./Resume";
import { useParams } from "react-router-dom";

const Apply = () => {
  const [status, setStatus] = useState("initial");
  const { jobId } = useParams();
  const [file, setFile] = useState(null);  // Added file state

  return (
    <div>
      <Topbar />
      <Box sx={{ m: 10 }}>
        {status === "initial" && <Cv setStatus={setStatus} jobId={jobId} setFile={setFile} />}
        {status === "cover" && <Resume setStatus={setStatus} jobId={jobId} file={file} />}
      </Box>
    </div>
  );
};

export default Apply;

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Container,
//   Grid,
// } from "@mui/material";
// import Topbar from "../../../components/Layouts/Topbar"
// import Footer from "../../../components/Layouts/Footer"


// const Apply = () => {
//   const { jobId } = useParams();
//   const [coverLetter, setCoverLetter] = useState("");
//   const [cv, setCv] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("cover_letter", coverLetter);
//     formData.append("cv", cv);
//     formData.append("job_id", jobId);

//     try {
//       const response = await fetch("http://localhost:8002/api/apply/", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         setSuccessMessage("Application submitted successfully!");
//       } else {
//         setSuccessMessage("Failed to submit application. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting application:", error);
//       setSuccessMessage("Error submitting application. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <Topbar />
//       <Container maxWidth="md" style={{ marginTop: "50px" }}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           noValidate
//           sx={{ mt: 1 }}
//         >
//           <Typography component="h1" variant="h5">
//             Apply for Job
//           </Typography>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="coverLetter"
//             label="Cover Letter"
//             name="coverLetter"
//             autoComplete="coverLetter"
//             autoFocus
//             multiline
//             rows={4}
//             value={coverLetter}
//             onChange={(e) => setCoverLetter(e.target.value)}
//           />
//           <Button
//             variant="contained"
//             component="label"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             Upload CV
//             <input
//               type="file"
//               hidden
//               onChange={(e) => setCv(e.target.files[0])}
//             />
//           </Button>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Submit Application
//           </Button>
//           {successMessage && (
//             <Typography variant="body2" color="textSecondary">
//               {successMessage}
//             </Typography>
//           )}
//         </Box>
//       </Container>
//       <Footer />
//     </div>
//   );
// };

// export default Apply;







