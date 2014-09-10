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

  var CameraProto = Camera.prototype;

  CameraProto.show = function() {
    if (this._active) { return; }
    this._active = true;

    navigator.webkitGetUserMedia({
      video: true,
      audio: false
    }, function(localMediaStream) {
      this._stream = localMediaStream;
      this._video.src = URL.createObjectURL(localMediaStream);
      this._video.play();
      this.$container.show().vendorCss({
        opacity: 0
      }).transition({
        opacity: 1
      }, {
        duration: 200,
        easing: 'easeInOutQuad'
      });
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
      }.bind(this)
    });
    this._active = false;
  };

  CameraProto.toggle = function() {
    this[this._active ? 'hide' : 'show']();
  };

  mankini.Camera = Camera;
})();