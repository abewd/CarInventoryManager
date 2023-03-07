// Import the Sequelize library used to connect a MySql DB
const Sequelize = require("sequelize");

// Import the dotenv library for loading environment variables from a .env file
require("dotenv").config();

// Initialise a variable for the Sequelize instance
let sequelize;

// Check if the JAWSDB_URL environment variable exists

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

// Export Sequelize instance to be used in other parts of the codebase..
module.exports = sequelize;
