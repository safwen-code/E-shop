const express = require("express");
const Order = require("../Models/Order");
const OrderItem = require("../Models/OrderItem");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    res.status(200).json({ msg: "hi from orders" });
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
