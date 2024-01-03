import express from 'express';
import Flights from "../models/FlightsModel";

const flightsRouter = express.Router();

flightsRouter.get('/allflights', async (req, res) => {
  try {
    // קריאה לכל הטיסות ממסד הנתונים    
    const allFlights = await Flights.findAll();

    // החזרת התוצאה כמובן כתשובה לבקשה
    res.json(allFlights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default flightsRouter;
