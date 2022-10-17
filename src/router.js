require ("reflect-metadata")
const express = require("express");
const router = express.Router();
const flightController = require('./controllers/FlightController')
const airlineController = require("./controllers/AirlineController");
const planeController = require("./controllers/PlaneController");

router.get('/', async (req, res) => {
  res.json("home");
});

router.get('/airlines', airlineController.getAirlines);         // GET все авиалинии
router.get('/airlines/:id', airlineController.getAirlineById);  // GET авиалиния по ID
router.post('/airlines', airlineController.createAirline);      // POST авиалиния
router.put('/airlines/:id', airlineController.updateAirline)    // PUT авиалинию
router.delete('/airlines/:id', airlineController.deleteAirline) // DELETE авиалинию по ID

router.get('/planes/', planeController.getPlanes);          //  GET все самолёты
router.get('/planes/:id', planeController.getPlaneById);    //  GET самолёт по ID
router.post('/planes/', planeController.createPlane)        //  POST самолёт
router.delete('/planes/:id', planeController.deletePlane);  //  DELETE самолёёт по ID
router.put( '/planes/:id', planeController.updatePlane);    //  PUT самолёт


module.exports = router;
