const express = require("express");
const router = express.Router();
const flightController = require('./controllers/FlightsController')

router.get('/', (req, res) => {
  res.json("home get");
});

router.get("/flights", flightController.getFlight);
router.post("/flights", flightController.addFlight);

module.exports = router;
