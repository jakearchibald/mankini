(function() {
	var arrows = [
		[
			"M 3,198 C 34,157 76,100 93,4",
			"m 46,51 c 16,-19 28,-36 48,-48 8,17 10,40 13,63"
		]
	];

	var svgNs = "http://www.w3.org/2000/svg";

	function Arrow(arrowType, className) {
		var $container = this.$container = $('<div/>').addClass('mankini-arrow' + arrowType).addClass(className),
			paths = arrows[arrowType-1];
		
		var svg = document.createElementNS(svgNs, 'svg');

		paths.forEach(function(pathStr) {
			var path = document.createElementNS(svgNs, 'path');
			path.setAttribute( 'd', pathStr );
			svg.appendChild( path );
		});

		$container.append(svg);
	}

	var ArrowProto = Arrow.prototype;

	ArrowProto.draw = function(animate) {
		var arrow = this;
		if (!animate) {
			return;
		}

		var $paths = arrow.$container.find('path'),
			// Some values here cause chrome to misbehave :(
			dur = 0.25,
			gap = 0.1,
			begin = 0;

		$paths.each(function() {
			var path = this,
				length = path.getTotalLength();
			
			path.setAttribute( 'stroke-dasharray', length + ' ' + length );
			path.setAttribute( 'stroke-dashoffset', length );

			mankini.utils.animateProperty( path.attributes.getNamedItem('stroke-dashoffset'), 'nodeValue', {
				from: length,
				to: 1,
				duration: dur * 1000,
				delay: begin * 1000
			});

			begin += dur + gap;
		});
	};

	mankini.slide.Arrow = Arrow;
})();