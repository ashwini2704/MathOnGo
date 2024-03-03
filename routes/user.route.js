const express = require("express");
const { profileOfUser, loginSuccess, logoutSuccess } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/login/success", loginSuccess)
userRouter.get("/logout", logoutSuccess)

module.exports = userRouter;