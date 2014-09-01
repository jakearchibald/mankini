(function() {
  function Audio(src, className) {
    var audio = this;

    this.$container = $('<div class="manikini-audio"></div>');

    this._canPlay = $.Deferred();
    this._loadedMeta = $.Deferred();

    this._audio = document.createElement('audio');

    this._audio.addEventListener('canplaythrough', function() {
      audio._canPlay.resolve();
    }, false);

    this._audio.addEventListener('loadedmetadata', function() {
      audio._loadedMeta.resolve();
    }, false);

    this._audio.preload = 'auto';
    this._audio.src = src;

    $( this._audio ).appendTo( this.$container )
      .addClass( className || '' );
  }

  var AudioProto = Audio.prototype;

  AudioProto.seekTo = function(time) {
    var audio = this;
    this._loadedMeta.done(function() {
      audio._audio.currentTime = time;
    });
  };

  AudioProto.play = function(animate, time) {
    var audio = this;

    this._canPlay.done(function() {
      if (audio._playingListener) {
        audio._audio.removeEventListener('timeupdate', audio._playingListener, false);
      }
      if (animate) {
        if (time) {
          audio._playingListener = function() {
            if (audio._audio.currentTime >= time) {
              audio.pause();
            }
          };
          audio._audio.addEventListener('timeupdate', audio._playingListener, false);
        }

        audio._audio.play();
      }
      else {
        audio.seekTo(time || audio._audio.duration);
      }
    });
  };

  AudioProto.loop = function(animate) {
    this._audio.loop = true;
    this.play(animate);
  };

  AudioProto.pause = function(time) {
    var audio = this;

    this._canPlay.done(function() {
      audio._audio.pause();
    });
  };

  mankini.slide.Audio = Audio;
})();