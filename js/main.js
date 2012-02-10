(function() {
	var presentation = new jslides.Presentation( document.body );

	presentation.newSlide().newState('Test State').addAction(function() {
		console.log('State!');
	});

	presentation.start();
})();