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

function Trpc() {

    const [result, setResult] = useState<FlightType[]>([]);
    const [alerts, setAlerts] = useState<string[]>([])

    useEffect(() => {
      
        const fetchTrpc = async () => {
          try {
            const data = await client.getAllFlights.query()
            setResult(data)
          } catch (error) {

          }
        };
        const fetchTrpc2 = async () => {
          try {
            const data = await client.getAlerts.query()
            setAlerts(data)
          } catch (error) {

          }
        };
    
        fetchTrpc();
        fetchTrpc2();
      }, []);

    
  return (
    <div>

      <div className='w-96 m-auto'>
        <h2 className="text-center text-green-900 font-bold text-2xl">Alerts</h2>

        <ul className="center">
            {alerts.map((alert) => (
                <div key={alert}>
                    <li className="text-center w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50" >
                        <p>{alert}</p>
                    </li> 
                </div>
            ))}
        </ul>
      </div>

    </div>
  )
}

export default Trpc