(function() {
	function Video(src, className) {
		var video = this;

		this.$container = $('' +
			'<div class="mankini-video">' +
				'<div class="mankini-video-inner"></div>' +
			'</div>' +
		'');

		this._canPlay = $.Deferred();
		this._loadedMeta = $.Deferred();

		window.testVid = this._video = document.createElement('video');

		this._video.addEventListener('canplaythrough', function() {
			video._canPlay.resolve();
		}, false);

		this._video.addEventListener('loadedmetadata', function() {
			video._loadedMeta.resolve();
		}, false);

		this._video.preload = 'auto';
		this._video.src = src;

		$( this._video ).appendTo( this.$container.find('.mankini-video-inner') )
			.addClass( className || '' );
	}

	var VideoProto = Video.prototype;

	VideoProto.show = function(animate) {
		var video = this;
		this._canPlay.done(function() {
			mankini.utils.animateToClass( animate, video.$container );
		});
	};

	VideoProto.hide = function(animate, animateClass) {
		mankini.utils.animateToClass( animate, this.$container, 'off', animateClass );
	};

	VideoProto.seekTo = function(time) {
		var video = this;
		this._loadedMeta.done(function() {
			video._video.currentTime = time;
		});
	};

	VideoProto.play = function(animate, time) {
		var video = this;

		this._canPlay.done(function() {
			if (video._playingListener) {
				video._video.removeEventListener('timeupdate', video._playingListener, false);
			}
			if (animate) {
				if (time) {
					video._playingListener = function() {
						if (video._video.currentTime >= time) {
							video.pause();
							video.seekTo(time);
						}
					};
					video._video.addEventListener('timeupdate', video._playingListener, false);
				}

				video._video.play();
			}
			else {
				video.seekTo(time || video._video.duration);
			}
		});
	};

	VideoProto.pause = function(time) {
		var video = this;

		this._canPlay.done(function() {
			video._video.pause();
		});
	};

	mankini.slide.Video = Video;
})();