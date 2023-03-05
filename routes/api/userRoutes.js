// Import router from the express framework
const router = require("express").Router();

// Import a module called User from the following directory
const { User } = require("../../models");

// Handle POST requests to the "/login" URL
router.post("/login", async (req, res) => {
  try {
    // Find the user with the specified email address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      // If no user is found, send a JSON response with a 400 status code and an error message
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Check if the provided password matches the hashed password in the database
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is invalid, send a JSON response with a 400 status code and an error message
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    // If the user is found and the password is valid, save the user ID and logged_in flag to the session object
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Send a JSON response with the user data and a success message
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Handle POST requests to the "/logout" URL
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Export this data so it can be used in other parts of the codebase
module.exports = router;
