require ("reflect-metadata")
const express = require("express");
const router = express.Router();
const authMiddleware = require('./middleware/authMiddleware')
const ticketController = require("./controllers/TicketController");
const flightController = require('./controllers/FlightController')
const airlineController = require("./controllers/AirlineController");
const planeController = require("./controllers/PlaneController");
const userController = require("./controllers/UserController");
const authController = require("./controllers/AuthController");

router.get('/', async (req, res) => {
  res.json("home");
});

router.post('/login', authController.login)                 //  Авторизация
router.post('/registration', authController.registration)   //  Регистрация

router.get('/users', authMiddleware(["ADMIN", "CREW"]), userController.getUsers);             //  GET все юзеры
router.get('/users/:login', authMiddleware(["ADMIN", "CREW"]), userController.getUserByLogin) //  GET юзера по ID
router.put('/users/:login', authMiddleware(["ADMIN", "CREW", "PASSENGER"]), userController.updateUser)     //  PUT юзер
router.delete('/users/:login', authMiddleware(["ADMIN", "CREW", "PASSENGER"]), userController.deleteUser)  //  DELETE юзер

router.get('/airlines', authMiddleware(["ADMIN", "CREW"]), airlineController.getAirlines);         // GET все авиалинии
router.get('/airlines/:id', authMiddleware(["ADMIN", "CREW"]), airlineController.getAirlineById);  // GET авиалиния по ID
router.post('/airlines', authMiddleware(["ADMIN", "CREW"]), airlineController.createAirline);      // POST авиалиния
router.put('/airlines/:id', authMiddleware(["ADMIN", "CREW"]), airlineController.updateAirline)    // PUT авиалинию
router.delete('/airlines/:id', authMiddleware(["ADMIN", "CREW"]), airlineController.deleteAirline) // DELETE авиалинию по ID

router.get('/planes/', authMiddleware(["ADMIN", "CREW"]), planeController.getPlanes);          //  GET все самолёты
router.get('/planes/:id', authMiddleware(["ADMIN", "CREW"]), planeController.getPlaneById);    //  GET самолёт по ID
router.post('/planes/', authMiddleware(["ADMIN", "CREW"]), planeController.createPlane)        //  POST самолёт
router.delete('/planes/:id', authMiddleware(["ADMIN", "CREW"]), planeController.deletePlane);  //  DELETE самолёт по ID
router.put( '/planes/:id', authMiddleware(["ADMIN", "CREW"]), planeController.updatePlane);    //  PUT самолёт

router.get("/tickets/", authMiddleware(["ADMIN", "CREW", "PASSENGER"]), ticketController.getAllTickets)      // GET все билеты
router.get("/tickets/:id", authMiddleware(["ADMIN", "CREW", "PASSENGER"]), ticketController.getBy)           // GET билет по ID
router.post('/tickets/', authMiddleware(["ADMIN", "CREW", "PASSENGER"]), ticketController.createTicket)      // POST билет
router.put("/tickets/:id", authMiddleware(["ADMIN", "CREW"]), ticketController.updateTicket)                  // PUT билет +
router.delete("/tickets/:id", authMiddleware(["ADMIN", "CREW", "PASSENGER"]), ticketController.deleteTicket) // DELETE билет по ID

router.get("/flights/", flightController.getFlights)          // GET все рейсы
router.get("/flights/:id", flightController.getFlightById)    // GET рейс по ID
router.post('/flights/', authMiddleware(["ADMIN", "CREW"]), flightController.createFlight)       // POST рейс
router.put("/flights/:id", authMiddleware(["ADMIN", "CREW"]), flightController.updateFlight)     // PUT рейс по ID
router.delete("/flights/:id", authMiddleware(["ADMIN", "CREW"]), flightController.deleteFlight)  // DELETE рейс по ID

module.exports = router;
