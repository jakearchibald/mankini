mankini.utils = {};

$.fn.fullHeight = function() {
	var height = this.height(),
		autoHeight = this.height('auto').height();
		
	this.height(height);
	return autoHeight;
};

(function() {
	function requestAnimationFrame(func) {
		(window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)(func);
	}

	var transitionend = 'transitionend webkitTransitionEnd oTransitionEnd';

	function animateToClass( animate, $items, className ) {
		className = className || 'on';
		var deferreds = [];

		$items.each(function() {
			var $item = $( this ),
				deferred = $.Deferred();

			deferreds.push( deferred );

			function complete() {
				$item.removeClass('animate');
				$item.off( transitionend, complete );
				deferred.resolve();
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

		return $.when.apply($, deferreds);
	}

	function animatePaths($paths, opts) {
		var begin = 0,
			anim;

		$.extend({
			duration: 1000,
			gap: 0,
			easing: 'easeInOutQuad'
		}, opts);

		$paths.each(function() {
			var path = this,
				length = path.getTotalLength();

			anim = new Anim(opts.duration / 1000, {
				easing: opts.easing
			});
			
			path.setAttribute( 'stroke-dasharray', length + ' ' + length );
			path.setAttribute( 'stroke-dashoffset', length );

			anim.target( path.attributes.getNamedItem('stroke-dashoffset') ).prop('nodeValue', {
				from: length,
				to: 1
			});

			if ( begin ) {
				setTimeout(function() {
					anim.start();
				}, begin);
			}
			else {
				anim.start();
			}

			begin += opts.duration + opts.gap;
		});

		return anim;
	}

	mankini.utils.animateToClass = animateToClass;
	mankini.utils.requestAnimationFrame = requestAnimationFrame;
	mankini.utils.animatePaths = animatePaths;
})();