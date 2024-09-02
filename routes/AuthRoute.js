const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  logoutFromAllDevices,
  deleteAccountController,
  // isAuthenticatedController,
} = require("../controllers/AuthController");
const isAuthMiddleware = require("../middlewares/isAuthMiddleware");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");

const authRouter = express.Router();
 
authRouter
  .post("/register", registerController)
  .post("/login", loginController)
  .post("/logout", isAuthMiddleware, logoutController)
  .post("/logout-from-all-devices", isAuthMiddleware, logoutFromAllDevices)
  .post("/delete-account", isAuthMiddleware, deleteAccountController);
// .get('/isAuth',isAuthenticatedController);

authRouter.get("/user-auth", isAuthMiddleware, (req, res) => {
  return res.status(200).send({
    status: 200,
    ok: true,
  });
});

authRouter.get("/admin-auth", isAdminMiddleware, (req, res) => {
  return res.status(200).send({
    status: 200,
    ok: true,
  });
});

module.exports = authRouter;
