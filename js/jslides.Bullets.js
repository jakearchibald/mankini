(function() {
	function Bullets() {
		this.$container = $('<ul/>');
	}

	var BulletsProto = Bullets.prototype;

	BulletsProto = function add(animate, bullets) {
		var $container = this.$container,
			$newLis = $();

		bullets.forEach(function(bullet) {
			var $li = $('<li/>').text( bullet );
			$container.append( $li );
			$newLis.add( $li );
		});

		if (animate) {
			$newLis.vendorCss({
				opacity: 0
			}).transition({
				opacity: 1,
				duration: 1000,
				easing: 'easeOutQuad'
			});
		}
	};

	jslides.Bullets = Bullets;
})();