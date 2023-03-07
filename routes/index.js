// This will link the inventory and car functions to the server
const router = require("express").Router();

// Importing withAuth middleware to assit with authentication for passwords
const withAuth = require("../utils/auth");

// Create a module called apiRoutes which uses the following routing
const apiRoutes = require("./api");
const path = require("path");
const { route } = require("./api");
router.use("/api", apiRoutes);

// Handle GET requests to the "/" URL
router.get("/", withAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

// Handle GET requests to the "/login" URL
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/login.html"));
});

// Handle GET requests to the "/contact" URL
router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/contact.html"));
});

router.get("/editInventory", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/editInventory.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public.html/register.html"));
});

// Export this data so it can be used in other parts of the codebase
module.exports = router;
