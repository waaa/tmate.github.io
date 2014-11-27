// Using jQuery safe
var downloadFile = function(url) {
   var downloadFrame = document.createElement('iframe'); 
   downloadFrame.setAttribute('src', url);
   downloadFrame.setAttribute('class', 'downloadFrame'); 
   document.body.appendChild(downloadFrame);
};

(function($) {

    $(document).ready(function() {

        /* Tabs */
        $('ul#tabs').on('click', 'li:not(.current)', function() {
            $(this).addClass('current').siblings().removeClass('current')
                .parents('#tab_wrap').find('div.box').eq($(this).index()).fadeIn(0).siblings('div.box').hide();
        });

        /* Links */
        $("a[href='#up']").click(function() {
            $("html, body").animate({ scrollTop: 0}, 1000);
            return false;
        });

    }); //doc ready end


})(jQuery);