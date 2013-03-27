(function() {
  function WebView(className) {
    var webView = this;

    this.$container = $('<iframe src="about:blank" class="mankini-web-view"></iframe>').addClass( className || '' );
    this._$iframe = this.$container;
    this.hasUrl = false;
    this._ready = null;
  }

  var WebViewProto = WebView.prototype;

  WebViewProto.url = function(animate, str) {
    var webView = this;
    var deferred = $.Deferred();
    var doAnim = !this.hasUrl && animate;

    this._$iframe.one('load', function() {
      mankini.utils.transition(doAnim, webView.$container, {
        opacity: 1
      }, {
        duration: 300,
        easing: 'easeInOutQuad'
      });
      deferred.resolve();

      webView._$iframe[0].contentWindow.document.addEventListener('keyup', function(event) {
        if (event.keyCode == 27) { // esc
          window.focus();
          event.preventDefault();
        }
      });
    });

    this.hasUrl = true;
    this._$iframe[0].src = str;
    this._ready = deferred;
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

  WebViewProto.remove = function(animate) {
    var webView = this;

    mankini.utils.transition(animate, webView.$container, {
      opacity: 0
    }, {
      duration: 300,
      easing: 'easeInOutQuad',
      complete: function() {
        webView.$container.remove();
      }
    });
  };

  WebViewProto.eval = function(func) {
    var webView = this;

    webView._ready.done(function() {
      webView._$iframe[0].contentWindow.eval('a=' + func.toString() + '()');
    });
  };

  mankini.slide.WebView = WebView;
})();