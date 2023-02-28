// Router created for instance to define route for application
const router = require("express").Router();

// Our cars command will require information from the models folder
const { Cars, User } = require("../../models");

// Display all cars in our inventory

router.get("/", async (req, res) => {
  // Display all units on the car lott
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
