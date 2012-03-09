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

	function animatePaths(paths, opts) {
		var begin = 0,
			anim;

		if (paths.toArray) {
			paths = paths.toArray();
		}

		$.extend({
			duration: 1000,
			gap: 0,
			easing: 'easeInOutQuad'
		}, opts);

		paths.forEach(function(path, i) {
			$(path).css('display', '');

			var length = path.getTotalLength(),
				duration = $.isArray(opts.duration) ? opts.duration[i] : opts.duration,
				easing = $.isArray(opts.easing) ? opts.easing[i] : opts.easing,
				reverse = $.isArray(opts.reverse) ? opts.reverse[i] : opts.reverse,
				gap = $.isArray(opts.gap) ? opts.gap[i] : opts.gap,
				direction = reverse ? -1 : 1;

			anim = new Anim(duration / 1000, {
				easing: easing
			});
			
			path.setAttribute( 'stroke-dasharray', length + ' ' + length );
			path.setAttribute( 'stroke-dashoffset', direction * length );

			anim.target( path.attributes.getNamedItem('stroke-dashoffset') ).prop('nodeValue', {
				from: direction * length,
				to: 0
			}).on('complete', function() {
				path.removeAttribute( 'stroke-dasharray' );
				path.removeAttribute( 'stroke-dashoffset' );
			});

			if ( begin ) {
				setTimeout(function() {
					anim.start();
				}, begin);
			}
			else {
				anim.start();
			}

			begin += duration + gap;
		});

		var deferred = $.Deferred();

		if ( !anim ) {
			deferred.resolve();
		}
		else {
			anim.on('complete', function() {
				deferred.resolve();
			});
		}

		return deferred;
	}

	mankini.utils.animateToClass = animateToClass;
	mankini.utils.requestAnimationFrame = requestAnimationFrame;
	mankini.utils.animatePaths = animatePaths;
})();