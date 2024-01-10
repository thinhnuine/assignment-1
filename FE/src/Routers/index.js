import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login_Register/Login";
import Register from "../pages/Login_Register/Register";
import Profile from "../pages/Profile";
import Card from "../pages/Home/Card";
import Shop from "../pages/Home/Shop";
import Admin from "../pages/Home/Admin";
import Detail from "../pages/Home/Detail";

const Routers = () => {
  const isAuthenticated = !!localStorage.getItem("user");
  console.log(isAuthenticated);
  

  return (
    <>
      <Routes>
      
        <Route path="/admin"
          element={isAuthenticated &&
            JSON.parse(localStorage.getItem("user/admin"))?.role === "admin" ? 
            <Admin /> : <Navigate to="/login" />}
        />
        <Route path="/login"
          element={isAuthenticated &&
            JSON.parse(localStorage.getItem("user/admin"))?.role === "admin" ?
             <Navigate to="/admin" /> : <Login />}
        />

        <Route path="/" element={<Home />} />
        {/* <Route path="/admin/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/card" element={<Card />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/detail/:id" element={<Detail />} />
        {/* <Route path="/admin" element={<Admin />} />  */}
      </Routes>
    </>
  );
};

export default Routers;
