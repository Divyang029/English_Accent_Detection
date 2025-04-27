// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from "@mui/material";
// import "../../Styles/styles.css";
// import apiRequest from "../../Services/apiService";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [alert, setAlert] = useState({ message: "", severity: "" });
//   const [openDialog, setOpenDialog] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const postData = {
//       "email": email,
//       "password": password
//     }

//     const response = await apiRequest("POST", "/api/auth/login", postData, false);

//     if (!response.success) {
//       setAlert({ message: "Invalid User !!", severity: "error" });
//       console.error(`Error (${response.status}):`, response.error || response.data.message);
//       return;
//     }


//     if (response.data.enabled === true) {
//       localStorage.setItem("accessToken", response.data.token);
//       setAlert({ message: "Login successful!", severity: "success" });
//       setTimeout(() => navigate("/dashboard"), 1000);
//     }
//     else {
//       setOpenDialog(true); // Open the verification dialog
//     }
//   };

//   const handleSendVerification = async () => {
//     const postData = {
//       "email": email
//     }

//     const response = await apiRequest("POST", "/api/auth/send_verificationMail", postData, false);

//     if (response.data.status === "success") {
//       setOpenDialog(false);
//       setAlert({ message: "Email sent successfully!", severity: "success" });
//     }
//     else {
//       setOpenDialog(false);
//       setAlert({ message: "Internal Service Error. Try again later !!", severity: "error" });
//     }
//   }

//   return (
//     <>
//       {/* Verification Dialog */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Account Not Verified</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Your account has not been verified yet. Would you like to resend the verification email?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)} color="error">Cancel</Button>
//           <Button onClick={handleSendVerification} color="primary">Resend Email</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Login Box */}
//       <div className="wrapper">
//         <div className="container">
//           <h2>Login</h2>
//           {alert.message && <Alert severity={alert.severity}>{alert.message}</Alert>}
//           <form onSubmit={handleSubmit}>
//             <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
//             <div className="password-container">
//               <input type={showPassword ? "text" : "password"} placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
//               <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? "👁️" : "👁️‍🗨️"}
//               </span>
//             </div>
//             <button type="submit">Login</button>
//           </form>
//           <p><Link to="/forgot-password">Forgot Password?</Link></p>
//           <p>Not have an account? <Link to="/signup">Register</Link></p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert, CircularProgress } from "@mui/material";
import "../../Styles/styles.css";
import apiRequest from "../../Services/apiService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = { email, password };
    const response = await apiRequest("POST", "/api/auth/login", postData, false);

    setLoading(false);

    if (!response.success) {
      setAlert({ message: "Invalid User !!", severity: "error" });
      console.error(`Error (${response.status}):`, response.error || response.data.message);
      return;
    }

    if (response.data.enabled === true) {
      localStorage.setItem("accessToken", response.data.token);
      setAlert({ message: "Login successful!", severity: "success" });
      setTimeout(() => navigate("/dashboard/home"), 1000);
    } else {
      setOpenDialog(true); // Open verification dialog
    }
  };

  const handleSendVerification = async () => {
    setLoading(true);
    const postData = { email };

    const response = await apiRequest("POST", "/api/auth/send_verificationMail", postData, false);
    
    setLoading(false);
    setOpenDialog(false);

    if (response.data.status === "success") {
      setAlert({ message: "Email sent successfully!", severity: "success" });
    } else {
      setAlert({ message: "Internal Service Error. Try again later !!", severity: "error" });
    }
  };

  return (
    <>
      {/* Verification Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Account Not Verified</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your account has not been verified yet. Would you like to resend the verification email?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="error">Cancel</Button>
          <Button onClick={handleSendVerification} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={19} color="inherit" /> : "Resend Email"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Login Box */}
      <div className="wrapper">
        <div className="container">
          <h2>Login</h2>
          {alert.message && <Alert severity={alert.severity}>{alert.message}</Alert>}
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
            <div className="password-container">
              <input type={showPassword ? "text" : "password"} placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? <CircularProgress size={19} color="inherit" /> : "Login"}
            </button>
          </form>
          <p><Link to="/forgot-password">Forgot Password?</Link></p>
          <p>Not have an account? <Link to="/signup">Register</Link></p>
        </div>
      </div>
    </>
  );
};

export default Login;


