/** Middleware to make sure user without signed cookie cannot access
 * this route */
export default function restrict(req, res, next) {
  const cookie = req.signedCookies["connect.sid"];
  if (!cookie) {
    return res.status(401).json("401 unauthorized.");
  }
  next();
}
