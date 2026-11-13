import { useEffect, useState } from "react";
import { Outlet, redirect } from "react-router";

/** This is a like pit stop basically, since outletcontext only works on immediate children */
export default function RequireAuth() {
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    async function loadId() {
      const response = await fetchId();
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const { userId } = await response.json();
      setUserId(userId);
    }

    loadId();
  }, []);

  const isAuthenticated = true;

  if (!isAuthenticated) {
    return redirect("login");
  }

  return <Outlet context={userId} />;
}
