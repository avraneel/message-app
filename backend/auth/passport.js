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
      /**
       * Now this will set req.user = user, and then req.login() will
       * be called and which will then called passport.serializeUser()
       */
      return done(null, user);
    }
  } catch (err) {
    done(err);
  }
});

passport.use(strategy);

// this will tell what is to be stored in session
passport.serializeUser((user, done) => {
  /**
   * After this, we have req.session.passport.user = user.id,
   * which will then store the session to our database and send the cookie to client
   */
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
