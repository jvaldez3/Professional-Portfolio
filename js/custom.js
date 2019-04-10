/*-----------------------------------------------------------------

  ## Template Name: Lazord
  ## Description: Responsive One Page Portfolio Template
  ## Author: isathemes
  ## Author URL: https://themeforest.net/user/isathemes
  ## version: 1.0

-----------------------------------------------------------------*/


/*global $, jQuery, alert*/
$(function () {

  'use strict';

  var win = $(window);


  // ScrollIt
  $.scrollIt({
    upKey: 38,                // key code to navigate to the next section
    downKey: 40,              // key code to navigate to the previous section
    easing: 'swing',          // the easing function for animation
    scrollTime: 600,          // how long (in ms) the animation takes
    activeClass: 'active',    // class given to the active nav element
    onPageChange: null,       // function(pageIndex) that is called when page is changed
    topOffset: -80            // offste (in px) for fixed top navigation
  });


  // Close navbar-collapse On nav-link Click
  $('.navbar-nav .nav-link').on('click', function () {
    $('.navbar-collapse.show').removeClass('show');
  });


  // Change Navbar Background and Logo When Scrolling
  win.on('scroll', function () {
    var bodyScroll = win.scrollTop(),
        navbar = $('.navbar'),
        logo = $('.navbar .logo> img');

    if (bodyScroll > 100) {
      navbar.addClass('nav-scroll');
      logo.attr('src', 'http://via.placeholder.com/900x182');

    } else {
      navbar.removeClass('nav-scroll');
      logo.attr('src', 'http://via.placeholder.com/900x182');
    }
  });


  // Button Scroll To Top
  win.on('scroll', function () {
    var buttonTop = $('.button-top');
    if ($(this).scrollTop() >= 700) {
      buttonTop.show();
    } else {
      buttonTop.hide();
    }
  });


  // Progress Bar
  win.on('scroll', function () {
    $('.skill-progress span').each(function () {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight(),
          bottom_of_window = $(window).scrollTop() + $(window).height(),
          myVal = $(this).attr('data-value');
      if (bottom_of_window > bottom_of_object) {
        $(this).css({
          width : myVal
        });
      }
    });
  });


  // CounterUp
  $('.counter .number').counterUp({
    delay: 10,
    time: 1500
  });


  // Owl Carousel
  $('.testimonials .owl-carousel').owlCarousel({
    items: 1,
    loop: true,
    mouseDrag: false,
    autoplay: true,
    smartSpeed: 500
  });


  // Magnific Popup
  $('.portfolio .gallery').magnificPopup({
    delegate: '.popup-img',
    type: 'image',
    gallery: {
      enabled: true
    }
  });

});


$(window).on('load', function () {

  // Preloader
  $('.loading').fadeOut(500);


  // Isotope
  var $gallery = $('.gallery').isotope({
    // options
    itemSelector: '.item'
  });

  // Filter Items On Button Click
  $('.filtering').on('click', 'span', function () {
    var filterValue = $(this).attr('data-filter');
    $gallery.isotope({ filter: filterValue });
  });

  // Add Active Class To Filter Button
  $('.filtering').on('click', 'span', function () {
    $(this).addClass('active').siblings().removeClass('active');
  });


  // Contact Form Validation
  $('#contact-form').validator();

  $('#contact-form').on('submit', function (e) {

    if (!e.isDefaultPrevented()) {
      var url = "contact.php";

      $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function (data) {

          var messageAlert = 'alert-' + data.type,
              messageText = data.message,
              alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

          if (messageAlert && messageText) {
            $('#contact-form').find('.messages').html(alertBox);
            $('#contact-form')[0].reset();
          }
        }
      });
      return false;
    }
  });

});
