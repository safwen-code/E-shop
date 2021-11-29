const express = require("express");
const Order = require("../Models/Order");
const OrderItem = require("../Models/OrderItem");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name")
      .sort({ dateOrdred: -1 });
    console.log(orders);
    if (orders) {
      return res.status(200).json({ orders });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

route.get("/:id", async (req, res) => {
  const orderid = req.params.id;
  try {
    const order = await Order.findById(orderid)
      .populate("user", "name")
      .populate({
        path: "orderitems",
        populate: {
          path: "product",
          populate: "category",
        },
      });
    if (order) {
      return res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

route.post("/", async (req, res) => {
  const orderitemsId = Promise.all(
    req.body.orderitems.map(async (valueItem) => {
      let newOrderItem = new OrderItem({
        quantity: valueItem.quantity,
        product: valueItem.product,
      });
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  const orderItemresolved = await orderitemsId;
  try {
    const newOrder = new Order({
      orderitems: orderItemresolved,
      shoppingAdress: req.body.shoppingAdress,
      shoppingAdress1: req.body.shoppingAdress1,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: req.body.totalPrice,
      user: req.body.user,
    });

    await newOrder.save();

    res.status(200).json({ newOrder });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
module.exports = route;
