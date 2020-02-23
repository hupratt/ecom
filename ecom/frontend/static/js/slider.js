$(document).ready(function() {
  $("#price_range").ionRangeSlider({
    type: "double",
    skin: "round",
    grid: true,
    min: 0,
    max: 10000,
    from: 0,
    to: 0,
    step: 500,
    max_postfix: "+",
    // prefix: "$",
    postfix: "€",
    hide_min_max: true // show/hide MIN and MAX labels
    // hide_from_to: true // show/hide FROM and TO labels
  });
});
