import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import { flightsRouter, appRouter } from './routes/flightsRouter';
import sequelizeConection from './configs/db';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { createContext } from './middlewares/context';

const app = express();
app.use(cors());
// app.use(express.json());


// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// wss.on('connection', (socket) => {
//   console.log('WebSocket connection established');


app.use('/flights', flightsRouter);

app.use('/trpc', createExpressMiddleware(
  {
  router: appRouter,
  createContext: createContext,
}
));

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});

// server.on('error', console.error);

type AppRouter = typeof appRouter;

export { sequelizeConection, AppRouter };
