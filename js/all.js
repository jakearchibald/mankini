(function() {
	var scripts = [
		'jquery-1.7.1.js',
		'jquery.transition.js',
		'mankini.js',
		'mankini.Presentation.js',
		'mankini.Slide.js',
		'mankini.State.js',
		'mankini.Bullets.js',
		'mankini.transitions.js',
		'main.js'
	];

	var scriptPath = (function() {
		var script = Array.prototype.slice.call( document.getElementsByTagName('script'), -1 )[0];
		return script.src.replace(/\/[^\/]*$/, '/');
	})();

	scripts.forEach(function(src) {
		/*var script = document.createElement('script');
		script.defer = true;
		script.src = scriptPath + src;
		document.body.appendChild(script);*/
		document.write('<script src="' + scriptPath + src + '" defer></script>');
	});
})();