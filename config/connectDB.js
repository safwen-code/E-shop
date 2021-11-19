const mongoose = require("mongoose");
const config = require("config");
const dbUri = config.get("mongoUri");

const connnectDB = async () => {
  try {
    const db = await mongoose.connect(dbUri);
    console.log("db is connect");
  } catch (error) {
    console.error(error.message);
    console.log("problem with mongoose");
  }
};

module.exports = connnectDB;
