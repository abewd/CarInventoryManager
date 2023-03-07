$(document).ready(function () {
  $("#addButton").click(function () {
    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirm_password").val();

    console.log("testing" + name);
    console.log("testing" + email);
    console.log("testing" + password);

    if (name == "") {
      alert("Name is empty");
    } else if (email == "") {
      alert("Email is empty");
    } else if (password == "") {
      alert("Password is empty");
    } else if (confirmPassword == "") {
      alert("Confirm password is empty");
    } else if (password != confirmPassword) {
      alert("Password and Confirm password is not matched.");
    } else {
      var newUser = {
        name: name,
        email: email,
        password: password,
      };

      fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then(function (response) {
          console.log("response" + response);
          if (response.status === 201) {
            alert("New user has been registered");
          } else {
            throw new Error("Error adding new user.");
          }
        })
        .catch(function (error) {
          console.error(error);
          alert("Unable to register the user" + error);
        });
    }
  });
});
