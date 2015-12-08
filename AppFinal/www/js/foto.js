var pictureSource; // picture source
var destinationType; // sets the format of returned value
var filesystem = null;
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);
// device APIs are available
//
 
function onDeviceReady() {
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
	if (window.requestFileSystem) {
		iniciarSistemaArchivos();
		//alert("Si se pueden escribir archivos.");
	} else {
		alert("Sorry! Your browser doesn\'t support the FileSystem API :(");
	}
}

function iniciarSistemaArchivos() {
	// Request a file system with the new size.
	window.requestFileSystem(window.PERSISTENT, 1024, function (fs) {
		filesystem = fs;
	}, errorHandler);
}
// Called when a photo is successfully retrieved
//
 
function onPhotoDataSuccess(imageURI) {
	 element =imageURI.split('/0/');
	 rutaImagen = element[1];
	 element = imageURI.split('/');
	 nombreDeArchivo = element[7];
	 setTimeout(function(){
	  rename(rutaImagen,"notas/bebe.jpg");
	}, 50);
	
}

/*function move(srcEntry, dirName) {   
		window.requestFileSystem(window.PERSISTENT, 1024, function (fileSystem) {
			fileSystem.root.getFile(srcEntry, {}, function(fileEntry) {     
    		fileSystem.root.getDirectory(dirName, {}, function(dirEntry) {       
      			fileEntry.moveTo(dirEntry);     
    		}, errorHandler);   
  		}, errorHandler); 
	}, errorHandler);
}*/

function rename(srcEntry,newName) {   
	window.requestFileSystem(window.PERSISTENT, 1024, function (fileSystem) {
		fileSystem.root.getFile(srcEntry, {}, function(fileEntry) {  
    		fileEntry.moveTo(fileSystem.root, newName);   
  		}, errorHandler);
	}, errorHandler);
}
 
function capturePhoto() {
// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality : 50,
  destinationType : Camera.DestinationType.FILE_URI,
  sourceType : Camera.PictureSourceType.CAMERA,
  targetWidth: 1000,
  targetHeight: 1000,
  correctOrientation: true,
  saveToPhotoAlbum: true });
}
// A button will call this function
//
 
function getPhoto(source) {
// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, onFail, {
	quality: 30,
	targetWidth: 600,
	targetHeight: 600,
	destinationType: destinationType.FILE_URI,
	sourceType: source
	});
}
// Called if something bad happens.
//
 
function onFail(message) {
	alert('Failed because: ' + message);
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