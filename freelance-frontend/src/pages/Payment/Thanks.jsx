import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Topbar from "../../components/Layouts/Topbar";
import Footer from "../../components/Layouts/Footer";

const Thanks = () => {
  return (
    <div>
      <Topbar />
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          bgcolor: "#f0f4f8",
          padding: 3,
        }}
      >
        <Box
          component={motion.div}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          sx={{
            textAlign: "center",
            bgcolor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h2"
            component={motion.div}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            sx={{ mb: 2 }}
          >
            Thank You!
          </Typography>
          <Typography
            variant="body1"
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            sx={{ mb: 4 }}
          >
            You have successfully paid the freelancer. We appreciate your trust
            and business.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={motion.a}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
            href="/"
            sx={{ textTransform: "none" }}
          >
            Go to Homepage
          </Button>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Thanks;
