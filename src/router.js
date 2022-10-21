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
router.delete('/planes/:id', planeController.deletePlane);  //  DELETE самолёт по ID
router.put( '/planes/:id', planeController.updatePlane);    //  PUT самолёт

router.get("/tickets/", ticketController.getAllTickets)      // GET все билеты
router.get("/tickets/:id", ticketController.getBy)           // GET билет по ID
router.post('/tickets/', ticketController.createTicket)      // POST билет
router.put("/tickets/:id", ticketController.updateTicket)    // PUT билет
router.delete("/tickets/:id", ticketController.deleteTicket) // DELETE билет по ID

router.get("/flights/", flightController.getFlights)          // GET все рейсы
router.get("/flights/:id", flightController.getFlightById)    // GET рейс по ID
router.post('/flights/', flightController.createFlight)       // POST рейс
router.put("/flights/:id", flightController.updateFlight)     // PUT рейс по ID
router.delete("/flights/:id", flightController.deleteFlight)  // DELETE рейс по ID

module.exports = router;
