$(document).ready(function () {
  $("#contactForm").submit(function (event) {
    event.preventDefault();
    var message = $("#message").val();
    window.location.href = `mailto:abdullahalfadhly@gmail.com?body=${message}`;
  });
});
