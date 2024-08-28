import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { mediumTypographyProps } from "../../../Constants";
import { useTranslation } from "react-i18next";

const PostTitle = ({ setStatus, postData, setPostData }) => {
  const [title, setTitle] = useState(postData.title);
  const [description, setDescription] = useState(postData.description);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    setIsNextDisabled(title.trim() === "" || description.trim() === "");
  }, [title, description]);

  const handleNextClick = async () => {
    setPostData({ ...postData, title, description });
    setStatus("jobType");
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
            {t("Let’s Start By Adding a Title")}
          </Typography>
        </Grid>
        <Grid item md={1}>
          <div style={{ height: "100%", borderLeft: "1px solid #000" }}></div>
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <Stack spacing={2}>
            <Typography>{t("Write a title for your job post")}</Typography>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Typography>
              {t("Write a Description for your job post")}
            </Typography>
            <TextField
              multiline
              maxRows={5}
              minRows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
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
              {t("Next")}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostTitle;
