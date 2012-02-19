(function() {
	function splitLines(str) {
		return str.match(/^.*$/mg);
	}

	function Code(className) {
		this._$code = $('<code/>');
		this.$container = $('<pre class="mankini-code"/>').append( this._$code );
		this._lang = '';
		this._codeLines = [];
		this._codeLoader = null;
	}

	var CodeProto = Code.prototype;

	CodeProto.fromFile = function(filePath, lang) {
		var code = this;

		this._codeLoader = $.ajax( filePath, {
			dataType: 'text'
		}).done(function(text) {
			code._codeLines = splitLines(text);
		});

		this._lang = lang;
		return this;
	};

	CodeProto.fromString = function(code, lang) {
		this._codeLines = splitLines(code);
		this._lang = lang;
		this._codeLoader = $.Deferred().resolve();
		return this;
	};

	CodeProto.showLines = function(animate, from, to) {
		var code = this;

		this._codeLoader.done(function() {
			code._$code.text( code._codeLines.slice(from, to).join('\n') );
		});
		return this;
	};

	mankini.slide.Code = Code;
})();