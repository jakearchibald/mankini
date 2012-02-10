(function() {
	var presentation = new jslides.Presentation( document.body );

	var slide = presentation.newSlide();

	slide.newState('Test State').addAction(function( animate, $container ) {
		console.log('State!');
	}).addAction(function( animate, $container ) {
		console.log('Another part of the state');
	});

	slide.newState('Part of a new state').addAction(function( animate, $container ) {
		console.log('Second state');
	});


	slide = presentation.newSlide();

	slide.newState('Second slide state').addAction(function( animate, $container ) {
		console.log('New slide');
	});

	slide.newState('Second slide, second state').addAction(function( animate, $container ) {
		console.log('Second slide, second state');
	});

	presentation.start();
})();