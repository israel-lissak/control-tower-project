import { DataTypes, Model } from 'sequelize';
// import sequelize from 'apps/flights-api/src/configs/db';
import  sequelizeConection  from 'apps/flights-api/src/configs/db';
import { FlightType } from 'apps/flights-api/src/types/flightType';



const Flights = sequelizeConection.define<Model<FlightType, Omit<FlightType, "flight_id">>>('flights', {
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

// import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

// // order of InferAttributes & InferCreationAttributes is important.
// class Flights extends Model<InferAttributes<Flights>, InferCreationAttributes<Flights>> {
//   // 'CreationOptional' is a special type that marks the field as optional
//   // when creating an instance of the model (such as using Model.create()).
//   declare flight_id: CreationOptional<number>;
//   declare flight_number: string;
//   declare departure_point: FlightType['departure_point'];
//   declare arrival_point: FlightType['arrival_point'];
//   declare current_point: FlightType['current_point'];
//   declare pilot_email: string;
//   // other attributes...
// }

// Flights.init({
//   flight_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   flight_number: {
//     type: DataTypes.STRING, 
//   },
//   departure_point: {
//     type: DataTypes.JSON,
//   },
  
//   arrival_point: {
//     type: DataTypes.JSON,
//   },
//   current_point: {
//     type: DataTypes.JSON,
//   },
//   pilot_email: {
//     type: DataTypes.STRING,
//   },
// },{
//   sequelize: sequelizeConection,
//   modelName: 'flights',
//   timestamps: false
// })

export default Flights;