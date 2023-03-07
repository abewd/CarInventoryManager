$(document).ready(function () {
  // Handle the submit button for the edit car ID modal
  $("#editCarIdButton").click(function () {
    var carId = $("#carIdEditInput").val();
    if (!carId) {
      alert("Please enter a car ID");
      return;
    }
    // Fetch the data from the server using the car ID
    fetch(`/api/${carId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Load the car data into the edit modal
        var carMake = data.make;
        var carModel = data.model;
        var carYear = data.year;
        var carPrice = data.price;
        var carMileage = data.mileage;
        var carFuel = data.fossil_fuel ? "Petrol" : "EV";
        var carTransmission = data.automatic ? "Automatic" : "Manual";

        var carEngineCylinder = data.engine_cylinders;
        var carColor = data.color;
        var carBodyType = data.body_type;
        var carDescription = data.car_description;

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
        $("#fuelSelect").val(carFuel.toLowerCase());
        $("#transmissionSelect").val(carTransmission.toLowerCase());
        // Hide the edit car ID modal
        $("#editCarModal").modal("hide");
        // Show the edit car modal
        $("#editModal").modal("show");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to fetch car data. Please try again later.");
      });
  });
  // TODO: Use car ID to load car data into edit modal
  // For now, just manually set some car data

  // Load the car data into the edit modal

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
    var carId = $("#carIdEditInput").val();
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

    var updatedCar = {
      id: carId,
      make: carMake,
      model: carModel,
      year: carYear,
      price: carPrice,
      mileage: carMileage,
      fossil_fuel: carFuel == "Petrol" ? true : false,
      automatic: carTransmission == "Automatic" ? true : false,
      engine_cylinders: carEngineCylinder,
      color: carColor,
      body_type: carBodyType,
      car_description: carDescription,
    };

    console.log(carId);

    fetch(`/api/${carId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCar),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to update car");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert("Car updated SuccessFully");
        $("#editModal").modal("hide");
      })
      .catch((error) => {
        console.error(error);
        // Display an error message to the user
        alert("Failed to update car. Please try again later.");
      });
  });
});

// Handle the save button for the edit car modal

$(document).ready(function () {
  $("#deleteButton").click(function () {
    var carId = $("#carIdInput").val();
    console.log(carId);

    // Make a Fetch request to the server to delete the car with the specified ID
    fetch(`/api/${carId}`, {
      method: "DELETE",
    })
      .then(function (response) {
        if (response.status === 204) {
          alert("Car with ID " + carId + " has been deleted.");
          $("#deleteModal").modal("hide");
        } else if (response.status === 404) {
          alert("Car not found.");
        } else {
          throw new Error("Error deleting car.");
        }
      })
      .catch(function (error) {
        console.error(error);
        alert("Error deleting car: " + error);
      });
  });
});

$(document).ready(function () {
  $("#addModal").on("show.bs.modal", function (event) {
    var modal = $(this);
    modal.find(".modal-title").text("Add Car");
  });

  $("#addButton").click(function () {
    var carMake = $("#makeInput2").val();
    var carModel = $("#modelInput2").val();
    var carYear = $("#yearInput2").val();
    var carPrice = $("#priceInput2").val();
    var carMileage = $("#mileageInput2").val();
    var carFuel = $("#fuelSelect2").val();
    var carTransmission = $("#transmissionSelect2").val();
    var carEngineCylinder = $("#engineCylinderInput2").val();
    var carColor = $("#colorInput2").val();
    var carBodyType = $("#bodyTypeInput2").val();
    var carDescription = $("#descriptionInput2").val();

    var newCar = {
      make: carMake,
      model: carModel,
      year: carYear,
      price: carPrice,
      mileage: carMileage,
      fossil_fuel: carFuel == "Petrol" ? true : false,
      automatic: carTransmission == "Automatic" ? true : false,
      engine_cylinders: carEngineCylinder,
      color: carColor,
      body_type: carBodyType,
      car_description: carDescription,
    };

    console.log(newCar);

    fetch("/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar),
    })
      .then(function (response) {
        if (response.status === 201) {
          alert("New car has been added.");
          $("#addModal").modal("hide");
        } else {
          throw new Error("Error adding new car.");
        }
      })
      .catch(function (error) {
        console.error(error);
        alert("Error adding new car: " + error);
      });
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
