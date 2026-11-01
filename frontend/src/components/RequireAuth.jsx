import { Navigate } from "react-router";

export default function RequireAuth({ children }) {
  const isAuthenticated = false; // TODO

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
