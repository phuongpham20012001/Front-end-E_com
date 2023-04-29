import NavBar from "./components/UI/NavBar/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/UI/Footer/Footer";
import Login from "./components/Authentication/Login/Login";
import React from "react";
import SignUp from "./components/Authentication/SignUp/SignUp";
import UpdatePassword from "./components/Authentication/UpdateUser/UpdatePassword";
import ForgotPassword from "./components/Authentication/Forgotpassword/Forgotpassword";
import SetNewPassword from "./components/Authentication/Forgotpassword/SetNewPassword";
import UpdateAccount from "./components/Authentication/UpdateUser/UpdateAccount";
import PrivateRoutes from "./components/utils/PrivateRoute";
import ImageUploader from "./components/Product/CreateProduct";
import ProductList from "./components/Product/ViewProduct";
import { ShopContextProvider } from "./components/Authentication/Context/ShopProvider";
import { Cart } from "./components/Product/Cart";
import Checkout from "./components/Product/Check_out";
import About from "./components/UI/About";
import ViewOrder from "./components/Order/OrderAdmin";

function App() {
  return (
    <>
      <NavBar />
      <ShopContextProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/image" element={<ImageUploader />} />
            <Route path="/updatePassword" element={<UpdatePassword />} />
            <Route path="/updateAccount" element={<UpdateAccount />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/vieworder" element={<ViewOrder />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/resetPassword/:token" element={<SetNewPassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </ShopContextProvider>
      <Footer />
    </>
  );
}

export default App;
