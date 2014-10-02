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
	});

	$("#popup_cover").find(".close").click(function() {
		$("#popup_cover").hide(100);
	});

	function priceSlider(){
		var nextLink = $("#pricing").find(".right");
		var prevLink = $("#pricing").find(".left");
		var slideWidth = $('.popup').outerWidth();
		var newLeftPos = slideWrap.position().left - slideWidth;

        nextLink.click(function(){
			if(!slideWrap.is(':animated')) {
				slideWrap.animate({left: newLeftPos}, 500, function(){
					slideWrap
						.find('.popup:first')
						.appendTo(slideWrap)
						.parent()
						.css({'left': 0});
				});

			}
		});

        prevLink.click(function(){
			if(!slideWrap.is(':animated')) {			
				slideWrap
					.css({'left': newLeftPos})
					.find('.popup:last')
					.prependTo(slideWrap)
					.parent()
					.animate({left: 0}, 500);
			}
		});

        $(document).keyup(function(e) {
            if (e.keyCode == 37) {
                if(!slideWrap.is(':animated')) {
                    slideWrap
                        .css({'left': newLeftPos})
                        .find('.popup:last')
                        .prependTo(slideWrap)
                        .parent()
                        .animate({left: 0}, 500);
                }
            }
        });

        $(document).keyup(function(e) {
            if (e.keyCode == 39) {
                if(!slideWrap.is(':animated')) {
                    slideWrap.animate({left: newLeftPos}, 500, function(){
                        slideWrap
                            .find('.popup:first')
                            .appendTo(slideWrap)
                            .parent()
                            .css({'left': 0});
                    });

                }
            }
        });
	}
	priceSlider();

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $("#popup_cover").fadeOut(300);
        }
    });
});
})(jQuery);