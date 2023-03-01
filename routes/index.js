const router = require("express").Router();
const apiRoutes = require("./api/carFunctions");

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.send("<h1>She Works Lads!</h1>");
});

module.exports = router;
