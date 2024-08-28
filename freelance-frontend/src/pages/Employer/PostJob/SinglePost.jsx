import React, { useState } from "react";
import { Box } from "@mui/material";
import Topbar from "../../../components/Layouts/Topbar";
import Footer from "../../../components/Layouts/Footer";
import PostTitle from "./PostTitle";
import JobType from "./JobType";
import Education from "./Education";
import MileStones from "./MileStones";

const SinglePost = () => {
  const [status, setStatus] = useState("initial");
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    job_type: "",
    min_budget: "",
    max_budget: "",
    education: "",
    milestones: "",
    job_level: ""
  });

  // const handleSubmit = async () => {
  //   const token = localStorage.getItem('token');

  //   if (!token) {
  //     alert('User not authenticated. Please log in.');
  //     return;
  //   }

  //   const response = await fetch("http://localhost:8001/api/job-post/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`
  //     },
  //     body: JSON.stringify(postData)
  //   });

  //   if (response.ok) {
  //     console.log("Job posted successfully!");
  //   } else {
  //     console.error("Failed to post job.");
  //   }
  // };

  return (
    <div>
      <Topbar />
      <Box sx={{ m: 10 }}>
        {status === "initial" && (
          <PostTitle setStatus={setStatus} postData={postData} setPostData={setPostData} />
        )}
        {status === "jobType" && (
          <JobType setStatus={setStatus} postData={postData} setPostData={setPostData} />
        )}
        {status === "education" && (
          <Education setStatus={setStatus} postData={postData} setPostData={setPostData} />
        )}
        {status === "milestones" && (
          <MileStones
            setStatus={setStatus}
            postData={postData}
            setPostData={setPostData}
            // handleSubmit={handleSubmit}
          />
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default SinglePost;