import express from 'express';
import Flights from "../models/FlightsModel";

const flightsRouter = express.Router();

flightsRouter.get('/allflights', async (req, res) => {
  try {

    const allFlights = await Flights.findAll();

    res.json(allFlights);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });

  }
});

flightsRouter.get('/achi', async (req, res) => {
  try {

    res.send({ message: 'achi' });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });

  }
});

export default flightsRouter;
