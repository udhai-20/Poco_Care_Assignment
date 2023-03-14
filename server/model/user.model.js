const mongoose = require("mongoose"); // Erase if already required
// Declare the Schema of the Mongo model
const bcrypt = require("bcrypt"); // Erase if already required
//crypto for rest password
const crypto = require("crypto"); // Erase if already required
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    lastname: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },

    refershToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  //
  { timestamps: true }
);
//encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //once password is modified it move to next`
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//passwrod matched
userSchema.methods.matchPassword = async function (enteredpassword) {
  console.log("pass", enteredpassword, this.password);
  return await bcrypt.compare(enteredpassword, this.password);
};
//create passwordupdate token using crypto
userSchema.methods.createPaswordResetToken = async function () {
  console.log("cheking");
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10minuts
  console.log("resetToken", resetToken);
  return resetToken;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
