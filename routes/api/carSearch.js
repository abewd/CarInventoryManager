const router = require("express").Router();
const { Op } = require("sequelize");
const { Cars, User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const {
      make,
      model,
      color,
      year,
      price,
      mileage,
      fossil_fuel,
      automatic,
      engine_cylinders,
      body_type,
    } = req.query;
    const whereClause = {};
    if (make) {
      whereClause.make = {
        [Op.eq]: make,
      };
    }
    if (model) {
      whereClause.model = {
        [Op.eq]: model,
      };
    }
    if (color) {
      whereClause.color = {
        [Op.eq]: color,
      };
    }
    if (year) {
      whereClause.year = {
        [Op.eq]: year,
      };
    }
    if (price) {
      whereClause.price = {
        [Op.eq]: price,
      };
    }
    if (mileage) {
      whereClause.mileage = {
        [Op.eq]: mileage,
      };
    }
    if (fossil_fuel) {
      whereClause.fossil_fuel = {
        [Op.eq]: fossil_fuel,
      };
    }
    if (automatic) {
      whereClause.automatic = {
        [Op.eq]: automatic,
      };
    }
    if (engine_cylinders) {
      whereClause.engine_cylinders = {
        [Op.eq]: engine_cylinders,
      };
    }
    if (body_type) {
      whereClause.body_type = {
        [Op.eq]: body_type,
      };
    }
    const cars = await Cars.findAll({
      where: whereClause,
    });
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
