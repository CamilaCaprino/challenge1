<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	use PHPMailer\PHPMailer\SMTP;
	

	require 'PHPMailer/Exception.php';
	require 'PHPMailer/PHPMailer.php';
	require 'PHPMailer/SMTP.php';


	$mail = new PHPMailer(true);

try {

    //Recuperar los datos del formulario
    $f_type = $_POST['tipo'];
    $f_name = $_POST['nombre'];
    $f_email = $_POST['email'];
    $f_message = $_POST['mensaje'];
    $f_telefono = $_POST['telefono'];

    if(!isset($f_name) || $f_name === '') {
        $data->error = 'No has ingresado un nombre, por favor ingresa nuevamente';
        buildBadRequest($data);
    }

    if(!isset($f_type) || $f_type == 0 )
    {
        $data->error = "Debe seleccionar una opción en el campo 'Tipo de Contacto'";
        buildBadRequest($data);
    }

    if(!isset($f_telefono) || $f_telefono == '' )
    {
        $data->error = 'No has ingresado un teléfono, Por favor ingrese nuevamente';
        buildBadRequest($data);
    }

    if(!isset($f_email) || $f_email == '' )
    {
        $data->error = 'No has ingresado un email, Por favor ingresalo';
        buildBadRequest($data);
    }

    if(!validarEmail($f_email)) {
        $data->error = 'La dirección de email es incorrecta! Por favor intente nuevamente';
        buildBadRequest($data);
    }

    if(!isset($f_message) || $f_message == '' )
    {
        $data->error = 'No has ingresado un mensaje, por favor ingrese su consulta. Gracias!';
        buildBadRequest($data);
    }


    //Server settings
    $mail->SMTPDebug = 0;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.office365.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'libconstructpracticas3@hotmail.com';                     //SMTP username
    $mail->Password   = 'pr@cti@s2023';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587; //587;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom($mail->Username, 'No Responder');
    $mail->addAddress($f_email);
    //$mail->addAddress('libconstructpracticas3@gmail.com');               //Name is optional
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    $mail->addBCC('nicocolman1@gmail.com');
    $mail->addBCC('libconstructpracticas3@gmail.com');

    //Permitir que se envíen archivos adjuntos

    //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Contacto desde Web';
    $mail->Body    = 'De: '.$f_email."<br>".
                     'Nombre: '.$f_name."<br>".
                     'Tipo: ' .$f_type."<br>".
                     'Teléfono: ' .$f_telefono."<br>".
                     'Mensaje: '.$f_message;


    //FIXME: Valdiar antes de enviar
    $mail->send();

    $data->message = "Hemos recibido su email y nos pondremos en contacto a la brevedad";
    http_response_code(200);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;

} catch (Exception $e) {
    $data->error = "Error, el mensaje no se envió: {$mail->ErrorInfo}";

    http_response_code(500);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function validarEmail($email) {
    $regex = "/^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/";
    return preg_match($regex, $email) ? true : false;
}

function buildBadRequest($data){
    http_response_code(400);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

?>
