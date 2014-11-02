$(document).ready(function(){
    // add event listener
    $('#cameraButton').click(function(){
        console.log('cameraButton clicked');
        $('#fileInput').click();
    });
    $('#checkButton').click(function(){
        console.log('checkButton clicked');
        $('#fileOutput').click();
        sendJob();
    });

    
    var $fileInput = $('#fileInput');
    var $obj = $('#camera');
    if( $obj == null ){	return;	}
    $fileInput.change(function() {
        var file = $fileInput[0].files[0];
        // MegaPixImage constructor accepts File/Blob object.
        var mpImg = new MegaPixImage(file);

        // Render resized image into canvas element, rotating orientation = 6 (90 deg rotate right)
        // Types of orientation is defined in EXIF specification.
        // To detect orientation of JPEG file in JS, you can use exif.js from https://github.com/jseidelin/exif-js

        var resCanvas = document.getElementById('resCanvas2');
        mpImg.render(resCanvas, { maxWidth: 300, maxHeight: 300, orientation: 6 });
    });
});

API_TARGET = 'https://api.apigw.smt.docomo.ne.jp/characterRecognition/v1/scene?APIKEY=31723932483856747674576265745258735441562e653057316e65575a733465314f596c4b447263456a35';

// 認識jobをなげる
function sendJob(){
    var $form = $('#postform').get(0);
    //var $button = $form.find('button');
    var formdata = new FormData($form);

    //send FormData
    $.ajax({
        url: API_TARGET,
        type: 'POST',
        contentType: false,
        processData: false,
        data: formdata,
        dataType: 'json',
        error: function(){
            console.log('error');
        },
        success: function(data, dataType){
            console.log(data);
        }
    });
    console.log('finish');
    return false;
//});
};

//jobが終わったか確認&結果取得
function getResult(){

};


