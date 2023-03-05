// This will handle the submission of a login form and link with the first login page
const loginFormHandler = async (event) => {
  // Prevent the form from submitting in the default way
  event.preventDefault();

  // Get the values of the email and password fields and remove any whitespace
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // Check if both fields have values, if they do continue
  if (email && password) {
    // Make a POST request to the login endpoint with the email and password in the body
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    // If the response is successful, go to the homepage
    if (response.ok) {
      document.location.replace("/");
    } else {
      // If unsuccessful, display an alert
      alert("Failed to log in");
    }
  }
};

// This adds an event listener for the login page after clicking submit
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
