(function() {
	function Bullets() {
		this.$container = $('<ul class="mankini-bullets" />');
		this._fadedTo = 0;
	}

	var BulletsProto = Bullets.prototype;

	BulletsProto.add = function(animate, bullets, className) {
		var $container = this.$container,
			$newLis = $();
		
		this._fadeCurrent( animate );

		bullets.forEach(function(bullet) {
			var $li = $('<li class="mankini-bullet" />').text( bullet );
			
			if (className) {
				$li.addClass( className );
			}

			$container.append( $li );
			$newLis = $newLis.add( $li );
		});

		mankini.utils.animateToClass( animate, $newLis );
	};

	BulletsProto._fadeCurrent = function( animate ) {
		var $toFade = this.$container.children().slice( this._fadedTo );
		
		this._fadedTo += $toFade.length;

		mankini.utils.animateToClass( animate, $toFade, 'previous' );
	};

	mankini.slide.Bullets = Bullets;
})();