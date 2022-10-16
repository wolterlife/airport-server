require ("reflect-metadata")
const express = require("express");
const router = express.Router();
const flightController = require('./controllers/FlightController')
const {Flight} = require("./models/Flight");
const {AppDataSource} = require("../db");

router.get('/', async (req, res) => {
  // const flightRepos = AppDataSource.getRepository(Flight);
  // const flight = new Flight()
  // flight.airline = "someAir";
  // flight.flightNum = "SD001";
  // await flightRepos.manager.save(flight);
  res.json("home");
});

router.get("/flights", flightController.getFlights);
// router.post("/flights", flightController.addFlight);

module.exports = router;
