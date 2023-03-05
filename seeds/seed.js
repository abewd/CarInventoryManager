// Importing the Sequelize framework
const sequelize = require("../config/connection");

// Importing User and Car models from the models directory
const { User, Cars } = require("../models");

// Assign data location for User and Cars from the JSON files
const userData = require("./userCredentials.json");
const carData = require("./carInventorySeeds.json");

// Insert test into database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Insert test user data into User table
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Insert test car inventory data into Cars table
  await Cars.bulkCreate(carData, {
    individualHooks: true,
    returning: true,
  });
  // If successful display "0"
  process.exit(0);
};

// Call the functino you just spent forever writing to see if this works
seedDatabase();
