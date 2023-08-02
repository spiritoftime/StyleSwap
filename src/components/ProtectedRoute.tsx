import { useAppContext } from "@/context/appContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authDetails } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (authDetails.uid) return children;
    navigate("/login");
  }, [authDetails.uid]);
};

export default ProtectedRoute;
