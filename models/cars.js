// Import parts of Sequelize library
const { Model, DataTypes } = require("sequelize");

// Import our database connection from config.js
const sequelize = require("../config/connection");

// Import the User model
const User = require("./User");

// Initialize cars model (table) by extending off Sequelize's Model class
class Cars extends Model {}

// Set up fields and rules for Product model
Cars.init(
  {
    // Define columns for the cars table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fossil_fuel: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    automatic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    engine_cylinders: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    car_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "cars",
  }
);

// Establish a foreign key between user and cars
Cars.belongsTo(User, { foreignKey: "user_id" });

// Export the Cars model to be used in other parts of the codebase
module.exports = Cars;
