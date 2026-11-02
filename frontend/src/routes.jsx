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
import PageNotFound from "./components/PageNotFound.jsx";

const routes = [
  {
    path: "/",
    children: [
      { index: true, Component: Home },
      { path: "signup", Component: Signup },
      { path: "login", Component: Login },
      {
        path: ":username",
        Component: RequireAuth,
        children: [
          {
            index: true,
            element: (
              <Inbox contacts={["Aaron", "Beatrice", "Candace", "David"]} />
            ),
          },
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
          { path: "*", Component: PageNotFound },
        ],
      },
    ],
  },
];

export default routes;
