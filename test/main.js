(function() {
	var presentation = new mankini.Presentation( document.body );

	presentation.builder
		.slide()
			.stateBullets("Hello", "World")
			.stateBullets("Foo", "Bar")
			.transition('cubeSpin')
		.slide()
			.stateBullets("Hi")
			.stateBullets("Will this work?")
	
	;presentation.start();
})();