const Planet = require("../models/planet");

exports.createPlanet = (req, res, next) => {
  const planet = new Planet({
    description: req.body.description,
    status: req.body.status
  });
  planet
    .save()
    .then(createdPlanet => {
      res.status(201).json({
        message: "Planet added successfully",
        planet: {
          id: createdPlanet._id,
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
    status: req.body.status
  });
  Planet.updateOne({ _id: req.params.id }, planet)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Couldn't update post" });
    });
};

exports.getPlanets = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Planet.find();
  let fetchedPlanets;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPlanets = documents;
      return Planet.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        planets: fetchedPlanets,
        maxPosts: count
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
  Planet.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Deleting posts failed!" });
    });
};
