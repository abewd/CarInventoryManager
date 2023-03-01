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

router.get('/models', async (req, res) => {
  try {
    const models = await Cars.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('model')), 'model']
      ]
    });
    res.json(models);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/makes', async (req, res)=>{
  try{
    const makes = await Cars.findAll({
      attributes:[
        [sequelize.fn('DISTINCT', sequelize.col('make')), 'make']
      ]
    });
    res.json(makes);
  }catch(error){
    console.log(error);
    res.status(500).json({message: 'Internal Server Eroor'})
  }
})

router.get('/colors', async (req, res)=>{
  try{
    const colors = await Cars.findAll({attributes: [[sequelize.fn('DISTINCT', sequelize.col('color'), 'color')]]});
    res.json(colors)
  }catch(error){
    console.log(error)
    res.status(500).json({message: 'Internal Server Error'})
  }
})

router.get('/years', async (req, res)=>{
  try{
    const years = await Cars.findAll({
      attributes:[
        [sequelize.fn('DISTINCT', sequelize.col('year')), 'year']
      ]
    });
    res.json(years);
  }catch(error){
    console.log(error);
    res.status(500).json({message: 'Internal Server Eroor'})
  }
})

router.get('/body_types', async (req, res)=>{
  try{
    const body_types = await Cars.findAll({
      attributes:[
        [sequelize.fn('DISTINCT', sequelize.col('body_type')), 'body_type']
      ]
    });
    res.json(body_types);
  }catch(error){
    console.log(error);
    res.status(500).json({message: 'Internal Server Eroor'})
  }
})

module.exports = router;
