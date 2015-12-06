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
	// Uncomment to view the base64-encoded image data
	console.log(imageURI);
	// Get image handle
	//
	var cameraImage = document.getElementById('image');
	// Unhide image elements
	//
	cameraImage.style.display = 'block';
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	//
	//cameraImage.src = "data:image/jpeg;base64," +imageURI;
	 element =imageURI.split('/0/');
	 rutaImagen = element[1];
	 //alert(element);
	
	filesystem.root.getFile(rutaImagen, {}, function (fileEntry) {
		filesystem.root.getDirectory("notas/", {}, function(dirEntry) {
      		fileEntry.moveTo(dirEntry);
    }, errorHandler);
		

	}, errorHandler); 
	//alert(imageURI);
 
}
// Called when a photo is successfully retrieved
//
 
function onPhotoURISuccess(imageURI) {
	// Uncomment to view the image file URI
	console.log(imageURI);
	// Get image handle
	//
	var galleryImage = document.getElementById('image');
	// Unhide image elements
	//
	galleryImage.style.display = 'block';
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	//
	alert(imageURI);
	//moveFile(imageURI);
}

// A button will call this function
//
 
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
//alert('Failed because: ' + message);
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