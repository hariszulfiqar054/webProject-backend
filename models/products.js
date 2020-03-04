const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  _id: new mongoose.Schema.Types.ObjectId(),
  title: { type: String, required: true },
  description: { type: String, required: true },
  startingBid: { type: String, required: true },
  productImages: { type: String, required: true }
  //postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("Products", productsSchema);
