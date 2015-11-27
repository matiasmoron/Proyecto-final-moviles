// Global variable 
var img = null,
	needle = null,
	ctx = null,
	grados = 0;
degrees = 0;
// The watch id references the current `watchHeading`
var watchID = null;


// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {

	startWatch();

}

// Start watching the compass
function startWatch() {

	// Update compass every 1/2 seconds
	var options = {
		frequency: 100
	};

	watchID = navigator.compass.watchHeading(onSuccess, onError, options);
}

// Stop watching the compass
//
function stopWatch() {
	if (watchID) {
		navigator.compass.clearWatch(watchID);
		watchID = null;
	}
}



function onSuccess(heading) {

	var element = document.getElementById('heading');

	grados = heading.magneticHeading;
	grados = grados.toFixed();

	if (grados > 23 && grados <= 67) {
		element.innerHTML = 'NE ' + grados;
	} else if (grados > 68 && grados <= 112) {
		element.innerHTML = "E " + grados;
	} else if (grados > 113 && grados <= 167) {
		element.innerHTML = "SE " + grados;
	} else if (grados > 168 && grados <= 202) {
		element.innerHTML = "S " + grados;
	} else if (grados > 203 && grados <= 247) {
		element.innerHTML = "SO " + grados;
	} else if (grados > 248 && grados <= 293) {
		element.innerHTML = "O " + grados;
	} else if (grados > 294 && grados <= 337) {
		element.innerHTML = "NO " + grados;
	} else if (grados >= 338 || grados <= 22) {
		element.innerHTML = "N " + grados;
	}


	//var logo = document.getElementById("imagenbrujula");
	//logo.style.transform = "rotate(" + (heading.magneticHeading) * -1 + "deg)";



}

// onError: Failed to get the heading

function onError(compassError) {

	alert('Compass error: ' + compassError.code);
}

// clear canvas
function clearCanvas() {

	ctx.clearRect(0, 0, 200, 200);
}

function draw() {

	clearCanvas();

	// Draw the compass onto the canvas
	ctx.drawImage(img, 0, 0);

	// Save the current drawing state
	ctx.save();

	// Now move across and down half the 
	ctx.translate(100, 100);

	// Rotate around this point
	ctx.rotate(grados * (Math.PI / 180));

	// Draw the image back and up
	ctx.drawImage(needle, -100, -100);

	// Restore the previous drawing state
	ctx.restore();

	// Increment the angle of the needle by 5 degrees
	degrees += 5;
}

function imgLoaded() {
	// Image loaded event complete.  Start the timer
	setInterval(draw, 100);
}

function init() {
	// Grab the compass element
	var canvas = document.getElementById('compass');

	// Canvas supported?
	if (canvas.getContext('2d')) {
		ctx = canvas.getContext('2d');

		// Load the needle image
		needle = new Image();
		needle.src = 'img/needle.png';

		// Load the compass image
		img = new Image();
		img.src = 'img/compass.png';
		img.onload = imgLoaded;
	} else {
		alert("Canvas not supported!");
	}
}