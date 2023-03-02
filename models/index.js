// Import all models required
const Cars = require("./Cars");
const Users = require("./Users");

// cars belongs to users
// remember to use foreignt key
module.exports = {
  Cars,
  Users,
};
