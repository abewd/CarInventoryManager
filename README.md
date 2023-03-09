# Car Inventory Manager <img src = 'https://img.shields.io/badge/license-MIT-red'/>

## URLs

Heroku link: https://sleepy-ridge-65976.herokuapp.com/
GitHub repository: https://github.com/abewd/CarInventoryManager

## Description

This is a full stack application for a car sales website that allows users to view, add, edit, and delete car listings. The application is built using Node.js and Express for the backend, and JavaScript, HTML, and CSS for the frontend. The application uses the MYSQL database to store and retrieve data.

## Technologies

The technologies used in this project include:

- JavaScript
- HTML
- CSS
- bootstrap
- Node.js
- Express
- Sequielizer
- MYSQL database
- Azure
- Heroku

## Table of contents

- [description](#description)
- [Technologies](#technologies)
- [installation](#installation)
- [usage](#usage)
- [license](#license)
- [contributors](#contributors)
- [tests](#tests)
- [questions](#questions)

## Installation

To install the required packages to run the application on a local server, perform the following:

- Open an integrated terminal in server.js and run "npm i"
- inside of the .env file input your username and password
- in your schema.sql open an integrated terminal and run "mysql -u root -p" and then "source.schema.sql" to create the tables
- In your json seed files for the credentials and the inventory, run "npm run seed" to populate the tables
- run "npm start" in the server.js to deploy the application to the 3001 port.

## Usage

This application is aimed at individuals who operate a dealership or are viewing the inventory of a dealership.
It fulfils the function of viewing and oberseving inventory, whilst narrowing down specific cars which interest you. You can filter searches based on make, model, year, mileage, etc. This is suitable for dealers who have a large inventory who cannot recall every car, yet can rely on this application to filter through all of their options.

The first step is to register yourself as a user on our login page, if you don't already have a user login:

![Alt text](../img1.png)

Alternatively, this is the register page where you can create a name, email and a minimum of an 8 digit password:

![Alt text](../img2.png)

After you login, you can see our interface and available cars:

You can search using the side navbar, you can go to home, edit the inventory, contact the developers of the page, and logout from this page. You can also contact the unique seller for each unique car on this page also.

![Alt text](../img4.png)

You can add, edit and remove cars if you are the creator of them:

![Alt text](../img5.png)

You can contact the admins of the page and the developers using this form:

![Alt text](../img6.png)

And finally, in the navbar you can logout.

## License

MIT

## Questions

This application constructed, coded and meticulously put together by the following software engineers:

Abdullah Al Fadhly (Abewd)
Github: https://github.com/abewd

Edward Vaughn
https://github.com/E73707

Marwin Manlangit
https://github.com/Marwaynemclovin

## Questions

You can contact the developer(s) at the following email:

hi@abewd.com
