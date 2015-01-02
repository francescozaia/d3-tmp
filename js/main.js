$(function() {

  // Tooltips activator
  // $('[data-toggle="tooltip"]').tooltip();

  // Remove outline in IE
  $("a, input, textarea").attr("hideFocus", "true").css("outline", "none");

  // Add gradient to IE
  setTimeout(function () {
    $("body").addClass("gradient");
  }, 0);

  // buttons
  $(".btn").hover(function(){
    $(this).stop().animate({"opacity": .8});
  },function(){
    $(this).stop().animate({"opacity": 1});
  });
  $('a.btn, span.btn').on('mousedown', function(){
    $(this).addClass('active')
  });
  $('a.btn, span.btn').on('mouseup mouseout', function(){
    $(this).removeClass('active')
  });

  // Smooth scrolling
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

  /*********************/
  /* On data JSON load */
  /*********************/
  //d3.json("./js/data.json", function(error, data) {
  //
  //  if (error) {
  //    return console.warn("Error retrieving JSON: " + error); // TODO handle errors
  //  }
  //
  //  $(".chart").visualizeRisk(data);
  //});

});
