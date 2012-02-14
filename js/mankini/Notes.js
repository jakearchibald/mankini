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
			notes._$notes = $('.notes', doc);
			notes._$next  = $('.next', doc);
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

	mankini.Notes = Notes;
})();