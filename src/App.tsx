import { useEffect, useState } from "react";

import "./App.css";

import { useAppContext } from "./context/appContext";
import { Route, Routes } from "react-router";
import Auth from "./components/Auth";
import PlayGround from "@/components/PlayGround";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import AppLayout from "./components/AppLayout";
import Profile from "./components/Profile";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, lazyload } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { quality } from "@cloudinary/url-gen/actions/delivery";
function App() {
  const { authDetails } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" index element={<LandingPage />} />
        <Route path="/login" element={<Auth isSignUp={false} />} />
        <Route path="/register" element={<Auth isSignUp={true} />} />

        <Route
          path="/playground"
          element={
            <ProtectedRoute>
              <PlayGround />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
