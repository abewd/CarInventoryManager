// Router created for instance to define route for application
const router = require("express").Router();

const { Op } = require("sequelize");
// Our cars command will require information from the models folder
const { Cars, User } = require("../../models");

// Display all cars in our inventory

router.get("/", async (req, res) => {
  try {
    const carsOnLott = await Cars.findAll({
      include: [
        {
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
      ],
    });

    res.status(200).json(carsOnLott);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Display a car by its ID value

router.get("/:id", async (req, res) => {
  try {
    const carsOnLott = await Cars.findByPk(req.params.id, {
      include: [
        {
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
      ],
    });
    if (!carsOnLott) {
      res
        .status(404)
        .json({ message: "Bro, we cant find the ID for this box on wheels" });
      return;
    }
    res.status(200).json(carsOnLott);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Adding a new car to the database
router.post("/", async (req, res) => {
  try {
    const carsOnLott = await Cars.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(carsOnLott);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updating car details thats already in our DB

router.put("/:id", async (req, res) => {
  try {
    const carsOnLott = await Cars.update({ where: { id: req.params.id } });
    if (!carsOnLott) {
      res.status(404).json({ message: "No category found with this ID" });
      return;
    }
    res.status(200).json(carsOnLott);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Remove a car from the inventory
router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const carsOnLott = await Cars.destroy({
      where: { id: req.params.id },
    });
    if (!carsOnLott) {
      res.status(404).json({ message: "No cars with this ID P L A Y A " });
      return;
    }
    res.status(200).json(carsOnLott);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
