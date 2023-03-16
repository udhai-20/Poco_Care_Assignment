import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../component/Login/Login";
import Signup from "../component/Signup/Signup";
import Home from "../component/Home/Home";

function MainRouter(props) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default MainRouter;
