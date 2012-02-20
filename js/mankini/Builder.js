(function() {
	var ui = mankini.slide;

	function toArray(arrayLike) {
		return Array.prototype.slice.call(arrayLike, 0);
	}

	function Builder(presentation) {
		this._presentation = presentation;
		this._notes = new mankini.Notes();
		this._pointer = new mankini.Pointer();
		this._pointer.$container.appendTo( document.body );

		this._initControls();
		this._stateNames = [];
	}

	var BuilderProto = Builder.prototype;

	BuilderProto._initControls = function() {
		var notes = this._notes,
			presentation = this._presentation,
			builder = this;
		
		presentation.$container.click(function(event) {
			presentation.next( true );
			event.preventDefault();
		});

		document.addEventListener('keydown', function(event) {
			switch(event.keyCode) {
				case 37: // left
					presentation.prev();
					event.preventDefault();
					break;
				case 39: // right
					presentation.next( false );
					event.preventDefault();
					break;
				case 84: // t
					notes.startTime();
					event.preventDefault();
					break;
				case 80: // p
					builder._pointer.toggle();
					event.preventDefault();
					break;
			}
		}, false);
	};

	BuilderProto.slide = function() {
		var builder = this;

		this._slide = this._presentation.newSlide();
		
		// Clear retained instances
		this._slide.on('show', function() {
			builder._code =
				builder._heading =
				builder._webView =
				builder._bullets = undefined;
		});

		return this;
	};

	BuilderProto.transition = function(type) {
		if (typeof type === 'string') {
			type = mankini.transitions[ type ];
		}
		this._slide.setTransition( type );
		return this;
	};

	BuilderProto.state = function(stateName) {
		var stateNames = this._stateNames,
			stateNameIndex = stateNames.length,
			notes = this._notes;
		
		stateNames[ stateNameIndex ] = stateName;
		this._state = this._slide.newState();

		return this.action(function() {
			notes.setNext( stateNames[ stateNameIndex + 1 ] || "No more slides" );
		});
	};

	BuilderProto.action = function(func) {
		this._state.addAction( func );
		return this;
	};

	BuilderProto.stateBullets = function() {
		return this.state( arguments[0] ).bullets.apply( this, arguments );
	};

	BuilderProto.bullets = function() {
		var bulletStrings = toArray(arguments),
			builder = this;

		return this.bulletsClass( bulletStrings );
	};

	BuilderProto.bulletsClass = function(bulletStrings, className) {
		var builder = this;

		if ( !$.isArray( bulletStrings ) ) {
			bulletStrings = [bulletStrings];
		}

		return this.action(function( animate, $slide ) {
			if ( !builder._bullets ) {
				builder._bullets = new ui.Bullets();
				builder._bullets.$container.appendTo( $slide );
			}
			builder._bullets.add( animate, bulletStrings, className );
		});
	};

	BuilderProto.notes = function() {
		var noteStrings = toArray( arguments ),
			builder = this;

		return this.action(function() {
			builder._notes.setNotes( noteStrings );
		});
	};

	BuilderProto.arrow = function(arrowType, className) {
		return this.action(function(animate, $slide) {
			var arrow = new ui.Arrow(arrowType, className);
			$slide.append( arrow.$container );
			arrow.draw( animate );
		});
	};

	BuilderProto.addClass = function(className) {
		this._slide.$container.addClass(className);
		return this;
	};

	BuilderProto.slideClass = function(className) {
		return this.slide().addClass( className );
	};

	BuilderProto.newCode = function(filePath, lang, className) {
		var builder = this;
		return this.action(function( animate, $slide ) {
			builder._code = new ui.Code( className ).fromFile( filePath, lang );
			$slide.append( builder._code.$container );
		});
	};

	BuilderProto.showCode = function(from, to) {
		var builder = this;
		return this.action(function(animate) {
			builder._code.showLines(animate, from, to);
		});
	};

	BuilderProto.slideHeading = function(text) {
		return this.slide().stateHeading( text );
	};

	BuilderProto.stateHeading = function(text) {
		return this.state( text ).heading( text );
	};

	BuilderProto.heading = function(text) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			if ( !builder._heading ) {
				builder._heading = new ui.Heading();
				builder._heading.$container.appendTo( $slide );
			}
			builder._heading.text( animate, text );
		});
	};

	BuilderProto.sectionTitle = function(main, sub) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			var sectionTitle = new ui.SectionTitle();
			sectionTitle.$container.appendTo( $slide );
			sectionTitle.text( animate, main, sub );
		});
	};

	BuilderProto.slideSectionTitle = function(main, sub) {
		return this.slide().state( main + ' - ' + sub ).sectionTitle( main, sub );
	};

	BuilderProto.webView = function(url, className) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			if ( !builder._webView ) {
				builder._webView = new ui.WebView(className);
				builder._webView.$container.appendTo( $slide );
				builder._pointer.proxyIframe( builder._webView._$iframe );
			}
			builder._webView.url( animate, url );
		});
	};

	BuilderProto.webViewBack = function() {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._webView.back();
		});
	};

	BuilderProto.webViewRefresh = function() {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._webView.refresh();
		});
	};

	mankini.Builder = Builder;
})();