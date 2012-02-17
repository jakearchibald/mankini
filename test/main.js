(function() {
	var presentation = new mankini.Presentation( document.body );

	presentation.builder
		.slide()
			.stateBullets("Hello", "World")
				.notes("Some", "Notes")
			.stateBullets("Foo", "Bar")
				.action(function(animate, $slide) {
					var arrow = new mankini.slide.Arrow(1, 'tmp-arrow');
					$slide.append( arrow.$container );
					arrow.draw( animate );
				})
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
		.slide()
			.addClass( classNames )
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
				.arrow( classNames ) // should float
	
	*/	

	
	;presentation.start();
})();