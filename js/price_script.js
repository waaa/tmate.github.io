// Using jQuery safe
(function($) {

  if (location.href.indexOf('pricing') < 0) {
    return;
  }

  function formInputs(formId) {
    return $('#' + formId).find('input,textarea');
  }

  function submit(formId, buttonId) {
    var params = 'formId=' + formId.toUpperCase();
    var savedText = $(buttonId).text();

    formInputs(formId).each(function() {
      params += '&' + $(this).attr('name') + '=' + encodeURIComponent($(this).val());
    });

    var request = new XMLHttpRequest();

    request.open("POST", "http://svnkit.com/subgit/send2.php", true);
    var updater = function() {
      if (request.readyState == 4) {

        if (request.responseText != null && request.responseText.indexOf('ok|') == 0) {
          $(buttonId).text('Application Received');
        } else {
          $(buttonId).text('Error Occurred');
        }

        var handler = function(event) {
          $(buttonId).text(savedText);
          $(buttonId).removeClass('disabled');
          formInputs(formId).unbind('focus', handler);
        };

        formInputs(formId).on('focus', handler);
      }
    };

    request.onreadystatechange = updater;
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    $(buttonId).toggleClass('disabled');
    $(buttonId).text('Processing...');

    request.send(params);

    return false;
  }

  $(document).ready(function() {
    var getAKey = function(buttonId, formId) {
      return function(event) {
        event.preventDefault();
        if ($(buttonId).hasClass('disabled')) {
          return false;
        }
        return submit(formId, buttonId);
      };
    };

    $('#get_free_key_button').click(getAKey('#get_free_key_button', 'FREE_AUTO_GENERATED'));
    $('#get_open_source_key_button').click(getAKey('#get_open_source_key_button', 'OPEN_SOURCE'));
    $('#get_quote_button').click(getAKey('#get_quote_button', 'QUOTE'));

    var slideWrap = $("#popup_lists");

    $("#prices").on("click", "li", function(event) {
      event.preventDefault();

      var href1 = $(this).find(".price_text").next('a').attr('href');
      for ( var i = 0; i <= 10; i++ ) {
        slideWrap.find(".popup:last").prependTo(slideWrap);
        if ( $(href1).index() == 0 ) {
          break;
        }
      }
      $("#popup_cover").show(100);
      slideWrap.find('.popup:first').find('input, a.button_orange').first().focus();
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
            slideWrap.find('.popup:first').find('input, textarea, a.button_orange').first().focus();
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
            slideWrap.find('.popup:first').find('input, textarea, a.button_orange').first().focus();
          });
        }
      };

      var nextLink = $(".popup").find(".right");
      var prevLink = $(".popup").find(".left");

      nextLink.click(nextPage);
      prevLink.click(prevPage);

      $(document).keyup(function(e) {
        var focusedElement = document.activeElement;
        var inputFocused = focusedElement != null
          && ('input' == focusedElement.tagName.toLowerCase() || 'textarea' == focusedElement.tagName.toLowerCase());
        if (e.keyCode == 37 && !inputFocused) {
          e.preventDefault();
          prevPage();
        } else if (e.keyCode == 39 && !inputFocused) {
          e.preventDefault();
          nextPage();
        } else if (e.keyCode == 27) {
          e.preventDefault();
          $("#popup_cover").fadeOut(300);
        }
      });
    }

    priceSlider();

  });
})(jQuery);
