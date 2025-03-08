import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Authentication/Login.jsx";
import ForgotPassword from "./Pages/Authentication/ForgotPassword.jsx";
import SignUp from "./Pages/Authentication/Signup.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import VerifyBox from "./Pages/Authentication/VerifyBox.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify" element={<VerifyBox/>}/>
        <Route path="/" element={<Dashboard/>} /> {/* Default route */}
      </Routes>
    </>
  )
}

export default App
