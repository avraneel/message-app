import { Router } from "express";
import passport from "passport";

const authRoutes = Router();

authRoutes.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "logged in" });
});

authRoutes.post("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    } else {
      console.log(req.user);
      req.session.destroy((err) => {
        if (err) next(err);
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "logged out" });
      });
    }
  });
});

export default authRoutes;
