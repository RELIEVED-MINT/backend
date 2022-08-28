const mongoose = require("../db/connection");
const Schema = mongoose.Schema;
const historySchema = require("./History");

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    notes: String,
    history: [historySchema],
  },
  {
    timestamps: true,
    toJSON: {
      //Prevents password return to user.
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("User", UserSchema);
