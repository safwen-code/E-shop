const mongoose = require("mongoose");
const schema = mongoose.Schema;

const OrderItemSchema = new schema({
  quantity: {
    type: Number,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});

module.exports = OrderItem = mongoose.model("orderitem", OrderItemSchema);
