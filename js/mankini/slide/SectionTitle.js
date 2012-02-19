(function() {
	function SectionTitle() {
		this.$container = $('' +
			'<div class="mankini-section-title">' +
				'<div class="titles">' +
					'<h1></h1>' +
					'<h2></h2>' +
				'</div>' +
			'</div>' +
		'');

		this._$h1 = this.$container.find('h1');
		this._$h2 = this.$container.find('h2');
	}

	var SectionTitleProto = SectionTitle.prototype;

	SectionTitleProto.text = function(animate, main, sub) {
		this._$h1.text( main );
		this._$h2.text( sub );

		mankini.utils.animateToClass( animate, this._$h1 );
		mankini.utils.animateToClass( animate, this._$h2 );
	};

	mankini.slide.SectionTitle = SectionTitle;
})();