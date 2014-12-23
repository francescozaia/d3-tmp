$(function() {
  $('#myCarousel').oneCarousel({
    easeIn: 'rotateIn',
    interval: 5000,
    pause: 'hover'
  });
  $('#myCarousel2').oneCarousel({
    easeIn: 'rotateIn',
    interval: 8000,
    pause: 'hover'
  });
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

  $('#partners').carouFredSel({
    next: "#partners-next",
    prev: "#partners-prev",
    auto: 8000,
    scroll: {
      items: 1
    }
  });

  $(window).resize(function() {
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

    $('#partners').carouFredSel({
      next: "#partners-next",
      prev: "#partners-prev",
      auto: 8000,
      scroll: {
        items: 1
      }
    });
  })
});
