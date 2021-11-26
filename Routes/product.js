const express = require("express");
const Categories = require("../Models/Categories");
const mongoose = require("mongoose");

const route = express.Router();
const Product = require("../Models/Product");
const authmidddel = require('../Midellwares/authmidddel')
//get all prod
route.get("/product",authmidddel, async (req, res) => {
  try {
    const allProduct = await Product.find()
      .select("name image images isFeatured")
      .populate("category");
    if (!allProduct) {
      res.status(401).json({ msg: "no product" });
    }
    res.status(200).json(allProduct);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//get prod by id
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

//add prod
route.post("/addproduct",authmidddel, async (req, res) => {
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

//update prod
route.put("/updateproduct/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    return res.status(500).json({ msg: "id is not the same" });
  }
  // check for the right categorie
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
  const Categorie = await Categories.findById(req.body.category);

  if (!Categorie) {
    return res.status(404).json({ msg: "categoriy" });
  }
  console.log(Categorie);
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
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
        },
      },
      { new: true }
    );
    console.log(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.error(error.message);
  }
});

//delelet prod
route.delete("/deleteprod/:id", async (req, res) => {
  // if (mongoose.isValidObjectId(req.params.id)) {
  //   return res.status(500).json({ msg: "id is not the same" });
  // }
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    console.log(product);
    res.status(200).json({
      msg: "success",
      product,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//get count of all prod
route.get("/get/count", async (req, res) => {
  try {
    const countProd = await Product.countDocuments();
    if (countProd) {
      return res.status(200).json(countProd);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
});

//get the all feather product
route.get("/get/feathured/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  try {
    const isFeaturedProd = await Product.find({ isFeatured: true }).limit(
      +count
    );
    if (isFeaturedProd) {
      res.status(200).json({ isFeaturedProd });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
});

//feltring and get prods with categories
// localhost://3000/prodbycategory?categories=id1 ,id2
route.get("/prodbycategory", async (req, res) => {
  let filtred = {};
  if (req.query.categories) {
    filtred = { category: req.query.categories.split(",") };
  }
  console.log(filtred);
  try {
    const product = await Product.find(filtred).populate("category");
    if (product) {
      res.status(200).json({ product });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
module.exports = route;
