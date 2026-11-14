import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "./useAuth";

export default function RequireAuth() {
  const navigate = useNavigate();
  const [loggedInUser] = useAuth();

  useEffect(() => {
    if (loggedInUser.loggedInUserId <= 0) {
      navigate(`/`);
    }
  }, [loggedInUser, navigate]);

  if (loggedInUser.loggedInUserId > 0) {
    return <Outlet />;
  } else {
    return null;
  }
}
