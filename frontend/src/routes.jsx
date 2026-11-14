import Root from "./components/Root.jsx";
import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Inbox from "./components/Inbox.jsx";
import Settings from "./components/Settings.jsx";
import ChangeUsername from "./components/ChangeUsername.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import DeleteAccount from "./components/DeleteAccount.jsx";
import Chat from "./components/Chat.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import NotRequireAuth from "./components/NotRequireAuth.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

export const routes = [
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      {
        path: "auth",
        Component: NotRequireAuth,
        children: [
          { path: "signup", Component: Signup },
          { path: "login", Component: Login },
        ],
      },
      {
        path: "users/:username",
        Component: RequireAuth,
        children: [
          { index: true, Component: Inbox },
          { path: "chat", Component: Chat },
          {
            path: "settings",
            children: [
              { index: true, Component: Settings },
              { path: "username", Component: ChangeUsername },
              { path: "password", Component: ChangePassword },
              { path: "delete", Component: DeleteAccount },
            ],
          },
        ],
      },
      { path: "*", Component: PageNotFound },
    ],
  },
];
