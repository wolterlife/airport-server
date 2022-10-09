const flights = [];

module.exports = class Flight {
  constructor(flightNum, airline, airDepart, airDest, dateDest, timeDest, dateDepart, timeDepart, freePlaces, plane ) {
    this.flightId = new Date().valueOf(); // Gen
    this.flightNum = flightNum;
    this.airline = airline; /// connect
    this.airDepart = airDepart;
    this.airDest = airDest;
    this.dateDest = dateDest;
    this.timeDest = timeDest;
    this.dateDepart = dateDepart;
    this.timeDepart = timeDepart;
    this.freePlaces = freePlaces;
    this.plane = plane; // connect
  }
  save() {
    flights.push(this);
  }
  static getAll() {
    return flights;
  }
}
