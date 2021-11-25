const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = new schema({
  name: {
    type: String,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
});

module.exports = Categories = mongoose.model("Categories", categorySchema);
