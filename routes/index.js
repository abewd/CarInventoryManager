const router = require("express").Router();
const inventory = require("./api/carFunctions");
const colors = require("./api/carColors");
const BodyTypes = require("./api/carBodyTypes");
const makes = require("./api/carMakes");
const models = require("./api/carModels");
const years = require("./api/carYears");

router.use("/inventory", inventory);
router.use("/colors", colors);
router.use("/body_types", BodyTypes);
router.use("/makes", makes);
router.use("/models", models);
router.use("/years", years);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
