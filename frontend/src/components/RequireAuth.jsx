import { useEffect, useState } from "react";
import { useNavigate, Outlet, useParams } from "react-router";
import { useAuth } from "./useAuth";
import url from "../globals";

export default function RequireAuth() {
  const navigate = useNavigate();
  const params = useParams();
  const [loggedInUser, , isLoading] = useAuth();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (loggedInUser.loggedInUserId <= 0 && !isLoading) {
      /** id = 0, and not loading, user is not logged in */
      navigate(`/`);
    } else if (loggedInUser.loggedInUserId > 0 && !isLoading) {
      /** id > 0, and not loading, user logged in, so fetching contacts */
      if (loggedInUser.loggedInUsername !== params.username) {
        /** if i am alice, if i go /users/bob, it will redirect me to /users/alice */
        navigate(`/users/${loggedInUser.loggedInUsername}`);
      }
      async function fetchContacts() {
        try {
          const response = await fetch(
            `${url}/users/${loggedInUser.loggedInUserId}/contacts`,
            { credentials: "include" },
          );
          if (!response.ok) {
            throw new Error(`fetch contacts status code: ${response.status}`);
          }
          const data = await response.json();
          setContacts(data);
        } catch (err) {
          console.error(err);
        }
      }
      fetchContacts();
    }
  }, [loggedInUser, navigate, isLoading, params]);
  if (loggedInUser.loggedInUserId > 0) {
    return <Outlet context={contacts} />;
  } else {
    return null;
  }
}
