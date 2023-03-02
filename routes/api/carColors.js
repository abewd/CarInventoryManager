const router = require("express").Router();
const { Op } = require("sequelize");
const { Cars, User } = require("../../models");

router.get("/colors", async (req, res) => {
  try {
    const colors = await Cars.findAll({
      attributes: [[sequelize.fn("DISTINCT", sequelize.col("color"), "color")]],
    });
    res.json(colors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
