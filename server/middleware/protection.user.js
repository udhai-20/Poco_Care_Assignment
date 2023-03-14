const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
// for authorization
const protection = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    if (token) {
      const decode = jwt.verify(token, process.env.SECRATE);
      console.log(decode);
      const user = await UserModel.findById(decode?.id);
      console.log("user", user);
      req.user = user;
      next();
    } else {
      throw new Error("Not authroised user || login again");
    }
  } catch (err) {
    throw new Error("Not authroised user || login again");
  }
});
//for admin access
const isAdmin = (req, res, next) => {
  try {
    console.log("role", req.user);
    const { role } = req.user;
    if (role == "admin") {
      next();
    } else {
      throw new Error("Not AUthorised || admin only have access");
    }
  } catch (err) {
    throw new Error("Not AUthorised || admin only have access");
  }
};

module.exports = { protection, isAdmin };
