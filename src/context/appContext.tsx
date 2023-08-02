import { useContext, useState } from "react";
import React from "react";

import { User as FirebaseUser } from "firebase/auth";
interface AppContextProps {
  children: JSX.Element;
}
export interface appContext {
  authDetails: FirebaseUser | object;
  setAuthDetails: React.Dispatch<React.SetStateAction<FirebaseUser | object>>;
}
const AppContext = React.createContext<appContext | object>({});
const AppProvider: React.FC<AppContextProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authDetails, setAuthDetails] = useState<FirebaseUser | object>({});

  return (
    <AppContext.Provider value={{ authDetails, setAuthDetails }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider };
