$(document).ready(async function () {
  // Handle the submit button for the edit car ID modal
  await $("#editCarIdButton").click(async function () {
    var carId = $("#carIdInput").val();

    await fetch(`/api/${carId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
    // TODO: Use car ID to load car data into edit modal
    // For now, just manually set some car data
    var carMake = "Honda";
    var carModel = "Civic";
    var carYear = "2022";
    var carPrice = "$25,000";
    var carMileage = "10,000";
    var carFuel = "petrol";
    var carTransmission = "manual";
    var carEngineCylinder = "4";
    var carColor = "blue";
    var carBodyType = "sedan";
    var carDescription = "This is a great car!";

    // Load the car data into the edit modal
    loadCarData(
      carId,
      carMake,
      carModel,
      carYear,
      carPrice,
      carMileage,
      carFuel,
      carTransmission,
      carEngineCylinder,
      carColor,
      carBodyType,
      carDescription
    );

    // Hide the edit car ID modal
    $("#editCarModal").modal("hide");

    // Show the edit car modal
    $("#editModal").modal("show");
  });

  // Function to load car data into edit modal
  function loadCarData(
    carId,
    carMake,
    carModel,
    carYear,
    carPrice,
    carMileage,
    carFuel,
    carTransmission,
    carEngineCylinder,
    carColor,
    carBodyType,
    carDescription
  ) {
    var modal = $("#editModal");

    // Set the modal title to show the car ID
    modal.find(".modal-title").text("Edit Car " + carId);

    // Set the values of the form inputs to the car data
    modal.find("#carIdInput").val(carId);
    modal.find("#makeInput").val(carMake);
    modal.find("#modelInput").val(carModel);
    modal.find("#yearInput").val(carYear);
    modal.find("#priceInput").val(carPrice);
    modal.find("#mileageInput").val(carMileage);
    modal.find("#fuelSelect").val(carFuel);
    modal.find("#transmissionSelect").val(carTransmission);
    modal.find("#engineCylinderInput").val(carEngineCylinder);
    modal.find("#colorInput").val(carColor);
    modal.find("#bodyTypeInput").val(carBodyType);
    modal.find("#descriptionInput").val(carDescription);
  }

  // Handle the save button for the edit car modal
  $("#saveButton").click(function () {
    var carId = $("#carIdInput").val();
    var carMake = $("#makeInput").val();
    var carModel = $("#modelInput").val();
    var carYear = $("#yearInput").val();
    var carPrice = $("#priceInput").val();
    var carMileage = $("#mileageInput").val();
    var carFuel = $("#fuelSelect").val();
    var carTransmission = $("#transmissionSelect").val();
    var carEngineCylinder = $("#engineCylinderInput").val();
    var carColor = $("#colorInput").val();
    var carBodyType = $("#bodyTypeInput").val();
    var carDescription = $("#descriptionInput").val();

    // TODO: Save the car data
    // For now, just show an alert
    alert("Changes to car with ID " + carId + " have been saved!");
  });
});

// Handle the save button for the edit car modal
$("#saveButton").click(function () {
  var carId = $("#carIdInput").val();
  var carMake = $("#makeInput").val();
  var carModel = $("#modelInput").val();
  var carYear = $("#yearInput").val();
  var carPrice = $("#priceInput").val();
  var carMileage = $("#mileageInput").val();
  var carFuel = $("#fuelSelect").val();
  var carTransmission = $("#transmissionSelect").val();
  var carEngineCylinder = $("#engineCylinderInput").val();
  var carColor = $("#colorInput").val();
  var carBodyType = $("#bodyTypeInput").val();
  var carDescription = $("#descriptionInput").val();

  // TODO: Save the car data
  // For now, just show an alert
  alert("Changes to car with ID " + carId + " have been saved.");
  $("#editModal").modal("hide");
});

$(document).ready(function () {
  $("#deleteButton").click(function () {
    var carId = $("#carIdInput").val();
    // Code to delete car from inventory using the carId goes here
    alert("Car with ID " + carId + " has been deleted.");
    $("#deleteModal").modal("hide");
  });
});

$(document).ready(function () {
  $("#addModal").on("show.bs.modal", function (event) {
    var modal = $(this);
    modal.find(".modal-title").text("Add Car");
  });

  $("#addButton").click(function () {
    var carMake = $("#makeInput").val();
    var carModel = $("#modelInput").val();
    var carYear = $("#yearInput").val();
    var carPrice = $("#priceInput").val();
    var carMileage = $("#mileageInput").val();
    var carFuel = $("#fuelSelect").val();
    var carTransmission = $("#transmissionSelect").val();
    var carEngineCylinder = $("#engineCylinderInput").val();
    var carColor = $("#colorInput").val();
    var carBodyType = $("#bodyTypeInput").val();
    var carDescription = $("#descriptionInput").val();
    // Code to add car to inventory using form inputs goes here
    alert("New car has been added.");
    $("#addModal").modal("hide");
  });
});

const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#logout").addEventListener("click", logout);
