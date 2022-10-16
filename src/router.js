require ("reflect-metadata")
const express = require("express");
const router = express.Router();
const flightController = require('./controllers/FlightController')
const airlineController = require("./controllers/AirlineController");

router.get('/', async (req, res) => {
  res.json("home");
});

router.get('/airlines', airlineController.getAirlines);
router.get('/airlines/:id', airlineController.getAirlineById);
router.post('/airlines', airlineController.createAirline);
router.put('/airlines/:id', airlineController.updateAirline)
router.delete('/airlines/:id', airlineController.deleteAirline)
router.get("/flights", flightController.getFlights);

module.exports = router;
