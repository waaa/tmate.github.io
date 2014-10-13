// Using jQuery safe
(function($) {

  function submit(formId, buttonId) {
    var form = document.getElementById(formId);
    var inputs = form.getElementsByTagName("input");
    var params = "formId=" + formId.toUpperCase();

    var savedText = $(buttonId).text();

    for (var i = 0; i <inputs.length; i++){
      if (inputs[i].type == "text") {
        inputs[i].style.borderColor="";
        params += "&" + inputs[i].name + "=" + encodeURIComponent(inputs[i].value);
      } else if (inputs[i].type == "checkbox") {
        inputs[i].style.borderColor="";
        params += "&" + inputs[i].name + "=" + encodeURIComponent(inputs[i].checked);
      }
    }

    var request = new XMLHttpRequest();

    request.open("POST", "http://svnkit.com/subgit/send.php", true);
    var updater = function() {
      if (request.readyState == 4) {
        if (request.responseText != null && request.responseText.indexOf('ok|') == 0) {
          $(buttonId).text('Application Received');
        } else {
          $(buttonId).text('Error Occurred');
        }
        var handler = function(event) {
          console.log('enabling back');
          $(buttonId).text(savedText);
          $(buttonId).removeClass('disabled');
          $('#' + formId + ' input').unbind('focus', handler);
        };
        $('#' + formId + ' input').on('focus', handler);
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

    var slideWrap = $("#popup_lists");

    $("#prices").on("click", "li", function() {

      var href1 = $(this).find(".price_text").next('a').attr('href');
      for ( var i = 0; i <= 10; i++ ) {
        slideWrap.find(".popup:last").prependTo(slideWrap);
        if ( $(href1).index() == 0 ) {
          break;
        }
      }
      $("#popup_cover").show(100);
      //slideWrap.find('.popup:first').find('input, textarea').first().focus();
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
