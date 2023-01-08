    function refreshProgress() {
      $.ajax({
        url: "checker.php?tmpfile=<?php echo session_id();?>",
        success:function(data){
			  $("#progress").html('<div class="bar" style="width:' + data.percent + '%"></div>');
			  $("#message").html(data.message);
			  // If the process is completed, we should stop the checking process.
			  if (data.percent == 100) {
				window.clearInterval(timer);
				timer = window.setInterval(completed, 1000);
			  }
			},
        error:function(XHRdata, status_error){
          $("#message").html(status_error);
          // show error.. 
          window.clearInterval(timer);
        }
			
      });
	  
    }

    function completed() {
      $("#message").html("Completed");
      window.clearInterval(timer);
    }
