const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan')

//initial the app
const app = express();

//create a port
const port = process.env.PORT || 3000;

//bodyparser middelware
app.use(express.json({ extended: false }));
app.use(morgan('tiny'))


app.get("/product", (req, res) => {
  const product = {
    nameprod: "I phone",
    price: 200,
    quantity: 5,
  };
  console.log(product);
  
  res.send(product)
  
});

app.post("/addproduct", (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  res.send(newProduct);
});

//lunch server
app.listen(port, () => {
  console.log(`server is work in Port ${port}`);
});
