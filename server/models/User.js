const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  gender: String,
  zip: String,
  city: String,
  latitude: String,
  longitude: String,
  state: String,
  county: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
