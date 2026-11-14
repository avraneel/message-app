import { createContext, useContext } from "react";

export const AuthContext = createContext({
  loggedInUserId: 0,
  loggedInUsername: "",
});

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
