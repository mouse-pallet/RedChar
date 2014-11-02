
console.log("succcessStart");
// 画像読み込み時の各イベントリスナ
var img = document.createElement('img');
img.addEventListener('load', handleLoadSuccess);
img.src = '/Users/Yuko/Desktop/mojininshiki_image.jpg';// 読み込み画像のパス
console.log(handleLoadSuccess)
// 読み込み成功時のコールバック関数
var handleLoadSuccess = function(e){
    console.log("succcessC");

    sendImageBinary(img.src)
}

// バイナリ化した画像をPOSTで送る関数
var sendImageBinary = function(blob) {
    console.log("succcess2");
    var formData = new FormData();
    formData.append('image', blob);
    $.ajax({
	    type: 'POST',
		url: 'https://api.apigw.smt.docomo.ne.jp/characterRecognition/v1/scene?APIKEY=31723932483856747674576265745258735441562e653057316e65575a733465314f596c4b447263456a35',
		data: blob,
		contentType: false,
		processData: false,
		success:function(date, dataType){
		console.log("succcess");
		console.log(data);
		//var $img = $('img');
		//var imgSrc = $img.attr('src');
		//$img.attr('src', "");
		//$img.attr('src', imgSrc);
	    },
		error: function(XMLHttpRequest, textStatus, errorThrown){
		console.log("error");
	    }
	});
};