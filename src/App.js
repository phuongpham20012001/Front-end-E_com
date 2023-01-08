import NavBar from "./components/NavBar/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Login from "./components/Authentication/Login/Login";
import React from "react";
import SignUp from "./components/Authentication/SignUp/SignUp";
import Home from "./components/Home";
import UpdatePassword from "./components/Authentication/UpdateInfor/UpdatePassword";
import ForgotPassword from "./components/Authentication/Forgotpassword/Forgotpassword";
import SetNewPassword from "./components/Authentication/Forgotpassword/SetNewPassword";
import UpdateAccount from "./components/Authentication/UpdateInfor/UpdateAccount";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/updateAccount" element={<UpdateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetPassword/:token" element={<SetNewPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/updatePassword" element={<UpdatePassword />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
