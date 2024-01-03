// src/migrations/20220101000001-create-flights.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('flights', {
        flight_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        flight_number: {
          type: Sequelize.STRING,
        },
        departure_point: {
          type: Sequelize.JSON,
        },
        arrival_point: {
          type: Sequelize.JSON,
        },
        current_point: {
          type: Sequelize.JSON,
        },
        pilot_email: {
          type: Sequelize.STRING,
        },
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('flights');
    },
  };
  