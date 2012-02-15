(function() {
	var presentation = new mankini.Presentation( document.body );

	presentation.builder
		.slide()
			.stateBullets("Hello", "World")
				.notes("Some", "Notes")
			.stateBullets("Foo", "Bar")
				.notes("Some", "More", "Notes")
			.transition('cubeSpin')
		.slide()
			.stateBullets("Hi")
				.notes("Yey", "Notes")
			.stateBullets("Will this work?")
				.notes("And no more")
	/* TODOs
		.slideHeading("This is a heading")
		.slide()
			.addClass( classNames )
			.stateText( string, className ) // add a div with text
			.stateVideo( url, classNames )
			.stateVideoPlay( pauseAtOptional )
			.stateVideoPlay( pauseAtOptional )
			.stateVideoSeek( time )
				.code( string, lang, lineStart, lineEnd )
				.codeLines( lineStart, lineEnd ) // uses previous code
			.stateImage( url, classNames ) // should cache the img obj
			.stateArrow( classNames ) // should float
	*/
	
	;presentation.start();
})();