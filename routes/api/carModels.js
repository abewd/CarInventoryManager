const router = require("express").Router();
const { Op } = require("sequelize");
const { Cars, User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const models = await Cars.findAll({
      attributes: [[sequelize.fn("DISTINCT", sequelize.col("model")), "model"]],
    });
    res.json(models);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
