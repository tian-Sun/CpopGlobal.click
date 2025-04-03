// Xenon Widgets
(function($)
{
    "use strict";

    // Widgets
    var Widgets = {
        init: function()
        {
            // Initialize widgets
            this.initWidgets();
        },

        initWidgets: function()
        {
            // Basic widget functionality
            $('.xe-widget').each(function()
            {
                var $widget = $(this);
                
                // Add click handler if widget has onclick attribute
                if($widget.attr('onclick'))
                {
                    $widget.css('cursor', 'pointer');
                }
            });
        }
    };

    // Initialize widgets when document is ready
    $(document).ready(function()
    {
        Widgets.init();
    });

})(jQuery); 