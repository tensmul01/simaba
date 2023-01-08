
function r_OpenKelas(){
// agar buton form terbuka.
	$("#fn_openkelas").removeClass("disabled")
}	

function r_OpenMhsNilai(){
// agar buton form terbuka.
	$("#fn_openmhs").removeClass("disabled")
}	


function f_OpenKelas() {
var kelas="", nk = 0
var tgl= dateToYMD(new Date())

$("[id^=open_kelas]:checked").each( function() {
//	console.log("xxx")	
//	console.log("status: " +this.disabled)
	
	if (this.disabled == false ) {
		kelas +=  $(this).data("kelas")+ "; "
		nk++;
	}
})
kelas += "( " + nk + " kelas )";

html='\
<div class="modal fade" id="form_ajuan" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">\
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">\
    <div class="modal-content">\
      <div class="modal-header" id="form_entry" >\
        <h5 class="modal-title" id="exampleModalScrollableTitle">Form Permohonan Pembukaan Entry Nilai</h5>\
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
          <span aria-hidden="true">&times;</span>\
        </button>\
      </div>\
      <div class="modal-body">\
\
              <table id="data_akademik" class="table table-hover">\
				<tr><td style="width: 25%">No Surat</td><td style="width: 75%">\
					<input type="text" class="form-control bold" name="nim" id="no_surat" disabled value="" style="width:160px;" >\
				</td></tr>\
				<tr><td style="width: 25%">Tanggal</td><td>\
					<input type="date" class="form-control" name="nama" id="tanggal" required style="width:160px;" value="'+tgl+'">\
				</td></tr>\
\
				<tr><td style="width: 25%">Untuk Kelas</td><td>\
					<textarea class="form-control" id="list_kelas" rows=3 name="list_kelas" ></textarea>\
				</td></tr>\
				<tr><td style="width: 25%">Keterangan </td><td style="width: 75%">\
					<textarea class="form-control" id="almt" rows=5 name="keterangan"></textarea>'
html +='		<tr><td style="width: 25%">Pemohon</td><td>\
					<input type="text" class="form-control bold" name="namadosen" id="dosen_pemohon" disabled value="'+$("#data_dosen").html()+'" >\
				</td></tr>'

html +='</td></tr> \
			</table>\
		</div>\
      <div class="modal-footer" >\
        <button type="button" class="btn btn-secondary" data-dismiss="modal" >Batal</button>\
        <button type="button" class="btn btn-primary"	onclick="ajukan_k_pembukaan()">Ajukan</button>\
      </div>\
    </div>\
  </div>\
</div>';

$("#tampilkan_modal").html(html);
	$("#list_kelas").val(kelas);
$("#form_ajuan").modal('show');

}

function ajukan_k_pembukaan( )
{
var data_ref = {
  kelas		 : []
}

/* store all reccord for ref data */
	$("[id^=open_kelas]:checked").each( function() {
		if (this.disabled == false ) {
			data_ref.kelas.push(this.id.substring(11))
		}
	})

var	obj	= { action	: "open_entry", 
		    tanggal		: $('#tanggal').val(),
		    ref_data	: data_ref,
			keterangan	: $("[name=keterangan]").val(),
			tipe		: 1,
			pemohon		: $("#dosen_pemohon").val(),
			tahun_nilai	: $("#filter_tahun").val()
			};
/* --------------- */
	send_ajax(obj)
/* --------------- */

}

function ajukan_m_pembukaan( )
{
var data_ref = {
  kelas	 	 : $("#inputKelas").val(),
  matakuliah : $("#inputMK").val(),
  prodi 	 : $("#data_prodi").html(),
  mhs		 : []
};
	
	

/* store all reccord for ref data */
	$("[id^=open_mhs]:checked").each( function() {
		data_ref.mhs.push($(this).data("reccord"))
	})

var	obj	= { action	: "open_entry", 
		    tanggal		: $('#tanggal').val(),
		    ref_data	: data_ref,
			keterangan	: $("[name=keterangan]").val(),
			tipe		: 2,
			tahun_nilai	: $("#filter_tahun").val(),
			pemohon		: $("#dosen_pemohon").val()
		  };
/* --------------- */
	send_ajax(obj)
/* --------------- */

}


function f_OpenMhsNilai() {
var v_mhs="", nmhs = 0
var tgl= dateToYMD(new Date())

$("[id^=open_mhs]:checked").each( function() {
//	console.log("xxx")	
//	console.log("status: " +this.disabled)
	
	if (this.disabled == false ) {
		v_mhs +=  $(this).data("nim")+ "; "
		nmhs++;
	}
})
v_mhs += "( " + nmhs + " mhs )";

html='\
<div class="modal fade" id="form_ajuan" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">\
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">\
    <div class="modal-content">\
      <div class="modal-header" id="form_entry" >\
        <h5 class="modal-title" id="exampleModalScrollableTitle">Form Permohonan Pembukaan Entry Nilai</h5>\
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
          <span aria-hidden="true">&times;</span>\
        </button>\
      </div>\
      <div class="modal-body">\
\
              <table id="data_akademik" class="table table-hover">\
				<tr><td style="width: 25%">No Surat</td><td style="width: 75%">\
					<input type="text" class="form-control bold" name="nim" id="no_surat" required value="" style="width:160px;" >\
				</td></tr>\
				<tr><td style="width: 25%">Tanggal</td><td>\
					<input type="date" class="form-control" name="nama" id="tanggal" required style="width:145px;" value="'+tgl+'">\
				</td></tr>\
\
				<tr><td style="width: 25%">Daftar Mahasiswa</td><td>\
					<textarea class="form-control" id="list_mhs" rows=3 name="list_mhs" ></textarea>\
				</td></tr>\
				<tr><td style="width: 25%">Keterangan </td><td style="width: 75%">\
					<textarea class="form-control" id="almt" rows=5 name="keterangan"></textarea>'
html +='		<tr><td style="width: 25%">Pemohon</td><td>\
					<input type="text" class="form-control bold" name="namadosen" id="dosen_pemohon" disabled value="'+$("#data_dosen").html()+'" >\
				</td></tr>'

html +='</td></tr> \
			</table>\
		</div>\
      <div class="modal-footer" >\
        <button type="button" class="btn btn-secondary" data-dismiss="modal" >Batal</button>\
        <button type="button" class="btn btn-primary"	onclick="ajukan_m_pembukaan()">Ajukan</button>\
      </div>\
    </div>\
  </div>\
</div>';

$("#tampilkan_modal").html(html);
	$("[name=list_mhs]").val(v_mhs);
$("#form_ajuan").modal('show');

}


function send_ajax(filter) {
	
	$.ajax({		
		type: "GET",
		url: base_url+"jadwalkuliah/ajuan_f_pembukaan?action="+btoa(JSON.stringify(filter)),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			var tb = $("#datatabel").DataTable();
				tb.draw();

			$("#no_surat").val(response.nosurat);
			$('<div class="alert alert-success" role="alert">\
				Ajuan Pembukaan Entry Nilai sudah dilakukan!\
				</div>').appendTo("#form_entry")

			$("[id^=open_kelas]:checked").each( function() {
				$(this).attr('disabled', 'disabled')
			})
			$(".modal-footer").html('<button type="button" class="btn btn-success" data-dismiss="modal">Tutup</button>')
			setTimeout(function(){ $("#form_ajuan").modal('hide'); }, 10000)		
	
		} else {
			console.log('gagal');
		}
	});
	return true
}	

	