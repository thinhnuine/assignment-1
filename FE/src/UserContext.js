// UserContext.js
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateUser = async () => {
    try {
        console.log(1);
        const a = !!localStorage.getItem("user")
        console.log(a);
        const accessToken = JSON.parse(localStorage.getItem("user")).accessToken
        console.log(accessToken);
      const response = await axios.get("http://localhost:8000/user/get-current", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      console.log(response);
    //   const data = await response.json();
    console.log(response.data.rs);

      if (response.data.success) {
        setUser(response.data.rs);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token); // Chuyển đổi thành boolean để kiểm tra đăng nhập
    if (token) {
      updateUser();
    
    }
  }, []); // Gọi một lần khi component mount và logic đăng nhập thay đổi

  return (
    <UserContext.Provider value={{ setUser, isLoggedIn, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};