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
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

const ProfileSettings = () => {
  const initial = {
    Nationality: "",
    gender: "",
    profession: "",
    date_of_birth: "",
    biography: "",
  };

  const schema = yup.object({
    Nationality: yup.string().required("Nationality is required"),
    gender: yup.string().required("Gender is required"),
    profession: yup.string().required("Profession is required"),
    date_of_birth: yup.date().required("Date of Birth is required"),
    biography: yup.string().required("Biography is required"),
  });

  const handleSubmit = async (values) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('User not authenticated. Please log in.');
      return;
    }
    const formData = {
      Nationality: values.Nationality,
      gender: values.gender,
      profession: values.profession,
      date_of_birth: values.date_of_birth,
      biography: values.biography,
    };
  
    try {
      const response = await fetch('http://localhost:8002/api/freelancer/post2/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("There was an error uploading the data!", error);
    }
  };

  return (
    <div>
      <Box marginTop={3} marginRight={3}>
        <Typography variant="h5" gutterBottom>Profile Settings</Typography>
        <Divider />
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>Nationality</Typography>
                  <TextField
                    type="text"
                    name="Nationality"
                    value={values.Nationality}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.Nationality && !!errors.Nationality}
                    helperText={touched.Nationality && errors.Nationality}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>Gender</Typography>
                      <Select
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                          width: "100%",
                          marginTop: 10,
                          marginLeft: 10,
                          marginRight: 10,
                        }}
                      >
                        <MenuItem value="M">Male</MenuItem>
                        <MenuItem value="F">Female</MenuItem>
                      </Select>
                      {errors.gender && touched.gender && (
                        <div style={{ color: "red" }}>{errors.gender}</div>
                 )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>Profession</Typography>
                  <TextField
                    type="text"
                    name="profession"
                    value={values.profession}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.profession && !!errors.profession}
                    helperText={touched.profession && errors.profession}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>Date of Birth</Typography>
                  <TextField
                    type="date"
                    name="date_of_birth"
                    value={values.date_of_birth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.date_of_birth && !!errors.date_of_birth}
                    helperText={touched.date_of_birth && errors.date_of_birth}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>Biography</Typography>
                  <TextField
                    multiline
                    rows={4}
                    name="biography"
                    value={values.biography}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.biography && !!errors.biography}
                    helperText={touched.biography && errors.biography}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary">Save</Button>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default ProfileSettings;