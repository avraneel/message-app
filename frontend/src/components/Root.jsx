import { useState } from "react";
import { Outlet } from "react-router";

export default function Root() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return <Outlet context={[loggedInUser, setLoggedInUser]} />;
}
