const router = require("express").Router();
const { Op } = require("sequelize");
const { Cars, User } = require("../../models");

// Display all cars in our inventory
router.get("/", async (req, res) => {
  try {
    const carsOnLot = await Cars.findAll({
      include: {
        model: User,
        attributes: [
          "id",
          "make",
          "model",
          "year",
          "price",
          "mileage",
          "fossil_fuel",
          "automatic",
          "engine_cylinders",
          "color",
          "body_type",
          "car_description",
        ],
      },
    });
    res.status(200).json(carsOnLot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Display a car by its ID value
router.get("/:id", async (req, res) => {
  try {
    const carOnLot = await Cars.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: [
          "id",
          "make",
          "model",
          "year",
          "price",
          "mileage",
          "fossil_fuel",
          "automatic",
          "engine_cylinders",
          "color",
          "body_type",
          "car_description",
        ],
      },
    });
    if (!carOnLot) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.status(200).json(carOnLot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add a new car to the database
router.post("/", async (req, res) => {
  try {
    const carOnLot = await Cars.create(req.body);
    res.status(201).json(carOnLot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update car details that's already in our DB
router.put("/:id", async (req, res) => {
  try {
    const [numRows, [updatedCar]] = await Cars.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (numRows === 0) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.status(200).json(updatedCar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Remove a car from the inventory
router.delete("/:id", async (req, res) => {
  try {
    const numCarsDeleted = await Cars.destroy({
      where: { id: req.params.id },
    });
    if (numCarsDeleted === 0) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Search for cars with specific criteria
router.get("/search", async (req, res) => {
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

router.get("/models", async (req, res) => {
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
