import { useEffect, useState } from "react";
import url from "../globals";
import { AuthContext } from "./useAuth";

export function AuthProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState({
    loggedInUserId: 0,
    loggedInUsername: "",
  });
  useEffect(() => {
    async function fetchId() {
      try {
        const response = await fetch(`${url}/id`, { credentials: "include" });
        if (!response.ok) {
          throw new Error(`Response status code: ${response.status}`);
        }
        const data = await response.json();
        setLoggedInUser({
          loggedInUserId: data.userId,
          loggedInUsername: data.username,
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchId();
  }, []);

  return (
    <AuthContext value={[loggedInUser, setLoggedInUser]}>
      {children}
    </AuthContext>
  );
}
