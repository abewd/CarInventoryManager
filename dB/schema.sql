-- Use the carInventoryDB --
USE carInventoryDB;

-- Delete the carInventoryDB if it already exists to prevent conflicts --
DROP DATABASE IF EXISTS carInventoryDB;

-- Delete the cars and users table if it already exists to prevent conflicts --
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS user;

-- Create the carInventoryDB if it does not exist --
CREATE DATABASE carInventoryDB;
USE carInventoryDB;