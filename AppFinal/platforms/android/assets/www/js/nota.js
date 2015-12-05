var last_click_time = new Date().getTime();
var last_clicked_note;
var filesystem = null;
var candidate_to_delete = false;

document.addEventListener('deviceready', onDeviceReady);

function onDeviceReady() {
	window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
	if (window.requestFileSystem) {
		initFileSystem();
	} else {
		alert("Este dispositivo no soporta el API de archivos. La aplicación no funcionará.");
	}
}

function initFileSystem() {
	window.requestFileSystem(window.PERSISTENT, 1024, function (fs) {
		filesystem = fs;
		listFiles();
	}, errorHandler);
}

function listFiles() {
	filesystem.root.getDirectory('/Notas/', {
		create: false
	}, function (dirEntry) {
		dirReader = dirEntry.createReader();
		var entries = [];
		var fetchEntries = function () {
			dirReader.readEntries(function (results) {
				if (!results.length) {
					displayEntries(entries.sort().reverse());
				} else {
					entries = entries.concat(results);
					fetchEntries();
				}
			}, errorHandler);
		};
		fetchEntries();
	});
}


function saveFile(filename, content) {
	filesystem.root.getFile("Notas/" + filename, {
		create: true
	}, function (fileEntry) {

		fileEntry.createWriter(function (fileWriter) {
			var fileParts = [content];
			var contentBlob = new Blob(fileParts, {
				type: 'text/html'
			});
			fileWriter.write(contentBlob);

			fileWriter.onwriteend = function (e) {
				messageBox.innerHTML = 'File saved!';
			};

			fileWriter.onerror = function (e) {
				console.log('Write error: ' + e.toString());
				alert('An error occurred and your file could not be saved!');
			};

		}, errorHandler);

	}, errorHandler);
}

function displayEntries(entries) {
	var fileList = $(".collection");
	for (var i = 0; i < entries.length; i++) {
		var li = document.createElement('li');
		li.innerText = entries[i].name.replace('.txt', '');
		li.className = "collection-item";
		li.addEventListener('click', onNoteClick);
		fileList.append(li);
	};
}

$(".collection-item").click(onNoteClick);

$("#delete_note").click(removeNote);

function onNoteClick(e) {
	$(".collection-item").css("background-color", "#fff");
	var new_click_time = e['timeStamp'];
	var new_clicked_note = $(this);
	if (new_click_time && new_clicked_note.is(last_clicked_note) && (new_click_time - last_click_time) < 250) {
		$(this).css("background-color", "grey");
		verNota();
	} else {
		$(this).css("background-color", "green");
		candidate_to_delete = true;
	}
	last_clicked_note = new_clicked_note;
	last_click_time = new_click_time;
}

function verNota() {
	var url = "notaEdit.html?title=" + encodeURIComponent(last_clicked_note.html());
	window.location.href = url;
}

function removeNote() {
	if (candidate_to_delete) {
		if (confirm("¿Desea borrar esta nota? " + last_clicked_note.html())) {
			filesystem.root.getFile('/Notas/' + last_clicked_note.html() + '.txt', {}, function (fileEntry) {
				fileEntry.remove(function () {
					alert("Nota eliminada");
				}, errorHandler);
			}, errorHandler);
			last_clicked_note.remove();
			last_clicked_note = null;
			candidate_to_delete = false;
		}
	} else {
		alert("Ningún elemento seleccionado para eliminar.");
	}
}

function escribir() {

	var nombreArch = document.getElementById('note_title').value;
	var contenido = document.getElementById('note_content').value;
	if (nombreArch == "") {
		alert("Ingrese un nombre de archivo");
	} else {
		if (contenido == "") {
			alert("No puede crear un archivo sin contenido");
		} else {
			//alert("se guardo correctamente");

			saveFile(nombreArch + ".txt", contenido);

			//location.href = "miviaje.html";
		}
	}
}

function errorHandler(error) {
	var message = '';
	switch (error.code) {
	case FileError.SECURITY_ERR:
		message = 'Security Error';
		break;
	case FileError.NOT_FOUND_ERR:
		message = 'Not Found Error';
		break;
	case FileError.QUOTA_EXCEEDED_ERR:
		message = 'Quota Exceeded Error';
		break;
	case FileError.INVALID_MODIFICATION_ERR:
		message = 'Invalid Modification Error';
		break;
	case FileError.INVALID_STATE_ERR:
		message = 'Invalid State Error';
		break;
	default:
		message = 'Unknown Error UAY';
		break;
	}
	alert(message);
}