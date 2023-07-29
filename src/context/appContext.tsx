import { useContext, useState, useRef, useEffect } from "react";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { convertToTitleCase } from "@/utils/convertText";

import { getAuth, onAuthStateChanged } from "firebase/auth";
type authDetails = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  emailVerified: boolean;
};
const AppContext = React.createContext({});
const AppProvider = ({ children }) => {
  const { toast } = useToast();
  const [authDetails, setAuthDetails] = useState<authDetails | object>({});

  const showToaster = (title?: string, message?: string, variant?: string) => {
    toast({
      variant: variant ?? "default",
      title: title && title.length > 0 ? convertToTitleCase(title) : null,
      description:
        message && message.length > 0 ? convertToTitleCase(message) : null,
    });
  };

  return (
    <AppContext.Provider value={{ showToaster, authDetails, setAuthDetails }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider };
