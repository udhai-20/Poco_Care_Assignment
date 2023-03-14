const mongoose = require("mongoose");

let validateId = (id) => {
  let valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) {
    throw new Error("Invalid ID");
  }
};

module.exports = { validateId };
