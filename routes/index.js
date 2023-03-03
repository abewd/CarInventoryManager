// This will link the inventory and car functions to the server
const router = require("express").Router();
const inventory = require("./api/carFunctions");

router.use("/api", inventory);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
