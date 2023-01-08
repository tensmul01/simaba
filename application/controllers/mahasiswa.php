<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
date_default_timezone_set("Asia/Jakarta");

class Mahasiswa extends CI_Controller {
	function __construct() {
		parent::__construct();
        $this->db->query("SET time_zone='+7:00'");
        $waktu_sql = $this->db->query("SELECT NOW() AS waktu")->row_array();
        $this->waktu_sql = $waktu_sql['waktu'];

			$GLOBALS['tahun_krs'] = substr( DBLookup("configdb", "keterangan='tahun_krs'"  ,'value_data'),0, 5);
			$GLOBALS['tahun_khs'] = substr( DBLookup("configdb", "keterangan='tahun_nilai'",'value_data'),0, 5);
		
		$this->tahun_krs = $GLOBALS['tahun_krs'];
		$this->tahun_khs = $GLOBALS['tahun_khs'];
		$this->tahun_akademik =  $GLOBALS['tahun_krs'];
		$GLOBALS['th_akademik'] = $this->tahun_krs;		
	}
	
	public function get_servertime() {
		$now = new DateTime(); 
        $dt = $now->format("mj, Y H:i:s O"); 
		j($dt);
	}
	
	public function get_test() {
		echo "<h1>". DBLookup("configdb", "keterangan='tahun_krs'",'value_data')." with lookup</h1>";
	}

	public function get_look() {
		$rec=$this->db->query("select value_data from configdb where keterangan='tahun_krs'")->row_array();
		echo "<h1>". $rec['value_data']." with query</h1>";
	}

	public function set_active( $npm, $redirect = false, $login_as = false ) {
			$user = $this->db->query("SELECT * FROM db_mahasiswa WHERE nim = '{$npm}'")->row();
			$par=array($npm, $redirect, $login_as);
			
			if (!$user) {
				j("error");
				return false;
			}

			$adm  = $this->db->query("SELECT * FROM m_admin WHERE kon_id = '{$user->id}' and level='siswa' ")->row();

			if (!$adm) {
				j("error");
				return false;
			}

			//$sav_session = $this->session->userdata($data);
			
			$data = array(
                    'admin_id' 		=> $adm->kon_id,
                    'admin_user' 	=> $user->nim,
                    'admin_level' 	=> "siswa",
                    'admin_konid' 	=> $adm->id,
                    'admin_nama' 	=> $user->nama,
                    'admin_active' 	=> 1,
                    'admin_biodata' => true,
					'admin_valid' 	=> true,
                    'tahun_akademik'=> $this->tahun_krs,
					'admin_valid' 	=> true,
					'admin_query' 	=> "",
					'admin_pic'		=> "",
					'admin_redirect'=> $this->session->userdata('admin_id'),
					'login_as'		=> $login_as,
                    );
					

            $this->session->set_userdata($data);
			
			if ( $redirect ) {
				//echo "Active : ".$npm;
				header('Location:  '.base_url());
				exit();
			}
			
			j($this->session->userdata);
	}

	public function cek_aktif() {
		if ($this->session->userdata('admin_valid') == false && $this->session->userdata('admin_id') == "") {
			redirect('adm/login');
		} 
	}

	public function index() {
		$this->cek_aktif();
		cek_hakakses(array("admin"), $this->session->userdata('admin_level'));

		$GLOBALS['ONMENU']	= "master";
		
		//var def session
		$a['sess_level'] = $this->session->userdata('admin_level');
		$a['sess_user'] = $this->session->userdata('admin_user');
		$a['sess_konid'] = $this->session->userdata('admin_konid');
		$a['page']	   = "v_mahasiswa";

		$this->load->model('Utility');
		$a['oUtilty']		= $this->Utility;
		
		$this->load->view('admin_page', $a);
	}

	public function view_export() {
		$this->cek_aktif();
		cek_hakakses(array("admin"), $this->session->userdata('admin_level'));
		
		if (!empty($_POST)) {
				$search 	= $_POST['flt_search'];
				$uri_prodi 	= $_POST['flt_prodi'];
				$status		= $_POST['flt_status'];
		} else {
				$search 	= "";
				$uri_prodi 	= "00000";
		}	

		
		if ( $status !== "12") {
			$csql_0 = "SELECT a.*, nama_prodi FROM db_mahasiswa as a inner join ref_prodi on a.prodi = ref_prodi.kode_prodi";
		} else {
			$csql_0 = "SELECT a.*, nama_prodi FROM db_mahasiswa as a 
						inner join ref_prodi on a.prodi = ref_prodi.kode_prodi 
						left JOIN ref_akm_mhs ON a.nim = ref_akm_mhs.nim_mhs and '20192' = ref_akm_mhs.last_akm";}
		$ccrt = "true";

				$ccrt .=  ( $uri_prodi != "00000" ?  " and a.prodi='{$uri_prodi}'" 	: "");
				switch (true) 
				{
					case (strlen($status)==0):
						break;
					case  ( strpos(";ALCNKD", $status)>0):
						$ccrt .= " and (a.status_mhs = '{$status}')";
						break;
					case ( $status == "11"):
						$ccrt .= " and (a.log_krs='Y')";
						break;
					case ( $status == "12"):
						$ccrt .= " and ( a.log_krs='Y' and (ref_akm_mhs.last_akm is null) )";
						break;
					case ( $status == "10"):
						$ccrt .= " and (a.log_krs='N')";
						break;
					case ( $status == "21"):
						$ccrt .= " and (a.log_uas='Y')";
						break;
					case ( $status == "20"):
						$ccrt .= " and (a.log_uas='N')";
						break;
				}	

		$ccrt .=  ( $search != "" ? " and CONCAT_WS('', nim, nama, kelas) LIKE  '%".$search."%'" : "");
		$csql_0 .= " where " . $ccrt . " order by tahun_smt desc, a.prodi, a.nim"; 
		
		$a["sql_query"] 	= $csql_0. " LIMIT 0, 10000";
		$a['oDB']			= $this->db;
		$a['nametable']		= "data_mahasiswa";
	    $a['title'  	 ] 	= "DAFTAR SELURUH MAHASISWA IKIP SILIWANGI TAHUN ".$this->tahun_akademik;
		//$this->load->view('DTExport', $a);
		$this->load->view('DTExport2', $a);
	}
	
	public function excel_list() {
		$this->cek_aktif();
		cek_hakakses(array("admin"), $this->session->userdata('admin_level'));
		$a['p']	= "f_siswa_import";
		$a['doproses']	= "add_aktifasi";
		$this->load->view('aaa', $a);
	}

	public function data() {
		// die("test ERROR");
		
			$GLOBALS['param1']	= "STiM Budi";
		
			$uri2 = $this->uri->segment(2);
			$uri3 = $this->uri->segment(3);
			$uri4 = $this->uri->segment(4);
			$use_last_filter = false;
			
			
				$start 	= $this->input->post('start');
				$length = $this->input->post('length');
				$draw 	= $this->input->post('draw');
				$search = $this->input->post('search');
				
				$prodi  = $this->input->post('prodi');
				$kelas  = $this->input->post('kelas');
				$status = $this->input->post('status');
				$mulai  = $this->input->post('mulai');

				$csql_0 = "SELECT a.*, nama_prodi FROM db_mahasiswa as a 
						   inner join ref_prodi on a.prodi = ref_prodi.kode_prodi";


			$ccrt = "true";

			 // left join m_admin on db_mahasiswa.nim=m_admin.username
				$ccrt .=  ( $prodi != "00000" 	? " and a.prodi='{$prodi}'" 	: "");
				$ccrt .=  ( $kelas != "" 		? " and a.kelas='{$kelas}'" 	: "");
				$ccrt .=  ( $mulai != "" 		? " and a.tahun_smt like '{$mulai}%'" : "");

				switch (true) 
				{
					case (strlen($status)==0):
						break;
					case ( $status == "B"):
						$ccrt .= " and (a.id_konv='1')";
						break;
					case ( $status == "P"):
						$ccrt .= " and (a.id_konv='2')";
						break;
					case  ( strpos(";ALCNKD", $status)>0):
						$ccrt .= " and (a.status_mhs = '{$status}')";
						break;

					/* KRS reg... */
					case ( $status == "11"):
						$csql_0 .= " inner join ref_akm_mhs as akm on ( a.nim = akm.nim_mhs and '{$this->tahun_krs}' = akm.last_akm )";
						$ccrt .= " and ( a.log_krs='Y' )";
						break;

					/* KRS NON reg... */
					case ( $status == "10"):
						$ccrt .= " and ( a.status_mhs = 'A' and a.log_krs='N' )";
						break;
						
					case ( $status == "12"):
						$csql_0 .= " left join ref_akm_mhs as akm on ( a.nim = akm.nim_mhs and '{$this->tahun_krs}'=akm.last_akm )";
						$ccrt .= " and ( a.log_krs='Y' and ( akm.last_akm is null) )";
						break;

					case ( $status == "21"):
						$ccrt .= " and ( a.status_mhs = 'A' and a.log_uas='Y')";
						break;
					case ( $status == "20"):
						$ccrt .= " and ( a.status_mhs = 'A' and a.log_uas='N')";
						break;
				}	
				$ccrt .=  ( $search['value'] != "" ? " and CONCAT_WS('', nim, nama, kelas) LIKE  '%".$search['value']."%'" : "");

			
			$csql_0 .= " where " . $ccrt; 
			// print($csql_0);

			//$d_total_row = $this->db->query($csql_0)->num_rows();
			$sql_count	 = "select count(nim) as row_max from db_mahasiswa as a where ".$ccrt;			
			//file_put_contents("log_database.txt", $sql_count);

			// cek last criteria....
			if ( $this->session->userdata("last_filter") == $ccrt ) {

				$d_total_row=$this->session->userdata("last_filter_rows");
				$use_last_filter = true;

			} else {
				$d_total_row=$this->db->query($csql_0)->num_rows();
				$use_last_filter = false;
			}


			$this->session->set_userdata("last_filter", $ccrt);
			$this->session->set_userdata("last_filter_rows", $d_total_row);
			
			//$d_total_row=$_test->row_max;
			
			$time_start = microtime(true); 

	//		die($csql_0 . " LIMIT ".$start.", ".$length."");
			
	        $q_datanya = $this->db->query($csql_0 . " order by tahun_smt desc, prodi, nim  LIMIT ".$start.", ".$length."" )->result_array();


	        $data = array();
	        $no = ($start+1);
			$for_check_ada = array();
			
	        foreach ($q_datanya as $d) {
				$for_check_ada[] = $d["id"];
				
				$checked1 = ( ($d['log_krs']=="Y") ? " checked" : "");
				$checked2 = ( ($d['log_uas']=="Y") ? " checked" : "");
				$checked3 = ( ($d['log_app']=="Y") ? " checked" : "");
                $icon_log = "";

                $sudah_login = 	$this->db->query("select status_user from m_admin where username='".$d['nim']."' limit 1")->row();
                
                if ($sudah_login) {
                    if ($sudah_login->status_user=="01") {
                        $icon_log='<i class="glyphicon glyphicon-log-in"></i>';}
                    if ($sudah_login->status_user=="02") {
                        $icon_log='<i class="glyphicon glyphicon-log-out"></i>';}
                } else {
					/* tidak ada dalam admin */
				}					
				
				$sudah_krs = ( DBlookup("ref_akm_mhs", "(nim_mhs='{$d['nim']}' and last_akm='{$this->tahun_krs}')","nim_mhs")== $d['nim']);
				if ($sudah_krs) {
					$ckv1 = '
						<label class="btn btn-success disabled btn-xs" >
						  <input disabled id="krs-'.$d['nim'].'" onchange="mhs_status_app(this, 1, '.$d["id"].')" type="checkbox" '.$checked1.' >&nbsp;KRS
						</label>';

				} else {
					$ckv1 = '
						<label class="btn btn-default btn-xs" for="krs-'.$d['nim'].'" >
						  <input id="krs-'.$d['nim'].'" onchange="mhs_status_app(this, 1, '.$d["id"].')" type="checkbox" '.$checked1.' >&nbsp;KRS
						</label>';
				}
			
				$ckv2 = '
					<label class="btn btn-default btn-xs">
					  <input onchange="mhs_status_app(this, 2, '.$d["id"].')" type="checkbox" '.$checked2.' >&nbsp;UAS
					</label>';

				$ckv3 = '
					<label class="btn btn-default btn-xs">
					  <input onchange="mhs_status_app(this, 3, '.$d["id"].')" type="checkbox" '.$checked3.' >&nbsp;App
					</label>';

				

				
	            $data_ok = array();
	            $data_ok[0] = $no++;
	            $data_ok[1] = $d['prodi']."<br>".$d['nama_prodi']."<br><a href='".base_url()."mahasiswa/set_active/{$d['nim']}/true'>Login as</a>";
				
				/*Kode Kelas : ".$d['kelas'].'
							 <div class="form-check-inline">
							  <label class="form-check-label">
								<input type="radio"  onchange="mhs_kelas(this, '.$d["id"].', 1)" class="form-check-input" name="optradio'.$d["id"].'" '.  (strpos($d['kelas'],"A") !== false  ? 'checked': '').' > A
							  </label>
							</div>
							<div class="form-check-inline">
							  <label class="form-check-label">
								<input type="radio" onchange="mhs_kelas(this, '.$d["id"].', 2)" class="form-check-input" name="optradio'.$d["id"].'" '.  (strpos($d['kelas'],"B") !== false  ? 'checked': '').' > B
							  </label>
							</div>
							<div class="form-check-inline disabled">
							  <label class="form-check-label">
								<input type="radio" onchange="mhs_kelas(this, '.$d["id"].', 3)" class="form-check-input" name="optradio'.$d["id"].'" '.  (strpos($d['kelas'],"C") !== false  ? 'checked': '').'> C
							  </label>
							</div>'; 
				*/			
				
	            $data_ok[2] = '<div style="display:block;width:60%;"><b>'.$d['nim'].'</b></div><br>'.$d['nama'];
	            $data_ok[3] = "Tahun : ".$d['tahun_smt']."<br>"."Kelas : ".($d['reguler_kls']=="0"?"reguler":"Non-Reguler")."<br>".
							  "Status Awal : ".( $d['id_konv']==1?"Baru":"Konversi");
	            $data_ok[4] = '<img id = "pic-'.$d["id"].'" src="'.GetPicture($d['nim'],"siswa", $d['sex'], $d['prodi']).'" style="width:50px;"/>';
	            $data_ok[5] = $ckv1.$ckv2.$ckv3.'
							   <button type="button" class="btn btn-info btn-xs" 	onclick="mahasiswa_edit(   '.$d["id"].')">Edit				</button>'.
							   ( ($sudah_login) ? '<button type="button" class="btn btn-warning btn-xs" onclick="mhs_reset_password('.$d["id"].')">Reset Password</button>' : "");
                
	            $data[] = $data_ok;
	        }

			$time_end 		= microtime(true);
			$execution_time = ($time_end - $time_start);			
	        $json_data = array(
	                    "draw" => $draw,
	                    "iTotalRecords" => $d_total_row,
	                    "iTotalDisplayRecords" => $d_total_row,
	                    "nEexecution_time" 	   => $execution_time,
						"checking" => $for_check_ada,
	                    "data" => $data,
						"SQL" => $use_last_filter
	                );

//		echo '<b>Total Execution Time:</b> '.$execution_time.' Mins';					
	    j($json_data);
		exit();
	}	

	function list_uas() {
		$this->cek_aktif();
		cek_hakakses(array("siswa"), $this->session->userdata('admin_level'));

		$GLOBALS['ONMENU']	= "siswa";
		$this->load->model('my_loader');
		
		//var def session
		$a['sess_level'] = $this->session->userdata('admin_level');
		$a['sess_user'] = $this->session->userdata('admin_user');
		$a['sess_konid'] = $this->session->userdata('admin_konid');
		$this->my_loader->ext_view('mhs', 'viewtest01', $a);
	}

	function edit_mahasiswa() {
	
}


	function editkelas() {
		$this->cek_aktif();
		cek_hakakses( array("admin"), $this->session->userdata('admin_level'));
		
		switch ($this->uri->segment(4)) 
		{
			case "1":
					$col = "A";
				break;
			case "2":
					$col = "B";
				break;
			case "3":
					$col = "C";
				break;
		}
		
		$id   = $this->uri->segment(3);
		$stat = $this->uri->segment(4);
		
		$this->db->where("id", $id);
		$this->db->update("db_mahasiswa", array( 'kelas' => $col)); 
		
		$ret_arr=array();
		if ( $this->db->_error_number() == 0) {
			  $ret_arr['status'] 	= "ok";
			} else {
			  $ret_arr['status'] 	= "error";
			  $ret_arr['sql'] 		= $this->db->last_query();
			  $ret_arr['error_sql'] = $this->db->_error_message();
		}	
		j($ret_arr);
	}

	function status() {
		$this->cek_aktif();
		cek_hakakses( array("admin"), $this->session->userdata('admin_level'));
		
		switch ($this->uri->segment(3)) 
		{
			case "1":
					$col = "log_krs";
				break;
			case "2":
					$col = "log_uas";
				break;
			case "3":
					$col = "log_app";
				break;
		}
		
		$id   = $this->uri->segment(4);
		$stat = $this->uri->segment(5);
		
		$this->db->where("id", $id);
		$this->db->update("db_mahasiswa", array( $col => $stat)); 
		
		$ret_arr=array();
		if ( $this->db->_error_number() == 0) {
			  $ret_arr['status'] 	= "ok";
			  $ret_arr['sql'] 		= $this->db->last_query();
			} else {
			  $ret_arr['status'] 	= "error";
			  $ret_arr['sql'] 		= $this->db->last_query();
			  $ret_arr['error_sql'] = $this->db->_error_message();
		}	
		j($ret_arr);
	}


	function bio_data() {
		$id_mhs  	= $this->uri->segment(3);
		if ( $id_mhs == "0") {
			/* get empty row......... */
			$a['omhs'] 	= $this->db->query("SELECT * FROM db_mahasiswa WHERE true limit 1")->row();
			foreach($a['omhs'] as $fd=>$val) {
				$a['omhs']->$fd = "";
			}
		} else {
			$a['omhs'] 	= $this->db->query("SELECT * FROM db_mahasiswa WHERE id = {$id_mhs}")->row();
		}
		$this->load->model('Utility');
		$a['oUtilty']	= $this->Utility;
		$a['std_pic'] 	= GetPicture($a['omhs']->nim,"siswa", $a['omhs']->sex, $a['omhs']->prodi);
		
		$ret_html = $this->load->view("f_biodata", $a, true);
		
		$ret_arr=array();
		if ( $this->db->_error_number() == 0) {
			  $ret_arr['status'] 	= "ok";
			  $ret_arr['html'] 		= $ret_html;
			  $ret_arr['pic'] 		= ( ($a['omhs']->profile_pic==null || strlen($a['omhs']->profile_pic)==0) ? null : $a['omhs']->profile_pic );
			  $ret_arr['sex'] 		= $a['omhs']->sex;
			  $ret_arr['nim'] 		= $a['omhs']->nim;
			} else {
			  $ret_arr['status'] 	= "error";
			  $ret_arr['html'] 		= "<h2>Error Edit Data Mahasiswa</h2>";
		}	
		j($ret_arr);
		
	}
	
	function save_biodata() {
		$id_mhs  	= $this->uri->segment(3);
		$ret_arr	= array();

			$p = json_decode(file_get_contents('php://input'));
			$rec = array(
					'nim' 			=> bersih($p,"nim"),
					'nama' 			=> bersih($p,"nama"),
					'tempat_lahir'	=> bersih($p,"tmp"),
					'tanggal_lahir'	=> bersih($p,"tgl"),
					'nama_ibu' 		=> bersih($p,"ibu"),
					'no_ktp' 		=> bersih($p,"ktp"),
					'no_telp' 		=> bersih($p,"hp"),
					'alamat'		=> bersih($p,"almt"),
					'agama'			=> bersih($p,"agm"),
					'sex'			=> bersih($p,"optradioLP"),
					'prodi'			=> bersih($p,"prodi"),
					'tahun_smt'		=> bersih($p,"tahun"),
					'reguler_kls'	=> (bersih($p,"optradioRN")=="R"?"0":"1"),
					'id_konv'		=> (bersih($p,"optradioBP")=="B"?"1":"2"),
					'profile_pic'	=> bersih($p,"pic_profile"),
					'is_activate'	=> true
					);
					
		if ($id_mhs==0) {
				$this->db->insert('db_mahasiswa', $rec);
				
		} else {
				$this->db->set($rec);					
				$this->db->where('id', $id_mhs);
				$this->db->update('db_mahasiswa', $rec);
		}		

		$ret_arr['sql_data']=$this->db->last_query();
		$ret_arr['db_error']=$this->db->_error_message();

		$omhs 	= $this->db->query("SELECT id, nim FROM db_mahasiswa WHERE nim = '".bersih($p,"nim")."'")->row();
				
		$areg = array(
				'username' 		=> $omhs->nim,
				'password' 		=> md5($omhs->nim),
				'level' 		=> 'siswa',
				'kon_id'		=> $omhs->id,
				'is_activate'	=> 1
			);


			$is_ada = $this->db->query("SELECT id FROM m_admin WHERE username = '".$omhs->nim."' AND level = 'siswa'")->num_rows();

				if ($is_ada < 1) {
					$this->db->insert('m_admin', $areg); 
					$ret_arr['registrasi'] 	= "new";
				} else {
					$ret_arr['registrasi'] 	= "old";
				}
			
		if ( $this->db->_error_number() == 0) {
			  $ret_arr['status'] 	= "ok";
			} else {
			  $ret_arr['status'] 	= "error";
			  $ret_arr['sql_err'] 	= $this->db->_error_message();
		}	
		j($ret_arr);
				
	}

	function saya_ada() {
		$ret_arr=array();
		$csql="
			UPDATE m_admin SET m_admin.status_user = '".( $this->uri->segment(3) == "1" ? "01" : "02" )."' 
				WHERE m_admin.username = '". $this->session->userdata('admin_user')."'";
		$this->db->query($csql);
		if ($this->db->_error_number() == 0)
			$ret_arr['status'] 	= "ok";
			$ret_arr['par'] 	= $this->uri->segment(3);
		j($ret_arr);		
	}

	function absen_kuliah() {
		$id_kelas 	= $this->uri->segment(3);
		$filejs		= "jsdata/kelas_{$id_kelas}.txt";
		$idmhs		= $this->session->userdata('admin_konid');
//		$data_kelas = DBlookup("ref_jadwal", "id_kelas = {$id_kelas}", "data_pertemuan");
//		$ada = (strpos($data_kelas, $idmhs.";") > 0); 
//		file_put_contents($filejs,";".$idmhs,FILE_APPEND);
		$csql	= " update ref_jadwal 
					set data_pertemuan = concat_ws('', data_pertemuan, ';".$idmhs."'), jml_hadir = (jml_hadir+1) 
					where id_kelas='{$id_kelas}' and status_active='A' ";
		$this->db->query($csql);

/*		
		if (!$ada) {
			$data_kelas .= ";".$idmhs;
			$ret_arr['respon']="add";
			$nadd = "+1";
			$this->db->query("update ref_jadwal set data_pertemuan = '{$data_kelas}', jml_hadir = (jml_hadir + ({$nadd}) ) where id_kelas='{$id_kelas}'");
		}
*/		
		if ( $this->db->affected_rows() == 1 ) {
				$ret_arr['sql'] 	= $csql;
				$ret_arr['status'] 	= "ok";
			} else {
				$ret_arr['sql'] 	= $csql;
				$ret_arr['status'] 	= "no";
		}
		j($ret_arr);		
	}




	function is_exist() {
		$p = json_decode(file_get_contents('php://input'));
		
		$csql = "
			SELECT a.id, b.status_user, b.last_login
				FROM db_mahasiswa AS a INNER JOIN m_admin AS b ON a.nim = b.username
			WHERE (a.id In ({$p->id}))";

		$rs = $this->db->query($csql)->result_array();
		
		$ret_arr=array();
		$ret_arr['status'] 	= "ok";
		$ret_arr['data'] 	= $rs;
		j($ret_arr);		
	}


	
	function reset_password() {
		$ret_arr=array();
		$id_mhs  	= $this->uri->segment(3);
		$adm = $this->db->query("SELECT id,username FROM m_admin WHERE kon_id = '".$id_mhs."' AND level = 'siswa'")->row();
		$this->db->query("UPDATE m_admin SET password = '".md5($adm->username)."' WHERE id = '".$adm->id."'");
			$ret_arr['status'] = "ok";
			$ret_arr['msg'] = "Password berhasil diubah...";
			$ret_arr['user'] = $adm->username;
			
		j($ret_arr);
			
	}
	
	public function view_jadwal() {
		$this->cek_aktif();
		cek_hakakses(array("admin"), $this->session->userdata('admin_level'));

		$GLOBALS['ONMENU']	= "master";
		
		//var def session
		$a['sess_level'] = $this->session->userdata('admin_level');
		$a['sess_user'] = $this->session->userdata('admin_user');
		$a['sess_konid'] = $this->session->userdata('admin_konid');
		$a['p']	   = "v_jadwal_mhs";

		$this->load->view('aaa', $a);
	}

	function get_pembayaran() {
		$url="http://45.118.114.42//rest_master/index.php/PembayaranReg/tahun/2019/semester/2";
		$result = json_decode( file_get_contents($url));
		$this->load->model('progress');
		$OBar	= $this->progress;

		if (!$result) {
			$OBar->end_progress("Gagal koneksi ke Server Keuangan..." );
			exit();
		}
		
		$data	= $result->response;
		$nUpd 	= 0; $proses = 0;
		$nmax 	= count( $data->komponen_pembayaran );
		$row_page = 100;
		
		$OBar->start( intval($nmax/$row_page)+1 );
		
		for($nr=0; $nr < $nmax; $nr++) {
			$cnim="";
			$OBar->doprogress();

			for ($nb=0; ( $nb < $row_page && ($nr<$nmax)); $nb++) {
				$cnim .= "'".$data->komponen_pembayaran[$nr]->NIM."',";
				$nr++;
			}
			$nr -= 1;
			$cnim .="'xx'";

			$csql="update db_mahasiswa set log_krs = 'Y' where nim in ({$cnim})";
			$proses ++;
			$this->db->query($csql);

			if ($this->db->affected_rows()>0) {
				$nUpd += $this->db->affected_rows();
			}
		}
		
		$OBar->end_progress("Update : ". $nUpd. " mhs" );
	}	
	
	function get_mahasiswa_baru() {
		$a['p']	   = "v_mahasiswa_add";
		$this->load->view('aaa', $a);
		$GLOBALS['ONMENU']	== "master";
	}

	function get_user_profile( $idmhs ) {
		
		$sql = " SELECT a.*, nama_prodi FROM db_mahasiswa as a inner join ref_prodi on a.prodi = ref_prodi.kode_prodi ".
			   " where a.id = '{$idmhs}'";
		$status= array();
		$status['krs']= "Pembuatan KRS dibutuh pada saat Awal Semester, silahkan lakukan segera karena pada tanggal 22 Desember Menu ini sudah tidak bisa lagi";
		$status['khs']= "Riwayat Studi ( Daftar Nilai ) anda bisa dilihat pada menu ini, KHS untuk semester ini belum bisa adan lihat.";
		$status['keu']= "Riwayat keuangan (pembayaran/tagihan) anda bisa dilihat pada menu ini";
		
			   
		$a["mhs"] = $this->db->query($sql)->row();
		$a["foto_user"] = GetPicture( $a["mhs"]->nim, "siswa", $a["mhs"]->sex, $a["mhs"]->prodi); 
		/*base_url()."/third_party/crop/" .( $a["mhs"]->sex=="L" ? "male.jpg" : "female.jpg") ;*/
		
		$a["status"] 	= $status;
		
		//echo $rootPath;
		
		//echo $thisPath;
		//echo $onlyPath;
		$ret['status'] 	= "ok";
		$ret['mhs'] 	= $a["mhs"];
		
		$ret['html'] = $this->load->view( '../../user/html/user-profile.html', $a, true);
		//$this->load->view('aaa', $a);
		j($ret);
		
	}
	
	function get_data_pmb() {
		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "http://pmb.ikipsiliwangi.ac.id/api/student/year/2020",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 0,
		  CURLOPT_FOLLOWLOCATION => true,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array(
			"Accept: application/json",
			"Authorization: Bearer XD6fHfcUpjJNSE2ql9iT9vIWbXzjHnzOUPzNavJM2pAfPjUfIcDnhUEDZ8FhrhiucvKPQseKLM4pSHng"
		  ),
		));

		$response = curl_exec($curl);

		curl_close($curl);
		$arr=json_decode($response);
		$data=array(); $no=0;

		/* cek duplicate */
		
		foreach($arr->data as $d) {
			$atmp=array();
			$no++;
				$atmp[]=$no;
				$atmp[]=$d->department_code."<br>".$d->department_name;
				$atmp[]=$d->nim."<br>".$d->name;
				$atmp[]=$d->place_of_birth;
				$atmp[]=$d->date_of_birth;
				$atmp[]="<i class='far fa-thumbs-down' style='font-size:18px;color:red'><span style='display:none;'></span></i>";

			$data[]=$atmp;
			
		}


		
		$d_total_row=count($arr->data);
	    $draw 	= $this->input->post('draw');
	    $json_data = array(
	                    "draw" => false,
	                    "iTotalRecords" => $d_total_row,
	                    "iTotalDisplayRecords" => $d_total_row,
	                    "data" => $data
	                );
		
		j($json_data);
		exit();
	}
	
	public function pdfmhs() {
		// create new PDF document
		require_once 'vendor/autoload.php'; 

		$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

		// set document information
		$pdf->SetCreator(PDF_CREATOR);
		$pdf->SetAuthor('Our Code World');
		$pdf->SetTitle('Example Write Html');

		// set default header data
		$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 006', PDF_HEADER_STRING);

		// set header and footer fonts
		$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
		$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

		// set default monospaced font
		$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

		// set margins
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
		$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
		$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

		// set auto page breaks
		$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

		// set image scale factor
		$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

		// add a page
		$pdf->AddPage();

		$html = '<h4>PDF Example</h4><br><p>Welcome to the Jungle</p>';
		 
		$pdf->writeHTML($html, true, false, true, false, '');
		// add a page
		$pdf->AddPage();

		$hv	=	$this->load->view('viewtest02',[], true);

		$html = $hv; //'<h1>Hey</h1>';
		// output the HTML content
		$pdf->writeHTML($html, true, false, true, false, '');

		// reset pointer to the last page
		$pdf->lastPage();
		//Close and output PDF document
		$pdf->Output('example_006.pdf', 'I');		
			}
			
	
	
}
	
/* End of file mahasiswa.php */
/* Location: ./application/controllers/mahasiswa.php */
/* QMK&@6.jxUBQ */	