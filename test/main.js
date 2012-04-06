(function() {
	var presentation = new mankini.Presentation( '.presentation' );

	presentation.builder
		.slideTitle("A Presentation")
			.notes(
				"Notes will appear in a popup",
				"This means I can move them to my laptop screen while presenting"
			)
			.transition('fadeBlack')
		.slideSectionTitle('Testing', 'Hope this works properly')
			.notes(
				"Notes can change on a slide by slide basis"
			)
			.transition('fade')
		.slideHeading('Iframe test')
				.webView('http://www.spritecow.com')
			.state('Arrow')
				.arrow(1, 'test-arrow')
			.transition('cubeSpin')
		.slideSectionTitle('Again', 'With the testing')
			.transition('fade')
		.slideHeading('Hello everyone!')
			.state('Code')
				.subHeading("Example Code")
				.newCode('example.css').showCode(1, 3)
			.stateBullets("This is a point I'm trying to make")
			.stateBullets("This is another point I'm trying to make")
			.state('Hi')
				.showCode(1, 7)
			.state("Image")
				.image("http://farm7.staticflickr.com/6041/6322978069_042b1f1337_z.jpg")
			.transition("fadeBlack")
		.slideSectionTitle("That's...", "...all folks")
	
	;presentation.start();
})();