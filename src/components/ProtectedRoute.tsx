import { useAppContext } from "@/context/appContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface ProtectedRouteProps {
  children: JSX.Element;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authDetails } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authDetails.uid) {
      navigate("/login");
    }
  }, [authDetails.uid, navigate]);

  return <>{authDetails.uid ? children : null}</>;
};

export default ProtectedRoute;
