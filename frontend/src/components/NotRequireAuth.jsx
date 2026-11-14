import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "./useAuth";

export default function NotRequireAuth() {
  const navigate = useNavigate();
  const context = useAuth();

  useEffect(() => {
    if (context.loggedInUserId > 0) {
      navigate(`/users/${context.loggedInUsername}`);
    }
  }, [context, navigate]);

  if (context.loggedInUserId <= 0) {
    return <Outlet />;
  } else {
    return null;
  }
}
