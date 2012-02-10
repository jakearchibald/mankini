(function() {
	function State(slide, name) {
		this.name = name;
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

	jslides.State = State;
})();