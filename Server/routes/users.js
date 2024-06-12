const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ShoesMall");

const UserSchema = mongoose.Schema({
  username: String,
  age: Number,
  mobile: Number,
  email: String,
  password: String,
});

UserSchema.plugin(plm);

module.exports = mongoose.model("user", UserSchema);
