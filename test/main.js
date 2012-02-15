(function() {
	var presentation = new mankini.Presentation( document.body );

	presentation.builder
		.slide()
			.stateBullets("Hello", "World")
				.notes("Some", "Notes")
			.stateBullets("Foo", "Bar")
				.notes("Some", "More", "Notes")
			.transition('cubeSpin')
		.slide()
			.stateBullets("Hi")
				.notes("Yey", "Notes")
			.stateBullets("Will this work?")
				.notes("And no more")
	
	;presentation.start();
})();