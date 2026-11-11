import { Router } from "express";
import passport from "passport";
import { restrict } from "../restrict.js";

const authRoutes = Router();

authRoutes.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ user: req.user });
});

authRoutes.post("/logout", restrict, (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    } else {
      req.session.destroy((err) => {
        if (err) next(err);
        res.clearCookie("connect.sid");
        res.status(202).json({ message: "logged out" });
      });
    }
  });
});

authRoutes.get("/id", restrict, (req, res) => {
  return res.status(200).json({ userId: req.user.id });
});

export default authRoutes;
