// import express from 'express';
// import cors from 'cors';
// import { flightsRouter, appRouter} from './routes/flightsRouter';
// import sequelizeConection from './configs/db';
// import { createExpressMiddleware } from '@trpc/server/adapters/express'


// const app = express();
// app.use(cors());
// app.use(express.json());

// try {
//   await sequelizeConection.authenticate();
//   console.log('Connection to the database has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

// app.use('/flights', flightsRouter);

// app.use('/trpc', createExpressMiddleware({
//   router: appRouter,
// }));


// const port = process.env.PORT || 3333;
// const server = app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}/`);
// });
// server.on('error', console.error);

// type AppRouter = typeof appRouter

// export { sequelizeConection, AppRouter };



import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import { flightsRouter, appRouter } from './routes/flightsRouter';
import sequelizeConection from './configs/db';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

const app = express();
app.use(cors());
app.use(express.json());

try {
  await sequelizeConection.authenticate();
  console.log('Connection to the database has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
  console.log('WebSocket connection established');

  // טיפ: יש לשלב את ה-socket עם הפונקציות שלך לניהול המידע שנשלח ונקרא דרך WebSocket.
});

app.use('/flights', flightsRouter);

app.use('/trpc', createExpressMiddleware({
  router: appRouter,
}));

const port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});

server.on('error', console.error);

type AppRouter = typeof appRouter;

export { sequelizeConection, AppRouter };
