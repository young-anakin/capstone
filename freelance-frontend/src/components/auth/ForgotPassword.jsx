import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [uidb64, setUidb64] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showResetForm, setShowResetForm] = useState(true);
  const navigate = useNavigate();

  const handleEmailSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/request-reset-email/', { email: values.email });
      const data = response.data;
      if (response.status === 200) {
        setMessage(data.success);
        setShowResetForm(false);
        
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
    setSubmitting(false);
  };

  const handlePasswordSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.patch('http://localhost:8000/api/password-reset-complete/', {...values});
      const data = response.data;
      if (response.status === 200) {
        setMessage(data.message);
        navigate('/login');
      } else {
        setMessage('Password reset failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            paddingTop: 8,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {showResetForm ? (
            <Formik
            initialValues={{ email: "", password: "", uidb64: "", token: "" }}
            onSubmit={handleEmailSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form>
                <Box display="grid" gap="10px">
                  <TextField
                    id="email"
                    variant="filled"
                    margin="normal"
                    fullWidth
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                    helperText={touched.email && errors.email}
                    InputProps={{ sx: { backgroundColor: "#2B2B2B", borderRadius: "8px" } }}
                    InputLabelProps={{ style: { color: "#585858" } }}
                  />
                </Box>
                <Box display="grid" gap="10px" mt="20px">
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      height: "45px",
                      backgroundColor: "white",
                      color: "black",
                    }}
                    disabled={isSubmitting}
                  >
                    <Typography
                      variant="button"
                      display="block"
                      gutterBottom
                      fontWeight="bold"
                    >
                      Submit
                    </Typography>
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          ) :(
            <Formik
              initialValues={{ password: "", uidb64: "", token: "" }}
              onSubmit={handlePasswordSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                  <Box display="grid" gap="10px">
                    <TextField
                      id="password"
                      variant="filled"
                      margin="normal"
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && errors.password}
                      helperText={touched.password && errors.password}
                      InputProps={{ sx: { backgroundColor: "#2B2B2B", borderRadius: "8px" } }}
                      InputLabelProps={{ style: { color: "#585858" } }}
                    />
                    <TextField
                      id="uidb64"
                      variant="filled"
                      margin="normal"
                      fullWidth
                      label="uidb64"
                      name="uidb64"
                      type="uidb64"
                      autoComplete="uidb64"
                      value={values.uidb64}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.uidb64 && errors.uidb64}
                      helperText={touched.uidb64 && errors.uidb64}
                      InputProps={{ sx: { backgroundColor: "#2B2B2B", borderRadius: "8px" } }}
                      InputLabelProps={{ style: { color: "#585858" } }}
                    />
                    <TextField
                      id="token"
                      variant="filled"
                      margin="normal"
                      fullWidth
                      label="Token"
                      name="token"
                      type="token"
                      autoComplete="token"
                      value={values.token}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.token && errors.token}
                      helperText={touched.token && errors.token}
                      InputProps={{ sx: { backgroundColor: "#2B2B2B", borderRadius: "8px" } }}
                      InputLabelProps={{ style: { color: "#585858" } }}
                    />
                    {/* <input type="hidden" name="uidb64" value={values.uidb64} />
                    <input type="hidden" name="token" value={values.token} /> */}
                  </Box>
                  <Box display="grid" gap="10px" mt="20px">
                    <Button
                      type="submit"
                      variant="contained"
                      style={{
                        height: "45px",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      disabled={isSubmitting}
                    >
                      <Typography
                        variant="button"
                        display="block"
                        gutterBottom
                        fontWeight="bold"
                      >
                        Submit
                      </Typography>
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default ForgotPassword;