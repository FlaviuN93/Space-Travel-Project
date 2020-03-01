const express = require("express");

const checkAuth = require("../middleware/check-auth");

const PlanetController = require("../controllers/planet");

const router = express.Router();

router.post("", checkAuth, PlanetController.createPlanet);

router.put("/:id", checkAuth, PlanetController.updatePlanet);

router.get("", PlanetController.getPlanets);

router.get("/:id", PlanetController.getPlanet);

router.delete("/:id", checkAuth, PlanetController.deletePlanet);

module.exports = router;
