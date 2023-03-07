$(document).ready(function () {
  $("#editModal").on("show.bs.modal", function (event) {
    console.log("working");
    var button = $(event.relatedTarget); // Button that triggered the modal
    var carId = button.data("car-id"); // Extract info from data-* attributes
    var carMake = button.data("car-make");
    var carModel = button.data("car-model");
    var carYear = button.data("car-year");
    var carPrice = button.data("car-price");
    var carMileage = button.data("car-mileage");
    var carFuel = button.data("car-fuel");
    var carTransmission = button.data("car-transmission");
    var carEngineCylinder = button.data("car-engine-cylinder");
    var carColor = button.data("car-color");
    var carBodyType = button.data("car-body-type");
    var carDescription = button.data("car-description");
    var modal = $(this);
    modal.find(".modal-title").text("Edit Car " + carId);
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
  });

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
    // Code to save changes to the car inventory using the carId and form inputs goes here
    alert("Changes to car with ID " + carId + " have been saved.");
    $("#editModal").modal("hide");
  });
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
