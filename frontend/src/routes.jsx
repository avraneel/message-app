import Home from "./components/Home.jsx";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Inbox from "./components/Inbox.jsx";
import Settings from "./components/Settings.jsx";
import ChangeUsername from "./components/ChangeUsername";
import ChangePassword from "./components/ChangePassword.jsx";
import DeleteAccount from "./components/DeleteAccount.jsx";
import Chat from "./components/Chat.jsx";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  {
    path: "/user",
    element: <Inbox contacts={["Aaron", "Beatrice", "Candace", "David"]} />,
  },
  { path: "/settings", element: <Settings /> },
  { path: "/chat", element: <Chat /> },
  { path: "/user/change/username", element: <ChangeUsername /> },
  { path: "/user/change/password", element: <ChangePassword /> },
  {
    path: "/user/delete-account",
    element: <DeleteAccount username="mockuser" />,
  },
];

export default routes;
