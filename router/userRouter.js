const express = require("express");

const {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
} = require("../controller/userController.js");
const {
  protectRoute,
  signup,
  login,
  isAuthorised,
  forgetPassword,
  resetPassword,
  logout,
} = require("../controller/authController.js");
const userRouter = express.Router();

userRouter.route("/:id").patch(updateUser).delete(deleteUser);

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);

userRouter.route("/forgetpassword").post(forgetPassword);
userRouter.route("/resetpassword/:token").post(resetPassword);

userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

userRouter.use(isAuthorised(["admin"]));
userRouter.route("").get(getAllUser);

// userRouter.route("/").get(getsignupusers);
// userRouter.route("/getusers").get(protectRoute, getusers);
// userRouter.route("/getcookies").get(getCookies);
// userRouter.route("/setcookies").get(setCookies);

module.exports = userRouter;
