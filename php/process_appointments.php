<?php
/**
    Theme Name: Basma Resume
    Description: Basma Resume / CV Template
    Version: 3.0
    Author: themearabia
    Website: http://themearabia.net 
    Process Contact Form
    Handles AJAX request from appointments form
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';


$mail_to = "themearabia@gmail.com";

if(isset($_POST['apm_name']))
{
    
	$errors     = false;
    $subject    = safe_input($_POST['apm_subject']);
    $username   = safe_input($_POST['apm_name']);
    $email      = safe_input($_POST['apm_email']);
    $phone      = safe_input($_POST['apm_phone']);
    $date       = safe_input($_POST['apm_date']);
    $time       = safe_input($_POST['apm_time']);
    $message    = safe_input($_POST['apm_message']);
    
    
    if (empty($username)) {
        $errors     = true;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) or empty($email)) {
        $errors      = true;
    }

    if (empty($message)) {
        $errors         = true;
    }

    if(!$errors) {
        $data = [
            'subject'   => $subject,
            'username'  => $username,
            'email'     => $email,
            'phone'     => $phone,
            'date'      => $date,
            'time'      => $time,
            'message'   => $message,
        ];

        $send = send_phpmailer($mail_to, $data);
        
        if($send) {
            echo json_encode(['status' => 'success']);
        }
        else {
            echo json_encode(['status' => 'error']);
        }
    }
    else {
        $message_error = 'All fields are required and correctly.';
        echo json_encode(['status' => 'error', 'message' => $message_error]);
    }       
}

/* send phpmailer */
function send_phpmailer($to, $data)
{
    /**
        message template
        var:
            {$title} = title
            {$subject} = subject
            {$datetime} = datetime
            {$date} = date
            {$username} = username
            {$email} = email
            {$phone} = phone
            {$date} = date
            {$time} = time
            {$message} = message
    */
    $message_template = '
    <div style="direction: ltr;width:100%;max-width:680px;font-family:sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;margin:30px auto;">
        <div style="background-color:#044767;padding:30px;text-align:center;">
            <h1 style="color:#fff;">{$title}</h1>
            <span style="color:#fff;">{$datetime}</span>
        </div>
        <div style="background-color:#EEEEEE;padding:30px;">
            <div><strong>Subject<strong> : {$subject}</div>
            <div><strong>Name<strong> : {$username}</div>
            <div><strong>Email<strong> : {$email}</div>
            <div><strong>Phone<strong> : {$phone}</div>
            <div><strong>Date<strong> : {$date}</div>
            <div><strong>Time<strong> : {$time}</div>
            <br />
            {$message}
        </div>
    </div>
    ';

    /* assign message template */
    $assign['{$datetime}']  = date('d/m/Y - h:s a');
    $assign['{$title}']     = $data['subject'];
    $assign['{$username}']  = $data['username'];
    $assign['{$email}']     = $data['email'];
    $assign['{$phone}']     = $data['phone'];
    $assign['{$date}']      = $data['date'];
    $assign['{$time}']      = $data['time'];
    $assign['{$message}']   = preg_replace("/[\n]/", "<br />", $data['message']);
    $message                = str_replace(array_keys($assign), array_values($assign), $message_template);
    
    /* start PHPMailer */
    $phpmailer = new PHPMailer(true);
	$phpmailer->ClearAllRecipients();
	$phpmailer->ClearAttachments();
	$phpmailer->ClearCustomHeaders();
	$phpmailer->ClearReplyTos();
	if ( !isset( $from_email ) ) {
		$sitename = strtolower( $_SERVER['SERVER_NAME'] );
		if ( substr( $sitename, 0, 4 ) == 'www.' ) {
			$sitename = substr( $sitename, 4 );
		}
		$from_email = 'info@' . $sitename;
	}
	$phpmailer->From = $from_email;
	$phpmailer->FromName = $data['username'];
	if( preg_match( '/(.*)<(.+)>/', $to, $matches ) ) {
		if ( count( $matches ) == 3 ) {
			$recipient_name = $matches[1];
			$to = $matches[2];
		}
	}
	$phpmailer->AddAddress( $to, $recipient_name);
    $phpmailer->IsHTML( true );
	$phpmailer->Subject        = $data['subject']. ' ('.date('d/m/Y h:i a').')';
	$phpmailer->Body           = $message;
	$phpmailer->IsMail();
	$phpmailer->ContentType    = 'text/html';
	$phpmailer->CharSet        = 'utf-8';
    /* return PHPMailer */
	try {
		return $phpmailer->Send();
	} catch ( phpmailerException $e ) {
		return false;
	}
}

// safe input
function safe_input($str)
{
    $str        = strip_tags($str);
    $str        = addslashes($str);
    $search     = array("'",'"',"<",">",";","/",'\\');
    $replace    = array("","","","","","","");
    $str        = str_replace($search, $replace, $str);
    $str        = trim($str);
    
    return $str;
}