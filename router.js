const express = require("express");
const router = express.Router();
const flightController = require('./controllers/FlightController')

router.get('/', (req, res) => {
  res.json("home get");
});

router.get("/flights", flightController.getFlights);
router.post("/flights", flightController.addFlight);

module.exports = router;
