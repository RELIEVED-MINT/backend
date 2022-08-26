const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", (req, res, next) => {
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

module.exports = router;
