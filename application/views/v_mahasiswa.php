<div class="row col-md-12 ini_bodi">
  <div class="panel panel-info">

    <div class="panel-heading" style="height:100px;">
		<h3 class="my-text3d" >DAFTAR Mahasiswa</h3> 

		<div class="tombol-kanan">
			<a class="btn btn-success btn-sm tombol-kanan" href="#" onclick="return mahasiswa_edit(0);">
				<i class="glyphicon glyphicon-plus"></i> &nbsp;&nbsp;Tambah</a>
			<a class="btn btn-warning btn-sm tombol-kanan" href="#" onclick="return update_regmhs();">
				<i class="glyphicon glyphicon-download"></i> &nbsp;&nbsp;Link-Registrasi</a>
			<a class="btn btn-info btn-sm tombol-kanan" href="<?php echo base_url();?>mahasiswa/excel_list">
				<i class="fa fa-list"></i> &nbsp;&nbsp;Import List</a>
			<a class="btn btn-default btn-sm tombol-kanan" onclick="openWindowExport()">
				<i class="glyphicon glyphicon-plus"></i> &nbsp;Export</a>
		</div>
		
    </div>
	<table class="table table-sm" >
			<tr>
			<td >
				<?php
					echo $oUtilty->Getlist_prodi("return show_mhs_prodi(this);");
				?>
			</td>
			<td style="width:100px;">
				<div class="form-group">
				<label>Tahun :</label><input class="form-control" type="text" id="filter_tahun" onchange = "show_datatabel(this)"></input>
				</div>
			</td>
			<td style="width:200px;">
				<div class="form-group">
				<label>Status Mahasiswa :&nbsp;</label>
						<select value="1" class="form-control" id="filter_status" onchange="show_datatabel()" style="color:#2464dd;" >

							<option value='0'>[- all -]</option>
							<optgroup label="Jalur Masuk" style="color:gray; padding:3px;" >
								<option value='B' style="color:blue">Baru</option>
								<option value='P' style="color:red">Konversi</option>
							</optgroup>	
							
							<optgroup label="Status Aktif" style="color:gray; padding:3px;">
								<option value='A' style="color:blue" selected >Aktif</option>
								<option value='L' style="color:blue">Lulus</option>
								<option value='C' style="color:blue">Cuti</option>
								<option value='N' style="color:blue">Non-Aktif</option>
								<option value='K' style="color:blue">Keluar</option>
							</optgroup>
							<optgroup label="Status KRS" style="color:gray; padding:3px;">
								<option value='11' style="color:blue">KRS Aktif</option>
								<option value='10' style="color:blue">Non Register</option>
								<option value='12' style="color:blue">Registrasi Non KRS</option>
							</optgroup>
							<optgroup label="Ujian" style="color:gray; padding:3px;">
								<option value='21' style="color:blue">UAS Aktif</option>
								<option value='20' style="color:blue">UAS tidak Aktif</option>
							</optgroup>
							
						</select>
				</div>		
			</td>
			<td style="width:100px;">
				<div class="form-group">
				<label>Kelas :</label><input class="form-control" type="text" id="filter_kelas" onchange = "show_datatabel(this)"></input>
				</div>
			</td>

			</tr>

	</table>			
    <div class="panel-body">
      <table class="table table-bordered table-hover" id="datatabel">
        <thead >
          <tr>
            <th width="3%">No</th>
            <th width="20%">Prodi / kelas </th>
            <th width="35%">Nim / Nama Mahasiswa</th>
            <th width="20%">Data Akademik</th>
            <th width="5%">Foto</th>
            <th width="20%">Aksi</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    
      </div>
    </div>
</div>

<form id="form_export" method="post" action="<?php echo base_url().'mahasiswa/view_export';?>" target="__blank">
	<input type="hidden" name="flt_prodi"  value="00000" />
	<input type="hidden" name="flt_kelas"  value="00000" />
	<input type="hidden" name="flt_status" value="00000" />
	<input type="hidden" name="flt_tahun"  value="00000" />
	<input type="hidden" name="flt_search" value="" />
</form>

<script>
	var nim_mahasiswa = "";
	function openWindowExport() {
		var table = $('#datatabel').DataTable();
		var info = table.page.info();
		if (info.recordsTotal > 10000) {
			show_modal("EXPORT Table","Data terlalu banyak, memory bisa crash !!.<br>Lakukan filter data");
			return false;
		}
		  var f = document.getElementById('form_export');
		  f.flt_prodi.value  = $('#filter_prodi').val();
		  f.flt_status.value = $("#filter_status").val();
		  f.flt_kelas.value  = $("#filter_kelas").val();
		  f.flt_tahun.value  = $("#filter_tahun").val();
		  f.flt_search.value = $("input[type='search']").val();
		  window.open('', '_self');
		  f.submit();
	}

	function mahasiswa_edit(id) {
		var varHTML = ''
		$.ajax({		
			type	: "GET",
			url		: base_url+"mahasiswa/bio_data/"+id,
			dataType: 'json',
			contentType	: 'application/json; charset=utf-8',
			success		: function( response ) {
							if (response.status == "ok") {
								
							    vteks  = '<div class="modal fade" id="m_edit_mahasiswa" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="max-width:70%;">';								
								vteks += response.html;
								vteks += '</div>';
								
								$('#tampilkan_modal').html(vteks);
								if ( response.pic == "" ) {	
									nm_file= (response.sex == "L" ? "male.jpg":"female.jpg");
								} else {
									nm_file= response.pic;
								}	
/*			
				html_foto = '\
							<div id="preview_img" style="width:100%;height:120px;overflow:hidden">\
									<div id="preview_img1" class="imgpreview">\
										<img src="'+base_url+'upload/server/php/files/thumbnail/'+ nm_file +'" \
										style="border: 1px solid #ddd; border-radius: 4px;  padding: 5px;  width: 100px;">\
									</div>\
							</div>\
							<a class="am fileinput-button">Pilih foto Anda\
								<input id="fileupload" type="file" name="files" >\
							</a>';
			
				$("#input_file").html(html_foto);								
*/								
								
								$("#m_edit_mahasiswa").modal('show');

								$("#data_akademik td:nth-child(1)").css("color","blue");
								$("#data_user td:nth-child(1)").css("font-weight","bold");

								nim_mahasiswa = response.nim;
//								uploadfoto_e();
								
							} else {
								// EDIT Error......;
								$('#mahasiswa_edit').html('<p>ERROR loading data... </p><a class="am" rel="modal:close">Tutup</a>')
								$('#mahasiswa_edit').modal()
							}
						},
			error		: function(data) {
								$('#mahasiswa_edit').html('<p>ERROR loading data... </p><a class="am" rel="modal:close">Tutup</a>')
								$('#mahasiswa_edit').modal()
						}
		});
		
	}

	function mhs_reset_password(id) {
		var varHTML = ''
		$.ajax({		
			type	: "GET",
			url		: base_url+"mahasiswa/reset_password/"+id,
			dataType: 'json',
			contentType	: 'application/json; charset=utf-8',
			success		: function( response ) {
					alert("Password sudah direset NIM : " + response.user ),
					console.log("Password sudah direset: " + response.user);
			}
		})
	}			
	
	function update_regmhs() {
		var lb="update_regis", url_progress= base_url + "mahasiswa/get_pembayaran";
		
		create_progress( url_progress, lb, "UPDATE DATA Registrasi Mahasiswa")

		var e_progress =	document.getElementById( "_tmp_progressbar" )
		
			$('#'+lb).on('show.bs.modal', function (e) {
				document.getElementById("bar").style.width="0%";
				document.getElementById('loadarea').src = url_progress;
			})	

			$('#'+lb).on('hidden.bs.modal', function(){
						if (document.getElementById("bar").style.width =="100%") {
							MYalert("Prosess selesai..", "UPDATE DATA Registrasi.. selesai", [], (function() { location.reload();}))
						}		
			});

			$('#'+lb).modal({backdrop: false})
			// <?php echo base_url();?>mahasiswa/get_pembayaran" 
		
		return true;		
	}			
	

	function loadScript() {
		$.ajax({
		  method: "GET",
		  url: "test.js",
		  dataType: "script"
		});
	}
	
</script>

