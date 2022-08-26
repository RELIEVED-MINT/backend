const mongoose = require("../db/connection");
const Schema = mongoose.Schema;
const historySchema = require("./history");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  history: [historySchema],
});

module.exports = mongoose.model("User", UserSchema);
