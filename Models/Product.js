const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  richdescrption: {
    type: String,
    default: "",
  },
  image: { type: String, default: "" },
  images: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
  },
  price: {
    type: Number,
    default: "0",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  countinstocke: {
    type: Number,
    min: 0,
    max: 250,
  },
  rating: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Product = mongoose.model("product", productSchema);
