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
				.video( url, classNames )
				.videoPlay( pauseAtOptional )
				.videoSeek( time )

		// Browser iframe for demos - need button logos
		// Lanyrd logo
	*/

	
	;presentation.start();
})();