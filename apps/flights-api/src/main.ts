import express from 'express';
import flightsRouter from './routes/flightsRouter';
import sequelizeConection from './configs/db'

  const app = express();

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
    console.log(`Listening at http://localhost:${port}/`);
  });
  server.on('error', console.error);

export { sequelizeConection };
