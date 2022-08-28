const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { requireToken } = require("../middleware/auth");

router.get("/", async (req, res, next) => {
  try {
    const data = await User.find({});
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", requireToken, async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// /users/signup
router.post("/signup", async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password,
    });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

const { createUserToken } = require("../middleware/auth");
// /users/signin
router.post("/signin", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const token = createUserToken(req, user);
  res.json({ token, id: user.id });
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
