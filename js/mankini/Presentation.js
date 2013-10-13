(function() {
	function Presentation( container, authoring ) {
		this.$container = $('<div class="mankini-presentation"/>').appendTo( container );
		this._$lumaFix = $('<div class="mankini-luma-fix"/>').appendTo( container );
		this._slides = [];
		this._slideIndex = 0;
		this.authoring = authoring;
		this.builder = new mankini.Builder( this );
	}

	var PresentationProto = Presentation.prototype;

	PresentationProto.newSlide = function() {
		var slide = new mankini.Slide( this );
		this._slides.push( slide );
		return slide;
	};

	PresentationProto.reset = function() {
		this._slides = [];
		this._slideIndex = 0;
	};

	PresentationProto.start = function( startAt ) {
		this._slideIndex = startAt || 0;
		var slide = this._slides[ this._slideIndex ];
		this.$container.append( slide.$container );
		slide.init( true );
	};

	PresentationProto.goTo = function( num ) {
		var currentSlide = this._slides[ this._slideIndex ];
		var nextSlide = this._slides[ num ];
		var currentTransition = currentSlide._transitionFunc;
		this._slideIndex = num;
		currentSlide.setTransition(mankini.transitions.fadeBlack);
		currentSlide.transition(true, nextSlide);
		currentSlide.setTransition(currentTransition);
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

	// val - 0 is normal, -1 dark, 1 bright
	PresentationProto.lumaFix = function(val) {
		if (val == 0) {
			this._$lumaFix.css({
				background: 'none',
				display: 'none'
			});
		}
		else if (val > 0) {
			this._$lumaFix.css({
				background: 'rgba(255, 255, 255, ' + val + ')',
				display: 'block'
			});
		}
		else {
			this._$lumaFix.css({
				background: 'rgba(0, 0, 0, ' + (val*-1) + ')',
				display: 'block'
			});
		}
	};

	mankini.Presentation = Presentation;
})();