let submitObj = {
  make: [],
  model: [],
  price: [],
  milage: [],
  year: [],
};
// function gets filter options with the el being the variable route
const getFilterEl = (el) =>
  fetch(`/api/${el}/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

const getFilteredSearch = (el) =>
  fetch(`/api/search/all/${el}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

getFilterEl("makes").then((data) => {
  const firstKey = Object.keys(data[0])[0];
  generateList(firstKey, data);
});

// function loops through the fetched data and generates checklist items
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

function generateModel(firstKey, data) {
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
// getFilterEl("models").then((data) => {
//   const firstKey = Object.keys(data[0])[0];
//   generateList(firstKey, data);
// });

getFilterEl("body_types").then((data) => {
  const firstKey = Object.keys(data[0])[0];
  generateList(firstKey, data);
});

// calls the getFilterEl function with years as the optional param. when the years are recieved, they are sorted in ascending order and a list of options is generated in both forms within the year option
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

const generateCardTemplate = (data) => {
  data.forEach((element) => {
    // create card div
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "me-3", "card-spacing");
    cardDiv.style.width = "18rem";

    // create image el
    const imgEl = document.createElement("img");
    imgEl.classList.add("card-img-top");
    imgEl.src = "...";
    imgEl.alt = "Card image cap";
    cardDiv.appendChild(imgEl);

    //create a div for card body
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");
    cardDiv.appendChild(cardBodyDiv);

    // Create a h5 element for the car title, set its id and class attributes, and add it to the card body
    const carMakeEl = document.createElement("h5");
    carMakeEl.id = `${element.make}`;
    carMakeEl.classList.add("card-title");
    carMakeEl.textContent = `${element.make}`;
    cardBodyDiv.appendChild(carMakeEl);

    // Create a h6 element for the price, set its id and class attributes, and add it to the card body
    const priceEl = document.createElement("h6");
    priceEl.id = "price";
    priceEl.classList.add("card-title");
    priceEl.textContent = `$${element.price.toLocaleString()}`;
    cardBodyDiv.appendChild(priceEl);

    // Create a p element for the description, set its id and class attributes, and add it to the card body
    const descriptionEl = document.createElement("p");
    descriptionEl.id = "description";
    descriptionEl.classList.add("card-text");
    descriptionEl.textContent = element.car_description;
    cardBodyDiv.appendChild(descriptionEl);

    // Create a ul element for the list group and set its class attribute
    const listGroupUl = document.createElement("ul");
    listGroupUl.classList.add("list-group", "list-group-flush");
    cardDiv.appendChild(listGroupUl);

    // Create li elements for the list group, set their ids and class attributes, and add them to the list group
    const mileageLi = document.createElement("li");
    mileageLi.id = "mileage";
    mileageLi.classList.add("list-group-item");
    mileageLi.textContent = `${element.mileage}`;
    listGroupUl.appendChild(mileageLi);

    const automaticLi = document.createElement("li");
    automaticLi.classList.add("list-group-item");
    if (element.automatic) {
      automaticLi.textContent = "Automatic";
    } else {
      automaticLi.textContent = "Manual";
    }
    listGroupUl.appendChild(automaticLi);

    const bodyTypeLi = document.createElement("li");
    bodyTypeLi.classList.add("list-group-item");
    bodyTypeLi.textContent = `${element.body_type}`;
    listGroupUl.appendChild(bodyTypeLi);

    // Create a div element for the card body and set its class attribute
    const cardBodyDiv2 = document.createElement("div");
    cardBodyDiv2.classList.add("card-body");
    cardDiv.appendChild(cardBodyDiv2);

    // Create two a elements for card links, set their class attributes, and add them to the card body
    const cardLink1 = document.createElement("a");
    cardLink1.href = "#";
    cardLink1.classList.add("card-link");
    cardLink1.textContent = "Card link";
    cardBodyDiv2.appendChild(cardLink1);

    const cardLink2 = document.createElement("a");
    cardLink2.href = "#";
    cardLink2.classList.add("card-link");
    cardLink2.textContent = "Another link";
    cardBodyDiv2.appendChild(cardLink2);

    const containerEl = document.querySelector("#card-container");
    containerEl.appendChild(cardDiv);
  });
};

const generateCard = () => {
  fetch(`/api/inventory`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      generateCardTemplate(data);
    });
};

document.addEventListener("DOMContentLoaded", function () {
  const makeSubmitEl = document.getElementById("make-search");

  makeSubmitEl.addEventListener("click", function () {
    submitObj.make = [];
    const checkedInputs = document.querySelectorAll(
      'input[name="make"]:checked'
    );
    checkedInputs.forEach((input) => {
      if (submitObj.make.includes(input.id)) {
        return;
      }
      submitObj.make.push(input.id);
      console.log(input.id); // or whatever you want to do with the checked input
    });
    console.log(submitObj);
  });
});

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

document.addEventListener("DOMContentLoaded", function () {
  const makeSubmitEl = document.getElementById("filter-search");

  makeSubmitEl.addEventListener("click", function () {
    var makeStr = submitObj.make ? submitObj.make.join(",") : "";

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
    var apiUrl = `/api/search/all/?make=${makeStr}&model=${modelStr}&year_min=${minYear}&year_max=${maxYear}&mileage_min=${minMilage}&mileage_max=${maxMilage}&price_min=${minPrice}&price_max=${maxPrice}`;
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

getFilterEl("models").then((data) => {
  const firstKey = Object.keys(data[0])[0];
  console.log(firstKey);
  console.log();
  generateModel(firstKey, data);
});

generateCard();
