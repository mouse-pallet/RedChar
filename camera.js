window.onload = function() {
	var fileInput = document.getElementById('fileInput');
	var obj = document.getElementById('camera');
	if( obj == null ){	return;	}
	fileInput.onchange = function() {
		var file = fileInput.files[0];
		// MegaPixImage constructor accepts File/Blob object.
		var mpImg = new MegaPixImage(file);

		// Render resized image into canvas element, rotating orientation = 6 (90 deg rotate right)
		// Types of orientation is defined in EXIF specification.
		// To detect orientation of JPEG file in JS, you can use exif.js from https://github.com/jseidelin/exif-js

		var resCanvas = document.getElementById('resCanvas2');
		mpImg.render(resCanvas, { maxWidth: 300, maxHeight: 300, orientation: 6 });
	};
};


