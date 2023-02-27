const { cars } = require("../models");

// TAG, CAN YOU PLEASE SIMILARLY ADD ANOTHER 10-15-20 EXAMPLES OF CARS
// IF YOU DONT KNOW WHAT CARS TO CHOOSE,

const carsData = [
  {
    id: "",
    make: "Toyota",
    model: "Supra",
    year: 1998,
    price: 175000,
    mileage: 105000,
    fossil_fuel: true,
    automatic: true,
    engine_cylinders: 6,
    color: "Yellow",
    body_type: "Coupe",
    car_description: "Great car, would recommend. Drive so NICE! :D",
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
