import { useContext, useState } from "react";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { convertToTitleCase } from "@/utils/convertText";
import { User as FirebaseUser } from "firebase/auth";
interface AppContextProps {
  children: JSX.Element;
}
const AppContext = React.createContext({});
const AppProvider: React.FC<AppContextProps> = ({ children }) => {
  const { toast } = useToast();
  const [authDetails, setAuthDetails] = useState<FirebaseUser | object>({});

  const showToaster = (
    title?: string | null | undefined,
    message?: string | null | undefined,
    variant?: string | null | undefined
  ) => {
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
