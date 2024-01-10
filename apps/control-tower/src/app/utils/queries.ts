const email = "example@example.com";
const username = "example@example.com";
const password = "example@example.com";

const logIn = `
query MyQuery {
    pilotByEmail(email: "${email}") {
      email
      password
    }
  }
`;

const signUp = `
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
`

const getPilot = `
query MyQuery {
    pilotByEmail(email: "${email}") {
      id
      name
      email
      password
      alerts
    }
  }
`

export  {
    logIn,
    signUp,
    getPilot
}

// module.exports = {
//     logIn,
//     signUp,
//     getPilot
// }