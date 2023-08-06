import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { database } from "@/firebase.tsx";
import { useAppContext } from "@/context/appContext";
import { axiosInstance } from "@/components/services/makeRequest";
const useCheckAuth = () => {
  const { setAuthDetails } = useAppContext();

  const auth = getAuth();
  useEffect(() => {
    if (!database) {
      // Firebase app is not initialized, do not proceed further
      return;
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("running");
        // console.log("use check auth is running", user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        user
          .getIdToken()
          .then(
            (token) =>
              (axiosInstance.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${token}`)
          );
        console.log("bearer set");
        setAuthDetails(user);
      } else {
        axiosInstance.defaults.headers.common["Authorization"] = null;
        setAuthDetails(null);
      }
    });
  }, [auth, setAuthDetails]);
};
export default useCheckAuth;
