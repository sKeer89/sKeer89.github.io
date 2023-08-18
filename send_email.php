<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    $to = "keerubarbie@gmail.com"; // Replace with recipient email
    $headers = "From: keerusuja@gmail.com"; // Replace with sender email

    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully";
    } else {
        echo "Email could not be sent";
    }
}
?>
