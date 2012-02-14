(function() {
	function State(slide) {
		this.slide = slide;
		this._actions = [];
	}

	var StateProto = State.prototype;

	StateProto.go = function(animate) {
		var $container = this.slide.$container;

		this._actions.forEach( function(action) {
			action( animate, $container );
		});
	};

	StateProto.addAction = function(func) {
		this._actions.push(func);
		return this;
	};

	mankini.State = State;
})();