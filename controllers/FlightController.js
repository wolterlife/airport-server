const Flight = require("../models/flight");

exports.addFlight = function (req, res) {
  const flightNum = req.body.flightNum;
  const airline = req.body.airline; /// connect
  const airDepart = req.body.airDepart;
  const airDest = req.body.airDest;
  const dateDest = req.body.dateDest;
  const timeDest = req.body.timeDest;
  const dateDepart = req.body.dateDepart;
  const timeDepart = req.body.timeDepart;
  const freePlaces = req.body.freePlaces;
  const plane = req.body.plane; // connect
  const flight = new Flight(flightNum, airline, airDepart, airDest, dateDest, timeDest, dateDepart, timeDepart, freePlaces, plane);
  flight.save();
  res.json({flightNum, airline});
}

exports.getFlights = function (req, res) {
  res.json(Flight.getAll());
}
