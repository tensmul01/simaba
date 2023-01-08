<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set("Asia/Jakarta"); 

class Admin extends CI_Controller {
    public function __construct() {
        parent:: __construct();

    }


	public function index()
	{
		$i= $this->cek_admin();
		$p['page'] =  "v_admin";

		$this->load->view('admin_menu', $p);

//		$text_html = str_replace( 'href="http','href = "http',$text_html );
//		$text_html = str_replace( 'href="#','href = "#',$text_html );
//		$text_html = str_replace( 'href="','href="admin/',$text_html );
//		$text_html = str_replace( 'src="','src="admin/',$text_html );

//		echo $text_html;
		
		//redirect( base_url()."admin/index.html");
		
	}
	
	public function cek_admin()
	{
		if ( $this->session->userdata('admin_level') !=="admin" )
		{

			redirect( base_url()."SKLogin/index.html");
			
		}
	}

    public function serverload() {
    		$ret=[];$ret['status'] = "ok";
            $rs = $this->db->query("select value_data  from configdb where keterangan='load_time2'")->row();
            $ret['loadtime']=$rs->value_data;
            j($ret);
    }

	public function logout() {
		
		$tm_now = date("Y-m-d H:i:s", now());
		$this->db->query(
			    "UPDATE m_admin SET last_logout = '".$tm_now."', from_web = '".base_url()."', status_user='02' WHERE (id = '".$this->session->userdata('admin_id')."')");			

		$this->session->sess_destroy();

		redirect( base_url()."SKLogin/index.html");
		
	}
	
	
	
}
