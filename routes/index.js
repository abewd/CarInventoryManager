const router = require("express").Router();

router.use("/inventory", inventory);
router.use("/colors", colors);
router.use("/body_types", BodyTypes);
router.use("/makes", makes);
router.use("/models", models);
router.use("/years", years);

router.use((req, res) => {
  res.send("<h1>She Works Lads!</h1>");
});

module.exports = router;
