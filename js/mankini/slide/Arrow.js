(function() {
	var markupFetch = $.ajax( scriptRoot + 'mankini/slide/arrows.html' ),
		$arrows;

	markupFetch.done(function(text) {
		$arrows = $(text);
	});

	function Arrow(arrowType, className) {
		var $container = this.$container = $('<div/>').addClass(className);
		
		markupFetch.done(function() {
			$container.append( $arrows.filter('.mankini-arrow' + arrowType) );
		});
	}

	var ArrowProto = Arrow.prototype;

	ArrowProto.draw = function() {
		
	};

	mankini.slide.Arrow = Arrow;
})();