const clc = require("cli-color");
const { userDataValidation } = require("../utils/userDataValidation");
const {
  registerModel,
  loginModel,
  deleteAccountModel,
} = require("../models/AuthModel");
const sessionSchema = require("../schemas/sessionSchema");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { name, email, password, contactNumber, address, role, isAdmin } = req.body;

  // user Validation
  try {
    await userDataValidation({
      name,
      email,
      password,
      contactNumber,
      address,
      isAdmin,
    });
  } catch (error) {
    console.log(clc.redBright("User Data Validation Failed : ", error));
    return res.send({
      status: 500,
      message: "User Data Validation Failed",
      error: error,
    });
  }

  // store user in db
  try {
    const userDb = await registerModel({
      name,
      email,
      password,
      contactNumber,
      address,
      isAdmin,
    });
    return res.send({
      status: 201,
      message: "User Registered Successfully",
      userDb,
    });
  } catch (error) {
    console.log(clc.redBright("Error in storing Data in DB : ", error));
    return res.send({
      status: 500,
      message: "Error in storing Data in DB",
      error: error,
    });
  }
};

const loginController = async (req, res) => {
  const { email, password, isAdmin } = req.body;

  try {
    // Fetch the user from the database
    const userDb = await loginModel({ email, password });

    // Session-based authentication
    req.session.isAuth = true;
    req.session.user = {
      userId: userDb._id,
      name: userDb.name,
      email: userDb.email,
      isAdmin: userDb.isAdmin,
      address: userDb.address,
      contactNumber: userDb.contactNumber,
    };

    // Check if isAdmin is true in the request, and if so, set the session property
    if (isAdmin && userDb.isAdmin) {
      req.session.isAdmin = true;
    }

    // Save the session explicitly to ensure persistence
    req.session.save((err) => {
      if (err) {
        console.error("Failed to save session:", err);
        return res.send({
          status: 500,
          message: "Internal server error",
          error: err,
        });
      }

      // JWT-based authentication
      const jwtToken = JWT.sign(
        { userId: userDb._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "15d",
        }
      );

      res.cookie("JWT", jwtToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "None", 
        secure: true, 
        path: "/",
        httpOnly: true, 
      });

      return res.send({
        status: 200,
        message: "User Logged-in successfully",
        userDb,
        jwtToken,
      });
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.send({
      status: 500,
      message: "Internal server error",
      error,
    });
  }
};


const logoutController = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send({
        status: 500,
        message: "Internal server error",
        error: err,
      });
    } else {
      return res.send({
        status: 200,
        message: "Successfully logged out from this device",
      });
    }
  });
};

const logoutFromAllDevices = async (req, res) => {
  const userId = req.session.user.userId;
  try {
    const deletedSessions = await sessionSchema.deleteMany({
      "session.user.userId": userId,
    });
    return res.send({
      status: 200,
      message: `Successfully Logged out from ${deletedSessions.deletedCount} device(s)`,
      deletedSessions,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error,
    });
  }
};

const deleteAccountController = async (req, res) => {
  const userId = req.session.user.userId;
  try {
    const deletedUser = await deleteAccountModel({ userId });
    return res.send({
      status: 202,
      message: "User successfully deleted",
      deletedUser,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error,
    });
  }
};

// const isAuthenticatedController = async (req, res) => {
//   if (req.session.isAuth) {
//     return res.send({
//       message: "Authenticated",
//       status: 200,
//     });
//   } else {
//     return res.send({
//       message: "Not Authenticated",
//       status: 401,
//     });
//   }
// };

module.exports = {
  registerController,
  loginController,
  logoutController,
  logoutFromAllDevices,
  deleteAccountController,
  // isAuthenticatedController,
};
