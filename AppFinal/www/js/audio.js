function captureAudio() {
	navigator.device.capture.captureAudio(captureAudioSuccess, captureError, {
		limit: 1
	});
}

function captureAudioSuccess(mediaFiles) {
	var i, len;
	var formatSuccess = function (mediaFile) {
		//document.getElementById('format-data').innerHTML = "Duration: <strong>" + mediaFile.duration / 1000 + "s</strong><br/>";
	};
	for (i = 0, len = mediaFiles.length; i < len; i += 1) {
		document.getElementById('capture-result').innerHTML = "<strong>" + (i + 1) + "files</strong>";
		mediaFiles[i].getFormatData(formatSuccess, formatError);
	}
}

function captureError(error) {
	var msg = 'A ocurrido un error durante la grabación, vuelva a intentarlo: ' + error.code;
	navigator.notification.alert(msg, null, 'Error!');
	document.getElementById('capture-result').innerHTML = "<strong>Error</strong>";
}

function formatError(error) {
	alert("Error getting file format data: " + error.code);
}

function playAudio() {
	var myMedia = new Media("/recording-923385095.3gpp")
	myMedia.play({
		numberOfLoops: 1
	})
}

function pausa() {
	var myMedia = new Media("/recording-923385095.3gpp")
	myMedia.pause({
		numberOfLoops: 1
	})
}