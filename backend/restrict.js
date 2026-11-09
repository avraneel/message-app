/** Middleware to make sure no other user can access the route */
export default function restrict(req, res, next) {
  if (req.user === undefined) {
    return res
      .status(401)
      .json({ message: "401 Unauthorized. You need a valid cookie" });
  } else if (Number(req.params.id) !== req.user.id) {
    return res.status(403).json({
      message: "403 forbidden. You are not allowed to access this info",
    });
  } else {
    next();
  }
}
