const mongoose = require("mongoose");
const schema = mongoose.Schema;

const OrderSchema = new schema({
  orderitems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orderitem",
  },
  shoppingAdress: {
    type: String,
  },
  shoppingAdress1: {
    type: String,
  },
  city: {
    type: String,
    default: "",
  },
  zip: {
    type: String,
    default: "",
  },

  country: {
    type: String,
  },
  phone: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  dateOrdred: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
