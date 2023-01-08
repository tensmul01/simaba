
function change_valueOpsi(cname) {
	ob   = document.getElementById(cname)
	nmhs = $(".fa-check").length;
	
	if ( ob.className == "btn fa fa-check") 
		{
			//console.log("delete");
			nmhs = nmhs - 1;
		
			data_peserta_kuliah( $(ob).data("mhs"), $(ob).data("dhmd"), "delete", 
			(function(){

				ob.className= "btn fa fa-remove"
				$(ob.nextSibling ).fadeTo("slow", 0.25)
			}));
			
		} else {

			//console.log("add");
			
			nmhs = nmhs + 1;
			data_peserta_kuliah( $(ob).data("mhs"), $(ob).data("dhmd"), "add", 
			(function(){

				ob.className = "btn fa fa-check";
				$(ob.nextSibling ).fadeTo("slow", 1);
			}));
		}
	
	$("#jumlah_mhs").text( nmhs );

	
}

	function MYalert(txtHeader, txtData, ocBatal=[], callb ) 
	{
	const max =1000;
	const min =1;
	
	/* 
		ocBatal[0]="teks"
		ocBatal[1]="onclick"
		ocBatal[2]="class button"
		
	*/
	
	
	var randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
	var respon_btn = 0;	
	var idAlert= "my-alert-" + 	randomnumber;
	var html_modal="";
		html_modal += '<div class="modal fade" id="' + idAlert + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">';

		html_modal += '<div class="modal-dialog modal-dialog-centered" role="document">';
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
		
			html_modal += '	<div class="modal-footer">';
			html_modal += '	<button id="IDmodal_button1" data-dismiss="modal" value="true" type="button" class="btn ' + 
							ocBatal[0][2] + '" onclick="'+ocBatal[0][1]+'" >'  +
							ocBatal[0][0] + '</button>';

			if ( ocBatal.length==2 ) {

				if ( ocBatal[1].length==1 ) {
					ocBatal[1] =[ ocBatal[1][0], "","btn-success"]
				}
				
				html_modal += '	<button id="IDmodal_button2" value="false" type="button" class="btn '+ ocBatal[1][2] 
								+ '" data-dismiss="modal" onclick="'
								+ ocBatal[1][1]+'" >'+ocBatal[1][0]+'</button>';
			}

			html_modal += '		</div>';
		}
		html_modal += '	  </div>';
		html_modal += '	</div>';
		html_modal += '	</div>';
		
		var emodal = document.createElement('div');
			emodal.innerHTML=html_modal;
			document.body.appendChild(emodal);
			ob1 = document.getElementById(idAlert).querySelector("[id=IDmodal_button1]");
			
			ob1.addEventListener("click", function(){respon_btn=1}); 

			$("#"+idAlert).on('hidden.bs.modal', function(){

				if ( respon_btn==1) {
					if ( callb ) {
						 callb();
					}
				}	
				
				emodal.remove()
				
			});
  
		  $("#"+idAlert).modal("show");

		return true;
	}	

function dateToYMD( par_date) {
	if (typeof(par_date) == 'string') {
		par_date=new Date(par_date)
	}
	// console.log (par_date)
    var d = par_date.getDate();
    var m = par_date.getMonth() + 1; //Month from 0 to 11
    var y = par_date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

function dateTodmY(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return (d <= 9 ? '0' + d : d) + '-' + (m<=9 ? '0' + m : m) + '-' + y ;
}


function data_peserta_kuliah(idmhs, idDHMD, action, callb) {

		$.ajax( {
			type: "POST",	
			url: base_url + "jadwalkuliah/save_peserta",
			dataType: "json",
			data: { recno : idDHMD, mhs:idmhs, aksi: action},
			success: function( resp ) {
				if (callb){ callb()}
			  }
			})
}

function masuk_kelas(pos, idDHMD) {
var data_send = {recno:idDHMD, mhs:id_konID, aksi:"DHMD in"}
		$.ajax( {
			type: "POST",	
			url: base_url + "mahasiswa/absen_kuliah/"+idDHMD,
			dataType: "json",
			success: function( resp ) {
				if ( resp.status == "ok" )
				{
				if ( REAL_TIMELOGIN )
					web_socket[pos].send(JSON.stringify(data_send))
					MYalert("KELAS Perkuliahan", "Terimakasih, Anda sudah terdaftar sekarang...", [], 
								function(){
									location.reload()
								});
				} else {
					MYalert("KELAS Perkuliahan", "Maaf, kelas belum dimulai", [], function(){ location.reload()});
				}				
			  }
			})
}


function TimeKuliah(time_awal) {
var countDownDate = new Date(time_awal).getTime();
var now = new Date().getTime();
var timeleft = now - countDownDate;
    
var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);	
    oRet = { d : days, h : hours, m : minutes, s: seconds}
	
	return oRet;
}

function pilih_all_ONtable(ob, id_text){
	$("#datatabel input[type='checkbox']").prop("checked", $(ob).prop('checked'));
	count_pilih( id_text )	
}


function count_pilih( id_text ) {

	np = $("#datatabel input[type='checkbox']:checked").length
	document.getElementById(id_text).innerHTML = np ;
	
	if ( np==0) {
		document.getElementById(id_text).parentNode.classList.add("disabled")
	} else {
		document.getElementById(id_text).parentNode.classList.remove("disabled")
	}
	
}

function create_jadwal()
{
	var idrecord = [];
	
	$("#datatabel input[type='checkbox']:checked").each( function(k,v) {
		idrecord.push( v.dataset.reccord);
	});
	
	var data = JSON.stringify(idrecord);

	var url = base_url + 'jadwalkuliah/build_jadwal_onday?action='+btoa(data);
		create_progress(url, "cr_jadwal", "Create Jadwal Kuliah...");
		document.getElementById('loadarea').src = '';
	
		$('#cr_jadwal').on('show.bs.modal', function (e) {
			document.getElementById('loadarea').src = url;
		})	

		$("#cr_jadwal").on('hidden.bs.modal', function(){
						MYalert("CREATE JADWAL KULIAH", "Jadwal berhasil dibuat..", [], (function() { location.reload();})) 
		});
	  
		$("#cr_jadwal").modal({backdrop: false})
		
	return false;

}


