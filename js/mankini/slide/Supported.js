(function() {
	function Supported(className) {
		this.$container = $('<div class="mankini-supported"/>').addClass( className || '' );
		this._index = 0;
		this._items = [];
	}

	var SupportedProto = Supported.prototype;

	SupportedProto.add = function( imgSrc, version, noSupport ) {
		var $supportedItem = $('<div class="supported-item"/>');

		$('<img/>').prop( 'src', imgSrc ).appendTo( $supportedItem );

		if (version) {
			$('<div class="version"/>').text( version ).appendTo( $supportedItem );
		}

		if ( noSupport ) {
			$supportedItem.addClass('no-support');
		}

		this._items.push( $supportedItem );
		$supportedItem.appendTo( this.$container );

		return this;
	};

	SupportedProto.showNext = function( animate ) {
		mankini.utils.animateToClass( animate, this._items[ this._index++ ] );
	};

	SupportedProto.show = function( animate ) {
		mankini.utils.animateToClass( animate, this.$container );
	};

	mankini.slide.Supported = Supported;
})();