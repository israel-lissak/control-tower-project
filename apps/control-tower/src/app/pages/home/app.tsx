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
          url: 'http://localhost:3333/trpc'
      }),
  ],
})


export const flightsLocation = atom([{height: 0, width: 0}, {height: 1000000, width: 1000000}, {height: 2000000, width: 2000000}])

export function App() {
  const [flightsLocationAtom, setFlightsLocationAtom] = useAtom(flightsLocation)

  useEffect(() => {
    const fetchFlightsLocation = async () => {
      try {
        const data = await client.getAllFlights.query()
        setFlightsLocationAtom(data.map((flight: FlightType) => {
          return {
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

      <h1 
        className="text-center text-green-900 font-bold text-3xl" 
      >control tower</h1>

      <FlightsLocation />

      <p 
        className="text-center text-green-900 font-bold text-2xl"
      >the map</p>
      <MapComponent />

      {/* <Alerts /> */}

      <Trpc />
      
    </div>
  );
}

export default App;
