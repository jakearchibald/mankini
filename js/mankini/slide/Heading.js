(function() {
	function Heading(className) {
		this.$container = $('<header class="mankini-heading"><div class="mask"><h1></h1></div></header>').addClass( className || '' );
		this._$h1 = this.$container.find('h1');
		this._currentText = '';
	}

	var HeadingProto = Heading.prototype;

	HeadingProto.text = function(animate, newText) {
		this._$h1.text( newText );

		if ( !this._currentText ) {
			mankini.utils.animateToClass( animate, this.$container );
		}

		this._currentText = newText;
	};

	mankini.slide.Heading = Heading;
})();