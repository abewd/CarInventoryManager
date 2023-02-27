DROP DATABASE IF EXISTS carInventoryDB;

CREATE DATABASE carInventoryDB;

USE carInventoryDB;

DROP TABLE IF EXISTS cars;

CREATE TABLE userID (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   note: we may need a password here, unsure ...
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  make VARCHAR(30) NOT NULL, 
  model VARCHAR(30) NOT NULL,
  year INT NOT NULL, 
  price DECIMAL NOT NULL, 
  mileage INT NOT NULL,
  fossil_fuel BOOLEAN NOT NULL,
  automatic BOOLEAN NOT NULL,
  engine_cylinders DECIMAL NOT NULL,
  color VARCHAR(30) NOT NULL,
  body_type VARCHAR(30) NOT NULL,
  car_description TEXT NOT NULL,
);