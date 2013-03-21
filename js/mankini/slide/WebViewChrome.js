(function() {
	function WebViewChrome(className) {
		var webViewChrome = this;

		this.$container = $('' +
			'<div class="mankini-web-view-chrome">' +
				'<div class="mankini-toolbar">' +
					'<div role="button" class="back no-label"><div>Back</div></div>' +
					'<div role="button" class="refresh no-label"><div>Refresh</div></div>' +
				'</div>' +
				'<div class="iframe-container">' +
				'</div>' +
			'</div>' +
		'').addClass( className || '' ).on('click', function(event) {
			event.stopPropagation();
		});

		this._webView = new mankini.slide.WebView();

		this._webView.$container.appendTo( this.$container.find('.iframe-container') );

		this.$container.find('.back').on('click', function(event) {
			webViewChrome._webView.back();
			event.preventDefault();
		});

		this.$container.find('.refresh').on('click', function(event) {
			webViewChrome._webView.refresh();
			event.preventDefault();
		});
	}

	var WebViewChromeProto = WebViewChrome.prototype;

	WebViewChromeProto.url = function(animate, str) {
		var webViewChrome = this;
		var doAnim = !this._webView.hasUrl && animate;

		webViewChrome._webView.url(false, str).done(function() {
			mankini.utils.transition(animate, webViewChrome.$container, {
				height: webViewChrome.$container.fullHeight(),
				opacity: 1
			}, {
				duration: 300,
				easing: 'easeOutQuad'
			});
		});

		return this;
	};

	WebViewChromeProto.back = function() {
		this._webView.back();
		return this;
	};

	WebViewChromeProto.forward = function() {
		this._webView.forward();
		return this;
	};

	WebViewChromeProto.refresh = function() {
		this._webView.refresh();
		return this;
	};

	mankini.slide.WebViewChrome = WebViewChrome;
})();