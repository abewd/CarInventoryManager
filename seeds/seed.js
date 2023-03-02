const sequelize = require("../config/connection");
const { User, Cars } = require("../models");

const userData = require("./userCredentials.json");
const carData = require("./carInventorySeeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Cars.bulkCreate(carData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
