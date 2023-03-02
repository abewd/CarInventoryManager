const express = require("express");
const routes = require("./routes");
// import sequelize connection
const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// add any middlewear if we need it

// sync sequelize models to the database, then turn on the server
// Not resetting databse
// this is how we connect the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
