import {
  Box,
  Divider,
  Grid,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import {
  mediumTypographyProps,
  smallTypographyProps,
} from "../../../../Constants";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import * as yup from "yup";
import { Formik } from "formik";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
const AccountSettings = () => {
  const initial = {
    salary_range: "",
    employeeType: "",
  };

  const schema = yup.object({
    salary_range: yup.string().required("Salary Range is required"),
    employeeType: yup.string().required("Employment Type is required"),
  });

  const handleSubmit = async (values) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('User not authenticated. Please log in.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8002/api/freelancer/post3/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Handle success response here, e.g., show a success message
      console.log("Data sent successfully!");
    } catch (error) {
      console.error("There was an error sending the data!", error);
    }
  };

  return (
    <div>
      <Box marginTop={3} marginRight={3}>
        <Typography variant="h5" gutterBottom>
          Account Settings
        </Typography>
        <Divider sx={{ margin: 4 }} />
        <Formik
          initialValues={initial}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography variant="body1" gutterBottom>
                    Salary Range
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="salary_range"
                    value={values.salary_range}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.salary_range && Boolean(errors.salary_range)}
                    helperText={touched.salary_range && errors.salary_range}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body1" gutterBottom>
                    Employment Type
                  </Typography>
                  <Select
                    name="employeeType"
                    value={values.employeeType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    variant="outlined"
                    error={touched.employeeType && Boolean(errors.employeeType)}
                  >
                    <MenuItem value="FULL-TIME">FULL-TIME</MenuItem>
                    <MenuItem value="PART-TIME">PART-TIME</MenuItem>
                  </Select>
                  {errors.employeeType && touched.employeeType && (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errors.employeeType}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Box marginTop={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Save Changes
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default AccountSettings;