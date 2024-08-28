// import React from "react";

// const Pay = ({fname, lname, email, amount, tx_ref, public_key}) => {
//     const form = document.createElement("form");
//     return (
//         <div>
//         <form method="POST" action="https://api.chapa.co/v1/hosted/pay" >
//             <input type="hidden" name="public_key" value={public_key} />
//             <input type="hidden" name="tx_ref" value={tx_ref} />
//             <input type="hidden" name="amount" value={amount} />
//             <input type="hidden" name="currency" value="ETB" />
//             <input type="hidden" name="email" value={email} />
//             <input type="hidden" name="first_name" value={fname} />
//             <input type="hidden" name="last_name" value={lname} />
//             <input type="hidden" name="title" value="Let us do this" />
//             <input type="hidden" name="description" value="Paying with Confidence with cha" />
//             <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
//             <input type="hidden" name="callback_url" value="http://localhost:8004/payment/initialize/" />
//             {/* <input type="hidden" name="return_url" value="https://example.com/returnurl" /> */}
//             <input type="hidden" name="return_url" value="http://localhost:3000/thanks" />
//             <input type="hidden" name="meta[title]" value="test" />
//             <button type="submit">Pay Now</button>
//         </form>
//         </div>

//   );
// };

// export default Pay;
import { useState, useEffect } from "react";
import { Box, Button, CircularProgress } from "@mui/material";

const Pay = ({ fname, lname, email, amount, tx_ref, public_key }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const getCsrfToken = async () => {
      const response = await fetch(
        "http://localhost:8004/payment/get-csrf-token/"
      );
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    };
    getCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const payload = {
      public_key,
      tx_ref,
      amount,
      currency: "ETB",
      email,
      first_name: fname,
      last_name: lname,
      callback_url: "http://localhost:8004/payment/callback/",
      return_url: "http://localhost:3000/thanks",
      title: "Let us do this",
      description: "Paying with Confidence with Chapa",
      logo: "https://chapa.link/asset/images/chapa_swirl.svg",
    };

    try {
      const response = await fetch(
        "http://localhost:8004/payment/initialize/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual secret key
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const redirect_url = data.redirect_url;

        // Redirect to the Chapa payment page
        window.location.href = redirect_url;
      } else {
        const errorData = await response.json();
        console.error(`Error: ${errorData.message}`);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during payment initialization.");
    } finally {
      setIsSubmitted(true);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullwidth
            disabled={isSubmitted}
            endIcon={
              isSubmitted ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
            sx={{
              marginBottom: 5,
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "10px",
              textTransform: "none",
              transition: "background-color 0.3s",
              backgroundColor: isSubmitted ? "grey" : "primary.main",
              "&:hover": {
                backgroundColor: isSubmitted ? "grey" : "primary.dark",
              },
            }}
          >
            {isSubmitted ? "Processing..." : "Proceed to Payment"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Pay;

// import { useEffect } from "react";

// const Pay = ({ fname, lname, email, amount, tx_ref, public_key }) => {
//   useEffect(() => {
//     // Create a form element
//     const form = document.createElement("form");
//     form.method = "POST";
//     form.action = "https://api.chapa.co/v1/hosted/pay";

//     // Create hidden inputs for each field
//     const inputs = [
//       { name: "public_key", value: public_key },
//       { name: "tx_ref", value: tx_ref },
//       { name: "amount", value: amount },
//       { name: "currency", value: "ETB" },
//       { name: "email", value: email },
//       { name: "first_name", value: fname },
//       { name: "last_name", value: lname },
//       { name: "title", value: "Let us do this" },
//       { name: "description", value: "Paying with Confidence with cha" },
//       { name: "logo", value: "https://chapa.link/asset/images/chapa_swirl.svg" },
//       { name: "callback_url", value: "http://localhost:8004/payment/initialize/" },
//       { name: "return_url", value: "http://localhost:3000/thanks" },
//       { name: "meta[title]", value: "test" },
//     ];

//     inputs.forEach((input) => {
//       const hiddenInput = document.createElement("input");
//       hiddenInput.type = "hidden";
//       hiddenInput.name = input.name;
//       hiddenInput.value = input.value;
//       form.appendChild(hiddenInput);
//     });

//     // Append the form to the DOM
//     document.body.appendChild(form);

//     // Submit the form
//     form.submit();
//   }, []);

//   return null;
// };
// export default Pay;
