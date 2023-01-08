var base_url= window.origin + "/bagasasi/"
var _move_x = 15;
var DATA_BASE = [];
var onhover = null;
var name_color =[];

	$(document).ready(function()	{
		$( "#xxdialog_jadwal" ).dialog({
		  autoOpen: false,
		  width:900,
		  height:450,
		  show: {
			effect: "fade",
			duration: 600
		  },
		  hide: {
			effect: "fade",
			duration: 1000
		  }
		});
	
	dialog = $( "#dialog_jadwal" ).dialog({
      autoOpen: false,
      height: 500,
      width: 900,
      modal: true,
	  show: {
		effect: "fade",
		duration: 600
	  },
	  hide: {
		effect: "fade",
		duration: 1000
	  },
      buttons: {
        "Simpan Jadwal": DSGsave_Jadwal,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
      }
    });
	
	
		create_div_map();
		
		show_bar();

	});

	function Get_JadwalKuliah() {

	var vpost = JSON.stringify( { 
					cari:  $("#filter_data").val(),
					ruang: $("#filter_ruang").val(),
					prodi: $("#filter_prodi").val(),
					kelas: $("#filter_kelas").val()
				});

//		console.log(vpost);
		
		$.ajax({		
			type: "POST",
			url: base_url + "jadwalkuliah/get_ui_data",
			data: vpost,
			contentType: 'application/json; charset=utf-8',
		}).done(function(resp) {
			
			if (resp.status == "1") {
				DATA_BASE = resp.data;
				draw_bar();
				
			} else {
				alert("error");
			}
		});
		
	}
	
	function draw_bar(db) 
	{
		
		const div_map = document.getElementById("div-kuliah");
			div_map.innerHTML=""
			html=""
			db = DATA_BASE;
			name_color = {};
			eclr = 0;
		
		for (var i = 0; i<db.length; i++) {
			
			html += '<div '
			html +=	'	class="bar-kuliah" data-pos="'+i+'" >'
			html += '</div>'

			if ( ! name_color[ 'C'+db[i].id_mk ] )
				{
					name_color[ 'C'+db[i].id_mk ] = eclr
					eclr ++
				}
			//console.log(i);
			//name_color[ 'C'+db[i].id_mk ] = ObjectLength(name_color);

		}

		div_map.innerHTML = html;
		document.getElementById("jumlah_mk").innerHTML="Jumlah : " + ObjectLength(name_color) + " mk."

		$(".bar-kuliah").droppable({
		  accept: "#icdosen, #icruang",
		  classes: {
			"ui-droppable-active": "ui-state-highlight"
		  },
		  drop: function( event, ui ) {

			//console.log(ui.draggable[0].id)
			ebar = ui.draggable[0]
			
			if (ui.draggable[0].id == "icdosen") {
				
				var tooltip = $('.ui-tooltip')

					add_Classbar(this, 1)
					$(tooltip).hide("clip", 200);

			} else {
				
				add_Classbar(this, 2);
			}
			
			
		  }
		});
 
 
		drag_to_map( document.getElementById("icdosen") );
		drag_to_map( document.getElementById("icruang") );
		
		show_bar()
	}
	
	function add_Classbar(ob, mode=0, oTP) {

		if ( mode== 1) {
			DATA_BASE[ob.dataset.pos]['nidn'] =  $("#inp_dosen").data("nidn");
			DATA_BASE[ob.dataset.pos]['nama_dosen'] =  $("#inp_dosen").val();
			}

		if ( mode== 2)
			DATA_BASE[ob.dataset.pos]['ruang_kuliah'] =  $("#inp_ruang").val();
		
		//ob.classList.add("bar-dosen")
		show_ket(ob);
		
		//$(oTP).fadeOut()
		//ob.classList.add("bar-animated")
		
	}
	
	function show_bar() {

		const div_map = document.getElementById("div-kuliah");
		var tb  = document.getElementById('layout-kuliah')
		var cel = tb.rows[0].cells.item(0);
	
		var element = document.getElementsByClassName('bar-kuliah')
		var warna = ["green", "blue", "red", "yellow", "brown", "Pink", "Lime", "Gold", "Cyan"]
		var onJadwal = null;

		//console.log( size_per_jam ); 
		
		for (var i = 0; element[i]; i++) {
			e = element[i];

			onJadwal = element[i];
			
			rec = DATA_BASE[e.dataset.pos];
			_hr =( rec['hari']== null ? 7 : rec['hari'])
			_wkt=( rec['jam_kuliah'] == null ? "07:00" : rec['jam_kuliah'])
			
			wt  = (_wkt.substr(0,2) - 7) * size_per_jam + (_wkt.substr(-2)/60) * size_per_jam
			wd  = rec['sks'] * size_per_jam * 50/60;
			
			clr =  warna[ name_color["C"+rec['id_mk']] % warna.length ];
			
			tp  = ( (rec['hari']-1) *  cel.offsetHeight )+9;
			
			$(e).css( { 'top' : tp, 'left' : wt,  'width' : wd, 'height' : 31, 'background-color' : clr } );
			
			tp = tp+10;
			//console.log(e);

			e.setAttribute("data-toggle", "tooltip")
			e.setAttribute("data-html","true")

			show_ket(onJadwal);
			
			$(onJadwal).draggable({ 
					//axis: "x",
					containment: "#div-kuliah", 
					scroll: false,
					grid: [_move_x, cel.offsetHeight],
					stop: function() {
						
						show_ket( this )

					},
	  
				});
				
				/* init tooltips after create */
				/*'[data-toggle="tooltip"]' */
				
				$(onJadwal).tooltip({
					track: true,
					content: function() {
							var element = $( this );
							if ( element.is( "[title]" ) ) {
								return element.attr( "title" );
							}
					},
					open: function( event, ui ) { 

						onhover = this;

						$(window).on('keydown', function (evn) {
							//var element = $( this );
							
							var code = evn.which ||evn.keyCode;
								switch ( code )
								{
								case 39 :
									onhover.style.left= (onhover.offsetLeft + 5);
									//onhover.focus()
									show_ket(onhover);
									break;
								case 37 :
									onhover.style.left= (onhover.offsetLeft - 5);
									//onhover.focus()
									show_ket(onhover);
									break;
								}	
						});

					//console.log("show:")
					},
					close: function( event, ui ) { 
						  $(window).off('keydown')
					},
				});   
		
				
				
		}
	}	
		
	function remove_bar(ob) {
		p=ob.parentElement
		$(ob).remove();
		p.remove()
	}

	function show_ket(ob, oTP) 
	{
			//console.log( ob.dataset.pos );
		
						rec = DATA_BASE[ob.dataset.pos]
						p = Math.floor(ob.offsetLeft);
						j = Math.floor(p/60);
						m = p - (j*60)
						wkt = ("0" + (7 + j)).slice(-2) + ":" + ("0" + m).slice(-2); 
						//DATA_BASE[e.dataset.pos]['jam_kuliah'] = wkt

						ket  ='<b><u>'+rec['mata_kuliah']+'</u></b><br>'
						ket +='<span style="width:100px;"><b>Dosen</b> </span>: '+n2b(rec['nama_dosen'])+'<br>'
						ket +='<span style="width:100px;">Ruang </span>: ' + n2b(rec['ruang_kuliah'])+ '<br>'
						ket +='<span style="width:100px;">Kelas </span>: ' + n2b(rec['kelas'])+ '<br>'

						wp = Math.floor(ob.offsetLeft + ob.offsetWidth);
						wj = Math.floor(wp/60);
						wm = wp - (wj*60)
						
						ket +='<br>Jam : ' + wkt
						ket += " s.d jam " + ("0" + (7 + wj)).slice(-2) + ":" + ("0" + wm).slice(-2); 

						if ( rec['ruang_kuliah'] !== null ) ob.classList.add("bar-ruang");

						if (rec['nama_dosen'] !== null ) ob.classList.add("bar-dosen");
						
						ob.setAttribute("title", ket )
						
	}

	function create_table() {
		var tb = document.getElementById('layout-kuliah')
		tb.rows[0].cells.item(0).innerHTML='<div class="check-ok" style="width:40px; height:40px;--my-bw: 4px;"></div>'			
		//tb.rows[1].cells.item(0).innerHTML="Selamat datang Sahabat !";
		
		html = '';
		html +='<div style="" class="bar-kuliah" data-mk="1" data-sks="2" data-waktu="07:30" data-hari="1" data-kelas="1" data-toggle="tooltip" title="Hooray!"></div>'
		html +='<div style="" class="bar-kuliah" data-mk="1" data-sks="4" data-waktu="09:30" data-hari="1" data-kelas="1"></div>'
		html +='<div style="" class="bar-kuliah" data-mk="1" data-sks="2" data-waktu="10:30" data-hari="1" data-kelas="1"></div>'
		
		
		
		tb.rows[2].cells.item(0).innerHTML="<div style='display:flex; position:relative; height:50px;'>" + html + "</div>";

		$('[data-toggle="tooltip"]').tooltip();   
		
	}
	
	function create_div_map() {
		var tb  = document.getElementById('layout-kuliah')
		var cel = tb.rows[0].cells.item(0);
		
		const div0 = document.createElement("div");
				div0.id ="schedule_map";
				dstyle=div0.style;

				with (dstyle)
				{
					width = tb.offsetWidth + "px"
					height = tb.offsetHeight +"px";
					border="1px solid black";
					position = "absolute";
					top = tb.offsetTop +"px";
					left = tb.offsetLeft +"px";
					border="1px solid black";
				}
				
				document.body.appendChild(div0);		

		var cel2 = tb.rows[1].cells.item(3);

		const div_row = document.createElement("div");
				dstyle=div_row.style;
				div_row.id="row_mapp";
				
				div_row.classList.add("mapp");				

				with (dstyle)
				{
					width  	= (tb.offsetWidth-2) +"px";
					height 	= (cel2.offsetHeight-2) +"px";
					top 	= "1px";
					left 	= "1px";
					overflow = "hidden";
					background= "linear-gradient(90deg, white, gray)"
				}
				
				div0.appendChild(div_row);		

		const div_col = document.createElement("div");
				dstyle=div_col.style;
				div_col.id="col_mapp";
				div_col.classList.add("mapp");				

				with (dstyle)
				{
					width = ((cel.offsetWidth*3)-18) + "px"
					height = (tb.offsetHeight-10) +"px";
					top = "1px";
					left = "1px";
				}
				
				div0.appendChild(div_col);		

		const div_hari = document.createElement("div");
				dstyle=div_hari.style;
				div_hari.id="hari_senin";
				div_hari.classList.add("mapp_hari");				

				with (dstyle)
				{
					width = ((cel.offsetWidth*3)-18) + "px"
					height = (cel.offsetHeight - 2) +"px";
//					top = cel.offsetHeight +"px";
					left = "1px";
					position = "absolute";
					padding = "10px";
					display = "grid"
				}
			ahari=["Hari/jam", "Senin","Selasa", "Rabu", "kamis", "Jum'at", "Sabtu", "Minggu"]

			for(h=0; h <= 7; h++) 
			{
				const clone = div_hari.cloneNode(true);
					  clone.style.top = ( (cel.offsetHeight-1) * (h) );
					  switch (h) {
					  case 0:
						clone.innerHTML="<span class='map_hari btn btn-default'>"+ahari[h]+"</span>";
						break;
					  case 7:
						clone.innerHTML="<span class='map_hari btn btn-danger'>"+ahari[h]+"</span>";
						break;
					  default:	
						clone.innerHTML="<span class='map_hari btn btn-success '>"+ahari[h]+"</span>";
					  }
					  div_col.appendChild(clone);
			}

			var rw = tb.rows[0]
			stp=0
			//oPar = document.getElementsByClassName("bbody")[0]
			
			for (nc=3; nc<21; nc += 3)
			{
				//document.getElementById('layout-kuliah').rows[0].cells.item(3)			
				var cel = rw.cells.item(nc);
				
					dv  = document.createElement("div");
					
					dv.style.position="absolute"
					dv.style.top	 = cel.offsetTop
					dv.style.left	 = cel.offsetLeft
					dv.style.width		 = (cel.offsetWidth*3)-2
					dv.style.fontSize	 = "24px"
					//dv.classList.add("btn","btn-default")
					
					dv.innerHTML	 ="<span> " + (4+nc)  + "<sup>:00</sup>" + "<span>";
					div_row.appendChild(dv);
					//cel.innerHTML = "<div class='btn btn-default' style='font-size:24px; width:200px;' ></div>"
			}
			
			
		const div_map = document.getElementById("div-kuliah");
				//div_map.id ="schedule";
				dstyle=div_map.style;

				with (dstyle)
				{
//					border="1px solid green";
					position = "absolute";
					top  = tb.offsetTop   + cel2.offsetTop
					left = tb.offsetLeft  + cel2.offsetLeft
					
//					backgroundColor = "red;"

					width  = (tb.offsetWidth-1  ) - (cel.offsetWidth*3)
					height = (tb.offsetHeight-1 ) - cel.offsetHeight
					
					
				}
				
				$(".xxschrows").droppable({
				  accept: ".bar-mk",
				  classes: {
					"ui-droppable-active": "ui-state-active",
					"ui-droppable-hover": "ui-state-hover"
				  },
				  drop: function( event, ui ) {

				  }
				});

	
				
	}
	
	function savecolor(ob) {
		var data={id:ob.dataset.reccord, warna: ob.value};
		
		$.ajax({
			   url : base_url + 'jadwalkuliah/savecolor',
			   type: 'POST',
			   dataType: "json",
			   data: JSON.stringify(data),
			   contentType: 'application/json; charset=utf-8',
			   success : function( resp ) {
			   if (resp.status="ok")
					{
						console.log("sukses............");	
					}
			   }
		})
	}


	function filter_mk(ob) {

		if ( ob.innerHTML !=="Show All") {
			$("table [type='checkbox']").closest("tr").css("display","none")
			$("table [type='checkbox']:checked").closest("tr").css("display","")
			ob.innerHTML="Show All";
		} else {
			$("table [type='checkbox']").closest("tr").css("display","")
			ob.innerHTML="Filter";
		}
	
	}


function drag_to_map(ob) {
		$(ob).draggable({ 	revert: "invalid",       
							helper: "clone",
							cursor: "move" ,
							containment: "document",
							scroll: true,
							start : function( event, ui ) {

									this.style.visibility = "hidden"
									//OOld = this; ONew = null
									},
							stop  : function( event, ui ) {

									this.style.visibility = ""
									//alert("stop...");
									}
						});
}

function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};

function Salin_JadwalKuliah() {
	
	var base_copy=[]

	if ( $("#filter_prodi").val()=="") {
		alert("Prodi belum ditentukan....");	
		return false
	}

	for(let p in DATA_BASE)
	{
		base_copy.push( { reccord : DATA_BASE[p].id_jadwal } ) ;	
	}

	var data = { prodi: $("#filter_prodi").val(), copyfrom : $("#copy_kelas").val(), toKelas:$("#target_kelas").val() };

		$.ajax({
			   url : base_url + 'jadwalkuliah/copy_jadwal',
			   type: 'post',
			   dataType: "json",
			   data: JSON.stringify(data),
			   contentType: 'application/json; charset=utf-8',
			   success : function( resp ) {
			   if (resp.status="ok")
					{
						$("#filter_data").val(""); $("#filter_ruang").val(""); $("#filter_kelas").val( data.toKelas) ; 
						alert("jadwal sudah disalin, silahkan cek kembali hasilnya...");
						Get_JadwalKuliah();
					}
			   }
		})
};

function preview_Jadwal() {
	display_jadwalKuliah(DATA_BASE);
	$("#dialog_jadwal").dialog("open")

}

function DSGsave_Jadwal() {
var base_save=[]
	

	for(let pos in DATA_BASE)
	{

		let ob = document.querySelector("[data-pos='" + pos + "']")
			pl = Math.floor(ob.offsetLeft);
			j  = Math.floor(pl/60);
			m = pl - (j*60)
			wkt = ("0" + (7 + j)).slice(-2) + ":" + ("0" + m).slice(-2); 

		base_save.push( { 
				reccord : DATA_BASE[pos].id_jadwal, 
				jam		: wkt, 
				hari	: (ob.offsetTop+50-9)/50,
				ruang	: DATA_BASE[pos].ruang_kuliah,
				nidn	: DATA_BASE[pos].nidn
					})
	}				

	var data = { data:base_save }

		$.ajax({
			   url : base_url + 'jadwalkuliah/save_ui_jadwal',
			   type: 'post',
			   dataType: "json",
			   data: JSON.stringify(data),
			   contentType: 'application/json; charset=utf-8',
			   success : function( resp ) {
			   if (resp.status="ok")
					{
						alert( resp.upd + " jadwal sudah disimpan...");
						$("#dialog_jadwal").dialog("close");
					}
			   }
		})
};

function n2b( vartest ){
	if (vartest==null) return ""
	return vartest
}


function display_jadwalKuliah( data )
{
var tabel = document.getElementById("detail_jadwal")
var html  = ""
let h = -1
var ah			= ["<span style='color:red;'>Minggu</span>", "Senin", "selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]

	for (let n = 0; n < data.length; n++) {

		let ob = document.querySelector("[data-pos='" + n + "']")
			pl = Math.floor(ob.offsetLeft);
			j  = Math.floor(pl/60);
			m = pl - (j*60)
		let wkt = ("0" + (7 + j)).slice(-2) + ":" + ("0" + m).slice(-2); 

			data[n].hari 		= (ob.offsetTop+50-9)/50
			data[n].jam_kuliah 	= wkt
			data[n].key			= data[n].hari + ":" + wkt
	}		
	

	data.sort((a, b) => {

				let fa = a.hari + ":" + a.jam_kuliah
				let fb = b.hari + ":" + b.jam_kuliah
				
				return ( fa > fb );
	
			})	

	//console.log(data)
	
	for (let n = 0; n < data.length; n++) {

		if ( h != data[n].hari) {
			html += '<tr style="border-bottom:4px solid green;">\
					<th scope="row">'+ah[ data[n].hari]+'</th>\
					</tr>'
			h =	data[n].hari	
			} 
			
			html += '<tr>\
						<th>'+n2b(data[n].jam_kuliah)+'</th>\
						<td>'+data[n].kode_matakuliah+'</td>\
						<td>'+data[n].mata_kuliah +'</td>\
						<td>'+data[n].sks+'</td>\
						<td>'+n2b(data[n].nama_dosen)+'</td>\
						<td>'+n2b(data[n].ruang_kuliah)+'</td>\
					</tr>'
	}					

	tabel.innerHTML=html;
   
};

function findDosen(ob, ev) {
	var x = ev.key;
		if ( ob.value == "" ) {
			document.getElementById("icdosen").className="icons-disabled";
			return false;
		}

	
	if (x == "Enter") {
		var vpost = JSON.stringify( { 
						search:  ob.value
					});
			
			$.ajax({		
				type: "POST",
				url: base_url + "jadwalkuliah/find_dosen",
				data: vpost,
				contentType: 'application/json; charset=utf-8',
			}).done(function(resp) {
				
				if (resp.dosen[0] == "") {
					document.getElementById("icdosen").className="icons-disabled";
					
				} else {

					document.getElementById("icdosen").className="icons-drag";
					ob.value = resp.dosen[1];
					ob.setAttribute("data-nidn", resp.dosen[0])
				}
			});
	};
}
