// Importing the `Router` function from the Express.js framework
const router = require("express").Router();
// Importing User models from the models directory
const { User } = require("../../models");
// Importing withAuth middleware to assit with authentication for passwords
const withAuth = require("../../utils/auth");

// Handle GET requests to the root URL "/"
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });

    // Map the user data to plain objects and store in an array called 'users'
    const users = userData.map((project) => project.get({ plain: true }));

    // Render the homepage with Users const and "loggin_in"
    res.render("homepage", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Handle GET requests to the "/login" URL
router.get("/login", (req, res) => {
  // If already loggin in then send to homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  // Render login page
  res.render("login");
});

// Export this data so it can be used in other parts of the codebase
module.exports = router;
