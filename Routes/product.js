const express = require("express");
const route = express.Router();
const Product = require("../Models/Product");

route.get("/product", async (req, res) => {
  try {
     const allProduct = await Product.find()
     if(!allProduct){
         res.status(401).json({msg:'no product'})
     }
     res.status(200).json(allProduct)
  } catch (error) {
      res.status(500).json({msg:error.message})
  }
});

route.post("/addproduct", async (req, res) => {
  try {
    const { name, image, CountInStock } = req.body;
    const product = new Product({
      name,
      image,
      CountInStock,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = route;
