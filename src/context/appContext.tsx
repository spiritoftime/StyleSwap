import { useContext, useState } from "react";
import React from "react";

import { User as FirebaseUser } from "firebase/auth";
interface AppContextProps {
  children: JSX.Element;
}
export interface appContext {
  authDetails: FirebaseUser | null;
  setAuthDetails: React.Dispatch<React.SetStateAction<FirebaseUser | null>>;
}
const AppContext = React.createContext<appContext | undefined>(undefined);
const AppProvider: React.FC<AppContextProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authDetails, setAuthDetails] = useState<FirebaseUser | null>(null);

  return (
    <AppContext.Provider value={{ authDetails, setAuthDetails }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
export { AppProvider };
