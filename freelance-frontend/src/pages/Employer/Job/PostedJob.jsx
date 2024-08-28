import React, { useState, useEffect } from "react";
import Topbar from "../../../components/Layouts/Topbar";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  highlightedTitleProps,
  largeTypographyProps,
  mediumTypographyProps,
  smallTypographyProps,
} from "../../../Constants";
import Footer from "../../../components/Layouts/Footer";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Milestones from "./fragments/Milestones";
import { tokens } from "../../../theme";
import ChatModal from "./fragments/ChatModal";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
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

const initialMilestones = [
  {
    id: 1,
    title: "Milestone 1",
    tasks: [
      { id: 1, label: "Task 1", checked: false },
      { id: 2, label: "Task 2", checked: false },
    ],
  },
  {
    id: 2,
    title: "Milestone 2",
    tasks: [
      { id: 1, label: "Task 1", checked: false },
      { id: 2, label: "Task 2", checked: false },
    ],
  },
  // Add more milestones as needed
];

// const employee = {
//   name: "John Doe",
//   profilePicture: "https://randomuser",
// };

const PostedJob = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { taskId } = useParams();

  const [milestones, setMilestones] = useState(initialMilestones);
  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [taskDetail, setTaskDetail] = useState(null);

  useEffect(() => {
    if (taskId) {
      fetch(`http://localhost:8002/api/get-submission/${taskId}/`)
        .then((response) => response.json())
        .then((data) => {
          setTaskDetail(data);
          setMilestones(Array(data.milestones).fill({ tasks: [] }));
        });
    }
  }, [taskId]);

  if (!taskDetail) {
    return <div>Loading...</div>;
  }

  const handleCheckboxChange = (milestoneId, taskId) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone, index) =>
        index === milestoneId
          ? {
              ...milestone,
              tasks: milestone.tasks.map((task) =>
                task.id === taskId ? { ...task, checked: !task.checked } : task
              ),
            }
          : milestone
      )
    );
  };

  const schema = yup.object({
    comment: yup.string().required("Comment is required"),
  });

  const isEnglish = (text) => {
    const englishRegex = /^[A-Za-z0-9\s.,'!?()]+$/;
    return englishRegex.test(text);
  };

  const handleCompleteClick = async (values) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    // const formData = new FormData();
    // formData.append('task', taskId);
    // formData.append('comment', values.comment);

    const payload = {
      task: taskId,
      comment: values.comment,
    };

    const endpoint = isEnglish(values.comment)
      ? "http://localhost:8003/api/analyze-sentiment-english/"
      : "http://localhost:8003/api/analyze-sentiment/";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    // if (currentMilestoneIndex < milestones.length - 1) {
    //   setCurrentMilestoneIndex(currentMilestoneIndex + 1);
    // }
  };

  const currentMilestone = milestones[currentMilestoneIndex];
  const completedTasks = currentMilestone.tasks.filter(
    (task) => task.checked
  ).length;
  const totalTasks = currentMilestone.tasks.length;

  const toggleChatModal = () => {
    setIsChatModalOpen(!isChatModalOpen);
  };

  const handleChapaClick = () => {
    navigate("/payment");
  };

  return (
    <div>
      <Topbar />
      <Box m="50px">
        <Box maxWidth="1320px" mx="auto">
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <Typography variant="h4">Job Details</Typography>
              <Typography variant="h5">{taskDetail.job_title}</Typography>
              <Typography>{taskDetail.job_description}</Typography>
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
                    background: "var(--WF-Base-800, #2D3648)"  
                  }}
                  onClick={handleChapaClick}
                >
                  <Typography color={"white"}>Pay</Typography>
                </Button>
                <Box marginTop={2}></Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={5}>
                    <img
                      src={chapaImg}
                      alt="Logo"
                      onClick={handleChapaClick}
                      style={{
                        borderRadius: "50%",
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </Grid>
                  {/* <Grid item xs={12} md={7}>
                    <Typography variant="h4">$ 150</Typography>
                  </Grid> */}
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Divider
            orientation="horizontal"
            style={{ height: "1px", backgroundColor: "black", marginTop: 10 }}
          />
        </Box>
        <Box marginTop={5}>
          <Box marginTop={3}>
            <Typography variant="h6">
              This job is done by{" "}
              <Link
                href="https://example.com/employee-profile"
                underline="hover"
              >
                {taskDetail.freelancer_name}
              </Link>
            </Typography>
          </Box>
          <Milestones
            milestones={milestones}
            currentMilestoneIndex={currentMilestoneIndex}
            handleCheckboxChange={handleCheckboxChange}
          />
        </Box>
        <Box marginTop={3}>
          <Typography variant="h6">Github Link</Typography>
          <Link href={taskDetail.link} underline="hover">
            {taskDetail.link}
          </Link>
        </Box>
        <Box margin={5}>
          <Divider />
        </Box>
        <Box marginTop={3}>
          <Typography variant="h6">Uploaded File</Typography>
          <Link
            href={`http://localhost:8002${taskDetail.file}`}
            download={taskDetail.file}
            underline="hover"
          >
            Download file
          </Link>
        </Box>
        <Box margin={5}>
          <Divider />
        </Box>
        <Formik
          initialValues={{ comment: "" }}
          validationSchema={schema}
          onSubmit={handleCompleteClick}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Box margin={2} borderRadius={4}>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  placeholder="Write your feedback for this specific task submission.../ ስለስራው አስተያየት ይስጡ"
                  name="comment"
                  value={values.comment}
                  onChange={handleChange}
                  multiline
                  rows={5}
                  sx={{
                    backgroundColor: colors.blueAccent[800],
                    borderRadius: "8px",
                  }}
                  error={touched.comment && Boolean(errors.comment)}
                  helperText={touched.comment && errors.comment}
                />
              </Box>
              <Box display="flex" justifyContent="right" marginTop={3}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  //  disabled={completedTasks < totalTasks}
                >
                  Comment
                </Button>
              </Box>
            </form>
          )}
        </Formik>
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

export default PostedJob;
