<?php
	function je($data) {
		header('Content-Type: application/json');
		echo json_encode($data);
	} 

	function UDFUpload() {
		$status=Upload();
		echo 'sudah upload';
		
	}

	function UDFpmb_reg() {

		require_once "pmb-reg.php";
		$reg=new PMB();
		$reg->registrasi();
		
	}

	function UDLpmb_reg() {

		require_once "pmb-reg.php";
		$reg=new PMB();
		$reg->login();
		
	}

	function UDApmb_reg() {

		require_once "pmb-reg.php";
		$reg=new PMB();
		$reg->activasi();
		
	}

	function UDUpmb_dok() {

		require_once "pmb-reg.php";
		$reg=new PMB();
		$reg->UploadBerkas();
		
	}

	function randomPassword() {
		$alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
		$pass = array(); //remember to declare $pass as an array
		$alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
		for ($i = 0; $i < 8; $i++) {
			$n = rand(0, $alphaLength);
			$pass[] = $alphabet[$n];
		}
    return implode($pass); //turn the array into a string
}

	function randomID() {
    $alphabet = '1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 8; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}

	function rubah_teks( $simple_string, $enc = "0" ) {

	    $teks="";
		
		// Display the original string
		// echo "Original String: " . $simple_string;
		  
		// Store the cipher method
		$ciphering = "AES-128-CTR";
		  
		// Use OpenSSl Encryption method
		$iv_length = openssl_cipher_iv_length($ciphering);
		$options = 0;
		  
		// Non-NULL Initialization Vector for encryption
		$encryption_iv = '1234567891011121';
		  
		// Store the encryption key
		$encryption_key = "Selamatdatang";
		  
		// Use openssl_encrypt() function to encrypt the data
		if ( $enc == "0" ) {
			$teks = openssl_encrypt($simple_string, $ciphering,
					$encryption_key, $options, $encryption_iv);
					$teks = urlencode($teks);
		}	else {
			$teks = urldecode($simple_string);
			$teks = openssl_decrypt ($teks, $ciphering, 
					$encryption_key, $options, $encryption_iv);
		}		

		return $teks;
	}

	function is_session_started()
	{
		if (php_sapi_name() === 'cli')
			return false;

		if (version_compare(phpversion(), '5.4.0', '>='))
			return session_status() === PHP_SESSION_ACTIVE;

		return session_id() !== '';
	}

	function load_menu($side) {
	$name = explode("-", $side);
	
		switch ( $name[0] ) {
		case "xxsideBar" :	
			$html = file_get_contents("php-app/menu-php/menu-side.html");
			break;
		case "Profile" :	
			$html = file_get_contents("php-app/menu-php/menu-profile.html");
			break;
		case "slide" :	
			$html = file_get_contents("php-app/menu-php/menu-slide-". $name[1]. ".html");
			break;
		case "login" :	
			$html = file_get_contents("php-app/menu-php/form-login-". $name[1]. ".html");
			break;
		case "dialog" :	
			$html = file_get_contents("php-app/menu-php/modal-dialog-". $name[1]. ".html");
			break;
		case "langkah" :	
			$html = file_get_contents("php-app/menu-php/langkah-". $name[1]. ".html");
			break;

		default:
			print_r($name);
			$html = $side. " error ";	
			break;
		}
		return $html;
	}

	function encrypt($data){
		$key="0123456789abcde";
		$plaintext = $data;
		$ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
		$iv = openssl_random_pseudo_bytes($ivlen);
		$ciphertext_raw = openssl_encrypt($plaintext, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
		$hmac = hash_hmac('sha256', $ciphertext_raw, $key, $as_binary=true);

		return base64_encode( $iv.$hmac.$ciphertext_raw );
	}
	
	function decrypt($ciphertext){
		$key="0123456789abcde";
		$c = base64_decode($ciphertext);
		$ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
		$iv = substr($c, 0, $ivlen);
		$hmac = substr($c, $ivlen, $sha2len=32);
		$ciphertext_raw = substr($c, $ivlen+$sha2len);
		$original_plaintext = openssl_decrypt($ciphertext_raw, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
		$calcmac = hash_hmac('sha256', $ciphertext_raw, $key, $as_binary=true);

		if (hash_equals($hmac, $calcmac))// timing attack safe comparison
		{
			return  $original_plaintext;
		}

		return $original_plaintext."<p>"."Err:Decript";
	}


	function cROmawi($angka) {
		$armw=["", "I", "II", "III", "IV", "V", "VI" , "VII", "VIII", "IX", "X", "XI", "XII" ];
		return( $armw[$angka] );
	}	

	function tahun2ket($th) {
		return substr($th,0,4) ."-". ( substr($th,4,1)== "1" ? "Ganjil":"Genap");
	}		

	function tahun2sem($th, $th_count) {
		
		$t = substr($th_count,0,4) - substr($th,0,4);
		$s = substr($th_count,-1) - substr($th,-1);
		
		$sem = ($t * 2 ) + ($s) + 1;

		return cRomawi($sem);
		
	}		

	
	function img_src( $f ) {
		
		if ( substr($f,-4)==".pdf" ) {
			return "src='" . str_replace(".pdf", "", $f).  "' data-image='pdf'";}
			else {
			return "src='".$f."'";	
		}
		
		
	}
	
	function img_href( $f ) {
		if ( $f == "" ) {
			return " ";
		}
		
		if ( substr($f,-4)==".pdf" ) {
			return "href='" . str_replace(".pdf", "", $f).  "' data-image='pdf'";}
 		  else {
			return "href='".$f."'";	
		}
	}	
?>
