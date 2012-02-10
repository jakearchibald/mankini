(function() {
	function Slide( presentation ) {
		this._presentation = presentation;
		this._states = [];
		this._stateIndex = 0;
		this._transitionFunc = jslides.transitions.swap;
		this.$container = $('<section class="slide"/>');
	}

	var SlideProto = Slide.prototype;

	SlideProto.newState = function(name) {
		var state = new jslides.State(this, name);
		this._states.push( state );
		return state;
	};

	SlideProto.setTransition = function(transitionFunc) {
		this._transitionFunc = transitionFunc;
	};

	SlideProto.transition = function(animate, newSlide) {
		var transitionFunc = animate ? this._transitionFunc : jslides.transitions.swap;
		transitionFunc( this._presentation, this, newSlide );
	};

	SlideProto.init = function(animate) {
		this.$container.empty();
		this._states[0].go( animate );
	};

	SlideProto.hasNext = function() {
		return !!this._states[ this._stateIndex + 1 ];
	};

	SlideProto.next = function(animate) {
		this._states[ ++this._stateIndex ].go( animate );
	};

	jslides.Slide = Slide;
})();