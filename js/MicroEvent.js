function MicroEvent() {}

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
		this._events = this._events || {};
		if ( !(event in this._events) ) { return this; }
		for (var i = 0, args = Array.prototype.slice.call(arguments, 1), len = this._events[event].length; i < len; i++) {
			this._events[event][i].apply( this, args );
		}
		return this;
	}
};