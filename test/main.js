(function() {
	var presentation = new mankini.Presentation( document.body );

	presentation.builder
		.slide()
			.stateBullets("Hello", "World")
			.transition('fadeBlack')
		.slideHeading('Hello everyone!')
			.stateBullets("Hello", "World")
				.notes("Some", "Notes")
				.newCode('example.js').showCode()
			.stateBullets("Foo", "Bar")
				.arrow(1, 'tmp-arrow')
				.notes("Some", "More", "Notes")
			.transition('cubeSpin')
		.slideClass("Test")
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
				.image( url, classNames ) // should cache the img obj
				.imageAction(function(animate, imageElm, loadedDeferred) {
					// For transitions and transforms
					// should image be a jq object? Probably, yes
				})
	
	*/

	
	;presentation.start();
})();