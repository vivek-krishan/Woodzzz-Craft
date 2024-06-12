const mongoose = require("mongoose")

const CartSchema = mongoose.Schema({
  userId: String,
  items: [],
});

module.exports = mongoose.model("Cart", CartSchema);