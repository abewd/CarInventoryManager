const router = require("express").Router();
const { Op } = require("sequelize");
const { Cars, User } = require("../../models");

router.get("/body_types", async (req, res) => {
  try {
    const body_types = await Cars.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("body_type")), "body_type"],
      ],
    });
    res.json(body_types);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Eroor" });
  }
});

module.exports = router;
