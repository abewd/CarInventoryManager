/* <li class="list-group-item">
                          <span class="toggle-btn">
                            <input type="radio" id="item1" name="car-brand">
                            <label for="item1"></label>
                          </span>
                          Aston Martin
                        </li> */

// const { response } = require("express");

document.getElementById("models");

const getNotes = () =>
  fetch("/api/inventory", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });

if (window.location.pathname === "/notes.html") {
  console.log("pathname is correct");
  getNotes();
}
