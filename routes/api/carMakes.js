const router = require("express").Router();
const { Op } = require("sequelize");
const { Cars, User } = require("../../models");

router.get("/makes", async (req, res) => {
  try {
    const makes = await Cars.findAll({
      attributes: [[sequelize.fn("DISTINCT", sequelize.col("make")), "make"]],
    });
    res.json(makes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Eroor" });
  }
});
module.exports = router;
