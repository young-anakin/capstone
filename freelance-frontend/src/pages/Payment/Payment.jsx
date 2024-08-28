import React, { useState } from "react";
import Topbar from "../../components/Layouts/Topbar";
import Pay from "./Pay";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import {
  highlightedTitleProps,
  largeTypographyProps,
  mediumTypographyProps,
  smallTypographyProps,
} from "../../Constants";
import Footer from "../../components/Layouts/Footer";
import { useEffect } from "react";
import { TextField, Container, Paper } from "@mui/material";

// const Payment = () => {
//   const [fname, setFname] = useState('');
//   const [lname, setLname] = useState('');
//   const [email, setEmail] = useState('');
//   const [amount, setAmount] = useState(50);
//   const [message, setMessage] = useState('');
//   const tx_ref = `${fname}-${amount}-tx-13122022`;

//   const handlePayment = async () => {
//     const public_key = "CHAPUBK_TEST-5GtlNm51HozWFSZQYPGoAIsuaiZhs15i";
//     const payload = {
//       public_key,
//       tx_ref,
//       amount,
//       currency: "ETB",
//       email,
//       first_name: fname,
//       last_name: lname,
//       title: "Let us do this",
//       description: "Paying with Confidence with cha",
//       logo: "https://chapa.link/asset/images/chapa_swirl.svg",
//       callback_url: "http://localhost:8004/payment/callback/",
//       return_url: "http://localhost:3000/thanks",
//       meta: { title: "test" }
//     };

//     try {
//       const response = await fetch('http://localhost:8004/payment/initialize/', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer CHASECK_TEST-32Cwztibxuk2GEm8lU6cQxWaitxmv9T4`,  // Replace with your actual secret key
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const redirect_url = data.data.checkout_url;  // Extract the checkout URL from the response
//         window.location.href = redirect_url;  // Redirect to the Chapa payment page
//       } else {
//         const errorData = await response.json();
//         setMessage(`Error: ${errorData.message}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage('An error occurred during payment initialization.');
//     }
//   };

//   const getCookie = (name) => {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//       const cookies = document.cookie.split(';');
//       for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.substring(0, name.length + 1) === (name + '=')) {
//           cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//           break;
//         }
//       }
//     }
//     return cookieValue;
//   };

//   return (
//     <div>
//       <Topbar />
//       <br />
//       <div className="bg-green-200 h-screen flex justify-center items-center relative">
//         <div className="p-4 bg-white rounded shadow">
//           <center>
//             <label htmlFor="input"> First name</label>
//             <input placeholder="john" onChange={(e) => setFname(e.target.value)} type="text" /><br />
//             <label htmlFor="input"> Last name</label>
//             <input placeholder="doe" onChange={(e) => setLname(e.target.value)} type="text" /><br />
//             <label htmlFor="input"> Email </label>
//             <input placeholder="johndoe@example.com" onChange={(e) => setEmail(e.target.value)} type="email" /><br />
//             <label htmlFor="input"> Amount </label>
//             <input placeholder="500" onChange={(e) => setAmount(e.target.value)} type="number" /><br />
//             <button onClick={handlePayment}>Proceed to Payment</button><br /><br />
//             {message && <p>{message}</p>}
//           </center>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Payment;

const Payment = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(50);

  const generateTxRef = () => {
    const timestamp = new Date().getTime();
    return `${fname}-${lname}-${timestamp}`;
  };

  const tx_ref = generateTxRef();
  const public_key = "CHAPUBK_TEST-5GtlNm51HozWFSZQYPGoAIsuaiZhs15i";
  return (
    <div>
      <Topbar />
      <br />
      <div className="bg-green-200 h-screen flex justify-center items-center relative">
        <div className="p-4 bg-white rounded shadow">
          <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem" }}>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { marginBottom: "1.5rem" },
                }}
                noValidate
                autoComplete="off"
              >
                <Typography variant="h4" gutterBottom>
                  User Information
                </Typography>
                <TextField
                  fullWidth
                  label="First Name"
                  placeholder="John"
                  variant="outlined"
                  onChange={(e) => {
                    setFname(e.target.value);
                    console.log(e.target.value);
                  }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  placeholder="Doe"
                  variant="outlined"
                  onChange={(e) => {
                    setLname(e.target.value);
                    console.log(e.target.value);
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  placeholder="johndoe@example.com"
                  variant="outlined"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    console.log(e.target.value);
                  }}
                />
                <TextField
                  fullWidth
                  label="Amount"
                  placeholder="500"
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    setAmount(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </Box>
            </Paper>
            <Box sx={{ width: "100%", mt: 2 }}>
              <Pay
                fname={fname}
                lname={lname}
                email={email}
                amount={amount}
                tx_ref={tx_ref}
                public_key={public_key}
              />
            </Box>
          </Container>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
