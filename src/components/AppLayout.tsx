import React, { useState, useEffect, useRef } from "react";

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Navbar from "./Navbar";

const AppLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen layout">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default AppLayout;
