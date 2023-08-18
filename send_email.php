<?php
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $email = $_GET["email"];
    $subject = $_GET["subject"];
    $message = $_GET["message"];

    $to = "keerubarbie@gmail.com"; // Replace with recipient email
    $headers = "From: keerusuja@gmail.com"; // Replace with sender email

    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully";
    } else {
        echo "Email could not be sent";
    }
}
?>
