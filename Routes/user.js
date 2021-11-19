const express = require("express");
const route = express.Router();
route.get("/", async (req, res) => {
  try {
    res.status(200).json({ msg: "user" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = route;