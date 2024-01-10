import { useState, useEffect } from "react";
import { FlightType } from 'apps/flights-api/src/types/flightType'

function Alerts() {
  const [flights, setFlights] = useState<FlightType[]>([]);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3333/flights/allflights");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const flightsFromServer = await getData();
        setFlights(flightsFromServer);
      } catch (error) {
        console.error("Error setting flights:", error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div>

      <h2 className="text-center text-green-900 font-bold text-2xl">Alerts</h2>

      <ul className="center w-96">

        <li className="text-center w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
          ho no youre gona die 😱
        </li>
        <li className="text-center w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
          ho shit 💩 this is bad
        </li>
        
      </ul>

      {/* <ul className="center w-96">
        
      {flights.map((flight) => (
        <div key={flight.flight_id}>
          <li className="text-center w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50" >
            <p>{JSON.stringify(flight)}</p>
          </li> 
        </div>
      ))}

      </ul> */}

    </div>
  );
}

export default Alerts;
