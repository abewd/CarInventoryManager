$(document).ready(function () {
  $("#contactForm").submit(function (event) {
    event.preventDefault();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var message = $("#message").val();

    window.location.href = `mailto:group6fullstack@gmail.com?body=Hi my name is ${firstName} ${lastName} and my email is ${email}, you can reach me on ${phone}. My enquiry is ${message}`;
  });
});
