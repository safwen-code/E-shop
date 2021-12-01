const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connnectDB = require("./config/connectDB");
const cors = require("cors");
const authmidddel = require("./Midellwares/authmidddel");
const path = require("path");
//get routes
const product = require("./Routes/product");
const categories = require("./Routes/Categories");
const orders = require("./Routes/ordres");
const user = require("./Routes/user");

//initial the app
const app = express();
app.use(cors());
app.options("*", cors());

//create a port
const port = process.env.PORT || 3000;

//connect db
connnectDB();

//bodyparser middelware
app.use(express.json({ extended: false }));
app.use(morgan("tiny"));
app.use("/images", express.static(path.join(__dirname, "images")));
//use routes
app.use("/", product);
app.use("/categories", categories);
app.use("/orders", orders);
app.use("/user", user);

//lunch server
app.listen(port, () => {
  console.log(`server is work in Port ${port}`);
});
