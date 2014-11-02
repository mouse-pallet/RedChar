$(document).ready(function(){
    var $fileInput = $('#fileInput');
    var $obj = $('#camera');
    if( $obj == null ){	return;	}
    $fileInput.change(function() {
        console.log($fileInput);
        var file = $fileInput[0].files[0];
        console.log(file);
        // MegaPixImage constructor accepts File/Blob object.
        var mpImg = new MegaPixImage(file);

        // Render resized image into canvas element, rotating orientation = 6 (90 deg rotate right)
        // Types of orientation is defined in EXIF specification.
        // To detect orientation of JPEG file in JS, you can use exif.js from https://github.com/jseidelin/exif-js

        var resCanvas = document.getElementById('resCanvas2');
        mpImg.render(resCanvas, { maxWidth: 300, maxHeight: 300, orientation: 6 });
    });
});

$('#fileOutput').click(function(e){
    var image = new Image();
    var canvas = document.createElement("canvas");
    var canvasContext = canvas.getContext("2d");
    image.onload = function(){
        canvas.width = image.width;
        canvas.height = image.height;
        canvasContext.drawImage(image, 0, 0, image.width, image.height);
        var dataURL = canvas.toDataURL();
        console.log(dataURL);
    };
    image.src = $('#fileInput').value;
});
