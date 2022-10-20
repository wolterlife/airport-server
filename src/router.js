require ("reflect-metadata")
const express = require("express");
const router = express.Router();
const ticketController = require("./controllers/TicketController");
const flightController = require('./controllers/FlightController')
const airlineController = require("./controllers/AirlineController");
const planeController = require("./controllers/PlaneController");
const userController = require("./controllers/UserController");

router.get('/', async (req, res) => {
  res.json("home");
});

router.get('/users', userController.getUsers);             //  GET все юзеры
router.get('/users/:login', userController.getUserByLogin) //  GET юзера по ID
router.post('/users', userController.createUser)           //  POST юзера
router.put('/users/:login', userController.updateUser)     //  PUT юзер
router.delete('/users/:login', userController.deleteUser)  //  DELETE юзер

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

router.get("/tickets/", ticketController.getAllTickets)
router.get("/tickets/:id", ticketController.getBy)
router.post('/tickets/', ticketController.createTicket)
router.put("/tickets/:id", ticketController.updateTicket)
router.delete("/tickets/:id", ticketController.deleteTicket)

router.post('/flights/', flightController.createFlight)

module.exports = router;
