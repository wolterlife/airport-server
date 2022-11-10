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

router.get('/users', authMiddleware(["admin", "crew"]), userController.getUsers);             //  GET все юзеры
router.get('/users/:login', authMiddleware(["admin", "crew"]), userController.getUserByLogin) //  GET юзера по ID
router.put('/users/:login', authMiddleware(["admin"]), userController.updateUser)     //  PUT юзер
router.delete('/users/:login', authMiddleware(["admin", "crew", "passenger"]), userController.deleteUser)  //  DELETE юзер

router.get('/airlines', authMiddleware(["admin", "crew"]), airlineController.getAirlines);         // GET все авиалинии
router.get('/airlines/:id', authMiddleware(["admin", "crew"]), airlineController.getAirlineById);  // GET авиалиния по ID
router.post('/airlines', authMiddleware(["admin", "crew"]), airlineController.createAirline);      // POST авиалиния
router.put('/airlines/:id', authMiddleware(["admin", "crew"]), airlineController.updateAirline)    // PUT авиалинию
router.delete('/airlines/:id', authMiddleware(["admin", "crew"]), airlineController.deleteAirline) // DELETE авиалинию по ID

router.get('/planes/', authMiddleware(["admin", "crew"]), planeController.getPlanes);          //  GET все самолёты
router.get('/planes/:id', authMiddleware(["admin", "crew"]), planeController.getPlaneById);    //  GET самолёт по ID
router.post('/planes/', authMiddleware(["admin", "crew"]), planeController.createPlane)        //  POST самолёт
router.delete('/planes/:id', authMiddleware(["admin", "crew"]), planeController.deletePlane);  //  DELETE самолёт по ID
router.put( '/planes/:id', authMiddleware(["admin", "crew"]), planeController.updatePlane);    //  PUT самолёт

router.get("/tickets/", authMiddleware(["admin", "crew", "passenger"]), ticketController.getAllTickets)      // GET все билеты
router.get("/tickets/:id", authMiddleware(["admin", "crew", "passenger"]), ticketController.getBy)           // GET билет по ID
router.post('/tickets/', authMiddleware(["admin", "crew", "passenger"]), ticketController.createTicket)      // POST билет
router.put("/tickets/:id", authMiddleware(["admin", "crew"]), ticketController.updateTicket)                  // PUT билет +
router.delete("/tickets/:id", authMiddleware(["admin", "crew", "passenger"]), ticketController.deleteTicket) // DELETE билет по ID

router.get("/flights/", flightController.getFlights)          // GET все рейсы
router.get("/flights/:id", flightController.getFlightById)    // GET рейс по ID
router.post('/flights/', authMiddleware(["admin", "crew"]), flightController.createFlight)       // POST рейс
router.put("/flights/:id", authMiddleware(["admin", "crew"]), flightController.updateFlight)     // PUT рейс по ID
router.delete("/flights/:id", authMiddleware(["admin", "crew"]), flightController.deleteFlight)  // DELETE рейс по ID

module.exports = router;
