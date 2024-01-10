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

function PilotPage() {
  const { email } = useParams();
  const [pilot, setPilot] = useState<any>({});
  const { loading, error, sendRequest } = useGraphQLRequest();

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
    <div>
      <h1>PilotPage</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {(error as Error).message}</p>}
      {!loading && !error && (
        <>
          <p>Pilot name is {pilot.name}</p>
          <p>Pilot email is {pilot.email}</p>
          <p>Pilot password is {pilot.password}</p>
          <p>Pilot alerts are {pilot.alerts}</p>
        </>
      )}
    </div>
  );
}

export default PilotPage;
