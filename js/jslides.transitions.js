(function() {
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
				transform: 'translate3d(50%,0,0) rotateY(90deg) translate3d(50%,0,0)',
				backfaceVisibility: 'hidden'
			});

			oldSlide.$container.vendorCss({
				backfaceVisibility: 'hidden'
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
				}
			});
		}
	};

	jslides.transitions = transitions;
})();