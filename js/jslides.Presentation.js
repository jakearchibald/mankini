(function() {
	function Presentation() {
		this._$container = $('<section class="jslides-presentation"/>').appendTo( document.body );
		this._slides = [];
		this._slideIndex = 0;
	}

	var PresentationProto = Presentation.prototype;

	PresentationProto.newSlide = function() {
		var slide = new jslides.Slide();

		this._slides.push( slide );
		return slide;
	};

	jslides.Presentation = Presentation;
})();