(function() {
	function WebView(className) {
		this.$container = $('<div class="mankini-web-view"><iframe src="about:blank"></iframe></div>').addClass( className || '' );
		this._$iframe = this.$container.find('iframe');
	}

	var WebViewProto = WebView.prototype;

	WebViewProto.url = function(animate, str) {
		var webView = this;

		if (animate) {
			this._$iframe.one('load', function() {
				webView.$container.transition({
					height: webView.$container.fullHeight(),
					opacity: 1
				}, {
					duration: 300,
					easing: 'easeOutQuad'
				});
			});
		}
		else {
			webView.$container.css({
				height: 'auto',
				opacity: 1
			});
		}
		this._$iframe[0].src = str;

		return this;
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