import {AppDataSource} from "../../db";
const {Flight} = require("../models/Flight");

exports.getFlights = async function (res: any, req: any) {
  const flightRepos = AppDataSource.getRepository(Flight)
  const allFlights = flightRepos.find();
  res.json(allFlights);
  // const flight = new Flight()
  // flight.airline = "wolterovozka";
  // flight.flightNum = "SD001";
  // await flightRepos.save(flight);
}
