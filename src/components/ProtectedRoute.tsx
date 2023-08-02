import { useAppContext } from "@/context/appContext";

import Auth from "./Auth";
interface ProtectedRouteProps {
  children: JSX.Element;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authDetails } = useAppContext();

  return <>{authDetails.uid ? children : <Auth isSignUp={false} />}</>;
};

export default ProtectedRoute;
