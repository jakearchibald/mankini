(function() {
	function WebView(className) {
		var webView = this;

		this.$container = $('' +
			'<div class="mankini-web-view">' +
				'<div class="mankini-toolbar">' +
					'<div role="button" class="back"><div>Back</div></div>' +
					'<div role="button" class="refresh"><div>Refresh</div></div>' +
				'</div>' +
				'<iframe src="about:blank"></iframe>' +
			'</div>' +
		'').addClass( className || '' ).on('click', function(event) {
			event.stopPropagation();
		});

		this._$iframe = this.$container.find('iframe');

		this.$container.find('.back').on('click', function(event) {
			webView.back();
			event.preventDefault();
		});

		this.$container.find('.refresh').on('click', function(event) {
			webView.refresh();
			event.preventDefault();
		});
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