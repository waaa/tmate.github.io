// Using jQuery safe
(function($) {

    $(document).ready(function() {
 
	var contentTop = [];
	
	$("#main_page_href_wrap").on("click", "ul li a", function(){

	$("#left_right_wrap").find("a[name]").each(function(){
		contentTop.push($(this).offset().top);
	});
	
            var target = $(this.hash);

            if (target.length == 0) {
                target = $('a[name="' + this.hash.substr(1) + '"]');
            }

	    
            $("html, body").animate({
                scrollTop: target.offset().top//-213
            }, 500);
            
            return false;

        });

    }); //doc ready end

})(jQuery);