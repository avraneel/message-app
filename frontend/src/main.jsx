import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/reset.css";
import "./css/index.css";
import Home from "./components/Home.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Inbox from "./components/Inbox.jsx";
import Settings from "./components/Settings.jsx";
import ChangeUsername from "./components/ChangeUsername";
import ChangePassword from "./components/ChangePassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user",
    element: <Inbox contacts={["Aaron", "Beatrice", "Candace", "David"]} />,
  },
  { path: "Settings", element: <Settings /> },
  { path: "/user/change/username", element: <ChangeUsername /> },
  { path: "/user/change/password", element: <ChangePassword /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
