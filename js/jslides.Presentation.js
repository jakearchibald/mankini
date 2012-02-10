(function() {
	function Presentation( container ) {
		this.$container = $('<section class="jslides-presentation"/>').appendTo( container );
		this._slides = [];
		this._slideIndex = 0;
	}

	var PresentationProto = Presentation.prototype;

	PresentationProto.newSlide = function() {
		var slide = new jslides.Slide( this );
		this._slides.push( slide );
		return slide;
	};

	PresentationProto.start = function() {
		var slide = this._slides[0];
		this.$container.append( slide.$container );
		slide.init( true );
	};

	PresentationProto.next = function( animate ) {
		var slide = this._slides[ this._slideIndex ],
			nextSlide;

		if ( slide.hasNext() ) {
			slide.next( animate );
		}
		else {
			nextSlide = this._slides[ ++this._slideIndex ];

			if ( nextSlide ) {
				slide.transition( animate, nextSlide );
			}
		}
	};

	jslides.Presentation = Presentation;
})();