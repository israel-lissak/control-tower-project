import { useAtom } from 'jotai';
import { flightsLocation } from '../app';
// import { useState } from 'react';

import { createTRPCProxyClient, httpBatchLink} from '@trpc/client';
import { AppRouter } from '../../../../../../flights-api/src/main';
import { useEffect, useState } from 'react';
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


function FlightsLocation() {

    const [location, setLocation] = useAtom(flightsLocation);
    const [visible, setVisible] = useState<boolean>(true)
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">

        <div className='flex flex-row items-center justify-center gap-4'>

            <h2 className="text-center text-green-900 font-bold text-2xl">change location</h2>

            <button
            onClick={() => setVisible(!visible)}
            >
                {visible ? "🔼" : "🔽"}
            </button>
        </div>


        {visible && 
        <div className="flex flex-row items-center justify-center gap-4">
            {location.map((item, index) =>(
                <div key={index} className="flex flex-col items-center justify-center border-2 rounded-lg p-4">

                    <p className='font-bold'>flight number: {item.flight_number}</p>
                    <p>{`hight: ${item.height}, width: ${item.width}`}</p>

                    <input 
                    type="text" 
                    placeholder={`height: ${item.height}`}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    id={`height-${index}`}
                    />
                    <button
                    onClick={async () => {
                        const heightInputElement = document.querySelector(`#height-${index}`);
                        if (heightInputElement && heightInputElement instanceof HTMLInputElement) {
                            const newLocation = [...location];
                            newLocation[index].height = parseInt(heightInputElement.value);
                            setLocation(newLocation);
                        }
                        await client.updateFlights.mutate({flight_number: item.flight_number, current_point: location[index]})

                    }}
                    className= "bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-2"
                    >
                    change height
                    </button>

                    <input 
                    type="text" 
                    placeholder={`width: ${item.width}`}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    id= {`width-${index}`}
                    />
                    <button
                    onClick={async () => {
                        const widthInputElement = document.querySelector(`#width-${index}`);
                        if (widthInputElement && widthInputElement instanceof HTMLInputElement) {
                            const newLocation = [...location];
                            newLocation[index].width = parseInt(widthInputElement.value);
                            setLocation(newLocation);
                        }
                        await client.updateFlights.mutate({flight_number: item.flight_number, current_point: location[index]})

                    }}
                    className= "bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-2"
                    >
                    change width
                    </button>
                </div>
            ))}
        </div>
        }


    </div>
  )
}

export default FlightsLocation