<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set("Asia/Jakarta"); 
error_reporting(E_ALL); 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Myemail {

	public function __construct() { 
                // parent::__construct(); 
                
                require APPPATH.'libraries/phpmailer/src/Exception.php';
                require APPPATH.'libraries/phpmailer/src/PHPMailer.php';
                require APPPATH.'libraries/phpmailer/src/SMTP.php';
                 
				}

        function index() 
        {

                // Email body content
                $mailContent = "<h1>PMB STIM Budibakti</h1>
                        <p>Testing SMTP Server.</p>"; // isi email

				$this->SendEmail('tens@stimbudibakti.ac.id', $mailContent);

        }
		
		function SendEmail($email, $berita)
		{
					$now = new DateTime(); 
					$dt = $now->format("M j, Y H:i:s O"); 

                        // PHPMailer object
                     $response = false;
                     $mail = new PHPMailer();
                   
            
                    // SMTP configuration
                    $mail->isSMTP();
                    $mail->Host     = 'stimbudibakti.ac.id'; //sesuaikan sesuai nama domain hosting/server yang digunakan
                    $mail->SMTPAuth = true;
                    $mail->Username = 'pmb@stimbudibakti.ac.id'; // user email
                    $mail->Password = 'akademik001'; // password email
                    $mail->SMTPSecure = 'ssl';
                    $mail->Port     = 465;
            
                    $mail->setFrom('pmb@stimbudibakti.ac.id', ''); // user email
                    $mail->addReplyTo('pmb@stimbudibakti.ac.id', ''); //user email
            
                    // Add a recipient
                    $mail->addAddress($email); //email tujuan pengiriman email
            
                    // Email subject
                    $mail->Subject = 'PMB STIM Budibakti'; //subject email
            
                    // Set email format to HTML
                    $mail->isHTML(true);

					$berita .= "<hr>";	
					$berita .= "Send at : ".$dt;	
                    $mail->Body = $berita;
            
                    // Send email
                    if(!$mail->send()){
						return false;
                        //echo 'Message could not be sent.';
                        //echo 'Mailer Error: ' . $mail->ErrorInfo;
                    }else{
						return true;
                        //echo 'Message has been sent at '. $dt;;
                    }			
		}		

}

