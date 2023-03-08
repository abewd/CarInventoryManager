// Importing the `Router` function from the Express.js framework
const router = require("express").Router();
// Importing the Op operators from Sequelize framework
const { Op } = require("sequelize");
// Importing the Sequelize framework
const { Cars, User } = require("../../models");
// Importing the Sequelize framework
const sequelize = require("sequelize");

// Display all cars in the inventory
router.get("/inventory", async (req, res) => {
  try {
    const carsOnLot = await Cars.findAll({
      include: {
        model: User,
      },
    });
    console.error("in this one");

    res.status(200).json(carsOnLot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//  Send user id

// Display a car by its ID value
// The attributes section is what you are displating from the model you are including, in this case user
router.get("/:id", async (req, res) => {
  try {
    const carOnLot = await Cars.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: [
          "id",
          "name",
          "email",
          // "make",
          // "model",
          // "year",
          // "price",
          // "mileage",
          // "fossil_fuel",
          // "automatic",
          // "engine_cylinders",
          // "color",
          // "body_type",
          // "car_description",
        ],
      },
    });
    // If the constant is empty then display an error message
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
router.post("/inventory", async (req, res) => {
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
    const [numRows, updatedCar] = await Cars.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (numRows === 0) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    console.log(updatedCar);
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

// This will get all of the unique makes within the database, example http request
// (http://localhost:3001/api/makes/all)

router.get("/makes/all", async (req, res) => {
  try {
    const makes = await Cars.findAll(
      {
        attributes: [[sequelize.fn("DISTINCT", sequelize.col("make")), "make"]],
      },
      { sequelize }
    );
    // const makes = await Cars.findAll({
    //   attributes: [[sequelize.fn("DISTINCT", sequelize.col("make")), "make"]],
    // });
    res.json(makes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Eroor" });
  }
});

// This will get all of the unique models within the database, example http request
// (http://localhost:3001/api/models/all)

router.get("/models/all", async (req, res) => {
  try {
    const models = await Cars.findAll(
      {
        attributes: [
          [sequelize.fn("DISTINCT", sequelize.col("model")), "model"],
        ],
      },
      { sequelize }
    );
    res.json(models);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// This will get all unique years within the database, example http request
// (http://localhost:3001/api/years/all)

router.get("/years/all", async (req, res) => {
  try {
    const years = await Cars.findAll(
      {
        attributes: [[sequelize.fn("DISTINCT", sequelize.col("year")), "year"]],
      },
      { sequelize }
    );
    res.json(years);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Eroor" });
  }
});

// This will get all unique color options within database, example http request
// (http://localhost:3001/api/body_types/all)

router.get("/colors/all", async (req, res) => {
  try {
    const colors = await Cars.findAll(
      {
        attributes: [
          [sequelize.fn("DISTINCT", sequelize.col("color")), "color"],
        ],
      },
      { sequelize }
    );
    res.json(colors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// This will get all unique body types within database, example http request
// (http://localhost:3001/api/body_types/all)

router.get("/body_types/all", async (req, res) => {
  try {
    const body_types = await Cars.findAll(
      {
        attributes: [
          [sequelize.fn("DISTINCT", sequelize.col("body_type")), "body_type"],
        ],
      },
      { sequelize }
    );
    res.json(body_types);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Eroor" });
  }
});

// This will get by exact search parameters, example http req
// (http://localhost:3001/api/search/all?make=Toyota&year=1998&model=Supra)

// Define a route handle for a GET request
router.get("/search/all", async (req, res) => {
  try {
    // Extract query parameters from the object
    const {
      make,
      model,
      color,
      year_min,
      year_max,
      price_min,
      price_max,
      mileage_min,
      mileage_max,
      fossil_fuel,
      automatic,
      engine_cylinders,
      body_type,
    } = req.query;

    // Create an empty object to store the filtered criteria
    const whereClause = {};

    // Check if make parameter is present and add it to the object
    if (make) {
      whereClause.make = {
        [Op.in]: make.split(","),
      };
    }
    // Check if model parameter is present and add it to the object
    if (model) {
      whereClause.model = {
        [Op.in]: model.split(","),
      };
    }
    // Check if color parameter is present and add it to the object
    if (color) {
      whereClause.color = {
        [Op.in]: color.split(","),
      };
    }
    // Check if both year_min and year_max parameters are present and add them to the object
    if (year_min && year_max) {
      whereClause.year = {
        [Op.between]: [year_min, year_max],
      };
      // Otherwise just add the year_min parameter to the object
    } else if (year_min) {
      whereClause.year = {
        [Op.gte]: year_min,
      };
      // Otherwise just add the year_max parameter to the object
    } else if (year_max) {
      whereClause.year = {
        [Op.lte]: year_max,
      };
    }
    // Check if both price_min and price_max parameters are present and add them to the object
    if (price_min && price_max) {
      whereClause.price = {
        [Op.between]: [price_min, price_max],
      };
      // Otherwise just add the price_min parameter to the object
    } else if (price_min) {
      whereClause.price = {
        [Op.gte]: price_min,
      };
      // Otherwise just add the price_max parameter to the object
    } else if (price_max) {
      whereClause.price = {
        [Op.lte]: price_max,
      };
    }
    // Check if both mileage_max and mileage_min parameters are present and add them to the object
    if (mileage_min && mileage_max) {
      whereClause.mileage = {
        [Op.between]: [mileage_min, mileage_max],
      };
      // Otherwise just add the mileage_min parameter to the object
    } else if (mileage_min) {
      whereClause.mileage = {
        [Op.gte]: mileage_min,
      };
      // Otherwise just add the mileage_max parameter to the object
    } else if (mileage_max) {
      whereClause.mileage = {
        [Op.lte]: mileage_max,
      };
    }
    // Check if both fossil_fuel is true or false (BOOLEAN)
    if (fossil_fuel) {
      whereClause.fossil_fuel = {
        [Op.eq]: fossil_fuel,
      };
    }
    // If its automatic, display automatic otherwise display manual
    if (automatic) {
      whereClause.automatic = {
        [Op.eq]: automatic,
      };
    }
    // Check how many engine cylinders (INT)
    if (engine_cylinders) {
      whereClause.engine_cylinders = {
        [Op.eq]: engine_cylinders,
      };
    }
    // Check what body type it is (STRING)
    if (body_type) {
      whereClause.body_type = {
        [Op.in]: body_type.split(","),
      };
    }
    console.log("we're in here");
    // Find all parameters for all the cars and display in json
    const cars = await Cars.findAll({
      where: whereClause,
      include: {
        model: User,
      },
    });
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    // Error message if not constructed
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Export this data so it can be used in other parts of the codebase
module.exports = router;
