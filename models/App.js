const mongoose = require("../db/connection");

const Schema = mongoose.Schema;

const App = new Schema({
  label: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("product", ProductSchema);
