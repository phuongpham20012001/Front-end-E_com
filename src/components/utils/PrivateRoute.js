import { Routes, Route, Navigate } from "react-router-dom";
import ImageUploader from "../Product/CreateProduct";
import UpdateAccount from "../Authentication/UpdateUser/UpdateAccount";
import UpdatePassword from "../Authentication/UpdateUser/UpdatePassword";
import Login from "../Authentication/Login/Login";
import Unauthorized from "./Unauthorized";
import ProductList from "../Product/ViewProduct";
import ViewOrder from "../Order/OrderAdmin";
import axios from "../API/axios";
import React, { useState, useEffect } from "react";

const PrivateRoutes = () => {
  const ROLE_URL = "/role";
  let token = localStorage.getItem("token");
  if (token) {
    token = token.replace(/"/g, "");

    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    // chỉnh lại cái private route ngăn admin và user.
    useEffect(() => {
      axios
        .get(ROLE_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setRole(res.data.role);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }, []);
    // wait to load
    if (loading) {
      return <div>Loading...</div>;
    }

    if (role === "admin") {
      return (
        <>
          <Routes>
            
            <Route path="/updatePassword" element={<UpdatePassword />} />
            <Route path="/updateAccount" element={<UpdateAccount />} />
            <Route path="/image" element={<ImageUploader />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/vieworder" element={<ViewOrder />} />
          </Routes>
        </>
      );
    }

    if (role === "user") {
      return (
        <>
          <Routes>
            <Route path="/image" element={<Unauthorized />} />
            <Route path="/updatePassword" element={<UpdatePassword />} />
            <Route path="/updateAccount" element={<UpdateAccount />} />
            <Route path="/product" element={<ProductList />} />
          </Routes>
        </>
      );
    }

    return <Navigate to="/login" element={<Login />} />;
  } else {
    return <Navigate to="/unauthorized" element={<Unauthorized />} />;
  }
}; 

export default PrivateRoutes;
