import { Navigate } from "react-router";

export default function RequireAuth({ children }) {
  const isAuthenticated = true; // TODO

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
