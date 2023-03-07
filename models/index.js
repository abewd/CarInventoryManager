// Import the Cars model
const Cars = require("./Car");
// Import the User model.....
const User = require("./User");

// // Establish a foreign key between user and cars
Cars.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Cars, { foreignKey: "user_id" });

// Export the Cars and User model to be used in other parts of the codebase
module.exports = {
  Cars,
  User,
};
