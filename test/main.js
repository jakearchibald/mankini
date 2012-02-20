(function() {
	var presentation = new mankini.Presentation( document.body );

	presentation.builder
		.slideSectionTitle('Testing', 'Hope this works properly')
			.transition('fade')
		.slideHeading('Iframe test')
				.webView('http://localhost/')
			.transition('cubeSpin')
		.slideSectionTitle('Again', 'With the testing')
			.transition('fade')
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
			.state(name)
				.newContainer( $container ) // now things will be inserted into this rather than $slide - useful for columns
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
		// Cursor hide & show (make sure it shows over iframes)
	*/

	
	;presentation.start();
})();