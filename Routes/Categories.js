const express = require("express");
const route = express.Router();
const Categories = require("../Models/Categories");

route.get("/", async (req, res) => {
  try {
    let categorieList = await Categories.find();
    if (!categorieList) {
      return res.status(400).json({ msg: "no categorie" });
    }
    res.status(200).json(categorieList);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

route.get("/:id", async (req, res) => {
  const idCat = req.params.id;
  try {
    let categorie = await Categories.findById(idCat);
    if (!categorie) {
      return res.status(400).json({ msg: "categorie is not found" });
    }
    return res.status(200).json(categorie);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

route.post("/", async (req, res) => {
  const { name, icon, color } = req.body;
  try {
    let categorie = new Categories({
      name,
      icon,
      color,
    });
    console.log(categorie);
    categorie = await categorie.save();
    if (!categorie) {
      return re.status(401).json({ msg: "the categorie cannot be created" });
    }
    res.status(201).json(categorie);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

route.delete("/:id", async (req, res) => {
  const idCat = req.params.id;
  try {
    let categorie = await Categories.findByIdAndRemove(idCat);
    console.log(" cat by id", categorie);
    if (categorie) {
      return res.status(201).json({ success: true, categorie });
    }
    res.status(400).json({ success: false, msg: "user id deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

route.put("/:id", async (req, res) => {
  const { name, icon, color } = req.body;

  const field = {};

  if (name) field.name = name;
  if (icon) field.icon = icon;
  if (color) field.color = color;
  const idCat = req.params.id;
  try {
    console.log(idCat);
    console.log(field);
    let categorie = await Categories.findByIdAndUpdate(
      idCat,
      { $set: field },
      { new: true }
    );
    res.status(200).json(categorie);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
module.exports = route;
