/* EDIT..... */
var oText_active
var input_hidden
var timer_pg = 0, cTmp_file  = ""
var callb_AutoENtry = null
var id_check = []

$(document).ready(function() {
/*	
	$('.gambar').each(function(){
		var url = $(this).attr("src");
		$(this).zoom({url: url});
	});
*/
	if ($("#inputTahun").length>0) {
		$("#inputTahun").val(tahun_akademik);
		};


	// $('[data-toggle="tooltip"]').tooltip();
	var url = get_url(parseInt(uri_js));
	var url1 = get_url((parseInt(uri_js)+0));
	var url2 = get_url((parseInt(uri_js)+1));
	var url3 = get_url((parseInt(uri_js)+2));
	var url4 = get_url((parseInt(uri_js)+3));
	var url5 = get_url((parseInt(uri_js)+6));
	var url_end = get_url((parseInt(uri_js)-1)) + "/" + get_url((parseInt(uri_js)+0));
	var url_last = get_url((parseInt(uri_js)-1));
	
	/* window.location.pathname;*/
/*	console.log(url_end);
	console.log(url_last);

	console.log(url);
	console.log(url1);
	console.log(url2);
	console.log(url2);
	console.log(url3);
	console.log(url4);
	console.log(url5);
*/
//	alert("test 01: " + url_last);	

	// alert(url_end);
	if (url == "m_siswa") {
		
	/*	pagination("datatabel", base_url+"adm/m_siswa/data", []); */
		
	} else if (url == "periksa_ujian") {
		pagination("datatabel", base_url+"rekap/periksa_ujian/data/"+ url3, []);

	} else if (url == "list_transkrip") {
		sfilter		= function ( d ) {
							d.prodi   = $('#id_prodi').val();
							d.tahun  = $('#filter_tahun').val();
						};
		pagination("datatabel", base_url+"nilai/data_list_transkrip", [], null, sfilter);

	} else if (url_last =='mahasiswa') {
		$filter		= function ( d ) {
							d.prodi   = $('#id_prodi').val();
							d.status  = $('#filter_status').val();
							d.mulai   = $('#filter_tahun').val();
							d.kelas   = $('#filter_kelas').val();
						};
		/* store all id for check .............. */
		cbf	= function(resp){ id_check = resp.json.checking }			
		pagination("datatabel", base_url+"mahasiswa/data", [], null, $filter, cbf); 

		/* real time cek mahasiswa  */
		// setInterval(cek_mahasiswa_ada, 3000);

	} else if ( url_end =='setkrs/list_dosenkrs') {
		pagination("datatabel", base_url+"setkrs/data_dosen_listkrs", []);

	} else if ( url_end =='setkrs/list_mhs') {
		
shown = true;

cbf = function(s){
	$('.edit-kelas').each( function(){
	var shown = false;
	var html = $(this).data("reccord")
	
	$(this).showBalloon({  
						html: true,
						tipSize: 18,
						minLifetime: 100,
						css: {
							border: 'solid 4px #5baec0',
							padding: '10px',
							fontSize: '150%',
							fontWeight: 'bold',
//							lineHeight: '3',
							backgroundColor: '#666',
							color: '#fff'},
						contents: "<p>Kelas :</p><input type='text' id='edit-kelas-"+html+"' size=10 style='color:blue;text-transform:uppercase;'>\
									<a class='btn btn-info' data-link='"+html+"' onclick='edit_kelas(this)'>Simpan</a>",
						position: "top",  
	});

	$(this).hideBalloon();
	
	$(this).on("click", function() {
		shown ? $(this).hideBalloon() : $(this).showBalloon();
		shown = !shown;
		})
	})
}
		
/*		
cbf = function(s){
			$('.edit-kelas').each( function(){
				var html = $(this).data("reccord")
				
					$(this).balloon({
						html: true,
						tipSize: 18,
						minLifetime: 500,
						css: {
							border: 'solid 4px #5baec0',
							padding: '10px',
							fontSize: '150%',
							fontWeight: 'bold',
//							lineHeight: '3',
							backgroundColor: '#666',
							color: '#fff'},
						contents: "<p>Kelas :</p><input type='text' id='edit-kelas-"+html+"' size=10 style='color:blue;text-transform:uppercase;'>\
									<a class='btn btn-info' data-link='"+html+"' onclick='edit_kelas(this)'>Simpan</a>",
						position: "top",
					});
 
				});	
			  }
*/
		$filter		= function ( d ) {

							d.tahun   = $('#filter_tahun').val();
							d.prodi   = $('#id_prodi').val();
							d.status  = $('#id_status').val();
							d.kelas   = $('#id_kelas').val()	;

						};
		
		pagination("datatabel", base_url+"setkrs/data_listkrs", [], null, $filter, cbf  );

	} else if ( url_end =='setkrs/set_semester_mk') {
		$var_init 	= function( settings, json ){
								$("[type=search]").attr("placeholder","@ untuk semester")};
		
		// filter prodi..... dan status MK
		$filter		= function ( d ) {
							d.prodi   = $('#id_prodi').val();
							d.status  = $('#id_stat_krs').val();
							d.tahun   = $('#filter_tahun').val();
						};
		
		pagination("datatabel", base_url+"setkrs/data",[], $var_init, $filter);

	} else if ( url_last =='matakuliah') {

		// filter prodi.....
		pagination("datatabel", base_url+"matakuliah/data/"+$("#filter_prodi").val(), []);
		
	} else if ( url_end =='peserta/daftar') {
	
		pagination("datatabel", base_url+"peserta/data1/"+url2, []);

	} else if ( url_end =='peserta/impor_krs') {
	
		$( "#TBlist_krs" ).removeClass( "hidden" );
		$('#TBlist_krs').DataTable({
			"fixedHeader" : { header: true,footer: true },
			"ordering"	: true,
			"columnDefs": [],
			"scrollX"	: true,
			"bProcessing": false,
			"serverSide": false,
			"bDestroy" 	: true,
			"stateSave"	: true
		});		
	
	
	} else if ( url_end =='jadwalkuliah/undefined') {
		$('#stat1').prop("checked",true);
		$('#stat2').prop("checked",true);
		$('#stat3').prop("checked",true);
		$filter		= function ( d ) {
							d.prodi   = $('#id_prodi').val();
							d.kelas   = $('#id_kelas').val();
							d.tahun   = $('#filter_tahun').val();
							d.e_entry = ($('#stat1').prop("checked")==true ? "1": "0") + ($('#stat2').prop("checked")==true ? "1": "0") + ($('#stat3').prop("checked")==true ? "1": "0");
						};
		cbf	= function(s){

			$('#datatabel.table tr td:nth-child(5)').each(function (index, value) {
				// $(this).css("background-color", "red");
				$(this).css("vertical-align","middle");	
				// console.log(this);
				});
			$('#datatabel.table tr td:nth-child('+6+')').each(function (index, value) {
				// $(this).css("background-color", "red");
				$(this).css("vertical-align","middle");	
				// console.log(this);
				});
				
			};
		
		pagination("datatabel", base_url+"jadwalkuliah/data", [], null, $filter, cbf );
		//tb = $("#datatabel").datatable();
		
		//tb = { "drawCallback": function(settings) { console.log("xxx")} }

	} else if ( url_end =='jadwalkuliah/analisa_entry') {
		cbf = function(s){
				view_data_table()
			  }

		$filter		= function ( d ) {
							d.idprodi   = $('#id_prodi').val();
						};
		nopagination("datatabel", base_url+"jadwalkuliah/data_analisa/" + url2, $filter, cbf);

	} else if ( url_end =='jadwalkuliah/hari_ini') {
		$filter		= function ( d ) {
							d.idprodi   = $('#id_prodi').val();
							d.status    = $('#id_stat_kul').val();
						};
		pagination("datatabel", base_url+"jadwalkuliah/data_harini", [], null, $filter, (function(){show_time();}) );

	} else if ( url_end =='jadwalkuliah/create_jadwal') {
		$filter		= function ( d ) {
							d.idprodi   = $('#id_prodi').val();
							d.status    = $('#id_stat_kul').val();
							d.tanggal   = $('#tg_awal').val();
							d.ke   		= $('#ord_kuliah').val();
						};

		pagination("datatabel", base_url+"jadwalkuliah/data_create_jadwal", [], null, $filter );

	} else if ( url_last =='jadwaluas') {
		var flt1, flt2, flt3
			flt1 = $("#filter_prodi").val();
			flt2 = $("#filter_status").val();
// pass data before create datatable
		$var_init 	= function( settings, json ){
								$("[type=search]").attr("placeholder","@ untuk semester"),
								CountUAS_time();SetUAS_time()};

// pass data to ajaz before display table
		$filter		= function ( d ) {
							d.prodi   = $('#filter_prodi').val();
							d.status  = $('#filter_status').val();
							d.kelas   = $('#filter_kelas').val();
							d.tanggal = $('#filter_tanggal').val();
						};
		
		pagination("datatabel", base_url+"jadwaluas/data", [], $var_init, $filter);

	} else if ( url_last =='jadwalOffline') {
		var flt1, flt2, flt3
			flt1 = $("#filter_prodi").val();

// pass data to ajaz before display table
		$filter		= function ( d ) {
							d.prodi   = $('#filter_prodi').val();
							d.tanggal = $('#filter_tanggal').val();
						};
		
		pagination("datatabel", base_url+"jadwalOffline/data", [], null, $filter);

	} else if ( url == 'list_permohonan') {
		$filter		= function ( d ) {
							d.status  = $('#filter_status').val();
							d.tahun   = $('#filter_tahun').val();
							d.prodi   = $('#filter_prodi').val();
							}
		pagination("datatabel", base_url+"setkrs/data_list_permohonan", [], null, $filter);

	} else if ( url_end =='soaldosen/view') {
		pagination("datatabel", base_url+"soaldosen/data_soal_uas", []);

	} else if (url ==  "e_soal") {
		nopagination("datatabel", base_url+"soaldosen/e_soal/data/"+ url3 + "/"+url4);


	} else if (url_end == "edit_periksa_ujian") {

		nopagination("datatabel", base_url+"nilai/edit_nilai_mhs/data/"+ url3, []);
		

	} else if (url_end == "krs/view") {
		nopagination("datatabel", base_url+"krs/get_data");

	} else if (url_end == "nilai/view") {
		filter		= function ( d ) {
							d.tahun_akad = $('#filter_semester').val();
						};
		callb	= function(settings) {
					var dt = settings.json.opt_data;
					$("#ips").html(dt.ips_sem)
					$("#sks").html(dt.sks_sem)
					$("#ipk").html(dt.sks_total+" sks, IPK: "+ dt.ipk_last)
					// console.log();
					},
			
		nopagination("datatabel", base_url+"nilai/get_data", filter, callb);

	} else if (url_end == "nilai/edit_nilai") {
		filter		= function ( d ) {
							d.tahun_akad = $('#filter_tahun').val();
						};
		callb	= function(settings) {
					$("#header_nilai").text("DAFTAR Nilai Tahun Akademik : " +settings.json.tahun);
					console.log(settings.json.tahun);
					},
		nopagination("datatabel", base_url+"nilai/get_editnilai", filter, callb);

	} else if (url_end == "nilai/admin_view") {
		$filter		= function ( d ) {
							d.prodi      = $('#kode_prodi').val();
							d.kode_mk    = $('#id_matakuliah').val();
							d.idMhs      = $('#id_mhs').val();
							d.tahun_akad = $('#inputTahun').val();
							d.dosen 	 = $('#nidn_dosen').val();
							d.query 	 = $('#query_data').val();
							d.kelas 	 = $('#kelas').val();
							d.max_rows 	 = $('#maxrows').val();
						};
	var base_ = window.location.href;
		if ( base_.lastIndexOf("?")>0 ) {
			base_data = base_url+"nilai/get_GlobalNilai"+base_.substring(base_.lastIndexOf("?"))
		} else {
			base_data = base_url+"nilai/get_GlobalNilai"
		}

		console.log("base data:" + base_data);
		
		pagination("datatabel", base_data, [], null, $filter);

	} else if (url_end == "nilai/edit_nilai_mhs") {
		var str = document.URL;
		var n 	= str.search("action=");
		
		nopagination("datatabel", base_url+"nilai/data_nilai_perkelas?action="+str.substring(n+7), []);
		load_mymodule("edit-nilai");

	} else if (url == "p_essai") {
		pagination("datatabel", base_url+"rekap/p_essai/data/" + url3, []);

	} else if (url_end == "nilai/essai") {
		nopagination("datatabel", base_url+"nilai/essai/data", []);

	} else if (url_end == "nilai/periksa_essai") {
		pagination("datatabel", base_url+"nilai/get_essai_data/" + uri3, []);
		load_mymodule("edit-nilai-essai");

	} else if (url == "m_guru") {
		pagination("datatabel", base_url+"adm/m_guru/data", []);		
		
	} else if (url == "m_mapel") {
		pagination("datatabel", base_url+"adm/m_mapel/data", []);		
		
	} else if (url == "m_soal") {
		pagination("datatabel", base_url+"adm/m_soal/data", []);

		if (url2 == "edit") {
			if (editor_style == "inline") {
				CKEDITOR.inline('editornya');
				CKEDITOR.inline('editornya_a');
				CKEDITOR.inline('editornya_b');
				CKEDITOR.inline('editornya_c');
				CKEDITOR.inline('editornya_d');
				CKEDITOR.inline('editornya_e');
			} else if (editor_style == "replace") {
				CKEDITOR.replace('editornya');
				CKEDITOR.replace('editornya_a');
				CKEDITOR.replace('editornya_b');
				CKEDITOR.replace('editornya_c');
				CKEDITOR.replace('editornya_d');
				CKEDITOR.replace('editornya_e');
			}
		}		
	} else if (url == "h_ujian") {
		if (url2 == "det") {
			pagination("datatabel", base_url+"adm/h_ujian/data_det/"+url3, []);
		} else {
			pagination("datatabel", base_url+"adm/h_ujian/data", []);	
		}
	} else if (url == "m_ujian") {
		if (url2 == "det") {
			pagination("datatabel", base_url+"adm/m_ujian/data_det/"+url3, []);
		} else {
			pagination("datatabel", base_url+"adm/m_ujian/data", []);	
		}
	} else if (url == "ikut_ujian") {
		if (url2 == "token") {
			timer();
		} 
	} else {

		console.log(url)
		console.log("No Match ..END..........");
		
	}
	
	SetDosenClass();
	SetAutoProdi(); SetAutoDosen(); SetAutoMahasiswa(); SetAutoMatakuliah();

	/* ENTER on input.......... */
	$("input").on('keyup', function (e) {
		if (e.keyCode == 13) {
			// Do something
            $(this).next().focus();
		}
	});

	$('.clock').clockpicker({
		placement: 'top',
		align: 'left',
		autoclose: true,
		donetext : 'ok!',
		'default': 'now'
	});

	$('.clock-left').clockpicker({
		placement: 'left',
		align: 'left',
		autoclose: true,
		donetext : 'ok!',
		'default': 'now'
	});

	$('select').each( function(k,v)  {
		// console.log(v.value)

		if (v.value=="") {
			
			if ( v.dataset.input )
				{ 
					// console.log(v.dataset.input);
					// console.log( "input:", document.getElementById(v.dataset.input).value ) 
					v.value= document.getElementById(v.dataset.input).value 
				} 
			else 
				{
					v.value = v.querySelector("option").value
			}
		}
	})


//	console.log("Finish aplikasi js..");
});

function CountUAS_time(format_date='%-I:%M:%S', callback = function(){}){
	//console.log('draw');
	var finalDate=null;
	$('[data-countdown]').each(function() {
	  var $this = $(this), finalDate = $(this).data('countdown'), callafter=$(this).attr("finish-countdown");
		$this.countdown(finalDate, function(event) {
								   if ( event.type == "finish") {
									   $this.html('--------');
									   if (callafter) {
										  eval(callafter)
										  }
										  
								   } else {
									   tot_min = event.offset.hours*60 + event.offset.minutes;
										if ( tot_min < 2) {		
										   if ( $this.css("color") != "red") {
											    $this.css("color", "red");
										   }
										} else if ( tot_min < 60) {		
										   if ( $this.css("color") != "yellow") {
											    $this.css("color", "yellow");
										   }
										}
										
									   if (event.strftime('%D')=='00') {
										   $this.html(event.strftime('%H:%M:%S'));
										} else {
										   $this.html(event.strftime(format_date))
									   };
								   }
						});
	});

/* 		finalDate = $('#head_uas').data('count2down');
		console.log(finalDate);
	
		$('#head_uas').countdown(finalDate)
		  .on('update.countdown', function(event) {
			if (event.elapsed) { // Either true or false
			   $this.html("---------");
			} else {
			//  console.log(event.offset.seconds);

			
				$('.cdw_H').html(event.offset.days.toString())
				$('.cdw_J').html(event.offset.hours.toString())
				$('.cdw_M').html(event.offset.minutes.toString())
				$('.cdw_S').fadeOut("clip",[], "slow", function(){
							$('.cdw_S').html(event.offset.seconds.toString()),
							$('.cdw_S').fadeIn("slow")}
							)
				
			}
		  });

 */
	//console.log(finalDate);
	
}

function SetUAS_time(){
	var table = $('#datatabel').DataTable();
	table.on( 'draw', function () {
			CountUAS_time();
	});
}
 
function SetDosenClass() {
	$( ".getdosen" ).each(function() {
		$(this).autocomplete({
		  source: function( request, response ) {
			$.ajax( {
			  url: "adm/auto_entry/dosen",
			  dataType: "json",
			  data: {
				term: request.term
			  },
			  success: function( data ) {
				response( data );
			  }
			} );
		  },
		  minLength: 2,
		  select: function( event, ui ) {
			  inp_data = $(this).attr("id");
			  name_input = document.querySelector("#"+inp_data).dataset.id
			  document.querySelector("#"+name_input).value = ui.item.id;		  
		  }
		})	
	});	
}

function SetAutoProdi() {
	$( ".auto-prodi" ).each(function(k, ob) {
		SetAutoComplete(ob, "adm/auto_entry/prodi");
		$(ob).blur(function() {
			SetAutoComplete("#inputMK" , "adm/auto_entry/matakuliah", $("#kode_prodi").val());
			SetAutoComplete("#inputMhs", "adm/auto_entry/mahasiswa", $("#kode_prodi").val());
		});

	});	
}

function SetAutoMahasiswa() {
	$( ".auto-mahasiswa" ).each(function(k, ob) {
		SetAutoComplete(ob, "adm/auto_entry/mahasiswa");
	});	
}

function SetAutoDosen() {
	$( ".auto-dosen" ).each(function(k, ob) {
		//console.log("ada input dosen: " + k)
		SetAutoComplete(ob, "adm/auto_entry/dosen");
	});	
}

function SetAutoMatakuliah() {
	$( ".auto-matakuliah" ).each(function(k, ob) {
		SetAutoComplete(ob, "adm/auto_entry/matakuliah");
	});	
}


function SetAutoComplete(id, urlData, callback) {
// set auto compltete for field entry ......
var inp_data = $(id).attr("id");
console.log(inp_data);

var name_input = document.querySelector("#"+inp_data).dataset.id;

		$(id)
		.autocomplete({
		  source: function( request, response ) {
			$.ajax( {
			  "url" 	: base_url + urlData,
			  "dataType": "json",
			  "data"	: {
				term  : request.term,
				prodi : $("#kode_prodi").val(),
				tahun : $("#inputTahun").val()
			  },
			  success: function( data ) {
				response( data );
			  }
			});
		  },
		  minLength: 0,
		  select: function( event, ui ) {
					document.querySelector("#"+name_input).value = ui.item.id;
						if ( callback ) 
							{ 
							callback( ui );}
					},
					
		  change	: function (event, ui) {
						 if (ui.item === null) {
							  $(this).val('');
							  $("#" + name_input).val('');
						 }
						 if (name_input=="id_mhs")
							{ show_globalnilai();}
						 
					  }
		  
		})		
}

function show_globalnilai() {
var tb = $("#datatabel").DataTable();
	tb.draw();
	
	return true;
}

function show_datatabel(caller) {
	var tb = $("#datatabel").DataTable();
		//var caller =  arguments.callee.caller;
		if (caller)
			{
				if ( caller.dataset.input )	
					document.getElementById(caller.dataset.input).value = caller.value 
			}
			
	
		tb.draw();
	
	return true;
}

function pilih_semua( pilih ) {
  var row_data = $('#'+"TBlist_krs").DataTable().rows({search: 'applied'  }).nodes()
  var input_data, indexed_array = {}, p = 0;
	
	
// var table = $("#TBlist_krs").DataTable();

	if ( pilih==1 ) {
		$("#pilih_none").removeClass("hidden");
		$("#pilih_all").addClass("hidden");
		$('input[name=cek_peserta]', row_data).prop('checked',true);
	} else {
		$("#pilih_all").removeClass("hidden");
		$("#pilih_none").addClass("hidden");
		$('input[name=cek_peserta]', row_data).prop('checked',false);
	}
	return false
}

function get_list_dosen(ob, db_source, cname) {
		// console.log( $(ob).val());
		oText_active	= ob;
		input_hidden	= cname;
		
		if ( $(ob).val().length >=2 ) {
			$.ajax({
				type: "POST",
				url: db_source,
				data:'keyword='+$(ob).val(),
				beforeSend: function(){
					// $("#search_textBox").css("background","#FFF url(LoaderIcon.gif) no-repeat 165px");
				},
			success: function(data){
				$("#suggestion_list").show();
				$("#suggestion_list").html(data);
			}
			});
		}
	}

/*function get_list_dosen(ob)
{
	console.log( $(ob).val() );
}
*/

function selectdosen(ob, data_respon) {
	ob1 = $('#id_dosen option:selected')

	// change text input ........

	$(oText_active).val(ob1.text());
	//$(oText_active).name($(ob1).val());
	$(oText_active).attr("value", $(ob1).val());
	$('[name='+input_hidden+']').attr("value", $(ob1).val());
	console.log( input_hidden );
	
	// document.getElementById(oText_active.attr('id')).setAttribute("name",$(ob1).val());

	$("#suggestion_list").hide();
	
	if ( !data_respon ) {
		return 
	}
	//	console.log( base_url + data_respon+"/" + oText_active.id + "/"+$(ob1).val() );
	

	//console.log( $(ob1).val());
	//console.log( $(oText_active).val());
	
		$.ajax({
			type: "POST",
			url: base_url + data_respon+"/" + oText_active.id + "/"+$(ob1).val(),
			success: function(response) {
				if (response.status == "ok") {
					console.log(response.caption);
				} else {
					console.log('Gagal updated');
				}
			}
		});
}
/*
function on_input_out(cid) {
	$("#" + cid).hide();
}

function on_input_in(cid) {
	$("#" + cid).show();
}
*/

function timer() {
	var tgl_mulai = $("#_tgl_mulai").val();
	var id_ujian = $("#id_ujian").val();

    var waktu_selesai = new Date(tgl_mulai);
    
    var tgl_terlambat = $("#_terlambat").val();
	var waktu_terlambat = new Date(tgl_terlambat);

    $("#btn_mulai").show();
	$("#tbl_mulai").hide();
    $("#ujian_selesai").hide();

    $("#btn_mulai").countdown(
        {
        	until: waktu_selesai, 
        	format: 'HMS', 
        	compact: true, 
        	alwaysExpire: true,
        	onExpiry: function() {
        		
        		$("#btn_mulai").hide();
				$("#tbl_mulai").show();
			    $("#ujian_selesai").hide();

     			
			    $("#_terlambat").countdown(
			        {
			        	until: waktu_terlambat, 
			        	format: 'HMS', 
			        	compact: true, 
			        	alwaysExpire: true,
			        	onExpiry: function() {
			        		$("#ujian_selesai").show();
			        		$("#btn_mulai").hide();
			        		$("#tbl_mulai").hide();
			        	}
			        }
			    );
        	}
        }
    );
}

/* FUNGSI BERSAMA */
function get_url(segmen) {
	var url1 = window.location.protocol;
	var url2 = window.location.host;
	var url3 = window.location.pathname;
	var pathArray = window.location.pathname.split('/');
	return pathArray[segmen];
}
function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

	console.log(unindexed_array);

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });
	
    return indexed_array;
}

function getCheckbox( IDtabel ) {
  var row_data = $('#'+IDtabel).DataTable().rows({
    search: 'applied'
  }).nodes()
  var indexed_array = {}, p = 0;
  input_data = $(row_data).find('input[name=cek_peserta]:checked')
	
	$(input_data).each(function(n, ob) {
		if ($(ob).prop('checked')) {
			indexed_array[p] = $(ob).data('mhsid');
			p += 1;
		}	
	});
    return indexed_array;
}

function pagination( indentifier, url, config, $var_init=null, $filter=[], cb = null ) {
//	$('#'+indentifier).addClass("hover");

var filter_prodi = {"prodi":"00000", "kelas":"00000", "status":"0", "tahun":"00000"};
var filter_data = {"prodi":"00000", "kelas":"00000", "status":"0", "tanggal":"0"};
	var base_ = window.location.href;
		if ( base_.lastIndexOf("?")>0 ) {
			savState  = false
		} else {
			savState  = true
		}	
			
	if (url != "" ) {
		$('#'+indentifier).DataTable({
			"language": {
				"url": base_url+"___/plugin/datatables/Indonesian.json"
			},
			"fixedHeader" : { header: true,footer: true },
			"ordering"	: false,
			"columnDefs": config,
			"scrollX"	: true,
			"bProcessing": true,
			"serverSide": true,
			"bDestroy" 	: true,
			"stateSave"	: savState,
			"deferRender": true,
			"searchDelay": 500,
			"initComplete": $var_init,
			"drawCallback": cb,
//			function( settings ) {
				
//							console.log("drawCallback");  

//							var api = this.api();
//							console.log(api);  
 
        // Output the data for the visible rows to the browser's console
//							console.log( api.rows( {page:'current'} ).data().length );
//							},
/*							
			dom		: '<"top"l><"clear"><"top"f>rt<"bottom"flp>',
			buttons	: [{ extend:'copy', attr: { id: 'allan' } }, 'csv', 'excel', 'pdf', 'print'],
*/			
			"ajax":{
				url  : url, // json datasource
				type : "post",  // type of method  , by default would be get
				data : $filter,
				complete : function(json){
					// console.log(json.responseJSON.query + " records : " + json.responseJSON.iTotalRecords);
					$("#query_data").val(json.responseJSON.query)
					$("#maxrows").val(json.responseJSON.iTotalRecords)
					
//					var tb = $("#datatabel").DataTable();
//						tb.draw();
				},
				error: function(){  // error handling code
					$("#"+indentifier).css("display","none");
				}
			}
		});

	} else {
		$('#'+indentifier).DataTable({
			"language": {
				"url": base_url+"___/plugin/datatables/Indonesian.json"
			},
			"fixedHeader" : { header: true,footer: true },
			"ordering"	: false,
			"columnDefs": config,
			"scrollX"	: true,
			"bProcessing": false,
			"serverSide": false,
			"bDestroy" 	: true,
			"stateSave"	: true
		});		
	}
	
}

function nopagination(indentifier, url, $filter=[], callb) {
    $('#'+indentifier).DataTable({
        "language": {
            "url": base_url+"___/plugin/datatables/Indonesian.json"
        },
		"fixedHeader" : { header: true,footer: true },
        "ordering": false,
        "bProcessing": true,
        "serverSide": true,
        "bDestroy" : true,
        "paging" : false,
        "searching" : false,
		"drawCallback" : callb,
		"dom"		: '<"top"l><"clear"><"top"f>rt<"bottom"flp>',
		"ajax":{
            url  : url, 			// json datasource
            type : "post",  		// type of method  , by default would be get
			data : $filter,
            error: function(){  	// error handling code
                $("#"+indentifier).css("display","none");
            }
        }
    });


}


function login(e) {
	e = e || window.event;
	var data 	= $('#f_login').serialize();
	$("#konfirmasi").html("<div class='alert alert-info'><i class='icon icon-spinner icon-spin'></i> Checking...</div>")
	$.ajax({
		type: "POST",
		data: data,
		url: base_url+"adm/act_login",
		success: function(r) {
			if (r.log.status == 0) {
				$("#konfirmasi").html("<div class='alert alert-danger'>"+r.log.keterangan+"</div>");
			} else {
				$("#konfirmasi").html("<div class='alert alert-success'>"+r.log.keterangan+"</div>");
				window.location.assign(base_url+"adm") 
		}},
		error: function(jqXHR, textStatus, errorThrown) {
                alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');
                console.log('jqXHR:');
                console.log(jqXHR);
                console.log('textStatus:');
                console.log(textStatus);
                console.log('errorThrown:');
                console.log(errorThr	)	
		}
	});
	return false;
}
/* 
=======================================
=======================================
*/
function konfirmasi_token(id) {
	var token_asli = $("#_token").val();
	var token_input = $("#token").val();
		window.location.assign(base_url+"ujian/ikut_ujian/_/"+id); 
/*
	if (token_asli != token_input && false) {
		alert("Token salah..!");
		return false;
	} else {
		// alert("Token benar..!");
		window.location.assign(base_url+"adm/ikut_ujian/_/"+id); 
	}
*/	
}


function m_soal_h(id) {
	if (confirm('Anda yakin..?')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_soal/hapus/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_soal"); 
				} else {
					console.log('gagal');
				}
			}
		});
	}
	
	return false;
}
//ujian
function m_ujian_e(id) {
	$("#m_ujian").modal('show');
	
	$.ajax({
		type: "GET",
		url: base_url+"adm/m_ujian/det/"+id,
		success: function(data) {
			$("#id").val(data.id);
			$("#nama_ujian").val(data.nama_ujian);
			$("#mapel").val(data.id_mapel);
			$("#jumlah_soal").val(data.jumlah_soal);
			$("#waktu").val(data.waktu);
			$("#terlambat").val(data.terlambat);
			$("#tgl_mulai").val(data.tgl_mulai);
			$("#wkt_mulai").val(data.wkt_mulai);
			$("#acak").val(data.jenis);
			$("#nama_ujian").focus();
			__ambil_jumlah_soal(data.id_mapel);
		}
	});
	
	return false;
}


function save_krs_e( ob, id_mk, cel, posdata) {
	table_krs = document.getElementsByName("detail_krs")[0];
	kls = $("#id_kelas").val();

	if (ob.checked) {
		var_url = "krs/save/"+id_mk+"/"+ kls + "/" + posdata
	} else {
		var_url = "krs/save/"+id_mk+"/00000/" + posdata
	}	

	var row = table_krs.rows[cel-1];

	// console.log(row.cells[6].innerHTML);
	
	$.ajax({		
		type: "POST",
		url: base_url + var_url,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			// ..............
			if (response.proses == "insert") {
				row.cells[6].innerHTML = "..proses...";
				} else {
				row.cells[7].innerHTML = "..updated..";
				}
			
		} else {
			//console.log('gagal');
			row.cells[5].innerHTML = "gagal update";
		}
	});

	return false;
}

function uas_ganti_jadwal(ob) {



	console.log($(ob).data("recno"));
	console.log($(ob).val());

	var	obj	= { action	: "save_uas", 
				recno	: $(ob).data("recno"),
				kelas	: $(ob).val()
			  };
	
	$.ajax({		
		type: "GET",
		url: base_url+"krs/uas_ganti_kelas?action="+btoa(JSON.stringify(obj)),
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

function krs_view_jadwal(ob) {
	if ( $(ob).prop("checked") ) {
		$(".jadwal").css("display","inline")
	} else {
		$(".jadwal").css("display","none")
	}
}

function krs_view_alljadwal(opt) {
	if (opt==1) {
		window.location.assign(base_url+"krs/view_krs/all") 
	} else {
		window.location.assign(base_url+"krs/view_krs") 
	}
}


function krs_request() {
	
	var getdata = $("[name=krs_pilih]")
	var data=[]
	
	$(getdata).each( function(k,e) {
		
		if (e.className != "") {

			if (e.className=="krs-pilih") {
				rd=[e.className, e.dataset.id_reccord, e.dataset.reccord, $("[class=singleclass]")[k].value ];
				// console.log(rd);
				data.push( rd );
			}
			
			if (e.className=="krs-hapus") {
				if (e.dataset.id_reccord !== 0) {	
					data.push( [e.className, e.dataset.id_reccord]) //
				}				
			}
			
		}
	})

	var dom = $(".krs-pilih:checked")
	sks_total = 0
	$(dom).each( function(k, e) {
		var rec = window.atob( $(e).attr("data-reccord") );
		var obj = JSON.parse(rec)
		sks_total += Number(obj.sks)
	})

	if  (sks_total >24) {
		MYalert("Ajuan KRS", "SKS lebih dari 24 SKS ....", [], (function() { location.reload();}));
		return false;
	}
	
	$("#sks_kontrak").html(sks_total)

	//console.log(data);
	
	
	var vpost = JSON.stringify( { 
								'reccord_send' 	: data, 
								'sks_kontrak' 	: $("#sks_kontrak").html(), 
								'kelas' 		: $("#id_kelas").val() 
								});

	$.ajax({		
		type: "POST",
		url: base_url+"krs/proses_ajuan",
		data: vpost,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'})
		.done( function(response) {
				$("#tampilkan_modal").html(response.html);
				$('#ajuan_krs').on('hidden.bs.modal', function () {
				  window.location.assign(base_url+"krs/view_krs");}
				  )
				$("#ajuan_krs").modal("show");
			   
			  })
	
/*	
	
	
	$.ajax({		
		type: "POST",
		url: base_url+"krs/send_krs/" + $("#id_kelas").val(),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			$("#myModal").html(response.html);

			$('#myModal').on('hidden.bs.modal', function () {
			  window.location.assign(base_url+"adm");
			})
			
			$("#myModal").show();
			
			
		} else {
			$("#myModal").html(response.html);
			$("#myModal").show();
			//alert("Ajuan KRS gagal proses...");
		}
	});
*/
	return false;
}


function krs_print() {
	window.location.assign(base_url+"krs/print_krs")
	$.ajax({		
		type: "POST",
		url: base_url+"krs/cetak",
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			// ..............
			alert("Ajuan KRS sedang diproses...");
		} else {
			alert("Ajuan KRS gagal proses...");
			//console.log('gagal');
		}
	});

	return false;
}

function m_ujian_s() {
	var f_asal	= $("#f_ujian");
	var form	= getFormData(f_asal);
	if (form.jumlah_soal >  form.jumlah_soal1 && false) {
		alert('Jumlah soal pada mata pelajaran ini belum mencukupi..!' + "Jumlah Soal : " + form.jumlah_soal1);
	}	else  {
		$.ajax({		
			type: "POST",
			url: base_url+"adm/m_ujian/simpan",
			data: JSON.stringify(form),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8'
		}).done(function(response) {
			if (response.status == "ok") {
				window.location.assign(base_url+"adm/m_ujian"); 
			} else {
				console.log('gagal');
			}
		});
	}
	return false;
}
function m_ujian_h(id) {
	if (confirm('Anda yakin..?')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_ujian/hapus/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_ujian"); 
				} else {
					console.log('gagal');
				}
			}
		});
	}
	
	return false;
}

function m_ujian_ac(id, proses) {
	
	if (proses ==0) {
		if (confirm('Pentupan Ujian: Anda yakin..?')) {
			$.ajax({
				type: "GET",
				url: base_url+"adm/m_ujian/aktivasi/"+id+"/"+0,
				success: function(response) {
					if (response.status == "ok") {
						window.location.assign(base_url+"adm/m_ujian"); 
					} else {
						console.log('gagal');
					}
				}
			});
		}
	} else {
		if (confirm('Penbukaan kembali Ujian: Anda yakin..?')) {
			$.ajax({
				type: "GET",
				url: base_url+"adm/m_ujian/aktivasi/"+id+"/"+1,
				success: function(response) {
					if (response.status == "ok") {
						window.location.assign(base_url+"adm/m_ujian"); 
					} else {
						console.log('gagal');
					}
				}
			});
		}
	}
	
	return false;
}

function refresh_token(id) {
	$.ajax({
		type: "GET",
		url: base_url+"adm/m_ujian/refresh_token/"+id,
		success: function(response) {
			if (response.status == "ok") {
				pagination("datatabel", base_url+"adm/m_ujian/data", []);	
			} else {
				console.log('gagal');
			}
		}
	});
	
	return false;
}

/* admindos las puerta conos il grande partite */
//siswa
function m_siswa_e(id) {
	$("#m_siswa").modal('show');
	$.ajax({
		type: "GET",
		url: base_url+"adm/m_siswa/det/"+id,
		success: function(data) {
			$("#id").val(data.id);
			$("#nama").val(data.nama);
			$("#nim").val(data.nim);
			$("#jurusan").val(data.jurusan);
			$("#kelas").val(data.kelas);
			$("#nama").focus();
		}
	});
	return false;
}

function m_siswa_s() {
	var f_asal	= $("#f_siswa");
	var form	= getFormData(f_asal);
	$.ajax({		
		type: "POST",
		url: base_url+"adm/m_siswa/simpan",
		data: JSON.stringify(form),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			window.location.assign(base_url+"adm/m_siswa"); 
		} else {
			console.log('gagal');
		}
	});
	return false;
}

function m_siswa_bd() {
	confirm('DATA SUDAH BENAR??: Anda yakin..?');

	var f_asal	= $("#f_siswa");
	var form	= getFormData(f_asal);
	
	$.ajax({		
		type: "POST",
		url: base_url+"adm/biodata_mhs/save",
		data: JSON.stringify(form),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			window.location.assign(base_url+"adm/logout"); 
		} else {
			console.log('gagal');
		}
	});
	return false;
}

function p_essai_s() {
	history.back();
	return false;
}

function m_siswa_h(id) {
	if (confirm('DELETE mahasiswa: Anda yakin..?')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_siswa/hapus/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_siswa"); 
				} else {
					console.log('gagal');
				}
			}
		});
	}
	return false;
}
function m_siswa_u(id) {
	if (confirm('REGISTERS MHS: Anda yakin..? Username dan Password otomatis adalah NIM ..!')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_siswa/user/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_siswa"); 
				} else {
					alert(response.caption);
				}
			}
		});
	}
	return false;
}

function m_siswa_ac(id) {
	if (confirm('Aktifkan Account ..!')) {
		$.ajax({
			type: "GET",
//			url: base_url+"adm/m_siswa/user_reset/"+id,
			url: base_url+"adm/m_siswa/aktivasi/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_siswa"); 
				} else {
					alert(response.caption);
				}
			}
		});
	}
	return false;
}


function m_siswa_ur(id) {
	if (confirm('RESET Password: Anda yakin..? Username dan Password otomatis adalah NIM ..!')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_siswa/user_reset/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_siswa"); 
				} else {
					alert(response.caption);
				}
			}
		});
	}
	return false;
}
//guru
function m_guru_e(id) {
	$.ajax({
		type: "GET",
		url: base_url+"adm/m_guru/det/"+id,
		success: function(data) {

			$("#id").val(data.id);
			$("#nip").val(data.nip);
			$("#nama").val(data.nama);
			$("#sex").val(data.sex);
			$("#foto").val(data.profile_pic);
			
				if ( data.profile_pic == "" ) {	
					nm_file= (data.sex == "L" ? "male.jpg":"female.jpg");
				} else {
					nm_file= data.profile_pic;
				}	
			
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
		/* -------- PROSES UPLOAD ---- */
			uploadfoto_e();
		/* -------- PROSES UPLOAD ---- */

			$("#nama").focus();
			$("#m_guru").modal('show');
			
		}
	});
	return false;
}

function m_guru_s() {
	
	if ($("#img_file").data("img") != "") {
		$("#pic_profile").attr("value", $("#img_file").data("img"));
	}	

	//console.log( "ON Save:"+$("#pic_profile").val() )
	
	var f_asal	= $("#f_guru");
	var form	= getFormData(f_asal);

	console.log("ON Save:"+JSON.stringify(form)	);
	
	$.ajax({		
		type: "POST",
		url: base_url+"adm/m_guru/simpan",
		data: JSON.stringify(form),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			window.location.assign(base_url+"adm/m_guru"); 
		} else {
			console.log('gagal');
		}
	});
	return false;
}

function save_ebobot(id_user, id_soal, nilai) {
	$.ajax({		
		type: "POST",
		url: base_url+"rekap/save_ebobot/"+id_user+"/"+id_soal+"/"+nilai,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			// ..............
		} else {
			console.log('gagal');
		}
	});
	return false;
}

function save_editnilai(ob) {
var	obj	= { action	: "save_edit", 
		    recno	: $(ob).data("recno"),
		    kolom	: $(ob).data("kolom"),
			nilai	: $(ob).val()
		  };
	
	$.ajax({		
		type: "GET",
		url: base_url+"nilai/edit_nilai_mhs?action="+btoa(JSON.stringify(obj)),
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

function save_editnilai_essai(ob) {
var	obj	= { action	: "save_edit_essai", 
		    recno	: $(ob).data("recno"),
			nilai	: $(ob).val()
		  };
	
	$.ajax({		
		type: "GET",
		url: base_url+"nilai/edit_nilai_mhs?action="+btoa(JSON.stringify(obj)),
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



function get_nilai_uas() 
{
	var str = document.URL;
	var n 	= str.search("action=");
	var data = JSON.parse(atob(str.substring(n+7)));

	var	obj	= { action	: "get_nilaiuas", 
		    id_mk	: data.id_mk,
		    prodi	: data.prodi,
			kelas	: data.kelas
		  };
	console.log(obj);
	
	$.ajax({		
		type: "GET",
		url: base_url+"nilai/get_nilai_uas?action="+btoa(JSON.stringify(obj)),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			if (response.rows >0) {
				location.reload(); 
			} else {
				alert("Tidak ada perubahan data..");
			}				
			console.log('update ok!');
		} else {
			console.log('gagal');
		}
	});
		
	return false;
}



function m_guru_h(id) {
	if (confirm('Anda yakin..?')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_guru/hapus/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_guru"); 
				} else {
					console.log('gagal');
				}
			}
		});
	}
	return false;
}
function m_guru_u(id) {
	if (confirm('Anda yakin..? Username dan Password otomatis adalah NIP')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_guru/user/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_guru"); 
				} else {
					alert(response.caption);
				}
			}
		});
	}
	return false;
}
function m_guru_ur(id) {
	if (confirm('Anda yakin..? Username dan Password otomatis adalah NIP ..!')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_guru/user_reset/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_guru"); 
				} else {
					alert(response.caption);
				}
			}
		});
	}
	return false;
}
function m_guru_matkul(id) {
	$.ajax({
		type: "GET",
		url: base_url+"adm/m_guru/ambil_matkul/"+id,
		success: function(data) {
			if (data.status == "ok") {
				var ischeck		= "";
				var jml_data	= Object.keys(data.data).length;
				var hate 		= '<div class="modal fade" id="m_siswa_matkul" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
					hate +=	'<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
					hate +=	'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					hate +=	'<h4 id="myModalLabel">Setting Mata Kuliah</h4></div>';
					hate +=	'<div class="modal-body"><form name="f_siswa_matkul" id="f_siswa_matkul" method="post" onsubmit="return m_guru_matkul_s();">';
					hate +=	'<input type="hidden" name="id_mhs" id="id_mhs" value="'+id+'"><div id="konfirmasi"></div>';
				
				if (jml_data > 0) {
					$.each(data.data, function(i, item) {
						hate += '<p><label><input type="checkbox" value="'+item.id+'" name="id_mapel_'+item.id + '"' + (item.ok == "1" ? " checked " : "") + '> &nbsp;'+item.nama+'</label> &nbsp;&nbsp;';
					});				
				} else {
					hate += 'Belum ada data..';
				}
				hate += '<div class="modal-footer"><button class="btn btn-primary" type="submit">Simpan</button><button class="btn" data-dismiss="modal" aria-hidden="true">Tutup</button></div></form></div></div></div>';
				$("#tampilkan_modal").html(hate);
				$("#m_siswa_matkul").modal('show');
			} else {
				console.log('gagal');
			}
		}
	});
	return false;
}
function m_guru_matkul_s() {
	var f_asal	= $("#f_siswa_matkul");
	var form	= getFormData(f_asal);
	$.ajax({		
		type: "POST",
		url: base_url+"adm/m_guru/simpan_matkul",
		data: JSON.stringify(form),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			window.location.assign(base_url+"adm/m_guru"); 
		} else {
			console.log('gagal');
		}
	});
	
	return false;
}
//mapel
function m_mapel_e(id) {
	$("#m_mapel").modal('show');
	$.ajax({
		type: "GET",
		url: base_url+"adm/m_mapel/det/"+id,
		success: function(data) {
			$("#id").val(data.id);
			$("#nama").val(data.nama);
			$("#sks").val(data.sks);
			$("#kodemk").val(data.kodemk);
			$("#nama").focus();
		}
	});
	return false;
}
function m_mapel_s() {
	var f_asal	= $("#f_mapel");
	var form	= getFormData(f_asal);
	$.ajax({		
		type: "POST",
		url: base_url+"adm/m_mapel/simpan",
		data: JSON.stringify(form),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			window.location.assign(base_url+"adm/m_mapel"); 
		} else {
			console.log('gagal');
		}
	});
	return false;
}
function m_mapel_h(id) {
	if (confirm('Anda yakin..?')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_mapel/hapus/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_mapel"); 
				} else {
					console.log('gagal');
				}
			}
		});
	}
	return false;
}
function __ambil_jumlah_soal(id_mapel) {
	$.ajax({
		type: "GET",
		url: base_url+"adm/m_ujian/jumlah_soal/"+id_mapel,
		success: function(response) {
			$("#jumlah_soal1").val(response.jumlah);	
		}
	});
	return false;
}
function rubah_password() {
	$.ajax({
		type: "GET",
		url: base_url+"adm/rubah_password/",
		success: function(response) {
			var teks_modal = '<div class="modal fade" id="m_ubah_password" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header" style="background-color: coral;"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 id="myModalLabel">Update password</h4></div><div class="modal-body"><form name="f_ubah_password" id="f_ubah_password" onsubmit="return rubah_password_s();" method="post"><input type="hidden" name="id" id="id" value="'+response.id+'"><div id="konfirmasi"></div><table class="table table-form"><tr><td style="width: 25%">Username</td><td style="width: 75%"><input type="text" class="form-control" name="u1" id="u1" required value="'+response.username+'" readonly></td></tr><tr><td style="width: 25%">Password lama</td><td style="width: 75%"><input type="password" class="form-control" name="p1" id="p1" required></td></tr><tr><td style="width: 25%">Password Baru</td><td style="width: 75%"><input type="password" class="form-control" name="p2" id="p2" required></td></tr><tr><td style="width: 25%">Ulangi Password</td><td style="width: 75%"><input type="password" class="form-control" name="p3" id="p3" required></td></tr></table></div><div class="modal-footer"><button class="btn btn-primary" onclick="return rubah_password_s();"><i class="fa fa-check"></i> Simpan</button><button class="btn" data-dismiss="modal" aria-hidden="true"><i class="fa fa-minus-circle"></i> Tutup</button></div></form></div></div></div>';
			$("#tampilkan_modal").html(teks_modal);
			$("#m_ubah_password").modal('show');
			$("#p1").focus();
		}
	});
	return false;
}

function change_userpic() {
	$.ajax({
		type: "GET",
		url: base_url+"adm/user_change_foto",
		success: function(response) {
			var teks_modal = response.html
			$("#tampilkan_modal").html(teks_modal);
			$("#m_user_picture").modal('show');
		}
	});
	return false;
}


function rubah_password_s() {
	var f_asal	= $("#f_ubah_password");
	var form	= getFormData(f_asal);
	$.ajax({		
		type: "POST",
		url: base_url+"adm/rubah_password/simpan",
		data: JSON.stringify(form),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			$("#konfirmasi").html('<div class="alert alert-success">'+response.msg+'</div>');
			$("#m_ubah_password").modal('hide');
		} else {
			$("#konfirmasi").html('<div class="alert alert-danger">'+response.msg+'</div>');
		}
	});
	return false;
}


function save_set_krs(ob, rec, mk) {
	// console.log(ob);	
	myrow = ob.closest('tr').rowIndex;
	var eInput = document.getElementById("datatabel").getElementsByTagName("tr")[myrow].getElementsByTagName("input");

	document.getElementById("datatabel").getElementsByTagName("tr")[1].getElementsByTagName("input")[1].checked
	text_edit = "";
	th_  = $("#filter_tahun").val().substr(0,4)
	
	for (n=0; n<eInput.length; n++) {
		text_edit += (eInput[n].checked?";"+ (th_ - n) + "1":";")
	}

	var	obj	= { action	: "save_setting", 
				recno	: rec,
				idmk	: mk,
				th_semester	: $("#filter_tahun").val(),
				text_save : text_edit
			  };
		
		$.ajax({		
			type: "GET",
			url: base_url+"setkrs/save?action="+btoa(JSON.stringify(obj)),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8'
		}).done(function(response) {
			if (response.status == "ok") {
				if ( rec == 0) {
					for (n=0; n<eInput.length; n++) {
						$(eInput[n]).attr("onchange", "save_set_krs(this,"+response.recordID+"," +mk+")" );
					}
				}	
				console.log('update ok!');
			} else {
				console.log('gagal');
			}
		});

/*		
		
		//alert(ob.value + ";" + mk + ";" + prodi );
		if (ob.checked) {
			var_url = "setkrs/save/"+ "1" + ob.value + "/" + mk + "/" + prodi
		} else {
			var_url = "setkrs/save/"+ "0" + ob.value + "/" + mk + "/" + prodi	}	
		
		$.ajax({		
			type: "POST",
			url: base_url + var_url,
			dataType: 'json',
			contentType: 'application/json; charset=utf-8'
		}).done(function(response) {
			if (response.status == "ok") {
				// alert("Ok data sudah disimpan");
			} else {
				console.log('gagal');
			}
		});
	*/
		
		return false;
	}

function acc_krs(ob, recno) {
	//alert(ob.value + ";" + mk + ";" + prodi );
	if (ob.checked) {
		var_url = "setkrs/krs_acc/"+ "1" + "/" + recno
	} else {
		var_url = "setkrs/krs_acc/"+ "0" + "/" + recno	}	
	
	$.ajax({		
		type: "POST",
		url: base_url + var_url,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		success: function(response) {
				if (response.status == "ok") {
					MYalert("Verifikasi", "Sukses..")
					//console.log('Update Suksess..');
					show_datatabel();
				} else {
					MYalert("Verifikasi", "Gagal...")
				}}
		});
	
	return false;
}

function boleh_editkrs(ob, recno) {
	//alert(ob.value + ";" + mk + ";" + prodi );
	if (ob.checked) {
		var_url = "setkrs/krs_bolehedit/"+ "1" + "/" + recno
	} else {
		var_url = "setkrs/krs_bolehedit/"+ "0" + "/" + recno	}	
	
	$.ajax({		
		type: "POST",
		url: base_url + var_url,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			// alert("Ok data sudah disimpan");
		} else {
			console.log('gagal');
		}
	});
	return false;
}


function show_mk_prodi(ob) {
	ob1 = $('#id_prodi 		option:selected');

	$("#filter_prodi").val(ob1.val());
	$('#datatabel').DataTable()
       .ajax.url(base_url+"matakuliah/data/" + ob1.val())
	   .load()
	return false;
}

function show_set_krs(ob) {
var table = $('#datatabel').DataTable();
	ob1 = $('#id_prodi 		option:selected');
	ob2 = $('#id_stat_krs 	option:selected');
	ob3 = $('#opt_semester 	option:selected');
	
	$("#filter_prodi").val(ob1.val());
	$("#filter_status").val(ob2.val());
	$("#filter_tahun").val(ob3.val());

	if (ob.id == "opt_semester") {
		th_  = $("#filter_tahun").val().substr(0,4)
		
		for (n=5; n <= 8; n++) {
			$(table.column(n).header()).text((th_ - (n-5) ) + "1");			
		}
		$("#ph3").text("SETTING KRS Tahun Akademik: "+$("#filter_tahun").val());
	}

	table.draw();
	return true;
}

function show_list_krs(ob) {
	ob1 = $('#id_prodi option:selected');
	$("#filter_prodi").val(ob1.val());
	
	if	(ob1.val()=="00000") {
		$( "option[name*='kelas_"+ob1.val()+"']").show();	
	} else {
		$( "option[name*='kelas_']").hide();
		$( "option[name*='kelas_"+ob1.val()+"']").show();	
	}
	
	ob2 = $('#id_kelas  option:selected');
	$("#filter_kelas").val(ob2.val());

	ob3 = $('#id_status option:selected');
	$("#filter_status").val(ob3.val());
	
	$('#datatabel').DataTable()
       .ajax.url(base_url+"setkrs/data_listkrs?prodi="+ob1.val()+"&kelas="+ob2.val()+"&status="+ob3.val())
	   .load()
	return false;
}


function show_jdkul(ob) {
var tb = $("#datatabel").DataTable();
	tb.draw();
	return false;
}


function show_mhs_prodi(ob) {
	$('#filter_prodi').val(ob.value);
	$('#datatabel').DataTable()
       .ajax.url(base_url+"mahasiswa/data/" + ob.value)
	   .load()
	return false;
}

function show_dos_krs(ob) {
	ob1 = $('#id_prodi option:selected');
	ob2 = $('#id_kelas option:selected');
	
	$('#filter_prodi').val(ob1.val());
	$("#filter_kelas").val(ob2.val());

	$('#datatabel').DataTable()
       .ajax.url(base_url+"setkrs/data_dosen_listkrs/" + ob1.val() + "/" +ob2.val())
	   .load()
	return false;
}



function selesai_soal(ob, id_soal, no_sessi) {
//	console.log(base_url+"soaldosen/e_soal_finish/"+id_soal+"/"+no_sessi+"/"+ob.checked);
		$.ajax({		
			type: "POST",
			url: base_url+"soaldosen/e_soal_finish/"+id_soal+"/"+no_sessi+"/"+ob.checked,
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

	function test_modal() {
	var html_modal="";
		
		html_modal += '<div class="modal-dialog">';
		html_modal += '<div class="modal-content">';
		html_modal += '		<div class="modal-header">';
		html_modal += '		  <button type="button" class="close" data-dismiss="modal">&times;</button>';
		html_modal += '		  <h4 class="modal-title">Modal Header</h4>';
		html_modal += '		</div>';
		html_modal += '		<div class="modal-body">';
		html_modal += '		  <p>Some text in the modal.</p>';
		html_modal += '		</div>';
		html_modal += '		<div class="modal-footer">';
		html_modal += '		  <button id="IDmodal_button1" value="false" type="button" class="btn btn-default" data-dismiss="modal" onclik="this.val(true), return true;" >Close</button>';
		html_modal += '		  <button id="IDmodal_button2" value="false" type="button" class="btn btn-primary" data-dismiss="modal" onclik="this.val(true), return true;" >Proses</button>';
		html_modal += '		</div>';
		html_modal += '	  </div>';
		html_modal += '	</div>';

		$("#tampilkan_modal").html(html_modal);
		$("#tampilkan_modal").modal({backdrop: false});
		// $("#tampilkan_modal").modal("show");

		if ($("#IDmodal_button1").val()== true) {
			return 1
		} else if($("#IDmodal_button2").val()== true) {
			return 2
		}
		return 0
	}


	function show_modal(txtHeader, txtData, ocBatal=[]) {
	var html_modal="";
		
		html_modal += '<div class="modal-dialog" style="max-width:350px;">';
		html_modal += '<div class="modal-content">';
		html_modal += '		<div class="modal-header">';
		html_modal += '		  <h4 class="modal-title">'+txtHeader+'</h4>';
		html_modal += '		</div>';
		html_modal += '		<div class="modal-body">';
		html_modal += '		  <p id = "text_modal">'+txtData+'.</p>';
		html_modal += '		</div>';

		if (ocBatal.length == 0) {
			ocBatal = [["Tutup","","btn-success"]];
		}
		
		if ( ocBatal.length != 0 ) {
		
			html_modal += '		<div class="modal-footer">';
			html_modal += '		  <button id="IDmodal_button1" value="false" type="button" class="btn '+ocBatal[0][2]+'" data-dismiss="modal" onclick="'+ocBatal[0][1]+'" >'+ocBatal[0][0]+'</button>';

			if ( ocBatal.length==2 ) {
				if (ocBatal[1].length==2) {
					ocBatal[1]=[ocBatal[1][0],ocBatal[1][1],"btn-success"]
				}
				html_modal += '		  <button id="IDmodal_button2" value="false" type="button" class="btn '+ocBatal[1][2]+'" data-dismiss="modal" onclick="'+ocBatal[1][1]+'" >'+ocBatal[1][0]+'</button>';
			}

			html_modal += '		</div>';
		}
		html_modal += '	  </div>';
		html_modal += '	</div>';
		$("#tampilkan_modal").html(html_modal);
		$("#tampilkan_modal").modal({backdrop: false});

	}	
	
	
	
	function show_progress(txtHeader, txtData, ocBatal, callback ) {
	var html_modal="";
		
		html_modal += '<div class="modal-dialog" style="width:350px;">';
		html_modal += '<div class="modal-content">';
		html_modal += '		<div class="modal-header">';
		html_modal += '		  <h4 class="modal-title">'+txtHeader+'</h4>';
		html_modal += '		</div>';
		html_modal += '		<div class="modal-body">';
		html_modal += '		  <p>'+txtData+'.</p>';
		html_modal += '		<progress value="0" max="100" style="width:320px;" id="progressbar" ></progress>';
		html_modal += '		</div>';
		html_modal += '		<div class="modal-footer">';
		html_modal += '		  <button id="IDmodal_button1" value="false" type="button" class="btn btn-default" data-dismiss="modal" onclick="'+ocBatal[0][1]+'" >'+ocBatal[0][0]+'</button>';

		if ( ocBatal.length==2 ) {
			html_modal += '		  <button id="IDmodal_button2" value="false" type="button" class="btn btn-default" data-dismiss="modal" onclick="'+ocBatal[1][1]+'" >'+ocBatal[1][0]+'</button>';
		}

		html_modal += '		</div>';
		html_modal += '	  </div>';
		html_modal += '	</div>';

		$("#tampilkan_modal").html(html_modal);
//		$("#tampilkan_modal").modal({backdrop: false});
//		$("#tampilkan_modal").modal(true);
//		$(dialog1).modal('open');
		

		return false;
	}


	
	function set_soal(idcheck, idsoal) {
		ob = $("#"+idcheck);
		// console.log( "cek : " + $('#'+idcheck).prop('checked'));
		
		if ( $('#'+idcheck).prop('checked') ) {
			$('#'+idcheck).prop('checked', false) }
		 else {
			$('#'+idcheck).prop('checked', true) 
		}
		
		if ( idsoal>0 ) {
			$.ajax({		
					type: "POST",
					url: base_url+"soaldosen/add_soal/"+idsoal+"/"+$('#'+idcheck).prop('checked'),
					dataType: 'json',
					contentType: 'application/json; charset=utf-8'
				}).done(function(response) {
		//				$("#myModal").html(response);
		//				$("#myModal").show();
				});
		}
	}
	
	function delete_soal(idsoal) {
			$.ajax({		
					type: "POST",
					url: base_url+"soaldosen/add_soal/"+idsoal+"/false",
					dataType: 'json',
					contentType: 'application/json; charset=utf-8'
				}).done(function(response) {
					location.reload();
				});
		}
	

function show_dialog(text_title, text_dialog, abtn) {
var result_dialog =0;

	// $( "#dialog-confirm" ).dialog("destroy");
	document.getElementById("dialog-text").innerHTML = text_dialog;
	if (abtn == null) {
		abtn = { 'Tutup': function() {$(this).dialog('close')}}
		}
											
//	$( "#dialog-text" ).text("<i>"+text_dialog+"</i>");
	$( "#dialog-confirm" ).dialog({
		
      title: text_title,
      dialogClass: "no-close",
	  resizable: false,
//	  position: { my: "top left"},
      height: "auto",
      width: 400,
	  show: { effect: "clip", duration: 500 },
	  hide: { effect: "fade", duration: 1000 },
      modal: true,
      buttons: abtn,
    });
	
	return false
    }

function test_dialog() {
var ret=0, timeID = 0;
	cb1=["proses Export Data","alert('a')"];
	cb2=["Batal", ""];
	
	ret = show_dialog('Do you want to continue?', 
	'Proses Entry akan dilanjutkan untuk selanjutnya, semester tahun 2018-1 ',
	cb1, cb2)	
	console.log("test "+ret);

}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
	
function list_selection() {
	return  JSON.stringify(getCheckbox("TBlist_krs"))
	}
	
function Get_tmpFile() {
	cTmp_file = "";
	$.ajax({		
			type: "GET",
			url: base_url+"progress/get_sessiontmp",
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				 cTmp_file = data.session;
			},
			error:function(XHRdata, status_error){
				console.log(status_error); }
		});		
	return cTmp_file;
}

function CloseProgress() {
	$.ajax({		
			type: "GET",
			url: base_url+"progress/CloseProgress/"+cTmp_file,
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
			// remove sukses......
			},
			error:function(XHRdata, status_error){
				console.log(status_error); }
		});		
	return true;
}		

function mhs_status_app(ob, doproses, id_mhs) {
	var_url = "mahasiswa/status/"+doproses+"/"+ id_mhs + "/" + ($(ob).prop("checked")?"Y":"N");
	
	$.ajax({		
		type: "POST",
		url: base_url + var_url,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
		    // $("#view"+doproses+"_"+id_mhs).prop("checked",status )
			// ..............
			console.log('updated..')
		} else {
			//console.log('gagal');
		}
	});

	return false;
}

function mhs_kelas(ob, id_mhs, kls) {
	var_url = "mahasiswa/editkelas/"+ id_mhs + "/" + kls;
	
	$.ajax({		
		type: "POST",
		url: base_url + var_url,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
		    // $("#view"+doproses+"_"+id_mhs).prop("checked",status )
			// ..............
			console.log('updated..')
		} else {
			//console.log('gagal');
		}
	});

	return false;
}


function ExportData(php_url) {
	var table = $('#datatabel').DataTable();
	var info = table.page.info();
	if (info.recordsTotal > 10000) {
		show_modal("EXPORT Table","Data terlalu banyak, memory bisa crash !!.<br>Lakukan filter data");
		return false;
	}
		html  = "<form id='form_export' method='post' action='"+php_url+"' >"
		html +=	"<input type='hidden' name='flt_prodi'  value='"+$('#filter_prodi').val()+"' />"
		html +=	"<input type='hidden' name='flt_search' value='"+$("input[type='search']").val()+"' />"
		html +=	"</form>"

		$("body").append(html);
		var f = document.getElementById('form_export');
			window.open('', '_blank');
		f.submit();
		//	$(f).remove;
}

function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

function dateTodmY(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return (d <= 9 ? '0' + d : d) + '-' + (m<=9 ? '0' + m : m) + '-' + y ;
}

function JavaDiff(p1, p2)
{
d1 = new Date(p1); 	d2 = new Date(p2)
var DateDiff = {
    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000));
    },

    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000*7));
    },

    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },

    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}

}

/* == test   === */
function getErrorObject(){
    try { throw Error('') } catch(err) { return err; }
}
/* ============== */


function load_mymodule(name_module) {

	if (name_module=="edit-nilai") 
	{	
		/* set event after data load....... */
			var table = $('#datatabel').DataTable();
				table.on( 'draw', function () {
					
						$(".input-nilai").attr("min",0);
						$(".input-nilai").attr("max",100);
						$(".input-nilai").attr("maxlength",3);

						$(".input-nilai").each(function() {
							$(this).attr("data-old", $(this).val());
						});
	/*				
					$(".input-nilai").focus( function(){
						sav_edit = $(this).data("old");	
						// console.log(sav_edit);
						});
	*/
					$(".input-nilai").change( function(){
						if ($(this).val()<0 || $(this).val()>100) {
							$(this).val(0);
							}
						});


					$(".input-nilai").blur( function() {
							if ($(this).val() == $(this).data("old")) {
								/* no edit */ 
							} else {	
								$(this).data("old", $(this).val());

//								console.log("edited to :"+ $(this).val());

								save_editnilai(this);
								
							}
						});
						
				} );
	} 
	
	else { 			

	if (name_module=="edit-nilai-essai") 
			{	
		/* set event after data load....... */
			var table = $('#datatabel').DataTable();
				table.on( 'draw', function () {
					
						$(".input-nilai").attr("min",0);
						$(".input-nilai").attr("max",$("#bobot-max").text());
						$(".input-nilai").attr("maxlength",3);

						$(".input-nilai").each(function() {
							$(this).attr("data-old", $(this).val());
						});

					$(".input-nilai").change( function(){
						if ($(this).val()<0 || $(this).val()>100) {
							$(this).val(0);
							}
						});


					$(".input-nilai").blur( function() {
							if ($(this).val() == $(this).data("old")) {
								/* no edit */ 
							} else {	
								$(this).data("old", $(this).val());
								save_editnilai_essai(this);
								
							}
						});
						
					} );
			}
	}
	
}