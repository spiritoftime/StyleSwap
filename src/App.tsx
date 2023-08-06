import "./App.css";

import { Route, Routes } from "react-router";
import Auth from "./components/Auth";
import PlayGround from "@/components/PlayGround";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import AppLayout from "./components/AppLayout";
import Profile from "./components/Profile";
import useCheckAuth from "./custom_hooks/useCheckAuth";
import PersonalPictures from "./components/PersonalPictures";
import BuyCredits from "./components/BuyCredits";
function App() {
  useCheckAuth();

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
        <Route
          path="/pictures"
          element={
            <ProtectedRoute>
              <PersonalPictures />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/credits"
          element={
            <ProtectedRoute>
              <BuyCredits />
            </ProtectedRoute>
          }
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
