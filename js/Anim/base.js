(function($, undefined) {
	var baseEasings = {},
		easing = {
			linear: function(p) { return p; }
		};

	$.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( i, name ) {
		baseEasings[ name ] = function( p ) {
			return Math.pow( p, i + 2 );
		};
	});

	$.extend( baseEasings, {
		Sine: function ( p ) {
			return 1 - Math.cos( p * Math.PI / 2 );
		},
		Circ: function ( p ) {
			return 1 - Math.sqrt( 1 - p * p );
		},
		Elastic: function( p ) {
			return p === 0 || p === 1 ? p :
				-Math.pow( 2, 8 * (p - 1) ) * Math.sin( ( (p - 1) * 80 - 7.5 ) * Math.PI / 15 );
		},
		Back: function( p ) {
			return p * p * ( 3 * p - 2 );
		},
		Bounce: function ( p ) {
			var pow2,
				bounce = 4;

			while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
			return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
		}
	});

	$.each( baseEasings, function( name, easeIn ) {
		easing[ "easeIn" + name ] = easeIn;
		easing[ "easeOut" + name ] = function( p ) {
			return 1 - easeIn( 1 - p );
		};
		easing[ "easeInOut" + name ] = function( p ) {
			return p < .5 ?
				easeIn( p * 2 ) / 2 :
				easeIn( p * -2 + 2 ) / -2 + 1;
		};
	});

	(function() {
		var vendors = ['ms', 'moz', 'webkit', 'o'];

		window.requestAnimFrame = window.requestAnimationFrame;

		for(var x = 0; x < vendors.length && !window.requestAnimFrame; ++x) {
			window.requestAnimFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimFrame) {
			window.requestAnimFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		}

		if (!window.cancelAnimFrame) {
			window.cancelAnimFrame = function(id) {
				clearTimeout(id);
			};
		}
	})();

	var activeAnims = [],
		activeAnimsLen = 0,
		animInterval;

	function Anim(duration, opts) {
		opts = $.extend({
			destroyOnComplete: true
			// other options have falsey defaults
		}, opts || {});
		
		this.destroyOnComplete = opts.destroyOnComplete;
		

		if (typeof opts.easing === 'string') {
			this.easing = easing[opts.easing];
		}
		
		this.loop = !!opts.loop;
		this.duration = +duration;
		// defined & used in prop.js
		this._targets = [];
	}

	var AnimProto = Anim.prototype = Object.create( MicroEvent.prototype );

	AnimProto.easing = easing.easeInOutQuad;

	AnimProto.position = 0;
	
	AnimProto.playing = false;

	AnimProto.value = 0;

	AnimProto.start = function(position) {
		if ( !this.playing ) {
			this.trigger('start');
			// we set 'playing' here so goTo knows
			this.playing = true;
			this.goTo(position === undefined ? (this._stopPos || 0) : position);
			activateAnim(this);
		}
		return this;
	};

	AnimProto.stop = function() {
		if ( this.playing ) {
			this.trigger('stop');
			this._stopPos = this.position;
			deactivateAnim(this);
		}
		return this;
	};

	AnimProto.destroy = function() {
		this._evets = undefined;
		this._targets = undefined;
	};

	AnimProto.goTo = function(position) {
		if (position > this.duration) {
			position = this.duration;
		}
		else if (position < 0) {
			position = 0;
		}
		// set stopPos to this so the next call to start() starts from here
		this._stopPos = this.position = position;
		// move the syncTime for this position if we're playing
		if (this.playing) {
			this._syncTime = Date.now() - (position * 1000);
		}
		this.value = this.easing(position / this.duration);
		this.trigger('frame');
		return this;
	};

	/**
		@private
		@function
		@description This is called on each interval
			This set the properties of each animation per frame.
			
			This is the drill sgt of the Anim world.
	*/
	function onInterval( now ) {
		var dateNum = Date.now(),
			i = activeAnimsLen,
			anim;
		
		while (i--) {
			// ideally, this processing would be a function of Anim, but it's quicker this way
			anim = activeAnims[i];
			anim.position = (dateNum - anim._syncTime) / 1000;
			
			// see if this animation is ready to complete
			if (anim.position >= anim.duration) {
				anim.position = anim.duration;
				anim.value = anim.easing(1);
				// render final frame
				anim.trigger('frame');
				anim.trigger('complete');
				// fire 'frame' and 'complete' and see if we're going to loop (preventing default)
				if ( anim.loop ) {
					// loop the animation
					anim._syncTime = dateNum;
				}
				// else deactivave the anim
				else {
					// reset the stop position so further starts start from the beginning
					anim._stopPos = 0;
					deactivateAnim(anim);
					// destroy the anim if needed
					anim.destroyOnComplete && anim.destroy();
				}
			}
			else {
				// set up the value and render a frame
				anim.value = anim.easing( anim.position / anim.duration );
				anim.trigger('frame');
			}
		}

		if (activeAnimsLen) {
			window.requestAnimFrame(onInterval);
		}
	}

	/**
		@private
		@function
		@description Calls 'frame' on an animation on an interval
	*/
	function activateAnim(anim) {
		// if this is the first anim, start the timer
		if (!activeAnimsLen) {
			window.requestAnimFrame(onInterval);
		}
		activeAnims[ activeAnimsLen++ ] = anim;
		anim.playing = true;
	}

	/**
		@private
		@function
		@description Stops calling 'frame' on an animation on an interval
	*/
	function deactivateAnim(anim) {
		// decided to search forward, animations ending are more likely to be older & at the start of the array.
		// This mutates activeAnims
		for (var i = 0, leni = activeAnims.length; i < leni; i++) {
			if (activeAnims[i] === anim) {
				activeAnims.splice(i, 1);
				activeAnimsLen--;
				anim.playing = false;
				return;
			}
		}
	}

	window.Anim = Anim;
})(jQuery);