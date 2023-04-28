import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import ImageUploader from "../Product/CreateProduct";
import UpdateAccount from "../Authentication/UpdateUser/UpdateAccount";
import UpdatePassword from "../Authentication/UpdateUser/UpdatePassword";
import Login from "../Authentication/Login/Login";
import Unauthorized from "./Unauthorized";
import ProductList from "../Product/ViewProduct";

const PrivateRoutes = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log();
  if (user === "admin") {
    return (
      <>
      
        <Routes>
          <Route path="/updatePassword" element={<UpdatePassword />} />
          <Route path="/updateAccount" element={<UpdateAccount />} />
          <Route path="/image" element={<ImageUploader />} />
          <Route path="/product" element={<ProductList />} />
        </Routes>
      </>
    );
  }

  if (user === "user") {
    return (
      <>
        <Routes>
          <Route path="/image" element={<Unauthorized />} />
          <Route path="/updatePassword" element={<UpdatePassword />} />
          <Route path="/updateAccount" element={<UpdateAccount />} />
        </Routes>
      </>
    );
  }

  return <Navigate to="/login" element={<Login />} />;
};

export default PrivateRoutes;
