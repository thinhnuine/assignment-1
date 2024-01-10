import React from "react";
import { Route, Routes } from "react-router-dom";


const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};
export default Router;
