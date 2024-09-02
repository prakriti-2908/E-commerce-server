const isAuthMiddleware = (req, res, next) => {
  try {
    if (!req.session || !req.session.user) {
      return res
        .status(401)
        .send({ message: "User not authenticated", ok: false });
    }
    // console.log(req.session);
    next();
  } catch (err) {
    console.error("Session error:", err);
    return res
      .status(500)
      .send({ message: "Internal server error", error: err });
  }
};

module.exports = isAuthMiddleware;
