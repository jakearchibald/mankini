(function() {
	var presentation = new mankini.Presentation( document.body );

	presentation.builder
		.slideHeading('Hello everyone!')
			.state('Code example1')
				.newCode('example.js').showCode()
			.stateBullets("This is a point I'm trying to make")
			.transition('cubeSpin')
		.slide()
			.stateBullets("Hello", "World")
			.transition('fade')
			.stateBullets("Hello", "World")
				.notes("Some", "Notes")
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

		// Browser iframe for demos
	
	*/

	
	;presentation.start();
})();