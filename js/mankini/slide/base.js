mankini.slide = {};

(function() {
	function requestAnimationFrame(func) {
		window.webkitRequestAnimationFrame( func );
	}

	var transitionend = 'transitionend webkitTransitionEnd oTransitionEnd';

	function animateToClass( animate, $items, className ) {
		className = className || 'on';

		$items.each(function() {
			var $item = $( this );

			function complete() {
				$item.removeClass('animate');
				$item.off( transitionend, complete );
			}

			if ( animate ) {
				$item.on( transitionend, complete ).addClass('animate');

				requestAnimationFrame(function() {
					$item.addClass( className );
				});
			}
			else {
				$item.addClass( className );
			}
		});
	}

	mankini.slide.animateToClass = animateToClass;
})();