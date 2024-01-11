// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { gql } from 'graphql-request';

// const server = import.meta.env.VITE_GRAPHQ_SERVER;

// function PilotPage() {

//   const { email } = useParams()
//   const [pilot, setPilot] = useState<any>({})

//   useEffect(() => {
//     const fetchPilot = async () => {
//         const mutation = gql`
//         query MyQuery {
//             pilotByEmail(email: "${email}") {
//               id
//               name
//               email
//               password
//               alerts
//             }
//           }
//         `;
    
//         try {
//             const response = await fetch(server, {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Content-Length': '<calculated when request is sent>'
//                 // Add any other headers as needed, e.g., authorization headers
//             },
//             body: JSON.stringify({
//                 query: mutation,
//             }),
//             });
//             const data = await response.json();

//             console.log(JSON.stringify(data.data));
//             setPilot((data.data));

//             } catch (error) {
//             // Handle network errors or other exceptions
//             throw new Error(`Failed to register user: ${(error as Error).message}`);
//         }
//     }
//     fetchPilot()
//     }, [])

// return (
//     <div>
//         <h1>PilotPage</h1>
//         <p>Pilot name is {(pilot.pilotByEmail?.name)}</p>
//         <p>Pilot email is {(pilot.pilotByEmail?.email)}</p>
//         <p>Pilot password is {(pilot.pilotByEmail?.password)}</p>
//         <p>Pilot alerts are {(pilot.pilotByEmail?.alerts)}</p>
//     </div>
//     );
    
// }

// export default PilotPage



import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGraphQLRequest from "../../utils/useGraphQLRequest";
import { useNavigate } from "react-router-dom";

function PilotPage() {
  const { email } = useParams();
  const [pilot, setPilot] = useState<any>({});
  const { loading, error, sendRequest } = useGraphQLRequest();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPilot = async () => {
      const mutation = `
        query MyQuery {
          pilotByEmail(email: "${email}") {
            id
            name
            email
            password
            alerts
          }
        }
      `;

      try {
        const data = await sendRequest(mutation);
        // console.log(JSON.stringify(data));
        setPilot(data.pilotByEmail);
      } catch (error) {
        // Handle network errors or other exceptions
        console.error(`Failed to fetch pilot: ${(error as Error).message}`);
      }
    };

    fetchPilot();
  }, [email, sendRequest]);

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-200 rounded-lg shadow-md">
    <div className="max-w-2xl mx-auto">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate("/")}>Back to Home</button>
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800">PilotPage</h1>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">Error: {(error as Error).message}</p>}
      {!loading && !error && (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <p className="text-xl font-bold text-gray-800">Pilot Details:</p>
            <p className="text-lg text-gray-600">Name: {pilot.name}</p>
            <p className="text-lg text-gray-600">Email: {pilot.email}</p>
            <p className="text-lg text-gray-600">Password: {pilot.password}</p>
            <p className="text-lg text-gray-600">Alerts: {pilot.alerts}</p>
          </div>
        </>
      )}
    </div>
  </div>
  );
}

export default PilotPage;
