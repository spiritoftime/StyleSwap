import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { database } from "@/firebase.tsx";
import { useAppContext } from "@/context/appContext";

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
        // console.log("user", user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setAuthDetails(user);
      } else {
        setAuthDetails({});
      }
    });
  }, [auth, setAuthDetails]);
};
export default useCheckAuth;
