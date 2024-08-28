import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Stack,
  Chip,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { mediumTypographyProps } from "../../../Constants";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MileStones = ({ setStatus, postData, setPostData }) => {
  const [milestones, setMilestones] = useState(postData.milestones);
  const [jobLevel, setJobLevel] = useState(postData.job_level);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsSubmitDisabled(milestones.trim() === "" || jobLevel.trim() === "");
  }, [milestones, jobLevel]);

  const handleNextClick = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8001/api/job-post/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...postData,
          milestones: parseInt(milestones), // Ensure milestones is sent as an integer
          job_level: jobLevel,
        }),
      });

      if (response.ok) {
        console.log("Job posted successfully:", await response.json());
        navigate("/employee/job-list");
        // setStatus("milestones"); // If needed to proceed to the next step
      } else {
        throw new Error("Failed to post job.");
      }
    } catch (error) {
      console.error("Error posting job:", error.message);
    }
  };

  const handleJobLevelClick = (event) => {
    setJobLevel(event.target.value);
  };

  const { t } = useTranslation();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={5}>
          <Typography
            fontFamily="Ink Free"
            fontSize="38px"
            fontStyle="normal"
            fontWeight={400}
            lineHeight="28px"
            sx={{ marginTop: "100px" }}
          >
            {t("Set Milestones and Job Level")}
          </Typography>
        </Grid>
        <Grid item md={1}>
          <div style={{ height: "100%", borderLeft: "1px solid #000" }}></div>
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <Stack spacing={2}>
            <Typography {...mediumTypographyProps}>
              {t("Define the milestones for the job")}
            </Typography>
            <TextField
              id="outlined-basic"
              type="number"
              label="Milestones"
              variant="outlined"
              value={milestones}
              onChange={(e) => setMilestones(e.target.value)}
              required
            />
            <Typography {...mediumTypographyProps}>
              {t("Define the job level")}
            </Typography>
            <Select
              labelId="education-select-label"
              id="education-select"
              value={jobLevel}
              label="Job Level"
              onChange={handleJobLevelClick}
            >
              <MenuItem value="easy">{t("Easy")}</MenuItem>
              <MenuItem value="medium">{t("Medium")}</MenuItem>
              <MenuItem value="hard">{t("Hard")}</MenuItem>
            </Select>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={10}>
        <Grid item md={8}></Grid>
        <Grid item md={2}>
          <Button
            onClick={() => setStatus("education")}
            sx={{
              borderRadius: "8px",
              background: "var(--01-Dark, #05F)",
              color: "white",
              "&:hover": {
                background: "#0044cc",
              },
            }}
          >
            <Typography color={"white"} fontSize={"14px"}>
              {t("Back")}
            </Typography>
          </Button>
        </Grid>
        <Grid item md={2}>
          <Button
            disabled={isSubmitDisabled}
            onClick={handleNextClick}
            sx={{
              borderRadius: "8px",
              background: isSubmitDisabled ? "grey" : "var(--01-Dark, #05F)",
              color: "white",
              cursor: isSubmitDisabled ? "not-allowed" : "pointer",
              "&:hover": {
                background: isSubmitDisabled ? "grey" : "#0044cc",
              },
            }}
          >
            <Typography color={"white"} fontSize={"14px"}>
              {t("Submit")}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default MileStones;
