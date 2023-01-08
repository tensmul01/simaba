<?php
echo "SUDAH LOGIN....";
echo "<br>";
print_r($_POST); //['username'];
echo "<br>";
print_r($_GET); //['username'];
echo file_get_contents('php://input');
// header("Location: http://localhost/logsikap", true, 301); 
exit();
?>
