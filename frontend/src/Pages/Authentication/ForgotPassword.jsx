// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Alert } from "@mui/material";
// import "../../Styles/styles.css";
// import apiRequest from "../../Services/apiService";

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [correctOtp, setCorrectOtp] = useState("");
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [alert, setAlert] = useState({ message: "", severity: "" });

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
    
//     const postData = {
//       "email": email
//     }
    
//     const response = await apiRequest("POST","/api/auth/sendOTP",postData,false);

//     if(response.data.status === "success"){
//       setCorrectOtp(response.data.otp);
//       setAlert({ message: `OTP sent to ${email}`, severity: "info" });
//       setOtpSent(true);
//       setStep(2);
//     }
//     else{
//       setAlert({ message: response.data.message, severity: "error" });
//     }
//   };

//   const handleResendOtp = async(e) => {
//     e.preventDefault();

//     const postData = {
//       "email": email
//     }
    
//     const response = await apiRequest("POST","/api/auth/sendOTP",postData,false);

//     if(response.data.status === "success"){
//       setCorrectOtp(response.data.otp);
//       setAlert({ message: `New OTP sent to ${email}`, severity: "info" });
//       setOtpSent(true);
//       setStep(2);
//     }
//     else{
//       setAlert({ message: response.data.message, severity: "error" });
//     }    
//   };

//   const handleVerifyOtp = (e) => {
//     e.preventDefault();

//     if (otp != correctOtp) {
//       setAlert({ message: "Invalid OTP. Try again.", severity: "error" });
//       return;
//     }
//     setAlert({ message: "OTP Verified!", severity: "success" });
//     setIsOtpVerified(true);
//   };

//   const handleUpdatePassword = async (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       setAlert({ message: "Passwords do not match!", severity: "error" });
//       return;
//     }

//     const postData = {
//       "email": email,
//       "newPassword": newPassword
//     }
    
//     const response = await apiRequest("POST","/api/auth/reset-password",postData,false);

//     if(response.data.status === "success"){
//       setAlert({ message: "Password updated successfully!", severity: "success" });
//       setTimeout(() => navigate("/login"), 1000);
//     }
//     else{
//       setAlert({ message: response.data.message, severity: "error" });
//     }
//   };

//   return (
//     <div className="wrapper">
//     <div className="container">
//       {alert.message && <Alert severity={alert.severity}>{alert.message}</Alert>}
//       {step === 1 && (
//         <div>
//           <h2>Forgot Password</h2>
//           <form onSubmit={handleSendOtp}>
//             <input type="email" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
//             <button type="submit">Send OTP</button>
//           </form>
//         </div>
//       )}
//       {step === 2 && (
//         <div>
//           <h2>Enter OTP</h2>
//           {otpSent && <p>OTP sent to: <strong>{email}</strong></p>}
//           <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//             <div style={{ display: "flex", alignItems: "center", position: "relative", width: "100%" }}>
//               <input
//                 type="text"
//                 placeholder="Enter 6-digit OTP"
//                 required
//                 maxLength="6"
//                 onChange={(e) => setOtp(e.target.value)}
//                 style={{
//                   padding: "10px",
//                   fontSize: "16px",
//                   width: "200px",
//                   border: "1px solid #ccc",
//                   borderRadius: "5px",
//                 }}
//               />
//               <button
//                 type="button"
//                 onClick={handleResendOtp}
//                 style={{
//                   marginLeft: "10px",
//                   padding: "6px 10px",
//                   fontSize: "14px",
//                   backgroundColor: "#007bff",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Resend OTP
//               </button>
//             </div>

//             <button
//               type="submit"
//               style={{
//                 marginTop: "10px",
//                 padding: "10px 20px",
//                 fontSize: "16px",
//                 backgroundColor: "#28a745",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               Verify OTP
//             </button>
//           </form>

//           {isOtpVerified && (
//             <form onSubmit={handleUpdatePassword}>
//             {/* New Password Input */}
//             <div className="password-container">
//               <input
//                 type={showNewPassword ? "text" : "password"}
//                 placeholder="New Password"
//                 required
//                 minLength="6"
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//               <span className="eye-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
//                 {showNewPassword ? "👁️" : "👁️‍🗨️"}
//               </span>
//             </div>
          
//             {/* Confirm Password Input */}
//             <div className="password-container">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm Password"
//                 required
//                 minLength="6"
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//               <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                 {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
//               </span>
//             </div>
          
//             <button type="submit">Update Password</button>
//           </form>
          
//           )}
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// export default ForgotPassword;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import "../../Styles/styles.css";
import apiRequest from "../../Services/apiService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [correctOtp, setCorrectOtp] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "" });

  const [isLoadingSendOtp, setIsLoadingSendOtp] = useState(false);
  const [isLoadingVerifyOtp, setIsLoadingVerifyOtp] = useState(false);
  const [isLoadingUpdatePassword, setIsLoadingUpdatePassword] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoadingSendOtp(true);

    const postData = { email };
    const response = await apiRequest("POST", "/api/auth/sendOTP", postData, false);

    setIsLoadingSendOtp(false);
    if (response.data.status === "success") {
      setCorrectOtp(response.data.otp);
      setAlert({ message: `OTP sent to ${email}`, severity: "info" });
      setOtpSent(true);
      setStep(2);
    } else {
      setAlert({ message: response.data.message, severity: "error" });
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoadingVerifyOtp(true);

    setTimeout(() => {
      setIsLoadingVerifyOtp(false);
      if (otp !== correctOtp) {
        setAlert({ message: "Invalid OTP. Try again.", severity: "error" });
      } else {
        setAlert({ message: "OTP Verified!", severity: "success" });
        setIsOtpVerified(true);
      }
    }, 1000); // Simulating API call delay
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAlert({ message: "Passwords do not match!", severity: "error" });
      return;
    }

    setIsLoadingUpdatePassword(true);
    const postData = { email, newPassword };
    const response = await apiRequest("POST", "/api/auth/reset-password", postData, false);

    setIsLoadingUpdatePassword(false);
    if (response.data.status === "success") {
      setAlert({ message: "Password updated successfully!", severity: "success" });
      setTimeout(() => navigate("/login"), 1000);
    } else {
      setAlert({ message: response.data.message, severity: "error" });
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        {alert.message && <Alert severity={alert.severity}>{alert.message}</Alert>}
        
        {step === 1 && (
          <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSendOtp}>
              <input type="email" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" disabled={isLoadingSendOtp}>
                {isLoadingSendOtp ? <CircularProgress size={19} color="inherit" /> : "Send OTP"}
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Enter OTP</h2>
            {otpSent && <p>OTP sent to: <strong>{email}</strong></p>}
            <form onSubmit={handleVerifyOtp}>
              <input type="text" placeholder="Enter 6-digit OTP" required maxLength="6" onChange={(e) => setOtp(e.target.value)} />
              <button type="submit" disabled={isLoadingVerifyOtp}>
                {isLoadingVerifyOtp ? <CircularProgress size={19} color="inherit" /> : "Verify OTP"}
              </button>
            </form>

            {isOtpVerified && (
              <form onSubmit={handleUpdatePassword}>
                <div className="password-container">
                  <input type={showNewPassword ? "text" : "password"} placeholder="New Password" required minLength="6" onChange={(e) => setNewPassword(e.target.value)} />
                  <span className="eye-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>

                <div className="password-container">
                  <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" required minLength="6" onChange={(e) => setConfirmPassword(e.target.value)} />
                  <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>

                <button type="submit" disabled={isLoadingUpdatePassword}>
                  {isLoadingUpdatePassword ? <CircularProgress size={19} color="inherit" /> : "Update Password"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
