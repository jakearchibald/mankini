(function() {
	var transitions = {
		swap: function(presentation, oldSlide, newSlide) {
			oldSlide.$container.remove();
			presentation.$container.append( newSlide.$container );
			newSlide.init();
		}
	};

	jslides.transitions = transitions;
})();