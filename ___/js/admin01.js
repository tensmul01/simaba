var AdminTimer = 0, DBlast_update = 0, reccord_update = 0; 
$(document).ready(function() {
	$("select").each(function(k,e) {
				e.value = e.getAttribute("value");
	})
})

	function ForAdminOnly() {
		return true;	
/*
		uas_modal_event();
		AdminTimer = window.setInterval(RefreshPage, 1000*300);
		setTimeout(function(){StartApp();}, 1000*10); 
	    console.log ("Admin.. only");

		// Handle messages sent by the server.
		return true;
*/		
		
	}

	function StopInterval() {
		window.clearInterval(AdminTimer);
		return true;
	}

	function StartApp() {
	        RefreshPage();
			console.log("Start APP");
		return true;
	}
	function RefreshPage() {
		  var lf = " left:" + ( (window.innerWidth/2) -200).toString() +'px;';
		  var tp = " top :" + ( (window.innerHeight/2)-50 ).toString() +'px;';
			src_img = base_url + "___/img/refresh.png";
		
			txt_div  = '<div id="justshow_01"'; 
			txt_div += 'style="position:fixed; '+lf + tp + 'width:400px;height:100px; z-index:1100; display:none;">'; 
			txt_div += '<img src="'+src_img+'" style="position:relative; width:200px; left: 50%; margin-left:-100px; top: 50%; margin-top:-10px;opacity:0.8;">';
			txt_div += '</div>'
			$("body").prepend(txt_div);
			$("#justshow_01").fadeIn(1000, 
					function(){ 
					$.ajax({
						type: "GET",
						url: base_url+"jadwaluas/SetAktif_Jadwal",
						success: function(response) {
							if (response.status == "ok") {
								if (response.Nupdate >0) {
									reccord_update = response.Nupdate;
									show_modal("Auto Update Jadwal UAS", 
									'<i>Status Jadwal sudah di-Update</i>', [])
								}	
							} else {
								show_modal("Gagal !! Auto Update Jadwal UAS", 
									'<i>'+response.error_update+'</i>', []);
							}
						}
					}),
					setTimeout(RemoveAlert, 1000*5)
					});
		return true;
	}

	function RemoveAlert() {
		$("#justshow_01").fadeOut(1000, function(){
			$("#justshow_01").remove();
				if (reccord_update>0) {
				   reccord_update = 0;
				   window.location.reload(true);		
				};
				console.log("done......")
			})				
		return true;
	}

function Admin_thsmt() {
	$.ajax({		
		type: "POST",
		url: base_url+"adm/tahun_akademik",
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
			console.log(response);
			var teks_modal = '\
			<div class="modal fade" id="m_ubah_tahun" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\
				<div class="modal-dialog" role="document">\
				<div class="modal-content"><div class="modal-header" style="background-color: coral;">\
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">\
				<span aria-hidden="true">&times;</span></button><h4 id="myModalLabel">Setting Tahun Akademik</h4></div>\
				<div class="modal-body"><form name="f_th_akademik" id="f_th_akademik" onsubmit="return Admin_thsmt_s();" method="post">\
				<div id="konfirmasi"></div>\
				<table class="table table-form">\
				<tr><td style="width: 25%">Tahun Akad KRS</td><td style="width: 75%"><input type="text" class="form-control" name="th_krs"   id="th_krs" required value="'+response.tahun_krs  +'"></td></tr>\
				<tr><td style="width: 25%">Tahun Akad KHS</td><td style="width: 75%"><input type="text" class="form-control" name="th_nilai" id="th_nilai" required value="'+response.tahun_nilai+'"></td></tr>\
				</table></div>\
				<div class="modal-footer">\
				<button class="btn btn-primary" onclick="Admin_thsmt_s();">\
				<i class="fa fa-check"></i> Simpan</button><button class="btn" data-dismiss="modal" aria-hidden="true">\
				<i class="fa fa-minus-circle"></i> Tutup</button></div></form>\
			</div></div></div>';
			$("#tampilkan_modal").html(teks_modal);
			$("#m_ubah_tahun").modal('show');
			$("#thsmt").focus();
	    return false;
	})	
}

function Admin_thsmt_s() {
	var f_asal	= $("#f_th_akademik");
	var form	= getFormData(f_asal);
	$.ajax({		
		type: "POST",
		url: base_url+"adm/tahun_akademik/simpan",
		data: JSON.stringify(form),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			$("#konfirmasi").html('<div class="alert alert-success">'+response.msg+'</div>');
			setTimeout(function(){ $("#m_ubah_tahun").modal('hide'); }, 1500);
		} else {
			$("#konfirmasi").html('<div class="alert alert-danger">'+response.msg+'</div>');
		}
	});
	return true;
    
}    

function list_jawaban(id_uas, id_mhs) {
	console.log("get list jawaban=> "+id_uas +":"+ id_mhs);
	
	$.ajax({		
		type: "GET",
		url: base_url+"peserta/jawaban_test/"+ id_uas +"/" + id_mhs,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		})
	.done(function(response) {
		if (response.status == "ok") {
            if (response.html==null || response.html=="") {
                $("#myModal").hide();
                return false;
            }    

			$("#myModal").html(response.html)
			    $("#myModal").modal(true);
			} else {

		}
	});

	return false;

}



function change_server(nserv) {
	if (nserv==1) {
		//location.assign("https://sikap.ikipsiliwangi.ac.id")		
	} else {
		//location.assign("https://sikap2.ikipsiliwangi.ac.id")		
	}
	return true;
}		

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
			{
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						if (success)
							success(JSON.parse(xhr.responseText));
					} else {
						if (error)
							error(xhr);
					}
				}
			};
    xhr.open("GET", path, true);
    xhr.send();
}


function cek_mahasiswa_ada() 
{
if ( $("[id^='pic-']").length == 0){ return false;}
var text_ = { id: id_check.join() }

	$.ajax({
		type	: "POST",
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		url		: base_url + "mahasiswa/is_exist",
		data	: JSON.stringify( text_ ),
		success:function(rsp) {
			
			for (nr=0; nr < rsp.data.length; nr++) {
				if (rsp.data[nr]['status_user']=="01" ) {
					console.log(  + ": ada" )
					$("#pic-" + rsp.data[nr]['id']).fadeTo("slow",1)
				} else {
					$("#pic-" + rsp.data[nr]['id']).fadeTo("slow", 0.33)
				}	
					
			}
		}
	})	

}

function update_status_ajuan( ob ) {
var	obj	= { action	: "update_status", 
			recno		: $(ob).data("reccord"),
			status		: $(ob).val(),
			tipe		: $(ob).data("model")
		  };
	
	$.ajax({		
		type: "GET",
		url: base_url+"jadwalkuliah/ajuan_update?action="+btoa(JSON.stringify(obj)),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			
		} else {
			console.log('gagal');
		}
	});
	return true	
}

function adm_change_kelas(pos, kelas, callback ) {
	$.ajax({		
		type: "POST",
		url: base_url+"setkrs/adm_change_krs/" + pos + "/" + kelas,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			//alert("Update Kelas berhasil........");
			callback();
		} else {
			alert("GAGAL Update Kelas ........");
			return false;
		}
	});
}


function Status_jadwal(doproses, id_rec ) {
	console.log("Goto:" +base_url+ "jadwalkuliah/status_jadwal");
	window.location.assign( base_url+ "jadwalkuliah/status_jadwal/"+id_rec +"/"+doproses);
}
	
function createjadwal_onday()
{
var url=base_url + 'jadwalkuliah/build_jadwal_onday';
	
	create_progress(url, "cr_jadwal", "Create Jadwal Kuliah On-line");
var e_progress =	document.getElementById( "_tmp_progressbar" )

	$('#cr_jadwal').on('show.bs.modal', function (e) {
		document.getElementById('loadarea').src = url;
	})	

	$("#cr_jadwal").on('hidden.bs.modal', function(){
				if (document.getElementById("bar").style.width =="100%") {
					MYalert("CREATE JADWAL KULIAH", "Jadwal berhasil dibuat..", [], (function() { location.reload();}))
				}		
	});
  
	$("#cr_jadwal").modal({backdrop: false})

	return false;
}


function add_peserta_uas_online()
{

	document.getElementById('loadarea').src = '';
	$('#cr_jadwal').on('show.bs.modal', function (e) {
		document.getElementById('loadarea').src = base_url + 'peserta/add_peserta_uas_online';
	})	

	$("#cr_jadwal").on('hidden.bs.modal', function(){
				if (document.getElementById("bar").style.width =="100%") {
					MYalert("Add Peserta", "Peserta berhasil ditambahkan..", [], (function() { location.reload();}))
				}		
	});
  
	$("#cr_jadwal").modal({backdrop: false})

	return false;
}


function refreshjadwal_onday()
{
	$('#cr_jadwal').on('show.bs.modal', function (e) {
		document.getElementById('loadarea').src = base_url + 'jadwalkuliah/rebuild_jadwal_onday';
	})	

	$("#cr_jadwal").on('hidden.bs.modal', function(){
				if (document.getElementById("bar").style.width =="100%") {
					MYalert("CREATE JADWAL KULIAH", "Rebuild Jadwal berhasil dibuat..", [], (function() { location.reload();}))
				}		
	});
  
	$("#cr_jadwal").modal({backdrop: false})

	return false;

}


function closejadwal_onday()
{
	$.ajax({		
		type: "GET",
		url: base_url+"jadwalkuliah/close_jadwal_onday",
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
		}).done(function(response) {

			console.log(response)
			
				if (response.status == "ok") {
					MYalert("SAVE TO DHMD ", "Jadwal berhasil ditutup..", [], (function() { location.reload()})) 
					
				} else {
					alert("GAGAL Update Jadwal  ........")
				}
		});
		
	return false;

}


function simulasi_jadwal()
{
	var var_date= { tgl : $("#sm-tanggal").val(),
				jam	: $("#sm-jam").val()}
	var data=JSON.stringify(var_date);

	var url = base_url + 'jadwalkuliah/build_jadwal_onday?action='+btoa(data);
		create_progress(url, "cr_jadwal", "Create Simulasi Jadwal Kuliah...");
		document.getElementById('loadarea').src = '';
	
		$('#cr_jadwal').on('show.bs.modal', function (e) {
			document.getElementById('loadarea').src = url;
		})	

		$("#cr_jadwal").on('hidden.bs.modal', function(){
						MYalert("CREATE SIMULASI JADWAL KULIAH", "Jadwal berhasil dibuat..", [], (function() { location.reload();})) 
		});
	  
		$("#cr_jadwal").modal({backdrop: false})
		
	return false;

}

function edit_kelas(ob)
{
	var id=$(ob).data("link")
	var new_entry = $("#edit-kelas-"+id).val().toUpperCase()
		adm_change_kelas( id, new_entry, function() { 
			$("[data-reccord="+id+"]").html(new_entry)
			$("[data-reccord="+id+"]").hideBalloon()
		});
}

function admin_editnilai(ob) {
var	obj	= { action	: "save_edit", 
		    recno	: $(ob).data("recno"),
			nilai	: $(ob).val()
		  };
	
	$.ajax({		
		type: "GET",
		url: base_url+"nilai/admin_edit_nilai?action="+btoa(JSON.stringify(obj)),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			console.log('update ok!');
		} else {
			console.log('gagal');
		}
	});
	return false;
}

function change_model_transkrip(ob) {
var	obj	= { action	: "save_model", 
		    recno	: $(ob).data("recno"),
			model	: $(ob).val()
		  };
	
	$.ajax({		
		type: "GET",
		url: base_url+"nilai/chmodel_transkrip?action="+btoa(JSON.stringify(obj)),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			console.log('update ok!');
		} else {
			console.log('gagal');
		}
	});
	return false;
}


function jadwalkul_edit(id) {

	$.ajax({
		type: "GET",
		url: base_url+"jadwalkul/detail/"+id,
		success: function(data) {
			$("#form_jadwal").modal('show');

			$("#jadwal_id").val(id);
			$("#nama_ujian").val(data.nama_ujian);
			$("#mata_kuliah").val(data.matakuliah);
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


function create_progress( urL, label_progress, ket1="", ket2="") {
var node = document.createElement("div");
	node.setAttribute("id","_tmp_progressbar");
	var html=""	
	
	html += '<div class="modal fade" id="'+label_progress+'" tabindex="-1" role="dialog" aria-labelledby="'+label_progress+'" aria-hidden="true" style="position:absolute;bottom:0px;left:0px;" >'
	html += '  <div class="modal-dialog modal-dialog-centered" role="document">'
	html += '    <div class="modal-content">'
	html += '      <div class="modal-header">'
	html += '        <h5 class="modal-title">'+ket1+'</h5>'
	html += '        <button type="button" class="btn close" data-dismiss="modal" aria-label="Close">'
	html += '          <span aria-hidden="true">&times;</span>'
	html += '        </button>'
	html += '      </div>'
	html += '      <div class="modal-body">'
	html += '		<div id="progressbar" style="border:1px solid #ccc; border-radius: 5px; ">'
	html += '			<div id="bar" style="width:0%;background:linear-gradient(to bottom, rgba(125,126,125,1) 0%,rgba(14,14,14,1) 100%); height:10px;">'
	html += '			</div>'
	html += '		</div>'
	html += '		<div id="information" ></div>'
	html += '      </div>'
/*	
	html += '      <div class="modal-footer" style="display:inline;" >'
	html += '		<button type="button" id="bcontinue"  class="btn btn-outline-success btn-sm" >Continue</button>'
	html += '		<button type="button" id="bpause"  class="btn btn-outline-dark btn-sm">pause</button>'
	html += '		<button type="button" id="bstop"  class="btn btn-outline-danger btn-sm">Stop</button>'
	html += '      </div>'
*/	
	html += '    </div>'
	html += '  </div>'
	html += '  <iframe id="loadarea" style="display:none;"></iframe>'
	html += '</div>'
	html += '<script>'
	html += 'function show_tbar(pct){'
	html += 'console.log(pct)'
	html += '}</script>';
	
	node.innerHTML=html
	document.body.appendChild(node);
/*	
 var scr=document.createElement('script')
  scr.setAttribute("type","text/javascript")
	scr_txt = "";
	scr_txt +="document.getElementById('loadarea').src = '';"
	scr_txt +="	$('#bcontinue').click( function(){"
	scr_txt +="		document.getElementById('loadarea').src = '"+urL+"',"
	scr_txt +="		$(this).addClass('disabled'),"
	scr_txt +="		$('#button2').removeClass('disabled')"
	scr_txt +="	});"

	scr_txt +="	$(\"#bpause\").click( function(){"
	scr_txt +="		document.getElementById('loadarea').src = '',"
	scr_txt +="		document.getElementById('information').innerHTML='<div style=\"text-align:center; font-weight:bold\">Pause..</div>',"
	scr_txt +="		$(this).addClass(\"disabled\"),"
	scr_txt +="		$(\"#button1\").removeClass(\"disabled\")"
	scr_txt +="	});"

	scr_txt +="	$(\"#bstop\").click( function(){"
	scr_txt +="		document.getElementById('loadarea').src = 'progressbar.php?cancel=true'"
	scr_txt +="	});"


	scr_txt +="	$('#exampleModal').on('show.bs.modal', function (e) {"
	scr_txt +="			document.getElementById('loadarea').src = 'progressbar.php';"
	scr_txt +="	});";
	scr_txt +="	console.log('---- END SCRIPT ----');"
  scr.innerHTML = scr_txt;
  //console.log(scr);
  
  document.body.appendChild(scr);
*/  
	
}

function test_dulu(ob, nidn_dosen) {

	console.log(this.event.target);
	
	var tb=document.getElementById("datatabel")
	var cr = $(ob).closest('tr')	
	var tr = tb.insertRow(cr[0].rowIndex+1)
		tr.id = "_tmp_detail"+nidn_dosen;
		tr.innerHTML="<td colspan='10'><DIV id='detail_"+nidn_dosen+"' style='height:100%;width:100%;background-color: mediumseagreen;'/></td>";

	var	obj	= { action	: "detail-absen", 
				nidn	: nidn_dosen,
				tg1		: $('#tanggal1').val(),
				tg2		: $('#tanggal2').val()
			  };


		$.ajax( {
			type: "GET",	
			url: base_url + "rekap/data_detail_absen?action="+btoa(JSON.stringify(obj)),
			dataType: "json",
			success: function( resp ) {

				if (resp.status=="ok") 
				{
					var tbD=document.createElement("TABLE")
						tbD.className ="table";
						tbD.style.fontSize="80%"


					var header = tbD.createTHead();
					var h_row = header.insertRow();    
						h_row.innerHTML="<th width='3%'>No</th><th>Prodi</th><th>Mata Kuliah</th><th width='5%' >Ruang</th><th width='5%'>L.Mhs</th><th width='5%'>Masuk</th>";
						h_row.style.background ="mediumseagreen";
						
					var tbdy = document.createElement('tbody')

					for (nr=0; nr<resp.data.length; nr++) {
					  var row = tbdy.insertRow();
					  var rec=resp.data[nr];

						var col_td="";
						
						col_td += "<td>" + (rec.recno) + "</td>";
						col_td += "<td>" + rec.prodi +"<br>"+rec.nama_prodi + "</td>";
						col_td += "<td>" + rec.kode_mk +"<br>"+rec.mata_kuliah + "</td>";
						col_td += "<td>" + rec.ruang + "/" + rec.kelas + "<br>" + "tm. ke-"+rec.pertemuan_ke + "</td>";
						col_td += "<td>" + rec.jml_mhs +"</td>";
						col_td += "<td>" + rec.jml_hdr +"</td>";
						row.innerHTML = col_td;
					}
					
					tbD.appendChild(tbdy);
					document.getElementById("detail_"+nidn_dosen).appendChild(tbD)
					
				}

				}
		})
	
	//console.log(tb);
	//ob.innerHTML='<i class="" onclick="close_detailabsen(this,\''+nidn_dosen+'\')">Tutup</i>"';
	ob.className="fa fa-redo btn btn-sm btn-default";
	ob.setAttribute( "onClick", "close_detailabsen(this,\'"+nidn_dosen+"\')" );	
	
}

function close_detailabsen(ob, nidn_dosen) {
	document.getElementById("_tmp_detail"+nidn_dosen).remove();
	ob.className="far fa-folder-open btn btn-sm btn-default";
	ob.setAttribute( "onClick", "test_dulu(this,\'"+nidn_dosen+"\')" );	
}

function get_rekap_sks() {
		$.ajax({		
			type: "get",
			url: base_url+"setkrs/get_rekapSKS/"+$("#filter_tahun").val(),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8'
		}).done(function(response) {
			if (response.status == "ok") {
				$("#rekap_sks").html(response.html);
				$("#myModal").modal('show');

			} else {
				console.log('gagal');
			}
		});

}

function get_rekap_krs() {
		$.ajax({		
			type: "get",
			url: base_url+"setkrs/get_rekap_listKRS/"+$("#filter_tahun").val(),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8'
		}).done(function(response) {
			if (response.status == "ok") {
				$("#rekap_krs").html(response.html);
				$("#myModal").modal('show');

			} else {
				console.log('gagal');
			}
		});

}
