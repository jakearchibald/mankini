(function() {
	var ui = mankini.slide;

	function toArray(arrayLike) {
		return Array.prototype.slice.call(arrayLike, 0);
	}

	function Builder(presentation) {
		this._presentation = presentation;
		this._notes = new mankini.Notes( presentation, presentation.authoring );
		this._pointer = new mankini.Pointer();
		this._pointer.$container.appendTo( document.body );
		this._$authorInfo = $('.author');
		this._slideNum = 0;
		this._startAt = 0;

		this._initControls();
		this._stateNames = [];
	}

	var BuilderProto = Builder.prototype;

	BuilderProto._initControls = function() {
		var notes = this._notes,
			presentation = this._presentation,
			builder = this;

		document.addEventListener('keydown', function(event) {
			switch(event.keyCode) {
				case 32: // space
				case 13: // enter
					presentation.next( true );
					event.preventDefault();
					break;
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
				case 83: // t
					notes.toggleIndex();
					event.preventDefault();
					break;
				case 80: // p
					builder._pointer.toggle();
					event.preventDefault();
					break;
			}
		}, false);
	};

	BuilderProto.startTimer = function() {
		var builder = this;

		return builder.action(function() {
			builder._notes.startTime();
		});
	};

	BuilderProto.slide = function(className) {
		var builder = this;

		this._slide = this._presentation.newSlide();

		if (className) {
			this._slide.$container.addClass(className);
		}
		
		// Clear retained instances
		this._slide.on( 'show', $.proxy(this.clearRetainedInstances, this) );

		return this;
	};

	BuilderProto.clearRetainedInstances = function() {
		this._code =
			this._heading =
			this._webView =
			this._supported =
			this._arrow =
			this._image =
			this._video =
			this._bullets = undefined;

		this._authorShow();
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
		
		if ( !this._slide._states.length ) {
			this._notes.addIndexItem( this._slideNum, stateName );
			this._slideNum++;
		}

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

	BuilderProto.newBullets = function() {
		var builder = this;

		this.action(function() {
			delete builder._bullets;
		});

		return this.bullets.apply(this, arguments);
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

	BuilderProto.addBulletsClass = function(className) {
		var builder = this;
		return this.action(function( animate, $slide ) {
			builder._bullets.$container.addClass( className );
		});
	};

	BuilderProto.authorHide = function() {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._$authorInfo.addClass('hide');
		});
	};

	BuilderProto._authorShow = function(animate) {
		this._$authorInfo.removeClass('hide');
	};

	BuilderProto.authorShow = function() {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._authorShow( animate );
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
		var builder = this;

		return this.action(function(animate, $slide) {
			builder._arrow = new ui.Arrow(arrowType, className);
			$slide.append( builder._arrow.$container );
			builder._arrow.draw( animate );
		});
	};

	BuilderProto.arrowHide = function(arrowType, className) {
		var builder = this;

		return this.action(function(animate, $slide) {
			builder._arrow.hide( animate );
		});
	};

	BuilderProto.addSlideClass = function(className) {
		this._slide.$container.addClass(className);
		return this;
	};

	BuilderProto.newCode = function(filePath, lang, className) {
		var builder = this;
		return this.action(function( animate, $slide ) {
			builder._code = new ui.Code( className ).fromFile( filePath, lang );
			$slide.append( builder._code.$container );
		});
	};

	BuilderProto.showCode = function(from, to, fontSize) {
		var builder = this;
		return this.action(function(animate) {
			builder._code.showLines(animate, from, to, fontSize);
		});
	};

	BuilderProto.slideHeading = function(text, className) {
		return this.slide().stateHeading( text, className );
	};

	BuilderProto.stateHeading = function(text, className) {
		return this.state( text ).heading( text, className );
	};

	BuilderProto.heading = function(text, className) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			if ( !builder._heading ) {
				builder._heading = new ui.Heading( className );
				builder._heading.$container.appendTo( $slide );
			}
			builder._heading.text( animate, text );
		});
	};

	BuilderProto.title = function(main) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			var title = new ui.Title();
			title.$container.appendTo( $slide );
			title.text( main );
		});
	};

	BuilderProto.slideTitle = function(main) {
		return this.slide().state( main ).title( main );
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

	BuilderProto.webViewHide = function() {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._webView.remove(animate);
		});
	};

	BuilderProto.webViewChrome = function(url, className) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			if ( !builder._webView ) {
				builder._webView = new ui.WebViewChrome(className);
				builder._webView.$container.appendTo( $slide );
				builder._pointer.proxyIframe( builder._webView._webView._$iframe );
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

	BuilderProto.supported = function(supportItems, className) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._supported = new ui.Supported(className);

			supportItems.forEach(function(item) {
				builder._supported.add( item[0], item[1], item[2] );
			});

			builder._supported.$container.appendTo( $slide );
			builder._supported.show( animate );
		});
	};

	BuilderProto.supportedNext = function() {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._supported.showNext( animate );
		});
	};

	BuilderProto.supportedDeactivate = function(item) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._supported.deactivate( animate, item );
		});
	};

	BuilderProto.startHere = function() {
		this._startAt = this._slideNum;
		return this;
	};

	BuilderProto.start = function() {
		this._presentation.start( this._startAt );
		return this;
	};

	BuilderProto.image = function(src, className, outerClass) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._image = new ui.Image(src, className, outerClass);
			$slide.append( builder._image.$container );
			builder._image.show(animate);
		});
	};

	BuilderProto.imageHide = function(src, className) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._image.hide( animate, className );
		});
	};

	BuilderProto.video = function(src, className) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._video = new ui.Video(src, className);
			$slide.append( builder._video.$container );
			builder._video.show(animate);
		});
	};

	BuilderProto.videoHide = function(src, className) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._video.hide( animate, className );
		});
	};

	BuilderProto.videoSeekTo = function(time) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._video.seekTo(time);
		});
	};

	BuilderProto.videoPlay = function(time) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._video.play(animate, time);
		});
	};

	BuilderProto.videoLoop = function(time) {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._video.loop(animate, time);
		});
	};

	BuilderProto.pointerShow = function() {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._pointer.show();
		});
	};

	BuilderProto.pointerHide = function() {
		var builder = this;

		return this.action(function( animate, $slide ) {
			builder._pointer.hide();
		});
	};

	BuilderProto.subHeading = function(text, className) {
		return this.action(function( animate, $slide ) {
			var subHeading = new ui.SubHeading( className );
			$slide.append( subHeading.$container );
			subHeading.text( animate, text );
		});
	};

	BuilderProto.stateSubHeading = function(text, className) {
		return this.state( text ).subHeading( text, className );
	};

	mankini.Builder = Builder;
})();