(function() {
	var presentation = new mankini.Presentation( document.body );

	var slide = presentation.newSlide();
	var bullets1, bullets2;

	slide.newState('Test State').addAction(function( animate, $slide ) {

		console.log('State!');
		bullets1 = new mankini.slide.Bullets();
		bullets1.$container.appendTo( $slide );
		bullets1.add( animate, ["Hello", "World"] );

	}).addAction(function( animate, $slide ) {
		console.log('Another part of the state');
	});


	slide.newState('Part of a new state').addAction(function( animate, $slide ) {
		bullets1.add( animate, ["Foo", "Bar"] );
		console.log('Second state');
	});


	slide.setTransition( mankini.transitions.cubeSpin );


	slide = presentation.newSlide();

	slide.newState('Second slide state').addAction(function( animate, $slide ) {
		console.log('New slide');
		bullets2 = new mankini.slide.Bullets();
		bullets2.$container.appendTo( $slide );
		bullets2.add( animate, ["Hi"] );
	});

	slide.newState('Second slide, second state').addAction(function( animate, $slide ) {
		console.log('Second slide, second state');
		bullets2.add( animate, ["Will this work?"] );
	});

	presentation.start();
})();