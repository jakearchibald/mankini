(function() {
	var markupFetch = $.ajax( scriptRoot + 'mankini/slide/arrows.html' ),
		$arrows;

	markupFetch.done(function(text) {
		$arrows = $(text);
	});

	function Arrow(arrowType, className) {
		var $container = this.$container = $('<div/>');
		
		markupFetch.done(function() {
			var $arrow = $arrows.filter('.mankini-arrow' + arrowType).clone().addClass( className );
			$container.append( $arrow );
		});
	}

	var ArrowProto = Arrow.prototype;

	ArrowProto.draw = function() {
		var arrow = this;

		markupFetch.done(function() {
			var $paths = arrow.$container.find('path'),
				dur = 0.4,
				gap = 0.1,
				begin = 0;

			$paths.each(function() {
				var path = this,
					length = path.getTotalLength().toString();
				
				path.setAttribute('stroke-dasharray', length + ' ' + length);
				path.setAttribute('stroke-dashoffset', length);

				var animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
				animate.setAttribute('attributeName', 'stroke-dashoffset');
				animate.setAttribute('from', length);
				animate.setAttribute('dur', dur + 's');
				animate.setAttribute('begin', begin + 's');
				animate.setAttribute('fill', 'freeze');
				animate.setAttribute('values', length + ';0');
				
				path.appendChild( animate );

				begin += dur + gap;
			});
		});
	};

	mankini.slide.Arrow = Arrow;
})();