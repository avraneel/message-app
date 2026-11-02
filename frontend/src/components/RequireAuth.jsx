import { Navigate, Outlet } from "react-router";

export default function RequireAuth() {
  const isAuthenticated = true; // TODO

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
