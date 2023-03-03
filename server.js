const express = require("express");
const routes = require("./routes");
const path = require("path");
// import sequelize connection
const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(routes);
// console.log(process.env.DB_USER);
// add any middlewear if we need it

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/html/index.html"))
);
// sync sequelize models to the database, then turn on the server
// Not resetting databse
// this is how we connect the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening at port http://localhost:${PORT}`);
  });
});
