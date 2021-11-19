const express = require("express");

//create a port
const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("hi E shop");
});

//lunch server
app.listen(port, () => {
  console.log(`server is work in Port ${port}`);
});
