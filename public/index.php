<?php
/**
 * TechOva Solutions — HTTPS bootstrap for cPanel.
 * Redirects HTTP to HTTPS, then serves index.html.
 */

declare(strict_types=1);

$host = 'techovasolutions.ca';

$isHttps = (
    (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (isset($_SERVER['SERVER_PORT']) && (int) $_SERVER['SERVER_PORT'] === 443)
    || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && strtolower($_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https')
    || (isset($_SERVER['HTTP_X_FORWARDED_SSL']) && strtolower($_SERVER['HTTP_X_FORWARDED_SSL']) === 'on')
);

if (!$isHttps) {
    $uri = $_SERVER['REQUEST_URI'] ?? '/';
    header('Location: https://' . $host . $uri, true, 301);
    exit;
}

$requestHost = strtolower($_SERVER['HTTP_HOST'] ?? '');
if ($requestHost === 'www.' . $host) {
    $uri = $_SERVER['REQUEST_URI'] ?? '/';
    header('Location: https://' . $host . $uri, true, 301);
    exit;
}

$html = __DIR__ . '/index.html';
if (!is_readable($html)) {
    http_response_code(500);
    exit('Site configuration error.');
}

header('Content-Type: text/html; charset=UTF-8');
readfile($html);
