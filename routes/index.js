const router = require("express").Router();
const inventory = require("./api/carFunctions");

router.use("/inventory", inventory);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
