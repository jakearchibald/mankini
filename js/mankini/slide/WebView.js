(function() {
  function WebView(className) {
    var webView = this;

    this.$container = $('<iframe src="about:blank" class="mankini-web-view"></iframe>').addClass( className || '' );
    this._$iframe = this.$container;
    this.hasUrl = false;
  }

  var WebViewProto = WebView.prototype;

  WebViewProto.url = function(animate, str) {
    var webView = this;
    var deferred = $.Deferred();
    var doAnim = !this.hasUrl && animate;

    this._$iframe.one('load', function() {
      if ( doAnim ) {
        mankini.utils.transition(animate, webView._$iframe, {
          opacity: 1
        }, {
          duration: 300,
          easing: 'easeInOutQuad'
        });
      }
      deferred.resolve();
    });

    this.hasUrl = true;
    this._$iframe[0].src = str;

    return deferred;
  };

  WebViewProto.back = function(str) {
    this._$iframe[0].contentWindow.history.back();
    return this;
  };

  WebViewProto.forward = function(str) {
    this._$iframe[0].contentWindow.history.forward();
    return this;
  };

  WebViewProto.refresh = function(str) {
    this._$iframe[0].contentWindow.history.go();
    return this;
  };

  mankini.slide.WebView = WebView;
})();