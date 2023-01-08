var timer_pg = 0, cTmp_file  = "";

function show_jduas(ob) {
	
	ob1 = $('#id_prodi option:selected');
	ob2 = $('#filter_status option:selected');
	ob3 = $('#filter_tanggal option:selected');

	$('#filter_prodi').val(ob1.val());
	$("#filter_kelas").val(ob2.val());
	$("#filter_tanggal").val(ob3.val());

// display data..........tabel
	$('#datatabel').DataTable().draw();


	return false;
}

function uas_edit(id) {
	$("#form_uas").modal('show');
	$.ajax({
		type: "GET",
		url: base_url+"jadwaluas/detail/"+id,
		success: function(data) {
			$("#uas_id").val(id);
			$("#nama_ujian").val(data.nama_ujian);
			$("#matakuliah").val(data.matakuliah);
			$("#waktu").val(data.waktu);
			$("#terlambat").val(data.terlambat);
			$("#siap").val(data.siap);
			$("#tgl_mulai").val(data.tgl_mulai);
			$("#wkt_mulai").val(data.wkt_mulai);
			
			$("#dosen1").val(data.nama_dosen1);
			$("#dosen2").val(data.nama_dosen2);
			$("#dosen3").val(data.nama_dosen3);
			$("#dosen4").val(data.nama_dosen4);
			$("#dosen5").val(data.nama_dosen5);
			$("#dosen6").val(data.nama_dosen6);
			
			$("#nidn_1").val(data.id_dosen1);
			$("#nidn_2").val(data.id_dosen2);
			$("#nidn_3").val(data.id_dosen3);
			$("#nidn_4").val(data.id_dosen4);
			$("#nidn_5").val(data.id_dosen5);
			$("#nidn_6").val(data.id_dosen6);

			$("#acak").val(data.jenis);
			
			$("#nama_ujian").focus();
		}
	});
	
	return false;
}

function uas_save() {
	var f_asal	= $("#f_ujian");
	var form	= getFormData(f_asal);
		$.ajax({		
			type: "POST",
			url: base_url+"jadwaluas/save",
			data: JSON.stringify(form),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8'
		}).done(function(response) {
			if (response.status == "ok") {
				ob1 = $('#id_prodi option:selected');
				ob2 = $('#id_kelas option:selected');
				$('#datatabel').DataTable()
				   .ajax.url(base_url+"jadwaluas/data/" + $('#id_prodi option:selected').val())
				   .load();
				
			} else {
				console.log('gagal');
			}
		});
	return false;
}

function start_ujian(id) {
	$('#start_ujian').attr("ujian-id",id);
	var text_start = '<div class="modal-header">\
					  <h4 class="modal-title">Mulai Ujian:</h4>\
					</div>\
					<div class="modal-body">\
					  <p>Ujian Mata Kuliah ini akan dimulai sekarang ?</p> <a class="am" href="#" rel="modal:close" onclick="do_start_ujian('+id+')" >Ya, mulai !!</a>\
					</div>';
	$('#start_ujian').html(text_start);
	
	$('#start_ujian').modal({
		escapeClose	: false,
		clickClose	: false,
		fadeDuration: 250,
		fadeDelay: 0.50 // Will fade in 750ms after the overlay finishes.
		});
}
	
function do_start_ujian ( id_uas ){
	$.ajax({		
		type: "GET",
		url: base_url + "jadwaluas/start/"+id_uas,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
				}).done(function(response) {
					if (response.status == "start") {
						var table = $('#datatabel').DataTable()
						
						table.ajax.reload( null, false );
						// $('#datatabel').ajax.reload();
						// show_jduas();
					} else {
						console.log('gagal');
					}
				});
	
	
	
 }


function status_uas(ob, id_uas) {
//	console.log(base_url+"jadwaluas/e_uas_aktif/"+id_uas+"/"+ob.checked);
		$.ajax({		
			type: "POST",
			url: base_url+"jadwaluas/e_uas_aktif/"+id_uas+"/"+ob.checked,
			dataType: 'json',
			contentType: 'application/json; charset=utf-8'
		}).done(function(response) {
			if (response.status == "ok") {
				console.log('updated');
			} else {
				console.log('gagal');
			}
		});
		
	// alert("Soal selesai...");
	return
}

function peserta_add(id_uas) {
	
	cTmp_file = Get_tmpFile();

	aTombol = { 'Lanjutkan Proses': function() {
					 $(this).dialog('close');
					 do_peserta_add(id_uas)},
				'Batal': function() {
					$(this).dialog('close')}
			   };
				
	show_dialog("IMPORT DATA KRS -> UAS", 
		'<i>Proses import seluruh <b style=" text-shadow: 0 1px 0 gray">Mahasiswa</b><br> yang sudah ditandai, untuk menjadi <u><b>peserta UAS</b></u>?</i>',
		aTombol);

		
	return false;		
}

function do_peserta_add(id_uas) {

	var p_form	= getCheckbox("TBlist_krs")
	if ( Object.keys(p_form).length > 10 ) {
		show_modal('Proses add Peserta <blink style="color:red;">&nbsp;&nbsp;Tunggu !!</blink>', '<i id="message_proses">.........</i>');
		$("#message_proses").css("color", "blue");
	}

	$.ajax({		
			type: "POST",
			url: base_url+"peserta/proses_add/"+id_uas,
			data: JSON.stringify(p_form),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8'
		}).done(function(response) {
			if (response.status == "ok") {
				window.clearInterval(timer_pg);
				if (response.failed == 0) {
					$("#message_proses").text("Completed : " + response.insert +" (rows) inserted");
				} else {
					$("#message_proses").text("Finish with error : " + response.failed +" (rows) failed");
				}
				setTimeout(function(){
						$("#show_modal").modal('close');
						location.replace(base_url+"peserta/daftar/"+id_uas) 
						}, 2000);        // jeda 2 detik untuk menunggu.....status complete..    
				

/*				
				window.clearInterval(timer_pg);									 // clear interval proses.......... 
				setTimeout(function(){
					window.clearInterval(timer_pg),
					refreshProgress(base_url+"progress/refresh/"+cTmp_file),          // for last view (.... delete tmp file.....)
					$("#tampilkan_modal").hide(),
					  location.replace(base_url+"peserta/daftar/"+id_uas) 
					}, 2000);        // jeda 2 detik untuk menunggu.....status complete..    
*/					
			} else {
				console.log('gagal');
			}
		});
/*

	setTimeout(function(){
				timer_pg = window.setInterval(function(){ 
								refreshProgress(base_url+"progress/read_progress");}, 2000);
								}, 1000); // proses menunggu modal show selama 1 detik.........
*/
	return false;
}

function XXrefreshProgress(url_con) {
	var ret = "0";
	var pct = 0;
		$.ajax({		
			type: "GET",
			url: url_con,
			dataType: 'json',
			contentType: 'application/json; charset=utf-8'
		}).done(function(response) {
			if ( response.status=="ok") {
				console.log(response);
				$("#message_proses").text("proses : "+response.progress.rec_progress + " dari "+response.progress.max_progress+" (rows)")
				if ( response.finish ) {
					console.log("Finish at :" + response.progress.rec_progress);
					window.clearInterval(timer_pg);
				} 
			}

		});
	return ret;
}

function uas_view(id) {

	$("#view"+id).prop("checked", ($("#view"+id).prop("checked")? false:true));
	
	$.ajax({		
			type: "GET",
			url: base_url+"jadwaluas/tampilkan/"+id + "/"+$("#view"+id).prop("checked"),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				 console.log(data.status)
			},
			error:function(XHRdata, status_error){
				console.log("Err :"+status_error); }
		});		
	return false;
}

function ulang_uas(ob, id_peserta) {
	$.ajax({		
		type: "GET",
		url: base_url+"peserta/ulang_uas/"+ id_peserta,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			/* --- */
			$(ob).hide();
			} else {

		}
	});

	return false;
    
}

function hapus_peserta(ob, id_peserta, nim) {
	aTombol = { 'Lanjutkan Proses': function() {
					 $(this).dialog('close');
					 do_hapus_peserta(ob, id_peserta)},
				'Batal': function() {
					$(this).dialog('close')}
			   };
				
	show_dialog("HAPUS Peserta UAS !!", 
		'<i>Hapus Peserta ini, NIM : <b>'+ nim.toString() +' ?</b></i>',
		aTombol);

		
	return false;		
}

function uas_peserta_remove(id_uas) {
	aTombol = { 'Lanjutkan hapus seluruh peserta': function() {
				var dialog_active = this;
				$.ajax({		
					type: "GET",
					url: base_url+"peserta/remove_all_peserta/"+id_uas,
					dataType: 'json',
					contentType: 'application/json; charset=utf-8'
				}).done(function(response) {
					if (response.status == "ok") {
						$(dialog_active).dialog('close');
						} else {

					}
				}); 
				},
					 
				'Batal': function() {
					$(this).dialog('close')}
			   };
				
	show_dialog("HAPUS seluruh Peserta UAS ini !!", 
		'<i>Hati-hati jangan sembarangan untuk perintah ini ?</b></i>',
		aTombol);

		
	return false;		
}


function do_hapus_peserta(ob, id_peserta ) {
	$.ajax({		
		type: "GET",
		url: base_url +"peserta/hapus_peserta/"+ id_peserta,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			/* --- */
			$(ob).hide();
			} else {

		}
	});

	return false;
    
}

function uas_modal_event() {
		$("#createDBJSON").on('show.bs.modal', function(){
		   // do somthing.....
		   console.log("1st show");
		});

		$("#createDBJSON").on('hide.bs.modal', function(){
		   console.log("1st hide");
		});

		$("#createDBJSON").on('hidden.bs.modal', function(){
		   console.log("Last hide");
		   // do somthing.....
		});
}

function create_dbJSON() {
	console.log("Database will created..");
	$.ajax({
		type: "GET",
		url: base_url + "jadwaluas/MKJS_User",
		success: function(r) {
			if (r.status == "ok") {
				console.log("Database was created..");
				console.log(r)
				$("#createDataJSON").modal("show");
				setTimeout(function(){ $("#createDataJSON").modal("hide"); }, 3000);
            
			} else {
				console.log("load : ERROR");
		}}
	});
		
	
		return false;
	
}	


function print_lbuas(pages) {
var datalb= document.getElementById("datatabel").rows
	program_studi = $("#id_prodi option[value='" + document.getElementById("id_prodi").value +"']").text()

	html =""
	endpg=pages+1;
	
if (pages==0) {
	pages=1;
	endpg=datalb.length
	}

	
for (i = pages; i < endpg; i++) { 

	html +="<div id='section-to-print' style='width: 800px;	height: 700px;	border: black; 	border-style: solid;'>"

	angkatan = "20" + datalb[i].cells[5].innerHTML.split("<br>")[1].substr(0,2)
	
	html +="<center>"
	html +="<h2>"
	html +="IKIP SILIWANGI BANDUNG"
	html +="</h2>"
	html +="<h3>"
	html +="UJIAN AKHIR SEMESTER"
	html +="</h3>"
	html +="<h3>"
	html +="TAHUN AKADEMIK 2019-GANJIL"
	html +="</h3>"
	html +="</center>"
	html +="<hr>"
	html +="<table class='table' style='background-color:white;line-height:0.6'>"
	html +="<tr><td>Mata Kuliah" + "</td><td>"+datalb[i].cells[1].innerText + "</td></tr>"
	html +="<tr><td>Dosen/Assisten</td><td>"+datalb[i].cells[6].innerText + "</td></tr>"
	html +="<tr><td>Program Studi</td><td>"+program_studi + "</td></tr>"
	html +="<tr><td>Angkatan</td><td>"+angkatan + "</td></tr>"
	html +="<tr><td>Hari/Tanggal</td><td>"+datalb[i].cells[3].innerHTML + "</td></tr>"
	html +="<tr><td>Waktu</td><td>"+datalb[i].cells[4].innerText + "</td></tr>"
	html +="<tr><td>Ruang/Kelas</td><td>"+datalb[i].cells[5].innerHTML + "</td></tr>"
	html +="<tr><td>Jumlah Mahasiswa</td><td>"+"____" + "</td></tr>"
	html +="</table>"
	html +="<hr>"
	html +="<div style='margin-left:600px;'>"
	html +="<p>Pengawas</p>"
	html +="<br><br><br>"
	html +="<p>____________</p>"
	html +="</div>"
	html +="<div>"
	html +="<br style='margin-top: 100px; page-break-after: always'>"
}
	document.body.innerHTML = html;
}

function print_dhuas() {
	
	
}
	
	
	