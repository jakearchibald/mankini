(function() {
	function Notes() {
		var notes = this;

		this._ready = $.Deferred();

		this._win = window.open(
			scriptRoot + '../html/notes.html', 'notes',
			'menubar=no,toolbar=no,location=no,status=no,dependent=yes'
		);

		$(this._win).on('load', function() {
			var doc = this.document;
			notes._$notes = $('.slide-notes', doc);
			notes._$next  = $('.slide-next', doc);
			notes._time   = $('time', doc)[0];
			notes._ready.resolve();
		});
	}

	var NotesProto = Notes.prototype;

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

	NotesProto.startTime = function() {
		var notes = this;

		this._ready.done(function() {
			var time = notes._time;
			var startTime = new Date();
			
			clearInterval( notes._interval );
			time.textContent = '00:00:00';

			notes._interval = setInterval(function() {
				var duration = new Date( new Date() - startTime );
				var i = 3;
				var timeParts = [
					duration.getHours(),
					duration.getMinutes(),
					duration.getSeconds()
				];

				while (i--) {
					timeParts[i] = (timeParts[i] < 10 ? '0' : '') + timeParts[i];
				}
				
				time.textContent = timeParts.join(':');
			}, 1000);
		});

		return this;
	};

	mankini.Notes = Notes;
})();