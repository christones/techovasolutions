<?php
/**
 * TechOva Solutions — Contact form handler for cPanel hosting.
 * Update $to_email with your actual inbox address.
 */

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

$to_email = 'hello@techovasolutions.ca';

$name    = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$email   = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL) ?? '');
$company = trim(filter_input(INPUT_POST, 'company', FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$service = trim(filter_input(INPUT_POST, 'service', FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$message = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS) ?? '');

if ($name === '' || $email === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields with a valid email.']);
    exit;
}

$subject = "New inquiry from {$name} — TechOva Solutions";
$body    = "Name: {$name}\n";
$body   .= "Email: {$email}\n";
$body   .= "Company: " . ($company ?: 'N/A') . "\n";
$body   .= "Service: " . ($service ?: 'N/A') . "\n\n";
$body   .= "Message:\n{$message}\n";

$headers  = "From: TechOva Solutions <noreply@" . ($_SERVER['HTTP_HOST'] ?? 'techovasolutions.ca') . ">\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($to_email, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Thank you! We will get back to you within 24 hours.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Unable to send message. Please email us directly.']);
}
