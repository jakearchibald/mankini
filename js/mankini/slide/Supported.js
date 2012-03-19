(function() {
	function Supported(className) {
		this.$container = $('<div class="mankini-supported"/>').addClass( className || '' );
		this._index = 0;
		this._$items = $();
	}

	var SupportedProto = Supported.prototype;

	SupportedProto.add = function( imgSrc, version, noSupport ) {
		var $supportedItem = $('<div class="supported-item"/>');

		$('<img/>').prop( 'src', imgSrc ).appendTo( $supportedItem );

		if (version) {
			$('<div class="version"/>').text( version ).appendTo( $supportedItem );
		}

		$supportedItem.addClass( /([^\/]+)\.[^\.]+$/.exec(imgSrc)[1] );

		if ( noSupport ) {
			$supportedItem.addClass('no-support');
		}

		this._$items.push( $supportedItem[0] );
		$supportedItem.appendTo( this.$container );

		return this;
	};

	SupportedProto.showNext = function( animate ) {
		mankini.utils.animateToClass( animate, this._$items.eq( this._index++ ) );
	};

	SupportedProto.show = function( animate ) {
		mankini.utils.animateToClass( animate, this.$container );
	};

	SupportedProto.deactivate = function( animate, item ) {
		var $toDeactivate = this._$items.filter( '.' + item );

		mankini.utils.animateToClass( animate, $toDeactivate, 'deactivated' );
	};

	mankini.slide.Supported = Supported;
})();