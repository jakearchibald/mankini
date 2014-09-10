(function() {
  function Camera() {
    this.$container = $('' +
      '<div class="mankini-camera">' +
      '</div>' +
    '').hide();

    this._active = false;
    this._video = document.createElement('video');
    this._stream = null;
    this.$container.append(this._video);
  }

  var CameraProto = Camera.prototype = Object.create(MicroEvent.prototype);

  CameraProto.show = function() {
    if (this._active) { return; }
    this._active = true;

    navigator.webkitGetUserMedia({
      video: true,
      audio: false
    }, function(localMediaStream) {
      this._stream = localMediaStream;
      this._video.src = URL.createObjectURL(localMediaStream);
      this._video.onplaying = function() {
        this._video.onplaying = null;
        this.$container.show().vendorCss({
          opacity: 0
        }).transition({
          opacity: 1
        }, {
          duration: 200,
          easing: 'easeInOutQuad',
          complete: function() {
            this.trigger('start', this._video.src, this._video.offsetWidth / this._video.offsetHeight);
          }.bind(this)
        });

      }.bind(this);
      this._video.play();
    }.bind(this), function(err) {
      console.log("The following error occured: " + err);
    });
  };

  CameraProto.hide = function() {
    if (!this._active) { return; }
    this._video.pause();

    this.$container.transition({
      opacity: 0
    }, {
      duration: 200,
      easing: 'easeInOutQuad',
      complete: function() {
        URL.revokeObjectURL(this._video.src);
        this._stream.getVideoTracks()[0].stop();
        this._video.src = '';
        this.trigger('stop');
      }.bind(this)
    });
    this._active = false;
  };

  CameraProto.toggle = function() {
    this[this._active ? 'hide' : 'show']();
  };

  mankini.Camera = Camera;
})();