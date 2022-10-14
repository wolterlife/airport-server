import {AppDataSource} from "../db";
const {Flight} = require("../models/flight");
const flightRepos = AppDataSource.getRepository(Flight)

exports.getFlights = async function (res: any, req: any) {
  const flight = new Flight()
  flight.airline = "wolterovozka";
  flight.flightNum = "SD001";
  await flightRepos.save(flight);
}
