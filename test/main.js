(function() {
	var presentation = new mankini.Presentation( document.body );

	presentation.builder
		.slide()
			.state("SVG Test")
				.action(function(animate, $slide) {
					$slide.addClass('paper-test');
					$container = $('<div/>').appendTo( $slide ).css({
						position: 'absolute',
						top: 0,
						left: 0
					});

					$.ajax('/2012appcachedouche/image%20originals/appcache-diagram-optim.svg').done(function(result) {
						$( result.documentElement ).appendTo( $container );
					});
				})
		.slideSectionTitle('Testing', 'Hope this works properly')
			.transition('fade')
		.slideHeading('Iframe test')
				.webView('http://localhost/sprite-cow/www/')
			.state('Arrow')
				.arrow(1, 'test-arrow')
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
				.setActionContainer( $elm ) // stuff goes in here from now on ($elm created & inserted in a custom action)

		// Port glow2 property animation stuff over, but use raf, for transforming svg
		// Browser iframe for demos - need button icons & server toggle
		// Lanyrd logo
		// Slide selector in notes pane
		// Need to capture hiding the pointer in iframes - this should focus out of iframe too
	*/

	
	;presentation.start();
})();