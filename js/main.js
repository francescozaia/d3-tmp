$(function() {

  // Tooltips activator
  // $('[data-toggle="tooltip"]').tooltip();

  // Remove outline in IE
  $("a, input, textarea").attr("hideFocus", "true").css("outline", "none");

  // Add gradient to IE
  setTimeout(function () {
    $("body").addClass("gradient");
  }, 0);

  // Smooth scrolling
  $('a[href*=#]:not([href=#]).anchor-scroll').click(function() {
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

  // Buttons
  $(".btn").hover(function(){
    $(this).stop().animate({"opacity": 0.8});
  },function(){
    $(this).stop().animate({"opacity": 1});
  });
  $('a.btn, span.btn').on('mousedown', function(){
    $(this).addClass('active')
  });
  $('a.btn, span.btn').on('mouseup mouseout', function(){
    $(this).removeClass('active')
  });

  var initCarousels = function() {

    // Testimonials carousel
    $('#testimonials-1').carouFredSel({
      next: "#testimonials-next-1",
      prev: "#testimonials-prev-1",
      infinite: false,
      items: 1,
      auto: {
        play: true,
        timeoutDuration: 8000
      },
      scroll: {
        items: 1,
        fx: "crossfade",
        easing: "linear",
        pauseOnHover: true,
        duration: 200
      }
    });

  }

  initCarousels();

  $(window).resize(function() {
    initCarousels();
  });

});
