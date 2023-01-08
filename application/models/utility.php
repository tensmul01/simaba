<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
date_default_timezone_set("Asia/Jakarta");

class Utility extends CI_Model {

	function __construct() {
	}

	function build_jadwalkul() {
		$a_prodi = $this->db->query("SELECT * from ref_prodi order by kode_prodi")->result_array();
		
		foreach ($a_prodi as $d) {
			$build_jadwal= " 
				SELECT tr.id_kelas, tr.kode_mk, mk.mata_kuliah, mk.sks, Count(tr.nim_mhs) AS jm_mhs, m.prodi
						FROM (tr_nilai_mhs AS tr INNER JOIN db_mahasiswa AS m ON tr.nim_mhs = m.nim) INNER JOIN ref_matakuliah AS mk ON (tr.kode_mk = mk.kode_mk) AND (m.prodi = mk.kode_prodi)
				WHERE (((tr.tahun_smt)='{$GLOBALS['th_akademik']}') AND ((m.prodi)='{$d['kode_prodi']}'))
				GROUP BY tr.id_kelas, tr.kode_mk, mk.mata_kuliah, mk.sks, m.prodi";

			$csql_0 = "
					INSERT INTO tr_jadwal_kul ( prodi, kode_mk, kelas, jml_mhs, tahun_smt )
					SELECT build_jadwal.prodi, build_jadwal.kode_mk, build_jadwal.id_kelas, build_jadwal.jm_mhs, '{$GLOBALS['th_akademik']}' AS tahun
					FROM ({$build_jadwal}) as  build_jadwal
					LEFT JOIN tr_jadwal_kul ON 
					(build_jadwal.kode_mk = tr_jadwal_kul.kode_mk) AND 
					(build_jadwal.id_kelas = tr_jadwal_kul.kelas) AND 
					(build_jadwal.prodi = tr_jadwal_kul.prodi)
					WHERE (tr_jadwal_kul.ordid Is Null);";
			
			file_put_contents('log_database.txt',  "\n" .date("Y-m-d H:i:s", now()). "\n Build : " .$csql_0  , FILE_APPEND);	

			$this->db->query($csql_0);
			echo $this->db->_error_message();
			// echo $this->db->get_compiled_insert();
				
		}
	}

	public function build_jadwaluas() {
		$uri2 = $this->uri->segment(2);
		$uri3 = $this->uri->segment(3);				// parameter prodi
		$uri4 = $this->uri->segment(4);
		
		$a_prodi = $this->db->query("SELECT * from ref_prodi order by kode_prodi")->result_array();
		
		foreach ($a_prodi as $d) {
			$csql_import ="
					INSERT INTO tr_jadwal_uas ( kode_mk, tahun_smt, prodi, jml_mhs )
					SELECT kul.kode_mk, kul.tahun_smt, kul.prodi, Sum(kul.jml_mhs) AS SumOfjml_mhs
					FROM tr_jadwal_kul AS kul 
					LEFT JOIN tr_jadwal_uas AS uas 
						ON (kul.kode_mk = uas.kode_mk) AND (kul.tahun_smt = uas.tahun_smt) and (kul.prodi = uas.prodi) 
					where kul.tahun_smt ='{$GLOBALS['th_akademik']}'  AND kul.prodi='{$d['kode_prodi']}' AND ((uas.ordid) Is Null)
					GROUP BY kul.kode_mk, kul.tahun_smt, kul.prodi;";
			echo '<p>'.$csql_import;
			echo '</p>';
			
			$this->db->query($csql_import);
			echo $this->db->_error_message();
			echo $csql_import;
		}
		
	}
	

	function Getlist_prodi( $e_change ) {
	//show_list_kelas( this );
	
	$html = '
			<div class="form-group">
				<label>Program Studi</label>
				<select class="form-control" id="id_prodi" onchange="'.$e_change.'" >';
				
		$a_prodi = $this->db->query("SELECT * from ref_prodi where user_access like '%".$this->session->userdata('admin_konid')."%' order by kode_prodi")->result_array();

		$html_prodi  = "<option value='00000'>";
		$html_prodi .= "< all prodi >";
		$html_prodi .= "</option>";

			foreach ($a_prodi as $d) {
					$html_prodi .= "<option value=".$d['kode_prodi'].">";
					$html_prodi .= "[" .$d['kode_prodi'] ."]  ". $d['nama_prodi'];
					$html_prodi .= "</option>";
			}
						
		$html .= $html_prodi; 
		$html .= '</select>';
		$html .= '<input type="hidden" id="filter_prodi" value="00000">';
		$html .= '	</div>';
		return $html;
	}

	function Getlist_kelas( $e_change, $prodi) {
	//show_list_kelas( this );
	// AND tr_nilai_mhs.kode_prodi='{$prodi}'	
	$html = '
			<div class="form-group">
				<label>Kelas :</label>
				<select class="form-control" name="nmkelas" id="id_kelas" onchange="'.$e_change.'" >';
	$csql = "					
		SELECT kode_prodi, last_kelas
		FROM ref_akm_mhs 
			WHERE last_akm ='{$GLOBALS['th_akademik']}' and (last_kelas is not null) 
		GROUP BY kode_prodi, last_kelas;";
		
	$csql = "					
			SELECT kode_prodi, last_kelas, Min(Left(last_kelas,2)) AS th, Min(Right(last_kelas,2)) AS reg
			FROM ref_akm_mhs
				WHERE last_akm ='{$GLOBALS['th_akademik']}'
			GROUP BY ref_akm_mhs.kode_prodi, ref_akm_mhs.last_kelas
			ORDER BY ref_akm_mhs.kode_prodi, th DESC , reg";		

		$a_kelas = $this->db->query($csql)->result_array();

		$html_kelas  = "<option value='00000'>";
		$html_kelas .= "< all kelas >";
		$html_kelas .= "</option>";

			foreach ($a_kelas as $d) {
					$html_kelas .= "<option value=".$d['last_kelas'].' name="kelas_'.$d['kode_prodi'].'" >';
					$html_kelas .= "[ " .$d['last_kelas'] ." ]";
					$html_kelas .= "</option>";
			}
						
		$html .= $html_kelas; 
		$html .= '</select>';
		$html .= '<input type="hidden" id="filter_kelas" value="00000">';
		$html .= '	</div>';
		return $html;
	}

function getSemester() {

	$csql = "					
			SELECT * from ref_semester WHERE hak_akses='1' 
			ORDER BY tahun_akademik";		

		$a_smt = $this->db->query($csql)->result_array();
		$html_  = "";

			foreach ($a_smt as $d) {
					
					$html_ .= "<option value='".$d['tahun_akademik'].  "' ". ( $d['aktif']==1 ? ' selected':'' ).  " data-awal='{$d['tg_awal']}' data-akhir='{$d['tg_akhir']}'  >";
					$html_ .= "" . tahun2ket($d['tahun_akademik']);
					$html_ .= "</option>";
			}
						
		return $html_;
}	
	
	function Auto_UpdateJadwal() {

		$rs=$this->db->query("SELECT table_name, last_update, action
					FROM db_schema
					WHERE (((db_schema.table_name)='tr_jadwal_uas'))")->row();
		
		$n_upd = 0;
		$csql_upd1 ="
			UPDATE tr_jadwal_uas 
			SET 
				`status_uas`   = '2', 
				`status_aktif` = '1'
			WHERE 
				( sesi_1>0 ) AND 
				( sesi_2>0 or IsNull(dosen_2) Or dosen_2=' ') AND 
				( sesi_3>0 or IsNull(dosen_3) Or dosen_3=' ') AND 
				( sesi_4>0 or IsNull(dosen_4) Or dosen_4=' ') AND 
				( sesi_5>0 or IsNull(dosen_5) Or dosen_5=' ') AND 
				( sesi_6>0 or IsNull(dosen_6) Or dosen_6=' ') AND 
				( `status_uas` = '1')	
				";
		$this->db->query($csql_upd1);
			$n_upd +=  $this->db->affected_rows();
		
		$csql_upd2 ="
			UPDATE tr_jadwal_uas 
			SET 
				status_uas   = '3', 
				status_aktif = '1'
			WHERE (status_uas = '2')
				 and (DATE_ADD(tanggal_mulai, INTERVAL -waktu_siap minute) <= now()) 
				";		
		$this->db->query($csql_upd2);
			$n_upd +=  $this->db->affected_rows();

		$csql_upd3 ="
			UPDATE tr_jadwal_uas 
			SET 
				status_uas   = '5', 
				status_aktif = '0'
			WHERE (tanggal_selesai< now())
				AND (`status_uas` = '4' or `status_uas` = '3')   and (`status_aktif` = '1')	
				";		
				
		$this->db->query($csql_upd3);
			$n_upd += $this->db->affected_rows();

		$csql_upd4 ="
			UPDATE tr_jadwal_uas 
			SET 
				status_uas   = '4'
			WHERE (tanggal_mulai < now() and tanggal_selesai>now() ) AND (`status_uas` = '3')   and (`status_aktif` = '1')	
				";		
				
		$this->db->query($csql_upd4);
			$n_upd += $this->db->affected_rows();

// Send to JSON Data..............
		$csql_JSON ="
            SELECT jdu.ordid as IDuas, mk.id as IDmk, mk.kode_mk, mk.mata_kuliah, mk.sks, mk.sem, jdu.*
            FROM tr_jadwal_uas AS jdu INNER JOIN ref_matakuliah AS mk ON jdu.id_mk = mk.ID
            WHERE (((jdu.tahun_smt)='20191'))  and (jdu.status_aktif=1)";
		$jsdata = $this->db->query($csql_JSON)->result();
        file_put_contents( "jsdata/uasonline.txt", json_encode($jsdata) );

		$ret_arr=array();
		$ret_arr['Nupdate']		= $n_upd ;

		if ( $this->db->_error_number() == 0) {
			  $ret_arr['status'] 		= "ok";
			  // $ret_arr['last_update'] 	= $rs->last_update;
			} else {
			  $ret_arr['error_update'] 	= $this->db->_error_message();
			  $ret_arr['sql'] 		= $this->db->last_query();
			  $ret_arr['status'] 	= "error";
		}	
		// j($ret_arr);
			
	}	
	
}
