<?php

display_errors(-1);
ini_set('error_reporting', 1);

function decode() {
	$img = $_POST['encoded_image'];
	$img = str_replace('data:image/jpeg;base64,', '', $img);
	$img = str_replace(' ', '+', $img);

	$data = base64_decode($img);
	return $data;
}

if(isset($_POST['encoded_image'])) {
	$file        = uniqid() . '.jpg';
	$result_file = uniqid(true);
	$data        = decode();

	$success = file_put_contents($file, $data);

	exec("tesseract $file $result_file -l jpn");
	echo trim(file_get_contents($result_file . '.txt'));

	unlink($file);
	unlink($result_file . '.txt');
}
