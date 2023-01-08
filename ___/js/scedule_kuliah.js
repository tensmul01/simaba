
/* ------- SCRIPT EDIT SCHEDULE WITH DRAG + DROP --------------------- */
var OOld = "", ONew = "";
var $hari  = [ "Mgu", "Sen","Sel","Rab","Kam","Jum","Sab"]
var $nama_bulan  = [ "Januari", "Februari","Maret","April","Mei","Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]
var posClick = 1;

$(document).ready(function() {
	create_calendar()

	$('#waktu_mulai').clockpicker({
		placement: 'top',
		align: 'left',
		autoclose: true,
		donetext : 'ok!',
		afterDone: function(){
				//$("#save_btn").removeClass("disabled")
				pos = posClick; // $("#info_kelas").data("pos")
				DHMDdata[pos-1].jam_mulai = $('#waktu_mulai').val()
				DHMDdata[pos-1].jam = DHMDdata[pos-1].jam.substring(0, 10)  + " " + $('#waktu_mulai').val()
				//console.log( "record: " + DHMDdata[pos-1].jam)
				// console.log( "Jam: " + DHMDdata[pos-1].jam_mulai)
		},
		'default': 'now'
	});

	$('#ruang').on("change", function(e, s, d, h){
		pos = posClick; // $("#info_kelas").data("pos")
		DHMDdata[pos-1].ruang = this.value
		});

	$('#dosen').on("change", function(){ 
		pos = posClick; // $("#info_kelas").data("pos")
		DHMDdata[pos-1].nama_dosen = this.value
	});


	$( function() {

		$(".drag-tgl" )
			.each( function (k,e) { 
						// DRAG.. + CLICK

			MakeDrag(e);
			
			})

		$(".drop-tgl" )
			.each( function (k,e) { 
						// DOP.. + CLICK
			MakeDrop(e);
			})

/*
		$( ".drop-tgl" ).droppable({
		  accept: ".tgl",
		  classes: {
			"ui-droppable-hover": "ui-state-hover"
		  },
		  drop: function( event, ui ) {
				pos = $(OOld).data("jadwal");
				DHMDdata[pos-1].jam = $(this).data("tanggal") + " " + DHMDdata[pos-1].jam_mulai
				
				MakeDrag(this)
				
				//ui-state-highlight
				this.className = "tgl drag-tgl btn btn-xs"
				$(this).attr("data-jadwal", pos)

				//this.onmouseover()

				//$("#save_btn").removeClass("disabled");
				//$("#delete_btn").addClass("disabled");
				
				$(OOld).removeAttr("data-jadwal")
				
				ONew = OOld
				// untuk membuat div yg asal tidak aktif drop lagi //
				setTimeout( function() {
							OOld.className = "tgl drop-tgl btn btn-default btn-xs";
							},500)
		  }
		});
*/		

	});	
	
})


function create_calendar()
{



	var ndays = DateDiff.inDays(date_start, date_finish);
	var html = "";
	
	var	date1 = date_start;
	var date2 = date_finish;
	var ndays 	= DateDiff.inDays(date1, date2);
	var nd    = 0;
	var bulan = "00", tgl = 1, jm_temu = 0

	/* crea new object:jam */
	for (n=0; n< DHMDdata.length; n++){
		DHMDdata[n].jam = DHMDdata[n].jam.substring(0,16)
		// console.log(dateToYMD(DHMDdata[n].jam.substring(0,16)))
	}
	
				for (nd=0; nd <= ndays; nd++)
				{

					// console.log("tanggal : " +dateToYMD( date1) )
					month 	= date1.getMonth() + 1
					tgl		= date1.getDate()
					is_on_jadwal = false;

					/* cari tanggal apakah ada dalam dhmd */
						for (ndb=0; ndb<DHMDdata.length ; ndb++) {
							if ( dateToYMD(date1)  ==	dateToYMD(DHMDdata[ndb].jam)) {
								is_on_jadwal = true;
								break;
							};
						}


					wd 	=  date1.getDay()
					vtgl 	= ( wd == 0 ? "<i style='color:red;'>" + tgl + "</i>" : tgl );

					if ( !is_on_jadwal ) {

						text_tgl = '<span class="tgl drop-tgl btn btn-default btn-xs" data-tanggal="'+ dateToYMD(date1) + '" >' + vtgl + '</span>';

						} else {

						text_tgl = '<span data-jadwal="' + (jm_temu+1) + '" class="tgl drag-tgl btn btn-xs " data-tanggal="' + dateToYMD(date1) + '" >' + vtgl + '</span>';
						jm_temu++;
					}
					

					if ( tgl == 1 ) 
					{

						html +=  '<div id ="' + month + '" class="col-sm-5 hoverable" style="margin-top:10px; margin-left:10px; padding:4px; border:1px solid; height:250px; text-align:center; background-color: beige;">';
						html +=  '<div class="row" style="text-align:left;margin:auto;top:50%;">';

						html +=  '<span class="btn btn-default btn-block" style="text-vertical-align:middle;" >' + $nama_bulan[date1.getMonth()] +", " + date1.getFullYear() + '</span>';
						html +=  '</div>';
						
						wd = date1.getDay();
						// wd = ( wd>0 ? wd : 6); 
						html +=  '<div style="text-align:center;">';

						html +=  '<div style="text-align:left;width:90%;margin:auto;">';
						// display nama hari........
						for( $n=0; $n<=6; $n++) {
							html +=  '<span class="btn btn-info hari-kuliah btn-xs" style="text-vertical-align:middle; cursor:not-allowed; " >' + $hari[$n] +'</span>';
						}

						// display blank tanggal......
						if ( wd<7 ) {
							var date_ = new Date( dateToYMD(date1) );
								date_ = new Date(date_.setDate(date_.getDate() - (wd+1)));
							
							
							for( $n=0; $n < wd; $n++) {

								date_ = new Date(date_.setDate(date_.getDate()+1));
								
								html +=  '<span class="disabled tgl-kuliah btn btn-xs" style="text-vertical-align:middle; font-size:8px; /*visibility:hidden;*/">'+ date_.getDate() + '</span>';
							}
						}
						
						// end display blank tanggal......
						html += text_tgl;
						
						date1	= new Date(date1.setDate(date1.getDate() + 1));

					} else {

						$bulan1 = date1.getMonth();
						html += text_tgl

						date1	= new Date(date1.setDate(date1.getDate() + 1));
						;
						//* cek bulan afterr add 1 das .........
						$bulan2 = date1.getMonth(); 

						// console.log( $bulan1 + ":" + $bulan2)
						// CLOSING DIV for bulan...
						if ( $bulan1 !== $bulan2 || ( date1 > date2) ) {
							
							var date_ = new Date( dateToYMD(date1) );
								date_ = new Date( date_.setDate(date_.getDate() - 1));
							
							
							for( $n=wd; $n < 6; $n++) {

								date_ = new Date(date_.setDate(date_.getDate()+1));
								
								html +=  '<span class="disabled tgl-kuliah btn btn-xs" style="text-vertical-align:middle; font-size:8px; /*visibility:hidden;*/">'+ date_.getDate() + '</span>';
							}
							
							html += '</div>';
							html += '</div></div>';
							
						}
						
					}

				}
div_s = document.getElementById("scedule_kuliah")
div_s.innerHTML = html;

return true


}			


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

function MakeDrop(ob) {

$(ob).unbind();

$(ob).droppable({
		  accept: ".tgl",
		  classes: {
			"ui-droppable-hover": "ui-state-hover"
		  },
		  drop: function( event, ui ) {
				pos = $(OOld).data("jadwal");
				DHMDdata[pos-1].jam = $(ob).data("tanggal") + " " + DHMDdata[pos-1].jam_mulai
				
				MakeDrag(ob)
				
				//ui-state-highlight
				ob.className = "tgl drag-tgl btn btn-xs"
				$(ob).attr("data-jadwal", pos)

				//this.onmouseover()

				//$("#save_btn").removeClass("disabled");
				//$("#delete_btn").addClass("disabled");
				
				$(OOld).removeAttr("data-jadwal")
				
				ONew = OOld
				/* untuk membuat div yg asal tidak aktif drop lagi */
				setTimeout( function() {
							OOld.className = "tgl drop-tgl btn btn-default btn-xs animasi2";
							MakeDrop(OOld);
							},500)
		  }
		});	
}


function MakeDrag(ob) {
		$(ob).draggable({ 	revert: "invalid",       
							helper: "clone",
							cursor: "move" ,
							start : function( event, ui ) { OOld = this; ONew = null},
							stop  : function( event, ui ) {
									
									if ( ONew != null ) {
										$(this).draggable("disable")
										}
									},
						});

		$(ob).addClass("animasi")

		/* tgl drag-tgl btn btn-xs ui-draggable ui-draggable-handle */
						
		$(ob).on("click", function() {
			$(".drag-tgl").removeClass("btn-info"); 
			$(ob).addClass("btn-info");
			
			var pos = $(ob).data("jadwal")
			var tb  = document.getElementById("table_dhmd")
			posClick = pos;
			if (DHMDdata[pos-1].list_mhs==null) {
				var nhadir = 0; 
				} else { 
				var nhadir = (DHMDdata[pos-1].list_mhs.match(/;/g) || []).length;
			}
			
				document.getElementById("temu_id").innerHTML= "JADWAL PERETEMUAN Ke-" + pos;
				tb.rows[0].cells[1].lastChild.innerHTML = dateTodmY( new Date(DHMDdata[pos-1].jam) )
				tb.rows[2].cells[1].innerHTML = '<a href="'+base_url+'jadwalkuliah/kelas_view?kelas=' + DHMDdata[pos-1].id_kelas + '&ke='+posClick+'" class="btn btn-info btn-block btn-sm">' + nhadir +'</a>'
				tb.rows[3].cells[1].lastChild.innerHTML = DHMDdata[pos-1].ruang
				tb.rows[4].cells[1].lastChild.innerHTML = DHMDdata[pos-1].nama_dosen
				$('#waktu_mulai').val( DHMDdata[pos-1].jam_mulai )
				$('#ruang').val( DHMDdata[pos-1].ruang )
				$('#dosen').val( DHMDdata[pos-1].nama_dosen )
				$("#info_kelas").attr("data-pos", pos)
				$("#info_kelas").attr("data-id_reccord", DHMDdata[pos-1].id)
		})
		
}
  
  

function save_dhmd() 
{
		$("#save_btn").addClass("disabled");
		$.ajax( {
			type: "POST",	
			url: base_url + "jadwalkuliah/save_schedule",
			dataType: "json",
			data: {reccord : btoa(JSON.stringify(DHMDdata))},
			success: function( resp ) {
				MYalert("Update Jadwal Kuliah", "Data sudah berhasil di-simpan");
			  }
			})
}

function delete_dhmd() 
{
	event.preventDefault();		

		MYalert("Hapus Jadwal", "Lanjut Proses ini ?");
		
		$.ajax( {
			type: "POST",	
			url: base_url + "jadwalkuliah/delete_schedule",
			dataType: "json",
			data: {reccord_id : DHMDdata[posClick-1].id },
			success: function( resp ) {
				MYalert("Hapus Schedule Kuliah", "Data sudah berhasil di-hapus");
				ob = $("[data-jadwal="+posClick+"]")[0]
				ob.className = "tgl drop-tgl btn btn-default btn-xs"
			  }
			})
}


function active_dhmd() 
{
	mybutton=[["Lanjut", "doActive_dhmd()", "btn-success"], ["Batal","","btn-info"]]
	MYalert("Add Jadwal", "Lanjut Proses ini ?", mybutton);
}
	
	
function doActive_dhmd()
{ 
	// var callb = (function(){
		
	event.preventDefault();		

		$.ajax( {
			type: "GET",	
			url: base_url + "jadwalkuliah/gadd_to_schedule?id=" + $("#info_kelas").data("id_reccord"),
			dataType: "json",
			success: function( resp ) {
				MYalert("Aktif perkuliahan", "Perkuliah ini sudah aktif sekarang");
			  },
			error: function( resp ) {
				MYalert("Aktif perkuliahan", "Gagal !!");
			  }
		})
		.done(function(){});
	

}

