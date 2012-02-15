(function() {
	function Presentation( container ) {
		this.$container = $('<div class="mankini-presentation"/>').appendTo( container );
		this._slides = [];
		this._slideIndex = 0;
		this.builder = new mankini.Builder( this );
	}

	var PresentationProto = Presentation.prototype;

	PresentationProto.newSlide = function() {
		var slide = new mankini.Slide( this );
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

	PresentationProto.prev = function() {
		var slide = this._slides[ this._slideIndex ],
			prevSlide;

		if ( slide.hasPrev() ) {
			slide.prev();
		}
		else {
			prevSlide = this._slides[ --this._slideIndex ];

			if ( prevSlide ) {
				slide.transition( false, prevSlide );
				prevSlide.gotoLastState();
			}
		}
	};

	mankini.Presentation = Presentation;
})();