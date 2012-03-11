(function() {
	function Title() {
		this.$container = $('' +
			'<div class="mankini-title">' +
				'<h1></h1>' +
			'</div>' +
		'');

		this._$h1 = this.$container.find('h1');
	}

	var TitleProto = Title.prototype;

	TitleProto.text = function(text) {
		this._$h1.text( text );
	};

	mankini.slide.Title = Title;
})();