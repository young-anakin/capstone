import React, { useState ,useEffect }from "react";
import { Typography, Box, useTheme, Container, Divider } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../utils/Header";
import * as yup from "yup";
import { Formik , Form} from "formik";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [token, setToken]= useState('')
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
 
  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
    });
  };

  const schema = yup.object({
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });



  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login/", values);// Replace with your backend URL
      console.log(response.data); 
      localStorage.setItem('token', response.data.access);
    
      if (response.data.role === 'employee') {
        navigate('/employee/dashboard');
      } else if (response.data.role === 'employer') {
        navigate('/employer/dashboard');
      } else if (response.data.role === 'admin'){
        navigate('/admin/dashboard');
        // navigate('/payment');
      }

      // resetForm();
    } catch (error) {
      console.error("Error:", error.response.data); // Handle error response
    } 
    
  };


  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            paddingTop: 8,
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Header bold="Log in to FreeLancer" color="#FFFFFF" />
          </Box>

          <Formik
            initialValues={formData}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
           {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form>
                <Box display="grid" gap="10px">
                  <TextField
                    id="filled-basic"
                    variant="filled"
                    margin="normal"
                    fullWidth
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value= {values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    InputProps={{
                      sx: { backgroundColor: "#2B2B2B", borderRadius: "8px" },
                    }}
                    InputLabelProps={{
                      style: { color: "#585858" },
                    }}
                  />

                  <TextField
                    id="filled-basic"
                    variant="filled"
                    margin="normal"
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value= {values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      !!touched.password && !!errors.password
                    }
                    helperText={
                    touched.password && errors.password
                    }
                    InputProps={{
                      sx: { backgroundColor: "#2B2B2B", borderRadius: "8px" },
                    }}
                    InputLabelProps={{
                      style: { color: "#585858" },
                    }}
                  />
                </Box>
                <Box display="grid" gap="10px" mt="20px">
                  <Grid container>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={5}>
                      <Link href="/forgotpassword" color="#5F5F5F">
                        {"Forgot your Password"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
                <Box display="grid" gap="10px" mt="20px">
                  <Button
                    variant="contained"
                    style={{
                      height: "45px",
                      backgroundColor: "white",
                      color: "black",
                    }}
                    type="submit"
                  >
                    {
                      <Typography
                        variant="button"
                        display="block"
                        gutterBottom
                        fontWeight="bold"
                      >
                        Log in{" "}
                      </Typography>
                    }
                  </Button>
                </Box>
                <Box display="grid" gap="10px" mt="20px">
                  <Divider light={true}>
                    <Typography
                      variant="body2"
                      display="block"
                      sx={{ color: "#5F5F5F" }}
                    >
                      or continue with
                    </Typography>{" "}
                  </Divider>
                </Box>
                <Box display="grid" gap="10px" mt="20px">
                  <Button
                    variant="contained"
                    style={{
                      height: "45px",
                      backgroundColor: "#3B5998",
                      color: "white",
                    }}
                  >
                    {
                      <Typography
                        variant="button"
                        display="block"
                        gutterBottom
                        fontWeight="bold"
                      >
                      <Link href="/google" color="#FFFFFF">
                      {"Facebook"}
                    </Link>
                      </Typography>
                    }
                  </Button>
                </Box>
                <Box display="grid" gap="10px" mt="20px">
                  <Button
                    variant="contained"
                    style={{
                      height: "45px",
                      backgroundColor: "#DB4437",
                      color: "white",
                    }}
                  >
                    {
                      <Typography
                        variant="button"
                        display="block"
                        gutterBottom
                        fontWeight="bold"
                      >
                      <Link href="/google" color="#FFFFFF">
                      {"Google"}
                    </Link>
                      </Typography>
                    }
                  </Button>
                </Box>
                <Box
                  display="grid"
                  gap="10px"
                  mt="70px"
                  mb="10px"
                  textAlign="center"
                >
                  <Typography variant="caption" display="block" color="#5F5F5F">
                    Don't have an account? &nbsp;
                    <Link href="/signup" color="#FFFFFF">
                      {"Sign up"}
                    </Link>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
