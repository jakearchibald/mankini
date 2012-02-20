(function() {
	function Pointer() {
		var pointer = this;
		
		this.$container = $('' +
			'<div class="mankini-pointer">' +
				'<div class="cursor"></div>' +
				'<div class="click-hit"></div>' +
			'</div>' +
		'').hide();

		this._$clickHit = this.$container.find('.click-hit');
		this._active = false;
		this._x = 0;
		this._y = 0;

		document.addEventListener('mousemove', function(event) {
			pointer._x = event.clientX;
			pointer._y = event.clientY;
			if (pointer._active) {
				pointer._position();
			}
		}, false);

		document.addEventListener('mousedown', function(event) {
			if (pointer._active) {
				pointer._click();
			}
		}, true);
	}

	var PointerProto = Pointer.prototype;

	PointerProto.show = function() {
		this.$container.show();
		this._active = true;
		this._position();
	};

	PointerProto.hide = function() {
		this.$container.hide();
		this._active = false;
	};

	PointerProto.toggle = function() {
		this[this._active ? 'hide' : 'show']();
	};

	PointerProto._click = function() {
		this._$clickHit.vendorCss({
			transform: 'scale(0.2)',
			opacity: 1
		}).transition({
			transform: '',
			opacity: 0
		}, {
			duration: 150,
			easing: 'linear'
		});
	};

	PointerProto.proxyIframe = function( $iframe ) {
		var pointer = this;

		$iframe.on('load', function() {
			try {
				$iframe[0].contentDocument.addEventListener('mousemove', function(event) {
					var offset = $iframe.offset();
					pointer._x = event.clientX + offset.left;
					pointer._y = event.clientY + offset.top;
					if (pointer._active) {
						pointer._position();
					}
				}, false);

				$iframe[0].contentDocument.addEventListener('mousedown', function(event) {
					if (pointer._active) {
						pointer._click();
					}
				}, true);

				$('<style>* { cursor: none !important; }</style>').appendTo( $iframe[0].contentDocument.head );
			}
			catch (e) {}
		});
	};

	PointerProto._position = function() {
		this.$container.css({
			top: this._y,
			left: this._x
		});
	};

	mankini.Pointer = Pointer;
})();