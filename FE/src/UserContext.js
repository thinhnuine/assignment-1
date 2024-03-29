// UserContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { createApiUser } from "./services/user-service";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateUser = async () => {
    try {
      const a = !!localStorage.getItem("user");
      console.log(a);
      const response = await createApiUser().get(
        "http://localhost:8000/user/get-current"
      );
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
    <UserContext.Provider value={{ setUser, isLoggedIn, updateUser, user }}>
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
