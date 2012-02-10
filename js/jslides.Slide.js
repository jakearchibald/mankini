(function() {
	function Slide() {
		this._states = [];
		this.$container = $('<div class="slide"/>');
	}

	var SlideProto = Slide.prototype;

	SlideProto.newState = function(newState) {
		var state = new jslides.State(this);
		this._states.push( state );
		return state;
	};

	jslides.Slide = Slide;
})();