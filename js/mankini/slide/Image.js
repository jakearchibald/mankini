(function() {
	function Image(src, className, outerClass) {
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

		this.$container.addClass( outerClass || '' );
		
	}

	var ImageProto = Image.prototype;

	ImageProto.show = function(animate) {
		var image = this;
		this.loading.done(function() {
			mankini.utils.animateToClass( animate, image.$container );
		});
	};

	ImageProto.hide = function(animate, animateClass) {
		mankini.utils.animateToClass( animate, this.$container, 'off', animateClass );
	};

	mankini.slide.Image = Image;
})();