const router = require("express").Router();
const { Op } = require("sequelize");
const { Cars, User } = require("../../models");

router.get("/years", async (req, res) => {
  try {
    const years = await Cars.findAll({
      attributes: [[sequelize.fn("DISTINCT", sequelize.col("year")), "year"]],
    });
    res.json(years);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Eroor" });
  }
});
module.exports = router;
