// Import the Sequelize library used to connect a MySql DB
const Sequelize = require("sequelize");

// Import the dotenv library for loading environment variables from a .env file
require("dotenv").config();

// Initialise a variable for the Sequelize instance
let sequelize;

// Check if the JAWSDB_URL environment variable exists
if (process.env.JAWSDB_URL) {
  // If it does, initialise the Sequelize
  // instance with this variable to connect to a remote database
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If it doesnt, then initialise the Sequelize with the local
  // database credentials specified in the .env file
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

// Export Sequelize instance to be used in other parts of the codebase
module.exports = sequelize;
