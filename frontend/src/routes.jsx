import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RequireAuth from "./components/RequireAuth";
import Settings from "./components/Settings";
import PageNotFound from "./components/PageNotFound";
import Inbox from "./components/Inbox";
import ChangeUsername from "./components/ChangeUsername";
import ChangePassword from "./components/ChangePassword";
import DeleteAccount from "./components/DeleteAccount";
import Root from "./components/Root";

export const routes = (
  <Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<Home />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="signup" element={<Signup />}></Route>
      <Route path="users/:username" element={<RequireAuth />}>
        <Route index element={<Inbox />}></Route>
        <Route path="settings">
          <Route index element={<Settings />}></Route>
          <Route path="username" element={<ChangeUsername />}></Route>
          <Route path="password" element={<ChangePassword />}></Route>
          <Route path="delete" element={<DeleteAccount />}></Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Route>
  </Routes>
);
