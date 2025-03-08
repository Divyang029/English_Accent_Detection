import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import apiRequest from "../../Services/apiService";

const VerifyBox = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ message: "", severity: "" });
  const [isConfirmLoading, setIsConfirmLoading] = useState(false); // Loading state for Confirm button
  const [isCancelLoading, setIsCancelLoading] = useState(false); // Loading state for Cancel button
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      setVerificationCode(code);
      console.log("Verification Code:", code);
    }
  }, []);

  const handleConfirm = async (e) => {

        const response = await apiRequest("GET", `/api/auth/verify-user/${verificationCode}`, null, false);
    
        if (!response.success) {
          setAlert({ message: "Invalid User !!", severity: "error" });
          console.error(`Error (${response.status}):`, response.error || response.data.message);
          return;
        }
    
    
        if (response.data.status == "success") {
          localStorage.setItem("accessToken", response.data.token);
          setAlert({ message: "Verified successfully!", severity: "success" });
          setTimeout(() => navigate("/login"), 1000);
        }
        else {
          setAlert({ message: response.data.message, severity: "error" });
        }
  };

  const handleCancel = () => {
    setIsCancelLoading(true); // Only set Cancel button to loading
    setAlert({ message: "Verification process has been canceled! If this wasn't you, please contact support.", severity: "error" });
    setTimeout(() => {
      setIsCancelLoading(false);
      navigate("/signup");
    }, 2000);
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      height: "100vh", backgroundColor: "#121212", color: "#e0e0e0", fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        width: "450px", padding: "40px", textAlign: "center", background: "#1e1e1e", borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)", transition: "all 0.3s ease-in-out", display: "flex", flexDirection: "column",
        justifyContent: "space-between", gap: "20px"
      }}>
        <h2 style={{ fontSize: "26px", fontWeight: "600", marginBottom: "10px" }}>Account Verification</h2>
        <p style={{   fontSize: "18px",   color: "#e0e0e0",   lineHeight: "1.8",   textAlign: "left", 
                     margin: "0 0 20px 0",   padding: "15px",   backgroundColor: "#2a2a2a",   borderRadius: "8px", 
                    borderLeft: "4px solid #007aff",   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",   transition: "all 0.3s ease-in-out",
                  cursor: "default",   animation: "fadeIn 0.5s ease-in-out" 
              }}>
  We have found a registered account associated with your details. Please confirm your identity to proceed.
  <br /><br /> {/* Add spacing between paragraphs */}
  If this is not you, select <strong style={{ color: "#f44336" }}>Cancel</strong> to safeguard your account.
</p>
        {alert.message && (
          <Alert severity={alert.severity} style={{ marginBottom: "20px", borderRadius: "8px" }}>
            {alert.message}
          </Alert>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "15px" }}>
          <button
            onClick={handleConfirm}
            disabled={isConfirmLoading || isCancelLoading} // Disable if either button is loading
            style={{
              flex: "1", padding: "14px", background: "#007aff", color: "white", border: "none", borderRadius: "8px",
              cursor: "pointer", fontSize: "16px", fontWeight: "500", transition: "all 0.2s ease-in-out",
              opacity: isConfirmLoading || isCancelLoading ? 0.7 : 1, transform: isConfirmLoading || isCancelLoading ? "scale(0.98)" : "scale(1)"
            }}
          >
            {isConfirmLoading ? <CircularProgress size={20} style={{ color: "white" }} /> : "Yes, It's Me"}
          </button>
          <button
            onClick={handleCancel}
            disabled={isConfirmLoading || isCancelLoading} // Disable if either button is loading
            style={{
              flex: "1", padding: "14px", background: "#f44336", color: "white", border: "none", borderRadius: "8px",
              cursor: "pointer", fontSize: "16px", fontWeight: "500", transition: "all 0.2s ease-in-out",
              opacity: isConfirmLoading || isCancelLoading ? 0.7 : 1, transform: isConfirmLoading || isCancelLoading ? "scale(0.98)" : "scale(1)"
            }}
          >
            {isCancelLoading ? <CircularProgress size={20} style={{ color: "white" }} /> : "No, Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyBox;