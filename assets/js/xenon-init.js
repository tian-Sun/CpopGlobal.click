// Xenon Initialization
(function($)
{
    "use strict";

    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Initialize smooth scrolling
    $('.smooth').on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        
        // 如果是普通链接（不是锚点链接），直接跳转
        if (!target || target === '#' || !target.startsWith('#')) {
            window.location.href = target;
            return;
        }
        
        var $target = $(target);
        if ($target.length) {
            var offset = $target.offset().top - 50;
            $('html, body').stop().animate({
                scrollTop: offset
            }, {
                duration: 500,
                queue: false
            });
        }
    });

    // Initialize mobile menu toggle
    $('.mobile-menu-toggle').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('mobile-menu-active');
    });

    $('body').on('click', 'a[rel="go-top"]', function(ev)
    {
        ev.preventDefault();

        $('html, body').stop().animate({
            scrollTop: 0
        }, {
            duration: 500,
            queue: false
        });
    });

})(jQuery); 