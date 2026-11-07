import { Router } from "express";
import passport from "passport";

const authRoutes = Router();

authRoutes.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ user: req.user });
});

authRoutes.post("/logout", (req, res, next) => {
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

export default authRoutes;
