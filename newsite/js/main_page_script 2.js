// Using jQuery safe
(function($) {

    $(document).ready(function() {
 
	var startPos     = $("#main_page_href_wrap").offset().top,
            stickyHeight = $("#main_page_href_wrap").height(),
            endPos       = parseInt($("#testemonials").offset().top - stickyHeight);
	    contentTop   = [];
    
	$("#left_right_wrap").find("a[name]").each(function(){
		contentTop.push($(this).offset().top);
	});
	
	
	
	// Clicking
	
	$("#main_page_href_wrap ul li a").click(function(){

            //var target = $(this.hash);

            //if (target.length == 0) {
            //    target = $('a[name="' + this.hash.substr(1) + '"]');
            //}

	    var winTop1 = $(window).scrollTop()+213;
	    
	    $.each( contentTop, function(i,loc){
		if ( loc < winTop1 ){
			$("#main_page_href_wrap ul li a")
			.removeClass("selected")
			.eq(i).addClass("selected");
		}
	    });
	    
            //$("html, body").animate({
            //    scrollTop: target.offset().top-213
            //}, 500);
            //
            //$("#main_page_href_wrap ul li a").removeClass("selected");
            //$(this).addClass("selected");
            //
            //return false;

        });
	
	
        /* Scrolling */
        
        $(window).scroll(function(){
		
	   
		
	    // Stick it
            if(startPos <= $(window).scrollTop()) {
                if($("#main_page_href_wrap").hasClass('on_top') == false) {
                    $("#main_page_href_wrap").addClass('on_top');
                }
            }

            // Unstick it
            else {
                $("#main_page_href_wrap").removeClass('on_top');
            }
	    
            // Bottom fix
            if((endPos+5) <= $(window).scrollTop()) {
                $("#main_page_href_wrap").css({"top": "-"  + ($(window).scrollTop() - endPos - 5) + "px"});
            }
	    
            // Bottom unfix
            else {
                $("#main_page_href_wrap").css({"top":"0"});
            }
	    
	    
	    var winTop = $(window).scrollTop()+213;
	    $.each( contentTop, function(i,loc){
		if ( loc < winTop ){
			$("#main_page_href_wrap ul li a")
			.removeClass("selected")
			.eq(i).addClass("selected");
		}
		console.log(i);
		console.log("loc= "+ loc);
	    });
		console.log("winTop= " + winTop);
        });

        

    }); //doc ready end

})(jQuery);