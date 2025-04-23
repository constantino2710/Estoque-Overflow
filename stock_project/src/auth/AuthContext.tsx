import { createContext, useEffect, useState } from "react";
import Parse from "@/api/parseClient";

type AuthContextType = {
  user: Parse.User | null;
  isLoading: boolean;
  refreshUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  refreshUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Parse.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = () => {
    const current = Parse.User.current();
    setUser(current || null);
  };

  useEffect(() => {
    refreshUser();
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
