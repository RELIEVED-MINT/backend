const express = require("express");
const router = express.Router();
const History = require("../models/History");

router.get("/", async (req, res, next) => {
  try {
    const data = await History.find({});
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const data = await History.create(req.body);
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
