/** Middleware to make sure user without signed cookie cannot access
 * this route.
 *
 * User is unauthorized if:
 * - no cookie is sent
 * - connect.sid cookie is not sent
 * - session id does not exist
 *  */
export function restrict(req, res, next) {
  if (!req.user) {
    return res.status(401).json("Your cookie is unauthorized.");
  }
  next();
}

/** Middleware to forbid the user with session cookie to modify
 * another user's data */
export function forbid(req, res, next) {
  if (Number(req.params.id) !== req.user.id) {
    return res.status(403).json("You are forbidden to perform this action");
  }
  next();
}
