<?php
session_start();
$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? null;

if (!$email) {
  echo json_encode(['erro' => 'E-mail não fornecido']);
  exit;
}

$codigo = rand(100000, 999999);
$_SESSION['codigo_email'][$email] = $codigo;

$to = $email;
$subject = 'Código de verificação';
$message = 'Seu código de verificação é: ' . $codigo;
$headers = 'From: noreply@sualoja.com';

mail($to, $subject, $message, $headers);
echo json_encode(['mensagem' => 'Código enviado com sucesso. Verifique seu e-mail.']);
?>