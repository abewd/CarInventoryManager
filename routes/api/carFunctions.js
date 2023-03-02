const router = require("express").Router();
const { Op } = require("sequelize");
const { Cars, User } = require("../../models");

// Display all cars in our inventory
router.get("/", async (req, res) => {
  try {
    const carsOnLot = await Cars.findAll({});
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

module.exports = router;
