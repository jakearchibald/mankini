(function() {
	var index = 61;

	chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.captureVisibleTab(tab.windowId, {
			format: 'png'
		}, function(data) {
			var canvas = document.createElement('canvas'),
				img = new Image();

			canvas.width = 1024;
			canvas.height = 768;

			img.onload = function() {
				var filePrefix = String(index++);
				filePrefix = Array( 4 - filePrefix.length ).join('0') + filePrefix;
				canvas.getContext('2d').drawImage(img, 0, 0);
				
				var a = document.createElement('a');
				a.href = canvas.toDataURL();
				a.download = filePrefix + '.png';
				a.click();

				// Are we leaking?
				canvas = null;
				img = null;
			};

			img.src = data;
		});
	});

})();