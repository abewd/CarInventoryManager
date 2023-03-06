// Import router from the express framework
const router = require("express").Router();

// Create a module called userRoutes which uses the following routing
const userRoutes = require("./userRoutes");

// Create a module called carRoutes which uses the following routing
const carRoutes = require("./carFunctions");

// Use userRoutes to handle requests to /users URL
router.use("/users", userRoutes);

// Use carRoutes to handle requests to / URL
router.use("/", carRoutes);

// Export this data so it can be used in other parts of the codebase
module.exports = router;
