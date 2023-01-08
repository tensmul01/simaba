<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
function gen_menu() {
	$CI 	=& get_instance();
	$sess_level = $CI->session->userdata('admin_level');
	$url 	= $CI->uri->segment(2);

	$uri1 = $CI->uri->segment(1);
	$uri2 = $CI->uri->segment(2);
	$uri3 = $CI->uri->segment(3);
	$uri4 = $CI->uri->segment(4);
	$uri5 = $CI->uri->segment(5);
	$model = 'adm';

	$url_host =  $_SERVER['REQUEST_URI'];
	
		
	// file_put_contents('log_param.txt',  "\nTest Proses: " . "\n". $uri1."/".$uri2 . " ==> ". $uri1 . ":". $uri2 . ":". $uri3 . ":". $uri4. ":" .$uri5, FILE_APPEND);

	$menu = array();
	if ($uri1 == "rekap") {
		$menu = array(
	            array("icon"=>"dashboard", "url"=>"adm", "text"=>"Dashboard"),
	            array("icon"=>"list-alt", "url"=>"rekap/periksa_ujian", "text"=>"Periksa Ujian"),
	          );
	} else if ($sess_level == "guru")  {
	  $menu = array(
	            array("icon"=>"dashboard"	, "url"=>"adm"				, "text"=>"Dashboard"),
				array("icon"=>"list-alt"	, "url"=>"jadwalkuliah/absen_mandiri"	, "text"=>"Jadwal Hari ini"),
	            array("icon"=>"file"		, "url"=>"nilai/edit_nilai"	, "text"=>"Daftar Nilai"),
	            array("icon"=>"list-alt"	, "url"=>"soaldosen/view"	, "text"=>"Soal"),
	            array("icon"=>"file"		, "url"=>"nilai/essai"		, "text"=>"Periksa Essai"),
	            array("icon"=>"file"		, "url"=>"adm/m_ujian"		, "text"=>"Ujian"),
	            array("icon"=>"file"		, "url"=>"adm/h_ujian"		, "text"=>"Hasil Ujian"),
	          );
	} else if ($sess_level == "siswa") {
	  $sess_krs = $CI->session->userdata('user_krs'); 
	  $sess_uas = $CI->session->userdata('user_uas'); 
         
	  $menu  = array();
	  
				$menu[]= array("icon"=>"dashboard"	, "url"=>"adm"				, "text"=>"Dashboard");
			  if ( $sess_krs == "Y" ) {
				$menu[]= array("icon"=>"file"		, "url"=>"krs/view_krs"			, "text"=>"K.R.S");
			  }
				$menu[]= array("icon"=>"file"		, "url"=>"nilai/view_khs"			, "text"=>"K.H.S");
				$menu[]= array("icon"=>"list-alt"	, "url"=>"jadwalkuliah/absen_mandiri"	, "text"=>"Absensi Kuliah");

			  if ( $sess_uas == "Y" ) {
				$menu[]= array("icon"=>"file"		, "url"=>"ujian/ikuti_ujian/view02", "text"=>"UTS Online");
//				$menu[]= array("icon"=>"file"		, "url"=>"ujian/uas_online"	, "text"=>"UAS Online 2");
			  }
				$menu[]= array("icon"=>"file"		, "url"=>"adm/biodata_mhs"	, "text"=>"Bio Data");
	    // 		$menu[]= array("icon"=>"file"		, "url"=>"ujian/status_peserta"	, "text"=>"status");
	  
	} else if ($sess_level == "admin") {

		if ($uri2 == "" )  {
		$menu = array(
				array("icon"=>"dashboard"	, "url"=>"adm"			, "text"=>"Dashboard"),
				array("icon"=>"list-alt"	, "url"=>"adm/master"	, "text"=>"Data Master"),
				array("icon"=>"list-alt"	, "url"=>"adm/akademik"	, "text"=>"Akademik"),
				array("icon"=>"list-alt"	, "url"=>"adm/uas"		, "text"=>"Uas"),
				array("icon"=>"list-alt"	, "url"=>"editor/edit_page"	, "text"=>"Admin Page"));
				$GLOBALS['ONMENU']	= "dashboard";
				// file_put_contents('log_param.txt',  "\nDashboard : " . "\n". $uri1."/".$uri2 . " ==> ". $uri1 . ":". $uri2 . ":". $uri3 . ":". $uri4. ":" .$uri5, FILE_APPEND);
				
		} else if ( $GLOBALS['ONMENU']	== "master" ) {
		$menu = array(
				array("icon"=>"dashboard"	, "url"=>"adm"			, "text"=>"Data Master"),
				array("icon"=>"list-alt"	, "url"=>"mahasiswa"	, "text"=>"Mahasiswa"),
				array("icon"=>"list-alt"	, "url"=>"adm/m_guru"	, "text"=>"Dosen"),
				array("icon"=>"list-alt"	, "url"=>"matakuliah"	, "text"=>"Mata Kuliah"),
				array("icon"=>"list-alt"	, "url"=>"jadwalkuliah"	, "text"=>"jadwal Kuliah"),
				array("icon"=>"list-alt"	, "url"=>"jadwaluas"	, "text"=>"jadwal UAS/UTS"));

				$GLOBALS['ONMENU']	= "master";
				
		} else if ( $uri2 == "uas"  or $uri2 == "m_soal"  or $uri2 == "m_ujian" or $uri2 == "h_ujian") {
		$menu = array(
				array("icon"=>"dashboard"	, "url"=>"adm"			, "text"=>"Dashboard"),
				array("icon"=>"list-alt"	, "url"=>"adm/m_soal"	, "text"=>"Soal"),
				array("icon"=>"list-alt"	, "url"=>"ujian/ikuti_ujian/view01"	, "text"=>"view01"),
				array("icon"=>"list-alt"	, "url"=>"ujian/ikuti_ujian/view02"	, "text"=>"View02"),
				array("icon"=>"list-alt"	, "url"=>"ujian/ikuti_ujian/view03"	, "text"=>"View03"),
				array("icon"=>"list-alt"	, "url"=>"adm/m_ujian"	, "text"=>"Ujian"),
				array("icon"=>"list-alt"	, "url"=>"adm/h_ujian"	, "text"=>"Hasil Ujian"));

				$GLOBALS['ONMENU']	= "uas";

		} else 	if ($GLOBALS['ONMENU']="akademik")  {
		$menu = array(
				array("icon"=>"dashboard"	, "url"=>"adm"	, "text"=>"Dashboard"),
				array("icon"=>"list-alt"	, "url"=>"jadwalkuliah/hari_ini"	, "text"=>"Jadwal Hari ini"),
				array("icon"=>"list-alt"	, "url"=>"nilai/admin_view"	, "text"=>"Nilai"),
				array("icon"=>"list-alt"	, "url"=>"setkrs/set_semester_mk", "text"=>"Setting KRS"),
				array("icon"=>"list-alt"	, "url"=>"setkrs/list_mhs"	, "text"=>"List KRS"),
				array("icon"=>"list-alt"	, "url"=>"nilai/list_transkrip"	, "text"=>"Transkrip"),
				array("icon"=>"list-alt"	, "url"=>"setkrs/list_permohonan"	, "text"=>"List Permohonan"),
				array("icon"=>"list-alt"	, "url"=>"quesioner"	, "text"=>"Quesioner"));

				$GLOBALS['ONMENU']	= "akademik";
				// file_put_contents('log_param.txt',  "\n ??? UAS : " . "\n". $uri1."/".$uri2 . " ==> ". $uri1 . ":". $uri2 . ":". $uri3 . ":". $uri4. ":" .$uri5, FILE_APPEND);
		}	

//				array("icon"=>"list-alt"	, "url"=>"setkrs/list_dosenkrs"	, "text"=>"Setting Dosen"),
		
	} else {
		$menu = array(
	            array("icon"=>"dashboard", "url"=>"adm", "text"=>"Dashboard")
	          );

		// file_put_contents('log_param.txt',  "\nElse Default : " . "\n". $uri1."/".$uri2 . " ==> ". $uri1 . ":". $uri2 . ":". $uri3 . ":". $uri4. ":" .$uri5, FILE_APPEND);
			  
		if ($url == "ikut_ujian") { $menu = null;}
	  
	}

	$t1="";
	
	if ($menu != null) {
		echo '
		<div style="margin-top: 50px">

		<div class="col-lg-12 row">
		  <div class="panel panel-default">
		    <div class="panel-body">';
			
		    foreach ($menu as $m) {
				$pos = strpos($url_host, $m['url']);
				//$uri1."/".$uri2 == $m['url']
				$t1 .= "\n" . $url_host . " : " .  $m['url'] . " : " .   $pos ;
				
		        if ( strpos($url_host, $m['url']) !== false ) {

					echo '<a href="'.base_url() .$m['url'].'" class="btn btn-sq btn-warning">
						<i class="glyphicon glyphicon-'.$m['icon'].' g3x"></i><br><br/>'.$m['text'].' </a>';
		        } else {

					echo '<a href="'.base_url() .$m['url'].'" class="btn btn-sq btn-primary">
						<i class="glyphicon glyphicon-'.$m['icon'].' g3x"></i><br><br/>'.$m['text'].' </a>';
		        }
		    }

		echo '</div>
		  </div>
		</div>
		
		</div>'
		;

	}
}


// ==== MENU ===============

/* fungsi non database */
function tjs ($tgl, $tipe) {
	if (is_null($tgl)) return "";
	
	if ($tgl != "0000-00-00 00:00:00") {
		$pc_satu	= explode(" ", $tgl);
		$wday		= date('N', strtotime($tgl));
		if (count($pc_satu) < 2) {	
			$tgl1		= $pc_satu[0];
			$jam1		= "";
		} else {
			$jam1		= $pc_satu[1];
			$tgl1		= $pc_satu[0];
		}

		$pc_dua		= explode("-", $tgl1);
		$tgl		= $pc_dua[2];
		$bln		= $pc_dua[1];
		$thn		= $pc_dua[0];
		
		$bln_pendek		= array("Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des");
		$bln_panjang	= array("Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember");

		$bln_angka		= intval($bln) - 1;

		if ($tipe == "l") {
			$bln_txt = $bln_panjang[$bln_angka];
			return $tgl." ".$bln_txt." ".$thn;
		} else if ($tipe == "s") {
			$bln_txt = $bln_pendek[$bln_angka];
			return $tgl." ".$bln_txt." ".$thn."  ".$jam1;
		} else if ($tipe == "L") {
			$bln_txt = $bln_pendek[$bln_angka];
		    return  hari($wday). ", ".$tgl." ".$bln_txt." ".$thn."  ".$jam1;
		}

	} else {
		return "Tgl Salah";
	}
}

function hari($wekday) {
	if ($wekday>0 && $wekday<=7) {
		$hari	= array("Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu");
		return $hari[$wekday-1];
	}
	return "";
}

function emtpy_check($data, $teks) {
	if (empty($data)) {
		return $teks;
	} else {
		return $data;
	}
}

function terbilang($bilangan){
	$bilangan = abs($bilangan);

	$angka 	= array("Nol","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas");
	$temp 	= "";

	if($bilangan < 12){
		$temp = " ".$angka[$bilangan];
	}else if($bilangan < 20){
		$temp = terbilang($bilangan - 10)." belas";
	}else if($bilangan < 100){
		$temp = terbilang($bilangan/10)." puluh".terbilang($bilangan%10);
	}else if ($bilangan < 200) {
		$temp = " seratus".terbilang($bilangan - 100);
	}else if ($bilangan < 1000) {
		$temp = terbilang($bilangan/100). " ratus". terbilang($bilangan % 100);
	}else if ($bilangan < 2000) {
		$temp = " seribu". terbilang($bilangan - 1000);
	}else if ($bilangan < 1000000) {
		$temp = terbilang($bilangan/1000)." ribu". terbilang($bilangan % 1000);
	}else if ($bilangan < 1000000000) {
		$temp = terbilang($bilangan/1000000)." juta". terbilang($bilangan % 1000000);
	}

	return $temp;
}

function tambah_jam_sql($menit) {
	$str = "";
	if ($menit < 60) {
		$str = "00:".str_pad($menit, 2, "0", STR_PAD_LEFT).":00";
	} else if ($menit >= 60) {
		$mod = $menit % 60;
		$bg = floor($menit / 60);
		$str = str_pad($bg, 2, "0", STR_PAD_LEFT).":".str_pad($mod, 2, "0", STR_PAD_LEFT).":00";
	} 
	return $str;
}

function beda_menit($tg1, $tg2) {
	$d1 = date_create($tg1);
	$d2 = date_create($tg2);
		$interval = date_diff($d1, $d2);
					
		$minutes = $interval->h * 60;
		$minutes += $interval->i;	
	return $minutes;
}


function bersih($data, $pil) {
	//return mysql_real_escape_string 
	return $data->$pil;
}


function obj_to_array($obj, $pilih) {
	$pilihpc	= explode(",", $pilih);
	$array 		= array(""=>"-");

	foreach ($obj as $o) {
		$xx = $pilihpc[0];
		$x = $o->$xx;
		$y = $pilihpc[1];

		$array[$x] = $o->$y; 
	}

	return $array;
}


function tampil_media($file,$width="320px",$height="240px") {
	$ret = '';

	$pc_file = explode(".", $file);
	$eks = end($pc_file);

	$eks_video = array("mp4","flv","mpeg");
	$eks_audio = array("mp3","acc");
	$eks_image = array("jpeg","jpg","gif","bmp","png");


	if (!in_array($eks, $eks_video) && !in_array($eks, $eks_audio) && !in_array($eks, $eks_image)) {
		
		$ret .= '';
	} else {
		if (in_array($eks, $eks_video)) {
			if (is_file("./".$file)) {
				$ret .= '<p><video width="'.$width.'" height="'.$height.'" controls>
				  <source src="'.base_url().$file.'" type="video/mp4">
				  <source src="'.base_url().$file.'" type="application/octet-stream">Browser tidak support</video></p>';
			} else {
				$ret .= '';
			}
		} 

		if (in_array($eks, $eks_audio)) {
			if (is_file("./".$file)) {
				$ret .= '<p><audio width="'.$width.'" height="'.$height.'" controls>
				<source src="'.base_url().$file.'" type="audio/mpeg">
				<source src="'.base_url().$file.'" type="audio/wav">Browser tidak support</audio></p>';
			} else {
				$ret .= '';
			}
		}

		if (in_array($eks, $eks_image)) {
			if (is_file("./".$file)) {
				$ret .= '<div class="gambar"><img src="'.base_url().$file.'" style="width: '.$width.'; height: '.$height.'; display: inline; float: left"></div>';
			} else {
				$ret .= '';
			}
		}
	}

	return $ret;
}

function j($data) {
	header('Content-Type: application/json');
	//$CI =& get_instance();
	//die($CI);
	// file_put_contents('T_ci.var',$CI->conn_id,FILE_APPEND);
	
	//if ( $CI->db->error()['code'] > 0) {
	//   $data['sql_error'] = $CI->db->error;
	//}
	
	echo json_encode($data);
}


function get_list_prodi( $oCI ) {
		$a_prodi = $oCI->db->query("SELECT * from ref_prodi where user_access like '%".$this->session->userdata('admin_konid')."%' order by kode_prodi")->result_array();

		$html_prodi  ="";
		
		$html_prodi .= "<option value='0'>";
		$html_prodi .= "..[Seluruh Prodi]..";
		$html_prodi .= "</option>";

		foreach ($a_prodi as $d) {
				$html_prodi .= "<option value=".$d['kode_prodi'].">";
				$html_prodi .= "[" .$d['kode_prodi'] ."]  ". $d['nama_prodi'];
				$html_prodi .= "</option>";
		}
	return $html_prodi;
}

function get_list_kelas( $oCI, $cpst ) {
		$csql_0 = "
			SELECT tr_jadwal_kul.kelas
			FROM tr_jadwal_kul
			WHERE (((tr_jadwal_kul.tahun_smt)='{$GLOBALS['th_akademik']}') AND ((tr_jadwal_kul.prodi)='{$cpst}'))
			GROUP BY tr_jadwal_kul.kelas 
			ORDER BY tr_jadwal_kul.kelas DESC;";

		$a_kelas = $oCI->db->query($csql_0)->result_array();
			$html_kls = "";
			$html_kls .= "<option value='0'>";
			$html_kls .= "..[semua]..";
			$html_kls .= "</option>";

			foreach ($a_kelas as $d) {
					$html_kls .= "<option value=".$d['kelas'].">";
					$html_kls .= $d['kelas'];
					$html_kls .= "</option>";
			}
					
	return $html_kls;
}

function T_L($text_var) {
	return '<div align=left   >'	."{$text_var}"."</div>";
}
function T_C($text_var, $onklik = "") {
	return '<div align=center '.($onklik !== ""? "onclick=".$onklik:"").' >'	."{$text_var}"."</div>";
}
function T_R($text_var) {
	return '<div align=right  >'	."{$text_var}"."</div>";
}

function cek_hakakses($arr_yg_boleh_akses, $userid) {
	if (!in_array($userid, $arr_yg_boleh_akses)) {
		redirect('adm');
	}
}		

function OpenDatabase($sql_text) {
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "sikap02";

// Create connection
	$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}
	$a_data = mysqli_query($conn, $sql_text);
	if ($a_data) {
		echo "OK";
	} else {
		echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}
	mysqli_close($conn);
	
	return $a_data;
}

function Circle($vartext, $warna = 0) {
	switch (true)
	{
		case ($warna == 0):
			return '<div class="circle">'.$vartext.'</div>';
		case ($warna == 1):
			return '<div class="circle circle-success">'.$vartext.'</div>';
		case ($warna == 2):
			return '<div class="circle circle-info">'.$vartext.'</div>';
		case ($warna == 9):
			return '<div class="circle circle-danger">'.$vartext.'</div>';
	}
	return $vartext;
}

// random untuk deviasi yg kecil...........
/* $asesi = array('0'=>0,'1'=>0,'2'=>0, '3'=>0, '4'=>0, '5'=>0); */
function STDRand($arr) {
	$savArr = $arr;
	$nmax	= max($savArr);
/* 	var_dump($nmax);
	var_dump($savArr);
	die();
 */	
	asort($savArr,SORT_NUMERIC );	

	$nses = count($savArr)-1;
	while (true) 
	{
		foreach ($savArr as $key => $value) {
			$selisih = $nmax - $value;
			for ($b=0; $b<=$selisih; $b++) {
				if (rand(1, $nses) == 1) {
				    return ($key);		
				}
			}
		}
	}	
	return 0;
}	

function OpsRandom($str_text) {
	$nA =	strlen($str_text);
	$ret_str = "";
	for ($np=0; $np<=$nA; $np++){
		$gt=substr($str_text,mt_rand(0,$nA-$np),1);
		$str_text=str_replace($gt, '', $str_text); 
		$ret_str .= $gt;
	}
	return $ret_str;
}

function getUserIP()
{
    // Get real visitor IP behind CloudFlare network
    if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
              $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
              $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
    }
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }

    return $ip;
}



	function record_to_export($table, $db_temp){
	    $no = 1; $records=array(); $kolom = array();
			
		switch (true)
		{
		case ($table == "peserta_uas"):
			$kolom = array("No","prodi", "Nim", "Nama Mahasiswa","kode mk", "Mata kuliah","Sem","Status", "Score", "Keterangan");
	        foreach ($db_temp as $d) {
				
	            $data_ok = array();
	            $data_ok[] = $no++;
	            $data_ok[] = $d['prodi'];
	            $data_ok[] = $d['nim'];
	            $data_ok[] = $d['nama'];
	            $data_ok[] = $d['kode_mk'];
	            $data_ok[] = $d['mata_kuliah'];
	            $data_ok[] = $d['sem'];
	            $data_ok[] = ( $d['status']=="R"?"registrasi": ($d['status']=="N"?"on-Test":"Selesai"));
	            $data_ok[] = $d['score'];
	            $data_ok[] = "#".$d['ordid']." ".$d["keterangan"];
	            $records[] = $data_ok;
	        }
			break;
			
		case ($table == "data_mahasiswa"):
			$kolom = array('No','Prodi','Nama Prodi','Nim','Nama Mahasiswa','tahun','Kelas Reg/Non','Status Awal', 'KRS','UAS','App');

	        foreach ($db_temp as $d) {
				
	            $data_ok = array();
	            $data_ok[] = $no++;
	            $data_ok[] = $d['prodi'];
				$data_ok[] = $d['nama_prodi'];
				$data_ok[] = $d['nim'];
				$data_ok[] = $d['nama'];
				$data_ok[] = $d['tahun_smt'];
				$data_ok[] = ($d['reguler_kls']=="0"?"reguler":"Non-Reguler");
				$data_ok[] = ($d['id_konv']==1?"Baru":"Konversi");
				$data_ok[] = ($d['log_krs']=="Y" ? "Ya" : "Tidak");
				$data_ok[] = ($d['log_uas']=="Y" ? "Ya" : "Tidak");
				$data_ok[] = ($d['log_app']=="Y" ? "Ya" : "Tidak");
	            $records[] 	= $data_ok;
	        }
				
			break;
		case ($table == "data_kurikulum"):
			break;			
		case ($table == "data_dosen"):
			break;
		case ($table == "data_nilai") :
			break;			
		}		
		return array($kolom, $records);
	}
	
	function cROmawi($angka) {
		switch ($angka){
			case 1:
				return("I");
				break;
			case 2:
				return("II");
				break;
			case 3:
				return("III");
				break;
			case 4:
				return("IV");
				break;
			case 5:
				return("V");
				break;
			case 6:
				return("VI");
				break;
			case 7:
				return("VII");
				break;
			case 8:
				return("VIII");
				break;
			case 9:
				return("IX");
				break;
			case 10:
				return("X");
				break;
		}
		
	}
	
	function DBLookup($tabel, $crt, $field) {
		$ret_str="";
		$ci =& get_instance();
		// file_put_contents("test_lookup.txt", "\nselect {$field} from {$tabel} where {$crt} limit 1", FILE_APPEND);
		$rs = $ci->db->query("select {$field} as funct_return from {$tabel} where {$crt} limit 1")->row_array();


		
		if ($rs) {
			$ret_str= $rs['funct_return'];
		}
		return $ret_str;
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


	function GetPicture( $user, $lvl, $sex, $prodi="") {
	$pic_file=""; 
	
	switch ($lvl) {
		case "guru":
			$pic_file = "third_party/crop/dosen/{$user}_profile.jpg";
			break;

		case "siswa":
			//$rec = explode("#", DBLookup("db_mahasiswa","nim = '".$user."'", "concat_ws('#',sex,prodi)"));
			$pic_file = "third_party/crop/mhs/{$prodi}/{$user}_profile.jpg";
			
			
		break;
		case "admin":
			$pic_file = "third_party/crop/admin_profile.jpg";
		break;
	}

	if (!file_exists( $pic_file )) {
				$pic_file = "user/img/".($sex =="L"?"male.webp":"female.webp");
	} else {
		$pic_file .= "?=".  date ("dmHi", filemtime($pic_file));
	}

	return base_url().$pic_file;
	}

function validateDate($date, $format = 'Y-m-d')
{
    $d = DateTime::createFromFormat($format, $date);
    // The Y ( 4 digits year ) returns TRUE for any integer with any number of digits so changing the comparison from == to === fixes the issue.
    return $d && $d->format($format) === $date;
}	

function count_mhs($txt_data) {
		$dp  = explode(";", $txt_data);
		$n= 0;
		foreach( array_unique($dp) as $m) {
			$n += ( trim($m)=="" || (intval(trim($m))>1000000) ? 0 : 1);
		}
	return $n;
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
	
	function webpImage($source, $quality = 25, $removeOld = false, $from_pdf = false)
    {

        $dir = pathinfo($source, PATHINFO_DIRNAME);
        $name = pathinfo($source, PATHINFO_FILENAME);
        $destination = $dir . DIRECTORY_SEPARATOR . $name . '.webp';

		$isAlpha = false;

		
        if ( substr($source,-3)=="pdf" ) {
			$image = new Imagick();
			$imagick->setResolution(150, 150);			
			$image->readImage("{$source}[0]");
			$from_pdf = true;
		} else {
			$info = getimagesize( $source );
		}	
		
		
		
		
        if ( $from_pdf ) {
            $isAlpha = true;

		} else {
			if ($info['mime'] == 'image/jpeg')
				$image = imagecreatefromjpeg($source);
			elseif ($isAlpha = $info['mime'] == 'image/gif') {
				$image = imagecreatefromgif($source);
			} elseif ($isAlpha = $info['mime'] == 'image/png') {
				$image = imagecreatefrompng($source);

			} else {
				return $source;
			}
		}
		
        if ($isAlpha) {
            imagepalettetotruecolor($image);
            imagealphablending($image, true);
            imagesavealpha($image, true);
        }
		
        imagewebp($image, $destination, $quality);

        if ($removeOld)
            unlink($source);

        return $destination;
    }
	
	function upload_PNG() {

		$target_file = 'upload/' . basename($_FILES["file"]["name"]);		

		move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);

		webpImage( $target_file );
	
	}

	function generateCallTrace()
	{
		$e = new Exception();
		$trace = explode("\n", $e->getTraceAsString());
		// reverse array to make steps line up chronologically
		$trace = array_reverse($trace);
		array_shift($trace); // remove {main}
		array_pop($trace); // remove call to this method
		$length = count($trace);
		$result = array();
	   
		for ($i = 0; $i < $length; $i++)
		{
			$result[] = ($i + 1)  . ')' . substr($trace[$i], strpos($trace[$i], ' ')); // replace '#someNum' with '$i)', set the right ordering
		}
	   
		return "\t" . implode("\n\t", $result);
	}

?>	
