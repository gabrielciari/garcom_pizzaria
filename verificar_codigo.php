<?php
session_start();
$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? null;
$codigo = $input['codigo'] ?? null;

if (!isset($_SESSION['codigo_email'][$email])) {
  echo json_encode(['erro' => 'Nenhum código enviado para esse e-mail.']);
  exit;
}

if ($_SESSION['codigo_email'][$email] == $codigo) {
  unset($_SESSION['codigo_email'][$email]);
  echo json_encode(['status' => 'ok']);
} else {
  echo json_encode(['erro' => 'Código incorreto.']);
}
?>