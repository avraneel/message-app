import { Navigate, Outlet } from "react-router";

/** This is a like pit stop basically, since outletcontext only works on immediate children */
export default function RequireAuth() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
