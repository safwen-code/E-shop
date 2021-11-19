const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  name: String,
  image: String,
  CountInStock: Number,
});

module.exports = Product = mongoose.model("product", productSchema);
