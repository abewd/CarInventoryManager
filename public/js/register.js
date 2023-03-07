$(document).ready(function () {
  $("#addButton").click(function () {
    registerHandler();
  });
});

const registerHandler = async (event) => {
  event.preventDefault();
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

    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.status === 201) {
        alert("New user has been registered");
      } else {
        throw new Error("Error adding new user.");
      }
    } else {
      alert("Unable to register the user");
    }
  }
};
