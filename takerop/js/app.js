;(function() {
	'use strict';

	var cropper;

	function resize($canvas, width, height) {
		$canvas
			.attr({
				'width': width,
				'height': height,
			})
			.width(width)
			.height(height);

		var $holder = $canvas.closest('.jcrop-holder');
		$holder.width(width).height(height);
		enableCropping($canvas);

		canvas.width  = width;
		canvas.height = height;
	}

	function crop(image, sx, sy, w, h) {
		var canvas = document.createElement('canvas');
		canvas.width  = w;
		canvas.height = h;

		var ctx = canvas.getContext('2d');
		ctx.drawImage(image, sx, sy, w, h, 0, 0, w, h);

		return canvas;
	}

	function enableCropping($canvas) {
		if(cropper) cropper.disable();

		$canvas.Jcrop({
			boxWidth: +$canvas.attr('width'),
			boxHeight: +$canvas.attr('height'),
		}, function() {
			cropper = this;
		});
	}

	function parseImageSentence(canvas, callback) {
		var base64 = canvas.toDataURL('image/jpeg');

		$.post('./api/parse.php', {
			encoded_image: base64
		}, function(res) {
			$('#debug').append(
				$('<li></li>').append(
					$('<img>').attr('src', base64),
					$('<span></span>').text('結果：【' + res + '】')
				)
			);
		});
	}

	var canvas = {
		width: 0,
		height: 0,
	};

	$(function() {
		var $canvas = $('#preview'),
			ctx = $canvas.get(0).getContext('2d'),
			img;

		canvas.width  = $canvas.width();
		canvas.height = $canvas.height();

		$('#take-a-picture').on('change', function() {
			var reader = new FileReader();

			reader.onload = function() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				img = new Image();
				img.src = this.result;
				$(img).on('load', function() {
					resize($canvas, img.naturalWidth, img.naturalHeight);
					ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				});

				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			};

			reader.readAsDataURL(this.files[0]);
			$(this).val('');
		});

		$('#done').on('click', function() {
			if(!cropper) return false;

			var selected = cropper.tellSelect();
			// どこも選択されていなければ全選択で送信
			if(selected.w === 0 || selected.h === 0) {
				selected = {
					x: 0,
					y: 0,
					x2: canvas.width,
					y2: canvas.height,
					w: canvas.width,
					h: canvas.height,
				};
			}
			cropper.release();

			var cropped = crop($canvas.get(0), selected.x, selected.y, selected.w, selected.h);
			parseImageSentence(cropped, function(parsed) {
				console.log(parsed);
			});
		});
	});
}());
