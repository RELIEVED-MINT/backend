const mongoose = require("../db/connection");

const Schema = mongoose.Schema;

const AppSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("app", AppSchema);
