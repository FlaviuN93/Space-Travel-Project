const Planet = require("../models/planet");

exports.createPlanet = (req, res, next) => {
  const planet = new Planet({
    description: req.body.description,
    status: req.body.status,
    creator: req.userData.userId
  });
  planet
    .save()
    .then(createdPlanet => {
      res.status(201).json({
        message: "Planet added successfully",
        planet: {
          planetId: createdPlanet._id,
          description: createdPlanet.description,
          status: createdPlanet.status
        }
      });
    })
    .catch(error => {
      res.status(500).json({ message: "Creating a planet failed" });
    });
};

exports.updatePlanet = (req, res, next) => {
  const planet = new Planet({
    _id: req.body.id,
    description: req.body.description,
    status: req.body.status,
    creator: req.userData.userId
  });
  Planet.updateOne({ _id: req.params.id, creator: req.userData.userId }, planet)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Couldn't update post" });
    });
};

exports.getPlanets = (req, res, next) => {
  Planet.find()
    .then(documents => {
      res.status(200).json({
        message: "Planets fetched successfully!",
        planets: documents
      });
    })
    .catch(error => {
      res.status(500).json({ message: "Fetching posts failed!" });
    });
};

exports.getPlanet = (req, res, next) => {
  Planet.findById(req.params.id)
    .then(planet => {
      if (planet) {
        res.status(200).json(planet);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Fetching post failed!" });
    });
};

exports.deletePlanet = (req, res, next) => {
  Planet.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Deleting posts failed!" });
    });
};
