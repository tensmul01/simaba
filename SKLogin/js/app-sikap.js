function login(o) {
	console.log("check...");
    //btn = $("[type=submit")[0];
    //btn.innerHTML = "Verifikasi...";
    //btn.setAttribute("disabled", "");
    return o = o || window.event, nl = 0, $.ajax({
        type: "GET",
        url: base_url + "Admin/serverload",
        success: function(o) {
            "ok" == o.status ? (nl = o.loadtime, console.log("load : " + nl), 3 < nl ? ($("#konfirmasi").html("<div class='alert alert-danger'>SERVER 1 sedang padat, ... coba lagi</div>"), $("#konfirmasi").show(), setTimeout(function() {
                $("#konfirmasi").fadeOut("slow", function() {
                    window.location.assign("../SKLogin/index.html")
                })
            }, 5e3)) : ContinueLogin()) : console.log("load : ERROR")
        },
        error: function(o, n, l) {
            alert("An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!"), console.log(o), console.log(n)
        }		
    }), !1
}

function ContinueLogin() {
	console.log("send...");
    var o = $("#f_login").serialize();
    $("#konfirmasi").html("<div class='alert alert-info'><i class='icon icon-spinner icon-spin'></i> Checking...</div>"), $("#konfirmasi").fadeIn(), $.ajax({
        type: "POST",
        data: o,
        url: base_url + "Authlogin/act_login",
        success: function(o) {
            0 == o.log.status ? ($("#konfirmasi").html("<div class='alert alert-danger'>" + o.log.keterangan + "</div>"), 
			$("#konfirmasi").show(), 
				setTimeout(function() {
					$("#konfirmasi").fadeOut("slow", function() {
                    window.location.assign("../SKLogin/index.html")
                })
				}, 5e3)) : 
			($("#konfirmasi").html("<div class='alert alert-success'>" + o.log.keterangan + "</div>"), 
			//console.log(o.log.loadtime), 
			window.location.assign(base_url + "admin"))
        },
        error: function(o, n, l) {
            alert("An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!"), console.log("jqXHR:"), console.log(o), console.log("textStatus:"), console.log(n), console.log("errorThrown:"), console.log(errorThr)
        }
    })
} 
