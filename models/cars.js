// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Cars extends Model {}

// set up fields and rules for Product model
Cars.init(
  {
    // define columns
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
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "cars",
  }
);

module.exports = Cars;
