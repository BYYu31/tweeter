$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    let total = $(this).val();
    let remaining = 140 - total.length;
    $(this).closest(".new-tweet").find(".counter").html(remaining);
    if (remaining < 0) {
      $(this).closest(".new-tweet").find(".counter").addClass('red-color');
    } else {
      $(this).closest(".new-tweet").find(".counter").removeClass('red-color');
    }
  });
});