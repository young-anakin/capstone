import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { mediumTypographyProps } from "../../../Constants";
import { useTranslation } from "react-i18next";

const JobType = ({ setStatus, postData, setPostData }) => {
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [jobType, setJobType] = useState(postData.job_type);
  const [min, setMin] = useState(postData.min_budget);
  const [max, setMax] = useState(postData.max_budget);

  const { t } = useTranslation();

  useEffect(() => {
    setIsNextDisabled(
      jobType.trim() === "" || min.trim() === "" || max.trim() === ""
    );
  }, [jobType, min, max]);

  const handleNextClick = () => {
    setPostData({
      ...postData,
      job_type: jobType,
      min_budget: min,
      max_budget: max,
    });
    setStatus("education");
  };

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

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
            {t("Choose the Job Type and Budget Range")}
          </Typography>
        </Grid>
        <Grid item md={1}>
          <div style={{ height: "100%", borderLeft: "1px solid #000" }}></div>
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <Stack spacing={2}>
            <Typography {...mediumTypographyProps}>
              {t("Select the type of job")}
            </Typography>
            <Select
              labelId="job-type-select-label"
              id="job-type-select"
              value={jobType}
              label="Job Type"
              onChange={handleJobTypeChange}
            >
              <MenuItem value={"partTime"}>Part-Time</MenuItem>
              <MenuItem value={"fullTime"}>Full-Time</MenuItem>
            </Select>
            <Typography {...mediumTypographyProps}>
              {t("Add the budget range")}
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"}>
              <TextField
                type="number"
                label="Minimum"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                sx={{ marginRight: "10px", flex: 1 }}
              />
              <TextField
                type="number"
                label="Maximum"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                sx={{ flex: 1 }}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={10}>
        <Grid item md={8}></Grid>
        <Grid item md={2}>
          <Button
            onClick={() => setStatus("initial")}
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
            disabled={isNextDisabled}
            onClick={handleNextClick}
            sx={{
              borderRadius: "8px",
              background: isNextDisabled ? "grey" : "var(--01-Dark, #05F)",
              color: "white",
              cursor: isNextDisabled ? "not-allowed" : "pointer",
              "&:hover": {
                background: isNextDisabled ? "grey" : "#0044cc",
              },
            }}
          >
            <Typography color={"white"} fontSize={"14px"}>
              {t("Next")}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default JobType;
