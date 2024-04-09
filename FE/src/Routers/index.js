import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login_Register/Login";
import Register from "../pages/Login_Register/Register";
import Profile from "../pages/Profile";
import Cart from "../pages/Home/Cart";
import Shop from "../pages/Home/Shop";
import Admin from "../pages/Home/Admin";
import Detail from "../pages/Home/Detail";
import SearchPage from "../pages/Home/SearchPage";
import CheckoutPage from "../pages/Checkout";

const Routers = () => {
  const isAuthenticated =
    !!localStorage.getItem("user") || !!localStorage.getItem("user/admin");
  console.log(isAuthenticated);

  return (
    <>
      <Routes>
        <Route
          path="/admin"
          element={
            isAuthenticated &&
              JSON.parse(localStorage.getItem("user/admin"))?.role === "admin" ? (
              <Admin />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated &&
              JSON.parse(localStorage.getItem("user/admin"))?.role === "admin" ? (
              <Navigate to="/admin" />
            ) : (
              <Login />
            )
          }
        />

        <Route path="/" element={<Home />} />
        {/* <Route path="/admin/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/checkout" index element={<CheckoutPage />} />
        {/* <Route path="/admin" element={<Admin />} />  */}
      </Routes>
    </>
  );
};

export default Routers;
