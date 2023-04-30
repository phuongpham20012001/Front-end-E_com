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
import { Cart } from "../Product/Cart";
import Checkout from "../Product/Check_out";
import Order from "../Order/Order";
import ProductListAdmin from "../Product/ViewProductAdmin";

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
            <Route path="/createproduct" element={<ImageUploader />} />
            <Route path="/product" element={<Unauthorized />} />
            <Route path="/vieworder" element={<ViewOrder />} />
            <Route path="/cart" element={<Unauthorized />} />
            <Route path="/checkout" element={<Unauthorized />} />
            <Route path="/viewadmin" element={<ProductListAdmin />} />
            <Route path="/order" element={<Unauthorized />} />
          </Routes>
        </>
      );
    }

    if (role === "user") {
      return (
        <>
          <Routes>
            <Route path="/viewadmin" element={<Unauthorized />} />
            <Route path="/createproduct" element={<Unauthorized />} />
            <Route path="/vieworder" element={<Unauthorized />} />
            <Route path="/updatePassword" element={<UpdatePassword />} />
            <Route path="/updateAccount" element={<UpdateAccount />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order" element={<Order />} />
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
