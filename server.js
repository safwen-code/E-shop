const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connnectDB = require("./config/connectDB");
const cors = require("cors");

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

connnectDB();
//bodyparser middelware
app.use(express.json({ extended: false }));
app.use(morgan("tiny"));

app.use("/", product);
app.use("/categories", categories)
app.use('/orders', orders)
app.use('/user', user)
//lunch server
app.listen(port, () => {
  console.log(`server is work in Port ${port}`);
});
