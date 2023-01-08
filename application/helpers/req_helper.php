<?php
	date_default_timezone_set('Asia/Jakarta');

	//$path = './php-app';
	//set_include_path($path);

	require_once "main.php";

/*
	require_once "config.php";
	require_once "imgupload.class.php";
	require_once "up.php";
*/
	//print_r($_POST);
	//print_r($_FILES);
	
	//die();	

    $url_function = explode('/', $_SERVER['REQUEST_URI']);
	$udf="";	

	//print_r($url_function);

	if ( count( $url_function ) >4) {
	   $udf = $url_function[4];

		$url_function[]="";	$url_function[]="";	$url_function[]="";
		$args = array();
		
		for($n=5; $n< count($url_function); $n++) {
			$args[]=$url_function[$n];
		}
	   
	} else {

	   $udf = $_POST['function'];
	   $args = array();
	}

		//echo PHP_EOL .  "run : " . "User define function [ {$udf}] ";
	
	if(function_exists( $udf )) {
		//echo PHP_EOL .  "found ! ";
	   
	    $result = call_user_func_array( $udf, $args);
		//echo PHP_EOL .  "run : " . $udf."<br>";
		//echo "<hr>";
		//echo "Args:";
		//var_dump($args);
		
	} else {
		echo PHP_EOL .  "Not found ! ";
		
	}
	
?>
