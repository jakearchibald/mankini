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
			var $li = $('<li class="mankini-bullet" />').text( bullet );
			$container.append( $li );
			$newLis = $newLis.add( $li );
		});

		mankini.slide.animateToClass( animate, $newLis );
	};

	BulletsProto._fadeCurrent = function( animate ) {
		var $toFade = this.$container.children().slice( this._fadedTo );
		
		this._fadedTo += $toFade.length;

		mankini.slide.animateToClass( animate, $toFade, 'previous' );
	};

	mankini.slide.Bullets = Bullets;
})();