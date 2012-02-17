(function() {
	var presentation = new mankini.Presentation( document.body );

	presentation.builder
		.slide()
			.stateBullets("Hello", "World")
				.notes("Some", "Notes")
				.action(function(animate, $slide) {
					var code = new mankini.slide.Code('test-class-name').fromFile('example.js');
					$slide.append( code.$container );
					code.showLines(animate, 0);
				})
			.stateBullets("Foo", "Bar")
				.arrow(1, 'tmp-arrow')
				.notes("Some", "More", "Notes")
			.transition('cubeSpin')
		.slide()
			.stateBullets("Hi")
				.notes("Yey", "Notes")
			.stateBullets("Will this work?")
				.notes("And no more")
			.transition('slideFromRight')
		.slide()
			.stateBullets("I'm from the right!")
			.transition('slideFromLeft')
		.slide()
			.stateBullets("I'm from the left!")
	/* TODOs
		.slideTitle(mainTitle, subTitle)
		.slideSectionTitle(mainTitle, subTitle)
		.slideHeading("This is a heading")
			.state(name)
				.video( url, classNames )
				.videoPlay( pauseAtOptional )
				.videoSeek( time )
				.code( string, lang, lineStart, lineEnd )
				.codeLines( lineStart, lineEnd ) // uses previous code
				.image( url, classNames ) // should cache the img obj
				.imageAction(function(animate, imageElm, loadedDeferred) {
					// For transitions and transforms
					// should image be a jq object? Probably, yes
				})
	
	*/	

	
	;presentation.start();
})();