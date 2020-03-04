const mongoose = require("mongoose");

const user = mongoose.Schema({
  _id: new mongoose.Schema.Types.ObjectId(),
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true }
});

module.exports = mongoose.model("User", user);
