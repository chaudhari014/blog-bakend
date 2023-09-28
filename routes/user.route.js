const express = require("express");
const { userRegister, userLogin } = require("../controller/user.controller");
const userRouteHandler = express.Router();

userRouteHandler.post("/register", userRegister);
userRouteHandler.post("/login", userLogin);

module.exports = { userRouteHandler };
