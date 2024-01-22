import express from 'express';
import Flights from "../models/FlightsModel";
import { t } from '../trpc';
import { z } from 'zod';
import { FlightType } from '../types/flightType';
import { initTRPC, TRPCError } from '@trpc/server';


function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function toRad(degrees) {
  return (degrees * Math.PI) / 180;
}



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


export const protectedProcedure = t.procedure.use(async function isAuthed(opts) {

  const { ctx } = opts;

  if (!ctx) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return opts.next();
});



const appRouter = t.router({

  getAllFlights: protectedProcedure.query(async () => {

    const rowData = await Flights.findAll();
    const flights = rowData.map((flight) => flight.get())
    
    return flights;
  }),


  updateFlights: protectedProcedure.input(
    z.object({
    flight_number: z.string(),
    current_point: z.object({
      height: z.number(),
      width: z.number()
    })
  }
  )
  ).mutation(async (req) => {
    
    const { flight_number, current_point } = req.input as any;
    const rowData = await Flights.update(
      { current_point: { height: current_point.height, width: current_point.width } }, 
      { where: { flight_number: flight_number }}
    );  
    
  }),

  
  getAlerts: protectedProcedure.query(async () => {
    
    const rowData = await Flights.findAll();
    const flights = rowData.map((flight) => flight.get())
    let alerts: string[] = []
    
    flights.map((flight)=>{
      flights.map((flight2)=>{

        const distance = haversine(flight.current_point.width, flight.current_point.height, flight2.current_point.width, flight2.current_point.height)
        if(distance < 5000 && flight.flight_number !== flight2.flight_number)
        alerts.push(`hay ${flight.flight_number} your distance from ${flight2.flight_number} is ${distance}`)
      })
    })

    if (alerts.length === 0) alerts.push('no alerts')
    
    return alerts;
  })

});


export { flightsRouter, appRouter };
