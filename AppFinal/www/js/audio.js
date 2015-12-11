function captureAudio() {
	navigator.device.capture.captureAudio(captureAudioSuccess, captureError, {
		limit: 1
	});
}

function captureAudioSuccess(mediaFiles) {
	/*var i, len;
	var formatSuccess = function (mediaFile) {
		//document.getElementById('format-data').innerHTML = "Duration: <strong>" + mediaFile.duration / 1000 + "s</strong><br/>";
	};
	for (i = 0, len = mediaFiles.length; i < len; i += 1) {
		document.getElementById('capture-result').innerHTML = "<strong>" + (i + 1) + "files</strong>";
		*//*mediaFiles[i].getFormatData(formatSuccess, formatError);
		path = mediaFiles[i].fullPath;*/
		/*path = "hola";
		alert(path);
	}*/
	var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
         element =path.split('/0/');
	 	 ruta = element[1];
	 	 alert(path);
      setTimeout(function(){
	  rename(ruta,"notas/bebe.3gpp");
	}, 50);
    }
}
function rename(srcEntry,newName) {   
	window.requestFileSystem(window.PERSISTENT, 1024, function (fileSystem) {
		fileSystem.root.getFile(srcEntry, {}, function(fileEntry) {  
    		fileEntry.moveTo(fileSystem.root, newName);   
  		}, errorHandler);
	}, errorHandler);
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
function errorHandler(error) {
	var message = '';
	switch (error.code) {
	case FileError.SECURITY_ERR:
		message = 'Error de seguridad';
		break;
	case FileError.NOT_FOUND_ERR:
		message = 'Archivo no encontrado';
		break;
	case FileError.QUOTA_EXCEEDED_ERR:
		message = 'Límite excedido';
		break;
	case FileError.INVALID_MODIFICATION_ERR:
		message = 'Modificación inválida';
		break;
	case FileError.INVALID_STATE_ERR:
		message = 'Estado inválido';
		break;
	default:
		message = 'Error desconocido';
		break;
	}
	alert(message);
}

