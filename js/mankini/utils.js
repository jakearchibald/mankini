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

	function animateToClass( animate, $items, className, animateClassName ) {
		className = className || 'on';
		animateClassName = animateClassName || 'animate';
		$items = $( $items );
		var deferreds = [];

		$items.each(function() {
			var el = this;
			var $item = $( el );
			var deferred = $.Deferred();

			deferreds.push( deferred );

			function complete(event) {
				if (event.target == el) {
					$item.removeClass( animateClassName );
					$item.off( transitionend, complete );
					deferred.resolve();
				}
			}

			if ( animate ) {
				$item.on( transitionend, complete ).addClass( animateClassName );

				requestAnimationFrame(function() {
					$item[0].offsetWidth;
					$item.addClass( className );
				});
			}
			else {
				$item.addClass( className );
			}
		});

		return $.when.apply($, deferreds);
	}

	function transition(animate, $items, props, opts) {
		if (opts && !opts.easing) {
			opts.easing = 'easeInOutQuad';
		}
		
		if (animate) {
			$items.transitionStop(true).transition(props, opts);
		}
		else {

			$items.transitionStop(true).vendorCss(props);
			
			if ( opts && opts.complete ) {
				opts.complete();
			}
		}
	}

	function animatePaths(animate, paths, opts) {
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
			$(path).css('display', 'inline');

			if ( !animate ) {
				return;
			}

			var length = path.getTotalLength(),
				duration = $.isArray(opts.duration) ? opts.duration[i] : opts.duration,
				easing = $.isArray(opts.easing) ? opts.easing[i] : opts.easing,
				reverse = $.isArray(opts.reverse) ? opts.reverse[i] : opts.reverse,
				gap = $.isArray(opts.gap) ? opts.gap[i] : opts.gap,
				direction = reverse ? -1 : 1;

			var thisAnim = new Anim(duration / 1000, {
				easing: easing
			});

			anim = thisAnim;
			
			path.setAttribute( 'stroke-dasharray', length + ' ' + length );
			path.setAttribute( 'stroke-dashoffset', direction * length );

			thisAnim.target( path.attributes.getNamedItem('stroke-dashoffset') ).prop('nodeValue', {
				from: direction * length,
				to: 0
			}).on('complete', function() {
				path.removeAttribute( 'stroke-dasharray' );
				path.removeAttribute( 'stroke-dashoffset' );
			});

			if ( begin ) {
				setTimeout(function() {
					thisAnim.start();
				}, begin);
			}
			else {
				thisAnim.start();
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
	mankini.utils.transition = transition;
})();