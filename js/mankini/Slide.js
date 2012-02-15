(function() {
	function Slide( presentation ) {
		this._presentation = presentation;
		this._states = [];
		this._transitionFunc = mankini.transitions.swap;
		this.$container = $('<section class="slide"/>');
		// Defined elsewhere
		//this._stateIndex = 0;
	}

	var SlideProto = Slide.prototype = Object.create( MicroEvent.prototype );

	SlideProto.newState = function() {
		var state = new mankini.State(this);
		this._states.push( state );
		return state;
	};

	SlideProto.setTransition = function(transitionFunc) {
		this._transitionFunc = transitionFunc;
	};

	SlideProto.transition = function(animate, newSlide) {
		var transitionFunc = animate ? this._transitionFunc : mankini.transitions.swap;
		transitionFunc( this._presentation, this, newSlide );
	};

	SlideProto.init = function(animate) {
		this.$container.empty();
		this.trigger('show');
		this._stateIndex = 0;
		this._states[0].go( animate );
	};

	SlideProto.hasNext = function() {
		return !!this._states[ this._stateIndex + 1 ];
	};

	SlideProto.hasPrev = function() {
		return this._stateIndex !== 0;
	};

	SlideProto.prev = function() {
		var target = this._stateIndex - 1;
		
		this._stateIndex = 0;
		this.init( false );

		while ( this._stateIndex < target ) {
			this.next( false );
		}
	};

	SlideProto.next = function(animate) {
		this._states[ ++this._stateIndex ].go( animate );
	};

	SlideProto.gotoLastState = function() {
		for ( var target = this._states.length -1; this._stateIndex < target; ) {
			this.next(false);
		}
	};

	mankini.Slide = Slide;
})();