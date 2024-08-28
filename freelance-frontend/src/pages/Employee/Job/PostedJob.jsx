import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Grid,
  FormControl,
  Input,
  InputAdornment,
  Paper,
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import Milestones from "./fragments/Milestones";
import ChatModal from "./fragments/ChatModal";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Footer from "../../../components/Layouts/Footer";
import Topbar from "../../../components/Layouts/Topbar";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { tokens } from "../../../theme";
import { DataGrid } from "@mui/x-data-grid";
import chapaImg from "../../../assets/chapa.jpg";
import { useNavigate } from "react-router-dom";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const CommentBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const PostedJobEmployee = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { jobId } = useParams();

  const [milestones, setMilestones] = useState([]);
  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [githubLink, setGithubLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("token");
  const [jobDetail, setJobDetail] = useState(null);

  useEffect(() => {
    if (jobId) {
      // Fetch job details and milestones
      fetch(`http://localhost:8002/api/job-application/${jobId}/`)
        .then((response) => response.json())
        .then((data) => {
          const milestonesWithTasks = Array(data.milestone).fill({
            checked: false,
          });
          setMilestones(milestonesWithTasks);
          setJobDetail(data);
        });
    }
  }, [jobId]);

  useEffect(() => {
    fetch("http://localhost:8003/api/sentiments/user/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) =>
        console.error("Error fetching sentiment data:", error)
      );
  }, [token]);

  const handleCheckboxChange = (index) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone, i) =>
        i === index ? { ...milestone, checked: !milestone.checked } : milestone
      )
    );
  };

  const handleCompleteClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }
    // Submit the task
    const formData = new FormData();
    formData.append("job_applied", jobId);
    formData.append("submission_date", new Date().toISOString());
    formData.append("link", githubLink);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    fetch("http://localhost:8002/api/submit-task/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Replace with your actual secret key
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task submitted:", data);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFileError("File size exceeds 10 MB.");
        setSelectedFile(null);
      } else {
        setFileError("");
        setSelectedFile(file);
      }
    }
  };

  const completedTasks = milestones.filter((milestone) => milestone.checked)
    .length;
  const totalTasks = milestones.length;

  const toggleChatModal = () => {
    setIsChatModalOpen(!isChatModalOpen);
  };

  return (
    <div>
      <Topbar />
      <Box m="50px">
        <Box maxWidth="1320px" mx="auto">
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <Typography variant="h4">Job Details</Typography>
              {jobDetail ? (
                <>
                  <Typography variant="h5">{jobDetail.title}</Typography>
                  <Typography>{jobDetail.description}</Typography>
                </>
              ) : (
                <Typography variant="h6">Loading job details...</Typography>
              )}
            </Grid>
            <Grid item xs={12} md={1}>
              <Divider
                orientation="vertical"
                style={{
                  width: "1px",
                  backgroundColor: "black",
                  margin: "auto",
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box marginLeft={7}>
                <Button
                  style={{
                    display: "flex",
                    width: "216px",
                    padding: "16px 24px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    borderRadius: "6px",
                    background: "var(--WF-Base-800, #2D3648)",
                  }}
                >
                  <Typography color={"white"}>OnGoing</Typography>
                </Button>
                <Box marginTop={2}>
                  {milestones.map((milestone, index) => (
                    <div key={index}>
                      <label>
                        <input
                          type="checkbox"
                          checked={milestone.checked}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        {` Task ${index + 1}`}
                      </label>
                    </div>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Divider
            orientation="horizontal"
            style={{
              height: "1px",
              backgroundColor: "black",
              marginTop: 10,
            }}
          />
        </Box>
        <Box marginTop={5}>{/* Other component code */}</Box>
        <Box marginTop={3}>
          <Typography variant="h6">Github Link</Typography>
          <FormControl variant="standard" fullWidth>
            <Input
              name="githubLink"
              fullWidth
              id="input-with-icon-adornment"
              onChange={(e) => setGithubLink(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <AddLinkIcon />
                </InputAdornment>
              }
            />
          </FormControl>

          <Typography variant="h6">Upload file</Typography>
          <input
            type="file"
            accept=".zip,.rar,.7z,.tar,.pdf,.doc"
            onChange={handleFileChange}
          />
          {fileError && <Typography color="error">{fileError}</Typography>}
        </Box>
        <Box margin={5}>
          <Divider />
        </Box>
        <Box display="flex" justifyContent="right" marginTop={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCompleteClick}
            disabled={
              completedTasks < totalTasks || githubLink === "" || !selectedFile
            }
          >
            Complete Milestone
          </Button>
        </Box>
        <Box margin={2} borderRadius={4}>
          <Typography variant="h6" align="center" gutterBottom>
            Feedbacks Given
          </Typography>
          <Divider />
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <CommentBox key={index}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={9}>
                    <Typography variant="body2">
                      Feedback: {comment.comment}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption">
                      Rating: {comment.rate}
                    </Typography>
                  </Grid>
                </Grid>
              </CommentBox>
            ))
          ) : (
            <Typography variant="body2">No comments found.</Typography>
          )}
        </Box>

        <Box
          position="fixed"
          bottom={20}
          right={20}
          sx={{ background: colors.blueAccent[800], borderRadius: "80px" }}
        >
          <IconButton
            variant="contained"
            color="primary"
            onClick={toggleChatModal}
          >
            <ChatBubbleIcon />
          </IconButton>
        </Box>
      </Box>
      <ChatModal open={isChatModalOpen} onClose={toggleChatModal} />
      <Footer />
    </div>
  );
};

export default PostedJobEmployee;
