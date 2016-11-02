(function() {
	function State(slide) {
		this.slide = slide;
		this._actions = [];
	}

	var StateProto = State.prototype;

	StateProto.go = async function(animate) {
		const $container = this.slide.$container;

		for (const action of this._actions) {
			await action(animate, $container);
		}
	};

	StateProto.addAction = function(func) {
		this._actions.push(func);
		return this;
	};

	mankini.State = State;
})();