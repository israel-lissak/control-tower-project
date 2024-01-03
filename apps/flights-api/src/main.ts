import express from 'express';
import { Sequelize } from 'sequelize';
import flightsRouter from './routes/flightsRouter';

async function startServer() {
  const app = express();

  const sequelizeConection = new Sequelize('flights', 'postgres', 'postsqlilil', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  });

  try {
    await sequelizeConection.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  app.use('/flights', flightsRouter);

  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to flights-api!' });
  });

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);

  return sequelizeConection;
}

const sequelizeConection = startServer();

export { sequelizeConection };
