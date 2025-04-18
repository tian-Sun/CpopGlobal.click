/**
 *	Toggles
 *
 *	Non-animation
 */


;(function($, window, undefined)
{
	"use strict";

	// Helper function to get attribute with default value
	function attrDefault($elem, attr, defaultValue)
	{
		var value = $elem.attr(attr);
		return (value !== undefined) ? value : defaultValue;
	}

	// Toggles
	var Toggles = {
		init: function()
		{
			// Initialize toggles
			this.initToggles();
			this.initMobileMenu();
			this.initPanelNavigation();
			this.initSmoothScroll();
		},

		initToggles: function()
		{
			$('.xe-toggle').each(function()
			{
				var $toggle = $(this);
				var $target = $($toggle.data('target'));
				
				if($target.length)
				{
					$toggle.on('click', function(e)
					{
						e.preventDefault();
						
						// 检查是否是外部链接
						var href = $(this).attr('href');
						if(href && !href.startsWith('#')) {
							window.location.href = href;
							return;
						}
						
						$target.slideToggle(200);
					});
				}
			});
		},

		initMobileMenu: function()
		{
			// Mobile Menu Toggle
			$('a[data-toggle="mobile-menu"]').on('click', function(e)
			{
				e.preventDefault();
				$('.main-menu').toggleClass('mobile-is-visible');
			});

			// User Info Menu Toggle
			$('a[data-toggle="user-info-menu"]').on('click', function(e)
			{
				e.preventDefault();
				$('.user-info-menu').toggleClass('mobile-is-visible');
			});
		},

		initPanelNavigation: function()
		{
			// Panel Navigation Toggle
			$('a[data-toggle="panel"]').on('click', function(e)
			{
				e.preventDefault();
				var $panel = $(this).closest('.panel');
				$panel.toggleClass('collapsed');
			});

			// Panel Close
			$('a[data-toggle="remove"]').on('click', function(e)
			{
				e.preventDefault();
				var $panel = $(this).closest('.panel');
				$panel.fadeOut(200, function()
				{
					$(this).remove();
				});
			});
		},

		initSmoothScroll: function()
		{
			// Smooth Scroll
			$('.smooth').on('click', function(e)
			{
				e.preventDefault();
				var target = $(this).attr('href');
				if (target === '#') return;
				
				var $target = $(target);
				if ($target.length)
				{
					$('html, body').animate({
						scrollTop: $target.offset().top - 50
					}, {
						duration: 500,
						queue: false
					});
				}
			});
		}
	};

	$(document).ready(function()
	{
		// Initialize toggles
		Toggles.init();

		// Chat Toggler
		$('a[data-toggle="chat"]').each(function(i, el)
		{
			$(el).on('click', function(ev)
			{
				ev.preventDefault();

				public_vars.$body.toggleClass('chat-open');

				if($.isFunction($.fn.perfectScrollbar))
				{
					setTimeout(function()
					{
						public_vars.$chat.find('.chat_inner').perfectScrollbar('update');
						$(window).trigger('xenon.resize');
					}, 1);
				}
			});
		});


		// Settings Pane Toggler
		$('a[data-toggle="settings-pane"]').each(function(i, el)
		{
			$(el).on('click', function(ev)
			{
				ev.preventDefault();

				var use_animation = attrDefault($(el), 'animate', false) && ! isxs();

				var scroll = {
					top: $(document).scrollTop(),
					toTop: 0
				};

				if(public_vars.$body.hasClass('settings-pane-open'))
				{
					scroll.toTop = scroll.top;
				}

				TweenMax.to(scroll, (use_animation ? .1 : 0), {top: scroll.toTop, roundProps: ['top'], ease: scroll.toTop < 10 ? null : Sine.easeOut, onUpdate: function()
					{
						$(window).scrollTop( scroll.top );
					},
					onComplete: function()
					{
						if(use_animation)
						{
							// With Animation
							public_vars.$settingsPaneIn.addClass('with-animation');

								// Opening
								if( ! public_vars.$settingsPane.is(':visible'))
								{
									public_vars.$body.addClass('settings-pane-open');

									var height = public_vars.$settingsPane.outerHeight(true);

									public_vars.$settingsPane.css({
										height: 0
									});

									TweenMax.to(public_vars.$settingsPane, .25, {css: {height: height}, ease: Circ.easeInOut, onComplete: function()
									{
										public_vars.$settingsPane.css({height: ''});
									}});

									public_vars.$settingsPaneIn.addClass('visible');
								}
								// Closing
								else
								{
									public_vars.$settingsPaneIn.addClass('closing');

									TweenMax.to(public_vars.$settingsPane, .25, {css: {height: 0}, delay: .15, ease: Power1.easeInOut, onComplete: function()
									{
										public_vars.$body.removeClass('settings-pane-open');
										public_vars.$settingsPane.css({height: ''});
										public_vars.$settingsPaneIn.removeClass('closing visible');
									}});
								}
						}
						else
						{
							// Without Animation
							public_vars.$body.toggleClass('settings-pane-open');
							public_vars.$settingsPaneIn.removeClass('visible');
							public_vars.$settingsPaneIn.removeClass('with-animation');
						}
					}
				});
			});
		});



		// Sidebar Toggle
		$('a[data-toggle="sidebar"]').each(function(i, el)
		{
			$(el).on('click', function(ev)
			{
				ev.preventDefault();


				if(public_vars.$sidebarMenu.hasClass('collapsed'))
				{
					public_vars.$sidebarMenu.removeClass('collapsed');
					ps_init();
				}
				else
				{
					public_vars.$sidebarMenu.addClass('collapsed');
					ps_destroy();
				}

				$(window).trigger('xenon.resize');
			});
		});



		// Mobile Menu Trigger for Horizontal Menu
		$('a[data-toggle="mobile-menu-horizontal"]').on('click', function(ev)
		{
			ev.preventDefault();

			public_vars.$horizontalMenu.toggleClass('mobile-is-visible');

		});



		// Mobile Menu Trigger for Sidebar & Horizontal Menu
		$('a[data-toggle="mobile-menu-both"]').on('click', function(ev)
		{
			ev.preventDefault();

			public_vars.$mainMenu.toggleClass('mobile-is-visible both-menus-visible');
			public_vars.$horizontalMenu.toggleClass('mobile-is-visible both-menus-visible');

		});



		// Mobile User Info Menu Trigger for Horizontal Menu
		$('a[data-toggle="user-info-menu-horizontal"]').on('click', function(ev)
		{
			ev.preventDefault();

			public_vars.$userInfoMenuHor.find('.nav.nav-userinfo').toggleClass('mobile-is-visible');

		});



		// Panel Reload
		$('body').on('click', '.panel a[data-toggle="reload"]', function(ev)
		{
			ev.preventDefault();

			var $panel = $(this).closest('.panel');

			// This is just a simulation, nothing is going to be reloaded
			$panel.append('<div class="panel-disabled"><div class="loader-1"></div></div>');

			var $pd = $panel.find('.panel-disabled');

			setTimeout(function()
			{
				$pd.fadeOut('fast', function()
				{
					$pd.remove();
				});

			}, 500 + 300 * (Math.random() * 5));
		});



		// Loading Text toggle
		$('[data-loading-text]').each(function(i, el) // Temporary for demo purpose only
		{
			var $this = $(el);

			$this.on('click', function(ev)
			{
				$this.button('loading');

				setTimeout(function(){ $this.button('reset'); }, 1800);
			});
		});




		// Popovers and tooltips
		$('[data-toggle="popover"]').each(function(i, el)
		{
			var $this = $(el),
				placement = attrDefault($this, 'placement', 'right'),
				trigger = attrDefault($this, 'trigger', 'click'),
				popover_class = $this.get(0).className.match(/(popover-[a-z0-9]+)/i);

			$this.popover({
				placement: placement,
				trigger: trigger
			});

			if(popover_class)
			{
				$this.removeClass(popover_class[1]);

				$this.on('show.bs.popover', function(ev)
				{
					setTimeout(function()
					{
						var $popover = $this.next();
						$popover.addClass(popover_class[1]);

					}, 0);
				});
			}
		});

		$('[data-toggle="tooltip"]').each(function(i, el)
		{
			var $this = $(el),
				placement = attrDefault($this, 'placement', 'top'),
				trigger = attrDefault($this, 'trigger', 'hover'),
				tooltip_class = $this.get(0).className.match(/(tooltip-[a-z0-9]+)/i);

			$this.tooltip({
				placement: placement,
				trigger: trigger
			});

			if(tooltip_class)
			{
				$this.removeClass(tooltip_class[1]);

				$this.on('show.bs.tooltip', function(ev)
				{
					setTimeout(function()
					{
						var $tooltip = $this.next();
						$tooltip.addClass(tooltip_class[1]);

					}, 0);
				});
			}
		});

	});

})(jQuery, window);