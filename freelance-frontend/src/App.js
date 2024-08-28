import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./components/auth/Login";
import "./App.css";
import { CssBaseline } from "@mui/material";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import GoogleSignUp from "./components/auth/GoogleSignup";
import FacebookSignup from "./components/auth/FacebookSignup";
import ClientList from "./pages/Employer/Client/ClientList";
import JobList from "./pages/Employee/Job/JobList";
import JobDetail from "./pages/Employee/Job/JobDetail";
import ClientDetail from "./pages/Employer/Client/ClientDetail";
import SinglePost from "./pages/Employer/PostJob/SinglePost";
import PostedJob from "./pages/Employer/Job/PostedJob";
import PostedJobEmployee from "./pages/Employee/Job/PostedJob";
// import Index from "./pages/HomePage/Index";
import Index from "./pages/HomePage/Index";
import Dashboard from "./pages/Employee/Dashboard/Dashboard";
import DashboardEmployer from "./pages/Employer/Dashboard/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashborad";
import Payment from "./pages/Payment/Payment";
import Thanks from "./pages/Payment/Thanks";
import { gapi } from "gapi-script";
import Apply from "./pages/Employee/Job/Apply";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route
          path="/login"
          element={
            <div className="login-container">
              <Login />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="login-container">
              <Signup />
            </div>
          }
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/google" element={<GoogleSignUp />} />
        <Route path="/facebook" element={<FacebookSignup />} />
        <Route path="/employer/client-list" element={<ClientList />} />
        <Route path="/employee/job-list" element={<JobList />} />
        <Route path="/employee/job-detail/:jobId" element={<JobDetail />} />
        <Route path="/employer/client-detail/:freelancerId/:userId" element={<ClientDetail />} />
        <Route path="/employer/job-post" element={<SinglePost />} />
        <Route path="/employer/job-posted/:taskId" element={<PostedJob />} />
        <Route path="/employee/job-posted/:jobId" element={<PostedJobEmployee />} />
        <Route path="/employee/dashboard" element={<Dashboard />} />
        <Route path="/employer/dashboard" element={<DashboardEmployer />} />
        <Route path="/employee/job-detail/apply/:jobId" element={<Apply />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/payment" element={<Payment />} />

        <Route path="/" element={<Index />} />
        {/* Default route */}
        <Route path="/*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
