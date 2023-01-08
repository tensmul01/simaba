function jdkul_edit(id) {
	$( ".auto-dosen" ).each(function(k, ob) {
		//console.log("ada input dosen: " + k)
		SetAutoComplete(ob, "adm/auto_entry/dosen", function( dsn ) {
							console.log("AFTER AUTO Complete..."),
							console.log(dsn),
							$("#foto_dosen").attr("src", dsn.item.pic);
							})
	});	


if (id==0) {
	$("#form_jdkul").modal('show');
		$("#myModalLabel").text("Tambah Jadwal Kuliah");
		$("#myModalLabel").attr("class", "btn btn-warning");
			$("#jdkul_id").val(0);
			$("#id_mk").val("");
			$("#mata_kuliah").val("");
			$("#nidn_dosen").val("");
			$("#nama_dosen").val("");

		$("#kelas_jdkul").focus();

} else {


	$.ajax({
		type: "GET",
		url: base_url+"jadwalkuliah/detail/"+id,
		success: function(data) {

			$("#form_jdkul").modal('show');
			

			$("#jdkul_id").val(data.ordid);
			$("#prodi").val(data.prodi);
			$("#tahun_smt").val(data.tahun_smt);
			$("#kelas_jdkul").val(data.kelas);

			$("#id_mk").val(data.id_mk);
			$("#mata_kuliah").val(data.mata_kuliah);

			$("#nidn_dosen").val(data.nidn_dosen);
			$("#nama_dosen").val(data.nama_dosen);


//			$("#hari").val(data.hari);
			$("#id_hari").val(data.id_hari-1);
			$("#jm_pertemuan").val(data.jm_tatapmuka);

//			$("#id_hari").text(data.hari);
			$("#ruang").val(data.ruang);
			$("#jam").val(data.jam);
			$("#foto_dosen").attr("src", data.pict_dosen);
			$("#tp_uas").val(data.uas_type);

				$("#myModalLabel").text("EDIT Jadwal Kuliah");
				$("#myModalLabel").attr("class", "btn btn-info");
				$("#nama_dosen").focus();
			
		}
	});
}	

	
	return false;
}

function jdkul_save() {
	var f_asal	= $("#f_jdkul");
	var form	= getFormData(f_asal);
		console.log(form);

		form.tg_awal = $("#tg_awal").val();
	
		$.ajax({		
			type: "POST",
			url: base_url+"jadwalkuliah/detail_save",
			data: JSON.stringify(form),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8'
		}).done(function(response) {
			
			if (response.status == "ok") {
				var table = $('#datatabel').DataTable()
				table.ajax.reload( null, false );
				$("#form_jdkul").modal('hide');
				
			} else {
				console.log('gagal');
			}
		});
	return false;
}
function jdkul_list_mhs(id) {

	return false;
}


function Close_Entry(e) {
	var ob = document.getElementById(e.htmlFor);
	var id = e.htmlFor.substring(6)
	// console.log(ob.checked)
	if ( ob.checked ) {
		e.innerHTML="<i class='glyphicon glyphicon-ban-circle'></i>&nbsp; Close";
		}else {
		e.innerHTML="<i class='glyphicon glyphicon-ok-circle'></i>&nbsp; Open";
	}

	var	obj	= { action	: "change_status", 
		    recno	: id,
		    status	: (ob.checked ? 0 : 1)
		  };
		  
/* --------------- */
	send_ajax(obj)
/* --------------- */
	return true;	
}	

function Remove_Entry(e) {
	var ob = document.getElementById(e.htmlFor);
	var id = e.htmlFor.substring(6)
	// console.log(ob.checked)

	var	obj	= { action	: "hapus_jadwal", 
		    recno	: id
		  };
		  
/* --------------- */
	send_ajax(obj)
/* --------------- */
	return true;	
}	


function Close_All(e) {
var teks_modal ='\
			<div class="modal fade" id="m_closeall" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\
			  <div class="modal-dialog" role="document">\
				<div class="modal-content">\
				  <div class="modal-header">\
					<h5 class="modal-title">Penutupan ENTRY NILAI</h5>\
				  </div>\
				  <div class="modal-body">\
					<p>Anda Yakin akan menutup Entry untuk seluruhnya</p>\
				  </div>\
				  <div class="modal-footer">\
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Baral</button>\
					<button type="button" class="btn btn-primary" onclick="DOClose_all()" data-dismiss="modal">Proses Penutupan Entry</button>\
				  </div>\
				</div>\
			  </div>\
			</div>';
			$("#tampilkan_modal").html(teks_modal);
			$("#m_closeall").modal('show');
	return true;	
}	

function Open_All(e) {
var teks_modal ='\
			<div class="modal fade" id="m_openall" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\
			  <div class="modal-dialog" role="document">\
				<div class="modal-content">\
				  <div class="modal-header">\
					<h5 class="modal-title warning">Pembukaan ENTRY NILAI</h5>\
				  </div>\
				  <div class="modal-body">\
					<p>Anda Yakin akan membuka Entry untuk seluruhnya</p>\
				  </div>\
				  <div class="modal-footer">\
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Baral</button>\
					<button type="button" class="btn btn-primary" onclick="DOOpen_all()" data-dismiss="modal">Proses Pembukaan Entry</button>\
				  </div>\
				</div>\
			  </div>\
			</div>';
			$("#tampilkan_modal").html(teks_modal);
			$("#m_openall").modal('show');
	return true;	
}


function DOClose_all() {
var	obj	= { action	: "close_all", 
		    prodi	: $('#id_prodi').val(),
		    kelas	: $('#id_kelas').val(),
			search	: $("input[type='search']").val(),
			status	: 0
		  };
	
/* --------------- */
	send_ajax(obj)
/* --------------- */
	return false;
}

function DOOpen_all() {
var	obj	= { action	: "open_all", 
		    prodi	: $('#id_prodi').val(),
		    kelas	: $('#id_kelas').val(),
			search	: $("input[type='search']").val(),
			status	: 1
		  };
/* --------------- */
	send_ajax(obj)
/* --------------- */
	return false;
}


function send_ajax(filter) {

	// console.log(filter);
	
	$.ajax({		
		type: "GET",
		url: base_url+"jadwalkuliah/status_kelas?action="+btoa(JSON.stringify(filter)),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			var tb = $("#datatabel").DataTable();
				tb.draw();
		
		} else {
			console.log('gagal');
		}
	});
	return true
}	


		
function show_rec_table(idn) {
// var	id_data=ob.innerHTML
var text_div = $("#nidn_"+idn).html()
//	console.log(text_div)

html_modal = '\
<div class="modal" tabindex="-1" role="dialog" id="tabel_kelas">\
<div class="modal-dialog" role="document">\
    <div class="modal-content">\
      <div class="modal-header">\
        <h5 class="modal-title">Modal title</h5>\
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
          <span aria-hidden="true">&times;</span>\
        </button>\
      </div>\
      <div class="modal-body">\
        '+text_div+'\
      </div>\
      <div class="modal-footer">\
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\
        <button type="button" class="btn btn-primary">Save changes</button>\
      </div>\
    </div>\
  </div>\
</div>'

	
	$("#tampilkan_modal").html(html_modal)
	$("#tabel_kelas").modal({backdrop:false});	

}

function view_data_table() {
$('.data_kelas').each( function(){
	var id_dt = $(this).data("record-table")	
		$(this).balloon({
		  html: true,
		  contents: "<div style='font-size:10px;'>"+$("#nidn_"+id_dt).html()+"</div>",
		  position: "right",
		  fontSize: '150%',
		  minLifetime: 500, 
		});
 
	});	
	
}

function Toggle_table(ob) {

	$(ob).showBalloon();
}
		
