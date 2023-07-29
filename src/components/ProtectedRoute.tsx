import { useAppContext } from "@/context/appContext";
import { database } from "@/firebase.tsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { setAuthDetails } = useAppContext();
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!database) {
      // Firebase app is not initialized, do not proceed further
      return;
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setAuthDetails(user);
        return children;
      } else {
        setAuthDetails({});
        navigate("/login");
      }
    });
  }, []);
  return <>{auth.currentUser ? children : null}</>;
};

export default ProtectedRoute;
