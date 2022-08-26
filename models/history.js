const mongoose = require("../db/connection");

const Schema = mongoose.Schema;

const historySchema = new Schema(
  {
    label: String,
    image: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("History", historySchema);
// module.exports = historySchema;
