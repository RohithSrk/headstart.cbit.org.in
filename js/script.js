(function($){
    'use strict';
    
	var initialized = false, currentPage = null;

	function init_eventHeadText(){
		$('.event-head').each(function(e){
			var str = $(this).find('h3').text();
			var hd = $(this).find('.head');

			var dl = str.length * 60;

			$.each(str.split(''), function(e, a){ 
				var spn = $('<span>');
				if( this == ' ' ) {
					spn.html('&nbsp');	
				} else {
					spn.html(this);	
				}
				
				dl -= 60;
				spn.css('transition-delay', dl + 'ms');
				hd.append(spn);
			});
		});
	}

	function init_sfx(){
		window.sound = new Howl({
	        src: ["assets/audio/effects.webm", "assets/audio/effects.mp3"],
	        sprite: {
	            sfx_confirm_and_load_hexicon1: [0, 3456.984126984127],
	            sfx_explorehdstload: [5e3, 6192.993197278913],
	            sfx_gallery_load: [13e3, 4848.9795918367345],
	            sfx_gallery_swipe_1: [19e3, 672.9931972789132],
	            sfx_gallery_swipe_2: [21e3, 600.9977324263041],
	            sfx_gallery_swipe_3: [23e3, 528.9795918367339],
	            sfx_gallery_titletext_load: [25e3, 1032.9931972789127],
	            sfx_main_title_load: [28e3, 12747.755102040814],
	            sfx_menubutton: [42e3, 3576.9841269841295],
	            sfx_menubutton_withgunstart: [47e3, 3576.9841269841295],
	            sfx_meshmenu_disperse_close: [52e3, 1512.9931972789095],
	            sfx_mouseaway_hexicon: [55e3, 216.98412698412994],
	            sfx_mouseover_hexicon: [57e3, 600.9977324263004],
	            sfx_thestory_titletext_load: [59e3, 1296.9841269841281],
	            sfx_titletext_out: [62e3, 600.9977324263004],
	            sfx_top_right_text_load: [64e3, 1032.9931972789127],
	            sfx_event_hover: [64e3, 110]
	        }
		});
	}

    /* ---------------------------------------------
     Scripts Initialization
     --------------------------------------------- */
    $(window).on('load', function(){});

    $(document).ready(function(){
        $(window).trigger('resize');

        particlesJS.load('particles-js', 'assets/particles.json' );


		$('#events .event').mouseenter(function(){
			window.sound.play('sfx_mouseover_hexicon');
		});

		$('#events .event').mouseleave(function(){
			window.sound.play('sfx_mouseaway_hexicon');
		});

		$('#events .event').click(function(){
			roadtrip.goto('/' + $(this).data('target') );
		});

		$('#explore').click(function(){
			if( initialized ) {
				roadtrip.goto('/events');
			}
		});

		$('#menu').click(function(){
			if( initialized ) {
				if(currentPage === 'home' || currentPage === 'event') {
					roadtrip.goto('/events');
				} else if ( currentPage === 'events' ) {
					roadtrip.goto('/');
				}
			}
		});

		$('#menu').hover(function(){
			if( initialized ) {
				// route('/menu');
			}
		});

		var routes = roadtrip.add( '/', {
			enter: function ( route, previousRoute ) {
				currentPage = 'home';

				$("#menu").removeClass().addClass('open');

	    		if(!initialized){
					$('#headstart-title').css('display', 'inline-block');
					$('#headstart-year').css('display', 'inline-block');
					$('#main-content').addClass('bringIn');
					$('#hs-tagline').css('display', 'block');
					$('.hs-line').css('display', 'block');
					
					$('#explore').css('display', 'inline-block');
					window.sound.play('sfx_main_title_load');
					setTimeout(function(){
						$("body").addClass("initialized");
						initialized = true;
						$('.hs-line').css('opacity', 1);
						// console.log(initialized);
					}, 3800);
	    		} else {
					$('#particles-js').removeClass('show');
					window.sound.play('sfx_meshmenu_disperse_close');

					$('#headstart-title').css('display', 'inline-block');
					$('#headstart-year').css('display', 'inline-block');
					$('#main-content').fadeIn('slow').addClass('bringIn');
					$('#hs-tagline').css('display', 'block');
					$('.hs-line').css('display', 'block');
					$('#explore').fadeIn('slow').css('display', 'inline-block');
					
	    		}

			},

			leave: function ( route, nextRoute ) {
			}
		});

		routes.add( '/events', {
			enter: function ( route, previousRoute ) {
				currentPage = 'events';

				$("#menu").removeClass().addClass('close');

				if( initialized ) {


					if( ! $('#particles-js').hasClass('show') ) {
						window.sound.play('sfx_meshmenu_disperse_close');
					}
					$('#particles-js').addClass('show');
					// $('#main-content').addClass('bringIn');
					$('#main-content').fadeOut('slow');
					$('.hs-line').fadeOut(100);
					setTimeout(function(){
						$("#events").removeClass("hidden");
						setTimeout(function(){
							$("#events").addClass("show-events");
						}, 100);
					}, 100);
				} else {
					window.sound.play('sfx_meshmenu_disperse_close');
					$('#particles-js').addClass('show');
					initialized = true;
					$("body").addClass("initialized");
					setTimeout(function(){
						$("#events").removeClass("hidden");
						setTimeout(function(){
							$("#events").addClass("show-events");
						}, 100);
					}, 100);
				}
			},
			leave: function ( route, nextRoute ) {
				$("#events").addClass("hidden");
				$("#events").removeClass("show-events");
				
			}
		});

		routes.add( '/:evnt', {
			enter: function ( route, previousRoute ) {
				var eventStr = route.params.evnt;

				currentPage = 'event';
				$("#menu").removeClass().addClass('back');
				window.sound.play('sfx_titletext_out');

				$('#particles-js').addClass('show');

				initialized = true;
				$("body").addClass("initialized");

				$('#' + eventStr).addClass('show');
				$('#' + eventStr  + '-head').addClass('show');
				
				$("#event-page").removeClass("hidden");
				
				setTimeout(function(){
					$('#event-page').addClass('display');
				}, 100);

				setTimeout(function(){
					$('#' + eventStr  + '-head').addClass('anim');
					window.sound.play('sfx_thestory_titletext_load');
				}, 100);

			},
			leave: function ( route, nextRoute ) {
				var eventStr = route.params.evnt;

				$('#' + eventStr).removeClass('show');
				$('#' + eventStr  + '-head').removeClass('show');
				$('#' + eventStr  + '-head').removeClass('anim');
				$("#event-page").addClass("hidden");
				$('#event-page').removeClass('display');
			}
		});

		init_eventHeadText();
		init_sfx();

		Pace.on('done', function() {
			routes.start();
		});

    });

    $(window).resize(function(){});

})(jQuery);