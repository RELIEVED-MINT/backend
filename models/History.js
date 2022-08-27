const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const historySchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    recycable: Boolean,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = historySchema;
