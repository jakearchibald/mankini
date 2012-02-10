(function() {
	function Bullets() {
		this.$container = $('<ul/>');
		this._fadedTo = 0;
	}

	var BulletsProto = Bullets.prototype;

	BulletsProto.add = function(animate, bullets) {
		var $container = this.$container,
			$newLis = $();
		
		this._fadeCurrent( animate );

		bullets.forEach(function(bullet) {
			var $li = $('<li/>').text( bullet );
			$container.append( $li );
			$newLis = $newLis.add( $li );
		});

		if (animate) {
			$newLis.css({
				opacity: 0
			}).transition({
				opacity: 1
			}, {
				duration: 1000,
				easing: 'easeOutQuad'
			});
		}
	};

	BulletsProto._fadeCurrent = function( animate ) {
		var $toFade = this.$container.children().slice( this._fadedTo ),
			target = { opacity: 0.5 };
		
		this._fadedTo += $toFade.length;

		if (animate) {
			$toFade.transition(target, {
				duration: 1000,
				easing: 'easeOutQuad'
			});
		}
		else {
			$toFade.css(target);
		}
	};

	jslides.Bullets = Bullets;
})();