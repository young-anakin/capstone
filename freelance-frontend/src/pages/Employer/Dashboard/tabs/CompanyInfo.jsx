import {
  Box,
  Divider,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import {
  mediumTypographyProps,
  smallTypographyProps,
} from "../../../../Constants";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import * as yup from "yup";
import { Formik } from "formik";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

const CompanyInfo = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDropProfilePicture = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleDeleteProfilePicture = () => {
    setSelectedImage(null);
  };

  const initial = {
    comapanyName: "",
    biography: "",
    comapanyUrl: "",
  };

  const schema = yup.object({
    comapanyName: yup.string().required("Company Name is required"),
    biography: yup.string().required("Bio is required"),
    comapanyUrl: yup.string().required("Company Url is required"),
  });

  const handleSubmit = async (values) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('User not authenticated. Please log in.');
      return;
    }

    const formData = new FormData();
    formData.append("comapanyName", values.comapanyName);
    formData.append("biography", values.biography);
    formData.append("comapanyUrl", values.comapanyUrl);
    if (selectedImage) {
      formData.append("logo", selectedImage);
    }

    try {
      const response = await fetch("http://localhost:8001/api/employer/company/", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Box marginTop={3} marginRight={3}>
        <Typography {...mediumTypographyProps}>Company Info</Typography>
        <Divider sx={{ margin: 4 }} />
        <Formik
          initialValues={initial}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography {...smallTypographyProps}>
                    Company Logo
                  </Typography>
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
                    onDragOver={handleDragOver}
                    onDrop={handleDropProfilePicture}
                  >
                    {selectedImage ? (
                      <>
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected"
                          style={{
                            width: "100%",
                            height: "100%",
                            maxHeight: "200px",
                            maxWidth: "200px",
                            objectFit: "cover",
                            marginTop: 70,
                          }}
                        />
                        <Button
                          onClick={handleDeleteProfilePicture}
                          variant="outlined"
                          color="error"
                          sx={{ marginTop: 4 }}
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      <>
                        <CloudUploadOutlinedIcon sx={{ fontSize: 70 }} />
                        <Typography {...mediumTypographyProps}>
                          Drop photo here
                        </Typography>
                        <Typography {...smallTypographyProps}>
                          Max Photo Size 1mb
                        </Typography>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleFileInputChange}
                          id="fileInput"
                        />
                        <label htmlFor="fileInput">
                          <Typography
                            {...mediumTypographyProps}
                            sx={{ cursor: "pointer" }}
                          >
                            or click to browse
                          </Typography>
                        </label>
                      </>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={8}>
                  <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
                    <Box gridColumn="span 12">
                      <Typography {...smallTypographyProps}>
                        Company Name
                      </Typography>
                      <TextField
                        type="text"
                        name="comapanyName"
                        value={values.comapanyName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ width: "100%", padding: 10 }}
                      />
                      {errors.comapanyName && touched.comapanyName && (
                        <div style={{ color: "red" }}>{errors.comapanyName}</div>
                      )}
                    </Box>
                    <Box gridColumn="span 12">
                      <Typography {...smallTypographyProps}>
                        Company Url
                      </Typography>
                      <TextField
                        type="text"
                        name="comapanyUrl"
                        value={values.comapanyUrl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ width: "100%", padding: 10 }}
                        // InputProps={{
                        //   startAdornment: (
                        //     <InputAdornment position="start">
                        //       <InsertLinkIcon />
                        //     </InputAdornment>
                        //   ),
                        // }}
                      />
                      {errors.comapanyUrl && touched.comapanyUrl && (
                        <div style={{ color: "red" }}>{errors.comapanyUrl}</div>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Box marginTop={3}>
                <Typography {...mediumTypographyProps}>
                  Company Biography
                </Typography>
                <TextField
                  name="biography"
                  fullWidth
                  id="outlined-multiline-static"
                  label="Bio"
                  multiline
                  rows={7}
                  value={values.biography}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ marginTop: 2 }}
                />
                {errors.biography && touched.biography && (
                  <div style={{ color: "red" }}>{errors.biography}</div>
                )}
              </Box>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Save
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default CompanyInfo;