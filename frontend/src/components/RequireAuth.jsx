import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "./useAuth";

export default function RequireAuth() {
  const navigate = useNavigate();
  const [loggedInUser, , isLoading] = useAuth();
  useEffect(() => {
    if (loggedInUser.loggedInUserId <= 0 && !isLoading) {
      navigate(`/`);
    }
  }, [loggedInUser, navigate, isLoading]);

  if (loggedInUser.loggedInUserId > 0) {
    return <Outlet />;
  } else {
    return null;
  }
}
