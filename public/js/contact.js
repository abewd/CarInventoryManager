$(document).ready(function () {
  $("#contactForm").submit(function (event) {
    event.preventDefault();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var message = $("#message").val();

    window.location.href = `mailto:abdullahalfadhly@gmail.com?body=${firstName} ${lastName}\n${email}\n${phone}\n${message}`;
  });
});
