<?php
//if ( ! $_FILES) exit('No direct script access allowed'); 

require_once "./php-app/config.php";
require_once "./php-app/imgupload.class.php";
date_default_timezone_set('Asia/Jakarta');
error_reporting(E_ALL);

function Upload( $user ) {
	$img 	= new ImageUpload;
	if ( ! (isset($_FILES)) ) {
		exit();
	} else if (count($_FILES)==0 ) {
		exit();
	}

	//var_dump($_FILES);
	
	if ( isset($_FILES['image']) ) {
		$result = $img->uploadImages( $_FILES['image'], $user );
	}
		else if ( isset($_FILES['file']) ) {
		$result = $img->uploadImages( $_FILES['file'], $user );
		
	}	else {
		
		$result = $img->uploadImages( $_FILES['imagee'], $user );
	}

	$ret_ar=array();
	$ret_ar['error'] =array();
	$ret_ar['sukses']=array();
	$ret_ar['status']=array();
	
	if(!empty($result->error)){
		foreach($result->error as $errMsg){
			$ret_ar['error'][]=$errMsg;
		}
	}

	if(!empty($result->info)){
		foreach($result->info as $infoMsg){
			$ret_ar['sukses'][]=$infoMsg;
		}
	}

	return $result; //$ret_ar; 
}

function ViewImage( $id ) {
	$img = new ImageUpload;
	$img->show2Image($id);
	//echo "View ID: ". $id;
}



?>
