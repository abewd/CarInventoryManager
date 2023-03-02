const sequelize = require("../config/connection");
const { Users } = require("../models");

const userData = require("./carInventorySeeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
