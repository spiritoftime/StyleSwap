import { useState } from "react";

import "./App.css";

import { Button } from "./components/ui/button";
import useCheckAuth from "./components/ProtectedRoute";
import { useAppContext } from "./context/appContext";
import { Route, Routes } from "react-router";
import Auth from "./components/Auth";
import PlayGround from "@/components/PlayGround";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import AppLayout from "./components/AppLayout";
import Profile from "./components/Profile";

function App() {
  const { authDetails } = useAppContext();
  console.log(authDetails);

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
