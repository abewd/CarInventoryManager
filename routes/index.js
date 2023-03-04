// This will link the inventory and car functions to the server
const router = require("express").Router();
const withAuth = require("../utils/auth");
const apiRoutes = require("./api");

const path = require("path");

router.use("/api", apiRoutes);

router.get("/", withAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/login.html"));
});

router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/contact.html"));
});

module.exports = router;
