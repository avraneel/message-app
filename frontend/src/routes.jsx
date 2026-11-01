import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Inbox from "./components/Inbox.jsx";
import Settings from "./components/Settings.jsx";
import ChangeUsername from "./components/ChangeUsername.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import DeleteAccount from "./components/DeleteAccount.jsx";
import Chat from "./components/Chat.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  {
    path: "/user",
    element: (
      <RequireAuth>
        <Inbox contacts={["Aaron", "Beatrice", "Candace", "David"]} />
      </RequireAuth>
    ),
  },
  {
    path: "settings",
    element: (
      <RequireAuth>
        <Settings />
      </RequireAuth>
    ),
  },
  {
    path: "change/username",
    element: (
      <RequireAuth>
        <ChangeUsername />
      </RequireAuth>
    ),
  },
  {
    path: "change/password",
    element: (
      <RequireAuth>
        <ChangePassword />
      </RequireAuth>
    ),
  },
  {
    path: "delete-account",
    element: (
      <RequireAuth>
        <DeleteAccount username="mockuser" />
      </RequireAuth>
    ),
  },
  {
    path: "chat",
    element: (
      <RequireAuth>
        <Chat />
      </RequireAuth>
    ),
  },
];

export default routes;
