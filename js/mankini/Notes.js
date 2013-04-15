(function() {
	function Notes( presentation, inPage, workshopStyle ) {
		var notes = this,
			win = window;

		this._ready = $.Deferred();
		this._presentation = presentation;
		
		function done() {
			notes._getElements( win.document );
			if (!inPage) {
				win.document.documentElement.className += ' notes-workshop';
			}
			notes._ready.resolve();
		}

		if ( inPage ) {
			$.ajax(scriptRoot + '../html/notes.html').done(function(response) {
				$(response).filter('.mankini-notes').appendTo('body').addClass('mankini-notes-in-page notes-page');
				done();
			});
		}
		else {
			win = window.open(
				scriptRoot + '../html/notes.html', 'notes',
				'menubar=no,toolbar=no,location=no,status=no,dependent=yes'
			);

			if ( win.document.body.innerHTML ) {
				setTimeout(done, 500);
			}
			else {
				$(win).on('load', done);
			}
		}
	}

	var NotesProto = Notes.prototype;

	NotesProto._getElements = function( doc ) {
		var notes = this;
		this._$notes = $('.slide-notes', doc);
		this._$next  = $('.slide-next', doc);
		this._$container = $('.mankini-notes', doc);
		this._time   = $('time', doc)[0];
		this._$index = $('.index-list', doc).on('click', 'li', function(event) {
			notes._presentation.goTo( $(this).data('slideNum') );
			event.preventDefault();
		});
		$('.luma-range', doc).on('change', function() {
			notes._presentation.lumaFix(this.value);
		});
	};

	NotesProto.setNotes = function(strs) {
		var notes = this;

		this._ready.done(function() {
			var $lis = $();

			strs.forEach(function(note) {
				$lis.push( $('<li/>').text(note)[0] );
			});

			notes._$notes.empty().append( $lis );
		});

		return this;
	};

	NotesProto.setNext = function(text) {
		var notes = this;

		this._ready.done(function() {
			notes._$next.text(text);
		});

		return this;
	};

	NotesProto.addIndexItem = function(slideNum, stateName) {
		var notes = this;

		this._ready.done(function() {
			notes._$index.append( $('<li/>').text(stateName).data('slideNum', slideNum) )
		});

		return this;
	};

	NotesProto.startTime = function() {
		var notes = this;

		this._ready.done(function() {
			var time = notes._time;
			var startTime = Date.now();
			
			clearInterval( notes._interval );
			time.textContent = '00:00:00';

			notes._interval = setInterval(function() {
				var duration = Date.now() - startTime;
				var hours   = Math.floor(duration / (1000 * 60 * 60));
				var minutes = Math.floor(duration / (1000 * 60)) - hours * 60;
				var seconds = Math.floor(duration / 1000) - hours * 60 * 60 - minutes * 60;
				var i = 3;
				var timeParts = [
					hours,
					minutes,
					seconds
				];

				while (i--) {
					timeParts[i] = (timeParts[i] < 10 ? '0' : '') + timeParts[i];
				}
				
				time.textContent = timeParts.join(':');
			}, 1000);
		});

		return this;
	};

	NotesProto.toggleIndex = function() {
		this._$container.toggleClass('showIndex');
	};

	mankini.Notes = Notes;
})();