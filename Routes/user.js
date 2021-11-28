const express = require("express");
const Users = require("../Models/Users");
const route = express.Router();
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const config = require("config");
const secret = config.get("secret");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
//get all user without passward
route.get("/", async (req, res) => {
  try {
    const users = await Users.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//get user by id
route.get("/:id", async (req, res) => {
  const userid = req.params.id;
  try {
    const user = await Users.findById(userid);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//add user
route.post("/", async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    isAdmin,
    street,
    apartment,
    city,
    zip,
    country,
  } = req.body;

  try {
    const user = new Users({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
      phone,
      isAdmin,
      street,
      apartment,
      city,
      zip,
      country,
    });
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//Login user
route.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "email is not valid" });
    }
    //compare passward
    //send token back
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
          isAdmin: user.isAdmin,
        },
        secret,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        user,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//get count of users
route.get("/get/count", async (req, res) => {
  try {
    const countProd = await Users.countDocuments();
    if (countProd) {
      return res.status(200).json(countProd);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
});
//delete user
route.delete("/:id", async (req, res) => {
  const idUser = req.params.id;
  try {
    const delUser = await Users.findByIdAndRemove(idUser);
    console.log(delUser);
    if (delUser) {
      return res.status(201).json({ msg: "deleted with success", delUser });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
module.exports = route;
