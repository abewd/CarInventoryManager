$(document).ready(function () {
  $("#addButton").click(function () {
    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirm_password").val();
    console.log("testing" + name);
    console.log("testing" + email);
    console.log("testing" + password);

    var newUser = {
      name: name,
      email: email,
      password: password,
    };
    console.log("testing" + newUser);

    fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then(function (response) {
        console.log("testing" + response);
        if (response.status === 201) {
          alert("New user has been registered");
        } else {
          throw new Error("Error adding new user.");
        }
      })
      .catch(function (error) {
        console.error(error);
        alert("Error adding new user: " + error);
      });
  });
});
