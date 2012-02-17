(function() {
	var arrows = [
		[
			"M 3.8338616,198.20593 C 34.344111,157.53974 76.205891,100.01645 93.549591,4.294256",
			"m 46.549591,51.708466 c 16.8351,-19.82803 28.5074,-36.14446 48,-48 8.196209,17.47045 10.986739,40.34659 13.999999,63"
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