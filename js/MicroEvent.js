(function() {
	function MicroEvent() {}

	var slice = Array.prototype.slice;

	MicroEvent.prototype = {
		on: function(event, fct){
			this._events = this._events || {};
			this._events[event] = this._events[event] || [];
			this._events[event].push(fct);
			return this;
		},
		off: function(event, fct){
			this._events = this._events || {};
			if ( !(event in this._events) ) { return this; }
			this._events[event].splice(this._events[event].indexOf(fct), 1);
			return this;
		},
		trigger: function(event /* , args... */){
			var events = this._events || {};

			if ( !(event in events) ) { return this; }

			var eventType = events[event];

			for (var i = 0, args = slice.call(arguments, 1), len = eventType.length; i < len; i++) {
				eventType[i].apply( this, args );
			}
			return this;
		}
	};

	window.MicroEvent = MicroEvent;
})();