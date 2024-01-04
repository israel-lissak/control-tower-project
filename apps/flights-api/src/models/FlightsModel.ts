import { DataTypes } from 'sequelize';
// import sequelize from 'apps/flights-api/src/configs/db';
import  sequelizeConection  from 'apps/flights-api/src/configs/db'

const Flights = sequelizeConection.define('flights', {
  flight_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  flight_number: {
    type: DataTypes.STRING, 
  },
  departure_point: {
    type: DataTypes.JSON,
  },

  arrival_point: {
    type: DataTypes.JSON,
  },
  current_point: {
    type: DataTypes.JSON,
  },
  pilot_email: {
    type: DataTypes.STRING,
  },
},{
  timestamps: false
}
);

export default Flights;
