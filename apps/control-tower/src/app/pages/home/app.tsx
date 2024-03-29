import { useEffect } from 'react';

import MapComponent from './components/Map';
import Alerts from './components/Alerts';
import NavBar from './components/NavBar';
import Trpc from './components/trpc';
import FlightsLocation from './components/FlightsLocation';

import { atom, useAtom } from 'jotai'

import { createTRPCProxyClient, httpBatchLink} from '@trpc/client';
import { AppRouter } from '../../../../../flights-api/src/main';
import { FlightType } from 'apps/flights-api/src/types/flightType';


const client = createTRPCProxyClient<AppRouter>({
  links: [
      httpBatchLink({
          url: 'http://localhost:3333/trpc',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
          },
      }),
  ],
})


export const flightsLocation = atom([{flight_number: "", height: 3000000, width: 3000000}])

export function App() {
  const [flightsLocationAtom, setFlightsLocationAtom] = useAtom(flightsLocation)

  useEffect(() => {
    const fetchFlightsLocation = async () => {
      try {
        const data = await client.getAllFlights.query()
        setFlightsLocationAtom(data.map((flight: FlightType) => {
          return {
            flight_number: flight.flight_number,
            height: flight.current_point.height,
            width: flight.current_point.width
          }
        }))
        
      } catch (error) {

      }
    };

    fetchFlightsLocation();
  }, []);

  return (
    <div className="app">

      <NavBar />

      <FlightsLocation />

      <p 
        className="text-center text-green-900 font-bold text-2xl"
      >the map</p>
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
        <MapComponent />
      </div>

      {/* <Alerts /> */}

      <Trpc />
      
    </div>
  );
}

export default App;
