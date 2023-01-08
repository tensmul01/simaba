<?php
	$std_pic = $this->session->userdata('admin_pic');
	$ada_pic = file_exists($std_pic);

	if (!$ada_pic) {
		if ( $this->session->userdata('admin_level')=="siswa") {
			if ( DBLookup("db_mahasiswa","nim = '".$this->session->userdata('admin_user')."'","sex") == "L" ) {
				$std_pic = base_url()."third_party/crop/admin/male.jpg";
			} else {
				$std_pic = base_url()."third_party/crop/admin/female.jpg";
			}	
		}	
		if ( $this->session->userdata('admin_level')=="guru") {
			if ( DBLookup("m_guru","nip = '".$this->session->userdata('admin_user')."'","sex") == "L" ) {
				$std_pic = base_url()."third_party/crop/admin/male.jpg";
			} else {
				$std_pic = base_url()."third_party/crop/admin/female.jpg";
			}
			
		}
	} else {
		$std_pic = base_url().$std_pic;
	}
/*	
	
//	file_put_contents("test.txt", $this->session->userdata('admin_pic'));

	$Link_asli = "//$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	
	if ($this->uri->segment(3) !== "") {
		$std_pic = "../" . $std_pic;
	}
*/	
?>
<!-- <?php echo "$_SERVER[REQUEST_URI]";?> -->
<!DOCTYPE html>
<html lang="id-IN">
   <head>
      <meta charset="utf-8">
	  <title>Dashboard - <?php echo $this->config->item('nama_aplikasi')." ".$this->config->item('versi'); ?></title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <meta name="apple-mobile-web-app-capable" content="yes">
	  
	<!--	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">	 -->
	  <link href="<?php echo base_url(); ?>___/css/bootstrap.min.css" 	rel="stylesheet">
	  <link href="<?php echo base_url(); ?>___/css/my-text.css" 		rel="stylesheet">
      <?php
		switch (true)
		{
			case $this->session->userdata('admin_level')=="admin":
				 echo '<link rel="stylesheet" href="'.base_url().'___/css/style.css"/>' ;
				 break;
			case $this->session->userdata('admin_level')=="guru":
				 echo '<link rel="stylesheet" href="'.base_url().'___/css/style.css"/>' ;
				 break;
			case $this->session->userdata('admin_level')=="siswa":
				 echo '<link rel="stylesheet" href="'.base_url().'___/css/style.css" >';
 				 echo '<link rel="Stylesheet" type="text/css" href="'.base_url().'third_party/crop/'.'my-croppie.css" />'; 
				 echo '<link rel="Stylesheet" type="text/css" href="'.base_url().'third_party/crop/'.'prism.css" />';
				 
				 break;
			default:	 
				 echo base_url()."___/css/style.css";
				 break;
		}?>
		
		
	<link href="<?php echo base_url(); ?>___/plugin/fa/css/font-awesome.min.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>___/plugin/datatables/dataTables.bootstrap.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>___/css/jquery-ui.css" rel="stylesheet" >
	<link href="<?php echo base_url(); ?>___/css/balloon.css" rel="stylesheet" >
	<link href="<?php echo base_url(); ?>___/css/style_input.css" rel="stylesheet" >
	<link href="<?php echo base_url(); ?>___/css/bootstrap-clockpicker.css" rel="stylesheet" type="text/css" >
<!-- 	<link href="<?php echo base_url(); ?>___/css/jquery.modal.min.css" rel="stylesheet" /> -->

<!-- CSS to style the file input field as button and adjust the Bootstrap progress bars -->
	<link rel="stylesheet" href="<?php echo base_url(); ?>___/css/jquery.fileupload.css">

<!-- Font Link 
	<link href='https://fonts.googleapis.com/css?family=Homenaje' rel='stylesheet'>
	<link href='https://fonts.googleapis.com/css?family=Share' rel='stylesheet'>
-->
	  
<style>
.ui-front {
	z-index: 1051;
}
.imgpreview {
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: white;
  vertical-align  :top;
}
.mth {
  background-color:rgb(60,60,60); 
  color:white;
}

</style>

	  
   </head>

   <body>
   <div id="dialog-confirm" title="">
	  <p id="dialog-text"><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span></p>
   </div>

    <div class="container">
		<nav class="navbar navbar-findcond navbar-fixed-top" style="margin-bottom:0px;">
            <div class="navbar-header">
               <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
               <span class="sr-only">Toggle navigation</span>
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
               </button>
               <img src = "<?php echo base_url(); ?>upload/logo-bagasasi.png" width="50" height="50" class="navbar">
			   <a class="navbar-brand"><?php echo $this->config->item('nama_aplikasi')." ".$this->config->item('versi'); ?></a>
            </div>

<?php
//$img = file_get_contents($std_pic);
// Encode the image string data into base64 
//$data = base64_encode($img); 
// Display the output 
//$std_pic = "data:image/png;base64,".$data;
?>
			
            <div class="collapse navbar-collapse" id="navbar">
					<div class="nav navbar-nav navbar-right" style="width:50px;height:50px;display:inline">
						<img src="<?php echo $std_pic;?>" style="width: 50px; height: 50px; overflow: hidden;border-radius:50%;">
					</div>
               <ul class="nav navbar-nav navbar-right">
			   
			   
                  <li class="dropdown">
			   
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
					 <?php echo $this->session->userdata('admin_nama')." (".$this->session->userdata('admin_user').")"; ?> <span class="caret"></span></a>
                     <ul class="dropdown-menu" role="menu">
                        <li><a href="#" onclick="return rubah_password();">Ubah Password</a></li>
						<?php if ($this->session->userdata('admin_level')=="admin") {
							?>
							<li><a href="#" onclick="return Admin_thsmt();">Setting Tahun</a></li>

							<li><a href="#" onclick="return change_server(<?php echo(base_url()=="https://sikap.ikipsiliwangi.ac.id/"?2:1);?>);">Change Server to <?php echo(base_url()=="https://sikap.ikipsiliwangi.ac.id/"?2:1);?></a></li>

							<?php
						}?>
                        <li><a href="<?php echo base_url(); ?>adm/user_change_foto/edit" >Ganti Foto</a></li>
                        <li><a href="<?php echo base_url(); ?>adm/logout" onclick="">Logout</a></li>
                     </ul>
                  </li>
               </ul>
            </div>
		</nav>


		<!-- <?php echo $p;?> for cek on tabel.php -->
		<!-- START GET MENU -->
		<?php gen_menu(); ?>
		<!-- END MENU -->
		
		<?php 
//			echo $this->load->view("chart01");
			$this->load->view($page);
		?>
   
    </div>


   <div class="col-md-12 footer">
     <a href="<?php echo base_url(); ?>adm">
	 <?php echo $this->config->item('nama_aplikasi')." ".$this->config->item('versi')."</a><br> Waktu Server: ".tjs(date('Y-m-d H:i:s'),"s")
	 ." - Waktu Database: ".tjs($this->waktu_sql,"s")?>. 
   </div>

<!-- insert modal -->
<div id="tampilkan_modal" ></div>


<?php

	if ( ($this->uri->segment(2) == "m_soal" && $this->uri->segment(3) == "edit") or ($this->uri->segment(2) == "md_soal" && $this->uri->segment(3) == "edit") ) {
		?>
		<script src="<?php echo base_url(); ?>___/plugin/ckeditor/ckeditor.js"></script>
		<?php
	}
?>

<script src="<?php echo base_url(); ?>___/js/jquery.js"></script> 
<script src="<?php echo base_url(); ?>___/js/jquery-ui.js"></script> 
<script src="<?php echo base_url(); ?>___/js/jquery.balloon.js"></script> 
<script src="<?php echo base_url(); ?>___/js/bootstrap.js"></script>
<script src="<?php echo base_url(); ?>___/js/final.countdown.jquery.js"></script>

<!-- <script src="<?php echo base_url(); ?>___/js/jquery.modal.min.js"></script> -->



<?php
if ($this->session->userdata('admin_level')=="siswa")
	{
		?>
		<script src="<?php echo base_url(); ?>___/plugin/datatables/jquery.dataTables.js"></script>
		<?php
	} else {
		?>
		<script src="<?php echo base_url(); ?>___/plugin/datatables/jquery.dataTables.js"></script>
		<script src="<?php echo base_url(); ?>___/plugin/datatables/dataTables.bootstrap.min.js"></script>
		<script src="<?php echo base_url(); ?>___/js/admin01.js"></script> 
		<?php
		
	}	
?>

<script type="text/javascript">
	var base_url = "<?php echo base_url(); ?>";
	var editor_style = "<?php echo $this->config->item('editor_style'); ?>";
	var uri_js = "<?php echo $this->config->item('uri_js'); ?>";
	var tahun_akademik = "<?php echo $GLOBALS['th_akademik'];?>"	
	var uri0 = "<?php echo $this->uri->segment(0); ?>";
	var uri1 = "<?php echo $this->uri->segment(1); ?>";
	var uri2 = "<?php echo $this->uri->segment(2); ?>";
	var uri3 = "<?php echo $this->uri->segment(3); ?>";
	var uri4 = "<?php echo $this->uri->segment(4); ?>";
	var web_socket;
	
	$('a[data-modal]').click(function(event) {
	  $(this).modal();
	  return false;
	});
 	
</script>

<?php
	if ($this->session->userdata('admin_level')=="admin")
		{
			
			
			
		if ( $this->uri->segment(1)=="jadwaluas"  || $this->uri->segment(1)=="jadwalOffline"  || $this->uri->segment(1)=="peserta" ) {
				?>
				<script src="<?php echo base_url(); ?>___/js/admin_uas.js"></script>
				<script src="<?php echo base_url(); ?>___/js/final.countdown.jquery.js"></script>

				<script type="text/javascript">
						ForAdminOnly();
				</script>
				<?php
			} else if ($this->uri->segment(1)=="jadwalkuliah") {
				?>
				<script src="<?php echo base_url(); ?>___/js/admin_jdkul.js"></script>
				<?php
			}		
		}
	if ($this->session->userdata('admin_level')=="guru")
		{
			echo '<script src="'.base_url().'___/js/admin_nilai.js"></script>';
		}	
		
	if ( $this->uri->segment(1)=="mahasiswa" || $this->uri->segment(2)=="biodata_mhs" || $this->uri->segment(2)=="m_guru" ) {
			?>
			<script src="<?php echo base_url(); ?>upload/js/vendor/jquery.ui.widget.js"></script>
			<!-- The Load Image plugin is included for the preview images and image resizing functionality -->
			<script src="<?php echo base_url(); ?>upload/js/load-image.all.min.js"></script> 
			<!-- The Canvas to Blob plugin is included for image resizing functionality -->
			<script src="<?php echo base_url(); ?>upload/js/canvas-to-blob.min.js"></script>
			<!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
			<script src="<?php echo base_url(); ?>upload/js/jquery.iframe-transport.js"></script>
			<!-- The basic File Upload plugin -->
			<script src="<?php echo base_url(); ?>upload/js/jquery.fileupload.js"></script>
			<!-- The File Upload processing plugin -->
			<script src="<?php echo base_url(); ?>upload/js/jquery.fileupload-process.js"></script>
			<!-- The File Upload image preview & resize plugin -->
			<script src="<?php echo base_url(); ?>upload/js/jquery.fileupload-image.js"></script>
			<!-- The File Upload audio preview plugin -->
			<script src="<?php echo base_url(); ?>upload/js/jquery.fileupload-audio.js"></script>
			<!-- The File Upload video preview plugin -->
			<script src="<?php echo base_url(); ?>upload/js/jquery.fileupload-video.js"></script>
			<!-- The File Upload validation plugin -->
			<script src="<?php echo base_url(); ?>upload/js/jquery.fileupload-validate.js"></script> 
			<script src="<?php echo base_url(); ?>___/js/uploadfoto.js?"+(new Date).getTime()></script>

			<script type="text/javascript">
					uploadfoto_e()
			</script>
			<?php		
		}
?>


<!-- Load script untuk level user -->
<script type="text/javascript" src="<?php echo base_url(); ?>___/js/bootstrap-clockpicker.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>___/js/jquery-clockpicker.js"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>

<script src="https://kit.fontawesome.com/a076d05399.js"></script> 

<script src="<?php echo base_url(); ?>___/js/aplikasi.js"></script> 
<script src="<?php echo base_url(); ?>___/js/aplikasi-02.js"></script>

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-144184770-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-144184770-1');
</script> 

</body>
</html>
