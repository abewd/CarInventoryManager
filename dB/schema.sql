USE carInventoryDB;
DROP DATABASE IF EXISTS carInventoryDB;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS users;

CREATE DATABASE carInventoryDB;
USE carInventoryDB;

-- CREATE TABLE users (
-- id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
-- );

-- CREATE TABLE cars (
-- id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- make VARCHAR(30) NOT NULL,
-- model VARCHAR(30) NOT NULL,
-- years INT NOT NULL,
-- price DECIMAL NOT NULL,
-- mileage INT NOT NULL,
-- fossil_fuel BOOLEAN NOT NULL,
-- automatic BOOLEAN NOT NULL,
-- engine_cylinders DECIMAL NOT NULL,
-- color VARCHAR(30) NOT NULL,
-- body_type VARCHAR(30) NOT NULL,
-- car_description TEXT NOT NULL
-- );