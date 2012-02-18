(function() {
	function slideFrom(right) {
		return function(presentation, oldSlide, newSlide) {
			var newSlideStart   = right ? '100%' : '-100%';
			var presentationEnd = right ? '-100%' : '100%';

			presentation.$container.append( newSlide.$container );
			newSlide.init();

			newSlide.$container.vendorCss({
				transform: 'translate3d(' + newSlideStart + ',0,0)'
			});
			
			presentation.$container.vendorCss({
				transform: 'translate3d(0,0,0)'
			}).transition({
				transform: 'translate3d(' + presentationEnd + ',0,0)'
			}, {
				duration: 1000,
				easing: 'easeInOutQuad',
				complete: function() {
					newSlide.$container[0].style.cssText = '';
					presentation.$container[0].style.cssText = '';
					oldSlide.$container.remove();
				}
			});
		};
	}

	var transitions = {
		swap: function(presentation, oldSlide, newSlide) {
			oldSlide.$container.remove();
			presentation.$container.append( newSlide.$container );
			newSlide.init();
		},
		cubeSpin: function(presentation, oldSlide, newSlide) {
			presentation.$container.append( newSlide.$container );
			newSlide.init();

			newSlide.$container.vendorCss({
				transform: 'translate3d(50%,0,0) rotateY(90deg) translate3d(50%,0,0)'
			});
			
			presentation.$container.vendorCss({
				transform: 'translate3d(0,0,0) rotateY(0deg) translate3d(0,0,0)',
				backfaceVisibility: 'hidden'
			}).transition({
				transform: 'translate3d(-50%,0,0) rotateY(-90deg) translate3d(-50%,0,0)'
			}, {
				duration: 1000,
				easing: 'easeInOutQuad',
				complete: function() {
					newSlide.$container[0].style.cssText = '';
					presentation.$container[0].style.cssText = '';
					oldSlide.$container.remove();
				}
			});
		},
		slideFromRight: slideFrom(true),
		slideFromLeft:  slideFrom(false)
	};

	mankini.transitions = transitions;
})();