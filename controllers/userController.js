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

/* router.post('/', (req, res, next) => {
  bcrypt 
  .hash(req.body.password, 10)
  .then(hash =>
      ({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
      }))
  .then(user => User.create(user))
  .then(user => res.status(201).json(user))
  .catch(next)
}) */

router.post("/", async (req, res, next) => {
  try {
    const data = await User.create(req.body);
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
