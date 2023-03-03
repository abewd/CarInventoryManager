// function gets filter options with the el being the variable route
const getFilterEl = (el) =>
  fetch(`/api/${el}/all`, {
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
    inputEl.setAttribute("type", "radio");
    inputEl.setAttribute("id", `${element.make}`);
    inputEl.setAttribute("name", `${element.make}`);
    labelEl.setAttribute("for", `${element.make}`);
    liEl.textContent = element.make;
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

const generateCard = () => {};
