// import { TEInput, TERipple } from "tw-elements-react";
// import { Link, useNavigate } from "react-router-dom";
// import { gql } from 'graphql-request';
// import { useState } from "react";

// const server = import.meta.env.VITE_GRAPHQ_SERVER;

// export default function SignUp(): JSX.Element {

//     const navigate = useNavigate();
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
    
//     const handelSignUp = async () => {
//         console.log("sign up clicked");
        
//         const mutation = gql`
//         mutation MyMutation {
//           createPilot(input: {pilot: {name: "${username}", email: "${email}", password: "${password}"}}) {
//             query {
//               pilotByEmail(email: "${email}") {
//                 id
//                 name
//                 email
//                 password
//                 alerts
//               }
//             }
//           }
//         }
//       `;
    
//       try {
//         const response = await fetch(server, {
//           method: 'post',
//           headers: {
//             'Content-Type': 'application/json',
//             'Content-Length': '<calculated when request is sent>'
//             // Add any other headers as needed, e.g., authorization headers
//           },
//           body: JSON.stringify({
//             query: mutation,
//           }),
//         });
//         const data = await response.json();
//         console.log(JSON.stringify(data.data));
//         } catch (error) {
//         // Handle network errors or other exceptions
//         throw new Error(`Failed to register user: ${(error as Error).message}`);
//       }
//     }

import { TEInput, TERipple } from "tw-elements-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useGraphQLRequest from "../../utils/useGraphQLRequest";

export default function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { loading, error, sendRequest } = useGraphQLRequest();

  const handelSignUp = async () => {
    const mutation = `
      mutation MyMutation {
        createPilot(input: {pilot: {name: "${username}", email: "${email}", password: "${password}"}}) {
          query {
            pilotByEmail(email: "${email}") {
              id
              name
              email
              password
              alerts
            }
          }
        }
      }
    `;

    try {
      const data = await sendRequest(mutation);
      console.log(JSON.stringify(data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
    

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">

    {/* back home button */}
    <div className="mb-12 pb-1 pt-1 text-center"> 
        <Link 
          to="/"
        >
           <button
            className="mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
            style={{
              background:
              "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
            }}
            >
            go back home
          </button>
        </Link>
      </div>

      <h1
        className="mb-12 pb-1 pt-1 text-center text-3xl font-bold text-gray-900 dark:text-white"
        >
        Sign Up
      </h1>

      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src='././public/control-tower.png'
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        control tower
                      </h4>
                    </div>


                    <form>
                      <p className="mb-4">Please fill in this form to create an account!</p>

                      {/* <!--Username input--> */}

                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>User name</label>

                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      ></input>

                      {/* <!--email input--> */}

                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>

                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>

                      {/* <!--Password input--> */}

                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                      
                      <input
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>

                    <br />

                      {/* <!--Submit button--> */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                            onClick={handelSignUp}
                          >
                            Sign up
                          </button>
                        </TERipple>
                      </div>

                      {/* <!--login button--> */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Have an account already?</p>
                        <Link 
                        to="/login"
                        >
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            >
                            Log in
                          </button>
                        </Link>
                      </div>

                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a control tower
                    </h4>
                    <p className="text-sm">
                      Our control tower excels with a significant edge over competitors due to cutting-edge technology, advanced analytics, and unparalleled reliability. This allows us to provide unmatched precision, real-time insights, and superior monitoring capabilities, ensuring a level of surveillance excellence that sets us apart in the industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}