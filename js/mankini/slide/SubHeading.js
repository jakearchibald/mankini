(function() {
	function SubHeading(className) {
		this.$container = $('<div class="mankini-sub-heading"/>').addClass( className || '' );
		this._$h = $('<h2/>').appendTo( this.$container );
	}

	var SubHeadingProto = SubHeading.prototype;

	SubHeadingProto.text = function(animate, str) {
		this._$h.text(str);
		mankini.utils.animateToClass( animate, this.$container );
	};

	mankini.slide.SubHeading = SubHeading;
})();