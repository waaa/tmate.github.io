// Using jQuery safe
(function($) {

  $(document).ready(function() {

    var slideWrap = $("#popup_lists");

    $("#prices").on("click", "li", function() {

      var href1 = $(this).find(".price_text").next('a').attr('href');
      for ( var i = 0; i<=10; i++ ) {
        slideWrap.find(".popup:last").prependTo(slideWrap);
        if ( $(href1).index() == 0 ) {
          break;
        }
      }
      $("#popup_cover").show(100);
      slideWrap.find('.popup:first').find('input, textarea').first().focus();
    });

    $("#popup_cover").find(".close").click(function() {
      $("#popup_cover").hide(100);
    });


    function priceSlider(){
      var slideWidth = $('.popup').outerWidth();
      var newLeftPos = slideWrap.position().left - slideWidth;

      var nextPage = function() {
        if(!slideWrap.is(':animated')) {
          slideWrap.animate({left: newLeftPos}, 500, function(){
            slideWrap
            .find('.popup:first')
            .appendTo(slideWrap)
            .parent()
            .css({'left': 0});
            slideWrap.find('.popup:first').find('input, textarea').first().focus();
          });
        }
      };

      var prevPage = function() {
        if(!slideWrap.is(':animated')) {
          slideWrap
          .css({'left': newLeftPos})
          .find('.popup:last')
          .prependTo(slideWrap)
          .parent()
          .animate({left: 0}, 500, function() {
            slideWrap.find('.popup:first').find('input, textarea').first().focus();
          });
        }
      };

      var nextLink = $(".popup").find(".right");
      var prevLink = $(".popup").find(".left");

      nextLink.click(nextPage);
      prevLink.click(prevPage);

      $(document).keyup(function(e) {
        if (e.keyCode == 37) {
          prevPage();
        } else if (e.keyCode == 39) {
          nextPage();
        } else if (e.keyCode == 27) {
          $("#popup_cover").fadeOut(300);
        }
      });
    }

    priceSlider();

  });
})(jQuery);
