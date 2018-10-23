$(document).ready(function() {
  // initialise the controller
  var controller = new ScrollMagic.Controller(),
    triggerHook = 0.1,
    scene1,
    scene2,
    scene3,
    width = window.innerWidth > 0 ? window.innerWidth : screen.width;

  // change behaviour of controller to animate scroll instead of jump
  controller.scrollTo(function(newpos) {
    TweenMax.to(window, 0.7, { scrollTo: { y: newpos } });
  });
  //Responsive variable settings
  var posSettings = {
    xs: { imageY: "-25%", triggerhk: "0.8" },
    sm: { imageY: "-25%", triggerhk: "0.8" },
    md: { imageY: "-25%", triggerhk: "0.8" },
    lg: { imageY: "-20%", triggerhk: "0.7" },
    xl: { imageY: "-15%", triggerhk: "0.7" },
    xxl: { imageY: "-10%", triggerhk: "0.7" }
  };
  var currWidth = "lg";
  // setup initial position
  setInitPos();
  $(window).on("resize", function(e) {
    setInitPos();
  });

  function setInitPos() {
    // get viewport dimensions
    switch ($(".width-calc").width()) {
      case 1340:
        currWidth = "xxl";
        break;
      case 1140:
        currWidth = "xl";
        break;
      case 940:
        currWidth = "lg";
        break;
      case 720:
        currWidth = "md";
        break;
      case 578:
        currWidth = "sm";
        break;
      default:
        currWidth = "xs";
        break;
    }
  }

  // parallax sence for intro section
  var introTl = new TimelineMax();
  introTl.from(".parallax1", 1, {
    y: posSettings[currWidth].imageY,
    ease: Power0.easeNone
  });
  var parallaxScene = new ScrollMagic.Scene({
    triggerElement: ".static--header",
    triggerHook: 1,
    duration: "300%"
  })
    .setTween(introTl)
    //.addIndicators()
    .addTo(controller);

  var introT2 = new TimelineMax();
  introT2.from(".parallax2", 1, {
    y: posSettings[currWidth].imageY,
    ease: Power0.easeNone
  });
  var parallaxScene = new ScrollMagic.Scene({
    triggerElement: ".bg-only",
    triggerHook: 1,
    duration: "300%"
  })
    .setTween(introT2)
    //.addIndicators()
    .addTo(controller);

  //==========================================Text animation

  $(".slide").each(function() {
    var textScene = new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: posSettings[currWidth].triggerhk
    })
      .setClassToggle(this, "is-active")
      //.addIndicators()
      .addTo(controller);
  });
});
