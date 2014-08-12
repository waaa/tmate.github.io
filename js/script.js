// Using jQuery safe
(function($) {

    $(document).ready(function() {

        var contentTop = [];
        var doc = $("#documentation");
        var posit = $("#main_page_href_wrap")

        doc.find("#content").on("click", "ul li a", function() {

            doc.find("a").removeClass("current");
            $(this).addClass("current");

            doc.find(".wrapper").find("div[id]").each(function(){
                contentTop.push($(this).offset().top);
            });

            var target = $(this.hash);

            if (target.length == 0) {
                target = $('div[id="' + this.hash.substr(1) + '"]');
            }


            $("html, body").animate({
                scrollTop: target.offset().top
            }, 500);

            return false;
        });

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
        });

        $("a[href='#up']").click(function() {
            $("html, body").animate({ scrollTop: 0}, 1000);
            return false;
        });

    }); //doc ready end

})(jQuery);