import { Sequelize } from 'sequelize';

const sequelizeConection = new Sequelize('flights', 'postgres', 'postsqlilil', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  });
  
export default sequelizeConection;