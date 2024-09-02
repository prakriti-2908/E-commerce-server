const isAdminMiddleware = async (req,res,next) => {
    try {
        console.log(req.session.user.isAdmin);
        if (!req.session || !req.session.user.isAdmin) {
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
}

module.exports = isAdminMiddleware;