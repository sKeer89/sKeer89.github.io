<!DOCTYPE html>
<html>
<head>
    <title>Email Form</title>
    <style>
        /* Your CSS styles here */
    </style>
</head>
<body>
    <h1>Send an Email</h1>
    <form id="emailForm" method="post">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br>
        <label for="subject">Subject:</label>
        <input type="text" id="subject" name="subject" required><br>
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" rows="4" required></textarea><br>
        <input type="submit" value="Send Email">
    </form>

    <script>
        document.getElementById("emailForm").addEventListener("submit", function(event) {
            event.preventDefault();

            var email = document.getElementById("email").value;
            var subject = document.getElementById("subject").value;
            var message = document.getElementById("message").value;

            var data = {
                email: email,
                subject: subject,
                message: message
            };

            fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                alert("Email sent successfully!");
            })
            .catch(error => {
                console.error(error);
                alert("An error occurred while sending the email." + error);
            });
        });
    </script>
</body>
</html>

<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    $to = "keerubarbie@gmail.com"; // Replace with recipient email
    $headers = "From: keerusuja@gmail.com"; // Replace with sender email

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["message" => "Email sent successfully"]);
    } else {
        echo json_encode(["message" => "Email could not be sent"]);
    }
}
?>
