const { generateToken } = require("../utils/token");
const asyncHandler = require("express-async-handler");
const { validateId } = require("../utils/mongo_id_validation");
const { generateRefreshToken } = require("../utils/refershtoken");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();
// user_register
const user_register = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, email, password, mobile } = req.body;
    let user = await UserModel.find({ email });
    // console.log("user:", user);
    if (user.length > 0) {
      throw new Error("email already exists");
    } else {
      const newUser = new UserModel({
        firstname,
        lastname,
        email,
        password,
        mobile,
      });
      await newUser.save();
      res.send({
        message: "success",
        data: newUser,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
});
// userlogin_auth
const user_login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let user = await UserModel.findOne({ email });
  // console.log("  user.isBlocked:", user.isBlocked);
  console.log(" user:", user);
  if (user) {
    if (user.isBlocked == true) {
      throw new Error("Your account is blocked");
    } else {
      console.log(await user.matchPassword(password));
      if (user && (await user.matchPassword(password))) {
        const refershToken = await generateRefreshToken(user?._id);
        const update_user = await UserModel.findByIdAndUpdate(
          user?._id,
          {
            refershToken: refershToken,
          },
          { new: true }
        );
        res.cookie("refershToken", refershToken, {
          httpOnly: true,
          maxAge: 72 * 60 * 60 * 1000,
        });

        res.send({
          message: "success",
          data: user,
          token: generateToken(user._id),
        });
      } else {
        throw new Error("email or password wrong");
      }
    }
  } else {
    throw new Error("invalid credentials");
  }
});

//refersh-token`
const handle_Refresh_Token = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refershToken) throw new Error("refersh token in cookes");
  const refershToken = cookie.refershToken;
  const user = await UserModel.findOne({ refershToken });
  if (!user) throw new Error("refersh token not found");
  jwt.verify(refershToken, process.env.SECRATE, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("something went wrong in cookies token");
    }
    const accessToken = generateToken(user?._id);
    res.send({ access_token: accessToken });
  });
});
//logout and clear cookie
const handle_logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refershToken) throw new Error("refersh token in cookes");
  const refershToken = cookie.refershToken;
  const user = await UserModel.findOne({ refershToken });
  console.log("  user:", user);
  if (!user) {
    res.clearCookie("refershToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  } else {
    await UserModel.findOneAndUpdate(refershToken, {
      refershToken: "",
    });
    res.clearCookie("refershToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204);
  }
});

//user-blocked
const user_blocked = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateId(id);
    let user = await UserModel.findOne({ id });
    console.log("  user:", user);
    let block = await UserModel.findByIdAndUpdate(
      id,
      { isBlocked: true },
      {
        new: true,
      }
    );
    res.send({
      message: "user blocked successfully",
    });
  } catch (err) {
    throw new Error(err);
  }
});
//user un-blocked
const user_unblocked = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateId(id);

    let block = await UserModel.findByIdAndUpdate(
      id,
      { isBlocked: false },
      {
        new: true,
      }
    );
    let user = await UserModel.findOne({ id });
    res.send({
      message: "user unblocked successfully",
    });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  user_register,
  user_login,
  user_blocked,
  user_unblocked,
  handle_Refresh_Token,
  handle_logout,
};
