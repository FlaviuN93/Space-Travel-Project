const Planet = require("../models/planet");
const express = require("express");

const router = express.Router();

router.post("/planets", (req, res, next) => {
  const planet = new Planet({
    description: req.body.description,
    status: req.body.status
  });
  planet.save().then(createdPost => {
    res
      .status(201)
      .json({ message: "Post added succesfully", planetId: createdPost._id });
  });
});

router.patch("/planets/:id", (req, res, next) => {
  const planetStatus = new Planet({
    _id: req.body.id,
    description: req.body.description,
    status: req.body.status
  });
  Planet.updateOne({ _id: req.params.id }, planetStatus).then(result => {
    res.status(200).json({ message: "Update successful" });
  });
});

router.get("/planets", (req, res, next) => {
  Planet.find().then(documents => {
    res.status(200).json({
      message: "Planets fetched succesfully",
      planets: documents
    });
  });
});

router.get("planets/:id", (req, res, next) => {
  Planet.findById(req.params.id).then(planet => {
    if (planet) {
      res.status(200).json(planet);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
});

router.delete("/planets/:id", (req, res, next) => {
  Planet.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Code deleted" });
  });
});
module.exports = router;
