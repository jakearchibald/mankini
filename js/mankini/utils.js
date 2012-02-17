mankini.utils = {};

(function() {
	function requestAnimationFrame(func) {
		(window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)(func);
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

	function animateProperty(obj, propertyName, opts) {
		opts = $.extend({
			from: obj[propertyName],
			to: obj[propertyName],
			duration: 1000,
			delay: 0,
			easing: function(pos) { return pos; }
		}, opts);
		
		var from = opts.from,
			delta = opts.to - from,
			duration = opts.duration,
			easing = opts.easing,
			start;
		
		obj[propertyName] = from;

		function run(now) {
			var pos = (now.valueOf() - start) / duration;
			if (pos > 1) {
				pos = 1;
			}
			
			obj[propertyName] = from + (easing(pos) * delta);

			if (pos != 1) {
				requestAnimationFrame( run );
			}
		}

		setTimeout(function() {
			start = new Date().valueOf();
			run(start);
		}, opts.delay);
	}

	mankini.utils.animateToClass = animateToClass;
	mankini.utils.requestAnimationFrame = requestAnimationFrame;
	mankini.utils.animateProperty = animateProperty;
})();