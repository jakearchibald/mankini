(function() {
	var tabWidth = 4,
		tabReplace = new Array( tabWidth + 1 ).join(' ');

	function splitLines(str) {
		return str.match(/^.*$/mg);
	}

	function tabsAndEscape(str) {
		return str.replace( /\t/g, tabReplace )
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	function Code(className) {
		this._$code = $('<code/>');
		this.$container = $('<pre class="mankini-code"/>').append( this._$code ).addClass( className || '' );
		this._lang = '';
		this._codeLines = [];
		this._codeLoader = null;
	}

	var CodeProto = Code.prototype;

	CodeProto.fromFile = function(filePath, lang) {
		var code = this;

		if ( !lang ) {
			lang = filePath.match( /\.([^\.]+)$/ )[1];
		}

		this._codeLoader = $.ajax( filePath, {
			dataType: 'text'
		}).done(function(text) {
			code._codeLines = splitLines( tabsAndEscape(text) );
		});

		this._lang = lang;
		return this;
	};

	CodeProto.fromString = function(code, lang) {
		this._codeLines = splitLines( convertTabs(code) );
		this._lang = lang;
		this._codeLoader = $.Deferred().resolve();
		return this;
	};

	CodeProto.showLines = function(animate, from, to) {
		var code = this;

		this._codeLoader.done(function() {
			from = from || 1;
			to = to || from || code._codeLines.length;
			var codeSlice = code._codeLines.slice(from - 1, to ).join('\n');
			
			if (animate) {
				code.$container.height( code.$container[0].offsetHeight );
			}

			if ( code._lang == 'plain' ) {
				code._$code.html( codeSlice );
			}
			else {
				code._$code.html( prettyPrintOne(codeSlice, code._lang) );
			}


			if (animate) {
				code.$container.transition({
					height: code.$container.fullHeight(),
					opacity: 1
				}, {
					duration: 300,
					easing: 'easeOutQuad'
				});
			}
			else {
				code.$container.css({
					height: 'auto',
					opacity: 1
				});
			}
		});
		return this;
	};

	mankini.slide.Code = Code;
})();