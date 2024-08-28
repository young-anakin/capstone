import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { mediumTypographyProps } from "../../../Constants";
import { useTranslation } from "react-i18next";

const Cv = ({ setStatus, jobId, setFile }) => {
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [localFile, setLocalFile] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    setIsNextDisabled(!localFile);
  }, [localFile]);

  const handleNextClick = () => {
    setFile(localFile);
    setStatus("cover");
  };

  const handleFileChange = (event) => {
    setLocalFile(event.target.files[0]);
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
            {t("Upload Resume Here")}
          </Typography>
        </Grid>
        <Grid item md={1}>
          <div style={{ height: "100%", borderLeft: "1px solid #000" }}></div>
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <Stack spacing={2}>
            <Typography>Upload Resume</Typography>
            <Box
              height={"250px"}
              display="flex"
              flexDirection={"column"}
              alignItems="center"
              justifyContent="center"
              sx={{
                border: "3px dotted grey",
                borderRadius: "8px",
                backgroundColor: "rgba(169, 169, 169, 0.3)",
                padding: "10px",
              }}
            >
              <Button
                variant="outlined"
                component="label"
                sx={{
                  borderRadius: "8px",
                  padding: "10px",
                  border: "2px dashed #05F",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: localFile ? "var(--01-Light, #E0F7FA)" : "transparent",
                }}
              >
                {localFile ? localFile.name : "Click to Upload"}
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={10}>
        <Grid item md={10}></Grid>
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
              Next
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cv;