(function() {
	function State(slide) {
		this.transition = null;
		this.slide = slide;
		this._actions = [];
	}

	var StateProto = State.prototype;

	StateProto.go = function(animate) {
		var $container = this.slide.$container;

		this._actions.forEach( function(action) {
			action( $container, animate );
		});
	};

	StateProto.addAction = function(func) {
		this._actions.push(func);
		return this;
	};

	jslides.State = State;
})();