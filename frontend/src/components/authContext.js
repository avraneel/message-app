import { createContext, useContext } from "react";

const AuthContext = createContext({
  loggedInUserId: 0,
  loggedInUsername: "",
});

export function AuthProvider({ children }) {
  return <AuthContext>{children}</AuthContext>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
