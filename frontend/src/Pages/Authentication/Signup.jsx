// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Alert } from "@mui/material";
// import "../../Styles/styles.css";
// import apiRequest from "../../Services/apiService";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [emailError, setEmailError] = useState("");
//   const [alert, setAlert] = useState({ message: "", severity: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const validateEmail = (email) => /^[a-z0-9]+[0-9]*@gmail\.com$/.test(email);
//   const validatePassword = (password) => password.length >= 6;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (name === "email") {
//       setEmailError(validateEmail(value) ? "" : "Invalid email format. Use example@gmail.com");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { firstName, lastName, email, password, confirmPassword } = formData;

//     if (!validateEmail(email)) {
//       setAlert({ message: "Invalid email format!", severity: "error" });
//       return;
//     }
//     if (!validatePassword(password)) {
//       setAlert({ message: "Password must be at least 6 characters!", severity: "warning" });
//       return;
//     }
//     if (password !== confirmPassword) {
//       setAlert({ message: "Passwords do not match!", severity: "error" });
//       return;
//     }

//     const postData = {
//       "firstName": firstName,
//       "lastName": lastName,
//       "email": email,
//       "password": password
//     }

//     const response = await apiRequest("POST", "/api/auth/signup", postData, false);

//     if (response.data.status === "success") {
//       setAlert({ message: "Sign-up successful!", severity: "success" });
//       setTimeout(() => navigate("/login"), 1000);
//     }
//     else {
//       setAlert({ message: response.data.message, severity: "error" });
//       if (response.data.message == "User already exists.")
//         setTimeout(() => navigate("/login"), 1000);
//     }
//   };

//   return (
//     <div className="wrapper">
//       <div className="container">
//         <h2>Sign Up</h2>
//         {alert.message && <Alert severity={alert.severity}>{alert.message}</Alert>}
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
//           <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
//           <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
//           {emailError && <p className="error">{emailError}</p>}

//           <div className="password-container">
//             <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" required onChange={handleChange} />
//             <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? "👁️" : "👁️‍🗨️"}
//             </span>
//           </div>

//           <div className="password-container">
//             <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
//             <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//               {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
//             </span>
//           </div>

//           <button type="submit">Sign Up</button>
//         </form>
//         <p>Already have an account? <Link to="/login">Login</Link></p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import "../../Styles/styles.css";
import apiRequest from "../../Services/apiService";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState("");
  const [alert, setAlert] = useState({ message: "", severity: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Spinner state

  const validateEmail = (email) => /^[a-z0-9]+[0-9]*@gmail\.com$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      setEmailError(validateEmail(value) ? "" : "Invalid email format. Use example@gmail.com");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!validateEmail(email)) {
      setAlert({ message: "Invalid email format!", severity: "error" });
      return;
    }
    if (!validatePassword(password)) {
      setAlert({ message: "Password must be at least 6 characters!", severity: "warning" });
      return;
    }
    if (password !== confirmPassword) {
      setAlert({ message: "Passwords do not match!", severity: "error" });
      return;
    }

    setLoading(true); // Start loading spinner

    const postData = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const response = await apiRequest("POST", "/api/auth/signup", postData, false);

      if (response.data.status === "success") {
        setAlert({ message: "Sign-up successful!", severity: "success" });
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setAlert({ message: response.data.message, severity: "error" });
        if (response.data.message === "User already exists.") {
          setTimeout(() => navigate("/login"), 1000);
        }
      }
    } catch (error) {
      setAlert({ message: "An error occurred. Please try again.", severity: "error" });
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h2>Sign Up</h2>
        {alert.message && <Alert severity={alert.severity}>{alert.message}</Alert>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          {emailError && <p className="error">{emailError}</p>}

          <div className="password-container">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" required onChange={handleChange} />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <div className="password-container">
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
            <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? <CircularProgress size={19} color="inherit" /> : "Sign Up"}
          </button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default SignUp;

