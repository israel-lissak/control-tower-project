import { Sequelize } from 'sequelize';

const sequelizeConection = new Sequelize('flights', 'postgres', 'postsqlilil', {
    host: 'localhost',
    dialect: 'postgres',
    schema: 'flights_schema',
    logging: false,
  });
  
  
export default sequelizeConection;