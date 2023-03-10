// Declare an object called submitObj which will be used to hold car data from the

const carInv = [];
// car seeds file
let submitObj = {
  make: [],
  model: [],
  price: [],
  milage: [],
  year: [],
  body_type: [],
};
// Define a function called getFilterE1 that takes an argument "el" and sends
// a GET request to the server which retreives filter options for the element.
// The function returns a promise which will resolve the response data
const getFilterEl = (el) =>
  fetch(`/api/${el}/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

// Define a function called getFilteredSearch that takes an argument 'el'and sends
// a GET request to the server to retrieve search results that match
// the given filter options. The function returns a promise that will resolve to
// the response data
const getFilteredSearch = (el) =>
  fetch(`/api/search/all/${el}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

// Call the getFilterEl function with the argument 'makes'. When the response is
// received, retrieve the first key in the data object and call the generateList
// function with the key and data
getFilterEl("makes").then((data) => {
  // Start at the initial data from array 0
  const firstKey = Object.keys(data[0])[0];
  generateList(firstKey, data);
});

getFilterEl("models").then((data) => {
  // Start at the initial data from array 0
  const firstKey = Object.keys(data[0])[0];
  generateModelListInit(firstKey, data);
});

// Define a function called generateList that takes a key and data object as
// arguments. The function generates a list of items based on the data object
// and appends it to the DOM under the corresponding key
function generateList(firstKey, data) {
  data.forEach((element) => {
    let makesListEl = document.querySelector(`#${firstKey}-list`);
    let liEl = document.createElement("li");
    let spanEl = document.createElement("span");
    let inputEl = document.createElement("input");
    let labelEl = document.createElement("label");
    liEl.classList.add("list-group-item");
    spanEl.classList.add("toggle-btn");
    inputEl.setAttribute("type", "checkbox");
    inputEl.setAttribute("id", `${element.make}`);
    inputEl.setAttribute("name", `make`);
    labelEl.setAttribute("for", `${element.make}`);
    liEl.textContent = element.make;
    spanEl.appendChild(inputEl);
    spanEl.appendChild(labelEl);
    liEl.appendChild(spanEl);
    makesListEl.appendChild(liEl);
  });
}

// Define a function called generateBodyType that takes a key and data object
// as arguments. The function generates a list of items based on the data object
//  and appends it to the DOM under the corresponding key
function generateBodyType(firstKey, data) {
  data.forEach((element) => {
    let makesListEl = document.querySelector(`#${firstKey}-list`);
    let liEl = document.createElement("li");
    let spanEl = document.createElement("span");
    let inputEl = document.createElement("input");
    let labelEl = document.createElement("label");
    liEl.classList.add("list-group-item");
    spanEl.classList.add("toggle-btn");
    inputEl.setAttribute("type", "checkbox");
    inputEl.setAttribute("id", `${element.body_type}`);
    inputEl.setAttribute("name", `body_type`);
    labelEl.setAttribute("for", `${element.body_type}`);
    liEl.textContent = element.body_type;
    spanEl.appendChild(inputEl);
    spanEl.appendChild(labelEl);
    liEl.appendChild(spanEl);
    makesListEl.appendChild(liEl);
  });
}

// Define a function called generateModel that takes a key and data object
// as arguments. The function generates a list of items based on the data object
//  and appends it to the DOM under the corresponding key
var filteredModels = "";
function generateModel() {
  filteredModels = carInv[0]
    .filter((car) => submitObj.make.includes(car.make))
    .map((car) => car.model);

  console.log(filteredModels);
  if (!filteredModels[0]) {
    getFilterEl("models").then((data) => {
      // Start at the initial data from array 0
      const firstKey = Object.keys(data[0])[0];
      generateModelListInit("model", data);
    });
    return;
  } else {
    generateModelList("model", filteredModels);
  }
}

function generateModelListInit(firstKey, data) {
  !document.querySelector("#model-list").innerHTML
    ? console.log("empty")
    : (document.querySelector("#model-list").innerHTML = "");
  data.forEach((element) => {
    let makesListEl = document.querySelector(`#${firstKey}-list`);
    let liEl = document.createElement("li");
    let spanEl = document.createElement("span");
    let inputEl = document.createElement("input");
    let labelEl = document.createElement("label");
    liEl.classList.add("list-group-item");
    spanEl.classList.add("toggle-btn");
    inputEl.setAttribute("type", "checkbox");
    inputEl.setAttribute("id", `${element.model}`);
    inputEl.setAttribute("name", `model`);
    labelEl.setAttribute("for", `${element.model}`);
    liEl.textContent = element.model;
    spanEl.appendChild(inputEl);
    spanEl.appendChild(labelEl);
    liEl.appendChild(spanEl);
    makesListEl.appendChild(liEl);
  });
}

function generateModelList(firstKey, data) {
  !document.querySelector("#model-list").innerHTML
    ? console.log("empty")
    : (document.querySelector("#model-list").innerHTML = "");
  data.forEach((element) => {
    let makesListEl = document.querySelector(`#${firstKey}-list`);

    let liEl = document.createElement("li");
    let spanEl = document.createElement("span");
    let inputEl = document.createElement("input");
    let labelEl = document.createElement("label");
    liEl.classList.add("list-group-item");
    spanEl.classList.add("toggle-btn");
    inputEl.setAttribute("type", "checkbox");
    inputEl.setAttribute("id", `${element}`);
    inputEl.setAttribute("name", `model`);
    labelEl.setAttribute("for", `${element}`);
    liEl.textContent = element;
    spanEl.appendChild(inputEl);
    spanEl.appendChild(labelEl);
    liEl.appendChild(spanEl);
    makesListEl.appendChild(liEl);
  });
}

// Filer the data for body_types and generate a list
getFilterEl("body_types").then((data) => {
  const firstKey = Object.keys(data[0])[0];
  generateBodyType(firstKey, data);
});

// Gets filter data for years, sorts it in ascending order, and generates a
// list of options for both forms within the year option
getFilterEl("years").then((data) => {
  let yearArr = [];
  data.forEach((element) => {
    yearArr.push(element.year);
  });
  yearArr.sort(function (a, b) {
    return a - b;
  });
  let forms = document.querySelectorAll(".year-form"); // use "." to select by class
  forms.forEach((form) => {
    yearArr.forEach((num) => {
      let optionEl = document.createElement("option");
      optionEl.value = num;
      optionEl.textContent = `${num}`;
      form.appendChild(optionEl);
    });
  });
});

{
  /* <div class="card me-3" style="width: 18rem;">
            <img class="card-img-top" src="..." alt="Card image cap">
            <div class="card-body">
              <h5 id="car-title" class="card-title">2013 Mercedes-Benz E-Class E400 Auto</h5>
              <h6 id="price" class="card-title">$48,950</h6>
              <p id="description" class="card-text">Some quick example text to build on the card title and make up the
                bulk of the card's
                content.</p>
            </div>
            <ul class="list-group list-group-flush">
              <li id="mileage" class="list-group-item">76,533 km</li>
              <li class="list-group-item">Autmatic</li>
              <li class="list-group-item">Convertible</li>
            </ul>
            <div class="card-body">
              <a href="#" class="card-link">Card link</a>
              <a href="#" class="card-link">Another link</a>
            </div>
          </div> */
}

// Generates the template for a card based on inventory data
const generateCardTemplate = (data) => {
  data.forEach((element) => {
    // create card div
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "me-3", "card-spacing");
    cardDiv.style.width = "18rem";

    // Create image el
    const imgEl = document.createElement("img");
    imgEl.classList.add("card-img-top");
    imgEl.src = `${element.image_url}`;
    // abewd: this is how we display the user id
    console.log(element);
    let userEmail = element.user.email;
    let userName = element.user.name;
    // console.log(userEmail);
    // console.log(userName);
    cardDiv.appendChild(imgEl);
    // testing user id
    user_id = element.user_id;
    // Add event listener to the image element
    imgEl.addEventListener("click", function () {
      const modal = document.createElement("div");
      modal.classList.add("modalimg");
      modal.classList.add("modalimg");
      const modalImg = document.createElement("img");
      modalImg.src = imgEl.src;
      modal.appendChild(modalImg);
      document.body.appendChild(modal);
      // Remove the modal when the user clicks outside of the image
      modal.addEventListener("click", function () {
        document.body.removeChild(modal);
      });
    });

    // Create image el

    // Create a div for card body
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");
    cardDiv.appendChild(cardBodyDiv);

    // Create a h5 element for the car title, set its id and class attributes,
    // and add it to the card body
    const carMakeEl = document.createElement("h5");
    carMakeEl.id = `${element.make}`;
    carMakeEl.classList.add("card-title");
    carMakeEl.textContent = `${element.make.toUpperCase()} ${element.model} `;
    cardBodyDiv.appendChild(carMakeEl);

    // Create a h6 element for the price, set its id and class attributes,
    // and add it to the card body
    const priceEl = document.createElement("h6");
    priceEl.id = "price";
    priceEl.classList.add("card-title");
    priceEl.textContent = `$${element.price.toLocaleString()}`;
    cardBodyDiv.appendChild(priceEl);

    // Create a p element for the description, set its id and class attributes,
    // and add it to the card body
    const descriptionEl = document.createElement("p");
    descriptionEl.id = "description";
    descriptionEl.classList.add("card-text");
    descriptionEl.textContent = element.car_description;
    cardBodyDiv.appendChild(descriptionEl);

    // Create a ul element for the list group and set its class attribute
    const listGroupUl = document.createElement("ul");
    listGroupUl.classList.add("list-group", "list-group-flush");
    cardDiv.appendChild(listGroupUl);

    // Create li elements for the list group, set their ids and class attributes,
    // and add them to the list group
    const mileageLi = document.createElement("li");
    mileageLi.id = "mileage";
    mileageLi.classList.add("list-group-item");
    mileageLi.textContent = `Milage: ${element.mileage} km`;
    listGroupUl.appendChild(mileageLi);

    // Create li elements for the transmission group, set their ids and class attributes,
    // and add them to the list group
    const automaticLi = document.createElement("li");
    automaticLi.classList.add("list-group-item");
    if (element.automatic) {
      automaticLi.textContent = "Transmission: Automatic";
    } else {
      automaticLi.textContent = "Transmission: Manual";
    }
    listGroupUl.appendChild(automaticLi);

    // Create li elements for the body type group, set their ids and class attributes,
    // and add them to the list group
    const bodyTypeLi = document.createElement("li");
    bodyTypeLi.classList.add("list-group-item");
    bodyTypeLi.textContent = `Body-type: ${element.body_type}`;
    listGroupUl.appendChild(bodyTypeLi);

    const userDetailsli = document.createElement("li");
    userDetailsli.classList.add("list-group-item");
    userDetailsli.textContent = `${userName}: ${userEmail}`;
    listGroupUl.appendChild(userDetailsli);

    const carIdLi = document.createElement("li");
    carIdLi.classList.add("list-group-item");
    carIdLi.textContent = `Car ID: ${element.id}`;
    listGroupUl.appendChild(carIdLi);
    // Create a div element for the card body and set its class attribute
    const cardBodyDiv2 = document.createElement("div");
    cardBodyDiv2.classList.add("card-body");
    cardBodyDiv2.classList.add("text-center");
    cardDiv.appendChild(cardBodyDiv2);

    // Create two a elements for card links, set their class attributes,
    // Create a modal element
    const button = document.createElement("button");
    button.innerText = "Contact Seller";
    button.setAttribute("class", "btn btn-link");
    button.setAttribute("value", element.id);
    // Creates event listener to generate modal..
    button.addEventListener("click", function () {
      const email = element.user.email;
      const subject = "Car Inquiry";
      window.location.href =
        "mailto:" + email + "?subject=" + encodeURIComponent(subject);
    });

    cardBodyDiv2.appendChild(button);

    document.addEventListener("click", function (event) {
      if (
        event.target.classList.contains("close") &&
        event.target.parentNode.parentNode.classList.contains("modal-c")
      ) {
        event.target.parentNode.parentNode.remove();
      } else if (
        event.target.classList.contains("modal") &&
        event.target.classList.contains("modal-c")
      ) {
        event.target.remove();
      }
    });

    const containerEl = document.querySelector("#card-container");
    containerEl.appendChild(cardDiv);
  });
};

// This function makes a GET request and generates a card template for the data
// returned
const generateCard = () => {
  fetch(`/api/inventory`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      carInv.pop();
      carInv.push(data);
      generateCardTemplate(data);
    });
};

// This function is an event listener that listens for clicks on the "make-search"
// button and populates the "make" field of the search form
document.addEventListener("DOMContentLoaded", function () {
  const makeSubmitEl = document.getElementById("make-search");

  makeSubmitEl.addEventListener("click", function () {
    submitObj.model = [];
    submitObj.make = [];
    const checkedInputs = document.querySelectorAll(
      'input[name="make"]:checked'
    );
    console.log(checkedInputs[0]);
    if (!checkedInputs[0]) {
      getFilterEl("models").then((data) => {
        console.log(data);
        // Start at the initial data from array 0
        const firstKey = Object.keys(data[0])[0];
        generateModelListInit(firstKey, data);
      });
    }
    checkedInputs.forEach((input) => {
      if (submitObj.make.includes(input.id)) {
        return;
      }
      submitObj.make.push(input.id);
      generateModel(); // or whatever you want to do with the checked input
    });
  });
});

// This function is an event listener that listens for clicks on the "body_type-search"
//  button and populates the "year" field of the search form
document.addEventListener("DOMContentLoaded", function () {
  const makeSubmitEl = document.getElementById("body_type-search");

  makeSubmitEl.addEventListener("click", function () {
    submitObj.body_type = [];
    const checkedInputs = document.querySelectorAll(
      'input[name="body_type"]:checked'
    );
    checkedInputs.forEach((input) => {
      if (submitObj.body_type.includes(input.id)) {
        return;
      }
      submitObj.body_type.push(input.id);
      console.log(input.id); // or whatever you want to do with the checked input
    });
    console.log(submitObj);
  });
});

// This function is an event listener that listens for clicks on the "year-search"
//  button and populates the "year" field of the search form
document.addEventListener("DOMContentLoaded", function () {
  const makeSubmitEl = document.getElementById("year-search");

  makeSubmitEl.addEventListener("click", function () {
    submitObj.year = [];
    const fromYear = document.getElementById("from-select").value;
    const toYear = document.getElementById("to-select").value;

    submitObj.year.push({ from: fromYear, to: toYear });
    console.log(submitObj);
  });
});

// This function is an event listener that listens for clicks on the
// "price-search" button and populates the "price" field of the search form
document.addEventListener("DOMContentLoaded", function () {
  const makeSubmitEl = document.getElementById("price-search");

  makeSubmitEl.addEventListener("click", function () {
    submitObj.price = [];
    const fromPrice = document.getElementById("price-from").value;
    const toPrice = document.getElementById("price-to").value;

    submitObj.price.push({ from: fromPrice, to: toPrice });
    console.log(submitObj);
  });
});

// This function is an event listener that listens for clicks on the
// "mileage-search" button and populates the "mileage" field of the search form
document.addEventListener("DOMContentLoaded", function () {
  const makeSubmitEl = document.getElementById("milage-search");

  makeSubmitEl.addEventListener("click", function () {
    submitObj.milage = [];
    const fromPrice = document.getElementById("milage-from").value;
    const toPrice = document.getElementById("milage-to").value;

    submitObj.milage.push({ from: fromPrice, to: toPrice });
    console.log(submitObj);
  });
});

const searchSuggestionEl = document.querySelector(".suggestion");

// This function is an event listener that listens for clicks on the
// "model-search" button and populates the "model" field of the search formdocument.addEventListener("DOMContentLoaded", function () {
document.addEventListener("DOMContentLoaded", function () {
  const makeSubmitEl = document.getElementById("model-search");

  makeSubmitEl.addEventListener("click", function () {
    submitObj.model = [];
    const checkedInputs = document.querySelectorAll(
      'input[name="model"]:checked'
    );
    checkedInputs.forEach((input) => {
      if (submitObj.model.includes(input.id)) {
        return;
      }
      submitObj.model.push(input.id);
      console.log(input.id); // or whatever you want to do with the checked input
    });
    console.log(submitObj);
  });
});
// This function is an event listener that listens for clicks on the
// "filter-search" button and populates the "filter" field of the search form
document.addEventListener("DOMContentLoaded", function () {
  const makeSubmitEl = document.getElementById("filter-search");

  makeSubmitEl.addEventListener("click", function () {
    var makeStr = submitObj.make ? submitObj.make.join(",") : "";

    var bodyTypeStr = submitObj.body_type ? submitObj.body_type.join(",") : "";
    // Check if submitObj.model is defined before accessing its join() method
    var modelStr = submitObj.model ? submitObj.model.join(",") : "";

    // Check if submitObj.year is defined and has the required properties before accessing them
    var minYear =
      submitObj.year && submitObj.year[0] && submitObj.year[0].from
        ? submitObj.year[0].from
        : "";
    var maxYear =
      submitObj.year && submitObj.year[0] && submitObj.year[0].to
        ? submitObj.year[0].to
        : "";

    // Check if submitObj.milage is defined and has the required properties before accessing them
    var minMilage =
      submitObj.milage && submitObj.milage[0] && submitObj.milage[0].from
        ? submitObj.milage[0].from
        : "";
    var maxMilage =
      submitObj.milage && submitObj.milage[0] && submitObj.milage[0].to
        ? submitObj.milage[0].to
        : "";

    // Check if submitObj.price is defined and has the required properties before accessing them
    var minPrice =
      submitObj.price && submitObj.price[0] && submitObj.price[0].from
        ? submitObj.price[0].from
        : "";
    var maxPrice =
      submitObj.price && submitObj.price[0] && submitObj.price[0].to
        ? submitObj.price[0].to
        : "";

    // Construct the API URL with the search query parameters
    var apiUrl = `/api/search/all/?make=${makeStr}&model=${modelStr}&year_min=${minYear}&year_max=${maxYear}&mileage_min=${minMilage}&mileage_max=${maxMilage}&price_min=${minPrice}&price_max=${maxPrice}&body_type=${bodyTypeStr}`;
    console.log(apiUrl);
    // Make the API request
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          // add CAR NOT FOUND to Card Container
          document.getElementById("card-container").innerHTML = "";
        }
        console.log(data);
        document.getElementById("card-container").innerHTML = "";
        generateCardTemplate(data);
      });
  });
});

const searchInput = document.querySelector("#search-input");
const autofillContainer = document.querySelector("#autofill-container");

// This code adds an event listener to the search input field that listens for input changes. When a change occurs, the code attempts to perform a search using the value entered into the search input field. It does this by filtering through an array of car objects based on the entered search query. The code then sorts the filtered results by the make of the car and appends each filtered result to an autofill container as a suggestion.
searchInput.addEventListener("input", (e) => {
  try {
    const query = event.target.value.toLowerCase();
    const cars = carInv[0];
    const filteredCars = cars.filter((car) => {
      return Object.values(car).some((value) => {
        return String(value).toLocaleLowerCase().includes(query);
      });
    });
    filteredCars.sort((a, b) => {
      return a.make.localeCompare(b.make);
    });
    autofillContainer.innerHTML = "";
    filteredCars.forEach((car) => {
      const suggestion = document.createElement("div");
      suggestion.classList.add("suggestion");
      suggestion.classList.add("dropdown-item");
      suggestion.setAttribute("value", `${car.id}`);
      suggestion.textContent = `${car.make} ${car.model} (${car.year}) $${car.price}`;
      autofillContainer.appendChild(suggestion);
      suggestion.addEventListener("click", function (event) {
        let carId = event.target.getAttribute("value");
        let filteredCar = carInv[0].filter((car) => {
          return car.id == carId;
        });
        filteredCar = filteredCar[0];

        let transmission = filteredCar.automatic ? "Automatic" : "manual";
        let petrol = filteredCar.fossil_fuel ? "Petrol" : "Electric";
        console.log(filteredCar);
        const modalId = `modal-${carId}`;
        const existingModal = document.getElementById(modalId);
        if (existingModal) {
          existingModal.style.display = "block";
        } else {
          const modal = document.createElement("div");
          modal.classList.add("modal");
          modal.classList.add("viewMoreModal");
          modal.style.display = "flex";
          modal.setAttribute("id", modalId);

          const modalContent = document.createElement("div");
          modalContent.classList.add("modal-content");
          modalContent.classList.add("viewMoreContent");
          modalContent.classList.add("center-content");

          // Displays the image on the modal
          const carImageEl = document.createElement("img");
          carImageEl.classList.add("rounded", "mx-auto", "d-block");
          carImageEl.src = filteredCar.image_url;
          carImageEl.alt = `${filteredCar.make} ${filteredCar.model} image`;
          carImageEl.style.maxWidth = "400px";
          modalContent.appendChild(carImageEl);

          // Displays the make on the modal
          const carMakeEl = document.createElement("h2");
          carMakeEl.classList.add("font-weight-bold", "text-center");
          carMakeEl.textContent = `${filteredCar.make.toUpperCase()} ${
            filteredCar.model
          }`;
          modalContent.appendChild(carMakeEl);

          // Creates a container
          const infoContainer = document.createElement("div");
          infoContainer.classList.add("info-container");
          infoContainer.style.display = "flex";
          infoContainer.style.flexDirection = "column";
          modal.appendChild(infoContainer);

          // Displays the price on the modal
          const carPriceEl = document.createElement("h4");
          carPriceEl.classList.add("font-weight-bold");
          carPriceEl.textContent = `$${filteredCar.price.toLocaleString()}`;
          carPriceEl.style.justifyContent = "flex-start";
          carPriceEl.style.alignItems = "center";
          infoContainer.appendChild(carPriceEl);

          // Displays the mileage on the modal
          const carMileageEl = document.createElement("p");
          carMileageEl.textContent = `${filteredCar.mileage}km`;
          carMileageEl.style.justifyContent = "flex-start";
          carMileageEl.style.alignItems = "center";
          infoContainer.appendChild(carMileageEl);

          // Displays the fuel on the modal
          const carFuelEl = document.createElement("p");
          carFuelEl.textContent = `${petrol}`;
          carFuelEl.style.justifyContent = "flex-start";
          carFuelEl.style.alignItems = "center";
          infoContainer.appendChild(carFuelEl);

          // Displays the transmission on the modal
          const carTransmissionEl = document.createElement("p");
          carTransmissionEl.textContent = `${transmission}`;
          carTransmissionEl.style.justifyContent = "flex-start";
          carTransmissionEl.style.alignItems = "center";
          infoContainer.appendChild(carTransmissionEl);

          // Displays the cylinders on the modal
          const carCylindersEl = document.createElement("p");
          carCylindersEl.textContent = `${filteredCar.engine_cylinders} Cylinders`;
          carCylindersEl.style.justifyContent = "flex-start";
          carCylindersEl.style.alignItems = "center";
          infoContainer.appendChild(carCylindersEl);

          // Displays the description on the modal
          const carDescriptionEl = document.createElement("p");
          carDescriptionEl.textContent = `${filteredCar.car_description}`;
          carDescriptionEl.style.justifyContent = "flex-start";
          carDescriptionEl.style.alignItems = "center";
          infoContainer.appendChild(carDescriptionEl);

          modalContent.appendChild(infoContainer);
          modal.appendChild(modalContent);
          document.body.appendChild(modal);
          modal.style.display = "block";
          modalContent.style.maxWidth = "50%";
        }
        document.addEventListener("click", function (event) {
          if (
            event.target.classList.contains("close") &&
            event.target.parentNode.parentNode.id === modalId
          ) {
            event.target.parentNode.parentNode.remove();
          } else if (
            event.target.classList.contains("modal") &&
            event.target.id === modalId
          ) {
            event.target.remove();
          }
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("autofill-container");
  // console.log(event.target);
  dropdown.innerHTML = "";
  // }
});

const editRedirect = async () => {
  document.location.replace("/editInventory");
};

document
  .querySelector("#edit-inventory")
  .addEventListener("click", editRedirect);
// // Call the generateCard function you just spend almost 500 lines writing

// document.querySelector("#closeModal").addEventListener("click", function () {
//   var myModal = new bootstrap.Modal(document.getElementById("makeModal"), {
//     keyboard: false,
//   });
//   console.log(myModal);
//   myModal.delete();
// });
generateCard();
