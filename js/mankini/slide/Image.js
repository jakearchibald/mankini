(function() {
	function Image(src, className) {
		var image = this;

		this.$container = $('' +
			'<div class="mankini-image">' +
				'<div class="mankini-image-inner"></div>' +
			'</div>' +
		'');

		this.loading = $.Deferred();

		this._img = new window.Image();

		this._img.onload = function() {
			image.loading.resolve();
		};

		this._img.src = src;

		$( this._img ).appendTo( this.$container.find('.mankini-image-inner') )
			.addClass( className || '' );
		
	}

	var ImageProto = Image.prototype;

	ImageProto.show = function(animate) {
		var image = this;
		this.loading.done(function() {
			mankini.utils.animateToClass( animate, image.$container );
		});
	};

	ImageProto.hide = function(animate) {
		mankini.utils.animateToClass( animate, this.$container, 'off' );
	};

	mankini.slide.Image = Image;
})();