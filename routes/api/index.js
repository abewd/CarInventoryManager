// This will link the user routes to the server
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const carRoutes = require("./carFunctions");

router.use("/users", userRoutes);

router.use("/", carRoutes);

module.exports = router;
