(function() {
	var presentation = new mankini.Presentation( document.body );

	presentation.builder
		.slideSectionTitle('Testing', 'Hope this works properly')
			.transition('fadeBlack')
		.slideSectionTitle('Again', 'With the testing')
		.slideHeading('Hello everyone!')
			.state('Code')
				.newCode('example.css').showCode(0, 3)
			.stateBullets("This is a point I'm trying to make")
			.stateBullets("This is a point I'm trying to make")
			.state('Hi')
				.showCode()
			.transition('cubeSpin')
		.slideHeading("Another slide!")
			.stateBullets("Hello", "World")
			.transition('fade')
		.slideHeading("One more")
		
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
		// Lanyrd logo
	*/

	
	;presentation.start();
})();