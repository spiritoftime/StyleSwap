import { useAppContext } from "@/context/appContext";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authDetails } = useAppContext();
  const navigate = useNavigate();
  if (authDetails.uid) return children;
  navigate("/login");
};

export default ProtectedRoute;
