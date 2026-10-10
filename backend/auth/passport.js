import passport from "passport";
import LocalStrategy from "passport-local";
import prisma from "../prisma.js";
import bcrypt from "bcryptjs";

const strategy = new LocalStrategy(async function verify(
  username,
  password,
  done,
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    const check = await bcrypt.compare(password, user.password);
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    } else if (!check) {
      return done(null, false, { message: "Incorrect password" });
    } else {
      return done(null, user);
    }
  } catch (err) {
    done(err);
  }
});

passport.use(strategy);

//
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return done(null, user);
  } catch (err) {
    console.error(err);
    done(err);
  }
});

export default passport;
