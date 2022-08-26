const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res, next) => {
  try {
    const data = await User.find({});
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const data = await User.create(req.body);
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedData = await User.findByIdAndDelete(req.params.id);
    res.json(deletedData);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (data) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
