// Import Model and DataTypes from Sequelize
const { Model, DataTypes } = require("sequelize");

// Import bcrypt for password hashing
const bcrypt = require("bcrypt");

// Import the connection file
const sequelize = require("../config/connection");

// Initialise the User model and extend off the Sequelize Model class
class User extends Model {
  // Define a method for checking password against a hashed password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// Define allowable parameters for the id, name, password and email
// Initialise the User parameters
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      // Define hooks to automatically hash passwords before creating
      // and updating the user data
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

// Export the User model to be used in other parts of the codebase
module.exports = User;
