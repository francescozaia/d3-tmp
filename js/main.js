/* Carousel */
$(function() {

  /* Tooltips activator */
  $('[data-toggle="tooltip"]').tooltip();

  /* Smooth scrolling */
  /* interferes with carousel
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(
        /^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +
        ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
  */

  /*********************/
  /* On data JSON load */
  /*********************/

  d3.json("./js/data.json", function(error, data) {

    if (error) {
      return console.warn(error); // TODO handle errors
    }

    var options = {};

    $(".chart").visualizeRisk(data, options);
  });

});
