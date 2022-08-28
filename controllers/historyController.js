const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { requireToken } = require("../middleware/auth");
//create
router.post("/", requireToken, (req, res, next) => {
  const historyData = req.body;
  const userId = historyData.owner;
  User.findById(userId)
    .then((user) => {
      user.history.push(historyData);
      return user.save();
    })
    .then((user) => res.status(201).json({ user: user }))
    .catch(next);
});

//destroy
// delete /history/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  User.findOne({ "reviews._id": id })
    .then((user) => {
      user.history.id(id).remove();
      return user.save();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
