import NavBar from "./components/NavBar/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Login from "./components/Authentication/Login/Login";
import React from "react";
import SignUp from "./components/Authentication/SignUp/SignUp";
import Home from "./components/Home";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
