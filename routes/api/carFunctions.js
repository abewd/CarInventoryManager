const router = require("express").Router();
const { Op } = require("sequelize");
const { Cars, User } = require("../../models");
const sequelize = require("sequelize");

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
// the attributes section is what you are displating from the model you are including, in this case user
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

// will get all of the unique makes within the database, example http request (http://localhost:3001/inventory/makes/all)

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

// will get all of the unique models within the database, example http request (http://localhost:3001/inventory/models/all)

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

// will get all unique years within the database, example http request (http://localhost:3001/inventory/years/all)

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

// gets all unique color options within database, example http request (http://localhost:3001/inventory/body_types/all)

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

// gets all unique body types within database, example http request (http://localhost:3001/inventory/body_types/all)

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

// will get by exact search parameters, example http req (http://localhost:3001/inventory/search/all?make=Toyota&year=1998&model=Supra)

router.get("/search/all", async (req, res) => {
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
