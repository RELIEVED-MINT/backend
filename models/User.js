const mongoose = require("../db/connection");
// const historySchema = require('./history')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: "History",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
