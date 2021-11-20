const express = require("express");
const Categories = require("../Models/Categories");
const route = express.Router();
const Product = require("../Models/Product");

route.get("/product", async (req, res) => {
  try {
    const allProduct = await Product.find().select(
      "name image images"
    ).populate("category");
    if (!allProduct) {
      res.status(401).json({ msg: "no product" });
    }
    res.status(200).json(allProduct);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

route.get("/product/:id", async (req, res) => {
  const idProd = req.params.id;
  try {
    const product = await Product.findById(idProd).populate("category");
    if (!product) {
      res.status(401).json({ msg: "no product" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

route.post("/addproduct", async (req, res) => {
  const {
    name,
    description,
    richdescrption,
    image,
    images,
    brand,
    price,
    category,
    countinstocke,
    rating,
    isFeatured,
    numReviews,
    dateCreated,
  } = req.body;
  try {
    const product = new Product({
      name,
      description,
      richdescrption,
      image,
      images,
      brand,
      price,
      category,
      countinstocke,
      rating,
      isFeatured,
      numReviews,
      dateCreated,
    });
    await product.save();
    let categorieinproduct = await Categories.findById(product.category);
    console.log(categorieinproduct);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = route;
