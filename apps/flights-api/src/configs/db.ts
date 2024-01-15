import { Sequelize } from 'sequelize';

const sequelizeConection = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres',
    schema: process.env.SCHEMA,
    logging: false,
  });
  
  
export default sequelizeConection;