// Using jQuery safe
(function($) {

    $(document).ready(function() {

        var contentTop = [];

        $("#documentation").find("#content").on("click", "ul li a", function() {

            $("#documentation").find(".wrapper").find("div[id]").each(function(){
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

    }); //doc ready end

})(jQuery);