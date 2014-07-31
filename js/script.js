// Using jQuery safe
(function($) {

    $(document).ready(function() {

        var contentTop = [];
        var doc = $("#documentation");

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

        $("a[href='#up']").click(function() {
            $("html, body").animate({ scrollTop: 0}, 1000);
            return false;
        });

        $("a[href='high']").on("click", function(event) {
            event.preventDefault();
        });

    }); //doc ready end

})(jQuery);